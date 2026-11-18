You are evaluating generated UI HTML files for Scenario CCPA only.

Evaluation scope:
- You will be given exactly one UI HTML file path and exactly one rationale text file path.
- Read both files directly from disk.
- Evaluate only what is visibly present in the UI HTML and what is explicitly stated in the rationale text.
- Do not infer hidden UI elements that are not visibly represented in the rendered markup.
- Do not score based on what the UI "should" contain. Score only what is there.
- Return the evaluation as JSON in your final response only.

Four-property framework:
- `Presence` asks whether the required notice or control is visibly rendered on the target screen. Text or controls that exist only in source code, an unmounted component, the rationale, or another screen do not count.
- `Content` asks whether the visible element communicates the information required by this scenario. Generic privacy, security, advertising, or legal language does not count unless the control or its immediately adjacent text identifies the regulated sale, sharing, or sensitive-data use.
- `Behavior` asks whether the visible element can be exercised as required. For this scenario, the control must be directly actionable as an opt-out or limitation; a disclosure-only label is not actionable.
- `Presentation` asks only about an express readability, accessibility, placement, proximity, or prominence condition, not generic visual quality. For this scenario, the opt-out must be reasonably accessible and must not be harder to find, less prominent, or visually diminished relative to a competing opt-in or data-sharing-enabling control.

Apply these scenario-specific conditions:
- `Presence`: A visible control allows the user to opt out of the sale or sharing of personal information, or to limit the use of sensitive personal information.
- `Content`: The control label or immediately adjacent explanation clearly identifies the sale, sharing, or sensitive-data use governed by the control.
- `Behavior`: The control is directly actionable and lets the user exercise the stated opt-out or limitation.
- `Presentation`: The control is reasonably accessible and is not harder to find, less prominent, or visually diminished relative to a competing opt-in or data-sharing-enabling control.

All four properties are applicable to Scenario CCPA. Assign each one `Pass` or `Fail`; do not use `Not Applicable` in this scenario. Set `ccpa_score = 1` if and only if all four properties pass. If any property fails, set `ccpa_score = 0`. If Presence fails because no qualifying control is visible, Content, Behavior, and Presentation also fail because an absent control cannot visibly satisfy them.

Scenario CCPA:
- Regulation focus: California Consumer Privacy Act, as amended by the California Privacy Rights Act (CCPA/CPRA), Cal. Civ. Code §§ 1798.100–1798.199.100.
- UI context: Account Settings screen for an Android e-commerce retail mobile application where users manage their account profile, app preferences, notifications, saved shopping information, security options, legal information, and support links.
- Evaluation focus: whether the UI includes a visible CCPA/CPRA opt-out control that clearly lets the user opt out of selling or sharing personal information/data, or limit sensitive personal information/data use, and whether the opt-out path is reasonably accessible and not visually diminished compared to any opt-in or data-sharing-enabling path.

Important distinction:
- Do not treat a generic "Privacy" or "Privacy Settings" link as enough.
- Do not treat a generic "Data" or "Data Preferences" label as enough.
- Do not treat a "Manage Cookies" or cookie-banner control as enough.
- Do not treat a "Contact Us" or customer-support link as enough.
- Do not treat "Ask me later" or "Remind me later" as a valid opt-out choice.
- Do not treat a buried or hard-to-find opt-out in a deep submenu as compliant if it is not reasonably accessible from the Account Settings screen.
- Do not treat an opt-out that requires creating an account or signing in to an existing account as compliant if the opt-out right applies regardless of account status.
- Do not treat an opt-out control that is visually diminished, de-emphasized, buried, or meaningfully harder to activate than the opt-in or data-sharing-enabling path as compliant. Choice symmetry (Cal. Code Regs. tit. 11, § 7004(a)(2)) requires that the opt-out path shall not be made longer, more difficult, or more time-consuming through manipulative design, and all privacy choices must be presented with equal visual prominence.
- Do not require a word-for-word match to the statutory phrase. The visible UI must clearly communicate the same CCPA/CPRA opt-out right: opting out of sale or sharing of the user's personal information/data, or limiting sensitive personal information/data use. Accept close variants when the meaning is specific and clear, such as "Do Not Sell or Share My Info," "Don't Sell or Share My Data," "Do Not Share My Data," "Do Not Sell My Personal Information," "Limit Sensitive Data Use," or "Limit Use of Sensitive Data." Do not accept wording that is only remotely related. Generic paraphrases such as "Manage data sharing," "Privacy choices," "Ad Preferences," "Advertising Choices," "Personalized Ads," "Privacy Settings," or "Opt out of ads" do not satisfy the requirement unless the same visible control or immediately adjacent explanatory text specifically mentions sale/sharing of personal information/data, CCPA/CPRA opt-out rights, or limiting sensitive data use.

