#!/usr/bin/env python3
"""Generate apps with a coding agent (Claude Code, Codex, Antigravity, Grok Build), one folder per design task and run.

  # one design task, one run
  python3 generation/run_generation.py --agent claude_code --effort low \\
      --scenarios S12_apple_login --conditions C1 --runs 1 --out runs
  # full grid for one setup: 12 scenarios x 4 conditions x 5 runs
  python3 generation/run_generation.py --agent codex --effort medium --out runs
  # print the prompts and the exact commands; nothing is called
  python3 generation/run_generation.py --agent grok_build --scenarios S01_BIPA --conditions C4 --runs 1 --out runs --dry-run

Each run has five steps:
1. Generation turn.
2. App check.
3. `npm install` and `npm run build`. If the build fails, up to two repair turns in the same session.
4. The three design-rationale questions in the same session, read-only.
5. Save.

Output: OUT/<setup>/<scenario>/C<k>_R<n>/ with prompt.txt, response.txt (the response), rationale.txt (the rationale), app/ (source only), metadata.json
and logs/. The npm build here only checks that the app builds; evaluation/build_site.py makes the evaluated site/.
An existing run folder is never overwritten: it is skipped. To redo a run, move its folder away.
Each run works in its own new folder under --work-root. The agents edit files there without asking.
"""
import argparse
import json
import os
import secrets
import shlex
import shutil
import sys
import threading
import time
from concurrent.futures import ThreadPoolExecutor
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path

from agents import AGENTS, Agent
from build import build_project, find_npm, validate_project
from prompts import CONDITIONS, SCENARIOS, followup_prompt, followup_variant, generation_prompt

BUILD_ATTEMPTS = 3   # first build + up to two builds after repair turns
# Words that mark a failure of the service rather than of the app (quota, login, model access). After --stop-after such
# failures in a row, no new job starts.
SERVICE_WORDS = ("429", "529", "402", "rate limit", "usage limit", "overloaded", "credit", "spending", "quota",
                 "too many requests", "resource_exhausted", "401", "403", "unauthorized", "authentication",
                 "not logged in", "oauth", "api key", "login", "model not found", "model_not_found", "invalid model",
                 "unknown model", "not supported", "not available", "may not exist", "no access to",
                 "no capacity available", "code 503")


@dataclass
class Job:
    scenario: str
    condition: str
    run: int
    out_dir: Path

    @property
    def label(self) -> str:
        return f"{self.scenario} {self.condition} run {self.run}"


def now() -> str:
    return datetime.now(timezone.utc).isoformat()


def text_file(text: str) -> str:
    """Saved texts are stripped and end in one newline (empty file if there is no text)."""
    return text.strip() + "\n" if text.strip() else ""


def write_json(path: Path, data: dict) -> None:
    path.write_text(json.dumps(data, indent=1, ensure_ascii=False) + "\n", encoding="utf-8")


def run_job(agent: Agent, job: Job, setup: str, npm: str, node_version: str) -> None:
    out, logs = job.out_dir, job.out_dir / "logs"
    out.mkdir(parents=True)   # FileExistsError if it exists: never overwrite a run
    logs.mkdir()
    work = agent.work_root / f"job_{secrets.token_hex(4)}"   # neutral name: says nothing about the task
    project = work / "app"
    prompt, followup = generation_prompt(agent.name, job.scenario, job.condition), followup_prompt(job.scenario)
    meta = {"interface_id": f"{setup}/{job.scenario}/{job.condition}_R{job.run}", "tool": agent.tool,
            "tool_category": "Coding agent", "setup": setup, "scenario": job.scenario,
            "requirement": SCENARIOS[job.scenario], "condition": job.condition, "run": job.run,
            "followup_questions": followup_variant(job.scenario), "model": agent.model, "effort": agent.effort,
            "cli_version": agent.cli_version, **agent.metadata(), "node_version": node_version,
            "status": "running", "stage": "setup", "failure": None, "session_id": None, "repair_turns": 0,
            "started_at_utc": now(), "completed_at_utc": None, "generated_on": None, "seconds": None}
    write_json(out / "metadata.json", meta)
    started, stage = time.time(), "setup"
    try:
        (out / "prompt.txt").write_text(prompt + "\n", encoding="utf-8")
        (logs / "followup_prompt.txt").write_text(followup, encoding="utf-8")
        project.mkdir(parents=True)
        stage = "generation"
        result = agent.turn(prompt, project, logs, stage)
        (out / "response.txt").write_text(text_file(result["response"]), encoding="utf-8")
        stage = "validate_generation"
        validate_project(project)
        session = meta["session_id"] = result.get("conversation_id")
        if not session:
            raise RuntimeError(f"{agent.label} did not return a session id")
        for attempt in range(1, BUILD_ATTEMPTS + 1):
            stage = f"build_{attempt}"
            try:
                build_project(project, npm, logs, attempt)
                break
            except RuntimeError as build_error:
                if attempt == BUILD_ATTEMPTS:
                    raise
                stage = f"repair_{attempt}"
                repair = agent.repair_text(str(build_error), project)
                (logs / f"{stage}_prompt.txt").write_text(repair, encoding="utf-8")
                meta["repair_turns"] += 1
                result = agent.turn(repair, project, logs, stage, session)
                session = meta["session_id"] = result.get("conversation_id") or session
        stage = "followup"
        result = agent.turn(followup, project, logs, stage, session, read_only=True)
        (out / "rationale.txt").write_text(text_file(result["response"]), encoding="utf-8")
        stage = "package"
        validate_project(project)
        meta.update(status="success", stage="complete")
    except (OSError, ValueError, RuntimeError) as exc:
        meta.update(status="failed", stage=stage, failure=str(exc))
        raise RuntimeError(f"{stage}: {exc}") from exc
    finally:
        if project.exists():   # source only: node_modules and the check build (dist/) are not kept; npm logs are in logs/
            shutil.copytree(project, out / "app", ignore=shutil.ignore_patterns("node_modules"))
            shutil.rmtree(out / "app" / "dist", ignore_errors=True)
        shutil.rmtree(work, ignore_errors=True)
        meta.update(completed_at_utc=now(), generated_on=now()[:10], seconds=round(time.time() - started))
        write_json(out / "metadata.json", meta)


