---
title: Demo Plan
kind: template
status: active
owner: APT
last_updated: 2026-06-27
source: APT source templates
domain: "payments"
source_paths: ["apt-principles-agents/product-hubs/examples/generic-payment-product/demos/demo-plan.md"]
---

# Demo Plan

## Goal

Demonstrate the same ExamplePay truth to business, developer, partner, support, and risk audiences without implying production readiness.

## Script

Create a sandbox authorization with an idempotency key; repeat it to prove one effect; capture it; receive and verify a duplicate webhook; locate it using the request and processor references; match a settlement fixture; then show a decline and an unknown-timeout recovery.

## Evidence

Record request/response fixtures, state transitions, signature verification, duplicate suppression, operations lookup, reconciliation result, and rollback control. Use only synthetic tokens and amounts.

## Failure Branches

Show idempotency payload conflict, invalid capture state, bad webhook signature, delayed settlement, and customer-safe decline messaging.

## Exit Criteria

Each audience can state its next action, no live credential or claim appears, and every result maps to an acceptance test or open question.
