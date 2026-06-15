---
description: "Guided prompt for generating or reviewing API contract artifacts: OpenAPI specs, endpoint definitions, error schemas, and validation rules aligned with APT API standards and system-standards.md."
---

# Generate API (APT)

## Purpose
Guide generation or review of an API contract artifact that meets APT API standards: consistent endpoints, error shapes, validation, pagination, and versioning as defined in `system-standards.md` and `standards/api/api-standards.md`.

## Input Expectations
Provide:
- API resource name and purpose
- HTTP method(s) and route pattern
- Auth requirement (public, session, API key, OAuth)
- Request/response shape or schema
- Known edge cases or error conditions

If inputs are missing, state assumptions explicitly.

## Prompt
```text
You are generating or reviewing an API contract following APT API standards.

Resource: [INSERT RESOURCE NAME]
Purpose: [INSERT PURPOSE]
Route: [INSERT ROUTE — use /api/v1/* pattern]
Methods: [GET / POST / PUT / PATCH / DELETE]
Auth: [Public / Session / API Key / OAuth]

Apply these APT API standards:

1. Route structure: /api/v1/{resource}[/{id}][/{sub-resource}]

2. Request validation:
   - Validate all inputs server-side.
   - Return 400 with structured error for invalid input.
   - Never trust client-supplied IDs for authorization decisions.

3. Response shapes:
   - Success: { data: {...} } or { data: [...], meta: { total, page, per_page } }
   - Error: { error: { code: "SNAKE_CASE", message: "...", details?: [...] } }

4. Status codes:
   - 200 OK, 201 Created, 204 No Content
   - 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 409 Conflict
   - 422 Unprocessable Entity (validation), 429 Rate Limited, 500 Internal Error

5. Pagination (for list endpoints):
   - Query params: ?page=1&per_page=20
   - Response meta: { total, page, per_page, has_more }

6. Versioning: all routes under /api/v1/. Breaking changes require a new version path.

7. Auth guard: every non-public route must verify auth before any business logic.

Return:
- Endpoint definition with method, route, auth, and description
- Request schema (TypeScript type or JSON Schema)
- Response schema for success and all error cases
- Validation rules list
- Test cases: happy path, validation failure, unauthorized, not found
```

## Expected Output
- Complete endpoint definition
- Request and response schemas
- All error cases covered
- Test case list for happy path and edge cases

## Related Documents
- [system-standards.md](../../system-standards.md)
- [standards/api/api-standards.md](../../standards/api/api-standards.md)
- [checklists/api-standards-checklist.md](../../checklists/api-standards-checklist.md)
- [examples/api/](../../examples/api/)
