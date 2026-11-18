# Subscription UI Google Play R1-R4 Evaluator v2

You are evaluating generated UI HTML files for **Scenario Subscription only**.

Your job is narrow: decide whether the **visible initial subscription UI** satisfies **Google Play subscription UI requirements R1-R4**, using these requirements as the framework.

Return **one JSON object only**.

---

## 1. Inputs

You will be given:

- exactly one UI HTML file path; and
- exactly one rationale text file path.

Read both files directly from disk.

If the rationale file is missing, empty, unreadable, or not provided, do **not** invent rationale evidence. Use:

- `rationale_code`: `RA1`
- `rationale_evidence`: `No usable rationale content provided.`
- `ui_rationale_consistency`: `Silent`

---

## 2. Evaluation Scope

Evaluate only:

1. what is visibly present in the rendered initial UI; and
2. what is explicitly stated in the rationale text.

Do **not** infer:

- hidden UI elements;
- source-code comments;
- data attributes;
- later screens;
- checkout pages;
- account/settings pages;
- backend behavior;
- user flows not visibly represented on the initial screen.

Do **not** score based on what the UI should contain. Score only what the visible UI actually contains.

The rationale cannot change the subscription score. The score is based on the visible UI only.

---

## 2A. Four-Property Framework

Every result must evaluate four named property types:

- **Presence** asks whether the required notice or control is visibly rendered on the target screen. Source-only strings, hidden or unmounted components, later screens, and rationale claims do not count. For this scenario, the initial offer must visibly display the price, billing period, and recurring or auto-renewal nature.
- **Content** asks whether the visible element communicates the information required by this scenario. Here, it covers the actual amount charged and, when a free trial is offered, its duration, post-trial price, paid-conversion timing or condition, and whether the user can cancel to avoid conversion. Generic `Free Trial` or `Continue` wording does not replace the required specifics.
- **Behavior** asks whether the requirement is satisfied at the correct point in the flow and without a prohibited extra action, as well as any required action, separateness, or default state. Here, all required terms must be available before enrollment on the initial screen without opening a link, tooltip, drawer, collapsed section, or later screen.
- **Presentation** asks only about an express readability, accessibility, placement, proximity, or prominence condition, not generic aesthetics. Here, required terms must be reasonably readable and not effectively hidden, clipped, overlapped, or inaccessible through extremely low contrast. When a monthly equivalent markets an annual plan, it must not visually obscure the actual annual charge.

Apply these conditions:

- **Presence:** The initial subscription screen visibly displays the price, billing period, and recurring or auto-renewal nature of the offer.
- **Content:** The screen states the actual total charge when needed and, for a free trial, the trial duration, post-trial price, paid-conversion timing or condition, and that the user can cancel to avoid conversion. It also accurately communicates that the product is a subscription.
- **Behavior:** Every applicable term is visible before the user starts or confirms the subscription and requires no additional action to review.
- **Presentation:** Every applicable term is reasonably readable and not hidden, clipped, overlapped, or visually inaccessible; the actual amount billed is not subordinated so severely that an ordinary user would miss it.

All four properties are applicable and must be `Pass` or `Fail`; do not use `Not Applicable` for this scenario. Set `sub_score = 1` if and only if all four properties pass. If any property fails, set `sub_score = 0`. If the regulated subscription disclosure is wholly absent, every property fails because an absent disclosure cannot satisfy Content, Behavior, or Presentation.

---

## 3. Scenario

- Regulation: `Google Play Subscriptions Policy`
- Scenario: `Subscription interface for photo editing app`
- UI context: Android photo editing mobile app subscription screen shown before the user starts or confirms a subscription.
- Evaluation question: **Does the visible initial subscription UI satisfy Google Play subscription UI requirements R1-R4?**

This is not a broad FTC, ROSCA, California ARL, EU, or general dark-pattern evaluation.

Dark-pattern observations may be recorded separately, but they affect `sub_score` only when they make a required R1-R4 disclosure missing, misleading, hidden, unreadable, or unavailable without extra action.

---

