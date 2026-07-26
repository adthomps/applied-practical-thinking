---
title: "Cloudflare Instructions"
kind: "platform-adapter"
domain: "platforms"
status: "active"
owner: "APT"
last_updated: "2026-06-28"
source_paths: ["apt-agent-standards/github-copilot/instructions/cloudflare.instructions.md"]
---

# Cloudflare Instructions

Use Cloudflare services only when they fit the repo's actual runtime and operational needs.

## Runtime Guidance

- Prefer Pages for static frontend delivery and Workers for dynamic behavior.
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
