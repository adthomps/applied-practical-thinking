---
title: Update APT Agent Standards Prompt
version: v1
last_updated: 2026-06-22
owner: APT
status: draft
kind: "prompt"
domain: "update-agent-standards"
source_paths: ["apt-principles/prompts/update-agent-standards.md"]
---

# Update APT Agent Standards Prompt

## Purpose

Use this prompt to update agent instructions, skills, prompts, and repo operating rules while preserving the ownership split between `apt-principles-agents` and `apt-principles-agents`. It supports agent guidance quality, AI readiness, and cross-tool consistency without turning this doctrine repo into the installer.

## Input Expectations

Provide the repository being updated, existing agent files, applicable APT agent pack, current managed standards status, target tools, risk level, validation commands, and whether the change affects destructive actions, secrets, production deploys, security-sensitive work, or public claims.

## Prompt

```text
Update agent standards guidance for this repository.

Canonical APT sources:
- apt-principles-agents/ai-agent-framework.md
- apt-principles-agents/AGENTS.md
- apt-principles-agents/context-packs/apt-agent-pack.md
- apt-principles-agents/checklists/ai-agent-review-checklist.md
- apt-principles-agents/references/agent-standards-contract.json

Target repository:
- Path:
- Existing agent files:
- Managed standards status:
- Target tools:
- Known local project context:
- Risk level:
- Validation commands:

Instructions:
1. Read existing agent files and local project context before editing.
2. Identify whether the change belongs in apt-principles-agents doctrine, apt-principles-agents distribution, or target-repo local context.
3. Update only the appropriate layer.
4. Preserve source-of-truth links, allowed tool boundaries, validation expectations, and approval points.
5. Do not claim AI readiness without running or citing the relevant checks.

Return:
1. Ownership classification.
2. Proposed changes by layer.
3. Files changed or patch plan.
4. Validation commands.
5. Residual risks and follow-up for apt-principles-agents when needed.
```

## Expected Output

- Clear classification of doctrine, distribution, and local-context responsibilities.
- Targeted changes or a patch plan.
- Source-of-truth links and prohibited shortcuts.
- Validation results or commands to run.
- Follow-up queue when distribution tooling must be updated outside this repo.

## Guardrails

- Do not merge installer scripts, profile detection, path mapping, or managed sync behavior into `apt-principles-agents`.
- Do not treat installed tool-native files as canonical doctrine when they should link back to APT sources.
- Do not weaken approval requirements for destructive actions, secrets, production deploys, or security-sensitive changes.
- Do not rely on compressed context for final agent-file edits.
- Do not claim readiness without checklist and validation evidence.

## Related Documents

- `../ai-agent-framework.md`
- `../AGENTS.md`
- `../context-packs/apt-agent-pack.md`
- `../checklists/ai-agent-review-checklist.md`
- `../references/agent-standards-contract.json`
