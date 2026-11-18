#!/usr/bin/env python3
"""Compliance Evaluator: labels generated interfaces for one requirement each (Presence, Content, Behavior, Presentation).

Per interface (coding agents need site/ first: build it from app/ with build_site.py):
  1. render   headless Chrome at 1280x900, network blocked except GETs to a few static CDN hosts (render/render_app.mjs).
              The interface's stored render.json is used unless it is missing or --rerender is given.
  2. stage    a blinded copy for the agents: APP/ (the interface's site/), SOURCE/ (its app/ source, coding agents only),
              RENDER/render.json, rubric.md, RULES.md (the guidelines), schema.json. Neutral job id, no tool names, no screenshots.
  3. agents   investigator -> scorer -> verifier, each one Codex CLI session that starts in a temporary folder holding the staged copy.
  4. enforce  schema and consistency checks in Python; label Complies / Present but fails / Missing.

  python3 evaluation/evaluate.py --only codex_medium/S06_VCDPA/C1_R1 --out runs/eval          # one sample interface
  python3 evaluation/evaluate.py --out runs/eval --workers 4                                   # all of --interfaces; finished ones are skipped
  python3 evaluation/evaluate.py --out runs/eval --summary                                     # interfaces.csv + evaluator_results.jsonl

Environment: LLM_BASE_URL and LLM_API_KEY (OpenAI-compatible endpoint with the Responses API); optional CODEX_BIN, NODE_BIN, CHROME_BIN.
Output per interface: OUT/<interface_id>/result.json, logs/ (the agents' event streams) and render/ (only when it rendered)."""
import argparse, collections as C, csv, hashlib, json, os, re, shutil, signal, subprocess, sys, tempfile, threading, time
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime, timezone
from pathlib import Path

HERE = Path(__file__).resolve().parent
RENDER_SCRIPT = HERE / "render" / "render_app.mjs"
ROLE_TIMEOUT, RENDER_TIMEOUT = 2400, 600
ROLES = ("investigator", "scorer", "verifier")
PROMPTS = {r: (HERE / "prompts" / f"{r}.txt").read_text() for r in ROLES}
ANSWER_FILE = (HERE / "prompts" / "answer_file.txt").read_text()
RETRY_NOTE = (HERE / "prompts" / "retry_note.txt").read_text()
SCHEMAS = {"investigator": json.loads((HERE / "schemas" / "evidence.json").read_text()),
           "scorer": json.loads((HERE / "schemas" / "answer.json").read_text()),
           "verifier": json.loads((HERE / "schemas" / "verifier.json").read_text())}
GROUP = {"S01_BIPA": "Consent", "S02_GDPR": "Consent", "S03_ePrivacy": "Consent", "S04_HIPAA": "Consent", "S05_CCPA": "Opt-out",
         "S06_VCDPA": "Opt-out", "S07_COPPA_notice": "Disclosure", "S08_COPPA_control": "Disclosure", "S09_account_deletion": "Platform policies",
         "S10_subscription": "Platform policies", "S11_loot_box": "Platform policies", "S12_apple_login": "Platform policies"}
OUTCOME = {"A": "Missing", "D": "Present but fails", "C": "Complies", "B": "No screen"}
APP_IGNORE = shutil.ignore_patterns("index.remote.html", "~flock.js", "robots.txt", "node_modules", "_runtimes")
SOURCE_FILES = ("index.html", "package.json", "vite.config.js", "vite.config.ts", "tailwind.config.js", "postcss.config.js")
MODEL_WORDS = {"claude_code": "claude-sonnet", "codex": "gpt-6", "antigravity": "gemini", "grok_build": "grok-4.7"}   # blinding check, by setup prefix
SERVICE_KINDS = {"quota_limit", "auth_failed", "model_unavailable"}
CODEX_CONFIG = '''model_provider = "llm"

[model_providers.llm]
name = "llm"
base_url = {base_url}
env_key = "LLM_API_KEY"
wire_api = "responses"

[features]
apps = false
remote_plugin = false
plugin_sharing = false
recommended_plugins = false
'''


def log(msg): print(f"{datetime.now():%F %T} {msg}", flush=True)


# ---------------------------------------------------------------- interfaces
def need_site(itf):
    if not (itf.site / "index.html").is_file(): raise RuntimeError(f"no built site in {itf.site} (build it with evaluation/build_site.py)")


