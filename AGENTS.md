---
title: AI Agents
version: v2
status: candidate
audience: developer
visibility: public
source: manual
---
# AI Agents

This document provides instructions for AI agents working on this codebase.

## Project Overview

APT (Applied Practical Thinking) is a monorepo with:

- `apps/web` - Vite + React + TypeScript public site
- `apps/worker` - Cloudflare Worker API/AI subsystem
- `packages/ui` - shared presentational APT primitives
- `packages/config` - shared token/config contracts
- `packages/knowledge` - shared content/domain/assistant contracts

## Key Rules

### 1. Design System

**NEVER** use raw colors in components. Use semantic tokens:

```tsx
// ✅ Correct
<div className="bg-background text-foreground">
<div className="bg-card text-card-foreground">

// ❌ Incorrect
<div className="bg-gray-900 text-white">
```

### 2. Component Usage

Use the shared UI contract:

- `@apt/ui` is the canonical source for stable reusable primitives
- `apps/web/components/apt` may re-export shared primitives and hold app-specific composition components during migration

Key shared primitives:

- `AptButton` - user-facing action buttons and shell controls
- `AptCard` - card containers
- `HeroCard` - page heroes
- `AptTag` - labels/tags

Exception:
- Native `<button>` is acceptable inside low-level accessible controls such as tabs, menus, and disclosure toggles when it is the correct semantic primitive.

### 3. File Organization

```text
apps/web/          # Routes, shell, page composition, content source, web-only services
apps/worker/       # Hono routes, AI/vector/indexing runtime, worker config
packages/ui/       # Shared presentational APT primitives
packages/config/   # Shared token/config contracts
packages/knowledge/# Shared content/domain/assistant types
```

### 4. Content and Generated Output

Authored source lives in:

- `apps/web/content/`
- `apps/web/docs/design/`
- `apps/web/data/`

Audience split:

- `docs/` is internal operating documentation for contributors and agents
- `apps/web/content/` is external/public content source
- `apps/web/docs/design/` is external-first design doctrine source
- internal support docs in `apps/web/docs/design/` are not automatically part of the public docs export

Generated runtime copies live in:

- `apps/web/public/content/`
- `apps/web/public/docs/`
- `apps/web/public/data/`

Do not treat copied markdown/docs in `public/` as the source of truth.

### 5. Design Deviations

Log design deviations in `docs/DECISION_LOG.md`.

## Common Tasks

### Add a new Experiment

1. Add or update the markdown/content in `apps/web/content/labs/`
2. Rebuild content indexes via the web app scripts
3. Experiments appear canonically on `/experiments` (`/labs` is a legacy redirect)

### Add a new page

1. Create the route/component in `apps/web/routes/`
2. Add the route in `apps/web/App.tsx`
3. Add/update navigation in `apps/web/data/site.ts`

### Modify design tokens

1. Update CSS variables in `apps/web/index.css`
2. Update shared TypeScript token contracts in `packages/config/src/aptTokens.ts`
3. Keep `apps/web/theme/aptTokens.ts` as the compatibility re-export only
4. Document in the decision log

## Testing

```bash
pnpm dev
pnpm build
pnpm test
pnpm dev:worker
```

## Build And Deploy Notes

- Frontend build authority:
  - Cloudflare Pages watches the GitHub repo and builds `apps/web`
  - `VITE_API_BASE` belongs in the Cloudflare Pages project environment
- Worker deploy path:
  - the Worker remains a separate Cloudflare deploy surface
  - this repo currently keeps worker deployment automation in `.github/workflows/worker.yml`
  - `PUBLIC_SITE_ORIGIN` belongs in `apps/worker/wrangler.toml` and/or the Worker dashboard config
- Production values:
  - `VITE_API_BASE=https://applied-practical-thinking.apt-account.workers.dev`
  - `PUBLIC_SITE_ORIGIN=https://applied-practical-thinking.pages.dev`
- Redeploy order after runtime/config changes:
  1. deploy the Worker
  2. deploy or rebuild Cloudflare Pages
