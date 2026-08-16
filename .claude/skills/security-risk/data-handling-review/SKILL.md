---
name: data-handling-review
description: Use when work must identify trust boundaries, permissions, sensitive data, abuse paths, privacy impact, compliance dependencies, and required human approvals.
kind: skill
status: active
owner: APT
last_updated: 2026-08-16
source: consolidated APT guidance
title: "Data Handling Review"
domain: "security-risk"
source_paths: ["apt-principles-agents/skills/security-risk/data-handling-review/SKILL.md"]
---

# Data Handling Review

## Purpose

Produce a reviewable data handling review outcome that is grounded in repository evidence and explicit about uncertainty.

## When to Use

Use for planning, design, implementation review, migration, troubleshooting, or documentation where the task must identify trust boundaries, permissions, sensitive data, abuse paths, privacy impact, compliance dependencies, and required human approvals.

## Inputs

- Goal, audience, scope, constraints, and success criteria.
- Relevant source files, contracts, examples, logs, and decisions.
- Known risks, assumptions, dependencies, and approval boundaries.

## Process

1. Inventory each data class by source, purpose, sensitivity, subject, jurisdiction, owner, format, and whether collection is actually necessary.
2. Trace collection, validation, transit, storage, processing, model or tool exposure, sharing, logging, backup, export, retention, deletion, and recovery across trust boundaries.
3. Map roles and service identities to least-privilege read, write, export, delete, and administrative actions; identify implicit or inherited access.
4. Review secrets, encryption and key ownership, tokenization or redaction, audit trails, abuse controls, incident response, and data-subject or customer support workflows.
5. Verify that logs, analytics, prompts, traces, test fixtures, and support tools do not create ungoverned secondary stores or unsupported compliance claims.
6. Return blockers, required controls, residual risk, evidence gaps, validation steps, retention/deletion owners, and accountable security or privacy approval.

## Outputs

A concise recommendation, evidence map, required changes, risks, validation plan, support/documentation impact, and approval status.

## Quality Bar

The output is practical, source-backed, audience-aware, testable, reversible where possible, and does not state assumptions as facts.

## Domain Checklist

- Treat **Data Handling Review** as an explicit decision with defined scope, evidence, owner, and validation.
- Required evidence: assets, trust boundaries, permissions, sensitive data, controls, residual risk, approval.
- Include prompts, model context, traces, logs, backups, exports, test fixtures, and support tooling in the data inventory.
- Prefer elimination or minimization of sensitive data over adding controls to an unnecessary collection path.
- State what is verified, what is assumed, and what requires specialist or human approval.

## Required Reading

Read the canonical Security Risk principle hub, the closest enforceable standard, the applicable checklist, and exact target-repository evidence.
## References

- [Security Risk principles](../../../principles/security-risk/README.md)
- [Templates](../../../templates/README.md)
- [Agents](../../../agents/README.md)
