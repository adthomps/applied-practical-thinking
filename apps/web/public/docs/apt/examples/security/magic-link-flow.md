---
title: Magic Link Flow
version: v1
last_updated: 2026-04-24
owner: APT
status: draft
---

# Magic Link Flow

## Context

A low-friction app wants passwordless login.

## Problem

Magic links are convenient, but weak token handling can create account takeover risk.

## APT Principles Applied

- Security: short-lived tokens and abuse controls.
- Operations: traceable login attempts.
- Release: support understands changed login behavior.

## Solution

Issue a short-lived one-time token and consume it server-side.

```text
POST /api/auth/magic-link/request
  -> validate email
  -> rate limit
  -> create one-time token
  -> send email

POST /api/auth/magic-link/consume
  -> validate token
  -> invalidate token
  -> create session
```

## Example Structure

Token requirements:

- one-time use
- short expiration
- server-side invalidation
- no user enumeration in responses

Example request response:

```json
{
  "success": true,
  "data": {
    "message": "If the email is eligible, a sign-in link will be sent."
  }
}
```

The same response is returned whether the email is known or unknown.

## Tradeoffs

Magic links reduce password friction, but depend on email account security and delivery reliability.

## Common Mistakes

- Reusable magic tokens.
- Long expiration windows.
- Different responses for known vs unknown emails.
- Letting the UI decide whether a token is trustworthy.

## Implementation Notes

Tokens should be single-use, short-lived, stored hashed, and bound to the intended action. Verification should create a normal session through the server-side auth boundary and record enough audit context to investigate abuse.

## Related Documents

- `../../security.md`
- `login-session-flow.md`
