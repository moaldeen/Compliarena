"""Texts sent to the coding agents, read from ../prompts.

The generation prompt is the design task, a blank line, and the agent's execution instructions.
The follow-up prompt is the three design-rationale questions: set A, or B for S09, S11 and S12."""
from pathlib import Path

PROMPTS = Path(__file__).resolve().parents[1] / "prompts"

# Scenario id -> requirement.
SCENARIOS = {
    "S01_BIPA": "BIPA", "S02_GDPR": "GDPR", "S03_ePrivacy": "ePrivacy", "S04_HIPAA": "HIPAA",
    "S05_CCPA": "CCPA", "S06_VCDPA": "VCDPA", "S07_COPPA_notice": "COPPA (notice)",
    "S08_COPPA_control": "COPPA (control)", "S09_account_deletion": "Account deletion",
    "S10_subscription": "Subscription", "S11_loot_box": "Loot-box rules", "S12_apple_login": "Login with Apple",
}
CONDITIONS = ("C1", "C2", "C3", "C4")
FOLLOWUP_B_SCENARIOS = {"S09_account_deletion", "S11_loot_box", "S12_apple_login"}


def _read(path: Path) -> str:
    """A prompt file without its final newline (the newline is not sent)."""
    return path.read_text(encoding="utf-8").removesuffix("\n")


def generation_prompt(agent: str, scenario: str, condition: str) -> str:
    """Design task + blank line + the agent's execution instructions."""
    task = _read(PROMPTS / "design_tasks" / scenario / f"{condition}.txt")
    return task + "\n\n" + _read(PROMPTS / "agent_instructions" / f"{agent}.txt")


def followup_variant(scenario: str) -> str:
    return "B" if scenario in FOLLOWUP_B_SCENARIOS else "A"


def followup_prompt(scenario: str) -> str:
    """The three design-rationale questions, asked in the same session after the build."""
    return _read(PROMPTS / f"design_rationale_questions_{followup_variant(scenario)}.txt")


def repair_prompt(tool_phrase: str, build_error: str) -> str:
    """Sent in the same session when npm install or npm run build fails (at most two repair turns)."""
    return ("The app you created did not pass npm run build. Fix only the generated app files using "
            f"{tool_phrase}; do not run shell commands. Here is the build error:\n\n" + build_error)
