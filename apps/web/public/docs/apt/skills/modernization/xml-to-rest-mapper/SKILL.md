---
name: xml-to-rest-mapper
description: Use when work must inventory legacy behavior before designing a facade, adapter, bridge, parity plan, dual run, deprecation path, and rollback.
kind: skill
status: active
owner: APT
last_updated: 2026-06-27
source: consolidated APT guidance
title: "XML To Rest Mapper"
domain: "modernization"
source_paths: ["apt-principles-agents/skills/modernization/xml-to-rest-mapper/SKILL.md"]
---

# XML To Rest Mapper

## Purpose

Produce a reviewable xml to rest mapper outcome that is grounded in repository evidence and explicit about uncertainty.

## When to Use

Use for planning, design, implementation review, migration, troubleshooting, or documentation where the task must inventory legacy behavior before designing a facade, adapter, bridge, parity plan, dual run, deprecation path, and rollback.

## Inputs

- Goal, audience, scope, constraints, and success criteria.
- Relevant source files, contracts, examples, logs, and decisions.
- Known risks, assumptions, dependencies, and approval boundaries.

## Process

1. Restate the intended outcome and affected audiences.
2. Inventory exact current behavior and source-backed constraints.
3. Apply the relevant APT principles and identify missing evidence.
4. Compare viable options, including compatibility and operational effects.
5. Produce the required artifacts: legacy inventory, field/error/auth mappings, parity matrix, contract and replay tests, observability, dual-run metrics, communications, and rollback plan.
6. Review forced big-bang migration, silent parity loss, incorrect error translation, token incompatibility, and deprecation without customer evidence; separate blockers, recommendations, and open questions.

## Outputs

A concise recommendation, evidence map, required changes, risks, validation plan, support/documentation impact, and approval status.

## Quality Bar

The output is practical, source-backed, audience-aware, testable, reversible where possible, and does not state assumptions as facts.

## Domain Checklist

- Treat **Xml To Rest Mapper** as an explicit decision with defined scope, evidence, owner, and validation.
- Model stable resources, HTTP semantics, representations, state transitions, caching, and discoverable errors.
- State what is verified, what is assumed, and what requires specialist or human approval.

## Required Reading

Read the canonical Modernization principle hub, the closest enforceable standard, the applicable checklist, and exact target-repository evidence.
## References

- [Modernization principles](../../../principles/modernization/README.md)
- [Templates](../../../templates/README.md)
- [Agents](../../../agents/README.md)
