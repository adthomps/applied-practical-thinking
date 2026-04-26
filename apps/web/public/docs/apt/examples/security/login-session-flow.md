---
title: Login Session Flow
version: v1
last_updated: 2026-04-24
owner: APT
status: draft
---

# Login Session Flow

## Context

A protected web app needs email/password login.

## Problem

Client-stored long-lived tokens and local permission checks create avoidable security risk.

## APT Principles Applied

- Security: secure session handling and server-side authorization.
- System standards: structured errors.
- Operations: login failures are traceable.

## Solution

Use server-side login validation and secure cookie session storage.

```text
POST /api/auth/login
  -> validate input
  -> check credentials
  -> create session
  -> set secure httpOnly cookie
  -> return safe user view
```

## Example Structure

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_123",
      "email": "user@example.com"
    }
  }
}
```

Session record:

```text
id
userId
createdAt
expiresAt
revokedAt
lastSeenAt
userAgentHash
```

## Tradeoffs

Cookie-based sessions are more secure for browser apps, but require CSRF and cross-domain configuration awareness.

## Common Mistakes

- Storing access tokens in `localStorage`.
- Returning raw auth provider errors.
- Letting the frontend decide role access.
- Returning full user records when the UI only needs a session summary.

## Implementation Notes

Sessions should have explicit expiration, revocation, and renewal behavior. Server-side authorization should re-check the session and role for protected actions instead of relying on values stored in the browser.

## Related Documents

- `../../security.md`
- `../../checklists/security-review-checklist.md`