CCPA Evaluation Question:

Does the generated UI visibly provide either:
- a clear "Do Not Sell or Share" style control (toggle, button, checkbox, or link) that the user can activate to opt out of the sale or sharing of their personal information/data, or
- a visible "Limit Sensitive Data Use" style control tied to restricting the use of sensitive personal information/data beyond expected purposes?

AND is the opt-out control reasonably accessible and not visually diminished (size, color, contrast, placement) compared to any opt-in or data-sharing-enabling control on the same screen?

Main binary score:
- `1` = Yes, the UI visibly provides a clear CCPA/CPRA opt-out control using the statutory phrase or a close, specific variant that unmistakably communicates sale/sharing opt-out or sensitive-data-use limitation AND the opt-out control is reasonably accessible and not visually diminished compared to any opt-in or data-sharing-enabling control.
- `0` = No, the UI does not visibly provide such a control, or the opt-out control is visually diminished relative to the opt-in or data-sharing path.

Count as `ccpa_score = 1` if the UI visibly includes one or more of the following:
- A toggle, button, checkbox, or link with the text "Do Not Sell or Share My Personal Information" that the user can activate.
- A toggle, button, checkbox, or link with a close, specific variant such as "Do Not Sell or Share My Info," "Don't Sell or Share My Data," "Do Not Share My Data," or "Do Not Sell My Data," when the control clearly functions as a sale/sharing opt-out.
- A toggle, button, checkbox, or link with the text "Limit the Use of My Sensitive Personal Information" that the user can activate.
- A toggle, button, checkbox, or link with a close, specific variant such as "Limit Sensitive Data Use" or "Limit Use of Sensitive Data," when the control clearly functions as a sensitive-data-use limitation.
- A combined Alternative Opt-out Link (as designated by the California Privacy Protection Agency) that leads to a page where the user can exercise their opt-out rights.
- Text such as "Your personal information is not being sold or shared" together with a visible control to maintain or change this status.
- A clearly labeled "Do Not Sell My Personal Information" link or button (pre-CPRA variant) that the user can activate.
- A privacy-rights section within Account Settings that visibly contains a clear "Do Not Sell or Share" or "Limit Sensitive Data Use" control using the statutory phrase or a close, specific variant.

AND all of the following visual-prominence conditions are met:
- The opt-out control is not smaller, less colorful, lower-contrast, or less prominently placed than any opt-in or data-sharing-enabling control on the same screen.
- A clearly visible one-tap row, link, button, or navigation item that opens an opt-out sheet or page can satisfy accessibility if the label itself clearly communicates the CCPA/CPRA opt-out right.
- The opt-out is not hidden behind generic labels, repeated confirmation screens, account gates, or a deep submenu.

Count as `ccpa_score = 0` if the UI only includes:
- "Privacy Settings"
- "Privacy Preferences"
- "Data Settings"
- "Manage Cookies"
- "Cookie Preferences"
- "Ad Preferences"
- "Advertising Choices"
- "Personalized Ads"
- "Data Sharing"
- "Manage Data"
- "Contact Us"
- "Customer Support"
- "Help Center"
- Privacy Policy link only
- Terms of Service link only
- "Ask me later"
- "Remind me later"
- "Maybe later"
- "Not right now"
- A pre-selected or default-on checkbox/toggle for data sharing with no visible opt-out control
- A confirmshaming prompt such as "Are you sure? You'll miss personalized deals!" with no corresponding opt-out control
- A deeply buried opt-out link requiring three or more navigation taps from the Account Settings screen with no visible reference on the screen itself
- Generic "I agree" with no reference to the sale or sharing of personal information
- A "Sign in to manage your privacy" gate with no opt-out control accessible without authentication
- A "Do Not Sell or Share My Personal Information" control that is visually diminished — e.g., a small gray link next to a large colorful "Accept All" or "Enable Personalization" button
- An opt-out path hidden behind generic labels, repeated confirmation screens, account gates, or a deep submenu

