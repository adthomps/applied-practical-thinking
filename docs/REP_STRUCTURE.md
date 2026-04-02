# REP_STRUCTURE.md

## Repository Structure

- All runtime code lives in `apps/` and `packages/`
- Active apps:
  - `apps/web/` - public site, routing, shell, content source, web-only services
  - `apps/worker/` - Cloudflare Worker API/AI subsystem
- Shared packages:
  - `packages/ui/` - shared presentational APT primitives
  - `packages/config/` - shared token/config contracts
  - `packages/knowledge/` - shared content/domain/assistant types
  - `packages/utils/` - framework-agnostic helpers only if activated
- Internal docs:
  - `docs/`
- Site/source docs:
  - `apps/web/docs/`
- Source content:
  - `apps/web/content/`
  - `apps/web/data/`
- Generated runtime output:
  - `apps/web/public/data/`
  - `apps/web/public/content/` for copied markdown
  - `apps/web/public/docs/` for copied docs

No app imports from another app, and copied markdown/docs in `public/` are not the source of truth.