# Files that coding agents load as instructions from parent folders. The work root must have none above it.
CONTEXT_MARKERS = (".agents", ".claude", ".codex", ".gemini", ".grok", ".git", "AGENTS.md", "CLAUDE.md", "GEMINI.md", "GROK.md")
TOOL_HOMES = (".claude", ".codex", ".gemini", ".grok")   # the CLIs' own folders in your home are allowed


def check_work_root(work_root: Path) -> None:
    """Refuse a work root that has agent instruction files (AGENTS.md, .git, ...) in it or in any folder above it."""
    for folder in [work_root, *work_root.parents]:
        ignored = TOOL_HOMES if folder == Path.home() else ()
        found = [m for m in CONTEXT_MARKERS if m not in ignored and (folder / m).exists()]
        if found:
            raise SystemExit(f"Work root is not clean: {folder} contains {', '.join(found)}. "
                             "Use --work-root outside any project folder.")


def is_service_failure(agent: Agent, reason: str) -> bool:
    text = reason.lower()
    called = f"{agent.label.lower()} failed" in text or f"{agent.label.lower()} timed out" in text
    return called and any(word in text for word in SERVICE_WORDS)


def show(agent: Agent, job: Job) -> None:
    """--dry-run: the prompt, the follow-up and the exact commands of one job."""
    prompt = generation_prompt(agent.name, job.scenario, job.condition)
    followup = followup_prompt(job.scenario)
    project = agent.work_root / "job_<random>" / "app"
    print("=" * 100)
    print(f"RUN {job.out_dir}")
    print(f"--- generation prompt ({len(prompt)} characters) ---\n{prompt}")
    print(f"--- follow-up prompt (questions {followup_variant(job.scenario)}) ---\n{followup}")
    for stage, session, read_only in (("generation", None, False), ("repair_1", "<session id>", False),
                                      ("followup", "<session id>", True)):
        cmd = agent.command("<prompt>", stage, session, read_only, project)
        where = "stdin" if agent.stdin_prompt else ("a file next to the app folder" if agent.name == "grok_build" else "the command line")
        print(f"--- {stage} call in {project} (prompt via {where}; timeout {agent.timeout + 30} s) ---")
        print(shlex.join(cmd))
    print(f"--- build in {project} (Node 20, 300 s per step; up to {BUILD_ATTEMPTS} builds) ---")
    print("npm install --ignore-scripts --no-audit --no-fund && npm run build")
    print("--- repair prompt on a failed build ---")
    print(agent.repair_text("<npm step, exit code and the last 4,500 characters of its output>", project))


def parse_list(text: str, allowed, what: str) -> list[str]:
    values = [v.strip() for v in text.split(",") if v.strip()]
    bad = [v for v in values if v not in allowed]
    if bad or not values:
        raise SystemExit(f"unknown {what}: {', '.join(bad) or text!r}; choose from {', '.join(allowed)}")
    return values


