---
title: Recurring And Subscriptions
kind: principle
status: active
owner: APT
last_updated: 2026-06-27
source: apt-principles and apt-agent-standards
domain: "payments"
source_paths: ["apt-principles-agents/principles/payments/recurring-and-subscriptions.md"]
---

# Recurring And Subscriptions

## Purpose

This principle helps APT teams model the complete transaction lifecycle and explicitly address money movement, tokenization, risk, reconciliation, funding, support, and provider differences. It is guidance for decisions and required evidence, not a claim about any specific vendor or product.

## Principles

- Begin with the intended outcome and affected audiences.
- Separate verified facts, assumptions, recommendations, and open questions.
- Prefer explicit contracts, reversible steps, and supportable behavior.
- Preserve compatibility when it materially reduces customer or partner disruption.
- Record the evidence needed for another person or agent to review the decision.

## Required Artifacts

At minimum, produce: lifecycle states, amount and currency rules, idempotency, provider mapping, token boundaries, settlement/funding flow, reconciliation, disputes, and support identifiers.

## Tradeoffs And Failure Modes

Review for invented provider behavior, double processing, confused authorization and settlement, sensitive-data exposure, incomplete reversals, and weak reconciliation. When evidence is incomplete, mark the gap rather than inventing certainty.

## Review Questions

1. What outcome and audience does this serve?
2. Which source-backed facts constrain the decision?
3. What alternatives and migration effects were considered?
4. How will engineering, security, documentation, and support verify readiness?
5. What remains uncertain and who must approve it?

## Topic-Specific Guidance

- Treat **Recurring And Subscriptions** as an explicit decision with defined scope, evidence, owner, and validation.
- Define consent, schedules, amount changes, retries, dunning, cancellation, and customer communication.
- State what is verified, what is assumed, and what requires specialist or human approval.

See the [Payments canonical hub](README.md) and linked standards/checklists before making final claims.
## Related

- [APT Principles](../README.md)
- [Skills](../../skills/README.md)
- [Templates](../../templates/README.md)
