# Quick Reference

## Local Development

- Start frontend:
  - `cd apps/web && npm install && npm run dev`
  - Runs at: http://localhost:5173
- Start backend:
  - `cd apps/worker && npm install && npm run dev`
  - Runs at: http://localhost:8787 (proxied via Vite for `/api`)

## Build

- `pnpm build` (from root, or per app)

## Test

- `pnpm test` (from root, or per package)

## Deployment

- Web: Cloudflare Pages (preview/prod)
- Worker: Wrangler (Cloudflare Workers)

## API Endpoints

- Internal: `/api/*` (served by worker, for UI)
- Public: `/v1/*` (versioned, stable)

## Monorepo Structure

- `apps/web`: Vite + React SPA
- `apps/worker`: Cloudflare Worker API
- `packages/ui`: Presentational components
- `packages/config`: Design tokens/config
- `packages/core`: Business/data logic# QUICK_REFERENCE.md

## Local Development

- Install dependencies: `pnpm install`
- Start web app: `pnpm --filter ./apps/web dev`
- (If worker present) Start worker: `pnpm --filter ./apps/worker dev`

## Build & Test

- Build all: `pnpm build`
- Test: `pnpm test`

## Deployment

- Web: Cloudflare Pages (auto-deploy on push)
- Worker: Cloudflare Workers (see wrangler.toml)

## API Routing

- Internal API: `/api/*` (worker, UI-specific view models allowed)
- Public API: `/v1/*` (worker, stable, versioned)

## Monorepo

- All code in `apps/` and `packages/`
- Shared logic in `packages/`
- No code at root

## Validation

- Centralize schemas in `packages/` if needed
- Avoid duplicating validation logic

## Data Layers

- D1/KV/R2/Queues: Add bindings in wrangler.toml if used

## Useful Scripts

- `pnpm dev` — Start all apps
- `pnpm build` — Build all
- `pnpm test` — Run all tests
