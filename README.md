# Applied Practical Thinking

A monorepo for the APT stack: Vite + React SPA (apps/web), Cloudflare Worker API (apps/worker), and shared packages (packages/ui, packages/config).

## Structure

- `apps/web` — Vite + React SPA (Pages)
- `apps/worker` — Cloudflare Worker (Hono, API)
- `packages/ui` — Shared UI components (Apt\*)
- `packages/config` — Design tokens and config

## Quick Start

```sh
cd apps/web
npm install
npm run dev
# In another terminal:
cd ../../apps/worker
npm install
npm run dev
```

- Frontend: http://localhost:5173
- Backend: http://localhost:8787

## Project Guardrails

- All UI logic in `apps/web`
- All API logic in `apps/worker`
- No business logic in UI or routes
- Shared code only in `packages/`

See PROJECT_RULES.md for full details.

# Using pnpm in This Monorepo

This project uses [pnpm](https://pnpm.io/) for all package management and workspace operations.

## Getting Started

1. **Install pnpm globally:**
   ```sh
   npm install -g pnpm
   ```
2. **Install dependencies:**
   ```sh
   pnpm install
   ```
3. **Run scripts:**
   - Frontend (Vite dev server):
     ```sh
     pnpm --filter "./apps/web" dev
     ```
   - Backend (Cloudflare Worker dev server):
     ```sh
     pnpm --filter "./apps/worker" dev
     ```

## Why pnpm?

- Faster installs and better disk usage, especially for monorepos
- Strict dependency isolation
- First-class workspace support

## CI/CD

- Update all CI workflows to use `pnpm install` instead of `npm install`
- Use `pnpm` for all build, test, and deploy scripts
- Example (GitHub Actions):
  ```yaml
  - uses: pnpm/action-setup@v2
    with:
      version: 10
  - run: pnpm install
  - run: pnpm --filter "./apps/web" build
  - run: pnpm --filter "./apps/worker" build
  ```

## Migration Notes

- All previous `package-lock.json` files and `node_modules` have been removed
- Only `pnpm-lock.yaml` and workspace symlinks are used
- All contributors must use pnpm for local development