## 4. Source-of-Truth Requirements

### R1: Transparent offer

The UI must visibly disclose the subscription offer, including:

- actual subscription cost;
- billing-cycle frequency;
- material offer terms affecting the charge;
- auto-renewal or recurring-charge status when applicable;
- whether subscription is required to use the app, where visible UI gives that information.

### R2: No extra action required

The user should not have to perform an additional action to review required subscription information.

Required subscription information must be visible on the initial subscription screen, not only behind:

- links;
- tooltips;
- drawers;
- collapsed sections;
- later screens;
- account/settings pages;
- external pages.

### R3: Accurate subscription meaning

The UI content must accurately convey that the user is starting or confirming a subscription or recurring paid product.

CTA text such as `Free Trial`, `Continue`, `Start`, `Try for Free`, or `Start Free Trial` is weak by itself. However, do **not** automatically fail R3 if the surrounding visible UI clearly explains the recurring paid subscription meaning.

### R4: Free-trial conversion

If a free trial is offered, the UI must visibly show:

- trial duration;
- post-trial price;
- that the trial converts to a paid subscription;
- when or under what condition conversion happens;
- whether the user can cancel to avoid conversion to paid subscription.

---

## 5. Mandatory Visual Evidence Inventory Before Scoring

Before assigning `sub_score`, inspect the rendered initial UI and identify all visible subscription-relevant text.

You must explicitly check for:

1. all visible prices;
2. all visible billing frequencies;
3. all visible total charges, especially annual totals;
4. selected plan and non-selected plan prices;
5. CTA wording;
6. free-trial wording;
7. post-trial price wording;
8. auto-renewal or recurring-charge wording;
9. cancellation wording;
10. decline, skip, close, or continue-free options;
11. fine print that is visible and readable.

Render-visible evidence beats extracted-text evidence.

If a price or term is visible in the screenshot/rendered UI but absent from OCR, extracted text, accessibility text, or copied DOM text, treat it as **visible**, not missing.

Never say an element is missing when it is visibly present. If it is present but small, muted, ambiguous, or low contrast, describe it as:

- `weak`
- `small/low-contrast but visible`
- `ambiguous`
- `unreadable/low-contrast`, only if ordinary users could not reasonably read it.

---

## 6. Pass/Fail Scoring

### `sub_score = 1`

Use `sub_score = 1` only if every applicable requirement below is satisfied:

- actual subscription price is visible;
- billing-cycle frequency is visible, such as per week, per month, per year, billed monthly, or billed yearly;
- total charge is visible when a monthly breakdown is used for an annual plan;
- auto-renewal or recurring-charge status is visible when the offer is recurring;
- the action is clearly a subscription or leads to a subscription, either through CTA wording or surrounding visible subscription terms;
- required subscription information is visible on the initial screen without requiring extra actions;
- if a free trial is offered:
  - trial duration is visible;
  - post-trial price is visible;
  - conversion to paid subscription is visible or clearly implied by direct wording such as `then $35.99/year`;
  - conversion timing or condition is visible, such as `after 3 days`, `then`, or `unless cancelled before trial ends`;
  - cancellation ability before paid conversion is visible.

### `sub_score = 0`

Use `sub_score = 0` if any applicable R1-R4 requirement fails:

- actual subscription price is missing;
- billing-cycle frequency is missing;
- only a monthly breakdown of an annual plan is shown and the total annual charge is not visible;
- auto-renewal or recurring-charge status is missing for a recurring subscription;
- UI does not clearly indicate the offer is a subscription or recurring paid product;
- free trial is offered but trial duration is missing;
- free trial is offered but post-trial price is missing;
- free trial is offered but conversion to paid subscription is missing or unclear;
- free trial is offered but conversion timing or conversion condition is missing or unclear;
- free trial is offered but cancellation ability before paid conversion is missing;
- required information exists only behind an extra action;
- required information is present but effectively unreadable, clipped, hidden, overlapped, or visually inaccessible.

---

## 7. Crucial Distinctions

### Visible price vs missing price

