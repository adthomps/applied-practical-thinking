---
title: Migration Guide
kind: product-hub-example
status: active
owner: APT
last_updated: 2026-06-27
source: APT consolidation
domain: "payments"
source_paths: ["apt-principles-agents/product-hubs/examples/generic-payment-product/migration-guide.md"]
---

# Migration Guide

## Phases

Inventory legacy operations and processor codes; create field and status mappings; run contract fixtures; introduce a facade in shadow-read mode; dual-write only where reconciliation proves safety; canary merchants; then expand by evidence.

## Parity Gate

Authorization, capture, void, refund, timeout recovery, duplicate prevention, webhooks, settlement, reporting identifiers, permissions, and support lookup require explicit parity or an approved exclusion.

## Rollback

Keep legacy routing available per merchant, preserve both identifiers, stop new traffic without deleting events, and reconcile in-flight transactions before changing the system of record. Deprecation requires usage evidence, communications, support preparation, dates, and exception ownership.