class Interface:
    """One folder <setup>/<scenario>/C<k>_R<n>/: metadata.json, site/ (the built app that is rendered and staged
    as APP/), app/ (coding agents: the generated source, staged as SOURCE/; build site/ from it with build_site.py), render.json."""
    def __init__(self, root: Path, iid: str):
        self.id, self.path = iid, root / iid
        self.meta = json.loads((self.path / "metadata.json").read_text())
        self.scenario, self.setup = self.meta["scenario"], self.meta["setup"]
        self.hosted = self.meta["tool_category"] != "Coding agent"          # ProDeGen sites: no source, platform markup removed
        self.site = self.path / "site"
        self.source = None if self.hosted else self.path / "app"


def find_interfaces(root: Path, only: str | None) -> list:
    ids = sorted(str(p.parent.relative_to(root)) for p in root.glob("*/*/*/metadata.json"))
    if only:
        want = [x.strip().strip("/") for x in only.split(",") if x.strip()]
        ids = [i for i in ids if any(i == w or i.startswith(w + "/") for w in want)]
    return [Interface(root, i) for i in ids]


# ---------------------------------------------------------------- render
def find_node() -> str:
    home_nodes = sorted((Path.home() / ".nvm/versions/node").glob("v*/bin/node"), reverse=True)
    for c in [os.environ.get("NODE_BIN"), shutil.which("node"), *map(str, home_nodes)]:
        if c and Path(c).is_file():
            v = subprocess.run([c, "--version"], capture_output=True, text=True).stdout.strip()
            if v.startswith("v") and int(v[1:].split(".")[0]) >= 18: return c
    raise FileNotFoundError("Node.js 18+ is required for rendering; set NODE_BIN")


def get_render(itf: Interface, out_dir: Path, rerender: bool) -> dict:
    """This output folder's own render if one was made, else the stored record, else a new render into out_dir/render/."""
    own = out_dir / "render"
    if (own / "render.json").is_file(): return json.loads((own / "render.json").read_text())
    if (itf.path / "render.json").is_file() and not rerender: return json.loads((itf.path / "render.json").read_text())
    need_site(itf)
    if own.exists(): shutil.rmtree(own)
    own.mkdir(parents=True)
    cmd = [find_node(), str(RENDER_SCRIPT), str(itf.site), str(own)] + (["--hosted"] if itf.hosted else [])
    try: r = subprocess.run(cmd, capture_output=True, text=True, timeout=RENDER_TIMEOUT)
    except subprocess.TimeoutExpired as exc: raise RuntimeError(f"render timed out for {itf.id}") from exc
    (own / "render.log").write_text(r.stdout + r.stderr)
    if r.returncode or not (own / "render.json").is_file():
        raise RuntimeError(f"render failed for {itf.id}: {(r.stderr or r.stdout).strip()[-300:]}")
    return json.loads((own / "render.json").read_text())


def render_summary(render: dict) -> dict:
    it = render.get("interactions", [])
    return {"blank_render": render.get("blank_render"), "initial_text_lines": len(render["initial"]["text_lines"]),
            "initial_controls": len(render["initial"]["controls"]), "interactions": len(it),
            "same_screen_states": sum(i["kind"] == "same_screen_state" for i in it), "different_screens": sum(i["kind"] == "different_screen" for i in it)}


def login_wall(lines: list, scenario: str) -> bool:
    """Base44 only: the public page shows the platform's sign-in form instead of the generated screen (no screen to judge).
    In the Apple-login scenario the target screens are sign-in screens, so only Base44's generic page counts there."""
    text = " ".join(lines).lower()
    if scenario == "S12_apple_login":
        return "log in to your account" in text and "continue with google" in text and len(lines) <= 12
    google = "continue with google" in text or "sign in with google" in text
    creds = "email" in text and "password" in text
    return len(lines) <= 12 and ((google and creds) or (bool(re.search(r"sign in|log in", text)) and (google or creds)))


# ---------------------------------------------------------------- staging
PLATFORM_LEAK = re.compile(r"(?i:figma|base44|lovable[.\-_]|@lovable)|\bLovable\b")


