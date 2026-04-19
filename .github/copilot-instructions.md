---
title: Copilot Instructions
version: v2
status: candidate
audience: developer
visibility: public
source: manual
---
# Copilot Instructions

## Big Picture

- **Monorepo**: All code is in a single repo, split by function:
  - `apps/web`: Vite + React SPA (UI only, no business logic)
  - `apps/worker`: Cloudflare Worker (Hono, API only, no business logic in routes)
  - `packages/ui`: Presentational Apt\* components only
  - `packages/config`: Design tokens and config only
- **Data flow**: In production, UI fetches data from the separate Worker origin configured by `VITE_API_BASE`. Local dev may proxy `/api/*`, but production must not assume same-origin `/api`.
- **Why**: Boundaries are enforced to prevent category errors and keep logic testable and maintainable.

## Source Relationship

- Internal authority for repo execution behavior: `.github/copilot-instructions.md` (this file)
- External curated sibling for public handoff: `apps/web/docs/design/APT-AI-INSTRUCTIONS-REFERENCE.md`

The external document is strict but intentionally excludes internal-only workflow details.

## Critical Workflows

- **Install dependencies**: `pnpm install`
- **Start frontend**: `pnpm --dir apps/web dev`
- **Start backend**: `pnpm --dir apps/worker dev`
- **Frontend runs at**: http://localhost:5173
- **Backend runs at**: http://localhost:8787 (proxied via Vite for `/api`)
- **Deploy**: Cloudflare Pages builds the frontend from repo updates, and the worker deploys separately. `VITE_API_BASE` belongs to the Cloudflare Pages project config.
- **Production values**:
  - `VITE_API_BASE=https://applied-practical-thinking.apt-account.workers.dev`
  - `PUBLIC_SITE_ORIGIN=https://appliedpracticalthinking.com`

## Project Conventions

- **No business logic in UI or routes**: All logic lives in services or shared packages.
- **Frontend build-time config**: `VITE_API_BASE` must be present in the environment that runs `vite build`.
- **Worker runtime config**: `PUBLIC_SITE_ORIGIN` must be present in the worker environment.
- **No cross-imports between apps**.
- **Use Vite aliases** for shared packages (`@apt/ui`, `@apt/config`).
- **Web-owned AI/agent prompts** must be file-based and versioned in `apps/web/ai/prompts`.
- **No custom colors, fonts, or spacing**—use only tokens from `packages/config`.
- **No light mode**—dark-first only.
- **Machine-readable visual contract**: `apps/web/docs/design/tokens.json` must be treated as the AI-facing token enforcement source in addition to doctrine text.
- **Layout baseline**: `apps/web/components/apt/AptLayout.tsx` is the shell scaffold contract.

## Patterns

- **UI**: Use Apt\* components for all UI. No direct fetch or business logic in components.
- **API**: All routes in `apps/worker/src/routes`. No business logic in routes; use services.
- **Shared**: Only pure functions/utilities in `packages/utils`, only presentational components in `packages/ui`.

## Integration Points

- **Frontend-backend**: All API calls go through `/api/*` endpoints.
- **Production frontend-backend**: build the full worker URL from `VITE_API_BASE`; do not assume same-origin `/api/*`.
- **AI**: Web-owned prompts live in `apps/web/ai/prompts`. Worker runtime and handlers live in `apps/worker/src`.

## Examples

- To add a new UI feature, create a presentational component in `packages/ui`, import it in `apps/web`, and orchestrate data via a web service module.
- To add a new API endpoint, add a route in `apps/worker/src/routes`, implement logic in a service, and ensure no business logic leaks into the route handler.

## Strict Enforcement Summary

MUST:
- Use semantic tokens and shared APT primitives for user-facing UI.
- Keep boundaries between authored source and generated output.
- Align generated/scaffold output to `AptLayout` and design doctrine.

NEVER:
- Introduce raw color utilities where semantic tokens exist.
- Treat `apps/web/public/*` docs as authored source of truth.
- Bypass declared repo boundaries for convenience.
