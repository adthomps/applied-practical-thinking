---
title: Outcomes Principle
version: v1
last_updated: 2026-05-31
owner: APT
status: stable
---

# Outcomes

**Principle:** Every action must be traceable to a measurable outcome.

Build nothing without a clear problem, audience, and success criterion.

## Core Rules

- Identify the problem before naming a feature or technology.
- Define success criteria before implementation begins.
- Name the baseline condition and target success signal.
- Identify the evidence that will prove movement.
- Record operational and support impact alongside user impact.
- Avoid work that cannot be measured or explained.
- Higher-order concerns (principles, outcomes, UX) take precedence over implementation details.

## APT Operating Hierarchy

When making decisions, evaluate in this order:

1. Principles
2. Outcomes
3. User Experience
4. Architecture
5. Implementation
6. Operations
7. Optimization

Higher levels always override lower levels.

## Enforcement Points

- PR description must name the outcome being delivered.
- Acceptance criteria must be verifiable, not aspirational.
- Feature requests without problem statements are not implementation-ready.
- "Implemented" is not an outcome unless the changed user, operator, system, or knowledge state is named.

## Canonical Doc

`apt-principles.md` — full framework overview, lifecycle map, and core operating rules.

## Related Build Kit

- `checklists/thinking-review-checklist.md`
- `checklists/execution-readiness-checklist.md`
- `prompts/apt-one-shot-build-prompt.md`