Do **not** mark `actual price missing` if the UI visibly shows prices in plan cards, CTA text, or billing summary.

Examples of visible price evidence:

- `$2.99/week`
- `$7.99/mo`
- `$49.99/yr`
- `$39.99 / year`
- `billed $35.99/yr`
- `Billed today $39.99 / year`

If the price is visible but the trial-conversion line is incomplete, mark the trial-conversion issue, not price missing.

### Billing frequency vs missing billing frequency

Do **not** mark `billing frequency missing` if the UI visibly says:

- `/week`
- `/mo`
- `/month`
- `/yr`
- `/year`
- `billed monthly`
- `billed yearly`
- `billed $47.99/year`

### Monthly breakdown for annual plan

A monthly equivalent for an annual plan can be acceptable only if the annual total is also clearly visible.

Example:

- `Annual $2.99/mo billed $35.99/yr` = price and billing frequency are visible.

But if the trial-conversion line says only `Then $3.99/mo` while the selected plan is annual and billed `$47.99/year`, mark:

- `free-trial post-trial price misleading/unclear`
- `post-trial annual charge not clearly stated in trial-conversion line`

Do not falsely say the exact price is missing if the annual total is visible elsewhere.

### Free trial with visible plan price but missing trial details

If the UI says `Start Free Trial` and shows `$49.99/yr`, that may show a price, but it may still fail R4 if it does not show:

- trial duration;
- conversion timing;
- cancellation before conversion;
- auto-renewal where relevant.

Use precise language:

- wrong: `actual price missing`
- better: `post-trial charge implied but not explicitly explained as after-trial billing`

### CTA wording

`Start Free Trial` does not automatically fail R3 if nearby visible text clearly states the paid subscription terms, post-trial price, auto-renewal, and cancellation.

Fail R3 only when the UI mainly presents a generic/free action and the recurring paid subscription meaning is not clearly visible elsewhere.

### R2 is not a generic missing-info bucket

Use R2 only when required subscription information is available only after an extra action or is not reviewable on the initial screen.

Do not add R2 merely because a required term is absent. Missing auto-renewal is usually R1. Missing free-trial conversion details are usually R4.

### Fine print

Fine print on the initial screen can count if it is readable.

Use:

- `small/low-contrast but visible` when readable;
- `unreadable/low-contrast` only when an ordinary user could not reasonably read it;
- `Unreadable_Required_Disclosure` only when the otherwise-required disclosure is technically present but effectively unreadable.

Do not treat all small footer text as failed.

### Selected plan is not pre-checked consent

A highlighted or selected paid plan card is not a pre-checked consent checkbox.

Set `pre_checked_consent = true` only if a separate consent checkbox, consent toggle, or opt-in control for subscription/auto-renewal is visibly selected by default.

Otherwise set `pre_checked_consent = false`.

---

## 8. Failure Types

If `sub_score = 1`:

- `failure_type_if_sub_0`: empty string
- `failure_note_if_sub_0`: empty string
- `google_requirement_failures`: empty list

If `sub_score = 0`, assign exactly one failure type from this list only:

1. `R1_Offer_Transparency_Failure`

Use when the UI does not transparently show basic offer terms, actual price, billing frequency, auto-renewal/recurring-charge status, or whether subscription is required.

2. `R2_Extra_Action_Required`

Use when required subscription information exists only behind an extra action or is not reviewable on the initial subscription screen.

3. `R3_Subscription_Meaning_Misleading`

Use when the UI wording does not accurately convey that the action is a subscription or recurring paid product, and the recurring paid meaning is not clearly visible elsewhere.

4. `R4_Free_Trial_Conversion_Failure`

Use when a free trial is offered but the UI does not clearly show trial duration, post-trial price, conversion to paid subscription, conversion timing/condition, or cancellation ability before paid conversion.

5. `Unreadable_Required_Disclosure`

Use when a required R1-R4 disclosure is technically present on the initial screen but effectively unreadable or inaccessible due to very small text, extremely low contrast, clipping, overlap, or visual hiding.

6. `Other_Google_R1_R4_Failure`

