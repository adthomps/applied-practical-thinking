# Cloudflare Hono Worker Builder

Canonical source: `apt-principles/.claude/skills/cloudflare-hono-worker-builder/SKILL.md` — sync when updating.

## Purpose

Build maintainable Cloudflare Workers using Hono and the project's existing architecture in `apps/worker/`.

## Use this skill when

The user asks to:
- Add a Cloudflare Worker route
- Refactor a Worker handler
- Add D1, KV, or R2 access
- Configure Wrangler bindings
- Add middleware (CORS, auth, error handling, request ID)
- Implement new `/api/*` routes
- Debug Cloudflare deployment issues

## Stack in this repo

- Runtime: Cloudflare Workers
- Framework: Hono
- Config: `apps/worker/wrangler.toml`
- Shared types: `packages/knowledge/`
- Deploy: `.github/workflows/worker.yml`

## Architecture rules

- Mount dynamic routes under `/api/`.
- Keep route handlers thin — business logic in `services/`.
- Validate input before service calls.
- Use typed Hono environment bindings.
- Avoid direct database/KV logic inside route handlers.
- Use APT-standard JSON error shape.
- Include request IDs when practical.
- Add tests for new routes.
- Update `packages/knowledge/` types when response shape changes.

## Hono route pattern

```typescript
import { Hono } from "hono";

type Bindings = { DB: D1Database };

export const route = new Hono<{ Bindings: Bindings }>();

route.get("/items", async (c) => {
  const items = await c.env.DB.prepare("SELECT * FROM items LIMIT 50").all();
  return c.json({ success: true, data: items.results });
});
```

## APT error pattern

```typescript
return c.json(
  { success: false, error: { code: "VALIDATION_ERROR", message: "Missing required field." } },
  400
);
```

## Validation checklist before completion

- Typecheck passes
- Tests pass
- Build passes (`wrangler deploy --dry-run`)
- Wrangler bindings are documented
- Shared types updated in `packages/knowledge/` if needed
- API client updated in `apps/web/src/services/` if the web app consumes this route
