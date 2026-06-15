---
title: APT Design Review Process
version: v1
last_updated: 2026-05-31
owner: APT
status: draft
---

# APT Design Review Process

## Purpose

The Design Review ensures that proposed user experiences are complete, accessible, and aligned with APT design principles before implementation begins.

## When Required

A design review is required when a change involves:

- New user-facing screens or flows
- Changes to navigation or information architecture
- Changes to state handling (loading, empty, error, success states)
- Changes to core visual language (color, typography, layout system)
- AI-assisted features visible to users

Low-risk changes (copy edits, label updates, icon swaps within the design system) do not require a full design review.

## Participants

| Role | Responsibility |
|------|---------------|
| Author | Updates DESIGN.md, provides state coverage evidence |
| Design reviewer | Evaluates against APT design standards |
| Accessibility reviewer | Validates WCAG 2.2 AA compliance |

## What DESIGN.md Must Contain Before Review

A DESIGN.md is ready for review when it includes:

- User flow description
- State coverage (loading, empty, success, error, permission-denied)
- Accessibility notes
- Component and pattern decisions
- Tradeoff notes for non-standard patterns
- Open questions explicitly listed

A DESIGN.md that only describes the happy path is not review-ready.

## Review Steps

### 1. Update DESIGN.md

Ensure the project's DESIGN.md (or the relevant section) reflects the proposed change and covers all required states.

### 2. Complete the Design Checklist

Run through `checklists/design-review-checklist.md` and attach evidence.

### 3. Submit for Review

- Open a PR with the DESIGN.md update.
- Assign a design reviewer.
- Reference `design.md` and `checklists/design-review-checklist.md`.

### 4. Review Criteria

The reviewer evaluates:

- [ ] State coverage complete (loading, empty, success, error, denied)
- [ ] Accessibility requirements met (WCAG 2.2 AA, keyboard nav, screen reader)
- [ ] Consistent with established patterns (no unexplained one-offs)
- [ ] Mobile-first approach confirmed
- [ ] Clarity of user feedback for all actions
- [ ] Forms validate early and explain errors
- [ ] AI-assisted content, if present, is explainable and reviewable
- [ ] Tradeoffs for non-standard decisions documented

### 5. Outcome

| Outcome | Meaning |
|---------|---------|
| Approved | DESIGN.md merged, implementation may begin |
| Approved with conditions | Minor gaps must be addressed during implementation |
| Needs revision | Design requires changes before re-review |

### 6. Record

- Merge approved DESIGN.md update.
- Note the review in the repository scorecard.
- Update related examples or prompts if new patterns emerge.

## Related Docs

- `design.md` — canonical design standards
- `checklists/design-review-checklist.md` — review checklist
- `templates/DESIGN.md` — starter DESIGN.md
- `governance/scorecard.md` — track in scoring
