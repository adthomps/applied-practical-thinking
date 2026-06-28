---
name: cloudflare-modernization
description: Use when modernizing an existing app toward Cloudflare without adding unnecessary platform complexity.
title: "Cloudflare Modernization"
kind: "platform-adapter"
domain: "platforms"
status: "active"
owner: "APT"
last_updated: "2026-06-28"
source_paths: ["apt-agent-standards/codex/skills/cloudflare-modernization/SKILL.md"]
---

# Cloudflare Modernization

## Purpose
Modernize deployment, API routing, and storage toward Cloudflare safely.

## When To Use
Use for legacy hosting migration, Worker extraction, Pages adoption, or Cloudflare cleanup.

## When Not To Use
Do not use when the project has no deployment or runtime change.

## Required Reading
Read:

- `docs/project-context.md` when present.
- `AGENTS.md`.
- `apt-core/cloudflare-standards.md`.
- `wrangler.toml` or nested `apps/*/wrangler.toml`.
- Root and package `package.json` scripts.
- Frontend entry points, Worker entry points, route handlers, and deployment docs.
- Existing tests and smoke scripts.

## Process
1. Inventory the current runtime, deploy targets, frontend, API routes, bindings, secrets, and storage.
2. Identify the smallest Cloudflare target that preserves current behavior.
3. Separate static frontend responsibilities from dynamic Worker responsibilities.
4. Decide whether Hono, D1, KV, or R2 are justified by current behavior.
5. Produce a staged modernization plan before editing.
6. For each stage, name files to change, behavior preserved, validation commands, risks, and rollback.
7. Implement only one approved stage at a time.

## Output Format
Return:

- Current architecture.
- Target architecture.
- Staged modernization plan.
- Services justified and services explicitly not needed.
- Migration risks.
- Validation commands.
- Rollback notes.

## Validation Checklist
- Existing behavior is preserved.
- Platform services are justified.
- Rollback path is clear.
- Secrets remain outside source code.
- Binding names and environments are documented.
- Docs are updated when setup or deployment changes.
