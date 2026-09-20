---
title: Digital Asset Risk
kind: principle
status: active
owner: APT
last_updated: 2026-08-16
source: apt-principles and apt-agent-standards
domain: "stablecoin-crypto"
source_paths: ["apt-principles-agents/principles/stablecoin-crypto/digital-asset-risk.md"]
---

# Digital Asset Risk

## Purpose

Evaluate digital-asset use as a system of asset, network, custody, counterparty, legal, compliance, market, operational, and settlement risks. Capability maturity and permitted use must be supported by current jurisdiction-, provider-, asset-, and custody-specific evidence.

## Principles

- Define the exact asset, issuer, network, bridge, wallet, custodian, exchange, liquidity route, geography, user, and transaction purpose in scope.
- Separate protocol capability from provider support, contractual commitment, operational readiness, and legal permission.
- Model key ownership, signing authority, custody segregation, recovery, address controls, sanctions/AML screening, and incident response.
- Define probabilistic or economic finality, confirmation policy, reorganization handling, forks, freezes, blacklisting, depegs, and unsupported reversals.
- Quantify counterparty, concentration, liquidity, market, smart-contract, oracle, bridge, fee, and operational exposure with limits and monitoring.
- Require accountable legal, compliance, treasury, security, risk, operations, and product approval before production use or public claims.

## Required Artifacts

At minimum, produce: maturity classification, scoped asset/network/provider/jurisdiction matrix, custody and key model, end-to-end value flow, finality/reorg/fork policy, screening and travel-rule treatment, counterparty and concentration assessment, liquidity/depeg/stress scenarios, reconciliation/accounting/tax treatment, limits/monitoring, incident/recovery plan, and named approvals.

## Tradeoffs And Failure Modes

Review for generic “blockchain” claims, stale legal assumptions, unsupported networks or assets, commingled custody, single-key control, irreversible address errors, bridge/oracle dependence, unbounded gas or liquidity cost, depeg and freeze exposure, sanctions-evasion paths, chain reorganization, unavailable refunds, and reconciliation that cannot tie on-chain movement to internal books.

## Maturity Labels

Every decision must state one: **Mature today**, **Emerging**, **Future-looking**, or **Requires legal/compliance/risk review**.

## Review Questions

1. Which exact asset, network, providers, custody arrangement, jurisdictions, users, and value flows are being approved?
2. Who controls keys and policies, and how are loss, compromise, unauthorized transfer, address error, freeze, fork, and provider failure handled?
3. What constitutes finality, reversal, refund, payout, and reconciliation for this design?
4. Which legal, compliance, market, liquidity, counterparty, protocol, and operational assumptions remain current and evidenced?
5. What limits, monitoring, stress tests, stop conditions, incident actions, and human approvals govern use?

## Topic-Specific Guidance

- Scope exact assets, issuers, networks, bridges, wallets, custodians, liquidity providers, jurisdictions, users, and transaction purposes.
- Separate technical possibility, provider support, contractual commitment, operational maturity, and legal permission.
- Document key custody, signing authority, segregation, recovery, address allowlisting, screening, and incident controls.
- Define confirmation/finality, reorganization, fork, freeze, blacklist, depeg, fee-spike, and unsupported-reversal behavior.
- Set and monitor counterparty, concentration, liquidity, market, smart-contract, oracle, bridge, and operational limits.
- Require current evidence and named legal, compliance, treasury, security, risk, operations, and product approvals.

See the [Stablecoin Crypto canonical hub](README.md) and linked standards/checklists before making final claims.
## Related

- [APT Principles](../README.md)
- [Skills](../../skills/README.md)
- [Templates](../../templates/README.md)
