---
title: API Review Prompt
version: v1
last_updated: 2026-04-24
owner: APT
status: draft
---

# API Review Prompt

## Purpose

Review API changes against APT system, architecture, security, and quality standards.

## Input Expectations

- Endpoint list
- Request/response examples
- Auth requirements
- Validation approach
- Tests or validation evidence

## Prompt

```text
You are reviewing API changes using APT standards.

Use:
- system-standards.md
- architecture.md
- security.md
- quality-testing.md
- checklists/api-standards-checklist.md

Review for:
1. Route naming and versioning
2. Internal `/api/*` vs public `/v1/*` boundary
3. Request validation
4. Success/error response shape
5. Authorization and session enforcement
6. Pagination/filtering/sorting contracts
7. Test and validation evidence
8. Documentation gaps

Return:
- Blocking findings
- Non-blocking improvements
- Missing artifacts
- Suggested corrected contract examples
- Consumer impact and migration notes where applicable
```

## Expected Output

Findings should cite concrete endpoints, response fields, or missing artifacts.

Use this shape:

```text
Endpoint:
Verdict:
Blocking issues:
Contract corrections:
Validation/security evidence:
Consumer impact:
```

## Guardrails

- Do not approve client-side-only validation for trusted behavior.
- Do not accept unversioned public APIs.
- Do not return raw provider or stack errors to users.
- Do not introduce a new response shape when the standard envelope is sufficient.

## Review Evidence

The response should include request/response examples, error codes, pagination behavior, auth requirements, and validation evidence.

## Related Documents

- `../system-standards.md`
- `../examples/api/rest-api-example.md`
