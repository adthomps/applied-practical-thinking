---
title: Cloudflare Worker Hono Structure Showcase
version: v1
last_updated: 2026-06-22
owner: APT
status: draft
kind: "example"
domain: "showcases"
source_paths: ["apt-principles/examples/showcases/cloudflare-worker-hono-structure.md"]
---

# Cloudflare Worker + Hono Structure

## Context

Use this showcase for Cloudflare Worker APIs, Hono route apps, edge services, and deployment structures where runtime boundaries, bindings, and route ownership must stay visible.

## Principle

APT architecture asks systems to expose responsibility boundaries. Cloudflare and Hono projects should make routes, middleware, bindings, validation, observability, and deployment assumptions easy to review.

## Use When

- A Worker or Hono API is moving beyond a prototype.
- Routes handle user data, auth, payment-adjacent flows, or integrations.
- A repo needs a structure that supports validation and operations.

## Avoid When

- The project is a static-only site with no edge runtime.
- Environment bindings, secrets, or deployment targets are unknown.
- The task is production deployment without exact config and runbook review.

## Problem

Weak Worker projects often keep routes, auth, validation, and binding assumptions in one file. That is quick for demos, but it makes review, testing, and incident response harder as behavior grows.

## APT Principles Applied

- Architecture: boundaries and ownership are inspectable.
- System Standards: route and contract conventions are reusable.
- Operations: deployment, telemetry, and support paths are documented.
- Security: bindings, secrets, and trust boundaries are reviewed.

## Bad Example

```text
src/index.ts
  all routes
  all auth
  all validation
  all external calls
```

The structure hides responsibilities and makes route-level review expensive.

## Better Example

```text
src/
  app.ts
  routes/
  middleware/
  schemas/
  services/
  observability/
```

The structure gives reviewers predictable places to inspect behavior.

## Solution

Keep app setup separate from route modules, validation schemas, middleware, service adapters, and observability helpers. Document bindings and environment assumptions where operators can find them.

## Implementation Notes

Use this as a pattern, not a required folder list. Read actual route files, `wrangler` config, tests, and runbooks before making final changes or deployment recommendations.

## Related Packs

- [APT Cloudflare Context Pack](../../context-packs/apt-cloudflare-pack.md)
- [APT API Context Pack](../../context-packs/apt-api-pack.md)
- [APT Security Context Pack](../../context-packs/apt-security-pack.md)

## Tradeoffs

Separated modules add structure to small services. For throwaway prototypes that cost may be unnecessary, but production-bound APIs need boundaries that humans and agents can verify.

## Common Mistakes

- Treating deployment config as separate from architecture review.
- Forgetting binding, secret, and environment evidence.
- Copying a folder shape without adapting route ownership.

## Related Documents

- `../../architecture.md`
- `../../operations-support.md`
- `../../examples/architecture/cloudflare-pages-workers-example.md`
- `../../checklists/architecture-review-checklist.md`