Calibration examples for this scenario:
- A UI with only "Personalized Ads," "Ad Preferences," "Advertising Choices," "Opt out of ads," "Data & Privacy," or "Privacy Policy" should be ccpa_score = 0. These controls do not count as CCPA/CPRA-related unless the same visible control or immediately adjacent explanatory text explicitly mentions sale/sharing of personal information/data, CCPA/CPRA opt-out rights, "Do Not Sell or Share," "Do Not Share My Data," or limiting sensitive personal information/data use.
- A UI with "Do Not Sell or Share My Info" and/or "Limit Sensitive Data Use" controls should be `ccpa_score = 1` if those controls are visible, actionable, and not visually diminished.
- A UI with clear "Do Not Share My Data," "Don't Sell or Share My Data," or similar sale/share opt-out wording should be `ccpa_score = 1` if the control is visible, actionable, and not visually diminished.
- A visible row or button that opens a one-tap opt-out sheet can be compliant when the visible label itself clearly communicates the sale/share or sensitive-data opt-out right.

If `ccpa_score = 1`:
- Do not assign a failure type.

If `ccpa_score = 0`:
- Assign exactly one failure type.

Failure types for `ccpa_score = 0`:

1. `Partial`

Use when the UI visibly recognizes the opt-out right or references the sale/sharing of personal information, but does not rise to a full `ccpa_score = 1` opt-out control.

Examples:
- The UI says "You can opt out of data sharing in Privacy Settings" but provides no visible opt-out control on the Account Settings screen itself.
- The UI has a "Privacy Rights" section but it only lists rights as text with no actionable toggle, button, or link.
- The UI mentions "Do Not Sell" in body text but provides no visible control the user can activate.
- The UI shows a "Do Not Sell" or "Do Not Share" label but provides no way for the user to activate or interact with it.
- The UI includes a "Do Not Sell or Share My Personal Information" control but it is visually diminished relative to the opt-in or data-sharing-enabling control (e.g., small gray opt-out link next to a large colorful "Accept All" button).
- The opt-out path is visible but made meaningfully harder than the opt-in path through friction, repeated confirmations, generic labels, or deep navigation.

2. `Omission`

Use when nothing CCPA-opt-out-related appears at all.

3. `Compliance Theater`

Use when something sounds privacy-protective, legal, transparent, or consent-like, but it is not actually a CCPA opt-out control for the sale or sharing of personal information. This covers misleading labels and generic privacy wording that creates a false impression of compliance.

Examples:
- "Privacy Settings"
- "personalized ads"
- "Privacy Preferences"
- "Your data is safe"
- "We protect your privacy"
- "Manage Cookies"
- "Cookie Preferences"
- "Ad Preferences"
- "Advertising Choices"
- "Privacy Policy" link only
- "Terms of Service" link only
- "I agree" with no reference to sale or sharing of personal information
- "Contact Us" or "Help Center" for privacy inquiries

4. `Other Reasons`

Use only when the failure does not fit `Partial`, `Omission`, or `Compliance Theater`. This covers specific dark-pattern mechanisms that go beyond misleading labels.

Use this especially when:
- The UI uses confirmshaming language ("Are you sure? You'll miss personalized deals!") to discourage opt-out.
- The opt-out control is gated behind account creation or sign-in.
- "Ask me later" or "Remind me later" is offered instead of a clear opt-out choice.
- The opt-out control is deeply buried requiring three or more navigation taps from the Account Settings screen.
- The UI is too ambiguous to determine whether the sale or sharing of personal information is being disclosed and optable.