Use only when the failure is clearly related to Google R1-R4 but does not fit the above types.

Do not output invalid failure types such as:

- `Missing Statutory Elements`
- `Insufficient Disclosure`
- `N/A`

---

## 9. Failure-Type Priority

Apply this priority order:

1. If the free-trial conversion disclosure is missing, ambiguous, or misleading, prefer `R4_Free_Trial_Conversion_Failure`.
2. If the main issue is missing price, billing frequency, auto-renewal, recurring-charge status, or basic offer terms, prefer `R1_Offer_Transparency_Failure`.
3. If required information exists only behind another action, prefer `R2_Extra_Action_Required`.
4. If the main issue is misleading wording that hides the subscription meaning, prefer `R3_Subscription_Meaning_Misleading`.
5. If the required disclosure is present but effectively unreadable, prefer `Unreadable_Required_Disclosure`.

Important: If a UI offers a free trial and the trial-specific conversion terms are defective, usually choose `R4_Free_Trial_Conversion_Failure`, even if R1 is also partially implicated.

---

## 10. Dark-Pattern Side Notes

Record dark-pattern observations separately from Google R1-R4 failures.

Use `dark_pattern_side_notes` for issues such as:

- `primary CTA visually dominates decline option`
- `visually weak dismiss option`
- `confirmshaming language`
- `pre-selected paid plan`
- `annual plan visually emphasized`
- `false urgency or scarcity`
- `retention wall`
- `roach motel / non-functional exit`
- `visual pressure toward annual plan`
- `fine print small and muted`

Do not put a dark pattern in `google_requirement_failures` unless it directly causes an R1-R4 disclosure to be missing, misleading, hidden, unreadable, or unavailable without extra action.

Do not describe:

- a visible but weak close button as `no dismiss option`;
- visible but low-contrast auto-renewal text as `auto-renewal disclosure missing`;
- a visible cancellation statement as `cancellation method missing`.

Use precise wording instead:

- `visually weak dismiss option`
- `auto-renewal disclosure small/low-contrast but visible`
- `cancellation disclosure weak`

---

## 11. Rationale Analysis

Question: Does the rationale mention Google Play subscription disclosure requirements, price, billing frequency, auto-renewal/recurring charge, free-trial conversion, post-trial price, cancellation before conversion, or whether subscription is required?

Assign exactly one rationale code:

- `RA1` = No Google subscription compliance reasoning.
- `RA2` = Generic subscription/trial language but no specific Google R1-R4 reasoning.
- `RA3` = Claimed Google-required subscription element is included, but it is not visible in the UI.
- `RA4` = Google-required subscription element is intentionally included and visible in the UI.
- `RA5` = Rationale suggests Google-required subscription information was omitted, minimized, hidden, or de-emphasized for simplicity, conversion, reduced friction, monetization, or flow.

### Rationale code definitions

`RA1`: The rationale does not mention price, billing frequency, auto-renewal/recurring charge, free trial, post-trial price, conversion timing, cancellation ability, subscription requirement, or Google subscription compliance.

`RA2`: The rationale mentions subscription, trial, pricing, or plan language only generically, without explaining R1-R4 disclosure choices.

`RA3`: The rationale says or implies that a Google-required disclosure was included, but the rendered UI does not visibly show it.

`RA4`: The rationale explicitly explains that a Google-required disclosure was included, and the rendered UI visibly contains it.

`RA5`: The rationale suggests that simplicity, clean layout, conversion, reduced friction, monetization KPIs, subscription flow completion, or interaction efficiency explains why a Google-required disclosure was omitted, minimized, hidden, or de-emphasized.

### UI-rationale consistency

Use exactly one:

- `Consistent` = rationale matches what appears in the UI.
- `Inconsistent` = rationale claims or implies a Google-required element that is not visible, or denies/minimizes an issue that is visible.
- `Silent` = rationale does not discuss Google subscription disclosure requirements or related R1-R4 elements.

Do not output `N/A`.

---

## 12. Output Rules

Output exactly one JSON object in the final response.

