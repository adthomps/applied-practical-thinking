---
name: cloudflare-react-hono
description: Use when building or reviewing React, Vite, Hono, and Cloudflare Workers applications. New apps use one Worker with static assets. Existing Pages apps stay until a reviewed move.
title: "Cloudflare React Hono"
kind: "platform-adapter"
domain: "platforms"
status: "active"
owner: "APT"
last_updated: "2026-10-12"
source_paths: ["apt-agent-standards/codex/skills/cloudflare-react-hono/SKILL.md"]
---

# Cloudflare React Hono

## Purpose
Guide Cloudflare app implementation with React, Vite, Hono, Workers, and TypeScript. A new app uses one Worker with static assets. An existing Pages app stays until a reviewed move.

## When To Use
Use for Cloudflare frontend/API architecture, bindings, routes, and deployment scripts.

## When Not To Use
Do not use for non-Cloudflare runtime decisions.

## Required Reading
Read:

- `.apt/standards/installable-summaries/cloudflare-standards.md`.
- `docs/project-context.md` when present.
- `wrangler.toml` or nested Worker config.
- Root and app package scripts.
- React/Vite app entry points.
- Worker entry point, Hono app setup, middleware, and route files.
- Tests and deployment docs.

## Process
1. For a new app, serve the Vite build and the API from one Worker with static assets.
2. For an existing Pages plus Worker app, keep that split until a reviewed move. Map dynamic behavior to Hono routes, preferably under `/api` when appropriate.
3. Review Hono route structure, middleware order, error handling, and response shapes.
4. Check binding names, environment separation, and local dev assumptions.
5. Choose D1, KV, or R2 only when the data model requires it.
6. Keep secrets in platform bindings or environment configuration, not source.
7. Validate with the repo's build, typecheck, test, and Worker dry-run commands.

## Output Format
Return implementation notes, changed files, preserved behavior, validation commands, deployment risks, and docs updates.

## Validation Checklist
- Worker/Page boundary is clear.
- Hono routes are typed and testable.
- Secrets are not committed.
- CORS and errors are intentional.
- Build and deploy commands match docs.
- Storage bindings are justified.
