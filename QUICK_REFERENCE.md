---
title: QUICK_REFERENCE.md
version: v2
status: candidate
audience: developer
visibility: public
source: manual
---
# QUICK_REFERENCE.md

## Local Development

- Install dependencies: `pnpm install`
- Start web app: `pnpm dev`
- Start worker: `pnpm dev:worker`

## Build & Test

- Build web: `pnpm build`
- Test web: `pnpm test`
- Lint web: `pnpm lint`

## Deployment

- Web: Cloudflare Pages builds from GitHub repo updates
- Worker: Cloudflare Workers via Wrangler / `.github/workflows/worker.yml`
- Frontend env: `VITE_API_BASE=https://applied-practical-thinking.apt-account.workers.dev`
- Worker env: `PUBLIC_SITE_ORIGIN=https://applied-practical-thinking.pages.dev`
- Redeploy order: Worker first, then Pages

## Monorepo

- `apps/web` - public frontend app
- `apps/worker` - worker API/AI app
- `packages/ui` - shared presentational primitives
- `packages/config` - shared token/config contracts
- `packages/knowledge` - shared domain/content contracts

## Source vs Generated

- Source: `apps/web/content`, `apps/web/docs/design`, `apps/web/data`
- Generated runtime copies: `apps/web/public/content`, `apps/web/public/docs`, `apps/web/public/data`
