---
title: REST API Example
version: v1
last_updated: 2026-04-24
owner: APT
status: draft
---

# REST API Example

## Context

A project needs an internal API for listing invoices in an app dashboard.

## Problem

The first proposal used `/api/getInvoices`, returned raw arrays, and duplicated query validation in the UI.

## APT Principles Applied

- System standards: resource naming and structured responses.
- Architecture: worker route owns transport; service owns business logic.
- Security: authorization is enforced server-side.
- Quality: contract behavior is testable.

## Solution

Use a resource-oriented route:

```text
GET /api/v1/invoices?customerId=cus_123&limit=25
```

Success response:

```json
{
  "success": true,
  "data": [
    {
      "id": "inv_123",
      "customerId": "cus_123",
      "status": "open",
      "total": 12000
    }
  ]
}
```

## Example Structure

```text
apps/worker/src/routes/invoices.ts
apps/worker/src/services/invoices.ts
packages/core/src/contracts/invoices.ts
```

Contract notes:

```text
Route owner: worker route
Business owner: invoice service
Auth: server-side customer access check
Validation: customerId required, limit max 100
Errors: INVALID_INPUT, FORBIDDEN, RATE_LIMITED
Pagination: cursor-based when result sets can exceed limit
```

## Tradeoffs

The route is slightly more formal than a quick handler, but the contract is easier to test, document, and reuse.

## Common Mistakes

- Naming routes after actions.
- Returning different shapes for success and error.
- Letting UI components decide authorization.
- Returning database records directly instead of a stable API view.

## Implementation Notes

Keep route handlers focused on transport, validation handoff, authorization, and response shape. Business rules belong in services or shared domain packages so tests can cover them without rendering UI or invoking deployment-specific route glue.

## Related Documents

- `../../system-standards.md`
- `../../architecture.md`
- `../../checklists/api-standards-checklist.md`
