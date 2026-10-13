---
title: Agent Instruction Structure Showcase
version: v2
last_updated: 2026-08-16
owner: APT
status: active
kind: "example"
domain: "showcases"
source_paths: ["apt-principles/examples/showcases/agent-instruction-structure.md", "apt-agent-standards/showcases/agents/instruction-structure.md"]
---

# Agent Instruction Structure

## Context

Use this showcase for `AGENTS.md`, Codex skills, Claude agents, Copilot prompts, tool-native instruction files, scoped agents, reusable repo-alignment prompts, and AI readiness work in target repositories.

## Principle

APT AI guidance says agents follow the system. Instructions should identify source-of-truth docs, allowed scope, validation requirements, approval points, and prohibited shortcuts before asking agents to edit.

## Use When

- A repo needs practical agent guidance.
- Agent instructions have drifted from canonical APT doctrine.
- A target repo may adopt managed standards from `apt-principles-agents`.
- Multiple AI tools need the same authority, evidence, approval, and validation boundaries expressed through different adapters.

## Avoid When

- The task is installer behavior, path mapping, or profile detection that belongs in `apt-principles-agents`.
- The repo has no local project context to anchor agent decisions.
- Instructions would authorize destructive or sensitive actions without approval.

## Problem

Weak agent files often say "follow best practices" without naming sources, boundaries, or validation. Agents then invent standards, skip exact reads, or claim readiness from summaries.

## APT Principles Applied

- AI & Agent Framework: agent work is bounded by source, scope, tools, and evidence.
- Security: high-risk actions require approval.
- Quality & Testing: final claims need validation evidence.

## Bad Example

```text
Make the repo better. Use your judgment. Keep it clean.
```

The instruction is too broad to review and gives no source hierarchy.

## Better Example

```text
Read README.md, AGENTS.md, docs/project-context.md, package scripts, and relevant source files first. Use canonical APT docs as reusable doctrine and local project docs as product authority. Do not claim compliance without checklist evidence. Ask for approval before destructive, production, secret, or security-sensitive changes.

Return findings first with exact evidence, followed by assumptions, validation commands and results, unresolved risks, and next steps. Do not hide a blocking uncertainty inside a general summary.
```

The instruction names source order, authority, boundaries, output contract, evidence, and approval requirements.

## Solution

Structure agent instructions around purpose, read order, source-of-truth hierarchy, allowed scope and tools, prohibited shortcuts, exact-read requirements, approval gates, validation commands, evidence expectations, output format, and escalation points.

## Implementation Notes

If the repo uses managed standards, update the distribution source rather than hand-editing generated files. Keep reusable doctrine and adapter behavior separate from target-owned context, backlog items, product direction, and local preferences.

Preserve target-specific guidance in `docs/project-context.md` or `.apt/installation.json/local-overrides.md`. Agent instructions may constrain execution, but they must not silently expand authority or decide product direction that belongs to an accountable owner.

## Installed Distribution Assets

When the `ai-development` manifest is installed into a target repository, use these projections and local files as review entry points:

- `.apt/context-packs/apt-agent-pack.md`
- `.apt/checklists/ai-agent-review-checklist.md`
- root or tool-native instruction adapters generated from maintained platform sources
- `.apt/installation.json/local-overrides.md` for preserved target-owned exceptions

Use `checklists/distribution/agent-checklist.md`, `platforms/shared-source/AGENTS.md`, and `docs/platform-adapters.md` in this canonical repository when reviewing distribution behavior. Installed adapters are not the doctrine source.

## Related Packs

- [APT Agent Context Pack](../../context-packs/apt-agent-pack.md)
- [APT Security Context Pack](../../context-packs/apt-security-pack.md)

## Tradeoffs

Detailed agent instructions require maintenance, especially across tools. The benefit is safer delegation, more consistent reviews, and fewer hidden assumptions.

## Common Mistakes

- Treating installed tool-native files as canonical doctrine.
- Omitting validation commands or exact-read requirements.
- Letting agent guidance silently decide product direction.

## Related Documents

- `../../ai-agent-framework.md`
- `../../AGENTS.md`
- `../../checklists/ai-agent-review-checklist.md`
- `../../references/agent-standards-contract.json`
