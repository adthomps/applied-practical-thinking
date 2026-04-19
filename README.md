---
title: Applied Practical Thinking
version: v2
status: candidate
audience: developer
visibility: public
source: manual
---
# Applied Practical Thinking

APT is a monorepo for the Applied Practical Thinking platform.

## Current repo shape

```text
apps/
  web/       # Public Vite + React application
  worker/    # Cloudflare Worker API/AI subsystem
packages/
  ui/        # Shared APT presentational primitives
  config/    # Shared token/config contracts
  knowledge/ # Shared content/domain/assistant contracts
docs/        # Internal project/process documentation
```

Authored site content and design docs live under `apps/web/`. Shared package contracts live under `packages/`.

## Documentation model

- `README.md` is the repo entrypoint and operating overview
- `docs/` contains internal engineering, deployment, maintenance, workflow, and agent-facing repo docs
- `apps/web/content/` contains authored external/public content that renders on the site
- `apps/web/docs/design/` contains external-first design doctrine and public design reference docs
- `apps/web/docs/design/` uses a 2-zone source model:
  - `versions/v*/` authored canonical doctrine versions
  - `static/` authored static support docs/contracts (review bundle, lint contracts, token JSON, instructions/reference)
  - `tokens.json` is generated compatibility output from canonical `static/APT-TOKENS-CONTRACT.json`
- Documentation architecture standard is defined in `apps/web/docs/design/versions/v2/APT-DESIGN-ARCHITECTURE.md` (Documentation Architecture section)
- internal design support docs may live alongside the design doctrine source, but are not automatically public
- `apps/web/public/` is generated runtime output only:
  - `apps/web/public/content/`
  - `apps/web/public/docs/`
  - `apps/web/public/data/`

Current-state vs target-state docs architecture:
- Current-state canonical public docs source: `apps/web/docs/design/`
- Target-state canonical public docs source (planned): `apps/docs`
- Current pass is definition-first; no `apps/docs` structure migration is active yet

Do not edit copied markdown under `apps/web/public/` as authored source.

Safe edit flow for design docs:
1. Edit `apps/web/docs/design/versions/v*/...` for doctrine changes or `apps/web/docs/design/static/...` for static support docs.
2. Run `pnpm --dir apps/web run verify-doc-governance`.
3. Run `pnpm --dir apps/web run copy-content-to-public`.

## Getting started

Prerequisites:

- Node.js 20+
- `pnpm`

Install dependencies:

```sh
pnpm install
```

Run the web app:

```sh
pnpm dev
```

Run the worker:

```sh
pnpm dev:worker
```

Build the web app:

```sh
pnpm build
```

Run tests:

```sh
pnpm test
```

You can also run each app directly from its workspace:

```sh
pnpm --dir apps/web dev
pnpm --dir apps/web build
pnpm --dir apps/worker dev
```

## Deployment model

- `apps/web` is built by Cloudflare Pages from GitHub repo updates
- `apps/worker` is deployed separately via Wrangler / `.github/workflows/worker.yml`
- frontend public content/doc requests use the separate Worker origin from `VITE_API_BASE`
- worker public content/doc normalization uses `PUBLIC_SITE_ORIGIN` to read Pages-hosted assets

For this reason:
- `VITE_API_BASE` should exist in the Cloudflare Pages environment for the web project
- the web app also supports a runtime override via `window.__APT_RUNTIME_CONFIG__.workerApiBase`
- the official Pages host falls back to the production Worker URL if build-time config is missing
- `PUBLIC_SITE_ORIGIN` must exist in the Worker runtime environment
- GitHub Desktop pushes source changes only; Cloudflare Pages is what builds the frontend deploy

Production values:

- `VITE_API_BASE=https://applied-practical-thinking.apt-account.workers.dev`
- `PUBLIC_SITE_ORIGIN=https://appliedpracticalthinking.com`

## Content and design guardrails

- Source content lives in `apps/web/content/` and authored registries live in `apps/web/data/`
- Source design doctrine lives in `apps/web/docs/design/`
- Internal repo/operator guidance lives in `docs/`
- Shared APT primitives live in `packages/ui/` and are re-exported through `apps/web/components/apt/` during the migration
- Shared TypeScript token contracts live in `packages/config/`
- Shared content/domain contracts live in `packages/knowledge/`
- `apps/web/public/` is output-oriented:
  - copied markdown/docs/indexes are generated artifacts
  - authored markdown/docs should not be edited in `public/`
- Use semantic design tokens only; avoid raw color classes in app components

## References

- [APT Design Architecture](apps/web/docs/design/versions/v2/APT-DESIGN-ARCHITECTURE.md)
- [APT Documentation Architecture (Compatibility Shim)](apps/web/docs/design/versions/v2/APT-ARCHITECTURE-DOC.md)
- [APT Design System](apps/web/docs/design/versions/v2/APT-DESIGN-SYSTEM.md)
- [Decision Log](docs/DECISION_LOG.md)
- [Documentation Index](DOCUMENTATION_INDEX.md)
