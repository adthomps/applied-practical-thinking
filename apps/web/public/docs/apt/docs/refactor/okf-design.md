---
title: Refactor OKF Design
kind: assessment
domain: knowledge
status: active
owner: APT
last_updated: 2026-07-26
source_paths: ["apt-principles-agents/docs/refactor/okf-design.md"]
---

# OKF Design

## Boundary

APT is pursuing an OKF-only pilot. Generated wiki tooling is explicitly out of scope.

| Layer | Purpose | Authority |
| --- | --- | --- |
| Canonical APT docs | Human-authored principles, standards, skills, agents, workflows, governance, and operational guidance. | Authoritative within the existing source hierarchy. |
| OKF | Portable structured representation of selected APT knowledge concepts. | Derived unless explicitly human-authored and reviewed as canonical. |

OKF makes selected APT knowledge easier for downstream repositories and agents to consume. It does not replace the canonical Markdown sources, and it does not create a new policy path. When an OKF concept conflicts with its source, the source wins and the OKF record is stale or defective.

## Generated Wiki Tooling Status

Generated wiki tooling is not part of the active model. It may be reconsidered later only as an informational generated navigation layer with separate approval, generated-content controls, and a named consumer.

No generated repository-wiki output should be created by this pilot.

## OKF Design

Recommendation: use a small OKF v0.2 bundle:

- Human-reviewed OKF projections for selected high-value knowledge concepts that need portable structured form.
- Canonical APT Markdown remains the source of truth.
- Generated OKF records are deferred until a validator and review workflow are approved.
- No bulk OKF copy of every Markdown file.

Active pilot structure:

```text
knowledge/okf/
```

The root `index.md` declares `okf_version: "0.2"` and links to the selected pilot concepts.

## Initial OKF Scope

The first OKF experiment uses four concept types:

| Type | Minimum metadata | Source authority | Initial use |
| --- | --- | --- | --- |
| Principle | `type`, `title`, `description`, `status`, `sources`, `verified`, `owner`, `last_updated`, `source_paths`, `authority` | Existing canonical principle source. | Represent the APT Knowledge System. |
| Skill | Same minimum fields. | `skills/product/voice-of-customer/SKILL.md`. | Represent one existing skill. |
| Workflow | Same minimum fields. | Existing APT distribution operations docs and tooling. | Represent cross-repo guidance sync. |
| Decision | Same minimum fields. | This design note and decision register. | Represent the OKF adoption boundary. |

Agent may be added as a fifth type only if a later consumer needs it and the existing `agents/product/apt-voice-of-customer-analyst.md` mapping is approved. Otherwise, keep the initial experiment to Principle, Skill, Workflow, and Decision.

All future generated OKF records, when generation is eventually approved, must include generated state, provenance, source paths, source commit, confidence or review status, and validation outcome.

## Future Candidate Types

The following are future candidates, not part of the initial OKF design: Standard, Agent, Playbook, Market, Customer, Stakeholder, Intent, Product, Requirement, Architecture, Component, API, Pattern, Risk, SecurityControl, Evaluation, Observation, Outcome, Feedback, Runbook, and Example.

Concept types may expand only after the initial types prove useful to a named consumer.

## Circular Generation Prevention

- Adapters must cite canonical sources, not generated summaries.
- Any generated artifact that proposes a policy change must create a human decision item, not update policy directly.
- Generated OKF may not become source for adapter generation without a generated-content filter and human review.

## Agent Query Rules

| Question | Preferred source |
| --- | --- |
| What is the policy? | Canonical principles, standards, governance, ADRs. |
| What assets exist and how are they connected? | Context packs, OKF, then source verification. |
| What does the repository look like today? | Repo inventory, diagrams, context packs, then source verification. |
| What should a tool adapter say? | Canonical instruction source plus tool-specific extension. |
| Is generated content safe to use? | Generated metadata, review status, source verification, and security rules. |