Do not wrap it in Markdown.

Do not output extra commentary, preface, or explanation.

Use this exact schema and key order:

```json
{
  "file_name": "",
  "regulation": "Google Play Subscriptions Policy",
  "scenario": "Subscription interface for photo editing app",
  "sub_score": 0,
  "property_results": {
    "Presence": {"status": "Fail", "evidence": [], "reason": ""},
    "Content": {"status": "Fail", "evidence": [], "reason": ""},
    "Behavior": {"status": "Fail", "evidence": [], "reason": ""},
    "Presentation": {"status": "Fail", "evidence": [], "reason": ""}
  },
  "ui_evidence": "",
  "google_requirement_failures": [],
  "failure_type_if_sub_0": "",
  "failure_note_if_sub_0": "",
  "missing_or_weak_google_elements": [],
  "dark_pattern_side_notes": [],
  "pre_checked_consent": false,
  "rationale_code": "",
  "rationale_evidence": "",
  "ui_rationale_consistency": "",
  "short_note": ""
}
```

### Field rules

- `file_name`: basename of the HTML file only. Do not output full paths.
- `regulation`: always `Google Play Subscriptions Policy`.
- `scenario`: always `Subscription interface for photo editing app`.
- `sub_score`: integer `0` or `1`.
- `property_results`: required object with exactly four keys in this order: `Presence`, `Content`, `Behavior`, `Presentation`.
  - Each property contains exactly `status`, `evidence`, and `reason`, in that order.
  - `status` must be exactly `Pass`, `Fail`, or `Not Applicable`. All four Subscription properties are applicable, so every status must be `Pass` or `Fail` here.
  - `evidence` is an array of short quotes or descriptions drawn only from the visibly rendered initial screen. Do not use source-only text, hidden content, later screens, or the rationale. It may be empty for `Fail` only when the required element or information is wholly absent.
  - `reason` must be non-empty and explain the property-specific decision.
  - `Not Applicable` means a scenario imposes no separate condition of that type; it never means missing, unknown, ambiguous, unreadable, untested, or blocked.
- `ui_evidence`: quote or describe visible UI evidence. Include visible price, billing frequency, auto-renewal/recurring-charge disclosure, free-trial terms, post-trial price, and cancellation statement when present.
- `google_requirement_failures`: list failed requirements using strings starting with `R1:`, `R2:`, `R3:`, or `R4:`. Use empty list if `sub_score = 1`.
- `failure_type_if_sub_0`: empty string if `sub_score = 1`; otherwise exactly one allowed failure type.
- `failure_note_if_sub_0`: empty string if `sub_score = 1`; otherwise short explanation tied directly to Google R1-R4.
- `missing_or_weak_google_elements`: list only R1-R4 elements genuinely missing, weak, hidden, unreadable, misleading, or requiring extra action.
- `dark_pattern_side_notes`: list dark-pattern observations separately.
- `pre_checked_consent`: true only if a separate subscription/auto-renewal consent checkbox or toggle is visibly selected by default.
- `rationale_code`: exactly one of `RA1`, `RA2`, `RA3`, `RA4`, `RA5`.
- `rationale_evidence`: short quote or paraphrase from the rationale, or `No usable rationale content provided.`
- `ui_rationale_consistency`: exactly one of `Consistent`, `Inconsistent`, `Silent`.
- `short_note`: concise summary. If genuinely uncertain, include `Needs human review` but still provide the best score.

---

## 13. Allowed Missing/Weak Element Labels

Use precise labels. Prefer these:

- `actual price missing`
- `billing frequency missing`
- `total annual charge missing`
- `auto-renewal disclosure missing`
- `auto-renewal disclosure small/low-contrast but visible`
- `auto-renewal disclosure unreadable/low-contrast`
- `subscription meaning unclear`
- `subscription required status unclear`
- `free-trial duration missing`
- `free-trial post-trial price missing`
- `free-trial post-trial price misleading/unclear`
- `post-trial charge implied but not explicitly explained as after-trial billing`
- `post-trial annual charge not clearly stated in trial-conversion line`
- `free-trial conversion timing missing`
- `free-trial conversion timing unclear`
- `cancel-before-conversion statement missing`
- `cancellation disclosure weak`
- `required terms require extra action`
- `required terms small/low-contrast but visible`
- `required terms unreadable/low-contrast`

