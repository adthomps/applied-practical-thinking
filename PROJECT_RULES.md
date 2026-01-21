# Project Rules (APT Monorepo)

## Architecture

- apps/web: UI only, no business logic
- apps/worker: API only, no business logic in routes
- packages/ui: Presentational components only
- packages/config: Design tokens, config only

## Guardrails

- No cross-imports from apps/\* to packages/core
- All fetches in web use relative `/api/*` URLs
- API worker serves `/api/*` (internal), `/v1/*` (public, versioned)
- Use Vite aliases for shared packages

## Local Dev

- Run web and worker in separate terminals
- Use npm or pnpm (pnpm preferred if present)

## Deployment

- Pages: Preview/prod via GitHub Actions
- Workers: Deploy via Wrangler or CI

## Validation

- Centralize schemas, avoid duplication
- Document all env/config in packages/config
