---
title: APT API Standards
version: v1
last_updated: 2026-05-31
owner: APT
status: stable
kind: "standard"
domain: "api"
source_paths: ["apt-principles/standards/api/api-standards.md"]
---

# API Standards

Extracted from `system-standards.md`. See that file for full context and examples.

## Baseline

REST is the default contract style unless a project explicitly chooses another with documented rationale.

## Naming

Use nouns, not verbs, for primary resources.

**Correct:**
```
GET  /api/v1/users
POST /api/v1/invoices
GET  /api/v1/invoices/:id
```

**Incorrect:**
```
GET  /api/v1/getUsers
POST /api/v1/createInvoice
```

## Versioning

- Internal app APIs: `/api/*`
- Public stable APIs: versioned paths `/v1/*`
- Internal APIs may return UI-specific view models.
- Public APIs must be stable, documented, and versioned before external consumers depend on them.

## Response Shape

All endpoints must return a consistent shape.

**Success:**
```json
{
  "success": true,
  "data": { ... }
}
```

**Error:**
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable message"
  }
}
```

**Paginated list:**
```json
{
  "success": true,
  "data": [ ... ],
  "pagination": {
    "cursor": "next_cursor",
    "hasMore": true
  }
}
```

## Input Validation

- Validate all inputs at the route boundary.
- Reject invalid input with a structured error response — never pass unvalidated input to business logic or storage.
- Use consistent validation libraries where possible.

## Error Codes

- Use `SCREAMING_SNAKE_CASE` for error codes.
- Codes should be specific enough to act on (e.g., `USER_NOT_FOUND`, not `ERROR`).
- Never expose stack traces or internal paths in error responses.

## OpenAPI

Public APIs must be documented with OpenAPI or an equivalent schema before external consumers depend on them.

## Related

- `system-standards.md` — canonical source
- `checklists/api-standards-checklist.md`
- `examples/api/rest-api-example.md`
- `examples/api/error-response-example.md`
- `examples/api/pagination-example.md`
- `prompts/api-review-prompt.md`
