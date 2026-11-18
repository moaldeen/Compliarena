# CompliArena

CompliArena is a testbed of 48 app-design tasks. Each task asks a GenAI tool to design the canonical screen of a
regulated app feature without asking for its compliance component. This artifact contains the design tasks, the code
that runs the coding agents, the Compliance Evaluator, the rationale analysis, and the results.

| Folder | Content |
|---|---|
| `prompts/` | The 48 design tasks (12 scenarios × 4 conditions), the three design-rationale questions, and the run instructions added for each coding agent |
| `generation/` | Code that runs the four coding agents: Codex CLI, Claude Code, Antigravity, Grok Build |
| `evaluation/` | The Compliance Evaluator (investigator, scorer, verifier) and the guidelines for each requirement |
| `rationale_analysis/` | The LLM judge: Refusal, Recognition, Warning, Compliance claim, Business goals |
| `results/` | Evaluator labels and judge answers for all 2,490 generated interfaces |
| `generated_interfaces/` | 35 generated interfaces, 5 per GenAI tool |
| `supplementary_material/` | `prompts.pdf`: the prompts of the 12 scenarios, with the text each condition (C1–C4) adds marked |

The three ProDeGens (Figma Make, Lovable, Base44) were run manually through their web interfaces, so there is no code
for them. Their results are in `results/`, and 5 of their interfaces each are in `generated_interfaces/`.

## Scenarios and conditions

| ID | Requirement | Folder |
|---|---|---|
| S1 | BIPA | `S01_BIPA` |
| S2 | GDPR | `S02_GDPR` |
| S3 | ePrivacy | `S03_ePrivacy` |
| S4 | HIPAA | `S04_HIPAA` |
| S5 | CCPA | `S05_CCPA` |
| S6 | VCDPA | `S06_VCDPA` |
| S7 | COPPA (notice) | `S07_COPPA_notice` |
| S8 | COPPA (control) | `S08_COPPA_control` |
| S9 | Account deletion | `S09_account_deletion` |
| S10 | Subscription Interface | `S10_subscription` |
| S11 | Loot-box rules | `S11_loot_box` |
| S12 | Login with Apple | `S12_apple_login` |

Conditions: C1 Baseline; C2 Target users and platform; C3 Regulation or platform policy; C4 Business goals.
The ProDeGens' C4 prompts add business goals to C2.

Each generated interface is in `<setup>/<scenario>/C<k>_R<n>/`:
- `prompt.txt`: the design task as sent;
- `response.txt`: the response;
- `rationale.txt`: the answers to the design-rationale questions;
- `app/`: the source (coding agents);
- `site/`: the built screen;
- `render.json` and `screenshot.png`: the render;
- `metadata.json`.

## Models

| GenAI tool | CLI version | Medium effort | Low effort |
|---|---|---|---|
| Codex CLI | 0.159.2 | gpt-6.1-sol | gpt-6.1-sol |
| Claude Code | 2.1.289–2.1.301 | claude-sonnet-5-5 | claude-sonnet-5-5 |
| Antigravity | 1.3.4 | gemini-3.8-flash | gemini-3.8-flash |
| Grok Build | 1.0.62 | grok-4.7 | grok-4.7 |

Compliance Evaluator: the investigator, the scorer and the verifier all use glm-5.3 at high reasoning effort.
LLM judge: glm-5.3 at high reasoning effort.

## Run the coding agents

Requirements: Linux, Python 3.10+, Node 20, and the agent's CLI logged in. The agents edit files without asking, so
use a machine or account you can spare.

```bash
export NODE_BIN=/path/to/node20/bin/node
export CLAUDE_BIN=/path/to/claude        # or CODEX_BIN, AGY_BIN, GROK_BIN
python3 generation/run_generation.py --agent claude_code --effort medium \
        --scenarios S01_BIPA --conditions C1 --runs 1 --out runs
```

`--agent` is `codex`, `claude_code`, `antigravity` or `grok_build`. Without `--scenarios`, `--conditions` and `--runs`,
the agent runs all 48 tasks 5 times. Each run sends the design task, builds the app, asks the three design-rationale
questions in the same session, and saves the files listed above.

## Run the Compliance Evaluator

Requirements: Node 20, Google Chrome, Codex CLI 0.153.4, and an OpenAI-compatible endpoint.

```bash
npm install --prefix evaluation/.tools @openai/codex@0.153.4
(cd evaluation/render && npm install)
export LLM_BASE_URL=https://<endpoint>/v1  LLM_API_KEY=<key>

python3 evaluation/evaluate.py --only codex_medium/S06_VCDPA/C1_R1 --out runs_eval   # one provided interface
python3 evaluation/build_site.py --all runs                                           # new coding-agent runs: build site/
python3 evaluation/evaluate.py --interfaces runs --out runs_eval                      # label them
```

Each interface gets `runs_eval/<id>/result.json` with its label (Missing, Present but fails, or Complies), the Presence,
Content and Behavior results, and the Presentation flag. A Behavior failure is not a Presentation flag.

## Run the rationale analysis

```bash
python3 rationale_analysis/judge_refusal.py --ids codex_medium/S06_VCDPA/C1_R1         # Refusal
python3 rationale_analysis/judge_recognition.py --ids codex_medium/S06_VCDPA/C1_R1     # Recognition, Warning, Compliance claim
python3 rationale_analysis/judge_business_goals.py --all                               # Business goals (interfaces with a Presentation flag)
```

Use `--all` for every interface in `generated_interfaces/`, or `--data runs` for new runs.
