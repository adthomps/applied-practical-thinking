---
title: API Route Design Showcase
version: v2
last_updated: 2026-08-16
owner: APT
status: active
kind: "example"
domain: "showcases"
source_paths: ["apt-principles/examples/showcases/api-route-design.md", "apt-agent-standards/showcases/api/route-design.md"]
---

# API Route Design

## Context

Use this showcase for REST-like APIs, Hono routes, webhooks, SDK-backed APIs, gateways, integrations, and service boundaries where behavior must be understandable from the contract rather than buried in UI or handler code.

## Principle

APT system standards require important behavior to be defined at the API and contract layer. Routes should make ownership, validation, response shape, and failure behavior reviewable.

## Use When

- A feature exposes business behavior through an endpoint.
- Multiple clients or agents will depend on the route.
- The route handles identity, payment, sensitive data, or operational state.
- A webhook or SDK contract needs stable resource naming and retry behavior.

## Avoid When

- The endpoint is an internal throwaway spike with no downstream consumer.
- The route shape is being discussed before the domain behavior is understood.
- Security boundaries cannot be inspected.

## Problem

Weak API routes often grow around screens. They accept loose input, return inconsistent errors, and hide important state transitions in handlers. That makes client behavior brittle and review evidence hard to collect.

## APT Principles Applied

- Architecture: responsibilities and boundaries are explicit.
- System Standards: contracts, naming, and errors are consistent.
- Security: trust boundaries and validation are built in.
- Quality & Testing: contract behavior has test evidence.

## Bad Example

```text
POST /doThing
body: anything
response: { ok: true }
```

The route hides intent, validation, authorization, and failure behavior.

## Better Example

```text
POST /v1/invoices/{invoiceId}/payment-attempts
body: { paymentMethodId, idempotencyKey }
responses: 201 created, 400 validation_error, 401 unauthorized, 409 conflict

GET /v1/customers/{customerId}/orders
POST /v1/customers/{customerId}/orders
POST /v1/webhooks/payment-events
```

The routes name stable resources and lifecycle actions. Their contracts can define required input, important failure states, authorization, idempotency, and webhook delivery behavior without relying on handler internals.

## Solution

Design routes around resources and lifecycle actions. Define request schema, response schema, error mapping, auth requirement, idempotency, webhook verification and retry behavior where relevant, and tests before treating the route as ready.

## Implementation Notes

For Hono or Worker routes, keep route registration, validation, auth middleware, and response mapping easy to inspect. Use examples for shape, but read exact target files before editing.

## Installed Distribution Assets

When APT API assets are installed into a target repository, use the installed summaries and checks as local review entry points:

- `.apt/standards/installable-summaries/api-standards.md`
- `.apt/checklists/distribution/api-checklist.md`
- the `api-review` manifest selected by that repository's installation profile

These installed assets are projections of canonical guidance. Target-repository contracts and exceptions remain authoritative for the API being reviewed.

## Related Packs

- [APT API Context Pack](../../context-packs/apt-api-pack.md)
- [APT Security Context Pack](../../context-packs/apt-security-pack.md)
- [APT Cloudflare Context Pack](../../context-packs/apt-cloudflare-pack.md)

## Tradeoffs

Explicit contracts take longer up front, but they reduce client confusion, support cost, and release risk. Very small internal utilities may not need full public-contract ceremony, but they still need validation boundaries.

## Common Mistakes

- Treating route names as implementation details.
- Returning one generic success or error shape for unrelated failures.
- Reviewing API behavior without reading auth, validation, and tests.

## Related Documents

- `../../system-standards.md`
- `../../architecture.md`
- `../../standards/api/api-standards.md`
- `../../checklists/api-standards-checklist.md`