def sanitize_index(html: str) -> str:
    """Staged copy of index.html without hosting-platform markup (the original is never changed)."""
    plat = re.compile(r"figma|lovable|base44", re.I)
    html = re.sub(r"<aside\b[^>]*id=[\"']lovable-badge[\"'].*?</aside>", "", html, flags=re.S | re.I)
    html = re.sub(r"<style\b[^>]*>(?:(?!</style>).)*?lovable(?:(?!</style>).)*?</style>", "", html, flags=re.S | re.I)
    html = re.sub(r"<script\b[^>]*>(?:(?!</script>).)*?</script>", lambda m: "" if plat.search(m.group(0)) else m.group(0), html, flags=re.S | re.I)
    html = re.sub(r"<!--(?:(?!-->).)*?(?:figma|lovable|base44)(?:(?!-->).)*?-->", "", html, flags=re.S | re.I)
    html = re.sub(r"Figma Make App|Base44 APP|Lovable App", "App", html)
    return re.sub(r"<link\b[^>]*(?:figma|lovable|base44)[^>]*>|<meta\b[^>]*(?:figma|lovable|base44)[^>]*>", "", html, flags=re.I)


def stage(itf: Interface, render: dict, root: Path, interfaces_root: Path) -> Path:
    """Blinded copy under root/eval: APP, SOURCE (coding agents), RENDER/render.json, rubric.md, schema.json, RULES.md."""
    need_site(itf)
    ev = root / "eval"; ev.mkdir(parents=True)
    shutil.copytree(itf.site, ev / "APP", ignore=APP_IGNORE)
    idx = ev / "APP/index.html"; idx.write_text(sanitize_index(idx.read_text(errors="replace")))
    if itf.hosted and PLATFORM_LEAK.search(idx.read_text()): raise RuntimeError(f"staged index.html of {itf.id} still names its platform")
    if itf.source and itf.source.is_dir():
        (ev / "SOURCE").mkdir()
        for name in SOURCE_FILES:
            if (itf.source / name).is_file(): shutil.copy2(itf.source / name, ev / "SOURCE" / name)
        if (itf.source / "src").is_dir(): shutil.copytree(itf.source / "src", ev / "SOURCE/src")
    text = json.dumps(render, indent=2, ensure_ascii=False) + "\n"       # the renderer's own layout (JSON.stringify(_, null, 2))
    word = next((w for k, w in MODEL_WORDS.items() if itf.setup.startswith(k)), None)
    for leak in (itf.id, str(interfaces_root.resolve()), str(Path.home()), word):
        if leak and leak in text: raise RuntimeError(f"render record of {itf.id} contains {leak!r}")
    (ev / "RENDER").mkdir(); (ev / "RENDER/render.json").write_text(text)
    shutil.copy2(HERE / "rubrics" / f"{itf.scenario}.md", ev / "rubric.md")
    (ev / "schema.json").write_text(json.dumps(SCHEMAS["scorer"]))
    shutil.copy2(HERE / "guidelines" / f"{itf.scenario}.md", ev / "RULES.md")
    return ev


# ---------------------------------------------------------------- one agent call
def agent_env(codex: Path, home: Path) -> dict:
    """Environment of an agent session: its own Codex home (config.toml with the endpoint) and the key; nothing else."""
    return {"PATH": f"{codex.parent}:/usr/bin:/bin", "HOME": str(home), "CODEX_HOME": str(home), "LANG": "C.UTF-8",
            "LLM_API_KEY": os.environ["LLM_API_KEY"]}


def check(obj, schema, path="answer") -> list:
    """Small JSON-schema check (types, required keys, enums, no extra keys) for the three schemas used here."""
    errs, ty = [], schema.get("type")
    if "enum" in schema and obj not in schema["enum"]: return [f"{path}: {obj!r} not one of {schema['enum']}"]
    if ty == "object":
        if not isinstance(obj, dict): return [f"{path}: not an object"]
        errs += [f"{path}: missing {k}" for k in schema.get("required", []) if k not in obj]
        errs += [f"{path}: unexpected key {k}" for k in obj if k not in schema.get("properties", {})]
        for k, sub in schema.get("properties", {}).items():
            if k in obj: errs += check(obj[k], sub, f"{path}.{k}")
    elif ty == "array":
        if not isinstance(obj, list): return [f"{path}: not a list"]
        for i, x in enumerate(obj): errs += check(x, schema["items"], f"{path}[{i}]")
    elif ty == "string" and not isinstance(obj, str): errs.append(f"{path}: not a string")
    elif ty == "boolean" and not isinstance(obj, bool): errs.append(f"{path}: not true/false")
    return errs


