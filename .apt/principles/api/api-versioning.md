---
title: API Versioning
kind: principle
status: active
owner: APT
last_updated: 2026-06-27
source: apt-principles and apt-agent-standards
domain: "api"
source_paths: ["apt-principles-agents/principles/api/api-versioning.md"]
---

# API Versioning

## Purpose

This principle helps APT teams select API styles from audience and behavior, then make contracts predictable, secure, observable, evolvable, and usable by humans and agents. It is guidance for decisions and required evidence, not a claim about any specific vendor or product.

## Principles

- Begin with the intended outcome and affected audiences.
- Separate verified facts, assumptions, recommendations, and open questions.
- Prefer explicit contracts, reversible steps, and supportable behavior.
- Preserve compatibility when it materially reduces customer or partner disruption.
- Record the evidence needed for another person or agent to review the decision.

## Required Artifacts

At minimum, produce: audience, use cases, protocol decision, schema, auth, errors, idempotency, pagination, webhooks, examples, tests, and deprecation policy.

## Tradeoffs And Failure Modes

Review for fashion-driven protocol choices, ambiguous errors, unsafe retries, undocumented permissions, weak compatibility, and examples that do not execute. When evidence is incomplete, mark the gap rather than inventing certainty.

## Review Questions

1. What outcome and audience does this serve?
2. Which source-backed facts constrain the decision?
3. What alternatives and migration effects were considered?
4. How will engineering, security, documentation, and support verify readiness?
5. What remains uncertain and who must approve it?

## Topic-Specific Guidance

- Treat **Api Versioning** as an explicit decision with defined scope, evidence, owner, and validation.
- Name compatibility guarantees, additive-change rules, sunset evidence, communications, and client migration.
- State what is verified, what is assumed, and what requires specialist or human approval.

See the [Api canonical hub](README.md) and linked standards/checklists before making final claims.
## Applied by

- [apt-api-bridge-reviewer](../../agents/api/apt-api-bridge-reviewer.md) — Use when a bridge or adapter layer sits between a legacy API and a modern one, to confirm it preserves correct behavior on both sides.

## Related

- [APT Principles](../README.md)
- [Skills](../../skills/README.md)
- [Templates](../../templates/README.md)
