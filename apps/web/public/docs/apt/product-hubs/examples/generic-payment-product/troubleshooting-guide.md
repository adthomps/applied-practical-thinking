---
title: Troubleshooting Guide
kind: product-hub-example
status: active
owner: APT
last_updated: 2026-06-27
source: APT consolidation
domain: "payments"
source_paths: ["apt-principles-agents/product-hubs/examples/generic-payment-product/troubleshooting-guide.md"]
---

# Troubleshooting Guide

| Symptom | Verify | Safe action | Escalate when |
| --- | --- | --- | --- |
| Customer saw a timeout | Request ID, payment lookup, idempotency record | Retrieve state or retry same key | State remains unknown |
| Payment declined | Canonical reason family and configuration | Customer-safe retry guidance | Processor mapping looks wrong |
| Capture rejected | Current state, amount, permission | Correct request or void if valid | State conflicts with processor |
| Webhook missing | Event store, signature failures, delivery backlog | Replay stored event | Backlog or authenticity failure persists |
| Settlement mismatch | Payment, capture, fees, settlement reference | Open reconciliation exception | Financial totals do not balance |

Record evidence, actions, owner, and customer communication for every material incident.
