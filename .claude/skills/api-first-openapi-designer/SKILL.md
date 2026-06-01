# API-First OpenAPI Designer

Canonical source: `apt-principles/.claude/skills/api-first-openapi-designer/SKILL.md` — sync when updating.

## Purpose

Design clear API contracts before implementation. Applied to the Worker's `/api/*` surface and the shared type contracts in `packages/knowledge/`.

## Use this skill when

The user asks to:
- Create a new API endpoint
- Review an existing API route
- Add pagination, filtering, or sorting to a feed
- Design error handling for a route
- Update the shared types in `packages/knowledge/`
- Create API documentation or examples

## Design rules

- Use resource-oriented REST unless told otherwise.
- Use plural nouns for collections (`/api/feed/labs`, not `/api/lab`).
- Keep path names consistent with existing APT routes.
- Use stable IDs and slugs.
- Use ISO 8601 timestamps.
- Use APT-standard structured errors: `{ success: false, error: { code, message } }`.
- Include request and response examples.
- Do not create implementation before the contract is reviewed and clear.

## APT response contract

Success:
```json
{ "success": true, "data": { "items": [], "total": 0 } }
```

Error:
```json
{ "success": false, "error": { "code": "NOT_FOUND", "message": "Item not found." } }
```

## Standard response format for a new API design

1. Summary
2. Resource model
3. Endpoint table (Method | Path | Purpose | Auth | Notes)
4. Request schema
5. Response schema
6. Error codes and conditions
7. Pagination/filtering/sorting approach
8. Shared types needed in `packages/knowledge/`
9. Web client changes needed in `apps/web/src/services/`
10. Tests required
11. Implementation steps

## Done criteria

API work is not done until:
- Contract is documented and agreed
- Implementation matches the contract
- Tests cover success and primary failure cases
- Shared types in `packages/knowledge/` are updated
- Web API client in `apps/web/src/services/` is updated if needed
