---
docId: design-thinking
slug: thinking
major: 2
semanticVersion: 2.0.0
status: candidate
publishedAt: 2026-04-05
---
# APT Design Thinking Framework

A practical framework for problem framing, assumption testing, and decision-making before implementation.

---

## Table of Contents

1. [Philosophy](#philosophy)
2. [Core Principles](#core-principles)
3. [Thinking Frameworks](#thinking-frameworks)
4. [Decision Documentation](#decision-documentation)
5. [Applied Examples](#applied-examples)
6. [Anti-Patterns](#anti-patterns)
7. [Design-to-Delivery Guard Rails](#design-to-delivery-guard-rails)

---

## Philosophy

Design thinking at APT is rigorous, documented reasoning that precedes implementation.

---

## Core Principles

1. Problems before solutions
2. Constraints are features
3. Decisions decay unless documented
4. Iterate intentionally
5. Optimize for learning
6. Decide and document

---

## Thinking Frameworks

Use these repeatedly across product and system work:

- Problem framing
- Assumption mapping
- Constraint analysis
- Decision trees
- Iteration cycles
- Systems mapping

---

## Decision Documentation

Document significant decisions with:

- context
- decision
- rationale
- alternatives considered
- consequences
- assumptions

---

## Applied Examples

Use this framework for:

- design system evolution
- navigation and IA decisions
- taxonomy and content separation

---

## Anti-Patterns

- analysis paralysis
- solution-first thinking
- assumption blindness
- constraint avoidance
- documentation debt
- iteration theater

---

## Design-to-Delivery Guard Rails

This section aligns Design Thinking with the strict Design System v2 doctrine so reasoning and implementation stay consistent.

### Guard-Rail Contract

Every proposed UI change must explicitly account for:

1. Accent restrictions
2. Lead typography usage for intro bridges
3. Fixed semantic spacing rules
4. Canonical 6-card variant model (`default`, `interactive`, `elevated`, `hero`, `subtle`, `feature`) with usage guard rails
5. State pattern requirements (loading, empty, error, success-if-relevant, partial-data)
6. Motion timing rules and anti-pattern bans
7. AI misuse-prevention constraints

### Non-Happy-Path Requirement

Before implementation starts, every async or data-driven flow must define:

- loading behavior
- empty behavior
- error behavior and recovery path
- success behavior where relevant
- partial-data behavior

No flow is design-ready if it defines only the happy path.

### Delivery Readiness Checklist

A proposal is ready for build only when it includes:

- problem statement and success criteria
- decision rationale and constraints
- explicit guard-rail mapping to Design System v2 rules
- non-happy-path definitions
- fallback plan if assumptions fail

---

## Four Enforcement Layers

Use this framework with the enforcement stack:

1. Design doctrine (`Design Thinking`, `Design System`, `Design Architecture`)
2. Internal AI behavior control (`.github/copilot-instructions.md`)
3. External AI reference (`APT-AI-INSTRUCTIONS-REFERENCE.md`)
4. Machine-readable visual enforcement (`apps/web/docs/design/tokens.json`)
5. Layout baseline scaffold (`apps/web/components/apt/AptLayout.tsx`)
6. Starter prompt template (`apps/web/ai/prompts/start-prompt-example.md`)

---

## Version

**v2.0.0-candidate** — April 2026

---

*APT Design Thinking Framework — Applied Practical Thinking*
