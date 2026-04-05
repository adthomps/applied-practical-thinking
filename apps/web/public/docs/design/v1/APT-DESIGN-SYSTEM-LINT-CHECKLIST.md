# APT Design System Lint Checklist

Use this as a manual review checklist, PR template section, or AI self-check before code is considered complete.

## Purpose

Validate that a UI build follows the APT design system consistently across structure, styling, behavior, and state handling.

## Pass rule

A build should not be considered complete until all critical items pass.

## Merge gate policy

Unresolved critical failures block merge unless a documented exception is linked in `docs/DECISION_LOG.md`.

## 1. Brand & Design Intent

### Critical

- The UI feels calm, clear, and structured.
- The interface does not feel like a marketing site.
- The design emphasizes understanding and usability over novelty.
- Decisions, hierarchy, and purpose are visually clear.

### Fail conditions

- There is visual noise with no meaning.
- The page feels flashy, trendy, or over-designed.
- The UI communicates hype instead of clarity.

## 2. Theme & Color Usage

### Critical

- The UI is dark-first.
- All colors come from semantic tokens.
- Accent is limited to interactive elements, selected states, badges/tags, and large callouts.
- No raw hex, rgb, or ad hoc hsl values are used in components.

### Fail conditions

- Accent is used in body text, captions, or dense metadata.
- Non-underlined inline paragraph links use accent without clear interactivity.
- Decorative gradients appear without semantic purpose.

## 3. Typography

### Critical

- Only the approved font stack is used.
- Type scale follows the system hierarchy.
- Lead token is used for page/section/hero supporting intros where applicable.
- Headings, body text, and captions are visually distinct.

### Fail conditions

- Lead copy is missing where intro bridge is required.
- More than one primary font is used.
- Random font sizes or weights are introduced.

## 4. Spacing & Alignment

### Critical

- Spacing uses fixed semantic spacing tokens.
- `cardPaddingDense` (`p-5`) is used for metadata-heavy compact cards.
- `cardPaddingDefault` (`p-6`) is used for default prose/support cards.
- `cardPaddingFeature` (`p-8`) is used for hero/feature emphasis only.

### Fail conditions

- Arbitrary spacing values are used.
- Legacy spacing ranges are used as ad hoc selection guidance.
- Similar elements have visibly different spacing.

## 5. Layout & Responsive Behavior

### Critical

- Layout is mobile-first.
- Content makes sense in single-column mode.
- Controls wrap before becoming cramped.
- Desktop adds clarity, not unnecessary density.

### Fail conditions

- UI only works well on desktop.
- Rows/cards break awkwardly on mobile.
- Desktop introduces extra columns with no usability gain.

## 6. Card-Based Structure

### Critical

- Canonical variants only: `default`, `interactive`, `elevated`, `hero`.
- Variant usage matches declared purpose.
- Hero variant appears at most once per view.
- Interactive cards are clearly interactive.

### Fail conditions

- Non-canonical variants (`feature`, `subtle`) are introduced in new guidance.
- Multiple cards compete as hero-level emphasis.
- Card interactivity is unclear.

## 7. Components & Pattern Reuse

### Critical

- Existing APT components are reused where appropriate.
- New patterns are introduced only when necessary.
- Similar actions have similar visual treatment.

### Fail conditions

- Repeated one-off patterns appear.
- Default framework styling is left uncustomized.
- Same action appears with inconsistent treatment.

## 8. Interaction & Motion

### Critical

- Hover/focus/press transitions are 150-200ms.
- Standard UI transitions are 180-250ms.
- Entrances/view transitions are 220-320ms.
- Hero transitions are <= 400ms and rare.

### Fail conditions

- Bounce, overshoot, parallax, or decorative looping effects are used.
- Motion timing exceeds allowed ranges without documented exception.
- Interaction feedback is missing or weak.

## 9. States & Edge Cases

### Critical

- Loading, empty, error, success (if relevant), and partial-data states are defined.
- Loading preserves final layout shape.
- Error state explains next step/retry action.
- Empty state includes concise context and action where relevant.

### Fail conditions

- Any required state is missing.
- Failures are silent.
- Happy-path-only implementation is shipped.

## 10. Content & Copy Expression

### Critical

- Labels are plain and descriptive.
- Copy is clear, direct, and low-noise.
- UI language matches APT tone.

### Fail conditions

- Marketing/hype language appears.
- Labels are vague or trendy.
- Placeholder/filler text remains.

## 11. Accessibility & Readability

### Critical

- Contrast is readable across surfaces.
- Focus states are visible.
- Touch targets are mobile-appropriate.
- Long text/tables/code remain usable on small screens.

### Fail conditions

- Focus is invisible.
- Contrast drops below practical readability.
- Horizontal overflow breaks core content.

## 12. AI / Agent Compliance

### Critical

- No new visual tokens are invented.
- No arbitrary spacing/radius/shadow values are introduced.
- No inline style usage except dynamic measurement needs.
- Result matches APT system contracts, not generic scaffold defaults.

### Fail conditions

- Agent defaults are left untouched.
- Non-canonical variants or token misuse appear.
- "Looks fine" replaces contract-level compliance.

## Fast Pass / Fail Summary

A build should fail review if any are true:

- Accent misuse in non-interactive dense text.
- Spacing token misuse or arbitrary spacing values.
- Non-canonical card variant guidance appears.
- Required states are missing.
- Motion timing breaches defined ranges.

## Reviewer Decision

- Pass - compliant with APT design system.
- Pass with fixes - minor issues only.
- Fail - non-compliant, revise before merge.
