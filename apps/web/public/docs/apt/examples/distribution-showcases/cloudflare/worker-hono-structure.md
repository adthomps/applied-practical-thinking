---
title: "Cloudflare Worker Hono Structure"
kind: "example"
domain: "distribution-showcases"
status: "active"
owner: "APT"
last_updated: "2026-06-28"
source_paths: ["apt-agent-standards/showcases/cloudflare/worker-hono-structure.md"]
---

# Cloudflare Worker Hono Structure

## Principle

Cloudflare Worker and Hono projects should keep runtime boundaries, bindings, routes, and deployment assumptions visible.

## Use When

Use this pattern for Workers, Pages Functions, Hono APIs, React/Vite on Cloudflare, and Cloudflare modernization reviews.

## Avoid When

Avoid it when a project only has static hosting and no Worker, API, binding, or edge-runtime behavior.

## Bad Example

```text
src/index.ts contains bindings, route definitions, auth checks, service logic, and response shaping in one long file.
```

## Better Example

```text
src/index.ts wires the Worker and Hono app.
src/routes/ owns route modules.
src/services/ owns domain behavior.
wrangler.toml documents bindings and environments.
docs/project-context.md records deployment assumptions.
```

## Implementation Notes

Review `wrangler.toml`, package scripts, environment bindings, route handlers, secrets assumptions, and deployment docs together. Add D1, KV, R2, Queues, or Durable Objects only when the product need is clear.

## Related Packs

Use `context/cloudflare/README.md`, `checklists/api-checklist.md`, `checklists/security-checklist.md`, and the `cloudflare` profile.
