---
title: Design Review Prompt
version: v1
last_updated: 2026-04-24
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

Review for:
1. User goal clarity
2. Required states: loading, empty, success, error, disabled
3. Interaction consistency
4. Token and component alignment
5. Copy clarity
6. Accessibility and keyboard behavior
7. Missing acceptance criteria

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
Accessibility notes:
Smallest correction:
Evidence required:
```

## Guardrails

- Do not suggest a new visual language.
- Do not treat decoration as a substitute for hierarchy.
- Do not ignore accessibility states.
- Do not accept happy-path-only UI for workflows with loading, empty, error, disabled, permission, or degraded states.

## Review Evidence

The response should cite screenshots, preview URLs, state maps, component names, token usage, and accessibility checks where available.

## Related Documents

- `../design.md`
- `../checklists/design-review-checklist.md`