def parse_runs(text: str) -> list[int]:
    """'1-5' or '1,3,5'."""
    try:
        if "-" in text:
            first, last = (int(x) for x in text.split("-", 1))
            runs = list(range(first, last + 1))
        else:
            runs = [int(x) for x in text.split(",")]
    except ValueError:
        raise SystemExit(f"--runs must look like 1-5 or 1,3,5, got {text!r}") from None
    if not runs or min(runs) < 1:
        raise SystemExit("--runs must be positive")
    return runs


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("--agent", required=True, choices=sorted(AGENTS))
    parser.add_argument("--model", help="default: the model we used for the agent and effort (see README)")
    parser.add_argument("--effort", default="medium", help="reasoning effort (we used medium and low; default medium)")
    parser.add_argument("--setup", help="output setup name (default: <agent>_<effort>, plus _<model> for a non-default model)")
    parser.add_argument("--scenarios", default=",".join(SCENARIOS), help="comma-separated scenario ids (default: all 12)")
    parser.add_argument("--conditions", default=",".join(CONDITIONS), help="comma-separated, from C1..C4 (default: all)")
    parser.add_argument("--runs", default="1-5", help="run numbers, e.g. 1-5 or 1,3 (default: 1-5)")
    parser.add_argument("--out", required=True, type=Path, help="output folder")
    parser.add_argument("--workers", type=int, default=4, help="parallel jobs, each in its own work folder (default: 4)")
    parser.add_argument("--timeout", type=int, default=1800, help="seconds per agent call (default: 1800)")
    parser.add_argument("--work-root", type=Path,
                        default=Path(os.environ.get("GENERATION_WORK_ROOT", Path.home() / "compliarena_generation_work")),
                        help="scratch folder for the jobs, outside any project or git folder "
                             "(default: $GENERATION_WORK_ROOT or ~/compliarena_generation_work)")
    parser.add_argument("--stop-after", type=int, default=5,
                        help="stop starting jobs after this many service failures in a row (quota, login, model); 0: never")
    parser.add_argument("--dry-run", action="store_true", help="print prompts and commands; call nothing")
    args = parser.parse_args()
    if args.workers < 1 or args.timeout < 1:
        parser.error("--workers and --timeout must be positive")
    return args


def main() -> int:
    args = parse_args()
    work_root = args.work_root.expanduser().resolve()
    agent = AGENTS[args.agent](args.model, args.effort, args.timeout, work_root)
    setup = args.setup or f"{args.agent}_{args.effort}" + ("" if agent.model == agent.default_model(args.effort)
                                                           else f"_{agent.model}")
    out = args.out.expanduser().resolve()
    jobs = [Job(s, c, r, out / setup / s / f"{c}_R{r}")
            for s in parse_list(args.scenarios, SCENARIOS, "scenario") for r in parse_runs(args.runs)
            for c in parse_list(args.conditions, CONDITIONS, "condition")]
    todo = [job for job in jobs if not job.out_dir.exists()]
    print(f"{agent.label}: model {agent.model}, effort {agent.effort}, setup {setup}; "
          f"{len(todo)} runs to do, {len(jobs) - len(todo)} already in {out}", flush=True)
    if args.dry_run:
        agent.binary = str(agent.locate() or agent.binary)
        for job in todo:
            show(agent, job)
        return 0
    if not todo:
        return 0
    npm, node_version = find_npm()
    work_root.mkdir(parents=True, exist_ok=True)
    check_work_root(work_root)
    agent.setup()
    agent.preflight()
    print(f"{agent.label} {agent.cli_version} at {agent.binary}; node {node_version}", flush=True)

    lock = threading.Lock()
    state = {"done": 0, "failed": 0, "streak": 0, "stopped": False}

    def work(job: Job) -> None:
        with lock:
            if state["stopped"]:
                return
        print(f"start  {job.label}", flush=True)
        try:
            run_job(agent, job, setup, npm, node_version)
        except FileExistsError:
            print(f"skip   {job.label}: {job.out_dir} exists", flush=True)
        except (OSError, ValueError, RuntimeError) as exc:
            with lock:
                state["failed"] += 1
                state["streak"] = state["streak"] + 1 if is_service_failure(agent, str(exc)) else 0
                if args.stop_after and state["streak"] >= args.stop_after and not state["stopped"]:
                    state["stopped"] = True
                    print(f"Stopping: {state['streak']} service failures in a row. Running jobs finish; fix access, "
                          "move the failed run folders away and start again.", file=sys.stderr, flush=True)
            print(f"FAILED {job.label}: {str(exc)[:1000]}", file=sys.stderr, flush=True)
        else:
            with lock:
                state["done"] += 1
                state["streak"] = 0
            print(f"done   {job.label}", flush=True)

    with ThreadPoolExecutor(max_workers=args.workers) as pool:
        list(pool.map(work, todo))
    print(f"Completed {state['done']}/{len(todo)}; failed {state['failed']}; "
          f"not started {len(todo) - state['done'] - state['failed']}", flush=True)
    return 1 if state["failed"] else 0


if __name__ == "__main__":
    sys.exit(main())