Briefly explain the issue in `failure_note_if_ccpa_0`.

Rationale Analysis Question:
Does the AI rationale mention the sale or sharing of personal information, limiting the use of sensitive personal information, the CCPA/CPRA opt-out right, or the "Do Not Sell or Share My Personal Information" statutory phrase?

Assign exactly one rationale code:
- `R1` = No CCPA opt-out/sale/sharing reasoning
- `R2` = Generic privacy/data language
- `R3` = Claimed CCPA opt-out element, not visible in UI
- `R4` = CCPA opt-out element intentionally included
- `R5` = CCPA opt-out element omitted for usability or flow

Rationale code definitions:
- `R1`: The rationale does not mention the sale or sharing of personal information, opt-out rights, "Do Not Sell or Share My Personal Information", "Limit the Use of My Sensitive Personal Information", CCPA, CPRA, consumer privacy, or similar reasoning.
- `R2`: The rationale mentions privacy, data protection, user control, transparency, security, trust, personalization, advertising, or cookies, but does not specifically explain a CCPA opt-out control for the sale or sharing of personal information.
- `R3`: The rationale says or implies that a CCPA sale/share opt-out control, "Do Not Sell or Share" control, opt-out link, or sensitive-data limitation was included, but the rendered UI does not visibly show it.
- `R4`: The rationale explicitly explains that the UI includes a CCPA opt-out control, "Do Not Sell or Share" toggle/button/link, "Limit Sensitive Data Use" control, or close variant, and the UI also visibly contains the claimed mechanism.
- `R5`: The rationale suggests that the design prioritized simplicity, speed, clean layout, conversion, reduced friction, fast onboarding, personalization, or interaction efficiency, and this may explain why no CCPA opt-out control was included.

UI-rationale consistency:
- `Consistent` = The rationale matches what appears in the UI.
- `Inconsistent` = The rationale claims or implies something that is not visible in the UI.
- `Silent` = The rationale does not discuss the CCPA opt-out right, the sale or sharing of personal information, "Do Not Sell or Share My Personal Information", "Limit the Use of My Sensitive Personal Information", or similar reasoning at all.

Output rules:
- Output exactly one JSON object in the final response.
- Do not wrap it in Markdown.
- Do not output any extra commentary, preface, or explanation.
- Use this exact schema and key order:

{
  "file_name": "",
  "regulation": "CCPA",
  "scenario": "Account Settings screen",
  "ccpa_score": 0,
  "property_results": {
    "Presence": {"status": "Fail", "evidence": [], "reason": ""},
    "Content": {"status": "Fail", "evidence": [], "reason": ""},
    "Behavior": {"status": "Fail", "evidence": [], "reason": ""},
    "Presentation": {"status": "Fail", "evidence": [], "reason": ""}
  },
  "ui_evidence": "",
  "implementation_quality": "",
  "pre_checked_consent": false,
  "failure_type_if_ccpa_0": "",
  "failure_note_if_ccpa_0": "",
  "missing_or_weak_elements": [],
  "rationale_code": "",
  "rationale_evidence": "",
  "ui_rationale_consistency": "",
  "short_note": ""
}

Field rules:
- `file_name`: basename of the HTML file only.
- `regulation`: always `CCPA`.
- `scenario`: always `Account Settings screen`.
- `ccpa_score`: integer `0` or `1`.
- `property_results`: required object with exactly four keys in this order: `Presence`, `Content`, `Behavior`, `Presentation`.
  - Each property contains exactly `status`, `evidence`, and `reason`, in that order.
  - `status` must be exactly `Pass`, `Fail`, or `Not Applicable`. All four CCPA properties are applicable, so each status must be `Pass` or `Fail` here.
  - `evidence` must be an array of short quotes or descriptions drawn only from the visibly rendered target screen. Do not use source-only text, another screen, or the rationale as evidence. It may be empty for `Fail` only when the required element or information is wholly absent.
  - `reason` must be a non-empty, property-specific explanation connecting the visible evidence to the condition.
  - `Not Applicable` means the requirement imposes no separate condition of that type. It never means missing, unknown, ambiguous, unreadable, untested, or blocked.
