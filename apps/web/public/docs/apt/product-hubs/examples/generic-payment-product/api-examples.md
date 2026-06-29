---
title: API Examples
kind: product-hub-example
status: active
owner: APT
last_updated: 2026-06-27
source: APT consolidation
domain: "payments"
source_paths: ["apt-principles-agents/product-hubs/examples/generic-payment-product/api-examples.md"]
---

# API Examples

All values are fictional.

## Authorize

```bash
curl -X POST https://sandbox.example.invalid/v1/payments \
  -H "Authorization: Bearer $EXAMPLEPAY_KEY" \
  -H "Idempotency-Key: order-1042-attempt-1" \
  -H "Content-Type: application/json" \
  -d '{"amount":2599,"currency":"USD","payment_method_token":"pm_test_123","merchant_reference":"order-1042"}'
```

```json
{"payment_id":"pay_01","status":"authorized","amount":2599,"currency":"USD","merchant_reference":"order-1042","request_id":"req_01"}
```

## Decline

```json
{"payment_id":"pay_02","status":"declined","reason":{"family":"payment_method_declined","customer_message":"The payment could not be approved."},"request_id":"req_02"}
```

## Error

```json
{"code":"idempotency_conflict","message":"The key was already used with different request data.","request_id":"req_03","retryable":false}
```
