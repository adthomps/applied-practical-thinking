---
title: APT Security & Authentication Standard
version: v1
last_updated: 2026-04-24
owner: APT
status: draft
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

Security prevents protection from being handled inconsistently across projects. It is a formal APT framework area, not a final checklist after build.

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

### Input and Abuse Protection

- Validate all request bodies, params, and query strings at the API boundary.
- Rate limit login, signup, password reset, account recovery, and AI-costly endpoints.
- Use bot or abuse protection for sensitive unauthenticated endpoints.
- Return safe errors that do not leak implementation detail.

### Secrets and Configuration

- Never commit secrets.
- Document required environment variables without exposing values.
- Rotate secrets when exposed, stale, or ownership changes.
- Keep production secrets separate from preview and development.

## Required Artifacts

- Auth/session model
- Authorization rules
- Sensitive endpoint list
- Secrets/configuration notes
- Abuse/rate-limit notes
- Security review checklist

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

## Related Prompts

- `prompts/security-review-prompt.md`

## Related Documents

- `architecture.md`
- `system-standards.md`
- `operations-support.md`

## Summary

Security makes protection a defined system responsibility with explicit trust boundaries and review gates.