def call(role, model, effort, codex, eval_dir, home, logs, note="", attempt=1):
    """Run one role in eval_dir; the answer is the JSON file it writes to eval_dir/out/<role>.json. A failed session is retried once fresh;
    an invalid answer (schema, or fewer than two shell commands, i.e. the files were not inspected) once with the problems listed."""
    schema = SCHEMAS[role]
    (eval_dir / f"schema_{role}.json").write_text(json.dumps(schema, indent=1))
    out_file = eval_dir / "out" / f"{role}.json"
    if out_file.exists(): out_file.unlink()
    prompt = PROMPTS[role] + "\n\n" + ANSWER_FILE.replace("{role}", role) + ("\n\n" + RETRY_NOTE.replace("{problems}", note) if note else "")
    prompt = prompt.replace("/eval", str(eval_dir))   # the instructions name the staged folder as /eval
    cmd = [str(codex), "exec", prompt, "--model", model, "--config", 'model_provider="llm"', "--config", f'model_reasoning_effort="{effort}"',
             "--config", 'personality="pragmatic"', "--config", 'web_search="disabled"', "--sandbox", "workspace-write", "--skip-git-repo-check", "--ephemeral",
           "--json", "-C", str(eval_dir)]
    p = subprocess.Popen(cmd, cwd=eval_dir, env=agent_env(codex, home), stdin=subprocess.DEVNULL, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True,
                         start_new_session=True)
    try: so, se = p.communicate(timeout=ROLE_TIMEOUT)
    except subprocess.TimeoutExpired:
        os.killpg(p.pid, signal.SIGKILL); p.communicate(); raise RuntimeError(f"{role} timed out")
    key = os.environ["LLM_API_KEY"]; tag = role + ("_retry" if note else "") + ("_attempt2" if attempt > 1 else "")
    logs.mkdir(parents=True, exist_ok=True)
    (logs / f"{tag}_events.jsonl").write_text(so.replace(key, "<LLM_API_KEY>")); (logs / f"{tag}_stderr.txt").write_text(se.replace(key, "<LLM_API_KEY>"))
    events = [json.loads(l) for l in so.splitlines() if l.startswith("{")]
    usage = [e.get("usage") for e in events if e.get("type") == "turn.completed"]
    commands = sum(1 for e in events if e.get("type") == "item.completed" and (e.get("item") or {}).get("type") == "command_execution")
    if p.returncode:
        if note or attempt > 1: raise RuntimeError(f"{role} failed (exit {p.returncode}): {se.strip()[-300:]}")
        return call(role, model, effort, codex, eval_dir, home, logs, attempt=2)
    problems = []
    try: obj = json.loads(out_file.read_text())
    except (OSError, ValueError) as exc: obj, problems = None, [f"no valid JSON in out/{role}.json ({exc.__class__.__name__})"]
    if obj is not None: problems = check(obj, schema)
    if commands < 2: problems.append(f"only {commands} commands were run, so the app files were not inspected")
    if problems:
        if note: raise RuntimeError(f"{role} answer still invalid after one retry: {'; '.join(problems[:4])}")
        return call(role, model, effort, codex, eval_dir, home, logs, note="; ".join(problems[:6]))
    return obj, {"usage": usage[-1] if usage else None, "commands": commands, "retried": bool(note)}


# ---------------------------------------------------------------- rules enforced in Python
def presentation_flag(o: dict) -> dict:
    """The Presentation flag marks how a component is shown, not whether it works: a Behavior failure (reason
    behavior_fail) is not a Presentation flag. Drop that reason; with no other reason left, Presentation passes."""
    o = dict(o)
    if o.get("element_in_app") == "yes" and "behavior_fail" in (o.get("presentation_reasons") or []):
        o["presentation_reasons"] = [r for r in o["presentation_reasons"] if r != "behavior_fail"]
        if not o["presentation_reasons"]: o["presentation"] = "Pass"
    return o


