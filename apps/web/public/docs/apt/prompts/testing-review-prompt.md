---
title: Testing Review Prompt
version: v1
last_updated: 2026-04-24
owner: APT
status: draft
---

# Testing Review Prompt

## Purpose

Create or review validation plans for APT changes.

## Input Expectations

- Change summary
- Risk level
- Affected user journeys
- Existing test coverage
- Validation commands or constraints

## Prompt

```text
You are reviewing test and validation coverage using APT Quality & Testing.

Use:
- quality-testing.md
- release-change-management.md
- checklists/release-readiness-checklist.md

Review for:
1. Fast checks: lint, type, unit
2. Boundary checks: contract/integration tests
3. Build checks
4. Preview or visual validation
5. Critical journey E2E checks
6. Diagnostics: logs, traces, screenshots, reports
7. Missing evidence and residual risk

Return:
- Ordered validation plan
- Required evidence
- Failure criteria
- Coverage gaps
- Risk-based rationale for skipped checks
```

## Expected Output

The plan should be executable and ordered from cheapest checks to highest confidence checks.

Use this shape:

```text
Risk:
Fast checks:
Boundary checks:
Preview/manual checks:
Evidence to capture:
Failure response:
Residual gaps:
```

## Guardrails

- Do not require broad E2E coverage for every branch.
- Do not accept "works locally" as release evidence.
- Call out missing diagnostics when failures would be hard to debug.
- Do not skip security, data, or contract validation because the UI change looks small.

## Review Evidence

The response should name commands, artifacts, screenshots, logs, reports, or manual review notes that prove the validation happened.

## Related Documents

- `../quality-testing.md`
- `../release-change-management.md`
