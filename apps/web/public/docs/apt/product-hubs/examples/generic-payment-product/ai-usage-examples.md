---
title: AI Usage Examples
kind: product-hub-example
status: active
owner: APT
last_updated: 2026-06-27
source: APT consolidation
domain: "payments"
source_paths: ["apt-principles-agents/product-hubs/examples/generic-payment-product/ai-usage-examples.md"]
---

# AI Usage Examples

## Allowed Assistance

An AI agent may explain canonical states, draft sandbox code using placeholders, group sanitized error families, summarize reconciliation mismatches, and propose test cases.

## Prohibited Without Human Approval

The agent must not use live credentials, initiate or retry a real payment, change routing or fraud controls, promise settlement timing, interpret legal obligations, or expose restricted processor diagnostics.

## Safe Prompt

“Using the ExamplePay v1 contract and these redacted sandbox responses, identify the lifecycle state, cite the request IDs, distinguish retryable from non-retryable outcomes, and propose tests. Do not execute requests or infer facts absent from evidence.”

Outputs must label verified facts, assumptions, recommended actions, and the accountable approver.
