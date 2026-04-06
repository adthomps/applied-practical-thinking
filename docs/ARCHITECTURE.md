---
title: ARCHITECTURE.md
version: v2
status: candidate
audience: developer
visibility: public
source: manual
---
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

## Design Docs Versioning (v1+)

- Unified policy for design doctrine and review artifacts is defined in `apps/web/docs/design/static/APT-DESIGN-VERSIONING.md`
- Internal authoring remains in `apps/web/docs/design/versions/*` and `apps/web/docs/design/static/*`
- `apps/web/docs/design/APT-DESIGN-DOCS-MANIFEST.json` remains the manifest control plane for per-doc major routing
- Canonical public release paths are versioned under `/docs/design/v{major}/*`
- Latest-stable compatibility aliases remain available at `/docs/design/*`
- Source aliases are not stored in `apps/web/docs/design`; they are generated during publish to `apps/web/public/docs/design/*`
- Validation reporting artifacts are generated under `reports/validation/` (`LATEST.json`, `LATEST.md`, plus timestamped run files)
- Public-safe validation snapshots are published to `/docs/design/validation/LATEST.json` and `/docs/design/validation/LATEST.md`
- Public validation status is surfaced in `/design/review-bundle`
- External publishing exposes only the latest stable major unless explicitly changed by policy

## Repository Structure

- All runtime code lives in `apps/` and `packages/`
- Active apps:
  - `apps/web/` — public site, routing, shell, content source, web-only services
  - `apps/worker/` — Cloudflare Worker API/AI subsystem
- Shared packages:
  - `packages/ui/` — shared presentational APT primitives
  - `packages/config/` — shared token/config contracts
  - `packages/knowledge/` — shared content/domain/assistant types
  - `packages/utils/` — framework-agnostic helpers only if activated
- Internal docs: `docs/`
- Site/source docs: `apps/web/docs/design/versions/` + `apps/web/docs/design/static/` with `APT-DESIGN-DOCS-MANIFEST.json` control plane
- Source content: `apps/web/content/`, `apps/web/data/`
- Generated runtime output: `apps/web/public/`

If D1/KV/R2/Queues are used, see `docs/PLATFORM_IDS.md`.
