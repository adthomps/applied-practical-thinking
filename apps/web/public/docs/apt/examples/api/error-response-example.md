---
title: Error Response Example
version: v1
last_updated: 2026-04-24
owner: APT
status: draft
---

# Error Response Example

## Context

An API receives invalid input when creating a customer.

## Problem

Returning raw validation exceptions leaks implementation details and makes client handling inconsistent.

## APT Principles Applied

- System standards: structured error envelope.
- Security: safe messages only.
- Operations: errors should be traceable.

## Solution

Return a stable error shape:

```json
{
  "success": false,
  "error": {
    "code": "INVALID_INPUT",
    "message": "Email is required",
    "field": "email",
    "correlationId": "req_123"
  }
}
```

## Example Structure

```text
400 INVALID_INPUT
401 UNAUTHENTICATED
403 FORBIDDEN
404 NOT_FOUND
409 CONFLICT
429 RATE_LIMITED
500 INTERNAL_ERROR
```

Include a correlation or request ID when the system can provide one. Support can use it to connect a user report to logs without exposing stack traces or provider details.

## Tradeoffs

Stable error codes require maintenance, but they make clients, logs, support, and tests more reliable.

## Common Mistakes

- Returning stack traces.
- Returning provider-specific error text to users.
- Mixing `ok`, `success`, and raw error formats.
- Using HTTP `200` for failed writes or authorization failures.

## Implementation Notes

Keep error codes stable even if messages improve. Public APIs should document common codes; internal APIs should still use the same envelope so UI, logs, and support tooling can handle failures predictably.

## Related Documents

- `../../system-standards.md`
- `../../security.md`
- `../../operations-support.md`
