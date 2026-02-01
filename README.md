# Applied Practical Thinking (APT) Monorepo

A modern, monorepo-based portfolio and demo platform for Applied Practical Thinking.

---

## Project Overview

- **Frontend:** Vite + React + TypeScript + Tailwind CSS + shadcn/ui
- **Design System:** All tokens, patterns, and docs in `apps/web/docs/design/`
- **AI Prompts:** Versioned in `apps/worker/src/ai/prompts/`
- **Monorepo:** All code in `apps/` and `packages/`
- **API:** Internal API via Cloudflare Worker (`apps/worker`), all UI fetches via `/api/*`
- **Static-first:** SPA deploys to Cloudflare Pages; API is optional but recommended for dynamic features

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [pnpm](https://pnpm.io/) (preferred package manager)

### Install dependencies

```sh
pnpm install
```

### Start the web app

```sh
pnpm --filter ./apps/web dev
```

### (Optional) Start the worker API

```sh
pnpm --filter ./apps/worker dev
```

### Build apps

Build the web app:

```sh
pnpm --filter ./apps/web build
```

Build the worker:

```sh
pnpm --filter ./apps/worker build
```

> **Note:** There is no root-level build. Always build each app/package directly.

### Run tests

Run all tests (from root):

```sh
pnpm test
```

Or per package:

```sh
pnpm --filter ./apps/web test
pnpm --filter ./apps/worker test
```

---


## Content Management

### Insights vs. Portfolio

- **Insights**: Narrative content (blogs, podcasts, guides, case studies)
  - Markdown in `apps/web/content/<type>/`
  - Indexed in `apps/web/data/<type>-index.json`
  - Shown on `/insights` and subpages, with area cards for each type
- **Portfolio**: Artifact/content showcase (labs, demos, design system, gallery, etc.)
  - Markdown in `apps/web/content/<type>/`
  - Indexed in `apps/web/data/<type>-index.json`
  - Shown on `/portfolio` and subpages, with area cards for each type

### Adding or Updating Content

1. Add or edit a markdown file in the appropriate `content/<type>/` folder.
2. Run the content index build script: `pnpm --filter ./apps/web run build-content-index`
3. The new or updated item will appear in the relevant index and on the site (this ensures public data is always in sync).

### Cross-linking

- Use frontmatter fields like `relatedLabs`, `relatedInsights` in markdown to create relationships.
- Labs can link to Insights (and vice versa) for richer navigation, but avoid duplication.

### Area Cards & Navigation

- Both `/insights` and `/portfolio` use a grid of area cards at the top, sourced from navigation config (`site.ts`).
- All navigation and section changes must be reflected in `apps/web/data/site.ts`.

### Documentation & Guardrails

- **All changes to content structure, navigation, or design must be documented in:**
  - `apps/web/docs/design/decision-log.md` (for deviations/decisions)
  - `README.md` and `DOCUMENTATION_INDEX.md` (for high-level structure)
- **Follow the monorepo and design system rules in:**
  - `PROJECT_RULES.md`
  - `apps/web/docs/design/APT-DESIGN-ARCHITECTURE.md`

---

```
apps/
  web/      # Frontend SPA (Vite + React)
  worker/   # Cloudflare Worker API
packages/
  ui/       # Shared UI components
  config/   # Design tokens, constants
  utils/    # Shared utilities
  core/     # Business logic, validation, adapters
```

- All design system docs/tokens: `apps/web/docs/design/`
- AI prompts: `apps/worker/src/ai/prompts/`
- Public assets: `apps/web/public/`
- Internal docs: `docs/` (project/process/guardrails)
- Site-facing docs: `apps/web/docs/` (user-facing, e.g. guides, help)

---

## Deployment

- **Web:** Deploy to Cloudflare Pages (auto-deploy on push to main)
- **Worker:** Deploy to Cloudflare Workers (see `wrangler.toml`)
- **Preview:** Any branch push → `{branch}.project.pages.dev`
- **Production:** Release tag → `project.pages.dev`

---

## Contributing

- Use only semantic tokens for colors/styles (see `packages/config`)
- All changes must be documented in `apps/web/docs/design/decision-log.md`
- See `PROJECT_RULES.md` and `PATTERNS.md` for architecture and guardrails
- All prompts must be file-based and versioned in `apps/worker/src/ai/prompts/`
- No business logic in UI or route handlers; use services and core packages

---

## References

- [APT Design Architecture](apps/web/docs/design/APT-DESIGN-ARCHITECTURE.md)
- [Decision Log](apps/web/docs/design/decision-log.md)
- [Quick Reference](QUICK_REFERENCE.md)
- [Documentation Index](DOCUMENTATION_INDEX.md)

