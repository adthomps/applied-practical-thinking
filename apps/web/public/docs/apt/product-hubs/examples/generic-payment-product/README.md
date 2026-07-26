---
title: Generic Payment Product Hub
kind: product-hub-example
status: active
owner: APT
last_updated: 2026-06-27
source: APT consolidation
domain: "payments"
source_paths: ["apt-principles-agents/product-hubs/examples/generic-payment-product/README.md"]
---

# ExamplePay Product Hub

ExamplePay is a **hypothetical** payment-orchestration product used only to demonstrate a complete Product Hub. It is not a vendor claim, production design, compliance opinion, or recommendation.

## Canonical Scenario

ExamplePay lets a merchant submit a tokenized payment, receive an immediate processing result, capture an authorized payment, and reconcile settlement events. It never accepts raw card data in this example. All amounts are integer minor units and all mutating requests require idempotency keys.

## Navigation

- [Overview](overview.md) and [audience map](audience-map.md)
- [Business](business-guide.md), [partner](bank-acquirer-partner-guide.md), and [developer](developer-integrator-guide.md) guidance
- [API guide](api-guide.md), [examples](api-examples.md), and [AI-safe usage](ai-usage-examples.md)
- [Implementation blueprint](implementation-blueprint.md), [migration](migration-guide.md), and [operations](operations-guide.md)
- [Troubleshooting](troubleshooting-guide.md), [demo](demos/demo-plan.md), and [launch gate](launch-readiness-checklist.md)

## Shared Truth

The lifecycle is `created → authorized → captured → submitted_for_settlement → settled`, with `declined`, `voided`, `refunded`, and `failed` terminal or compensating outcomes. Canonical identifiers are `payment_id`, `merchant_reference`, `request_id`, and `processor_reference`.
