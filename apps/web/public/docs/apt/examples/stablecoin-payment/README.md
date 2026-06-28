---
title: Stablecoin Payment
kind: example
status: active
owner: APT
last_updated: 2026-06-27
source: APT consolidated examples
domain: "stablecoin-payment"
source_paths: ["apt-principles-agents/examples/stablecoin-payment/README.md"]
---

# Stablecoin Payment

## Scenario

A team needs a reviewable starter pattern for stablecoin payment without assuming provider-specific behavior.

**Maturity:** Emerging; requires legal, compliance, custody, counterparty, and risk review.

## Audience

Business/merchant, partner/acquirer, integrator/developer, support/operations, product/internal teams, and AI automation.

## Problem

The current journey, contracts, risks, and operational handoffs are incomplete or spread across multiple artifacts.

## Suggested Architecture

Start from intent; map UI, API, permissions, lifecycle states, data boundaries, observability, support identifiers, and a reversible rollout. The design should separate mature capability from emerging or future-looking options and require legal, compliance, custody, counterparty, settlement, and risk review.

## Relevant Principles

- [Stablecoin Crypto](../../principles/stablecoin-crypto/README.md)

## Relevant Skills And Agents

- Use the Stablecoin Crypto skill catalog and the closest specialist reviewer.

## Example Output Or Flow

Intent → validated request → explicit state transition → durable identifier → observable outcome → audience-specific response → reconciliation/support evidence.

## Open Questions

- Which behavior is verified versus assumed?
- What parity, security, compliance, or support evidence is missing?
- Who owns launch approval and rollback?
