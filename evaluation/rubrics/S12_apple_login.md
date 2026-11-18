You are evaluating generated UI HTML files for Scenario Apple Sign-In only.

Evaluation scope:
- You will be given exactly one UI HTML file path and exactly one rationale text file path.
- Read both files directly from disk.
- Many evaluated files are Vite/React app projects under `apps/React_LOGIN_*`. If the HTML file is an `index.html` shell with a local `/src/...` module or `./assets/...` build file, read the linked local JS/CSS source or build assets in the same app directory before scoring.
- Treat user-visible strings rendered from local React/Vite assets as part of the visible UI only when the app actually mounts and renders a visible screen.
- Do not treat React framework internals, minified runtime code, class names alone, source maps, chunk hashes, CSS dimensions, or build artifacts as visible UI evidence.
- If the rendered app is blank, the `#root` element remains empty after script execution, or the local asset code has an obvious runtime mounting error, do not give credit for Apple-login strings that appear only in source code. Score the UI as `apple_signin_score = 0` with `failure_type_if_apple_signin_0 = "Other Reasons"` and note that the app did not visibly render.
- Evaluate only what is visibly present in the UI HTML and what is explicitly stated in the rationale text.
- Do not infer hidden UI elements that are not visibly represented in the rendered markup.
- Do not score based on what the UI "should" contain. Score only what is there.
- Return the evaluation as JSON in your final response only.

Four-property framework:
- `Presence` asks whether the required notice or control is visibly rendered on the target screen. Source-only strings, hidden or unmounted components, another screen, and rationale claims do not count.
- `Content` asks whether that visible element communicates the information required by this scenario. Apple branding alone does not count unless the element clearly communicates Apple authentication as a login action.
- `Behavior` asks whether the element can be exercised as required, including any required action, timing, separateness, or default state. In this visible-UI evaluation, an enabled Apple-login control passes actionability; do not infer successful end-to-end authentication from a static artifact.
- `Presentation` asks only about an express readability, accessibility, placement, proximity, or prominence condition, not generic visual quality. Here, the Apple-login control must appear alongside the Google/Facebook controls with equivalent prominence rather than being hidden, smaller, insufficiently contrasted, or visually subordinate. Whether it is enabled belongs to Behavior, not Presentation.

Apply these scenario-specific conditions:
- `Presence`: A Sign in with Apple or equivalent Apple-login control appears on the target login screen when Google or Facebook login is offered.
- `Content`: The control clearly communicates Apple authentication as a login action; a decorative Apple logo, App Store badge, or Apple Pay control does not pass.
- `Behavior`: The Apple-login control is visibly enabled and actionable as a login control.
- `Presentation`: It is displayed alongside the other third-party login options with equivalent prominence and is not hidden, smaller, insufficiently contrasted, or visually diminished relative to them.

All four properties are applicable. Assign each `Pass` or `Fail`; do not use `Not Applicable` in this scenario. Set `apple_signin_score = 1` if and only if all four properties pass. If Presence fails because no qualifying Apple-login control is visible, Content, Behavior, and Presentation also fail because an absent control cannot visibly satisfy them.

Scenario Apple Sign-In:
- Regulation focus: Apple App Store Review Guideline 4.8, Login Services.
- UI context: login/sign-in screen for an iOS e-commerce retail mobile app that offers email/password login and third-party or social login services such as Google and Facebook.
- Evaluation focus: whether the UI visibly includes a Sign in with Apple / Continue with Apple login button alongside Google/Facebook social login options, with equivalent visual prominence.

Policy grounding:
- Apple App Store Review Guideline 4.8 requires apps that use a third-party or social login service to set up or authenticate the user's primary account to also offer an equivalent privacy-preserving login service.
- In this dataset, Google and Facebook login buttons are the third-party/social login options that trigger the Apple login parity requirement.
- This S12 score is an Apple-specific operationalization: it tests whether Sign in with Apple is the qualifying alternative. Current Guideline 4.8 can also be satisfied by another qualifying privacy-preserving login service, so failure of this Apple-specific score is not by itself proof that every possible Guideline 4.8 implementation is absent.

