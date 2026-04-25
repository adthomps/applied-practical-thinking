---
title: Cloudflare Pages + Workers Example
version: v1
last_updated: 2026-04-24
owner: APT
status: draft
---

# Cloudflare Pages + Workers Example

## Context

A static-first frontend needs a lightweight API layer for data, auth, and AI endpoints.

## Problem

Mixing frontend hosting, backend logic, and deployment behavior creates unclear ownership and difficult rollbacks.

## APT Principles Applied

- Architecture: static frontend and API worker are separate deployable concerns.
- Release: preview deploys happen before production.
- Operations: worker routes provide observable service boundaries.

## Solution

Use Cloudflare Pages for the frontend and Cloudflare Workers for APIs.

```text
Browser
  -> Cloudflare Pages app
  -> relative fetch("/api/...")
  -> Cloudflare Worker route
  -> service layer / D1 / KV / R2 / AI provider
```

## Example Structure

```text
apps/web/
  public/_redirects
  src/services/apiClient.ts

apps/worker/
  src/routes/health.ts
  src/routes/ai.ts
  src/services/
  wrangler.toml
```

Operational contract:

```text
Health route: GET /health
API base: /api/*
Preview: Pages preview plus Worker preview or environment binding
Rollback: redeploy prior Pages build and Worker version
Logs: Worker request ID and route name
```

## Tradeoffs

Separate deployments add configuration work, but they prevent UI code from becoming the backend and make API failures easier to isolate.

## Common Mistakes

- Hardcoding absolute API origins in the SPA.
- Using dashboard-only deploy steps.
- Letting worker routes contain durable business logic.
- Sharing environment secrets with the frontend build.

## Implementation Notes

Use relative API calls from the frontend when the routing model supports it, document environment bindings near the worker config, and keep route handlers thin enough that services can be tested independently.

## Related Documents

- `../../architecture.md`
- `../../release-change-management.md`
- `../../operations-support.md`
