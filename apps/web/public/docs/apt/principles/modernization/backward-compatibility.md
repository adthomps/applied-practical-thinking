---
title: Backward Compatibility
kind: principle
status: active
owner: APT
last_updated: 2026-06-27
source: apt-principles and apt-agent-standards
domain: "modernization"
source_paths: ["apt-principles-agents/principles/modernization/backward-compatibility.md"]
---

# Backward Compatibility

## Purpose

This principle helps APT teams inventory legacy behavior before designing a facade, adapter, bridge, parity plan, dual run, deprecation path, and rollback. It is guidance for decisions and required evidence, not a claim about any specific vendor or product.

## Principles

- Begin with the intended outcome and affected audiences.
- Separate verified facts, assumptions, recommendations, and open questions.
- Prefer explicit contracts, reversible steps, and supportable behavior.
- Preserve compatibility when it materially reduces customer or partner disruption.
- Record the evidence needed for another person or agent to review the decision.

## Required Artifacts

At minimum, produce: legacy inventory, field/error/auth mappings, parity matrix, contract and replay tests, observability, dual-run metrics, communications, and rollback plan.

## Tradeoffs And Failure Modes

Review for forced big-bang migration, silent parity loss, incorrect error translation, token incompatibility, and deprecation without customer evidence. When evidence is incomplete, mark the gap rather than inventing certainty.

## Review Questions

1. What outcome and audience does this serve?
2. Which source-backed facts constrain the decision?
3. What alternatives and migration effects were considered?
4. How will engineering, security, documentation, and support verify readiness?
5. What remains uncertain and who must approve it?

## Topic-Specific Guidance

- Treat **Backward Compatibility** as an explicit decision with defined scope, evidence, owner, and validation.
- Required evidence: legacy inventory, mappings, parity, tests, dual run, rollback, deprecation.
- State what is verified, what is assumed, and what requires specialist or human approval.

See the [Modernization canonical hub](README.md) and linked standards/checklists before making final claims.
## Related

- [APT Principles](../README.md)
- [Skills](../../skills/README.md)
- [Templates](../../templates/README.md)
