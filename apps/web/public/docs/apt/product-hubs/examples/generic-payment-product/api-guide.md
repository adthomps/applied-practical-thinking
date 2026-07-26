---
title: API Guide
kind: product-hub-example
status: active
owner: APT
last_updated: 2026-06-27
source: APT consolidation
domain: "payments"
source_paths: ["apt-principles-agents/product-hubs/examples/generic-payment-product/api-guide.md"]
---

# API Guide

## Contract

`POST /v1/payments` creates an authorization. Required fields are `amount`, `currency`, `payment_method_token`, and `merchant_reference`; the `Idempotency-Key` header is mandatory. `POST /v1/payments/{id}/capture`, `/void`, and `/refunds` enforce state and permission checks. `GET /v1/payments/{id}` returns canonical state.

## Response and Errors

Success returns the payment resource plus `request_id`. Errors use `code`, customer-safe `message`, `request_id`, optional `field_errors`, and `retryable`. Authentication failures reveal no credential detail. A conflict identifies invalid state or idempotency payload mismatch.

## Webhooks

Events contain `event_id`, `type`, `occurred_at`, and the canonical payment ID. Verify the signature against the raw body, enforce timestamp tolerance, store event IDs, and tolerate duplicates and reordering.

Versioning is additive within v1; breaking contract changes require a new version and migration evidence.
