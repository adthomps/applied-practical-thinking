---
title: Cloudflare Worker Hono Structure Showcase
version: v2
last_updated: 2026-08-16
owner: APT
status: active
kind: "example"
domain: "showcases"
source_paths: ["apt-principles/examples/showcases/cloudflare-worker-hono-structure.md", "apt-agent-standards/showcases/cloudflare/worker-hono-structure.md"]
---

# Cloudflare Worker + Hono Structure

## Context

Use this showcase for Cloudflare Workers, Pages Functions, Hono APIs, React/Vite applications with an edge backend, modernization reviews, and other edge services where runtime boundaries, bindings, and route ownership must stay visible.

## Principle

APT architecture asks systems to expose responsibility boundaries. Cloudflare and Hono projects should make routes, middleware, bindings, validation, observability, and deployment assumptions easy to review.

## Use When

- A Worker or Hono API is moving beyond a prototype.
- A Pages Functions or React/Vite project is adding edge-runtime behavior.
- Routes handle user data, auth, payment-adjacent flows, or integrations.
- A repo needs a structure that supports validation and operations.
- A modernization review must separate platform adoption from product need.

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
  index.ts        # Worker entry and app wiring
  app.ts          # Hono app composition
  routes/
  middleware/
  schemas/
  services/
  observability/
wrangler.toml     # bindings and environments
docs/
  project-context.md  # runtime and deployment assumptions
```

The structure gives reviewers predictable places to inspect behavior.

## Solution

Keep Worker entry and app setup separate from route modules, validation schemas, middleware, domain/service adapters, response shaping, and observability helpers. Document bindings, environments, and deployment assumptions where operators and reviewers can find them.

## Implementation Notes

Use this as a pattern, not a required folder list. Review `wrangler.toml` or `wrangler.jsonc`, package scripts, environment bindings, route handlers, secret assumptions, tests, project context, and deployment runbooks together before making final changes or deployment recommendations.

Add D1, KV, R2, Queues, Durable Objects, or other platform services only when a documented product or operational need justifies them. Platform availability is not itself an architecture requirement.

## Installed Distribution Assets

When the `cloudflare` manifest is installed into a target repository, use these local projections as review entry points:

- `.apt/context/cloudflare/README.md`
- `.apt/standards/installable-summaries/cloudflare-standards.md`
- `.apt/checklists/architecture-review-checklist.md`
- `.apt/checklists/security-review-checklist.md`

Add the `api-review` manifest when the Worker exposes an API contract. Installed assets do not replace the target repository's `wrangler` configuration, package scripts, runtime evidence, deployment decisions, or exceptions.

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
