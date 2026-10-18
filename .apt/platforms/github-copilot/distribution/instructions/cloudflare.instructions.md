---
title: "Cloudflare Instructions"
kind: "platform-adapter"
domain: "platforms"
status: "active"
owner: "APT"
last_updated: "2026-10-12"
source_paths: ["apt-agent-standards/github-copilot/instructions/cloudflare.instructions.md"]
---

# Cloudflare Instructions

Use Cloudflare services only when they fit the repo's actual runtime and operational needs.

## Runtime Guidance

- Follow Cloudflare Standards. A new full-stack app uses React, Vite, TypeScript, Hono, and one Worker with static assets.
- An existing Pages project plus a separate Worker stays until a reviewed move.
- Use Resend only when the app sends product mail. Use Clerk only for a new app that needs accounts, or when the repository already uses Clerk.
- Prefer Hono when Worker routing benefits from explicit route structure and middleware.
- Keep Worker bindings explicit in `wrangler.toml` and typed where the project supports it.
- Use D1 for relational data, KV for low-churn key/value state, and R2 for object storage only when justified.
- Do not introduce queues, durable objects, R2, D1, or KV only because they are available.

## Safety Rules

- Keep secrets out of source code, docs examples, logs, and test fixtures.
- Preserve existing binding names unless a migration plan covers rollout and rollback.
- Separate sandbox/staging/production environment assumptions.
- Validate Worker changes with available build, typecheck, and test commands before deploy.

## Review Focus

Check routes, bindings, secrets, CORS, caching, observability, error handling, deployment commands, and docs drift.
