---
title: Privacy Review
kind: principle
status: active
owner: APT
last_updated: 2026-06-27
source: apt-principles and apt-agent-standards
domain: "security-risk"
source_paths: ["apt-principles-agents/principles/security-risk/privacy-review.md"]
---

# Privacy Review

## Purpose

This principle helps APT teams identify trust boundaries, permissions, sensitive data, abuse paths, privacy impact, compliance dependencies, and required human approvals. It is guidance for decisions and required evidence, not a claim about any specific vendor or product.

## Principles

- Begin with the intended outcome and affected audiences.
- Separate verified facts, assumptions, recommendations, and open questions.
- Prefer explicit contracts, reversible steps, and supportable behavior.
- Preserve compatibility when it materially reduces customer or partner disruption.
- Record the evidence needed for another person or agent to review the decision.

## Required Artifacts

At minimum, produce: threat and data-flow review, role-permission matrix, secret handling, retention, abuse controls, audit trail, residual risk, and approval owner.

## Tradeoffs And Failure Modes

Review for implicit authorization, excessive data collection, sensitive logs, unsupported compliance claims, and AI-generated security conclusions without review. When evidence is incomplete, mark the gap rather than inventing certainty.

## Review Questions

1. What outcome and audience does this serve?
2. Which source-backed facts constrain the decision?
3. What alternatives and migration effects were considered?
4. How will engineering, security, documentation, and support verify readiness?
5. What remains uncertain and who must approve it?

## Topic-Specific Guidance

- Treat **Privacy Review** as an explicit decision with defined scope, evidence, owner, and validation.
- Document purpose, minimization, consent, access, retention, deletion, sharing, and data-subject impact.
- State what is verified, what is assumed, and what requires specialist or human approval.

See the [Security Risk canonical hub](README.md) and linked standards/checklists before making final claims.
## Related

- [APT Principles](../README.md)
- [Skills](../../skills/README.md)
- [Templates](../../templates/README.md)
