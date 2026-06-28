---
title: "API Route Design"
kind: "example"
domain: "distribution-showcases"
status: "active"
owner: "APT"
last_updated: "2026-06-28"
source_paths: ["apt-agent-standards/showcases/api/route-design.md"]
---

# API Route Design

## Principle

API routes should make resource ownership, actions, and failure modes predictable for integrators.

## Use When

Use this pattern for REST-like routes, Hono handlers, webhooks, SDK-backed APIs, and integration gateways.

## Avoid When

Avoid it when reviewing an internal prototype route that has no external contract yet; document the prototype boundary instead.

## Bad Example

```text
POST /doThing
POST /update
GET /data
```

## Better Example

```text
GET /customers/:customerId/orders
POST /customers/:customerId/orders
POST /webhooks/payment-events
```

## Implementation Notes

Name routes around stable resources. Keep request schemas, response schemas, status codes, auth requirements, idempotency behavior, and webhook retry behavior documented with the route.

## Related Packs

Use `apt-core/api-standards.md`, `checklists/api-checklist.md`, and the `api-review` profile.
