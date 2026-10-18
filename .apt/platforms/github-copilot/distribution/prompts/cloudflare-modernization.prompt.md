---
title: "Cloudflare Modernization"
kind: "platform-adapter"
domain: "platforms"
status: "active"
owner: "APT"
last_updated: "2026-10-12"
source_paths: ["apt-agent-standards/github-copilot/prompts/cloudflare-modernization.prompt.md"]
---

# Cloudflare Modernization

Plan or review a staged modernization toward Cloudflare without unnecessary platform complexity.

Use this prompt in GitHub Copilot Chat when a task refers to the Codex
`cloudflare-modernization` skill. Copilot Chat may not discover
`.codex/skills/cloudflare-modernization/SKILL.md` as an installed skill, so
this prompt carries the equivalent operating instructions.

## Instructions

1. Inspect frontend, Worker/API routes, build scripts, deployment docs, `wrangler.toml`, bindings, secrets assumptions, and tests.
2. Identify the current runtime and the smallest Cloudflare target that preserves behavior.
3. Keep an existing Pages plus Worker split until a reviewed move. A new full-stack app uses one Worker with static assets.
4. Recommend Hono, D1, KV, R2, or Workers only where current behavior or Cloudflare Standards justifies them.
5. Document migration risks before edits.
6. Do not make file changes until the staged plan is reviewed.

## Output

Return current architecture, target architecture, staged plan, services justified, services not needed, validation commands, migration risks, and rollback notes.
