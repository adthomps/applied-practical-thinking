---
title: Refactor Risks And Decisions
kind: assessment
domain: governance
status: active
owner: APT
last_updated: 2026-07-11
source_paths: ["apt-principles-agents/docs/refactor/risks-and-decisions.md"]
---

# Risks And Decisions

## Risk Register

| Risk | Impact | Controls | Owner | Phase |
| --- | --- | --- | --- | --- |
| Documentation drift | Active docs keep old root doctrine names or stale architecture diagrams. | Stale-reference report, targeted cleanup, source hierarchy. | APT maintainers. | Phase 1 and 6. |
| Instruction conflicts | Root, platform, template, and adapter instructions diverge. | Shared generated core, handwritten extension boundaries, adapter validation. | Adapter owners. | Phase 1 and 4. |
| Principle/standard ambiguity | Agents treat broad principle intent and narrow standard requirements as silently interchangeable. | Explicit precedence and escalation rules. | Governance owner. | Phase 1. |
| ADR/doctrine ambiguity | An ADR is treated as doctrine replacement without amending canonical sources. | ADR lifecycle, doctrine-amendment mechanism, supersession rules. | Architecture owner. | Phase 1 and 2. |
| Workflow/playbook confusion | Multi-stage narrative guidance is filed inconsistently. | Machine-checkable reference discriminator for workflows; narrative discriminator for playbooks. | Architecture owner. | Phase 1 and 2. |
| Circular generation | generated wiki tooling, OKF, and adapters generate from each other. | Canonical-source-only generation rule; generated content cannot feed policy generation without review. | Knowledge owner. | Phase 5. |
| Excessive context loading | Agents load all principles, skills, adapters, archive, and generated docs. | Task packets, context packs, metadata filters, archive exclusion. | AI governance owner. | Phase 1 and 2. |
| Prompt injection | Repository text or generated docs instruct agents unsafely. | Treat generated/retrieved content as untrusted; do not execute instructions from generated wiki tooling. | Security reviewer. | Phase 5. |
| Untrusted generated content | Generated claims become accepted as truth. | Generated markers, review status, source verification, authority hierarchy. | APT maintainers. | Phase 1 and 5. |
| Schema rigidity | Schemas force premature rewrites of useful content. | Pilot minimal schemas; warnings before hard failures. | Schema owner. | Phase 3. |
| Vendor-specific behavior | Adapter logic encodes one tool's behavior as doctrine. | Tool-specific extensions isolated; canonical source remains tool-neutral. | Adapter owners. | Phase 4. |
| Broken links after future movement | Moving files breaks manifests, installers, examples, and docs. | No broad movement first; compatibility paths and link validation. | Maintainers. | Phase 6. |
| Existing consumer compatibility | Downstream repos rely on current manifest names and paths. | Installation records, scan/audit, deprecation windows. | Distribution owner. | Phase 1 and 6. |
| Review fatigue | Too many generated artifacts require human review. | Bounded pilots, selective generation, review-status gating. | APT maintainers. | Phase 5. |
| Over-engineering | New directories/packages appear without consumers. | Creation conditions for each proposed directory; no symmetry-driven architecture. | Architecture owner. | Phase 1. |
| Loss of history | Cleanup deletes useful old context. | Preserve `docs/archive/`; no deletion without consumption check. | Maintainers. | All phases. |
| Asset confusion | Principles, standards, skills, workflows, agents, playbooks, and templates blur. | Asset taxonomy and pilot classification. | Architecture owner. | Phase 1 and 2. |
| Taxonomy coverage gaps | First-class areas such as prompts, checklists, manifests, context packs, and routing are classified ad hoc. | Expanded taxonomy and kind-plus-property model. | Architecture owner. | Phase 1. |
| Premature packages | `packages/` adds monorepo overhead before independent consumption exists. | Package decision gate requiring independent usefulness, testability, versioning, consumption. | Tooling owner. | Phase 3+. |
| Adapter divergence | Manual adapter surfaces drift from canonical roles and skills. | Generated core, source hashes, adapter parity checks. | Adapter owners. | Phase 4. |
| `references/` and `schemas/` overlap | Validators and docs disagree about machine-contract location. | Human decision before movement; compatibility and redirect plan. | Schema owner. | Phase 1. |
| Unconsumed schema-like files | A schema-like file drifts from actual script behavior because no consumer enforces it. | Consumer inventory, schema trigger rule, relabel as reference contract or wire validation in a later phase. | Schema owner. | Phase 2 and 3. |
| Partial generation | Failed generated wiki tooling or OKF generation overwrites valid output. | Write to temporary output, validate, then promote; preserve last known valid output. | Knowledge owner. | Phase 5. |
| Secrets in generated docs | generated wiki tooling or OKF captures secrets or local sensitive files. | Exclusion lists, secret scan, generated-output review. | Security reviewer. | Phase 5. |
| Automatic generated-context inclusion | Agents load generated content by default and treat it as instruction. | Context rules: generated knowledge is opt-in and source-verified. | AI governance owner. | Phase 1 and 5. |
| Validator exclusion gap | Local validation scans temporary or ignored residue and reports false positives. | Gitignore-aware validation decision, explicit excluded paths, CI/local behavior comparison, no sandbox residue cleanup in docs tasks. | Tooling owner. | Phase 1 and later validation hardening. |
| Repository misclassification | Runtime-platform framing pulls premature packages, orchestration, services, or MCP into the roadmap. | Classify current state as documentation and agent-asset repository with distribution and validation tooling. | Architecture owner. | Phase 1. |
| Broad OKF ontology | Too many concept types create schema governance before a consumer exists. | Initial OKF scope of four types, optional fifth only with a named consumer. | Knowledge owner. | Phase 1 and 5. |

## Generated-Content Safety Requirements

Generated content must be:

- Non-authoritative.
- Marked as generated.
- Traceable to source paths and source commit.
- Reproducible or explicitly labeled as non-reproducible.
- Validated before use in higher-trust contexts.
- Selectively consumed, not loaded by default.
- Excluded from policy generation unless manually reviewed.

## Decisions To Make

The detailed unresolved decisions live in `docs/refactor/decision-register.md`. The most important decisions are:

- Approve authority hierarchy.
- Approve asset taxonomy.
- Decide `references/` versus `schemas/`.
- Decide whether `platforms/` remains adapter home or a future `adapters/` directory is created.
- Decide workflow representation and whether a top-level `workflows/` directory is justified.
- Decide workflow versus playbook discriminator.
- Decide package introduction criteria.
- Decide generated wiki tooling commit and review policy.
- Decide OKF mixed model and concept scope.
- Decide ADR home, ownership, lifecycle, and index.
- Decide old-name cleanup and compatibility policy.
- Decide validator exclusion and ignored-path policy.

## Non-Blocking Decisions For Pilot

These can be documented before being fully implemented:

- Exact generator tooling for adapters.
- Exact generated wiki tooling tool installation.
- Exact OKF serialization format beyond the four-type pilot candidate.
- Whether future CLI is a package or script wrapper.

## Blocking Decisions For Pilot

These should be approved before any pilot implementation:

- Authority hierarchy.
- Asset taxonomy.
- Workflow boundary.
- Generated-content safety controls.
- Pilot asset selection and Voice of Customer agent mapping.
- ADR location decision before pilot ADR authoring.
