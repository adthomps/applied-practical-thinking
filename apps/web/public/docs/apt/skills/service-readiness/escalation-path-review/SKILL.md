---
name: escalation-path-review
description: Use when work must prove the service can launch, operate, degrade safely, be supported, be troubleshot, and communicate change.
kind: skill
status: active
owner: APT
last_updated: 2026-06-27
source: consolidated APT guidance
title: "Escalation Path Review"
domain: "service-readiness"
source_paths: ["apt-principles-agents/skills/service-readiness/escalation-path-review/SKILL.md"]
---

# Escalation Path Review

## Purpose

Produce a reviewable escalation path review outcome that is grounded in repository evidence and explicit about uncertainty.

## When to Use

Use for planning, design, implementation review, migration, troubleshooting, or documentation where the task must prove the service can launch, operate, degrade safely, be supported, be troubleshot, and communicate change.

## Inputs

- Goal, audience, scope, constraints, and success criteria.
- Relevant source files, contracts, examples, logs, and decisions.
- Known risks, assumptions, dependencies, and approval boundaries.

## Process

1. Restate the intended outcome and affected audiences.
2. Inventory exact current behavior and source-backed constraints.
3. Apply the relevant APT principles and identify missing evidence.
4. Compare viable options, including compatibility and operational effects.
5. Produce the required artifacts: readiness checklist, SLOs and telemetry, runbook, known issues, escalation paths, knowledge articles, release communications, and rollback.
6. Review launch without ownership, alerts without action, missing customer-safe explanations, unclear escalation, and undocumented operational dependencies; separate blockers, recommendations, and open questions.

## Outputs

A concise recommendation, evidence map, required changes, risks, validation plan, support/documentation impact, and approval status.

## Quality Bar

The output is practical, source-backed, audience-aware, testable, reversible where possible, and does not state assumptions as facts.

## Domain Checklist

- Treat **Escalation Path Review** as an explicit decision with defined scope, evidence, owner, and validation.
- Required evidence: owner, telemetry, runbook, knowledge, escalation, communication, rollback.
- State what is verified, what is assumed, and what requires specialist or human approval.

## Required Reading

Read the canonical Service Readiness principle hub, the closest enforceable standard, the applicable checklist, and exact target-repository evidence.
## References

- [Service Readiness principles](../../../principles/service-readiness/README.md)
- [Templates](../../../templates/README.md)
- [Agents](../../../agents/README.md)
