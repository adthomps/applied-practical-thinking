---
title: Support Readiness
kind: principle
status: active
owner: APT
last_updated: 2026-06-27
source: apt-principles and apt-agent-standards
domain: "service-readiness"
source_paths: ["apt-principles-agents/principles/service-readiness/support-readiness.md"]
---

# Support Readiness

## Purpose

This principle helps APT teams prove the service can launch, operate, degrade safely, be supported, be troubleshot, and communicate change. It is guidance for decisions and required evidence, not a claim about any specific vendor or product.

## Principles

- Begin with the intended outcome and affected audiences.
- Separate verified facts, assumptions, recommendations, and open questions.
- Prefer explicit contracts, reversible steps, and supportable behavior.
- Preserve compatibility when it materially reduces customer or partner disruption.
- Record the evidence needed for another person or agent to review the decision.

## Required Artifacts

At minimum, produce: readiness checklist, SLOs and telemetry, runbook, known issues, escalation paths, knowledge articles, release communications, and rollback.

## Tradeoffs And Failure Modes

Review for launch without ownership, alerts without action, missing customer-safe explanations, unclear escalation, and undocumented operational dependencies. When evidence is incomplete, mark the gap rather than inventing certainty.

## Review Questions

1. What outcome and audience does this serve?
2. Which source-backed facts constrain the decision?
3. What alternatives and migration effects were considered?
4. How will engineering, security, documentation, and support verify readiness?
5. What remains uncertain and who must approve it?

## Topic-Specific Guidance

- Treat **Support Readiness** as an explicit decision with defined scope, evidence, owner, and validation.
- Require named owners, evidence, operational checks, support handoff, rollback, communications, and approval.
- State what is verified, what is assumed, and what requires specialist or human approval.

See the [Service Readiness canonical hub](README.md) and linked standards/checklists before making final claims.
## Related

- [APT Principles](../README.md)
- [Skills](../../skills/README.md)
- [Templates](../../templates/README.md)
