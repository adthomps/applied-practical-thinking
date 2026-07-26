---
title: Phase 1 Readiness Check
kind: assessment
domain: architecture
status: active
owner: APT
last_updated: 2026-07-13
source_paths: ["apt-principles-agents/docs/refactor/phase-1-readiness-check.md"]
---

# Phase 1 Readiness Check

## Overall Readiness

[Recommendation] Phase 1 is ready to scope as a small documentation-only implementation commit, but it is not ready to implement until the blocking governance decisions below are explicitly approved. The repository should not move content, create new top-level directories, create generated knowledge, create tool adapters, introduce schemas, or change runtime behavior in Phase 1.

[Verified current state] The repository is best treated as a documentation and agent-asset repository with distribution and validation tooling. Evidence includes `README.md`, `AGENTS.md`, `governance/`, `principles/`, `standards/`, `agents/`, `skills/`, `manifests/`, `installers/`, `scripts/apt-assets.mjs`, and `package.json`. No service runtime, stateful orchestration layer, independently consumable package layout, or runtime agent execution layer was verified.

## Verified Prerequisites

- [Verified current state] `docs/refactor/` contains a complete assessment package covering source hierarchy, target architecture, cross-agent instruction boundaries, generated-content design, distribution model, context efficiency, migration planning, risks, decision register, independent review, required revisions, and implementation readiness.
- [Verified current state] `governance/` already exists and is responsible for repository assessment, review, maturity, service readiness, design review, and architecture review material.
- [Verified current state] `docs/` already exists for operator and contributor documentation, distribution docs, diagrams, operations, migration history, archives, and the refactor assessment package.
- [Verified current state] `adapters/` does not exist. The active tool-adapter material lives under `platforms/`, root tool instruction files, and platform-specific source or distribution paths.
- [Verified current state] Existing context packs are curated source maps, not generated caches or canonical doctrine replacements. Evidence: `context-packs/README.md`.
- [Verified current state] Existing distribution behavior is script-based. `scripts/apt-assets.mjs` implements `detect`, `install`, `scan`, `sync`, `repair`, `uninstall`, `audit-workspace`, `migrate-legacy`, and `check-parity`.
- [Verified current state] The Voice of Customer skill exists at `skills/product/voice-of-customer/SKILL.md`.
- [Verified current state] The Voice of Customer analyst exists at `agents/product/apt-voice-of-customer-analyst.md`.
- [Verified current state] Working Backwards content exists across doctrine, context, and checklist material, including `principles/thinking/README.md`, `context/working-backwards/README.md`, and `checklists/working-backwards-package-readiness-checklist.md`, but no first-class Working Backwards principle file was verified.
- [Verified current state] ADR templates exist at `templates/ADR-TEMPLATE.md` and `templates/decision-records/ADR.md`.

## Missing Prerequisites

- [Human decision] DR-001 authority hierarchy approval is still required before Phase 1 can publish canonical authority and conflict rules.
- [Human decision] DR-002 taxonomy approval is still required because prompts, checklists, manifests, context packs, routing definitions, generated status, and historical or experimental content must be classified without gaps.
- [Human decision] DR-005 workflow and playbook boundary approval is still required before a workflow convention is published as canonical.
- [Human decision] DR-013 ADR home, ownership, status model, naming, and indexing must be resolved before any ADR directory or first ADR is created.
- [Verified current state] `CONTRIBUTING.md` still contains stale references to old root doctrine files and an ADR location. It should be updated later rather than duplicated by new Phase 1 docs.
- [Verified current state] `docs/diagrams/repository-structure.md` still presents an obsolete root-doctrine layout. It should be updated later rather than treated as current architecture evidence.

## Blocking Decisions

| Decision | Why it blocks Phase 1 implementation |
| --- | --- |
| DR-001 authority hierarchy | Phase 1 must define security, legal, privacy, regulatory, repository, principles, standards, ADR, root instruction, scoped instruction, canonical, derived, and generated precedence without ambiguity. |
| DR-002 asset taxonomy | Phase 1 must classify all active first-class repository assets without creating parallel categories or leaving prompts, checklists, manifests, context packs, and routing definitions outside the model. |
| DR-005 workflow and playbook boundary | Phase 1 must define a practical discriminator before any workflow convention or pilot workflow can be described. |
| DR-013 ADR foundation | Phase 1 cannot create an ADR directory or first ADR until ADR location, ownership, status, naming, and indexing are approved. |

## Non-Blocking Decisions

| Decision | Phase 1 treatment |
| --- | --- |
| DR-003 references versus schemas | Record the trigger rule, but do not create a schema directory or new schema in Phase 1. |
| DR-006 adapter generation boundary | Document generated-content and adapter boundaries, but do not generate adapters. |
| DR-007 generated wiki tooling boundary | Document generated wiki tooling as generated, non-canonical, future-only content. Do not create generated wiki tooling output. |
| DR-008 OKF scope | Document OKF as future-only and consumer-gated. Do not create OKF projections. |
| DR-011 pilot agent mapping | Use the existing Voice of Customer analyst if the pilot proceeds; do not create a Product Discovery Agent. |
| DR-014 validator ignored-path scope | Record the known validator-exclusion issue, but do not alter validators or delete local residue in Phase 1. |