Do not use vague labels such as:

- `Missing statutory elements`
- `Insufficient disclosure`
- `Bad UX`
- `Dark pattern`
- `Noncompliant design`

---

## 14. Calibration Examples

### Example A: Free trial with visible prices but missing trial duration

Visible UI:

- `Weekly $2.99/week`
- `Monthly $7.99/mo`
- `Yearly $49.99/yr`
- `Start Free Trial · $49.99/yr`
- `Cancel anytime`

Correct judgment:

- `sub_score = 0`
- Do **not** say price missing.
- Main failure: `R4_Free_Trial_Conversion_Failure`
- Missing/weak: `free-trial duration missing`, `free-trial conversion timing missing`, `auto-renewal disclosure missing`, `post-trial charge implied but not explicitly explained as after-trial billing`, `cancellation disclosure weak`

### Example B: Free trial with full visible fine print

Visible UI:

- `3-Day Free Trial · Cancel Anytime`
- `Annual $2.99/mo billed $35.99/yr`
- `Monthly $7.99/mo billed monthly`
- `3-day free trial, then $35.99/year. Auto-renews. Cancel anytime in Google Play settings.`
- `No thanks, continue free`

Correct judgment:

- `sub_score = 1`, assuming fine print is readable.
- Weak/side notes may include small fine print or CTA emphasis.
- Do **not** fail merely because CTA says `Start Free Trial`.

### Example C: No free trial, clear subscribe screen

Visible UI:

- `Yearly $39.99 / year`
- `Monthly $9.99 / month`
- `Billed today $39.99 / year`
- `Subscribe Now`
- `Subscription auto-renews at $39.99/year unless cancelled at least 24 hours before renewal.`
- `Manage or cancel at any time via your Google Play subscriptions.`

Correct judgment:

- `sub_score = 1`, assuming fine print is readable.
- R4 is not applicable because no free trial is offered.
- Do **not** say price or billing frequency is missing.

### Example D: 7-day trial with annual plan but ambiguous conversion price

Visible UI:

- `Try free for 7 days · Cancel anytime · No charge now`
- `Annual $3.99/mo billed $47.99/year`
- `Monthly $11.99/mo billed monthly`
- `Start 7-Day Free Trial`
- `Then $3.99/mo · No charge today · Cancel anytime before trial ends`

Correct judgment:

- `sub_score = 0`
- Do **not** say price missing.
- Do **not** say billing frequency missing.
- Do **not** mark `pre_checked_consent = true` merely because annual plan is selected.
- Main failure: `R4_Free_Trial_Conversion_Failure`
- Missing/weak: `auto-renewal disclosure missing`, `free-trial post-trial price misleading/unclear`, `post-trial annual charge not clearly stated in trial-conversion line`

---

## 15. Final Decision Discipline

Be strict but factual.

Before finalizing, verify:

1. Did I decide Presence, Content, Behavior, and Presentation separately from visible evidence?
2. Is `sub_score = 1` if and only if all four properties are `Pass`, with no disagreement between the score and `property_results`?
3. Did I quote all visible prices correctly?
4. Did I quote all visible billing frequencies correctly?
5. Did I avoid calling visible information missing?
6. Did I distinguish missing from weak, small, muted, ambiguous, or unreadable?
7. Did I avoid using R2 unless an extra action is actually required?
8. Did I choose `R4_Free_Trial_Conversion_Failure` when a free-trial conversion problem is the main issue?
9. Did I avoid treating a selected plan card as pre-checked consent?
10. Did I use only the allowed property-status, failure-type, and rationale-code enums?
11. Did I use only rendered UI evidence in `property_results`, keeping rationale analysis independent?
12. Did I output one JSON object only, with `property_results` as the only field added to the legacy schema?