def validate(o: dict) -> list:
    """Consistency of the final answer: NA rules, complies = element present and neither Content nor Behavior fails,
    reasons exactly when Presentation fails."""
    p = []
    try:
        e, c, b, comp, pr, rs = o["element_in_app"], o["content"], o["behavior"], o["complies"], o["presentation"], o["presentation_reasons"]
        if e == "no" and (comp or pr != "Not Applicable"): p.append("element is no, so complies must be false and presentation Not Applicable")
        if e == "yes" and pr == "Not Applicable": p.append("presentation must be Pass or Fail when the element is in the app")
        if comp != (e == "yes" and "Fail" not in (c, b)): p.append("complies must be true exactly when the element is in the app and neither content nor behavior fails")
        if pr == "Fail" and not rs: p.append("presentation fails but no reason is given")
        if pr != "Fail" and rs: p.append("presentation reasons given although presentation does not fail")
    except (KeyError, TypeError) as exc: p.append(f"missing field {exc}")
    return p


def failure_kind(text: str) -> str:
    t = text.lower()
    if any(x in t for x in ("429", "rate limit", "usage limit", "quota", "too many requests", "overloaded", "capacity", "credit")): return "quota_limit"
    if any(x in t for x in ("401", "403", "unauthorized", "not logged in", "log in", "authentication", "login")): return "auth_failed"
    if any(x in t for x in ("model_not_found", "does not exist", "not supported", "unknown model", "model is not available", "invalid model", "no access to")): return "model_unavailable"
    if "timed out" in t: return "timeout"
    return "other"


# ---------------------------------------------------------------- one interface
def evaluate_one(itf: Interface, a, codex: Path) -> dict:
    out_dir = a.out / itf.id
    nid = "app_" + hashlib.sha1(f"compliance-evaluator-{itf.id}".encode()).hexdigest()[:10]; job = a.work_dir / f"job_{nid}"
    if job.exists(): shutil.rmtree(job)
    models = {"investigator": (a.investigator_model, a.investigator_effort), "scorer": (a.scorer_model, a.scorer_effort), "verifier": (a.verifier_model, a.verifier_effort)}
    rec = {"interface_id": itf.id, "status": "failed", "evaluator": "Compliance Evaluator (investigator, scorer, verifier)",
           "models": {r: f"{m} ({e} reasoning)" for r, (m, e) in models.items()}, "blinded_id": nid}
    t0 = time.time()
    try:
        render = get_render(itf, out_dir, a.rerender)
        rec["render_summary"] = render_summary(render)
        if itf.meta.get("tool") == "Base44" and login_wall(render["initial"]["text_lines"], itf.scenario):
            rec.update(status="no_screen", outcome=OUTCOME["B"], detail="the public page shows a sign-in form instead of the generated screen (app login wall)")
        else:
            ev = stage(itf, render, job, a.interfaces)
            (ev / "out").mkdir()
            home = job / "home"; home.mkdir(); (home / "config.toml").write_text(CODEX_CONFIG.format(base_url=json.dumps(os.environ["LLM_BASE_URL"])))
            logs, usage = out_dir / "logs", {}
            evidence, usage["investigator"] = call("investigator", *models["investigator"], codex, ev, home, logs)
            (ev / "evidence.json").write_text(json.dumps(evidence, indent=1))
            answer, usage["scorer"] = call("scorer", *models["scorer"], codex, ev, home, logs)
            (ev / "answer.json").write_text(json.dumps(answer, indent=1))
            verdict, usage["verifier"] = call("verifier", *models["verifier"], codex, ev, home, logs)
            final = presentation_flag(answer if verdict["accept"] else verdict["corrected"])
            problems = validate(final)
            code = "C" if final["complies"] else ("D" if final["element_in_app"] == "yes" else "A")
            rec.update(status="completed" if not problems else "invalid", outcome=OUTCOME[code], final_answer=final, verifier_changed=not verdict["accept"],
                       scorer_answer=answer, verifier={"accept": verdict["accept"], "problems": verdict["problems"]}, investigator_evidence=evidence,
                       problems=problems, usage=usage)
    except Exception as exc:  # noqa: BLE001
        msg = str(exc)
        rec.update(error=msg[:600], kind="render" if msg.startswith("render ") else failure_kind(msg))
    finally:
        shutil.rmtree(job, ignore_errors=True)
    rec["render_summary"] = rec.pop("render_summary", None)             # keep the key order of data/results/evaluator_results.jsonl
    rec["usage"] = rec.pop("usage", None)
    rec["seconds"] = round(time.time() - t0, 1); rec["finished_utc"] = datetime.now(timezone.utc).isoformat()
    out_dir.mkdir(parents=True, exist_ok=True)
    (out_dir / "result.json").write_text(json.dumps(rec, indent=1, ensure_ascii=False) + "\n")
    return rec


