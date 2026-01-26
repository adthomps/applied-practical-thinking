# Architecture

## Monorepo Layout

- `apps/web`: Vite + React SPA (UI only)
- `apps/worker`: Cloudflare Worker (API only)
- `packages/ui`: Presentational components
- `packages/config`: Design tokens/config
- `packages/core`: Business logic/data adapters

## Data Flow
- UI fetches from `/api/*` (internal API worker)
- Public API at `/v1/*` (if present)

## Boundaries
- No business logic in UI or routes
- All logic in services or shared packages
- No cross-imports from `apps/*` to `packages/core`

## Data Layers
- If D1/KV/R2/Queues are used, see `docs/PLATFORM_IDS.md`# ARCHITECTURE.md

## APT Monorepo Architecture

- All code lives under `apps/` (web, worker)
- Shared code in `packages/` (ui, config, utils)
- Design system in `apps/web/docs/design/`
- AI prompts in `apps/web/ai/prompts/`
- Internal API: `/api/*` (worker)
- Public API: `/v1/*` (worker, versioned)
- SPA fetches only relative `/api/...` endpoints
- packages/core must not import from apps
- See `wrangler.toml` for Cloudflare bindings (D1/KV/R2 if present)