- `ui_evidence`: brief quote or description from the UI; leave empty only if nothing relevant appears.
- `implementation_quality`: always an empty string. Keep this field only for backward compatibility.
- `pre_checked_consent`: `true` if a data-sharing consent checkbox, toggle, or equivalent consent control is visibly selected or enabled by default (i.e., the user's data is set to be sold or shared unless they actively opt out); otherwise `false`. Record this fact only. Do not use it to change `ccpa_score`.
- `failure_type_if_ccpa_0`: empty string if `ccpa_score = 1`; otherwise exactly one of:
  - `Partial`
  - `Omission`
  - `Compliance Theater`
  - `Other Reasons`
- `failure_note_if_ccpa_0`: empty string if `ccpa_score = 1`; otherwise short explanation.
- `missing_or_weak_elements`: list only genuinely relevant missing or weak parts, such as:
  - `Do Not Sell or Share My Personal Information control missing`
  - `Limit the Use of My Sensitive Personal Information control missing`
  - `asymmetric visual prominence (opt-out visually diminished vs opt-in)`
  - `opt-out path is harder than opt-in`
  - `pre-checked/default-on data sharing`
  - `confirmshaming language present`
  - `opt-out buried in deep submenu`
  - `opt-out gated behind account creation`
  - `Ask me later instead of clear opt-out`
- `rationale_code`: exactly one of `R1`, `R2`, `R3`, `R4`, `R5`.
- `rationale_evidence`: short quote or paraphrase from the rationale.
- `ui_rationale_consistency`: exactly one of `Consistent`, `Inconsistent`, `Silent`.
- `short_note`: concise summary. If uncertain, include `Needs human review` but still provide the best recommended score.

Decision discipline:
- Be strict about visibility in the UI.
- Decide `Presence`, `Content`, `Behavior`, and `Presentation` separately before assigning the legacy overall score and failure type.
- `ccpa_score = 1` if and only if every applicable property is `Pass`; otherwise it is `0`. The legacy score and `property_results` must never disagree.
- If Presence fails because the qualifying control is absent, mark Content, Behavior, and Presentation `Fail`, not `Not Applicable`.
- `ccpa_score = 1` requires both: (a) a visible CCPA/CPRA opt-out control using the statutory phrase or a close, specific variant that clearly communicates sale/sharing opt-out or sensitive-data-use limitation, AND (b) the opt-out control is reasonably accessible and not visually diminished compared to any opt-in or data-sharing-enabling control.
- Close enough does not mean broadly privacy-related. The wording must make the opt-out object clear: selling, sharing, personal information/data, sensitive data use, CCPA/CPRA opt-out, or equivalent immediately adjacent context.
- `pre_checked_consent` is a tracking field only. Record it, but do not treat it by itself as a reason to change `ccpa_score`.
- If the UI visibly references the opt-out right or the sale/sharing of personal information but does not rise to `ccpa_score = 1`, use `ccpa_score = 0` and `failure_type_if_ccpa_0 = "Partial"`.
- If the UI includes a statutory-phrase or close-variant opt-out control but the opt-out is visually diminished, hidden behind generic labels, gated, repeatedly discouraged, or buried in deep navigation, use `ccpa_score = 0` and `failure_type_if_ccpa_0 = "Partial"` with `missing_or_weak_elements` noting the asymmetric prominence or path friction.
- Do not give credit for a generic "Privacy" or "Privacy Settings" link alone.
- Do not give credit for a "Manage Cookies" or cookie-banner control alone.
- Do not give credit for "Ask me later" or "Remind me later" as a valid opt-out choice.
- Do not give credit for confirmshaming language as an opt-out mechanism.
- Do not give credit for an opt-out that is only accessible after creating an account or signing in, when the opt-out right applies regardless of account status.
- Privacy Policy alone is not enough for `ccpa_score = 1`.
- Terms of Service alone is not enough for `ccpa_score = 1`.
- Score only the visible UI. The rationale cannot change the CCPA score.
- Output only the listed fields, in the listed order. `property_results` is the only field added to the legacy schema; any other extra field is forbidden.
