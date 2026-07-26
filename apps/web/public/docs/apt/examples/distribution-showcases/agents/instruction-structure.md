---
title: "Agent Instruction Structure"
kind: "example"
domain: "distribution-showcases"
status: "active"
owner: "APT"
last_updated: "2026-06-28"
source_paths: ["apt-agent-standards/showcases/agents/instruction-structure.md"]
---

# Agent Instruction Structure

## Principle

Agent instructions should tell tools what to read, what rules to honor, when source reads are required, and what output shape to return.

## Use When

Use this pattern for `AGENTS.md`, Codex skills, Claude agents, Copilot prompts, and reusable repo-alignment prompts.

## Avoid When

Avoid embedding project-specific backlog items or local preferences in managed standards files.

## Bad Example

```text
Be helpful and follow best practices.
```

## Better Example

```text
Read README.md, AGENTS.md, docs/project-context.md, package scripts, and relevant source files.
Return findings first with evidence, then assumptions, validation commands, and next steps.
Do not claim APT compliance without checking the relevant checklist.
```

## Implementation Notes

Keep managed instructions reusable. Put target-specific notes in `docs/project-context.md` or `.apt/installation.json/local-overrides.md`.

## Related Packs

Use `checklists/agent-checklist.md`, `standards/AGENTS.md`, and `docs/AI-TOOL-LAYOUT.md`.
