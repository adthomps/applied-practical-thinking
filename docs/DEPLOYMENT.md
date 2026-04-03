# Deployment

APT deploys as two Cloudflare surfaces:

- `apps/web` builds to Cloudflare Pages from GitHub repo updates
- `apps/worker` deploys as a separate Cloudflare Worker

The frontend and worker do not read configuration from the same place, so the contract must stay explicit.

## Runtime Contract

- Frontend API origin:
  - preferred: `VITE_API_BASE`
  - optional runtime override: `window.__APT_RUNTIME_CONFIG__.workerApiBase`
  - production fallback: the official Pages host `applied-practical-thinking.pages.dev` falls back to `https://applied-practical-thinking.apt-account.workers.dev`
- Worker asset origin:
  - `PUBLIC_SITE_ORIGIN`

Production values for this repo:

- `VITE_API_BASE=https://applied-practical-thinking.apt-account.workers.dev`
- `PUBLIC_SITE_ORIGIN=https://applied-practical-thinking.pages.dev`

Do not include trailing slashes.

## Current Source Of Truth

- Frontend deploys:
  - Cloudflare Pages watches the GitHub repo and builds `apps/web`
  - GitHub Desktop is only the way commits are pushed to GitHub; it does not provide runtime config
- Worker deploys:
  - the Worker is separate from Pages
  - deploy with Wrangler / Cloudflare Worker configuration and the existing worker workflow if you keep it

## Where Each Value Belongs

- Pages / frontend build:
  - set `VITE_API_BASE` in the Cloudflare Pages project environment
  - because Cloudflare Pages is the frontend builder of record, this is the authoritative frontend build setting
- Worker runtime:
  - set `PUBLIC_SITE_ORIGIN` in Wrangler config and/or the Cloudflare Worker dashboard

The key rule is simple:

- the system that builds the frontend bundle must provide `VITE_API_BASE`

## Cloudflare Setup

### Pages

- Project: `applied-practical-thinking`
- Build output: `apps/web/dist`
- Root build config lives in [wrangler.toml](/c:/Users/sanch/Documents/Github/Applied%20Practical%20Thinking/applied-practical-thinking/wrangler.toml)
- Cloudflare Pages is the only frontend deployment path; the repo no longer keeps a separate GitHub Actions Pages deploy workflow

Preferred frontend config:

```text
VITE_API_BASE=https://applied-practical-thinking.apt-account.workers.dev
```

### Worker

- Project: `applied-practical-thinking-worker`
- Worker config lives in [apps/worker/wrangler.toml](/c:/Users/sanch/Documents/Github/Applied%20Practical%20Thinking/applied-practical-thinking/apps/worker/wrangler.toml)

Worker runtime config:

```text
PUBLIC_SITE_ORIGIN=https://applied-practical-thinking.pages.dev
```

## Local Development

- frontend:
  - `apps/web/.env`
  - `VITE_API_BASE=http://127.0.0.1:8787`
- worker:
  - `apps/worker/.dev.vars`
  - `PUBLIC_SITE_ORIGIN=http://127.0.0.1:5173`

Localhost also falls back automatically to `http://127.0.0.1:8787` if `VITE_API_BASE` is missing.

## Build Paths

Frontend:

- GitHub is the source-control origin
- Cloudflare Pages watches the repo and runs the frontend build/deploy
- `VITE_API_BASE` belongs in the Cloudflare Pages project settings

Backend:

- the Worker remains separately deployed
- this repo currently keeps the worker deploy workflow in [worker.yml](/c:/Users/sanch/Documents/Github/Applied%20Practical%20Thinking/applied-practical-thinking/.github/workflows/worker.yml)
- `PUBLIC_SITE_ORIGIN` belongs in Worker config

## Redeploy Order

1. Deploy the Worker
2. Deploy the frontend / Pages build

## Verification Checklist

- Open `https://applied-practical-thinking.pages.dev/learn`
- Confirm Learn content loads
- Open `https://applied-practical-thinking.pages.dev/experiments`
- Confirm Experiments content loads
- Open a Design page and test the “View Full …” action
- Confirm `https://applied-practical-thinking.pages.dev/docs/design/APT-FIGMA-TOKENS.json` downloads
- If the frontend still shows a config notice, verify the Cloudflare Pages project environment includes `VITE_API_BASE`
