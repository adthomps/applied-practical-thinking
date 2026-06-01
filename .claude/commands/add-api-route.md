# Add API Route

Add or update a Cloudflare Worker API route following APT system-standards and Hono conventions.

## Instructions

1. Read `AGENTS.md` and `apt-principles/system-standards.md`.
2. Inspect existing routes in `apps/worker/src/routes/` to understand patterns.
3. Define the API contract before writing any implementation:
   - Endpoint path and HTTP method
   - Request body or query params
   - Success response shape
   - Error cases and codes
   - Auth requirements
4. Validate all user input at the route boundary before calling services.
5. Keep route handlers thin — business logic in `apps/worker/src/services/`.
6. Use APT-standard response shapes:
   - Success: `{ success: true, data: T }`
   - Error: `{ success: false, error: { code: "CODE", message: "..." } }`
7. Add or update shared types in `packages/knowledge/` when the web app must consume the response.
8. Update API client in `apps/web/src/services/` if the web app needs to call this route.
9. Add tests for the new route.
10. Update relevant docs if the API surface changes.

## Before Editing, Summarize

- Endpoint path and HTTP method
- Request shape
- Response shape
- Error cases
- Files likely impacted

## After Editing, Summarize

- Files changed
- Contract defined in `packages/knowledge/` (if applicable)
- Tests added
- Validation commands run and results
- Known limitations
