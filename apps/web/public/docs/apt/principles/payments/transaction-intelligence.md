---
title: Transaction Intelligence
kind: principle
status: active
owner: APT
last_updated: 2026-08-16
source: apt-principles and apt-agent-standards
domain: "payments"
source_paths: ["apt-principles-agents/principles/payments/transaction-intelligence.md"]
---

# Transaction Intelligence

## Purpose

Turn transaction events into trustworthy operational and product insight without confusing provider signals, derived classifications, or model output with canonical financial truth.

## Principles

- Start with a named decision or user action; do not collect or score transaction data without an accountable purpose.
- Build features from canonical lifecycle events with definitions for event time, processing time, currency, amount, merchant, instrument, channel, and outcome.
- Preserve lineage from raw evidence through normalization, enrichment, rules, models, and presented explanations.
- Distinguish observed facts, provider classifications, deterministic derivations, statistical estimates, and recommendations.
- Measure data completeness, freshness, drift, false positives/negatives, segment performance, and operational cost.
- Apply minimization, retention, access, consent, explanation, review, and appeal controls proportional to the decision's impact.

## Required Artifacts

At minimum, produce: decision/use-case definition, transaction event contract, feature/metric dictionary, lineage map, quality and freshness measures, rules/model evidence, segment evaluation, explanation and review path, privacy/security controls, and monitoring thresholds.

## Tradeoffs And Failure Modes

Review for leakage from future events, inconsistent lifecycle definitions, double-counted retries, mixed currencies, opaque provider scores, unjustified sensitive features, proxy discrimination, stale enrichment, feedback loops, unreviewable decisions, and dashboards whose aggregates cannot reconcile to source events.

## Review Questions

1. Which decision or action will this intelligence improve, and what harm can an incorrect result cause?
2. Which events and fields are canonical, derived, provider-supplied, inferred, or unavailable?
3. Can every feature, metric, score, and explanation be traced to time-correct source evidence?
4. How does quality vary by provider, channel, currency, geography, customer segment, and lifecycle state?
5. What monitoring, review, override, appeal, retention, and retirement controls are required?

## Topic-Specific Guidance

- Bind each metric, rule, model, or alert to a specific decision, audience, expected benefit, and failure consequence.
- Define lifecycle-aware event semantics so retries, partial approvals, reversals, refunds, disputes, and settlements are not double counted.
- Label facts, provider signals, deterministic derivations, estimates, and recommendations distinctly.
- Preserve feature and metric lineage, point-in-time correctness, freshness, completeness, and reproducibility.
- Evaluate false positives/negatives and segment performance; prohibit unsupported claims of neutrality or accuracy.
- Provide explanations, human review, overrides, appeals, monitoring, and retirement paths proportional to impact.

See the [Payments canonical hub](README.md) and linked standards/checklists before making final claims.
## Applied by

- [apt-transaction-intelligence-analyst](../../agents/payments/apt-transaction-intelligence-analyst.md) — Use when transaction data, decline patterns, or authorization trends need to be analyzed to explain what's happening and what it implies for risk or revenue.

## Related

- [APT Principles](../README.md)
- [Skills](../../skills/README.md)
- [Templates](../../templates/README.md)
