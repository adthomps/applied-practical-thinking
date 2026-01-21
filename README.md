# Applied Practical Thinking

A monorepo for the APT stack: Vite + React SPA (apps/web), Cloudflare Worker API (apps/worker), and shared packages (packages/ui, packages/config).

## Structure

- `apps/web` — Vite + React SPA (Pages)
- `apps/worker` — Cloudflare Worker (Hono, API)
- `packages/ui` — Shared UI components (Apt\*)
- `packages/config` — Design tokens and config

## Quick Start

```sh
cd apps/web
npm install
npm run dev
# In another terminal:
cd ../../apps/worker
npm install
npm run dev
```

- Frontend: http://localhost:5173
- Backend: http://localhost:8787

## Project Guardrails

- All UI logic in `apps/web`
- All API logic in `apps/worker`
- No business logic in UI or routes
- Shared code only in `packages/`

See PROJECT_RULES.md for full details.
