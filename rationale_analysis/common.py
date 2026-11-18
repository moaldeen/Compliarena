"""Shared pieces of the three rationale judges: paths, the OpenAI-compatible client, the judge call with its retries,
and a resumable runner that writes one JSON record per interface.

Endpoint: environment variables LLM_BASE_URL (e.g. https://api.example.com/v1) and LLM_API_KEY.
Model: --model, else environment variable LLM_MODEL, else "glm-5.3".
Fixed settings: temperature 0, reasoning_effort "high", max_tokens 4000, strict JSON schema,
one retry on invalid JSON or invalid values, backoff retries (5, 20, 60 s) on HTTP 429/500/502/503/504."""
import argparse, json, os, sys, threading, time, urllib.error, urllib.request
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

HERE = Path(__file__).resolve().parent
ART = HERE.parent
DATA = ART / "generated_interfaces"
RESULTS = ART / "results"
DEFAULT_MODEL = "glm-5.3"


def instrument(name):
    """(instruction text, JSON schema) of one judge, used verbatim."""
    return (HERE / "prompts" / f"{name}.txt").read_text().rstrip("\n"), json.loads((HERE / "schemas" / f"{name}.json").read_text())


def http(base_url, key, body, timeout=600):
    req = urllib.request.Request(base_url.rstrip("/") + "/chat/completions", data=json.dumps(body).encode(),
                                 headers={"Authorization": "Bearer " + key, "Content-Type": "application/json"})
    with urllib.request.urlopen(req, timeout=timeout) as r: return json.loads(r.read())


def call_judge(endpoint, model, system, user, schema, valid, raw_cap):
    """One judge call. Returns the record fields: result (the parsed JSON) or error, plus attempts, model_returned,
    finish_reason, usage, seconds; `raw` (the model text) is kept only when no valid result came back."""
    body = {"model": model, "messages": [{"role": "system", "content": system}, {"role": "user", "content": user}],
            "max_tokens": 4000, "temperature": 0, "reasoning_effort": "high",
            "response_format": {"type": "json_schema", "json_schema": {"name": "judge", "strict": True, "schema": schema}}}
    res = {"attempts": 0, "usage": [], "error": None}; t0 = time.time()
    for attempt in (1, 2):   # one retry on invalid JSON or invalid values
        res["attempts"] = attempt; r = None
        for backoff in (0, 5, 20, 60):   # transient HTTP errors
            if backoff: time.sleep(backoff)
            try: r = http(*endpoint, body); break
            except urllib.error.HTTPError as e:
                res["error"] = f"HTTP {e.code}: {e.read().decode()[:200]}"
                if e.code not in (429, 500, 502, 503, 504): break
            except Exception as e: res["error"] = repr(e)[:200]
        if r is None: break
        res["model_returned"] = r.get("model"); res["usage"].append(r.get("usage")); ch = r["choices"][0]
        res["finish_reason"] = ch.get("finish_reason"); txt = (ch["message"].get("content") or "").strip(); res["raw"] = txt[:raw_cap]
        try:
            o = json.loads(txt)
            if valid(o): res.update({"result": o, "error": None}); break
            res["error"] = "invalid schema values"
        except Exception as e: res["error"] = "invalid JSON: " + repr(e)[:80]
    res["seconds"] = round(time.time() - t0, 1)
    if "result" in res: res.pop("raw", None)
    return res


def user_message(x):
    """The user message of the recognition and refusal judges (requirement line, prompt, response, rationale)."""
    return (f"REQUIREMENT: {x['requirement_line']}\n\nPROMPT SENT TO THE TOOL:\n<<<\n{x['prompt']}\n>>>\n\n"
            f"THE TOOL'S FINAL RESPONSE TEXT FROM GENERATION:\n<<<\n{x['response'] or '(none)'}\n>>>\n\n"
            f"THE TOOL'S ANSWERS TO THE THREE DESIGN-RATIONALE QUESTIONS:\n<<<\n{x['rationale'] or '(none)'}\n>>>")


def cli(description, default_out, default_workers=4):
    ap = argparse.ArgumentParser(description=description)
    sel = ap.add_mutually_exclusive_group(required=True)
    sel.add_argument("--all", action="store_true", help="every eligible interface not yet in --out (resumable)")
    sel.add_argument("--ids", nargs="+", metavar="INTERFACE_ID", help="e.g. codex_medium/S01_BIPA/C1_R1")
    sel.add_argument("--ids-file", type=Path, help="file with one interface id per line")
    ap.add_argument("--out", type=Path, default=default_out, help=f"output JSONL (default: {default_out.relative_to(ART)})")
    ap.add_argument("--data", type=Path, default=DATA, help="folder of <setup>/<scenario>/C<k>_R<n>/ (default: generated_interfaces/)")
    ap.add_argument("--model", default=os.environ.get("LLM_MODEL", DEFAULT_MODEL))
    ap.add_argument("--workers", type=int, default=default_workers)
    ap.add_argument("--limit", type=int, help="judge at most N interfaces")
    return ap


def endpoint():
    base, key = os.environ.get("LLM_BASE_URL"), os.environ.get("LLM_API_KEY")
    if not base or not key: sys.exit("set LLM_BASE_URL and LLM_API_KEY")
    return base, key


def run(args, items, judge_one):
    """Judge the selected items with `judge_one(item) -> record`; append each record to args.out as it finishes.
    Interfaces that already have a result in args.out are skipped."""
    ep = endpoint()
    if args.ids or args.ids_file:
        want = args.ids or [l.strip() for l in open(args.ids_file) if l.strip()]
        by = {x["interface_id"]: x for x in items}
        missing = [i for i in want if i not in by]
        if missing: sys.exit(f"not eligible for this judge (text_quality != ok, not flagged, or unknown): {missing}")
        items = [by[i] for i in want]
    done = set()
    if args.out.exists():
        for l in open(args.out):
            if l.strip():
                d = json.loads(l)
                if "result" in d: done.add(d["interface_id"])
    todo = [x for x in items if x["interface_id"] not in done][: args.limit]
    args.out.parent.mkdir(parents=True, exist_ok=True)
    lock = threading.Lock(); n = [0]; bad = [0]
    print(f"{len(todo)} to judge ({len(done)} already in {args.out.name}); model {args.model}; workers {args.workers}", flush=True)

    def work(x):
        rec = judge_one(ep, x)
        with lock:
            with open(args.out, "a") as f: f.write(json.dumps(rec, ensure_ascii=False) + "\n")
            n[0] += 1; bad[0] += "result" not in rec
            if n[0] % 25 == 0 or n[0] == len(todo): print(f"  {time.strftime('%H:%M:%S')} {n[0]}/{len(todo)} done, {bad[0]} failed", flush=True)
        return rec

    with ThreadPoolExecutor(max_workers=args.workers) as pool: recs = list(pool.map(work, todo))
    if len(todo) <= 5:
        for rec in recs: print(json.dumps(rec, ensure_ascii=False)[:1500])
    return recs