def stage_only(itf: Interface, a):
    """Render if needed and write the blinded copy the agents would see to OUT/<id>/staged/eval (no model calls)."""
    target = a.out / itf.id / "staged"
    if target.exists(): shutil.rmtree(target)
    render = get_render(itf, a.out / itf.id, a.rerender)
    ev = stage(itf, render, target, a.interfaces)
    for role in ROLES: (ev / f"schema_{role}.json").write_text(json.dumps(SCHEMAS[role], indent=1))
    log(f"staged {itf.id} -> {ev}")


# ---------------------------------------------------------------- summary table
def write_summary(a, interfaces: list):
    cols = ["interface_id", "tool", "tool_category", "setup", "model", "effort", "scenario", "requirement", "requirement_group", "condition", "run",
            "outcome", "presence", "content", "behavior", "dark_pattern", "dark_pattern_reasons", "text_quality"]
    rows, recs, skipped = [], [], C.Counter()
    for itf in interfaces:
        p = a.out / itf.id / "result.json"
        if not p.is_file(): skipped["not run"] += 1; continue
        r = json.loads(p.read_text())
        if r["status"] != "completed": skipped[r["status"]] += 1; continue
        if (r.get("render_summary") or {}).get("blank_render"): skipped["blank render"] += 1; continue     # also left out of results/evaluator_results.jsonl
        f, m = r["final_answer"], itf.meta; present = f["element_in_app"] == "yes"
        rows.append({"interface_id": itf.id, "tool": m["tool"], "tool_category": m["tool_category"], "setup": itf.setup, "model": m.get("model", ""),
                     "effort": m.get("effort", "") if not itf.hosted else "n/a", "scenario": itf.scenario, "requirement": m.get("requirement", ""),
                     "requirement_group": GROUP.get(itf.scenario, ""), "condition": m.get("condition", ""), "run": m.get("run", ""), "outcome": r["outcome"],
                     "presence": "yes" if present else "no", "content": f["content"], "behavior": f["behavior"],
                     "dark_pattern": ("yes" if f["presentation"] == "Fail" else "no") if present else "NA",
                     "dark_pattern_reasons": "|".join(sorted(f["presentation_reasons"])) if present else "", "text_quality": m.get("text_quality", "")})
        recs.append(r)
    a.out.mkdir(parents=True, exist_ok=True)
    with open(a.out / "interfaces.csv", "w", newline="") as fh:
        w = csv.DictWriter(fh, fieldnames=cols); w.writeheader(); w.writerows(rows)
    with open(a.out / "evaluator_results.jsonl", "w") as fh:
        for r in recs: fh.write(json.dumps(r, ensure_ascii=False) + "\n")
    print(f"{len(rows)} judged interfaces -> {a.out / 'interfaces.csv'}, {a.out / 'evaluator_results.jsonl'}; left out: {dict(skipped) or 'none'}")
    print(dict(C.Counter(r["outcome"] for r in rows)))


