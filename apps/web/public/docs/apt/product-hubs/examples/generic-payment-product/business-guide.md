---
title: Business Guide
kind: product-hub-example
status: active
owner: APT
last_updated: 2026-06-27
source: APT consolidation
domain: "payments"
source_paths: ["apt-principles-agents/product-hubs/examples/generic-payment-product/business-guide.md"]
---

# Business Guide

## Intended Outcome

Reduce integration variance and support investigation time by presenting one payment lifecycle across processor adapters.

## Merchant Journey

Configure credentials and permissions, create a token outside ExamplePay, submit a payment, present the returned outcome, capture when fulfillment permits, and reconcile settlement reports.

## Measures

Track authorization outcome by reason family, duplicate-effect prevention, capture completion, settlement match rate, time to identify a payment, and migration rollback rate. Targets must be approved from baseline evidence; this example supplies no performance claims.

## Business Risks

Processor feature differences may leak through the abstraction; generic decline messages can hide actionable configuration issues; delayed settlement can be mistaken for failed capture; and unclear refund timing can create customer-service promises the system cannot support.

Launch requires product, finance, operations, security, legal/compliance, and partner approval where applicable.