## Existing Documents Covering Phase 1 Topics

- [Verified current state] `docs/refactor/canonical-source-hierarchy.md` covers the proposed authority hierarchy and conflict rules, but remains assessment material until approved.
- [Verified current state] `docs/refactor/current-state-inventory.md` inventories current directories, asset kinds, and validation responsibilities.
- [Verified current state] `docs/refactor/target-architecture.md` defines the conservative future shape, including when not to create `workflows/`, `schemas/`, `adapters/`, `knowledge/`, or `packages/`.
- [Verified current state] `docs/refactor/cross-agent-instruction-model.md` classifies canonical agent and skill sources versus tool-specific adapters and generated mappings.
- [Verified current state] `docs/refactor/okf-design.md` defines generated-content boundaries for generated wiki tooling and OKF while deferring implementation.
- [Verified current state] `docs/refactor/distribution-model.md` maps future conceptual command names to existing script behavior and future conditions.
- [Verified current state] `docs/refactor/context-efficiency.md` supports selective context loading and a convention-only context packet.
- [Verified current state] `docs/refactor/decision-register.md` records the decisions that should gate Phase 1 and later phases.
- [Verified current state] `governance/architecture-review.md`, `governance/service-readiness-review.md`, `governance/maturity-model.md`, and `governance/scorecard.md` already mention ADRs, but they assume `docs/decisions/` before DR-013 has approved an ADR home.
- [Verified current state] `context-packs/README.md` already says context packs are curated source maps and not canonical replacements.
- [Verified current state] `docs/operations/operating.md` documents current distribution operations through `scripts/apt-assets.mjs`.

## Duplication Risks

- [Inference] Creating `docs/governance/` would create a second governance home beside the established top-level `governance/` directory.
- [Inference] Creating `docs/architecture/` only for Phase 1 conventions would fragment governance and architecture ownership before the repository has approved those boundaries.
- [Inference] Creating separate documents for authority, lifecycle, ADR convention, and decision lifecycle would likely repeat the same conflict-resolution rules.
- [Inference] Creating separate documents for workflow conventions, context packets, and future command specifications would add three small architecture docs where one operating-conventions document can state the shared boundaries.
- [Inference] Creating an ADR directory before DR-013 approval would turn an unresolved governance question into structure.
- [Inference] Documenting future `apt` commands as if they exist would create aspirational command documentation that is not anchored to `scripts/apt-assets.mjs`.

## Recommended Scope

[Recommendation] The smallest useful Phase 1 implementation commit should use existing `governance/` ownership and produce no more than five new canonical or supporting documents, plus a small index update if approved:

1. `governance/authority-and-lifecycle.md` for authority, conflict resolution, doctrine amendment, decision lifecycle, and ADR convention until DR-013 creates or rejects a dedicated ADR home.
2. `governance/asset-taxonomy.md` for first-class asset taxonomy, lifecycle, ownership, validation expectations, and canonical versus derived versus generated classification.
3. `governance/generated-content-policy.md` for generated-content governance covering generated wiki tooling, OKF, adapters, AI summaries, generated indexes, context packs, and generated repository documentation.
4. `governance/operating-conventions.md` for workflow conventions, playbook discriminator, context packet convention, and future command specifications mapped to current tooling.
5. `governance/phase-1-pilot.md` for a documentation-only pilot map using the existing Voice of Customer skill and analyst, one proposed Market-to-Validated-Concept workflow, and deferred Working Backwards extraction.

[Recommendation] Update `governance/README.md` in the Phase 1 implementation commit only to point to the new governance docs. Do not update `CONTRIBUTING.md` or `docs/diagrams/repository-structure.md` inside the smallest Phase 1 commit unless a separate stale-reference cleanup is explicitly approved.

## Explicit Exclusions

- [Recommendation] Do not create `docs/governance/`.
- [Recommendation] Do not create `docs/architecture/` solely for Phase 1 conventions.
- [Recommendation] Do not create `docs/pilots/` solely for the pilot map.
- [Recommendation] Do not create an ADR directory before DR-013 approval.
- [Recommendation] Do not move content from `principles/`, `standards/`, `agents/`, `skills/`, `prompts/`, `checklists/`, `context-packs/`, `routing/`, `manifests/`, `installers/`, `scripts/`, or `platforms/`.
- [Recommendation] Do not generate generated wiki tooling output, OKF projections, generated adapters, generated indexes, generated context packets, or generated repository documentation.
- [Recommendation] Do not introduce schemas or a schema directory in Phase 1.
- [Recommendation] Do not implement a CLI or change `scripts/apt-assets.mjs`.
- [Recommendation] Do not describe a Product Discovery Agent as existing.
- [Recommendation] Do not promote Working Backwards into a new canonical principle file during this phase.

## Final Determination

[Recommendation] Phase 1 is valuable and safely bounded as a documentation-only foundation, but the implementation commit should wait for explicit human approval of DR-001, DR-002, DR-005, and DR-013. After those decisions, the smallest useful commit should create five or fewer governance documents under the existing `governance/` directory, optionally update the governance index, and leave repository behavior unchanged.

READY WITH BLOCKERS
