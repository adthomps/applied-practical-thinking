---
title: Apply APT Principles Prompt
version: v1
last_updated: 2026-06-22
owner: APT
status: draft
kind: "prompt"
domain: "apply-apt-principles"
source_paths: ["apt-principles/prompts/apply-apt-principles.md"]
---

# Apply APT Principles Prompt

## Purpose

Use this prompt when a project has chosen specific APT standards to apply and needs a patch plan before edits. It helps an agent move from repo alignment findings to bounded changes while preserving canonical doctrine and local project context.

The prompt supports implementation planning and safe remediation. It should produce edits only when the target repo scope, exact files, and validation expectations are clear.

## Input Expectations

Provide the target repo path, selected APT packs, relevant findings, exact files to change, non-goals, risk level, validation commands, and whether the work touches security, payments, auth, production, public docs, or managed agent standards.

## Prompt

```text
Apply selected APT principles to this target repository.

Canonical APT sources:
- apt-principles-agents/README.md
- apt-principles-agents/apt-principles-agents.md
- apt-principles-agents/context-packs/
- apt-principles-agents/checklists/
- apt-principles-agents/examples/
- apt-principles-agents/prompts/

Target repository:
- Path:
- Repo type:
- Selected APT packs:
- Findings to remediate:
- Files in scope:
- Files out of scope:
- Risk level:
- Validation commands:

Instructions:
1. Read the exact target files before proposing edits.
2. Identify which APT source governs each change.
3. Produce a patch plan grouped by behavior or artifact type.
4. Separate mandatory corrections from recommended cleanup.
5. If edits are safe, make only targeted changes.
6. Run or recommend validation based on available commands and risk.

Return:
1. Patch plan.
2. Files to change and reason.
3. APT sources used.
4. Validation plan.
5. Risks, assumptions, and approval needs.
6. Change summary after edits, if edits were made.
```

## Expected Output

- Decision-complete patch plan before implementation.
- File list with reason and governing APT source.
- Mandatory versus recommended changes.
- Validation commands and acceptance criteria.
- Changed-file summary and residual risk when edits are performed.

## Guardrails

- Do not move canonical doctrine files or replace the established `apt-principles-agents` taxonomy.
- Do not edit high-risk areas without exact source reads and an approval path.
- Do not rely on compressed context for final code edits, security claims, payment behavior, or compliance statements.
- Do not introduce installer or path-mapping behavior that belongs in `apt-principles-agents`.
- Keep changes minimal and synchronized across related docs, prompts, examples, checklists, and references.

## Related Documents

- `../AGENTS.md`
- `../context-packs/README.md`
- `../checklists/repo-alignment-checklist.md`
- `../prompts/repo-alignment-review.md`
- `../ai-agent-framework.md`
