---
title: Refactor Cross-Agent Instruction Model
kind: assessment
domain: ai
status: active
owner: APT
last_updated: 2026-07-11
source_paths: ["apt-principles-agents/docs/refactor/cross-agent-instruction-model.md"]
---

# Cross-Agent Instruction Model

## Current Surfaces

| Surface | Current role | Assessment |
| --- | --- | --- |
| `AGENTS.md` | Immediate root operational instruction for this repository. | Keep during transition; mixed canonical summary and tool-facing instruction. |
| `CODEX.md` | Codex-specific guidance. | Thin adapter; can share generated core later. |
| `CLAUDE.md` | Claude-specific guidance. | Thin adapter; can share generated core later. |
| `GEMINI.md` | Gemini-specific guidance. | Thin adapter; includes Gemini command/config conventions. |
| `platforms/shared-source/*` | Shared source instruction templates. | Candidate canonical adapter source, not canonical doctrine. |
| `platforms/codex/source/skills/*` | Codex tool-native skills. | Some overlap canonical skills; classify before generation. |
| `platforms/claude/source/agents/*` | Claude-native agent files. | Tool-specific role presentation; should map to canonical agents where possible. |
| `platforms/gemini/*` | Gemini commands, config, styleguide. | Tool-specific mapping and context behavior. |
| `platforms/github-copilot/*` | Copilot source and distribution instructions, prompts, agents, skills. | Richest adapter area and highest drift risk. |
| `templates/AGENTS.md`, `templates/copilot-instructions.md` | Downstream instruction templates. | Templates, not active repo policy. |
| `prompts/` | Prompt library. | Some prompt files may become workflow definitions or adapter prompt outputs. |
| `agents/` | Canonical role definitions. | Source of role truth. |
| `skills/` | Canonical portable skill definitions. | Source of repeatable capability truth. |

## Adapter Content Classes

1. Shared generated core:
   - APT authority hierarchy.
   - Safety and validation requirements.
   - Source-reading rules.
   - Generated-content safety rules.
   - Asset taxonomy.
   - Skill and agent selection rules.

2. Tool-specific generated mapping:
   - Codex skill install paths and sandbox reminders.
   - Claude agent or command shape.
   - Gemini command/config mappings.
   - Copilot instruction, prompt, agent, and skill discovery paths.

3. Tool-specific handwritten extension:
   - Claude hooks, permission patterns, and project-specific execution conventions.
   - Codex sandbox, approval, and local command conventions.
   - Gemini context loading and extension behavior.
   - Copilot repository instruction and skill discovery constraints.
   - Any tool behavior that cannot be represented safely in shared schema.

## Canonical Sources

| Content | Canonical source |
| --- | --- |
| APT judgment and tradeoffs | `principles/` |
| Required practice | `standards/` |
| Agent role behavior | `agents/` |
| Bounded capabilities | `skills/` |
| Multi-stage workflows | Future `workflows/` after approval. |
| Runtime distribution mappings | `manifests/`, `scripts/apt-assets.mjs`, and installation schema. |
| Tool-specific extension | `platforms/<tool>/` source files. |

## What Can Be Generated

- Shared authority and read-order boilerplate.
- Role cards derived from canonical `agents/`.
- Skill entries derived from canonical `skills/`.
- Tool install mappings from manifests.
- Copilot distribution prompts/instructions from source prompt and instruction definitions.
- Thin root tool guidance that points back to canonical files.

## What Must Remain Tool-Specific

- Permission models, sandbox behavior, and command-execution constraints.
- Tool discovery mechanisms and file naming conventions.
- Tool-specific prompt frontmatter or metadata.
- Native command locations such as `.gemini/commands` or `.github/prompts`.
- Any hook, extension, or MCP configuration that is not portable.

## What Must Never Become Independent Doctrine

- Generated adapter files.
- Tool-specific prompt copies.
- Distribution output under `platforms/*/distribution`.
- Installed downstream `.codex`, `.claude`, `.github`, or `.gemini` files.
- generated wiki tooling summaries.
- OKF generated projections.

## Validation Strategy

Future adapter validation should check:

- Every generated adapter declares source files, source commit, generated status, and review status.
- Generated adapters do not contain policy absent from canonical sources.
- Handwritten extensions have a bounded tool-specific reason.
- Canonical agents and skills referenced by adapters exist.
- Distribution output is reproducible from source definitions.
- Root instructions remain thin and do not fork doctrine.

## Recommended Transition

Do not regenerate adapters in this phase. First approve the authority hierarchy and taxonomy, then pilot one vertical slice across all four target tools. The pilot should prove that shared generated core plus tool-specific extension is practical before any bulk adapter rewrite.
