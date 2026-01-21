# Architecture

- Monorepo: apps/web (SPA), apps/worker (API), packages/ui, packages/config
- UI: Vite + React, dark-first, glass morphism
- API: Hono on Cloudflare Worker, routes in apps/worker/src/routes
- Shared: Only presentational components and tokens in packages
