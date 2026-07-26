---
title: Refactor Duplication And Conflicts
kind: assessment
domain: architecture
status: active
owner: APT
last_updated: 2026-07-11
source_paths: ["apt-principles-agents/docs/refactor/duplication-and-conflicts.md"]
---

# Duplication And Conflicts

## Conflict Principles

The assessment treats duplicate-looking content as evidence, not as automatic waste. Content should be deleted only when it is confirmed to be unreferenced, uninstalled, untested, historically unnecessary, and not needed for compatibility.

## Classified Findings

| Finding | Class | Evidence | Current impact | Recommended action | Migration risk | Blocks first pilot |
| --- | --- | --- | --- | --- | --- | --- |
| Old root doctrine filenames remain in active text. | Rename | Active docs, prompts, checklists, examples, and platform files name `apt-principles-agents.md`, `thinking.md`, `system-standards.md`, `quality-testing.md`, and similar former roots. | Readers may look for missing root files or treat old names as current paths. | Build a stale-reference map and update only references that are not preserved provenance or compatibility examples. | Medium because examples and templates may intentionally teach downstream layouts. | No. |
| Quick references and installable summaries overlap canonical principles and standards. | Consolidate | `principles/quick-reference/` and `standards/installable-summaries/` summarize doctrine. | Can look like competing doctrine if status is not obvious. | Keep as derived compact views with source links and refresh expectations. | Low. | No. |
| Root instruction files overlap platform/shared-source adapters. | Generate | `AGENTS.md`, `CLAUDE.md`, `CODEX.md`, `GEMINI.md`, `platforms/shared-source/*`, and platform-specific files all contain tool guidance. | Drift risk and unclear canonical instruction source. | Keep root files during transition; later generate shared core and keep thin tool-specific extensions. | Medium. | No. |
| Canonical `agents/` overlap platform-specific agent files. | Generate | `agents/` contains 75 active agent files by validation; `platforms/claude/source/agents` and `platforms/github-copilot/source/agents` contain tool-native agents. | Role behavior can diverge by tool. | Define canonical agent schema and adapter generation before moving or deleting platform agents. | Medium to high if tool-native capabilities differ. | No. |
| Canonical `skills/` overlap platform-specific skill files. | Generate | `skills/` has 142 validated skills; `platforms/codex/source/skills` and Copilot source skills exist. | Similar procedures may diverge. | Treat `skills/` as canonical where equivalent; classify tool-only skills separately. | Medium. | No. |
| `prompts/` includes workflow-like assets. | Move | `prompts/planning/*`, `prompts/distribution/*`, and review prompts coordinate multi-step work. | Skill vs workflow vs prompt boundary is unclear. | Leave in place now; classify candidate workflows in pilot. | Low if documented first. | No. |
| `examples/workflows/` contains workflows but no top-level `workflows/`. | Move | Existing workflow examples include spec-to-story, preview-to-prod, repository-drift-repair, release record. | Workflows are examples, not canonical runnable definitions. | Define future workflow contract, then promote selected examples only after approval. | Medium. | No. |
| `references/` includes schema-like and reference-like content. | Requires human decision | `installation.schema.json` and `project-profile.schema.json` sit with contracts and token/design refs; no confirmed script consumer was found for `installation.schema.json`. | Future validators may not know where schemas belong, and schema-like files can drift from actual script behavior. | Keep stable paths; introduce `schemas/` only after approved triggers are met. | Medium due possible consumer paths and compatibility. | No. |
| `platforms/github-copilot/source` and `platforms/github-copilot/distribution` overlap. | Consolidate | Both source and distribution instruction/prompt surfaces exist. | It is unclear which should be hand-edited. | Document source as editable and distribution as generated or packaged output, then validate generated markers. | Medium. | No. |
| Historical scripts and old manifests exist under archive. | Keep | `docs/archive/legacy-agent-distribution` and `docs/archive/consolidation` preserve old scripts and docs. | Could be misread by agents if loaded indiscriminately. | Keep archived, excluded from active context unless provenance is needed. | Low. | No. |
| Legacy names appear in compatibility code. | Keep | `apt-assets.mjs` aliases `apt-core` to `core`; `agent-standards-contract.json` lists retired interfaces. | Supports migration from old consumers. | Keep until consumer audit shows safe removal. | Medium if removed prematurely. | No. |
| `platforms/` vs proposed `adapters/` naming. | Requires human decision | Current active adapter home is `platforms/`; request evaluates future `adapters/`. | Naming can create two adapter homes. | Do not create `adapters/` now; decide whether `platforms/` remains adapter home or `adapters/` becomes generator source later. | Medium if both exist without boundary. | No. |

## Files That Do Not Fit Cleanly

These are not errors, but they need future classification:

- `references/installation.schema.json`: schema by responsibility, currently under references by path stability.
- `references/project-profile.schema.json`: schema for a legacy-adjacent concept with known script consumers.
- `standards/installable-summaries/*`: standard summaries or derived adapter content depending on consumer.
- `examples/workflows/*`: workflow examples that may become canonical workflow definitions after review.
- `platforms/shared-source/*`: shared adapter source or canonical instruction snippets depending on future generation design.
- `platforms/github-copilot/distribution/*`: likely generated/distribution output, but currently committed without a full generator contract in this assessment.
- Root `AGENTS.md`: immediate operational instruction authority, but conceptually mixed between canonical policy and adapter-style runtime instruction.

No remaining first-class repository area is intentionally outside the expanded taxonomy. Some files still need classification by subtype and property, especially prompts that coordinate work, installable summaries, and schema-like references.

## Non-Deletion Rule

Do not delete any listed content in the first pilot. Many stale or duplicate-looking files are still validated, referenced, installed, preserved as provenance, or needed for compatibility. The safe first move is to document authority, taxonomy, generated-content controls, and adapter strategy.