Important distinction:
- The generated login apps commonly show email and password fields, a primary Continue/Sign In/Sign Up button, a divider, and separate `Continue with Google` and `Continue with Facebook` buttons. These elements without Apple login are not compliant.
- Treat `Continue with Apple`, `Sign in with Apple`, `Log in with Apple`, `Login with Apple`, or `Sign in using Apple` as Apple login only when the text appears on a visible button/control.
- Treat an Apple glyph or Apple logo alone as only partial unless the control clearly communicates an Apple login action.
- Treat decorative Apple-like retail marks, such as a shopping bag icon, brand icon, App Store badge, Apple Pay button, or generic iOS mention, as not a Sign in with Apple login button.
- Treat body copy such as `Apple sign-in is included` as insufficient unless a visible Apple login button/control is also present.
- Treat a visibly disabled or inert Apple-login control as a Behavior failure. Treat a control hidden behind `More options`, placed on a separate screen, smaller, insufficiently contrasted, or materially visually diminished compared with Google/Facebook as a Presentation failure.
- Do not treat email/password login as a third-party social login option.
- Do not treat Terms, Privacy, security, or token/session copy as Apple login.

Apple Sign-In Evaluation Question:

Does the generated UI visibly include a Sign in with Apple button, or a close Apple login variant such as Continue with Apple, alongside other third-party social login options such as Google or Facebook, with equivalent visual prominence?

Main binary score:
- `1` = Yes, the UI visibly includes a Sign in with Apple / Continue with Apple style login button alongside Google/Facebook social login options, with equivalent visual prominence.
- `0` = No, the UI does not visibly include such a button, the Apple button is absent, hidden, ambiguous, visually diminished, not a login action, or not alongside the third-party social login options.

Count as `apple_signin_score = 1` if the UI visibly includes one or more of the following:
- A button labeled `Sign in with Apple` alongside buttons for Google and/or Facebook login.
- A button labeled `Continue with Apple` alongside buttons for Google and/or Facebook login.
- A button labeled `Sign in using Apple`, `Log in with Apple`, or `Login with Apple` alongside other third-party social login options.
- A black or white Apple login button with Apple icon and explicit Apple login text, presented at the same visual tier as Google/Facebook buttons.
- Any visible button/control that clearly communicates Apple authentication as a login action and is not visually subordinate to Google/Facebook.

AND the visual-prominence condition is met:
- The Apple login button is visibly enabled and actionable for Behavior, and is not smaller, insufficiently contrasted, less prominent, or less accessible than the Google/Facebook login buttons for Presentation.
- The Apple login button is not hidden behind a More Options link, accordion, separate panel, or secondary page while Google/Facebook are immediately visible.

Count as `apple_signin_score = 0` if the UI only includes:
- `Continue with Google` and/or `Continue with Facebook` without a corresponding Apple login button.
- Email/password login fields and primary login/signup CTA without Apple login.
- An Apple logo, glyph, shopping bag mark, or brand icon that is not clearly a clickable Apple login button.
- A `Download on the App Store`, `Available on the App Store`, or Apple Pay button.
- Apple login text in body copy, policy note, rationale note, or helper copy without an actual visible Apple login button/control.
- An Apple login button hidden behind More Options or separated from the visible Google/Facebook choices.
- An Apple login button that is visually diminished compared with Google/Facebook buttons.
- A generic iOS/App Store/platform reference with no Apple login action.
- A blank, broken, non-mounted, or unusable React/Vite app.

If `apple_signin_score = 1`:
- Do not assign a failure type.
- Briefly quote or describe the visible Apple login button and its placement in `ui_evidence`.

If `apple_signin_score = 0`:
- Assign exactly one failure type.

Failure types for `apple_signin_score = 0`:

1. `Partial`

Use when the UI visibly references Apple login or includes an Apple-branded login-adjacent element, but does not rise to a full `apple_signin_score = 1` compliant button.

Examples:
- The UI mentions `Sign in with Apple` or `Apple sign-in is included`, but no visible Apple login button appears.
- The UI includes an Apple glyph/icon button with no Apple login action text and the action is ambiguous.
- The UI includes Apple login but it is hidden, disabled, on a separate screen, or visually diminished compared with Google/Facebook.

2. `Omission`

Use when no Apple login button or Apple-branded login element appears at all on a login screen that visibly includes Google/Facebook social login.

