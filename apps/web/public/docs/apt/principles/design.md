---
title: Design Principle
version: v1
last_updated: 2026-05-31
owner: APT
status: stable
---

# Design

**Principle:** Define complete behavior before implementation spreads design decisions across code.

Design answers what the solution communicates, how it behaves across every state, and what the user experiences.

## Core Rules

- Design complete behavior: cover loading, empty, success, error, and permission-denied states.
- Clarity over cleverness — interfaces must communicate without guessing.
- Systems over screens — design the pattern, not just the screen.
- Consistency beats novelty — prefer established patterns over one-off interactions.
- Accessibility is required, not optional (WCAG 2.2 AA minimum).

## Design Hierarchy

1. User Goals
2. Accessibility
3. Usability
4. Consistency
5. Visual Design

Visual styling must never override usability.

## Required Artifacts

- DESIGN.md in the project
- State coverage (all states handled)
- Acceptance criteria per user flow
- Tradeoff notes for non-standard patterns

## Enforcement Points

- Missing state coverage (empty, error, loading) is a blocker.
- Accessibility failures are blockers.
- New visual patterns require explicit rationale.

## Canonical Doc

`design.md` — full principles, visual language, component patterns, header/footer specs, and AI prompt.

## Related Build Kit

- `checklists/design-review-checklist.md`
- `examples/ui/dashboard-layout-pattern.md`
- `examples/ui/footer-layout-pattern.md`
- `examples/ui/navigation-layout-pattern.md`
- `prompts/design-review-prompt.md`
