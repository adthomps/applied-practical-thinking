# ARCHITECTURE.md

## APT Monorepo Architecture

- `apps/web`: public site, routing, shell, content source, generated-static runtime content
- `apps/worker`: Cloudflare Worker routes, AI/vector/indexing runtime
- `packages/ui`: shared presentational APT primitives
- `packages/config`: shared token/config contracts
- `packages/knowledge`: shared content/domain/assistant contracts

## Data Flow

- The web app can consume:
  - generated static indexes/content/docs under `apps/web/public/*`
  - relative `/api/*` endpoints served by `apps/worker`
- Public API routes, if introduced, live under `/v1/*` in the worker

## Boundaries

- No app imports from another app
- Shared code flows only from `packages/*` into apps
- UI/business orchestration stays in app services, not presentational packages
- Route handlers stay thin; worker logic lives below the route layer
- Prompts are file-based and live in `apps/web/ai/prompts/`

## Source vs Generated

- Source of truth:
  - `apps/web/content/`
  - `apps/web/docs/design/`
  - `apps/web/data/`
- Generated runtime copies:
  - `apps/web/public/content/`
  - `apps/web/public/docs/`
  - `apps/web/public/data/`

If D1/KV/R2/Queues are used, see `docs/PLATFORM_IDS.md`.
