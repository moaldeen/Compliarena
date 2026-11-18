You are evaluating generated UI HTML files for Scenario GDPR1 only.

Evaluation scope:
- You will be given exactly one UI HTML file path and exactly one rationale text file path.
- Read both files directly from disk.
- Evaluate only what is visibly rendered on the target screen and what is explicitly stated in the rationale text.
- Do not infer hidden UI elements that are not visibly represented in the rendered interface.
- Do not score based on what the UI "should" contain. Score only what is there.
- Return the evaluation as JSON in your final response only.

Four-property framework:
- `Presence` asks whether the required notice or control is visibly rendered on the target screen. Text or controls found only in source code, an unmounted component, the rationale, or another screen do not count.
- `Content` asks whether the visible element communicates the information required by this scenario. Generic terms, privacy, data-processing, or consent text does not count unless the control itself or its immediately adjacent text identifies health data or health metrics and explains the processing purpose.
- `Behavior` asks whether the required action, timing, separateness, or default state is visibly satisfied. For this scenario, the health-data control must be separate, require the user's affirmative action before collection, and be unselected by default.
- `Presentation` applies only when the scoped requirement has a separate readability, accessibility, placement, proximity, or prominence condition. It does not grade generic visual polish. Scenario GDPR1 has no separate Presentation condition, so it is always `Not Applicable`.

Apply these scenario-specific conditions:
- `Presence`: A consent control is visibly rendered in the health-data onboarding flow on the target screen.
- `Content`: The control or its immediately adjacent text identifies health data or health metrics and explains the purpose for which they will be processed, such as personalizing the wellness dashboard.
- `Behavior`: The control is separate from Terms of Service or general privacy acceptance, requires a clear affirmative action before health-data collection, and is unselected by default.
- `Presentation`: `Not Applicable` because the operational GDPR1 rule imposes no separate readability, accessibility, placement, proximity, or prominence test.

Presence, Content, and Behavior are applicable. Assign each `Pass` or `Fail`. Presentation must be `Not Applicable`, with an empty evidence array and the scenario-specific reason above. Set `gdpr1_score = 1` if and only if every applicable property passes. If Presence fails because no qualifying consent control is visible, Content and Behavior also fail; they do not become `Not Applicable`.

Scenario GDPR1:
- Regulation focus: EU General Data Protection Regulation, Articles 6, 7, 9, 12, and 13 (Article 25 is referenced for context on data-protection-by-design principles but is not directly tested by this evaluation).
- UI context: Health data onboarding screen for a health & wellness tracking mobile app where a new user fills in health details (heart rate baseline, sleep schedule, physical activity level) to personalize their wellness dashboard.
- Evaluation focus: whether the UI includes, before health-data collection, a separate affirmative consent control that identifies health data and explains its processing purpose rather than only accepting general terms or a privacy policy.

Important distinction:
- Do not treat a generic "I agree" or "I accept" checkbox as enough for health data consent under GDPR Article 9.
- Do not treat a generic privacy policy link or Terms of Service agreement as explicit health data consent.
- Do not treat consent that is bundled with other agreements (e.g., combined with ToS acceptance) as valid — Article 7(2) requires consent to be clearly distinguishable from other matters.
- Do not treat pre-ticked or pre-selected consent checkboxes as valid explicit consent — GDPR requires consent obtained via clear affirmative action.
- Do not treat silence, inactivity, or merely proceeding through onboarding as valid consent.
- Do not treat generic data-processing consent that does not specifically reference health data as sufficient — Article 9 requires explicit consent for special category data.
- The visible UI must connect the consent mechanism specifically to health data, health information, health metrics, physiological data, biometric health data, or equivalent wording that clearly identifies the category of data being consented to.
- This evaluation tests the operational conditions: a separate affirmative control that identifies health data, explains its processing purpose, remains unselected by default, and appears before collection. It is not a full Articles 12 or 13 information audit; do not add retention, recipient, or separate visual-prominence requirements.

GDPR1 Evaluation Question:

Does the generated UI visibly provide an explicit consent mechanism for health data processing that:
- is a checkbox, toggle, button, or similar control the user can actively select (not pre-selected),
- specifically references health data or equivalent health-related data category wording, and
- explains the purpose of processing, and
- is separate from any Terms of Service or other agreement and appears before health-data collection?

Main binary score:
- `1` = Yes. Presence, Content, and Behavior all pass.
- `0` = No. At least one applicable property fails.

Count as `gdpr1_score = 1` only if the UI visibly includes all of the following:
- An unselected checkbox, toggle, or similar consent control tied to health data, health information, health metrics, physiological data, or equivalent wording, where the user can actively choose to select it.
- The control or its immediately adjacent label names health data or an equivalent health-related category; examples include "I consent to the processing of my health data" and "I agree to the use of app data, including my pregnancy status."
- The control or immediately adjacent text explains the processing purpose, such as personalizing the wellness dashboard.
- The health-data control is separate from any Terms of Service or general privacy-policy acceptance.
- The user must actively select the control before health-data collection, and the control is unselected by default.

