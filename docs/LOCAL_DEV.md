---
title: Local Development
version: v2
status: candidate
audience: developer
visibility: public
source: manual
---
# Local Development

This project uses a monorepo structure with separate apps for the frontend (web) and backend (worker). All development is done using pnpm workspaces and Vite for fast iteration.

## Prerequisites

- Node.js (LTS, v18+ recommended)
- pnpm (preferred)
- VS Code with recommended extensions (`.vscode/extensions.json`)

## Install Dependencies

From the repo root:

```sh
pnpm install
```

## Start the Web App (Frontend)

```sh
pnpm --filter ./apps/web dev
```

- Runs at: http://localhost:5173
- All code changes are hot-reloaded

## Start the Worker (Backend, optional)

```sh
pnpm --filter ./apps/worker dev
```

- Runs at: http://localhost:8787
- The frontend should call it through `VITE_API_BASE`; production does not use same-origin `/api`

## Environment Variables

- Set `VITE_API_BASE` in `apps/web/.env` for local API calls (e.g., `VITE_API_BASE=http://localhost:8787`)
- Set `PUBLIC_SITE_ORIGIN` in `apps/worker/.dev.vars` so the worker can read the Pages-hosted content/doc assets during local dev (e.g., `PUBLIC_SITE_ORIGIN=http://127.0.0.1:5173`)
- See `DEPLOYMENT.md` for production/preview settings

## Local vs Production Contract

- Local:
  - Vite serves the frontend on `http://localhost:5173`
  - the Worker serves APIs on `http://localhost:8787`
  - Vite may proxy `/api/*` during development
- Production:
  - Cloudflare Pages builds and serves the frontend
  - the Cloudflare Worker serves the public content/doc API
  - production must not assume same-origin `/api/*`
  - the frontend uses `VITE_API_BASE` to reach the separate Worker

## Build


**Important:** After adding or updating content in `apps/web/content/`, you must run the build step to ensure new content is copied to `public/content/` and available in the app.

Build the web app:

```sh
pnpm --filter ./apps/web build
```

Build the worker:

```sh
pnpm --filter ./apps/worker build
```

## Testing

Run all tests (from root):

```sh
pnpm test
```

Or per app/package:

```sh
pnpm --filter ./apps/web test
pnpm --filter ./apps/worker test
```

Web validation and canonical APT doctrine checks:

```sh
pnpm --dir apps/web run validation-report
cd ../apt-principles
npm run validate
```

- Add new tests in the appropriate `test/` or `__tests__/` folder in each app or package

## Linting & Formatting

- Lint: `pnpm lint`
- Format: `pnpm format`

## Troubleshooting

- If you see dependency issues, delete `node_modules` and `pnpm-lock.yaml`, then reinstall:
  ```sh
  rm -rf node_modules pnpm-lock.yaml
  pnpm install
  ```
- For Vite or port conflicts, check for other running dev servers.
- See `README.md` and `DEPLOYMENT.md` for more info and troubleshooting tips.
