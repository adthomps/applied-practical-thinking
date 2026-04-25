---
title: Architecture Review Prompt
version: v1
last_updated: 2026-04-24
owner: APT
status: draft
---

# Architecture Review Prompt

## Purpose

Review structure, boundaries, deployment fit, and ownership before implementation or release.

## Input Expectations

- Feature or system summary
- Affected apps/packages/services
- API/data contracts
- Deployment target
- Known constraints

## Prompt

```text
You are reviewing architecture using APT Architecture Standards.

Use:
- architecture.md
- system-standards.md
- security.md
- ai-agent-framework.md when AI is involved
- checklists/architecture-review-checklist.md

Review for:
1. Clear responsibility placement
2. Frontend/backend/package boundary safety
3. API and data contract clarity
4. Shared package leakage
5. Deployment and preview fit
6. Failure, rollback, and observability readiness
7. AI prompt/handler ownership if applicable

Return:
- Findings by severity
- Boundary violations
- Required artifacts
- Smallest architecture-safe correction
- Decision records needed for high-risk changes
```

## Expected Output

Findings should name the violated boundary and the intended owner.

Use this shape:

```text
System/change:
Boundary map:
Findings by severity:
Required artifacts:
Smallest safe correction:
Validation/release impact:
```

## Guardrails

- Do not suggest new architecture when an existing pattern solves the problem.
- Do not move business logic into UI or route glue.
- Do not bypass security or deployment standards.
- Do not accept undocumented manual deployment or ownership for a changed boundary.

## Review Evidence

The response should cite affected apps/packages, contracts, deploy targets, ownership, rollback path, and reference maps.

## Related Documents

- `../architecture.md`
- `../examples/architecture/monorepo-layout-example.md`
