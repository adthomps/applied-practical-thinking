# Copilot Instructions

## Big Picture

- **Monorepo**: All code is in a single repo, split by function:
  - `apps/web`: Vite + React SPA (UI only, no business logic)
  - `apps/worker`: Cloudflare Worker (Hono, API only, no business logic in routes)
  - `packages/ui`: Presentational Apt\* components only
  - `packages/config`: Design tokens and config only
- **Data flow**: UI fetches data from `/api/*` endpoints (served by worker). No direct fetches in React components—use service modules.
- **Why**: Boundaries are enforced to prevent category errors and keep logic testable and maintainable.

## Critical Workflows

- **Start frontend**: `cd apps/web && npm install && npm run dev`
- **Start backend**: `cd apps/worker && npm install && npm run dev`
- **Frontend runs at**: http://localhost:5173
- **Backend runs at**: http://localhost:8787 (proxied via Vite for `/api`)
- **Deploy**: Use Cloudflare Pages for web, Wrangler for workers.

## Project Conventions

- **No business logic in UI or routes**: All logic lives in services or shared packages.
- **All fetches in web use relative `/api/*` URLs** (never hardcode full URLs).
- **No cross-imports from apps/\* to packages/core**.
- **Use Vite aliases** for shared packages (`@apt/ui`, `@apt/config`).
- **All AI/agent prompts** must be file-based and versioned in `apps/worker/src/ai/prompts`.
- **No custom colors, fonts, or spacing**—use only tokens from `packages/config`.
- **No light mode**—dark-first only.

## Patterns

- **UI**: Use Apt\* components for all UI. No direct fetch or business logic in components.
- **API**: All routes in `apps/worker/src/routes`. No business logic in routes; use services.
- **Shared**: Only pure functions/utilities in `packages/utils`, only presentational components in `packages/ui`.

## Integration Points

- **Frontend-backend**: All API calls go through `/api/*` endpoints.
- **AI**: All prompts and handlers are in `apps/worker/src/ai`. Prompts must be versioned and reviewed.

## Examples

- To add a new UI feature, create a presentational component in `packages/ui`, import it in `apps/web`, and orchestrate data via a service in `src/services`.
- To add a new API endpoint, add a route in `apps/worker/src/routes`, implement logic in a service, and ensure no business logic leaks into the route handler.
