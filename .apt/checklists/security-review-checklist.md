---
title: Security Review Checklist
version: v1
last_updated: 2026-04-24
owner: APT
status: draft
kind: "checklist"
domain: "security-review-checklist"
source_paths: ["apt-principles/checklists/security-review-checklist.md"]
---

# Security Review Checklist

## Scope

Use this checklist for authentication, authorization, sessions, secrets, user data, external integrations, AI-costly endpoints, payment flows, admin tools, and sensitive operations.

Run it before implementation for high-risk workflows and before release for any change touching trust boundaries. Security review is required even when the visible change is mostly UI if the workflow changes permissions or data exposure.

## Required Checks

- [ ] Authentication method is documented.
- [ ] Authorization is enforced server-side.
- [ ] Trust-boundary and authorization matrix names subject, action, resource, condition, enforcement point, and audit event for sensitive workflows.
- [ ] Inputs are validated at the API boundary.
- [ ] Sessions use secure storage and explicit expiration.
- [ ] Sensitive endpoints have rate limiting or abuse protection.
- [ ] Secrets are configured through environment/bindings and are not committed.
- [ ] Errors are safe and do not leak implementation detail.
- [ ] Audit-relevant actions are logged or traceable.
- [ ] MFA or stronger controls are considered for sensitive workflows.
- [ ] External integrations and webhooks document replay, signature, idempotency, and retry behavior where applicable.
- [ ] High-impact data flows define source authority, retention, redaction, and escalation rules.

## Failure Conditions

- Client-side-only permission checks.
- Long-lived browser tokens in unsafe storage.
- Missing validation on external input.
- Secrets in source code, docs, examples, or logs.
- Raw stack traces or provider errors returned to users.
- Sensitive workflow has no threat/abuse review or escalation criteria.
- Webhook or external integration lacks replay/signature/idempotency notes.

## Evidence Required

- Auth/session model.
- Trust-boundary and authorization matrix.
- Sensitive endpoint list.
- Config/secrets notes.
- Security test or review summary.
- Recovery and support process for account or access failures.
- Risk acceptance record for any deferred security control.
- Threat or abuse review for sensitive workflows.

## Pass Standard

The system should enforce trust on the server side, expose only necessary data, protect credentials and sessions, and make abuse or recovery paths explicit. If a client-side assumption is the only protection, the checklist fails.

## Related Documents

- `../security.md`
- `../system-standards.md`
- `../examples/security/login-session-flow.md`
- `../examples/security/magic-link-flow.md`
- `../examples/security/mfa-extension.md`
- `../examples/security/threat-auth-review-example.md`
