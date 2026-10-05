---
title: Reconciliation Funding
kind: principle
status: active
owner: APT
last_updated: 2026-08-16
source: apt-principles and apt-agent-standards
domain: "payments"
source_paths: ["apt-principles-agents/principles/payments/reconciliation-funding.md"]
---

# Reconciliation Funding

## Purpose

Prove how expected transaction activity becomes processor settlement, internal ledger entries, bank movement, and merchant funding—and how every mismatch is detected, owned, corrected, and audited.

## Principles

- Define separate expected, processor-reported, ledger-posted, bank-confirmed, and funded views; never treat one as proof of another.
- Reconcile immutable transaction and settlement identifiers across gross amounts, fees, reserves, adjustments, chargebacks, refunds, currency, and timing.
- Establish cutoffs, calendars, time zones, funding delays, and late-arriving or corrected record behavior explicitly.
- Classify breaks by cause and materiality, with queues, owners, evidence, aging targets, and controlled correction paths.
- Require dual control, auditability, and least privilege for manual adjustments, write-offs, reruns, and funding release.
- Close financial periods only against defined completeness and exception thresholds, with preserved lineage to source records.

## Required Artifacts

At minimum, produce: money-movement diagram, source/ledger ownership map, reconciliation keys and equations, cutoff/calendar rules, fee/reserve/adjustment treatment, exception taxonomy and queues, funding controls, period-close criteria, audit evidence, and recovery procedures.

## Tradeoffs And Failure Modes

Review for net-only comparison, mismatched time zones or currencies, missing fee and reserve treatment, duplicate or late files, mutable source records, manual spreadsheet authority, unapproved adjustments, premature funding, hidden aged breaks, and close processes that ignore unresolved material exceptions.

## Review Questions

1. Which sources represent expected activity, external settlement, internal accounting, bank confirmation, and final funding?
2. Which identifiers and equations reconcile each stage at transaction, batch, day, currency, and account level?
3. How are fees, reserves, reversals, disputes, adjustments, corrections, and late records represented?
4. Which breaks stop funding or close, and who can investigate, adjust, approve, and release them?
5. What evidence demonstrates completeness, lineage, correction history, and recoverability?

## Topic-Specific Guidance

- Reconcile gross activity through fees, reserves, adjustments, disputes, refunds, and net funding rather than comparing totals alone.
- Define source authority and immutable join keys for transaction, batch, settlement, ledger, bank, and funding records.
- Normalize currency, precision, sign, business date, time zone, and cutoff behavior before comparison.
- Give every exception a cause class, materiality, owner, evidence trail, aging target, and controlled resolution.
- Gate funding and period close on explicit completeness and unresolved-exception thresholds.
- Protect manual adjustments, reruns, write-offs, and releases with least privilege, dual control, idempotency, and audit logs.

See the [Payments canonical hub](README.md) and linked standards/checklists before making final claims.
## Related

- [APT Principles](../README.md)
- [Skills](../../skills/README.md)
- [Templates](../../templates/README.md)
