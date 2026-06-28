---
title: Stablecoin Readiness
kind: principle
status: active
owner: APT
last_updated: 2026-06-27
source: apt-principles and apt-agent-standards
domain: "stablecoin-crypto"
source_paths: ["apt-principles-agents/principles/stablecoin-crypto/stablecoin-readiness.md"]
---

# Stablecoin Readiness

## Purpose

This principle helps APT teams separate mature capability from emerging or future-looking options and require legal, compliance, custody, counterparty, settlement, and risk review. It is guidance for decisions and required evidence, not a claim about any specific vendor or product.

## Principles

- Begin with the intended outcome and affected audiences.
- Separate verified facts, assumptions, recommendations, and open questions.
- Prefer explicit contracts, reversible steps, and supportable behavior.
- Preserve compatibility when it materially reduces customer or partner disruption.
- Record the evidence needed for another person or agent to review the decision.

## Required Artifacts

At minimum, produce: maturity label, asset and network assumptions, custody model, on/off-chain flow, finality, refunds, payout, reconciliation, volatility, compliance, and human approval.

## Tradeoffs And Failure Modes

Review for hype, uncertain finality, unsupported reversals, custody ambiguity, counterparty exposure, regulatory assumptions, and card-like dispute expectations. When evidence is incomplete, mark the gap rather than inventing certainty.

## Maturity Labels

Every decision must state one: **Mature today**, **Emerging**, **Future-looking**, or **Requires legal/compliance/risk review**.

## Review Questions

1. What outcome and audience does this serve?
2. Which source-backed facts constrain the decision?
3. What alternatives and migration effects were considered?
4. How will engineering, security, documentation, and support verify readiness?
5. What remains uncertain and who must approve it?

## Topic-Specific Guidance

- Treat **Stablecoin Readiness** as an explicit decision with defined scope, evidence, owner, and validation.
- Require named owners, evidence, operational checks, support handoff, rollback, communications, and approval.
- State what is verified, what is assumed, and what requires specialist or human approval.

See the [Stablecoin Crypto canonical hub](README.md) and linked standards/checklists before making final claims.
## Related

- [APT Principles](../README.md)
- [Skills](../../skills/README.md)
- [Templates](../../templates/README.md)