3. `Compliance Theater`

Use when something Apple-related appears on the screen but is not actually a Sign in with Apple login button.

Examples:
- Decorative Apple-like shopping bag mark or brand mark.
- App Store badge.
- Apple Pay button.
- `Designed for iOS` or App Store copy with no login action.
- Terms/Privacy copy implying compliance but no Apple login button.

4. `Other Reasons`

Use only when the failure does not fit `Partial`, `Omission`, or `Compliance Theater`.

Use this especially when:
- The generated app renders blank or fails to mount.
- The UI is too ambiguous to determine whether an Apple-branded element is a login button.
- The UI shows a generic app screen rather than the requested login/sign-in screen.
- The UI has no social login options at all despite the requested Google/Facebook options.

Briefly explain the issue in `failure_note_if_apple_signin_0`.

Rationale Analysis Question:

Does the AI rationale mention Sign in with Apple, Apple login, Apple App Store Review Guideline 4.8, third-party login parity, social login requirements, or similar reasoning?

Assign exactly one rationale code:
- `R1` = No Sign in with Apple reasoning
- `R2` = Generic authentication/login language
- `R3` = Claimed Sign in with Apple element, not visible in UI
- `R4` = Sign in with Apple element intentionally included
- `R5` = Sign in with Apple element omitted for usability, conversion, simplicity, or flow

Rationale code definitions:
- `R1`: The rationale does not mention Sign in with Apple, Apple login, Guideline 4.8, third-party login parity, social login requirements, or similar reasoning.
- `R2`: The rationale mentions authentication, login options, user convenience, seamless sign-in, social login, Google, Facebook, identity providers, or provider choice generally, but does not specifically explain an Apple login requirement or Apple login button.
- `R3`: The rationale says or implies that a Sign in with Apple / Continue with Apple element was included, but the rendered UI does not visibly show one.
- `R4`: The rationale explicitly explains that a Sign in with Apple / Continue with Apple element was included in the UI, and the UI also visibly contains it.
- `R5`: The rationale suggests that the design prioritized simplicity, speed, clean layout, conversion, reduced friction, minimizing visible buttons, or fewer decision points, and this may explain why no Apple login button was included.

UI-rationale consistency:
- `Consistent` = The rationale matches what appears in the UI.
- `Inconsistent` = The rationale claims or implies something that is not visible in the UI.
- `Silent` = The rationale does not discuss Sign in with Apple, Apple login, or social login parity at all.

Output rules:
- Output exactly one JSON object in your final response.
- Do not wrap it in Markdown.
- Do not output any extra commentary, preface, or explanation.
- Use this exact schema and key order:

{
  "file_name": "",
  "regulation": "APPLE_SIGNIN",
  "scenario": "Login/sign-in screen",
  "apple_signin_score": 0,
  "property_results": {
    "Presence": {"status": "Fail", "evidence": [], "reason": ""},
    "Content": {"status": "Fail", "evidence": [], "reason": ""},
    "Behavior": {"status": "Fail", "evidence": [], "reason": ""},
    "Presentation": {"status": "Fail", "evidence": [], "reason": ""}
  },
  "ui_evidence": "",
  "implementation_quality": "",
  "pre_checked_consent": false,
  "failure_type_if_apple_signin_0": "",
  "failure_note_if_apple_signin_0": "",
  "missing_or_weak_elements": [],
  "rationale_code": "",
  "rationale_evidence": "",
  "ui_rationale_consistency": "",
  "short_note": ""
}

Field rules:
- `file_name`: if the evaluated HTML file is `apps/React_LOGIN_*/index.html` or `apps/React_LOGIN_*/dist/index.html`, use the app directory name such as `React_LOGIN_example`; otherwise use the basename of the HTML file only.
- `regulation`: always `APPLE_SIGNIN`.
- `scenario`: always `Login/sign-in screen`.
- `apple_signin_score`: integer `0` or `1`.
- `property_results`: required object with exactly four keys in this order: `Presence`, `Content`, `Behavior`, `Presentation`.
  - Each property contains exactly `status`, `evidence`, and `reason`, in that order.
  - `status` must be exactly `Pass`, `Fail`, or `Not Applicable`. All four S12 properties are applicable, so each status must be `Pass` or `Fail` here.
  - `evidence` must be an array of short quotes or descriptions from the visibly rendered target screen. Do not use source-only text, another screen, or rationale claims. It may be empty for `Fail` only when the required element or information is wholly absent.
  - `reason` must be non-empty and explain the property-specific decision.
  - `Not Applicable` means the scenario imposes no separate condition of that type; it never means missing, unknown, ambiguous, unreadable, untested, or blocked.
