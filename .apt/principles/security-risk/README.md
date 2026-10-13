---
title: APT Security & Authentication Standard
kind: principle-hub
domain: security-risk
status: active
owner: APT
version: v1
last_updated: 2026-08-16
source_paths: ["apt-principles/security.md"]
supersedes: ["apt-principles/security.md"]
---

# APT Security & Authentication Standard

## Overview

APT Security & Authentication defines baseline rules for protecting users, sessions, APIs, data, and system trust boundaries.

Security answers:

- Who is the user?
- What are they allowed to do?
- Where is trust enforced?
- How are secrets protected?
- How is abuse detected or limited?

## Purpose

Security prevents protection from being handled inconsistently across projects. It is a cross-cutting APT overlay applied during thinking, design, architecture, execution, validation, release, operations, and learning—not a final checklist after build.

## Core Principles

### 1. Secure by default

Do not make the insecure path the easier path.

### 2. Never trust client input

All externally supplied values must be validated.

### 3. Protect boundaries

Authentication, authorization, validation, and session enforcement belong on the server side.

### 4. Use proven patterns

Do not invent custom crypto, token formats, or casual security schemes.

### 5. Make security configurable, not optional

Controls like session duration, rate limits, and feature gates should be configurable within safe bounds.

## Standards / Rules

### Authentication Methods

Supported baseline patterns:

- email and password
- magic link where appropriate
- OAuth where appropriate
- MFA extension for sensitive systems

### Session Handling

Preferred baseline:

- secure, httpOnly cookies for browser session/token storage
- explicit session expiration
- explicit idle timeout for sensitive apps
- server-side invalidation on logout where applicable
- refresh token rotation where token refresh exists

Avoid storing sensitive tokens in `localStorage` for browser apps.

### Authorization

- Authentication proves identity; authorization decides access.
- Enforce authorization on the server side.
- Use least privilege for roles, tokens, service accounts, and bindings.
- Sensitive actions should produce audit-relevant events.
- Sensitive workflows should name whether step-up verification, MFA, explicit confirmation, or dual approval is required.
- Authorization reviews should include subject, action, resource, condition, enforcement point, and audit event.

### Input and Abuse Protection

- Validate all request bodies, params, and query strings at the API boundary.
- Rate limit login, signup, password reset, account recovery, and AI-costly endpoints.
- Use bot or abuse protection for sensitive unauthenticated endpoints.
- Return safe errors that do not leak implementation detail.
- External integrations and webhooks should document replay, signature, idempotency, and retry behavior where applicable.
- Health, biometric, financial, identity, payment, and other high-impact data flows must define source authority, retention, redaction, and support escalation rules.

### Secrets and Configuration

- Never commit secrets.
- Document required environment variables without exposing values.
- Rotate secrets when exposed, stale, or ownership changes.
- Keep production secrets separate from preview and development.

### Threat Modeling And Secure Delivery

- Identify protected assets, actors, entry points, trust boundaries, misuse cases, and plausible threats before implementation hardens assumptions.
- Map each material threat to prevention, detection, response, recovery, evidence, and an accountable owner.
- Review authentication, authorization, data flow, dependencies, build provenance, deployment permissions, and rollback as one delivery system.
- Treat dependency and supply-chain risk as part of architecture: pin and review critical dependencies, minimize privileged automation, and preserve build provenance.
- Security findings must distinguish confirmed behavior, plausible risk, assumptions, compensating controls, residual risk, and required approval.

### Identity, Tenancy, And Sensitive Data

- Model subject, action, resource, condition, enforcement point, and audit event for authorization decisions.
- Make tenant and account boundaries explicit in data access, caches, logs, exports, background work, and support tools.
- Classify sensitive data and define collection minimization, storage, redaction, retention, deletion, recovery, and support access.
- Do not place credentials, secrets, private content, or unnecessary personal data in AI prompts, logs, examples, analytics, or error reports.

### Detection, Incident Response, And Recovery

- Define security-relevant telemetry and alert ownership before release.
- Document first response, containment, evidence preservation, communication, recovery, and follow-up learning.
- Make credential rotation, access revocation, feature disablement, rollback, and data correction executable rather than aspirational.
- Convert confirmed incidents and near misses into tests, controls, runbooks, and reusable knowledge.

### AI And Agent Threats

- Treat prompts, retrieved content, tool output, and delegated-agent messages as potentially untrusted input.
- Bound tools and data by task; never let model output grant itself permission or redefine policy.
- Test prompt injection, data exfiltration, confused-deputy behavior, excessive agency, hidden delegation, fabricated evidence, and unsafe fallback.
- Require human approval for security-sensitive remediation, risk acceptance, and consequential production action.

## Required Artifacts

- Auth/session model
- Authorization rules
- Sensitive endpoint list
- Secrets/configuration notes
- Abuse/rate-limit notes
- Security review checklist
- Trust-boundary and authorization matrix
- Threat or abuse review for sensitive workflows
- Escalation criteria for high-impact data, AI, auth, payment, or integration changes
- Secure-delivery and dependency/supply-chain notes
- Detection, incident, containment, recovery, and rollback plan

## Good Example

An auth system uses httpOnly cookies, validates login input server-side, rate limits login attempts, rotates refresh tokens, and logs session invalidation events without exposing secrets.

## Bad Example

The frontend stores long-lived tokens in `localStorage`, decides user permissions locally, and sends raw error details back to users.

## AI Prompt Example

```text
Review this change using APT Security & Authentication.

Input:
- Changed endpoints:
- Auth/session behavior:
- User roles:
- Data touched:

Return:
1. Security findings by severity
2. Missing authorization or validation
3. Secrets/config risks
4. Required tests or mitigations
```

## Related Checklists

- `checklists/security-review-checklist.md`

## Related Examples

- `examples/security/login-session-flow.md`
- `examples/security/magic-link-flow.md`
- `examples/security/mfa-extension.md`
- `examples/security/threat-auth-review-example.md`

## Related Prompts

- `prompts/security-review-prompt.md`

## Related Documents

- `architecture.md`
- `system-standards.md`
- `operations-support.md`

## Summary

Security makes protection a defined system responsibility with explicit trust boundaries and review gates.
