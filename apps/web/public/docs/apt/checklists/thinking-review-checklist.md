---
title: Thinking Review Checklist
version: v1
last_updated: 2026-04-24
owner: APT
status: draft
---

# Thinking Review Checklist

## Scope

Use this checklist before a request becomes design, architecture, or implementation work.

Use it for new ideas, feature requests, project pitches, ambiguous bugs that imply product change, and AI build prompts. The goal is to prevent teams from approving a solution before they understand the problem and the decision that must be made.

## Required Checks

- [ ] Problem statement names the real user pain or opportunity.
- [ ] Audience, user, or operator context is explicit.
- [ ] Success criteria are measurable or observable.
- [ ] Constraints are named before solutioning.
- [ ] Key assumptions are visible.
- [ ] Tradeoffs are documented.
- [ ] The smallest useful next step is defined.

## Failure Conditions

- The request starts with a solution and never states the problem.
- Success is described only as "done" or "implemented".
- Constraints are deferred until build time.
- Important assumptions are hidden in conversation instead of captured.

## Evidence Required

- Problem statement.
- Success criteria.
- Constraint and tradeoff notes.
- Decision log entry for durable choices.
- Named owner or decision maker.
- Notes showing what is explicitly out of scope.

## Pass Standard

The work is ready to move forward when a reviewer can explain the problem, audience, success signal, constraints, assumptions, and next step without reading between the lines. If implementation still depends on guessing intent, the checklist has not passed.

## Related Documents

- `../thinking.md`
- `../examples/thinking/problem-framing-example.md`
- `../prompts/framework-review-prompt.md`
