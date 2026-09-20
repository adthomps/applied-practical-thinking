---
title: Human Consumable Apis
kind: principle
status: active
owner: APT
last_updated: 2026-08-16
source: apt-principles and apt-agent-standards
domain: "api"
source_paths: ["apt-principles-agents/principles/api/human-consumable-apis.md"]
---

# Human Consumable Apis

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

- Treat **Human Consumable Apis** as an explicit decision with defined scope, evidence, owner, and validation.
- Required evidence: audience, schema, auth, errors, idempotency, examples, compatibility, operations.
- Organize the contract around recognizable user and integrator intents with predictable naming, progressive disclosure, copyable examples, and a clear path from first success to advanced behavior.
- Make authentication, permissions, state transitions, errors, retryability, asynchronous completion, limits, versioning, and support identifiers understandable without internal implementation knowledge.
- Test onboarding, common tasks, debugging, recovery, migration, and reference lookup with representative beginners and expert consumers; record where documentation or tooling must compensate for complexity.
- State what is verified, what is assumed, and what requires specialist or human approval.

See the [Api canonical hub](README.md) and linked standards/checklists before making final claims.
## Related

- [APT Principles](../README.md)
- [Skills](../../skills/README.md)
- [Templates](../../templates/README.md)
