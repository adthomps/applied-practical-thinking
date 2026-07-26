---
title: Developer Integrator Guide
kind: product-hub-example
status: active
owner: APT
last_updated: 2026-06-27
source: APT consolidation
domain: "payments"
source_paths: ["apt-principles-agents/product-hubs/examples/generic-payment-product/developer-integrator-guide.md"]
---

# Developer and Integrator Guide

## Integration Sequence

1. Obtain a scoped server credential and a sandbox payment-method token.
2. Generate a unique merchant reference and idempotency key.
3. Create a payment and persist the returned `payment_id`.
4. Treat timeout as unknown; retrieve by ID or retry with the same idempotency key.
5. Capture only an `authorized` payment.
6. Verify signed webhooks, deduplicate event IDs, and fetch current state before side effects.
7. Reconcile settled payments independently of webhook delivery.

## Non-negotiable Rules

Never log credentials or tokens, never infer success from an HTTP status alone, never retry a mutation with a new idempotency key after an unknown result, and never expose processor diagnostics directly to customers.

Use [API examples](api-examples.md) as illustrative fixtures; hostnames and credentials are placeholders.
