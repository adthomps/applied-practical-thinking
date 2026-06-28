---
title: "Cloudflare Standards"
kind: "standard"
domain: "installable-summaries"
status: "active"
owner: "APT"
last_updated: "2026-06-28"
source_paths: ["apt-agent-standards/apt-core/cloudflare-standards.md"]
---

# Cloudflare Standards

Use Cloudflare primitives when they simplify deployment and operations.

## Guidance

- Prefer Pages for static frontends and Workers for dynamic behavior.
- Prefer Hono for structured Worker APIs when the project needs routing.
- Use D1 for relational data, KV for low-churn key-value state, and R2 for object storage when the use case is clear.
- Keep secrets in platform bindings, not source files.
- Avoid adopting platform services before the project has a real need.
