---
title: Design Review Prompt
version: v1
last_updated: 2026-04-28
owner: APT
status: draft
---

# Design Review Prompt

## Purpose

Review user-facing behavior, interaction states, visual consistency, and accessibility against APT Design Principles.

## Input Expectations

- Feature or screen summary
- Primary user workflow
- Available states or screenshots
- Component/token changes
- Known constraints

## Prompt

```text
You are reviewing design using APT Design Principles.

Use:
- design.md
- thinking.md
- checklists/design-review-checklist.md
- examples/ui/dashboard-layout-pattern.md
- examples/ui/navigation-layout-pattern.md
- examples/ui/design-system-primitives-pattern.md
- examples/ui/feedback-alert-toast-pattern.md
- examples/ui/chart-data-visualization-pattern.md
- examples/ui/design-reference-kit/

Review for:
1. User goal clarity
2. Required states: loading, empty, success, error, disabled
3. Interaction consistency across navigation, controls, disclosure, feedback, technical content, and modal/dialog primitives
4. Token and component alignment, including semantic color roles for navigation, actions, status, selection, focus, hover, disabled states, charts, and feedback
5. APT voice: precise, technical, non-marketing, evidence-oriented, and free of decorative emoji in product chrome
6. Surface fit for dashboards, docs/principles browsers, product/portfolio pages, insights/content cards, account/settings flows, and transactional email
7. Accessibility, keyboard behavior, contrast, reduced motion, and readable wrapping
8. Missing acceptance criteria or evidence

Return:
- Blocking design issues
- Non-blocking refinements
- Missing states or artifacts
- Smallest corrective changes
- Evidence needed before release
```

## Expected Output

Findings should map to specific states, interactions, copy, or component decisions.

Use this shape:

```text
Workflow:
Blocking issues:
Missing states:
Token/component alignment:
Primitive and surface alignment:
Content voice:
Accessibility notes:
Smallest correction:
Evidence required:
```

## Guardrails

- Do not suggest a new visual language.
- Do not accept raw color values, teal-as-default-CTA treatment, missing focus color, or ambiguous active navigation without a decision record.
- Verify that blue carries primary actions, links, focus rings, and high-frequency action emphasis.
- Verify that active navigation, hover, and focus states use primary or neutral selected-surface roles, and that the restricted accent is limited to explicit support semantics such as badges, callouts, charts, and success treatment.
- Verify that danger, warning, and success colors are semantic feedback only.
- Verify that charts lead with primary blue, use the chart ramp in order, and reserve status colors for real status or risk.
- Verify that Lucide-style icons and the AptEmblem pattern are used where iconography or brand marks are needed.
- Verify that Inter or the approved system fallback is used for UI/prose and IBM Plex Mono is used for code, token values, CLI examples, and technical snippets.
- Verify that account flows handle validation, recovery, consent, unsaved changes, and destructive sections.
- Verify that transactional email uses email-safe layout and flattened token colors instead of browser-only CSS assumptions.
- Verify that docs/content surfaces preserve source clarity, metadata, anchors or table-of-contents behavior where useful, and honest disclaimer/status notes.
- Do not treat decoration as a substitute for hierarchy.
- Do not ignore accessibility states.
- Do not accept happy-path-only UI for workflows with loading, empty, error, disabled, permission, or degraded states.

## Review Evidence

The response should cite screenshots, preview URLs, vendored kit paths, state maps, component names, token usage, chart semantics, content examples, email-client constraints, and accessibility checks where available.

## Related Documents

- `../design.md`
- `../checklists/design-review-checklist.md`
