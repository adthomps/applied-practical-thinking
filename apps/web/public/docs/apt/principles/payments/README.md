---
title: Payments Principles
kind: index
status: active
owner: APT
last_updated: 2026-06-27
source: APT consolidation
domain: "payments"
source_paths: ["apt-principles-agents/principles/payments/README.md"]
---

# Payments Principles

Canonical guidance for model the complete transaction lifecycle and explicitly address money movement, tokenization, risk, reconciliation, funding, support, and provider differences.

- [Payment Lifecycle.md](payment-lifecycle.md)
- [Authorization Capture Settlement.md](authorization-capture-settlement.md)
- [Refunds Voids Disputes.md](refunds-voids-disputes.md)
- [Tokenization.md](tokenization.md)
- [Recurring And Subscriptions.md](recurring-and-subscriptions.md)
- [Hosted Payments.md](hosted-payments.md)
- [Embedded Payments.md](embedded-payments.md)
- [Gateway Abstraction.md](gateway-abstraction.md)
- [Transaction Intelligence.md](transaction-intelligence.md)
- [Fraud Risk.md](fraud-risk.md)
- [Reconciliation Funding.md](reconciliation-funding.md)

## Applied by

- [apt-chargeback-risk-reviewer](../../agents/payments/apt-chargeback-risk-reviewer.md) — Use when a payment flow, merchant category, or dispute-handling process needs to be assessed for chargeback exposure and evidence-collection readiness.
- [apt-crypto-payment-risk-reviewer](../../agents/payments/apt-crypto-payment-risk-reviewer.md) — Use when a payment flow accepts or settles in cryptocurrency and needs review for custody, volatility, and settlement risk.
- [apt-fraud-risk-reviewer](../../agents/payments/apt-fraud-risk-reviewer.md) — Use when a payment flow, fraud rule set, or decline-handling process needs to be assessed for fraud exposure without unnecessarily blocking legitimate transactions.
- [apt-gateway-migration-reviewer](../../agents/payments/apt-gateway-migration-reviewer.md) — Use when a merchant, platform, or integration is migrating from one payment gateway or processor to another, and payment continuity during the cutover is at risk.
- [apt-payment-architect](../../agents/payments/apt-payment-architect.md) — Use when a payment system's structure — gateway abstraction, tokenization boundary, ledger design, or provider failover — needs architectural review before implementation.
- [apt-transaction-intelligence-analyst](../../agents/payments/apt-transaction-intelligence-analyst.md) — Use when transaction data, decline patterns, or authorization trends need to be analyzed to explain what's happening and what it implies for risk or revenue.
- [suvi](../../agents/payments/suvi.md) — Use when a product is evaluating or building stablecoin acceptance or settlement, to confirm operational and compliance readiness before launch.
- [wrex](../../agents/payments/wrex.md) — Use as the senior cross-cutting sign-off for payments work, after specialist payment perspectives (fraud, chargeback, gateway, architecture) have reported, to reconcile them into one accountable payments recommendation.

