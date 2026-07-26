---
title: "Cloudflare Context Pack"
kind: "context"
domain: "ai"
status: "active"
owner: "APT"
last_updated: "2026-07-25"
source_paths: ["apt-agent-standards/context/cloudflare/README.md"]
---

# Cloudflare Context Pack

Use for Workers, Pages, Hono, D1, KV, R2, bindings, and deployment tasks.

Load:

- `wrangler.toml` or equivalent config
- Worker and frontend entry points
- package scripts
- deployment docs
- `.apt/standards/installable-summaries/cloudflare-standards.md`

For agent skill or MCP setup, re-verify Cloudflare's official setup prompt before recommending commands:

- `https://developers.cloudflare.com/agent-setup/prompt.md`

Do not add Cloudflare services unless project behavior justifies them.
