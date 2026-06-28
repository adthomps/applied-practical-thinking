---
title: Agent Instruction Structure Showcase
version: v1
last_updated: 2026-06-22
owner: APT
status: draft
kind: "example"
domain: "showcases"
source_paths: ["apt-principles/examples/showcases/agent-instruction-structure.md"]
---

# Agent Instruction Structure

## Context

Use this showcase for `AGENTS.md`, tool-native instruction files, scoped agents, reusable prompts, and AI readiness work in target repositories.

## Principle

APT AI guidance says agents follow the system. Instructions should identify source-of-truth docs, allowed scope, validation requirements, approval points, and prohibited shortcuts before asking agents to edit.

## Use When

- A repo needs practical agent guidance.
- Agent instructions have drifted from canonical APT doctrine.
- A target repo may adopt managed standards from `apt-principles-agents`.

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
Read README.md, AGENTS.md, and docs/project-context.md first. Use canonical APT docs as source of truth. Do not claim compliance without checklist evidence. Ask for approval before destructive, production, secret, or security-sensitive changes.
```

The instruction names source order, boundaries, and approval requirements.

## Solution

Structure agent instructions around read order, source-of-truth hierarchy, allowed tools, prohibited shortcuts, exact-read requirements, validation commands, output format, and escalation points.

## Implementation Notes

If the repo uses managed standards, update the distribution source rather than hand-editing generated files. Keep local project context separate from reusable doctrine.

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