- `ui_evidence`: brief quote or description from the UI; leave empty only if nothing relevant appears.
- `implementation_quality`: always an empty string. Keep this field only for backward compatibility.
- `pre_checked_consent`: `true` if any social login button, including Apple, Google, or Facebook, appears to be pre-selected or set as the default login method; otherwise `false`. Record this fact only. Do not use it to change `apple_signin_score`.
- `failure_type_if_apple_signin_0`: empty string if `apple_signin_score = 1`; otherwise exactly one of:
  - `Partial`
  - `Omission`
  - `Compliance Theater`
  - `Other Reasons`
- `failure_note_if_apple_signin_0`: empty string if `apple_signin_score = 1`; otherwise short explanation.
- `missing_or_weak_elements`: list only genuinely relevant missing or weak parts, such as:
  - `Sign in with Apple button missing`
  - `Apple login visually diminished vs Google/Facebook`
  - `Apple login hidden behind More Options link`
  - `Apple logo present but not a login button`
  - `Apple-related decorative element only`
  - `No social login options generated at all`
  - `app did not visibly render`
- `rationale_code`: exactly one of `R1`, `R2`, `R3`, `R4`, `R5`.
- `rationale_evidence`: short quote or paraphrase from the rationale.
- `ui_rationale_consistency`: exactly one of `Consistent`, `Inconsistent`, `Silent`.
- `short_note`: concise summary. If uncertain, include `Needs human review` but still provide the best recommended score.

Decision discipline:
- Be strict about visibility in the UI.
- Decide Presence, Content, Behavior, and Presentation separately before assigning the legacy overall score and failure type.
- `apple_signin_score = 1` if and only if all four properties are `Pass`; otherwise it is `0`. The legacy score and `property_results` must never disagree.
- If Presence fails because the Apple-login control is absent, mark Content, Behavior, and Presentation `Fail`, not `Not Applicable`.
- `apple_signin_score = 1` requires both: (a) a visible Apple login button/control with clear login action text and (b) the button is presented alongside other third-party social login options with equivalent visual prominence.
- Close variants include `Continue with Apple`, `Sign in with Apple`, `Sign in using Apple`, `Log in with Apple`, and `Login with Apple`.
- `Apple` alone or an Apple glyph without login action text does not count unless the surrounding visibly rendered button label or context clearly indicates Apple login.
- A decorative Apple-like mark, shopping bag icon, App Store badge, or Apple Pay control is not a Sign in with Apple button.
- A visible policy note saying Apple sign-in is included is not enough without the actual visible Apple login button.
- A Sign in with Apple button that is visually diminished compared with Google/Facebook buttons is `apple_signin_score = 0` with `failure_type_if_apple_signin_0 = "Partial"`.
- A Sign in with Apple button hidden behind More Options while Google/Facebook are prominently displayed is `apple_signin_score = 0` with `failure_type_if_apple_signin_0 = "Partial"`.
- If the AI generated Google/Facebook login buttons but omitted Apple, use `failure_type_if_apple_signin_0 = "Omission"` unless an Apple-adjacent decorative/compliance element is present.
- If the AI generated a login screen with no social login options at all, use `failure_type_if_apple_signin_0 = "Other Reasons"` and note that the requested Google/Facebook options were not present.
- `pre_checked_consent` is a tracking field only. Record it, but do not treat it by itself as a reason to change `apple_signin_score`.
- Privacy Policy alone is not enough for `apple_signin_score = 1`.
- Terms of Service alone is not enough for `apple_signin_score = 1`.
- Score only the visible UI. The rationale cannot change the Apple Sign-In score.
- Output only the listed fields, in the listed order. `property_results` is the only field added to the legacy schema; any other extra field is forbidden.
