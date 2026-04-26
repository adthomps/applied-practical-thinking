---
title: Security Review Prompt
version: v1
last_updated: 2026-04-24
owner: APT
status: draft
---

# Security Review Prompt

## Purpose

Review authentication, authorization, session handling, secrets, validation, and abuse controls.

## Input Expectations

- Changed endpoints or workflows
- Auth/session behavior
- Roles or permissions
- Data touched
- Secrets/configuration involved

## Prompt

```text
You are reviewing a change using the APT Security & Authentication Standard.

Use:
- security.md
- system-standards.md
- operations-support.md
- checklists/security-review-checklist.md

Review for:
1. Authentication method and session handling
2. Server-side authorization
3. Boundary validation
4. Secrets and environment safety
5. Sensitive endpoint rate limits or abuse controls
6. Safe error handling
7. Audit or traceability needs
8. Required tests or mitigations

Return:
- Critical findings
- High/medium/low findings
- Required fixes before release
- Residual risk
- Trust-boundary map
```

## Expected Output

Findings should identify the trust boundary and concrete risk.

Use this shape:

```text
Trust boundary:
Critical blockers:
High/medium/low findings:
Required fixes:
Validation required:
Residual risk:
```

## Guardrails

- Do not accept client-side-only authorization.
- Do not expose secrets or raw internal errors.
- Do not invent custom crypto or token schemes.
- Do not assume provider defaults satisfy project-specific authorization, session, or abuse requirements.

## Review Evidence

The response should cite changed endpoints, session behavior, role checks, validation points, secret/config handling, and abuse controls.

## Related Documents

- `../security.md`
- `../examples/security/login-session-flow.md`
