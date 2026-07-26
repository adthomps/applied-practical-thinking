---
title: Refactor Canonical Source Hierarchy
kind: assessment
domain: governance
status: active
owner: APT
last_updated: 2026-07-11
source_paths: ["apt-principles-agents/docs/refactor/canonical-source-hierarchy.md"]
---

# Canonical Source Hierarchy

## Authority Order

This hierarchy separates conceptual content authority from delivery format.

1. Security, legal, regulatory, privacy, compliance, and explicit repository constraints.
2. Canonical APT principles.
3. Canonical APT standards.
4. Approved governance decisions and architecture decisions.
5. Canonical agent, skill, and workflow definitions.
6. Root and scoped execution instructions.
7. Human-authored supporting documentation.
8. Generated adapters and OKF projections.
9. generated wiki tooling-generated repository documentation.
10. Archived and historical material.

Security and repository constraints are mandatory boundaries, not optional principles. They cannot be overridden by principles, standards, instructions, examples, generated content, or local convenience.

This hierarchy is a documented operating convention until later validation work enforces it mechanically.

## Conflict Resolution

| Conflict | Winning source | Rule |
| --- | --- | --- |
| Security/legal policy vs any other source | Security/legal policy | Safety and compliance constraints always constrain execution. |
| Principle vs standard | See rule below | Principles guide judgment and tradeoffs; standards define required or measurable practice. A standard may constrain how a broad principle is applied, but must not reverse the principle's intent without approved governance. |
| Principle vs skill | Principle | Skills are procedures; they cannot redefine judgment or values. |
| Standard vs example | Standard | Examples demonstrate patterns but do not relax required practice. |
| Approved ADR vs general supporting doc | ADR | ADRs record approved architecture decisions for a bounded scope. |
| Canonical agent vs tool adapter | Canonical agent | Tool adapters translate role behavior; they do not redefine the role. |
| Root instruction vs canonical doctrine | Decidable by scope | Canonical doctrine wins on policy and intent; root or scoped instructions win on immediate execution mechanics only when consistent with higher authority. Any residual conflict is recorded and escalated. |
| Human-authored doc vs generated output | Human-authored doc | Generated content is informational until reviewed and promoted. |
| Active content vs archive | Active content | Archive is provenance and history only. |

## Principle And Standard Rule

Principles guide judgment, intent, values, and tradeoffs. Standards define required practice, measurable expectations, or repeatable constraints. Standards must remain consistent with principles.

When a standard appears to conflict with a principle:

1. Do not silently choose one in agent output.
2. Follow any applicable security or repository constraint first.
3. Determine whether the standard is a narrower approved implementation of the principle.
4. If the standard reverses or materially changes the principle's intent, escalate for governance review.
5. Record the conflict and owner in the relevant decision register or ADR.

## ADR And Doctrine Evolution

ADRs record implementation or architectural decisions. They may interpret or apply doctrine for a bounded scope, but they may not silently override canonical principles or standards.

Doctrine evolves through this mechanism:

1. A proposal identifies the doctrine gap or conflict.
2. An ADR or governance decision records the options, evidence, recommendation, owner, review requirements, and affected sources.
3. If approved, the relevant canonical principle or standard is amended explicitly.
4. Supporting docs, adapters, prompts, examples, and generated views are refreshed from or linked back to the amended source.
5. Superseded ADRs remain historical records and link to their replacements.

An ADR that contradicts current doctrine is not self-executing policy. It creates a required doctrine-amendment or exception decision.

## `AGENTS.md` Status

Current `AGENTS.md` is mixed:

- Canonical enough for immediate repository operation because local agents must obey it.
- Derived from broader APT principles because it summarizes how to work in this repo.
- Adapter-like because it is a root tool-facing instruction surface.

Transition rule: keep `AGENTS.md` as the immediate root operational authority until a shared instruction definition and generator are approved. Do not let its root position make it conceptually more authoritative than principles, standards, security constraints, or approved decisions.

## Scoped Instructions

Directory-scoped instructions may narrow context, name local validation, or define local output expectations. They must not silently override:

- Security and repository constraints.
- Canonical APT principles and standards.
- Approved ADRs or governance decisions.
- Generated-content safety controls.

If scoped instructions appear to conflict with higher authority, agents must record the conflict, follow the higher authority, and request human approval when the conflict changes behavior or risk.

Root and scoped instructions translate canonical doctrine into operational behavior for a repository, directory, or tool. They may not introduce hidden doctrine. A scoped-instruction inventory should be produced before any adapter-generation pilot so policy-adjacent instruction surfaces are known.

## Generated Content Controls

Generated adapters, OKF projections, and generated wiki tooling output must include or preserve:

- Source path or source commit.
- Generated marker.
- Generator name and version when available.
- Generation timestamp.
- Authority label such as `informational` or `derived`.
- Review status.
- Staleness status.

Generated content cannot become policy by being convenient, highly ranked in search, or embedded in an adapter. Promotion from generated content to policy requires a human-authored source update, review, and validation.

Generated content cannot outrank its source. If generated content conflicts with its source, the source wins and the generated artifact is stale or defective.

## Agent Read Order

For any non-trivial task:

1. Read the root operational instruction (`AGENTS.md`) for immediate repo behavior.
2. Read the task-relevant canonical principle and standard.
3. Read approved governance or ADR material if the task touches architecture, security, distribution, generated knowledge, or public-facing content.
4. Read the smallest applicable skill, workflow, or agent definition.
5. Use context packs or generated knowledge only as navigation, then verify claims against canonical or project-owned sources before final assertions.

## Recommended Implementation Status

| Item | Recommendation |
| --- | --- |
| `AGENTS.md` | Keep as operational authority in transition. |
| `CLAUDE.md`, `CODEX.md`, `GEMINI.md` | Keep as thin tool context files; later generate shared core plus handwritten tool deltas. |
| Copilot instructions | Keep in `platforms/github-copilot`; classify source vs distribution before generation. |
| generated wiki tooling | Informational only, below human docs and OKF projections. |
| OKF projections | Derived structured knowledge; not a mirror and not policy unless manually promoted. |
| Archive | Provenance only; never loaded by default for policy. |
