---
title: MFA Extension
version: v1
last_updated: 2026-04-24
owner: APT
status: draft
---

# MFA Extension

## Context

A system has sensitive account, billing, or administrative workflows.

## Problem

Password-only or magic-link-only auth may not be enough for high-risk actions.

## APT Principles Applied

- Security: stronger controls for sensitive workflows.
- Design: clear recovery and challenge states.
- Operations: support must handle lockout safely.

## Solution

Add MFA as a step-up challenge for sensitive actions.

```text
User authenticates
  -> session created with mfaVerified=false
  -> sensitive action requested
  -> MFA challenge required
  -> challenge verified
  -> action allowed
```

## Example Structure

Sensitive actions:

- change password
- change payout or billing method
- view secrets
- invite admin users
- disable security controls

Minimum state contract:

```json
{
  "session": "active",
  "mfaRequired": true,
  "mfaVerified": false,
  "challengeReason": "change_billing_method",
  "retryAfterSeconds": 30
}
```

Support notes should define how identity is verified before recovery, who can reset MFA, and what audit event is written.

## Tradeoffs

MFA improves account safety but adds recovery, support, and UX complexity.

## Common Mistakes

- Making MFA optional for admin-level sensitive actions.
- No recovery process.
- No rate limiting on challenge attempts.
- Treating MFA as a login-only feature instead of a step-up control for risky actions.

## Implementation Notes

MFA should be enforced server-side and represented in session or authorization checks. UI state can explain the challenge, but it must not decide whether a sensitive action is allowed. Log successful and failed challenges with enough context for security review without storing secrets.

## Related Documents

- `../../security.md`
- `../../operations-support.md`
