---
title: "Cloudflare Standards"
kind: "standard"
domain: "installable-summaries"
status: "active"
owner: "APT"
last_updated: "2026-10-12"
source_paths: ["apt-agent-standards/apt-core/cloudflare-standards.md"]
---

# Cloudflare Standards

Use Cloudflare primitives when they simplify deployment and operations. Follow the target repository when it already has a working host, auth, or mail path.

## New applications

- Frontend: React, Vite, and TypeScript.
- UI: Tailwind and shadcn/ui. Inspect `components.json` and existing `components/ui` before adding primitives.
- Backend: Hono on Cloudflare Workers.
- Hosting: one Worker with static assets, serving the Vite build and the API.
- Data: D1 for relational data and KV for low-churn key-value state, when the app stores that data.
- Files: R2 when the app stores files. Do not create an empty bucket.
- Mail: Resend when the app sends product mail. Use a Worker secret named `RESEND_API_KEY`, a verified From domain, and an honest `delivered: false` result when the key is absent. If the app uses Clerk for sign-in, Clerk sends the login and password messages.
- Auth: Clerk when a new app needs accounts.
- Tests: Vitest or `node:test` for unit tests. Playwright for browser flows. Pull-request CI runs the unit tests. Keep a full live Playwright run out of every pull request.
- Deploy: GitHub Actions and Wrangler. Pull requests run checks. A repository variable gates the deploy.

## Existing applications

- Follow that repository's `package.json`, Wrangler config, auth, and mail path.
- A Pages project plus a separate Worker stays in place for an app that already deploys that way. Commerce, dream-to-reality, health, and the portfolio are in this group.
- Custom sessions and Cloudflare Access stay.
- Add Clerk, Resend, R2, shadcn/ui, or a move onto Workers Static Assets only when that repository already uses the service, or the owner has accepted the move.
- Keep secrets in platform bindings, not source files.
- Adopt a platform service only after the project has a real need.
