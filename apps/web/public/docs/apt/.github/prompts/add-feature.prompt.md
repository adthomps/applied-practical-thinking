---
description: "Guided prompt for planning and implementing a new feature following the full APT delivery lifecycle: thinking, design, architecture, implementation, testing, and release readiness."
---

# Add Feature (APT)

## Purpose
Guide feature planning and implementation from first principles through release readiness, applying the APT delivery lifecycle so that each gate is met before moving to the next phase.

## Input Expectations
Provide:
- Feature name and one-sentence description
- User problem it solves and who is affected
- Constraints: timeline, risk tolerance, stack
- Known non-goals or out-of-scope items

If inputs are missing, state assumptions explicitly.

## Prompt
```text
You are planning and implementing a new feature following the APT delivery lifecycle.

Feature: [INSERT NAME]
Description: [ONE SENTENCE]
User problem: [WHO has WHAT problem, and WHY does it matter?]
Constraints: [TIMELINE / RISK / STACK]
Non-goals: [WHAT IS OUT OF SCOPE]

Work through each APT phase. Do not move to the next phase until the current phase is complete.

PHASE 1 — Thinking
- Confirm the user, problem, and success criteria are explicit.
- Identify constraints and decision boundaries.
- State assumptions and open questions.
- Gate: Is there a clear problem worth solving, with defined success criteria?

PHASE 2 — Design
- Define the user-facing states: loading, empty, success, error, disabled, permission, offline.
- Identify reused components, tokens, or patterns.
- Flag any new visual treatment that requires a design decision record.
- Gate: Can the design be built with existing tokens and components?

PHASE 3 — Architecture
- Define the data model changes (if any).
- Identify the API contract: endpoint, method, auth, request/response schema.
- Define the service boundary: what is UI logic vs. business logic vs. data layer?
- Flag any new dependency or infrastructure requirement.
- Gate: Is the boundary clear and consistent with existing architecture?

PHASE 4 — Implementation plan
- Break the feature into ordered tasks.
- Identify the first deliverable that can be validated end-to-end.
- List files and components to create or modify.
- Gate: Is the implementation scope bounded and reviewable in a single PR?

PHASE 5 — Testing and validation
- List the unit, integration, and e2e tests required.
- Identify the validation evidence needed before release (screenshots, test output, review sign-off).
- Flag any edge cases or error conditions that must be tested.
- Gate: Can readiness be proven with concrete validation evidence?

PHASE 6 — Release readiness
- Confirm rollback plan.
- Confirm monitoring and error tracking are in place.
- Confirm documentation is updated.
- Gate: Is the team informed and the system observable?

Return a structured plan with outputs for each phase and explicit gate answers.
```

## Expected Output
- Structured phase-by-phase plan with explicit gate answers
- Scoped implementation task list
- Validation evidence requirements
- Release readiness checklist

## Related Documents
- [thinking.md](../../thinking.md)
- [design.md](../../design.md)
- [architecture.md](../../architecture.md)
- [execution.md](../../execution.md)
- [checklists/execution-readiness-checklist.md](../../checklists/execution-readiness-checklist.md)
- [checklists/release-readiness-checklist.md](../../checklists/release-readiness-checklist.md)
