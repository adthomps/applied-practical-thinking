---
title: Pagination Example
version: v1
last_updated: 2026-04-24
owner: APT
status: draft
---

# Pagination Example

## Context

A list endpoint may return hundreds or thousands of records.

## Problem

Returning all records increases latency, cost, and UI instability.

## APT Principles Applied

- System standards: explicit contract.
- Quality: predictable test cases.
- Operations: bounded responses are easier to monitor.

## Solution

Use limit plus cursor pagination:

```text
GET /api/v1/events?limit=50&cursor=evt_123
```

Response:

```json
{
  "success": true,
  "data": [
    {
      "id": "evt_124",
      "type": "support.event"
    }
  ],
  "page": {
    "limit": 50,
    "nextCursor": "evt_174",
    "hasMore": true
  }
}
```

## Example Structure

Define max limits server-side:

```text
default limit: 25
max limit: 100
cursor: opaque stable token or sortable id
```

Document the sort order and filter interaction. If filters change, the client should restart pagination instead of reusing a cursor from a different query.

## Tradeoffs

Cursor pagination is less simple than page numbers, but it behaves better under changing datasets.

## Common Mistakes

- Allowing unbounded `limit`.
- Exposing database offsets as durable public contracts.
- Omitting `hasMore` or `nextCursor`.
- Cursor values that expose internal database IDs or query details.

## Implementation Notes

Cursor pagination is the preferred default for changing datasets. Document maximum page size, sort order, and filter behavior so clients can safely resume, retry, and render partial result sets.

## Related Documents

- `../../system-standards.md`
- `../../checklists/api-standards-checklist.md`
