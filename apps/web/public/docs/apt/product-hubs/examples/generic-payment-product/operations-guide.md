---
title: Operations Guide
kind: product-hub-example
status: active
owner: APT
last_updated: 2026-06-27
source: APT consolidation
domain: "payments"
source_paths: ["apt-principles-agents/product-hubs/examples/generic-payment-product/operations-guide.md"]
---

# Operations Guide

## Observe

Monitor request rate, latency, canonical outcomes, unknown timeouts, adapter health, webhook backlog, duplicate suppression, capture age, and settlement mismatches. Alert on customer impact and reconciliation risk, not raw volume alone.

## Investigate

Start with `payment_id` or `request_id`; confirm canonical state; correlate the processor reference; inspect adapter attempts and event delivery; then compare settlement records. Never ask support users for raw payment credentials.

## Recover

Retry only operations explicitly marked safe and with the original idempotency key. Replay signed events from the event store, not handcrafted payloads. Escalate unknown financial state, reconciliation imbalance, credential compromise, or repeated processor inconsistency.
