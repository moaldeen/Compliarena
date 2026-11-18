"""One adapter per coding-agent CLI: the command, its flags and how its output is read.

Each call runs the CLI headless with your own login, in the run's own empty folder. Repair turns and the follow-up
resume the generation session; the follow-up runs read-only.
"""
import json
import os
import shutil
import signal
import subprocess
import tempfile
import time
from pathlib import Path

import prompts


def run(command: list[str], cwd: Path, timeout: int, env: dict, stdin_text: str | None = None) -> tuple[int, str, str]:
    """Run one CLI call. On timeout, kill its whole process group and raise TimeoutError."""
    process = subprocess.Popen(command, cwd=cwd, env=env, stdin=subprocess.PIPE if stdin_text is not None else subprocess.DEVNULL,
                               stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True, start_new_session=True)
    try:
        stdout, stderr = process.communicate(input=stdin_text, timeout=timeout)
    except subprocess.TimeoutExpired:
        os.killpg(process.pid, signal.SIGKILL)
        process.communicate()
        raise TimeoutError(timeout)
    return process.returncode, stdout, stderr


class Agent:
    """Shared flow of one agent call: run the CLI, save its raw output, parse it, and raise RuntimeError on failure."""
    name = label = binary_name = binary_env = ""
    login_relpath = None          # login file under your home; checked before the first run
    extra_env: tuple = ()
    repair_tools = "your file-editing tool"
    stdin_prompt = False          # True: prompt on stdin; otherwise in the command line or a file
    fatal_denials = True          # a denied tool call fails the run

    def __init__(self, model: str | None, effort: str, timeout: int, work_root: Path):
        self.effort, self.timeout, self.work_root = effort, timeout, work_root
        self.model = model or self.default_model(effort)
        self.binary = self.binary_name
        self.cli_version = "unknown"

    @staticmethod
    def default_model(effort: str) -> str:
        raise NotImplementedError

    @property
    def tool(self) -> str:
        return self.label

    def metadata(self) -> dict:
        return {}

    def locate(self) -> Path | None:
        for candidate in (os.environ.get(self.binary_env), shutil.which(self.binary_name)):
            if candidate and Path(candidate).is_file() and os.access(candidate, os.X_OK):
                return Path(candidate).resolve()
        return None

    def setup(self) -> None:
        """Find the CLI binary and record its version."""
        binary = self.locate()
        if binary is None:
            raise SystemExit(f"{self.label} CLI not found: set {self.binary_env} or put `{self.binary_name}` on PATH")
        self.binary = str(binary)
        try:
            out = subprocess.run([self.binary, "--version"], capture_output=True, text=True, timeout=60).stdout.strip()
            self.cli_version = out.splitlines()[0] if out else "unknown"
        except (OSError, subprocess.TimeoutExpired):
            pass

    def preflight(self) -> None:
        """Checks before the first run (login)."""
        if self.login_relpath and not (Path.home() / self.login_relpath).is_file():
            raise SystemExit(f"{self.label} is not logged in: ~/{self.login_relpath} is missing")

    def env(self) -> dict:
        return {**os.environ, "LANG": "C.UTF-8", **dict(self.extra_env)}

    # -- one call ------------------------------------------------------------------------------------------------
    def command(self, prompt: str, stage: str, session_id: str | None, read_only: bool, project: Path) -> list[str]:
        raise NotImplementedError

    def parse(self, stdout: str, stderr: str, code: int, work: Path, stage: str, log_dir: Path) -> dict:
        raise NotImplementedError

    def before_call(self, prompt: str, work: Path, stage: str) -> None:
        pass

    def after_call(self, work: Path, stage: str) -> None:
        pass

    def turn(self, prompt: str, project: Path, log_dir: Path, stage: str,
             session_id: str | None = None, read_only: bool = False) -> dict:
        """One CLI call in the run's folder. Writes logs/<stage>_stdout.txt, _stderr.txt and <stage>.json (parsed result)."""
        work = project.parent
        self.before_call(prompt, work, stage)
        try:
            code, stdout, stderr = run(self.command(prompt, stage, session_id, read_only, project), project,
                                       self.timeout + 30, self.env(), prompt if self.stdin_prompt else None)
        except TimeoutError:
            raise RuntimeError(f"{self.label} timed out after {self.timeout + 30}s") from None
        finally:
            self.after_call(work, stage)
        (log_dir / f"{stage}_stdout.txt").write_text(stdout, encoding="utf-8")
        (log_dir / f"{stage}_stderr.txt").write_text(stderr, encoding="utf-8")
        result = self.parse(stdout, stderr, code, work, stage, log_dir)
        result["exit_code"] = code
        (log_dir / f"{stage}.json").write_text(json.dumps(result, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
        if code != 0 or result.get("status") != "SUCCESS":
            raise RuntimeError(f"{self.label} failed (exit {code}): {result.get('error') or stderr.strip()[:2000] or 'no detail'}")
        if self.fatal_denials and result.get("denied_actions"):
            raise RuntimeError(f"{self.label} tool permission denied: {result['denied_actions']}; {stderr.strip()[:500]}")
        if not result.get("response"):
            raise RuntimeError(f"{self.label} returned an empty response: {stderr.strip()[:500]}")
        return result

    def repair_text(self, build_error: str, project: Path) -> str:
        return prompts.repair_prompt(self.repair_tools, build_error)


class ClaudeCode(Agent):
    """`claude -p --output-format json`, prompt on stdin, file tools only (no shell, web or sub-agents)."""
    name, label, binary_name, binary_env = "claude_code", "Claude Code", "claude", "CLAUDE_BIN"
    login_relpath = ".claude/.credentials.json"
    extra_env = (("DISABLE_AUTOUPDATER", "1"), ("DISABLE_TELEMETRY", "1"), ("DISABLE_ERROR_REPORTING", "1"),
                 ("CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC", "1"))
    stdin_prompt = True
    GENERATION_TOOLS = "Read,Write,Edit,Glob,Grep"
    FOLLOWUP_TOOLS = "Read,Glob,Grep"

    @staticmethod
    def default_model(effort):
        return "claude-sonnet-5-5"

    def metadata(self):
        return {"agent_file_tools": self.GENERATION_TOOLS}

    def command(self, prompt, stage, session_id, read_only, project):
        cmd = [self.binary, "-p", "--output-format", "json", "--model", self.model, "--effort", self.effort,
               "--permission-mode", "plan" if read_only else "acceptEdits",
               "--tools", self.FOLLOWUP_TOOLS if read_only else self.GENERATION_TOOLS,
               "--strict-mcp-config", "--disable-slash-commands"]
        return cmd + (["--resume", session_id] if session_id else [])

    def parse(self, stdout, stderr, code, work, stage, log_dir):
        try:
            data = json.loads(stdout)
        except json.JSONDecodeError:
            return {"status": "FAILED", "conversation_id": None, "response": "",
                    "error": "Claude Code did not return JSON", "denied_actions": [], "usage": None}
        if isinstance(data, list):   # some versions return the event list
            data = next((e for e in reversed(data) if isinstance(e, dict) and e.get("type") == "result"), {})
        failed = bool(data.get("is_error")) or data.get("subtype") not in (None, "success")
        text = data.get("result") or ""
        return {"status": "FAILED" if failed else "SUCCESS", "conversation_id": data.get("session_id"),
                "response": "" if failed else text, "error": (text or data.get("subtype") or "error") if failed else None,
                "denied_actions": data.get("permission_denials") or [], "num_turns": data.get("num_turns"),
                "duration_ms": data.get("duration_ms"), "total_cost_usd": data.get("total_cost_usd"), "usage": data.get("usage")}


class Codex(Agent):
    """`codex exec --json` for the first turn, `codex exec resume <thread id>` after it. Workspace-write sandbox
    (read-only for the follow-up), no web search, browser, apps, plugins or sub-agents."""
    name, label, binary_name, binary_env = "codex", "Codex", "codex", "CODEX_BIN"
    login_relpath = ".codex/auth.json"

    @staticmethod
    def default_model(effort):
        return "gpt-6.1-sol"

    @property
    def tool(self):
        return f"Codex ({self.model})"

    def command(self, prompt, stage, session_id, read_only, project):
        common = ["-m", self.model, "-c", 'model_provider="openai"', "-c", f'model_reasoning_effort="{self.effort}"',
                  # `codex exec` forces approval_policy=never; where a managed policy forbids that, Codex asks for
                  # approval on every action and nobody can answer. Automatic review answers instead.
                  "-c", 'approvals_reviewer="auto_review"',
                  "-c", 'web_search="disabled"',
                  "--disable", "browser_use", "--disable", "in_app_browser", "--disable", "apps",
                  "--disable", "plugins", "--disable", "multi_agent",
                  "--skip-git-repo-check", "--json", "-o", str(project.parent / f"last_{stage}.txt")]
        sandbox = "read-only" if read_only else "workspace-write"
        if session_id:
            return [self.binary, "exec", "resume", session_id, *common, "-c", f'sandbox_mode="{sandbox}"', prompt]
        return [self.binary, "exec", *common, "-s", sandbox, "-C", str(project), prompt]

    def parse(self, stdout, stderr, code, work, stage, log_dir):
        thread_id, response, error, completed, usage = None, "", None, False, None
        commands, changes, denied = [], 0, []
        for line in stdout.splitlines():
            try:
                event = json.loads(line)
            except json.JSONDecodeError:
                continue
            kind = event.get("type")
            if kind == "thread.started":
                thread_id = event.get("thread_id")
            elif kind == "turn.completed":
                completed, usage = True, event.get("usage")
            elif kind in ("turn.failed", "error"):
                detail = event.get("error", {}).get("message") if kind == "turn.failed" else event.get("message")
                error = detail or error or kind
            elif kind == "item.completed":
                item = event.get("item") or {}
                if item.get("type") == "agent_message":
                    response = item.get("text") or response
                elif item.get("type") == "command_execution":
                    entry = {"command": item.get("command"), "exit_code": item.get("exit_code"), "status": item.get("status")}
                    commands.append(entry)
                    if item.get("status") == "declined":
                        denied.append(entry)
                elif item.get("type") == "file_change":
                    changes += len(item.get("changes") or [])
        last = work / f"last_{stage}.txt"   # written by `-o`
        if last.is_file():
            (log_dir / f"{stage}_last_message.txt").write_text(last.read_text(encoding="utf-8"), encoding="utf-8")
            response = response or last.read_text(encoding="utf-8")
        return {"status": "SUCCESS" if completed and not error else "FAILED", "conversation_id": thread_id,
                "response": response, "error": error, "denied_actions": denied, "commands": commands,
                "files_changed": changes, "usage": usage}


class Antigravity(Agent):
    """`agy --print` with JSON output, accept-edits mode (plan mode for the follow-up); `--conversation <id>` resumes.
    The thinking level is part of the model name (gemini-3.8-flash-medium / -low); --effort is set to the same level."""
    name, label, binary_name, binary_env = "antigravity", "Antigravity", "agy", "AGY_BIN"
    repair_tools = "file-writing tools"
    CAPACITY_RETRIES, CAPACITY_WAIT = 8, 90   # "503 No capacity" is short-lived; a refused call does no work

    @staticmethod
    def default_model(effort):
        return f"gemini-3.8-flash-{effort}"

    def preflight(self):
        """One tiny call, so a missing login stops the batch before any run starts."""
        with tempfile.TemporaryDirectory(dir=self.work_root) as scratch:
            cmd = [self.binary, "--model", self.model, "--effort", self.effort, "--mode", "plan", "--output-format", "json",
                   "--print-timeout", "120s", "--print", "Reply with exactly the word OK and nothing else."]
            try:
                code, stdout, stderr = run(cmd, Path(scratch), 180, self.env())
            except TimeoutError:
                raise SystemExit("Antigravity login check timed out") from None
        try:
            envelope = json.loads(stdout)
        except json.JSONDecodeError:
            envelope = {}
        if code != 0 or envelope.get("status") != "SUCCESS":
            raise SystemExit(f"Antigravity login check failed: {envelope.get('error') or stderr.strip()[:300] or code}")

    def command(self, prompt, stage, session_id, read_only, project):
        cmd = [self.binary, "--model", self.model, "--effort", self.effort,
               "--mode", "plan" if read_only else "accept-edits",
               "--output-format", "json", "--print-timeout", f"{self.timeout}s"]
        return cmd + (["--conversation", session_id] if session_id else []) + ["--print", prompt]

    def parse(self, stdout, stderr, code, work, stage, log_dir):
        try:
            return json.loads(stdout)
        except json.JSONDecodeError:
            raise RuntimeError(f"Antigravity did not return JSON (exit {code}): {stderr.strip()[:500]}") from None

    def turn(self, *args, **kwargs):
        for attempt in range(1, self.CAPACITY_RETRIES + 1):
            try:
                return super().turn(*args, **kwargs)
            except RuntimeError as error:
                text = str(error).lower()
                if not ("no capacity available" in text or "code 503" in text) or attempt == self.CAPACITY_RETRIES:
                    raise
                print(f"  server capacity (503), retry {attempt}/{self.CAPACITY_RETRIES - 1} in {self.CAPACITY_WAIT}s", flush=True)
                time.sleep(self.CAPACITY_WAIT)


class GrokBuild(Agent):
    """`grok --prompt-file ... --output-format streaming-json`; `--resume <session id>` after the first turn. File tools
    only, reads and writes allowed in the run folder only, no sub-agents, plan mode or web search, 120 turns."""
    name, label, binary_name, binary_env = "grok_build", "Grok Build", "grok", "GROK_BIN"
    login_relpath = ".grok/auth.json"
    extra_env = (("GROK_DISABLE_AUTOUPDATER", "1"), ("GROK_MEMORY", "0"), ("GROK_TELEMETRY_ENABLED", "0"), ("GROK_WORKFLOWS", "0"))
    fatal_denials = False
    GENERATION_TOOLS = "read_file,write,search_replace,list_dir,grep"
    FOLLOWUP_TOOLS = "read_file,list_dir,grep"
    MAX_TURNS = 120

    @staticmethod
    def default_model(effort):
        return "grok-4.7"

    def metadata(self):
        return {"agent_file_tools": self.GENERATION_TOOLS, "max_turns": self.MAX_TURNS}

    def before_call(self, prompt, work, stage):
        (work / f"_prompt_{stage}.txt").write_text(prompt, encoding="utf-8")

    def after_call(self, work, stage):
        (work / f"_prompt_{stage}.txt").unlink(missing_ok=True)

    def command(self, prompt, stage, session_id, read_only, project):
        # A headless run cannot ask for approval and a refused action cancels the turn, so allowed actions are explicit
        # rules scoped to the run folder. Deny rules win over allow rules.
        cmd = [self.binary, "--prompt-file", str(project.parent / f"_prompt_{stage}.txt"), "--verbatim",
               "--model", self.model, "--reasoning-effort", self.effort, "--output-format", "streaming-json",
               "--permission-mode", "default", "--tools", self.FOLLOWUP_TOOLS if read_only else self.GENERATION_TOOLS,
               "--no-subagents", "--no-plan", "--disable-web-search", "--no-auto-update",
               "--max-turns", str(self.MAX_TURNS), "--cwd", str(project)]
        allowed = ("Read", "Grep") if read_only else ("Read", "Grep", "Write", "Edit")
        for action in allowed:
            cmd += ["--allow", f"{action}({project}/**)"]
        grok_home = Path(os.environ.get("GROK_HOME", Path.home() / ".grok"))
        for action in ("Read", "Grep", "Write", "Edit"):
            cmd += ["--deny", f"{action}({grok_home}/**)"]
        return cmd + (["--resume", session_id] if session_id else [])

    def parse(self, stdout, stderr, code, work, stage, log_dir):
        events = []
        for line in stdout.splitlines():
            line = line.strip()
            if line.startswith("{"):
                try:
                    events.append(json.loads(line))
                except json.JSONDecodeError:
                    pass
        end = next((e for e in reversed(events) if e.get("type") == "end"), None)
        err = next((e for e in reversed(events) if e.get("type") == "error"), None)
        last_tool = max((i for i, e in enumerate(events) if e.get("type") == "tool_call"), default=-1)
        final = "".join(e.get("data", "") for e in events[last_tool + 1:] if e.get("type") == "text")   # text after the last tool call
        full = "".join(e.get("data", "") for e in events if e.get("type") == "text")
        stop = (end or {}).get("stopReason")
        bad = err is not None or end is None or stop in ("refusal", "cancelled", "max_tokens", "max_turn_requests")
        return {"status": "FAILED" if bad else "SUCCESS", "conversation_id": (end or err or {}).get("sessionId"),
                "response": "" if bad else (final or full),
                "error": ((err or {}).get("message") or (f"stop reason {stop}" if stop else "no end event")) if bad else None,
                "stop_reason": stop, "full_text_chars": len(full),
                "thought_chars": sum(len(e.get("data", "")) for e in events if e.get("type") == "thought"),
                "tool_calls": [{"tool": e.get("toolName"), "input": e.get("rawInput")} for e in events if e.get("type") == "tool_call"],
                "failed_tool_calls": sum(1 for e in events if e.get("type") == "tool_call_update"
                                         and str(e.get("status")) in ("failed", "denied", "rejected", "error")),
                "num_turns": (end or {}).get("num_turns"), "usage": (end or {}).get("usage"),
                "model_usage": (end or {}).get("modelUsage"), "total_cost_usd": (end or {}).get("total_cost_usd")}


AGENTS = {cls.name: cls for cls in (ClaudeCode, Codex, Antigravity, GrokBuild)}
