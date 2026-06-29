---
title: Overview
kind: product-hub-example
status: active
owner: APT
last_updated: 2026-06-27
source: APT consolidation
domain: "payments"
source_paths: ["apt-principles-agents/product-hubs/examples/generic-payment-product/overview.md"]
---

# Overview

## Customer Problem

Merchants need one predictable contract for payment submission, lifecycle visibility, recovery, and reconciliation while processor-specific behavior remains behind an adapter boundary.

## Proposed Capability

ExamplePay accepts a previously created payment-method token, amount, currency, merchant reference, and idempotency key. It returns a payment resource with explicit status and safe next actions. Capture, void, and refund are separate permissioned operations.

## Explicit Exclusions

Raw payment credentials, recurring billing schedules, marketplace fund splitting, chargeback adjudication, stablecoin settlement, and cross-border compliance are outside this example.

## Success Evidence

- Duplicate requests do not create duplicate financial effects.
- Every response and webhook carries supportable identifiers.
- State transitions reconcile against settlement input.
- Declines are customer-safe while internal diagnostics remain restricted.
- Rollback can route traffic back to the legacy path without losing reconciliation records.

All capability and performance statements are assumptions until supported by implementation and test evidence.
