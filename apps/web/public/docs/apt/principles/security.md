---
title: Security Principle
version: v1
last_updated: 2026-05-31
owner: APT
status: stable
---

# Security

**Principle:** Security is a formal lifecycle layer, not a final checklist.

Authentication, authorization, input validation, session control, secrets management, and abuse protection are part of the architecture.

## Core Rules

- Secure by default: choose the safe option unless explicitly overridden with documented rationale.
- Never trust client input — validate at every boundary.
- Protect trust boundaries: authentication before resources, authorization before actions.
- Use proven patterns — avoid custom auth, custom crypto, or novel session schemes.
- Never expose secrets, tokens, credentials, or personal information in logs, errors, or responses.

## Required Artifacts

- Auth model (how users are authenticated)
- Authorization rules (what actions are permitted and to whom)
- Sensitive endpoint inventory
- Secrets and configuration notes
- Abuse protection notes (rate limiting, bot protection)
- Security review checklist completed

## Enforcement Points

- Authorization not enforced server-side is a blocker.
- Secrets in code, logs, or error messages are blockers.
- Missing input validation at API boundaries is a blocker.
- Custom auth or crypto without explicit rationale is a blocker.

## Canonical Doc

`security.md` — full principles, auth patterns, session rules, input protection, secrets management, and examples.

## Related Build Kit

- `checklists/security-review-checklist.md`
- `examples/security/login-session-flow.md`
- `examples/security/magic-link-flow.md`
- `examples/security/mfa-extension.md`
- `prompts/security-review-prompt.md`
