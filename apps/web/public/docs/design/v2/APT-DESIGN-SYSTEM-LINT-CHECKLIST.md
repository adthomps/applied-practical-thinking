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
- No raw hex, rgb, or ad hoc hsl values are used in components.
- Primary and accent colors are used intentionally, not decoratively.
- Borders, surfaces, and text colors follow the system hierarchy.

### Fail conditions

- Decorative gradients appear without semantic purpose.
- Accent color is overused.
- Multiple unrelated accent colors are used in the same section.
- Color is doing the job of spacing or hierarchy.

## 3. Typography

### Critical

- Only the approved font stack is used.
- Type scale follows the system hierarchy.
- Headings, body text, and captions are visually distinct.
- Text remains readable at all screen sizes.
- Font size and weight choices feel deliberate and limited.

### Fail conditions

- More than one primary font is used.
- Random font sizes or weights are introduced.
- Typography feels crowded, tiny, oversized, or inconsistent.
- Heading levels are skipped without reason.

## 4. Spacing & Alignment

### Critical

- All spacing uses the approved spacing scale.
- Layout rhythm is consistent across sections and cards.
- Elements align cleanly to a visible grid.
- Padding and gaps feel intentional and repeatable.
- Cards and sections have consistent internal spacing.

### Fail conditions

- Arbitrary spacing values are used.
- Components are almost aligned.
- Similar elements have visibly different spacing.
- Dense sections feel cramped or loose without reason.

## 5. Layout & Responsive Behavior

### Critical

- The layout is mobile-first.
- Content makes sense in a single-column layout.
- Controls wrap before becoming cramped.
- Reading content remains width-constrained.
- Desktop adds clarity, not unnecessary density.

### Fail conditions

- The UI only works well on desktop.
- Cards become unreadable on smaller screens.
- Rows break awkwardly on mobile.
- Desktop introduces extra columns with no usability gain.

## 6. Card-Based Structure

### Critical

- Content is organized using semantic card containers.
- Cards create clear grouping and hierarchy.
- Card variants are used consistently.
- Interactive cards are visibly interactive.
- Hero or feature card usage is limited and intentional.

### Fail conditions

- Free-floating content appears without structure.
- Every card uses a different visual treatment.
- Too many cards compete equally for attention.
- Card interactivity is unclear.

## 7. Components & Pattern Reuse

### Critical

- Existing APT components are reused where appropriate.
- New component patterns are introduced only when necessary.
- Buttons, tags, cards, and layout sections behave consistently.
- Similar actions have similar visual treatment.
- Component variants are chosen intentionally.

### Fail conditions

- Repeated custom one-off patterns appear.
- The same action looks different in different places.
- Default framework components are used without adaptation.
- The UI looks like uncustomized Tailwind, Bootstrap, or shadcn defaults.

## 8. Interaction & Motion

### Critical

- Motion is subtle and purposeful.
- Hover, focus, and pressed states are clearly defined.
- Motion durations stay within the system range.
- Interaction feedback improves understanding.
- Keyboard interaction is supported where relevant.

### Fail conditions

- Motion is decorative or distracting.
- Bounce, overshoot, parallax, or looping effects are used.
- Interactive elements lack visible feedback.
- Focus states are missing or weak.

## 9. States & Edge Cases

### Critical

- Loading state exists and is visible.
- Empty state exists and is understandable.
- Error state exists and explains what happened.
- Success state exists where applicable.
- Partial data and no-data cases are handled.

### Fail conditions

- Blank areas appear during loading.
- Failures are silent.
- Empty screens do not explain next steps.
- Only the happy path is implemented.

## 10. Content & Copy Expression

### Critical

- Labels are plain and descriptive.
- Copy is clear, direct, and low-noise.
- UI language matches the APT tone.
- Navigation labels are functional, not clever.
- Placeholder copy does not remain in final build.

### Fail conditions

- Marketing or hype language appears.
- Labels are vague, aspirational, or trendy.
- Copy creates ambiguity about purpose.
- Placeholder lorem ipsum or filler text remains.

## 11. Accessibility & Readability

### Critical

- Text contrast is readable against all surfaces.
- Interactive targets are large enough on mobile.
- Focus states are visible.
- Content remains readable when zoomed.
- Tables, code blocks, and long text remain usable on small screens.

### Fail conditions

- Contrast drops below practical readability.
- Small touch targets are present.
- Focus is invisible.
- Horizontal overflow breaks general content layout.

## 12. AI / Agent Compliance

### Critical

- No new visual tokens were invented.
- Existing patterns were reused before new ones were created.
- The output does not look like a generic framework scaffold.
- The build includes all required system states.
- The result matches the APT design system, not the model's default habits.

### Fail conditions

- Arbitrary colors, spacing, or typography were introduced.
- Layout drift appeared across screens.
- Agent-generated defaults were left untouched.
- Looks fine replaced actual compliance.

## Fast Pass / Fail Summary

A build should fail review if any of the below are true:

- Decorative gradients are used excessively.
- Spacing is inconsistent.
- Too many fonts or type styles are used.
- The UI looks like default Bootstrap / Tailwind / shadcn.
- Loading, empty, error, or edge states are missing.

## Reviewer Decision

- Pass - compliant with APT design system.
- Pass with fixes - minor issues only.
- Fail - non-compliant, revise before merge.
