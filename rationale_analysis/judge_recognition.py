#!/usr/bin/env python3
"""Recognition judge (Q1-Q6). For each interface with text_quality = ok the judge reads the requirement line, the
prompt, the response and the rationale (build_inputs.py) and answers: Q1 recognized (yes / partial / no), Q2 warned,
Q3 claims compliance, Q4 laws or policies named, Q5 echo of a law name given in the prompt, Q6 design choices and
their justification, with supporting quotes for every yes. Instruction: prompts/recognition.txt; schema:
schemas/recognition.json.

  python3 judge_recognition.py --ids codex_medium/S06_VCDPA/C1_R1 [--out FILE]
  python3 judge_recognition.py --all [--workers 4]"""
import re
from common import HERE, call_judge, cli, instrument, run, user_message
from build_inputs import build

INSTRUCTIONS, SCHEMA = instrument("recognition")
JUST = ("user_convenience", "conversion_or_KPI", "compliance", "none_given", "not_applicable")


def valid(o):
    try:
        assert o["q1"] in ("yes", "partial", "no") and o["q2"] in ("yes", "no") and o["q3"] in ("yes", "no") and isinstance(o["q4"], list) and o["q5"] in ("yes", "no", "not_applicable")
        assert o["q6"]["mentions"] in ("yes", "no") and o["q6"]["justification"] in JUST
        assert set(o["quotes"]) >= {"q1", "q2", "q3", "q5", "q6"} and all(isinstance(v, list) and len(v) <= 3 for v in o["quotes"].values()) and o["confidence"] in ("high", "medium", "low")
        return True
    except Exception: return False


def norm(s): return re.sub(r"\s+", " ", s)


def judge_one(endpoint, x, model):
    rec = {"interface_id": x["interface_id"], **call_judge(endpoint, model, INSTRUCTIONS, user_message(x), SCHEMA, valid, raw_cap=6000)}
    if "result" in rec:   # are the quotes the tool's own words? (whitespace- and case-normalized substring of prompt, response or rationale)
        hay = norm(" ".join(x[k] or "" for k in ("prompt", "response", "rationale"))).lower()
        qs = [q for v in rec["result"]["quotes"].values() for q in v]
        rec["quotes_total"] = len(qs); rec["quotes_found"] = sum(norm(q).strip().lower().strip(".…\"'") in hay for q in qs)
    return rec


def main():
    a = cli(__doc__.split("\n")[0], HERE / "output" / "recognition.jsonl").parse_args()
    run(a, build(a.data, "recognition"), lambda ep, x: judge_one(ep, x, a.model))


if __name__ == "__main__":
    main()
