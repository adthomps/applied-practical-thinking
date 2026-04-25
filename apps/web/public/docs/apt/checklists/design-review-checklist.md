---
title: Design Review Checklist
version: v1
last_updated: 2026-04-24
owner: APT
status: draft
---

# Design Review Checklist

## Scope

Use this checklist for user-facing routes, workflows, components, navigation, content surfaces, and design-system changes.

Run it before a UI change is merged or before a public page becomes a showcase example. It checks behavior, hierarchy, visual-system alignment, content clarity, and state coverage.

## Required Checks

- [ ] User goal and primary workflow are clear.
- [ ] Loading, empty, success, error, and disabled states are defined where applicable.
- [ ] Interaction patterns reuse existing APT patterns.
- [ ] Visual styling uses tokens and approved components.
- [ ] Copy is concise, precise, and non-marketing.
- [ ] Focus states and keyboard behavior are accounted for.
- [ ] New patterns include acceptance criteria.
- [ ] Design deviations are documented.

## Failure Conditions

- Happy-path-only design.
- One-off colors, spacing, or component behavior.
- UI component owns business logic or direct API calls.
- Text, states, or actions are ambiguous.
- Accessibility states are missing.

## Evidence Required

- State map or UX flow.
- Screenshots or preview notes when visual.
- Acceptance criteria.
- Token/component notes.
- Accessibility and keyboard review notes.
- Decision record for any visual-system exception.

## Pass Standard

The experience should be understandable without explanation, use shared tokens and patterns, include complete states, and avoid unsupported visual inventions. If users cannot tell what to do, where they are, or what happened, the design does not pass.

## Related Documents

- `../design.md`
- `../thinking.md`
- `../examples/ui/dashboard-layout-pattern.md`
- `../examples/ui/navigation-layout-pattern.md`