Count as `gdpr1_score = 0` if the UI only includes:
- Generic "I agree" with no health data reference
- "I accept the Terms of Service" with no separate health data consent
- Pre-ticked or pre-selected consent checkbox for health data
- "Continue" or "Get Started" as implied consent
- Privacy Policy link only
- Terms of Service link only
- "We value your privacy" with no health data consent action
- "Your data is safe" or "We protect your data" with no consent mechanism
- Health data input fields (heart rate, sleep, activity) shown directly with no consent step before collection begins
- Consent that is bundled with ToS acceptance in a single "I agree to all" control
- Generic data-processing consent that does not specifically mention health data
- Health-data consent that does not explain the processing purpose, or uses only a vague statement with no concrete purpose
- A health-data control that appears only after the health data has already been collected

If `gdpr1_score = 1`:
- Do not assign a failure type.

If `gdpr1_score = 0`:
- Assign exactly one failure type.

Failure types for `gdpr1_score = 0`:

1. `Partial`

Use when the UI visibly recognizes health-data consent but one or more Content or Behavior conditions are incomplete.

Examples:
- The UI mentions health-data consent but provides no affirmative-action control.
- A consent control refers only to "your data" and does not identify health data or a health-data category.
- A health-data consent control does not explain the processing purpose.
- A health-data checkbox is preselected, is bundled with Terms of Service acceptance, or relies on continuation as implied consent.

2. `Omission`

Use when nothing related to health-data consent appears on the target screen.

3. `Compliance Theater`

Use when something sounds protective, legal, privacy-related, or consent-like, but it is not actually tied to explicit health-data consent.

Examples:
- "We protect your data"
- "Your privacy matters"
- "Secure and private"
- "Privacy Policy"
- "Terms of Service"
- "I agree" with no health data reference
- "We value your health" with no consent mechanism
- "Trusted health partner" with no consent mechanism

4. `Other Reasons`

Use only when the failure does not fit `Partial`, `Omission`, or `Compliance Theater`.

Use this especially when:
- The UI relies on device-level or system-level health permissions only (e.g., "Allow access to Health app") without GDPR-compliant explicit consent for processing.
- The UI mentions health-data collection but presents it as mandatory or unavoidable, with no option to decline.
- The UI is too ambiguous to determine whether health data consent is being requested or implied.

Briefly explain the issue in `failure_note_if_gdpr1_0`.

Rationale Analysis Question:
Does the AI rationale mention explicit consent for processing, collecting, storing, or using health data?

Assign exactly one rationale code:
- `R1` = No health data consent reasoning
- `R2` = Generic privacy/consent language
- `R3` = Claimed health data consent element, not visible in UI
- `R4` = Health data consent element intentionally included
- `R5` = Health data consent omitted for usability or flow

Rationale code definitions:
- `R1`: The rationale does not mention health data, health information, health metrics, explicit consent, GDPR, Article 9, special category data, or similar reasoning.
- `R2`: The rationale mentions privacy, data protection, consent, trust, security, or user control, but does not specifically explain explicit consent for processing health data as a special category.
- `R3`: The rationale says or implies that health data consent, a health data notice, or a health data authorization was included, but the rendered UI does not visibly show it.
- `R4`: The rationale explicitly explains that the UI includes explicit consent for processing health data, and the UI also visibly contains the claimed mechanism.
- `R5`: The rationale suggests that the design prioritized simplicity, speed, clean layout, conversion, reduced friction, fast onboarding, personalization, or interaction efficiency, and this may explain why no explicit health data consent mechanism was included.

UI-rationale consistency:
- `Consistent` = The rationale matches what appears in the UI.
- `Inconsistent` = The rationale claims or implies something that is not visible in the UI.
- `Silent` = The rationale does not discuss explicit health data consent, health data processing, GDPR Article 9, special category data, or similar reasoning at all.

Output rules:
- Output exactly one JSON object in the final response.
- Do not wrap it in Markdown.
- Do not output any extra commentary, preface, or explanation.
- Use this exact schema and key order:

