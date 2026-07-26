---
title: Refactor Merge Quality Assessment
kind: assessment
domain: architecture
status: active
owner: APT
last_updated: 2026-07-11
source_paths: ["apt-principles-agents/docs/refactor/merge-quality-assessment.md"]
---

# Merge Quality Assessment

## Overall Finding

The merged repository is best classified as a documentation and agent-asset repository with distribution helpers and validation tooling. It has platform-like ambitions and some platform-shaped assets, but verified current evidence does not support calling it a runtime agent platform.

It currently combines:

- A doctrine and content platform: current.
- An agent asset library with skills, agents, prompts, context packs, and routing definitions: current.
- A distribution toolkit with manifests, installers, compatibility records, and validation: current.
- A validation toolchain: current.
- A runtime agent platform with orchestration, state, service runtime, and operational agent execution: not evidenced; future option only.

It is not merely two repositories colocated. Evidence: the migration ledger classifies 505 source files, active validation passes, former profile concepts were rationalized into manifests, root guidance says principles, skills, agents, templates, prompts, examples, platforms, and distribution tooling have distinct roles, and `scripts/apt-assets.mjs` provides a coherent managed-install lifecycle.

It is also not yet a clean monorepo or runtime platform. There are no independently versioned packages, no first-class workflow model, no active generated wiki tooling output, no active OKF model, no service runtime, and some platform adapter files still look manually maintained rather than generated from shared definitions.

## Evidence Summary

| Evidence | Interpretation |
| --- | --- |
| `npm run check` passes. | Mechanical health is good; this is architecture cleanup, not emergency repair. |
| `docs/migration/source-ledger.json` classifies 505/505 files. | Merge provenance exists and supports preservation of history. |
| `principles/`, `skills/`, `agents/`, `manifests/`, `installers/`, `scripts/`, and `platforms/` are first-class. | The repo already has a platform shape. |
| `docs/diagrams/repository-structure.md` still describes old root doctrine files. | Some human docs lag behind the merged structure. |
| `rg` finds many active references to old doctrine filenames. | Stale names remain in docs, prompts, examples, checklists, and adapters. |
| Multiple adapter roots exist: root tool files, `platforms/shared-source`, `platforms/codex`, `platforms/claude`, `platforms/gemini`, `platforms/github-copilot`. | Adapter strategy needs source and generation boundaries. |
| `references/` contains JSON contracts and at least one schema file. | Current reference/schema responsibility is mixed. |

## Quality Dimensions

| Dimension | Assessment |
| --- | --- |
| Directory consistency | Mostly coherent. Top-level directories map to APT asset types, but `context/` vs `context-packs/`, `references/` vs future `schemas/`, and `platforms/` vs future `adapters/` need explicit boundaries. |
| Naming consistency | Mixed. Active paths are coherent, but active text frequently uses former root doctrine names and old profile terms. |
| Source-of-truth clarity | Good at the root README level, incomplete across older docs. `AGENTS.md` is immediate operational authority, while principles and standards should remain conceptual authority. |
| Broken or stale references | Validation passes, so link targets are mechanically acceptable where links exist. Staleness remains in plain-text path names and conceptual references. |
| Duplicate doctrine | No evidence of large exact duplicate principle bodies outside quick references, but installable summaries and quick references need clear derived status. |
| Duplicate agent definitions | Canonical `agents/` coexist with platform-specific agent files. Some are genuinely tool-specific, some should be generated or mapped. |
| Duplicate adapters | Copilot source/distribution, shared-source adapters, root files, and platform source folders overlap. This needs a generation and validation model. |
| Redundant scripts | Former scripts were merged into `scripts/apt-assets.mjs` and archived. Active script set is not obviously redundant. |
| Parallel contracts | `references/` holds contracts and schemas together. This is acceptable temporarily but should be decided. |
| Historical material | Properly under `docs/archive/`, excluded from active validation. Keep it non-canonical. |
| Implemented behavior gap | Future concepts in the request, including generated wiki tooling, OKF, `workflows/`, `schemas/`, `knowledge/`, and `packages/`, are not implemented. They should remain design targets until piloted. |

## Finding Classification

| Finding | Class | Evidence | Current impact | Recommended action | Migration risk | Blocks first pilot |
| --- | --- | --- | --- | --- | --- | --- |
| Merged repo has coherent platform core. | Keep | Passing `npm run check`, source ledger, first-class directories, manifest lifecycle. | Provides stable base for incremental work. | Preserve structure and avoid broad movement. | Low. | No. |
| Active docs still cite former root doctrine filenames. | Rename | `rg` finds references to `apt-principles-agents.md`, `thinking.md`, `ai-agent-framework.md`, and related names. | Confuses current canonical paths and future adapters. | Create a later targeted stale-reference cleanup after authority model approval. | Medium because many examples/templates intentionally show old names. | No. |
| `docs/diagrams/repository-structure.md` describes obsolete root doctrine layout. | Consolidate | Diagram lists root doctrine files that no longer exist as active roots. | Misleads architecture readers. | Update in a later docs cleanup or replace with generated/current architecture view. | Low. | No. |
| Platform adapters overlap canonical agents and skills. | Generate | `platforms/` has 103 files; root and shared-source instruction files also exist. | Creates drift risk across tools. | Adopt shared generated core plus tool-specific generated mapping and handwritten extensions. | Medium. | No, if pilot documents mapping only. |
| `references/` mixes schemas and reference contracts. | Requires human decision | `references/installation.schema.json` sits beside contracts like `agent-standards-contract.json`. | Future validation ownership is ambiguous. | Decide split before moving: keep `references/` now, introduce `schemas/` only for machine-validatable schemas. | Medium due consumer paths. | No. |
| No first-class `workflows/` directory. | Move | Workflow-like examples and prompts exist in `examples/workflows/` and `prompts/planning/`. | Skills/workflows boundary is blurry. | Define workflow schema and pilot before creating top-level directory. | Medium. | No. |
| No generated wiki tooling integration. | Keep | No active `generated-wiki` paths found in active tree. | No generated repo-understanding layer yet. | Design only; do not generate in this phase. | Low. | No. |
| No OKF model. | Keep | `references/knowledge-contracts.json` exists, but no `knowledge/okf`. | Portable knowledge model is not available. | Design selective OKF projection model; do not bulk-convert. | Medium. | No. |
| Existing installation lifecycle is valuable. | Keep | `apt-assets.mjs` maps to install, scan, sync, repair, detect, audit. | Strong base for future conceptual CLI. | Wrap or package later only when independent consumption is justified. | Low. | No. |
| Runtime platform classification is not evidenced. | Rename | No service runtime, no runtime orchestration layer, no stateful agent execution, no independently consumable package. | Runtime framing could pull premature packages, services, MCP, or orchestration work into the roadmap. | Use "documentation and agent-asset repository with distribution and validation tooling" for current state; reserve "runtime platform" for future evidence. | Low. | No. |
| `packages/` is not currently justified. | Requires human decision | No independent packages or workspaces exist; `package.json` is repo-level private tooling. | Premature packages would add maintenance overhead. | Delay until a CLI, schema, validator, or adapter generator is independently useful. | Low if delayed, high if premature. | No. |

## Coherence Verdict

The repository is a partially consolidated documentation and agent-asset platform with a strong canonical content base and useful distribution tooling. The merge quality is good enough to preserve the unified repository. The work ahead is architectural clarification, not re-merger, separation, or runtime-platform construction.
