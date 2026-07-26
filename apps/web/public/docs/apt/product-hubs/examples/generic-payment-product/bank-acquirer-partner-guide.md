---
title: Bank Acquirer Partner Guide
kind: product-hub-example
status: active
owner: APT
last_updated: 2026-06-27
source: APT consolidation
domain: "payments"
source_paths: ["apt-principles-agents/product-hubs/examples/generic-payment-product/bank-acquirer-partner-guide.md"]
---

# Bank, Acquirer, and Partner Guide

## Boundary Contract

The partner adapter translates ExamplePay requests into an approved processor contract and maps responses into canonical status and reason families without discarding the original processor reference.

## Certification Evidence

- Supported transaction types, currencies, amount limits, and credential scopes.
- Field mapping for authorization, capture, void, refund, settlement, and error responses.
- Duplicate/replay behavior and timeout recovery.
- Webhook authenticity, ordering, retry, and replay procedure.
- Settlement file delivery, timezone, fee, and exception semantics.

## Ownership

ExamplePay owns canonical contract behavior and audit correlation. The partner owns processor availability and authoritative processor codes. Finance owns settlement acceptance. Unsupported behavior stays explicit rather than being approximated.