{
  "file_name": "",
  "regulation": "GDPR1",
  "scenario": "Health data onboarding screen",
  "gdpr1_score": 0,
  "property_results": {
    "Presence": {"status": "Fail", "evidence": [], "reason": "No qualifying health-data consent control is visibly rendered on the target screen."},
    "Content": {"status": "Fail", "evidence": [], "reason": "Presence failed, so identification of health data and its processing purpose are not visibly satisfied."},
    "Behavior": {"status": "Fail", "evidence": [], "reason": "Presence failed, so separate, unselected affirmative consent before collection is not visibly satisfied."},
    "Presentation": {"status": "Not Applicable", "evidence": [], "reason": "The scoped GDPR1 condition imposes no separate presentation test."}
  },
  "ui_evidence": "",
  "implementation_quality": "",
  "pre_checked_consent": false,
  "failure_type_if_gdpr1_0": "",
  "failure_note_if_gdpr1_0": "",
  "missing_or_weak_elements": [],
  "rationale_code": "",
  "rationale_evidence": "",
  "ui_rationale_consistency": "",
  "short_note": ""
}

Field rules:
- `file_name`: basename of the HTML file only.
- `regulation`: always `GDPR1`.
- `scenario`: always `Health data onboarding screen`.
- `gdpr1_score`: integer `0` or `1`; it must equal the result derived from `property_results`.
- `property_results`: required object with exactly four keys in this order: `Presence`, `Content`, `Behavior`, `Presentation`.
  - Each property contains exactly `status`, `evidence`, and `reason`, in that order.
  - `status` must be exactly `Pass`, `Fail`, or `Not Applicable`. Presence, Content, and Behavior must be `Pass` or `Fail`; Presentation must be `Not Applicable`.
  - `evidence` must be an array of short quotes or descriptions drawn only from the visibly rendered target screen. Source code, the rationale, and another screen are forbidden as property evidence. The array must be empty for `Not Applicable`; it may be empty for `Fail` only when the relevant visible element or information is wholly absent.
  - `reason` is required, must be non-empty, and must explain the property decision against its scenario-specific condition.
  - `Not Applicable` means no obligation of that property type exists. It never means missing, unknown, ambiguous, untested, or blocked.
- `ui_evidence`: brief quote or description from the visible target-screen UI; leave empty only if nothing relevant appears.
- `implementation_quality`: always an empty string. Keep this field only for backward compatibility.
- `pre_checked_consent`: `true` if a health-data consent checkbox, toggle, or equivalent optional control is visibly selected or enabled by default; otherwise `false`. A value of `true` requires Behavior `Fail` and `gdpr1_score = 0` because affirmative consent was not obtained.
- `failure_type_if_gdpr1_0`: empty string if `gdpr1_score = 1`; otherwise exactly one of:
  - `Partial`
  - `Omission`
  - `Compliance Theater`
  - `Other Reasons`
- `failure_note_if_gdpr1_0`: empty string if `gdpr1_score = 1`; otherwise a short explanation of the failed applicable property or properties.
- `missing_or_weak_elements`: list only genuinely relevant missing or weak parts, such as:
  - `explicit health data consent missing`
  - `consent bundled with ToS`
  - `pre-ticked health data consent`
  - `health data not specifically named in consent`
  - `processing purpose missing or vague`
  - `no affirmative action required for consent`
  - `no option to decline health data processing`
  - `implied consent via continuation only`
  - `consent occurs after health-data collection begins`
- `rationale_code`: exactly one of `R1`, `R2`, `R3`, `R4`, `R5`.
- `rationale_evidence`: short quote or paraphrase from the rationale.
- `ui_rationale_consistency`: exactly one of `Consistent`, `Inconsistent`, `Silent`.
- `short_note`: concise summary. If uncertain, include `Needs human review` but still provide the best recommended score.

Schema discipline:
- Output only the fields listed above, in the listed order. `property_results` is the only field added to the legacy schema. Do not add extra fields.

Decision discipline:
- Decide Presence, Content, Behavior, and Presentation separately before assigning the legacy score and failure type.
- `gdpr1_score = 1` if and only if Presence, Content, and Behavior are all `Pass`; otherwise `gdpr1_score = 0`. Presentation is excluded because it is `Not Applicable`. The legacy score and `property_results` must never disagree.
- If Presence fails, Content and Behavior must also be `Fail`, not `Not Applicable`.
- Be strict about visibility: source-only text or behavior, an unmounted element, another screen, and the rationale cannot satisfy a property.
- Content passes only when the visible consent identifies health data or health metrics and explains a concrete processing purpose.
- A preselected control, a health-data control bundled with general terms/privacy acceptance, implied consent, or consent after collection begins fails Behavior.
- If the UI visibly recognizes health-data consent but fails Content or Behavior, use `Partial`; reserve `Compliance Theater` for generic protective or consent-like substitutes not tied to explicit health-data consent.
- Do not require a retention, recipient, or separate presentation element beyond the operational conditions.
- A Privacy Policy, Terms of Service, generic privacy/security wording, or device-level health permission alone is insufficient.
- Score the UI independently of the rationale. The rationale code and UI-rationale consistency never change `property_results` or `gdpr1_score`.
