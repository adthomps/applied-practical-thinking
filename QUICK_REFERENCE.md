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

- Web: Cloudflare Pages
- Worker: Cloudflare Workers via Wrangler

## Monorepo

- `apps/web` - public frontend app
- `apps/worker` - worker API/AI app
- `packages/ui` - shared presentational primitives
- `packages/config` - shared token/config contracts
- `packages/knowledge` - shared domain/content contracts

## Source vs Generated

- Source: `apps/web/content`, `apps/web/docs/design`, `apps/web/data`
- Generated runtime copies: `apps/web/public/content`, `apps/web/public/docs`, `apps/web/public/data`