# ---------------------------------------------------------------- main
def find_codex(explicit) -> Path:
    found = sorted((HERE / ".tools/node_modules/@openai").glob("codex-*/vendor/*/bin/codex"))
    for c in (explicit, os.environ.get("CODEX_BIN"), *map(str, found)):
        if c and Path(c).is_file() and os.access(c, os.X_OK): return Path(c).resolve()
    raise FileNotFoundError("Codex CLI 0.153.4 not found: install it into evaluation/.tools (see README) or set CODEX_BIN to its native binary")


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--interfaces", type=Path, default=HERE.parent / "generated_interfaces", help="folder of <setup>/<scenario>/C<k>_R<n>/ (default: generated_interfaces)")
    ap.add_argument("--out", type=Path, required=True, help="output folder (results, logs, new renders)")
    ap.add_argument("--only", help="comma-separated interface ids or id prefixes, e.g. codex_medium/S01_BIPA/C1_R1 or lovable/S04_HIPAA")
    ap.add_argument("--workers", type=int, default=4)
    ap.add_argument("--rerender", action="store_true", help="render again instead of using the stored render.json")
    ap.add_argument("--retry-failed", action="store_true", help="run interfaces again whose last result failed or was invalid")
    ap.add_argument("--stop-after", type=int, default=5, help="stop after N consecutive service failures (0: never)")
    ap.add_argument("--stage-only", action="store_true", help="only write the blinded copy the agents would read (OUT/<id>/staged/eval)")
    ap.add_argument("--summary", action="store_true", help="only write OUT/interfaces.csv and OUT/evaluator_results.jsonl from the results")
    ap.add_argument("--investigator-model", default="glm-5.3"); ap.add_argument("--investigator-effort", default="high")
    ap.add_argument("--scorer-model", default="glm-5.3"); ap.add_argument("--scorer-effort", default="high")
    ap.add_argument("--verifier-model", default="glm-5.3"); ap.add_argument("--verifier-effort", default="high")
    ap.add_argument("--codex-bin", help="native Codex CLI 0.153.4 binary (default: CODEX_BIN or evaluation/.tools)")
    ap.add_argument("--work-dir", type=Path, help="scratch folder for the agent sessions (default: a new temporary folder)")
    a = ap.parse_args()
    a.out, a.interfaces = a.out.resolve(), a.interfaces.resolve()
    interfaces = find_interfaces(a.interfaces, a.only)
    if not interfaces: sys.exit(f"no interfaces found under {a.interfaces}" + (f" matching {a.only}" if a.only else ""))
    if a.summary: write_summary(a, interfaces); return 0
    if a.stage_only:
        for itf in interfaces: stage_only(itf, a)
        return 0

    def done(itf):
        p = a.out / itf.id / "result.json"
        if not p.is_file(): return False
        st = json.loads(p.read_text())["status"]; return st in ("completed", "no_screen") or not a.retry_failed
    todo = [i for i in interfaces if not done(i)]
    for v in ("LLM_BASE_URL", "LLM_API_KEY"):
        if not os.environ.get(v): sys.exit(f"{v} is not set")
    codex = find_codex(a.codex_bin)
    version = subprocess.run([str(codex), "--version"], capture_output=True, text=True).stdout.strip()
    if version != "codex-cli 0.153.4": log(f"warning: results/ used codex-cli 0.153.4, found {version!r}")
    temp_work = a.work_dir is None
    a.work_dir = Path(tempfile.mkdtemp(prefix="compliance_eval_")) if temp_work else a.work_dir.resolve()
    a.work_dir.mkdir(parents=True, exist_ok=True)
    print(f"{len(interfaces)} interfaces selected, {len(todo)} to run; investigator {a.investigator_model}/{a.investigator_effort}, "
          f"scorer {a.scorer_model}/{a.scorer_effort}, verifier {a.verifier_model}/{a.verifier_effort}; workers={a.workers}; out={a.out}")
    lock = threading.Lock(); st = {"streak": 0, "stop": False, "n": C.Counter()}

    def work(itf):
        with lock:
            if st["stop"]: return
        log(f"start {itf.id}"); r = evaluate_one(itf, a, codex)
        with lock:
            st["n"][r["status"]] += 1; st["streak"] = st["streak"] + 1 if r.get("kind") in SERVICE_KINDS else 0
            if a.stop_after and st["streak"] >= a.stop_after and not st["stop"]: st["stop"] = True; log("stopping: consecutive service failures; rerun with --retry-failed")
        log(f"done {itf.id}: {r['status']}" + (f" ({r.get('kind')}: {r.get('error', '')[:160]})" if r["status"] == "failed"
            else f" outcome={r.get('outcome')} {r.get('problems') or ''}{' (verifier changed)' if r.get('verifier_changed') else ''}") + f" {r['seconds']}s")
    with ThreadPoolExecutor(max_workers=a.workers) as pool: list(pool.map(work, todo))
    if temp_work: shutil.rmtree(a.work_dir, ignore_errors=True)
    print(f"finished: {dict(st['n'])}")
    return 1 if st["n"]["failed"] or st["n"]["invalid"] else 0


if __name__ == "__main__":
    sys.exit(main())
