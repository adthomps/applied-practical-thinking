---
title: Thinking Principle
version: v1
last_updated: 2026-05-31
owner: APT
status: stable
---

# Thinking

**Principle:** Frame the problem before proposing a solution.

Thinking turns ambiguous ideas into explicit decisions, constraints, and measurable success criteria.

## Core Rules

- Do not write code before the problem statement is clear.
- Record decisions that affect scope, architecture, security, or release.
- Document tradeoffs — what is gained, what is lost, and why the tradeoff is acceptable.
- Acknowledge constraints (budget, time, platform, compliance) as design inputs.
- If the problem is unclear, produce a framing brief before producing code.

## Required Artifacts

- Problem statement
- Audience definition
- Success criteria
- Constraint map
- Tradeoff notes
- Decision log entry for durable choices

## Enforcement Points

- No implementation plan without a clear problem statement.
- A requested feature is not automatically the root problem.
- Assumptions that affect scope or security must be recorded.

## Canonical Doc

`thinking.md` — full principles, standards, examples, and AI prompt.

## Related Build Kit

- `checklists/thinking-review-checklist.md`
- `examples/thinking/problem-framing-example.md`
- `prompts/framework-review-prompt.md`
