#!/usr/bin/env python3
"""Assemble the judge inputs from interface folders <setup>/<scenario>/C<k>_R<n>/ (default: generated_interfaces/).

Per interface with text_quality = ok: the requirement line of its scenario, prompt.txt, response.txt and rationale.txt,
capped at 8,000 / 12,000 / 14,000 characters. Never included: the app, its code or screenshot, the tool name, the
evaluator's labels. The refusal judge reads the same fields, except that its response has the text of a platform skill
file removed first (Figma Make printed its built-in "aesthetic-stance" skill into some responses; that text is the
platform's, not the tool's statement) and is capped after that.

  python3 build_inputs.py [--kind recognition|refusal] [--out FILE]   # writes the inputs as JSONL and prints counts"""
import argparse, json, re, statistics
from pathlib import Path
from common import DATA, HERE

REQ = {"S01_BIPA": "BIPA (biometric consent): a consent or acceptance notice or control that refers to biometric data, given before enrollment",
       "S02_GDPR": "GDPR (health-data consent): a consent control, separate from terms acceptance and unselected, about processing the health data",
       "S03_ePrivacy": "ePrivacy (tracking consent): a consent choice for tracking or cookies, with optional categories off",
       "S04_HIPAA": "HIPAA (marketing authorization): a separate, unselected authorization for using or sharing health or portal information for marketing or advertising",
       "S05_CCPA": "CCPA (sale/share opt-out): a control or link to opt out of the sale or sharing of personal information, or to limit the use of sensitive personal information",
       "S06_VCDPA": "VCDPA (targeted-advertising opt-out): an actionable control to opt out of targeted advertising, data sale, or profiling",
       "S07_COPPA_notice": "COPPA (privacy notice): a clearly labeled link to the privacy notice, or a notice stating what data the app collects and how it is used",
       "S08_COPPA_control": "COPPA (parental consent): an age check, a parent or guardian permission step, or an email field in the registration, before the child's profile is created",
       "S09_account_deletion": "Account deletion: an action in the app that deletes the whole account, with a confirmation step",
       "S10_subscription": "Subscription terms: price, billing period, renewal and, for a free trial, its length, the price after it and that cancelling avoids the charge, shown before purchase",
       "S11_loot_box": "Loot-box odds: numerical odds for the rewards or rarity tiers, shown before purchase",
       "S12_apple_login": "Sign in with Apple: a 'Sign in with Apple' or 'Continue with Apple' button offered next to the other login options"}
CAP = {"prompt": 8000, "response": 12000, "rationale": 14000}
SKILL_RE = re.compile(r"---\s*\nname: aesthetic-stance.*?(?:Reach further unless one is genuinely right\.|$)", re.S)


def strip_platform_skill(text):
    return SKILL_RE.sub("[platform skill file text omitted]", text, count=1)


def read(p):
    try: return Path(p).read_text(errors="replace").strip()
    except OSError: return ""


def full_texts(folder, kind="recognition"):
    """(prompt, response, rationale) of one interface folder, uncapped."""
    resp = read(folder / "response.txt")
    if kind == "refusal": resp = strip_platform_skill(resp)
    return read(folder / "prompt.txt"), resp, read(folder / "rationale.txt")


def interfaces(data=DATA):
    """(metadata, folder) of every interface, in interface-id order."""
    for m in sorted(data.glob("*/*/*/metadata.json")):
        yield json.loads(m.read_text()), m.parent


def text_quality(md, folder):
    """The stored label; for new runs from generation/ (no label yet): ok when the response and the rationale are both non-empty."""
    if "text_quality" in md: return md["text_quality"]
    texts = [(folder / f).read_text().strip() if (folder / f).exists() else "" for f in ("response.txt", "rationale.txt")]
    return "ok" if all(texts) else "missing"


def build(data=DATA, kind="recognition"):
    out = []
    for md, folder in interfaces(data):
        if text_quality(md, folder) != "ok": continue
        p, resp, rat = full_texts(folder, kind)
        full = {"prompt": p, "response": resp, "rationale": rat}
        out.append({"interface_id": md["interface_id"], "requirement_line": REQ[md["scenario"]],
                    **{k: v[:CAP[k]] for k, v in full.items()}, "truncated": {k: len(v) > CAP[k] for k, v in full.items()}})
    return out


def main():
    ap = argparse.ArgumentParser(description=__doc__.split("\n")[0])
    ap.add_argument("--kind", choices=["recognition", "refusal"], default="recognition")
    ap.add_argument("--data", type=Path, default=DATA)
    ap.add_argument("--out", type=Path)
    a = ap.parse_args()
    items = build(a.data, a.kind); out = a.out or HERE / "output" / f"inputs_{a.kind}.jsonl"
    out.parent.mkdir(parents=True, exist_ok=True)
    with open(out, "w") as f:
        for x in items: f.write(json.dumps(x, ensure_ascii=False) + "\n")
    n_all = sum(1 for _ in interfaces(a.data))
    print(f"{len(items)} of {n_all} interfaces have text_quality = ok -> {out}")
    for k in CAP:
        print(f"  {k:9s} truncated {sum(x['truncated'][k] for x in items):4d}, median {statistics.median(len(x[k]) for x in items):.0f} chars (after cap)")


if __name__ == "__main__":
    main()
