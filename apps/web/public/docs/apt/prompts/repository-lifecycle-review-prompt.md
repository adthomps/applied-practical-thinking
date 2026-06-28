---
title: Repository Lifecycle Review Prompt
version: v1
last_updated: 2026-06-21
owner: APT
status: draft
kind: "prompt"
domain: "repository-lifecycle-review-prompt"
source_paths: ["apt-principles/prompts/repository-lifecycle-review-prompt.md"]
---

# Repository Lifecycle Review Prompt

## Purpose

Review a repository's APT standards lifecycle posture across installation, scanning, drift detection, repair, synchronization, upgrades, and verification. Use this for repo audits, standards rollout planning, or APT Agent lifecycle scanner design.

## Input Expectations

- Target repository name and purpose.
- Current `README.md`, `AGENTS.md`, `.apt/installation.json`, and `docs/project-context.md` status when present.
- Installed AI tool surfaces such as `.github/`, `.claude/`, or `.codex/`.
- Relevant validation commands.
- Known drift, local exceptions, or profile recommendations.
- Whether the review is doctrine, distribution, or target-repo work.

## Prompt

```text
You are reviewing repository lifecycle governance using APT standards.

Canonical sources:
- ai-agent-framework.md
- knowledge-system.md
- standards/ai/repository-lifecycle-standard.md
- references/agent-standards-contract.json
- checklists/project-adoption-checklist.md

Review the target repository for:
1. Install: Are APT assets installed intentionally and through the right owner?
2. Scan: Are required docs, manifests, prompts, agents, and local context discoverable?
3. Drift detection: Is drift categorized as doctrine, distribution, or target-owned context?
4. Repair: Is the repair path clear and dry-run friendly?
5. Synchronization: Are managed files separated from local project context?
6. Upgrade: Are profile, tool-surface, and doctrine updates traceable?
7. Verify: Are validation commands and evidence recorded?
8. Ownership: Does `apt-principles-agents` remain doctrine/build-kit/reference only while `apt-principles-agents` owns installer and distribution behavior?

Return:
- Current-state summary.
- Drift and gap findings by severity.
- Ownership classification for each finding.
- Recommended repair or sync path.
- Validation commands and required evidence.
- APT Agent implementation guidance if lifecycle automation is proposed.
```

## Expected Output

The output should distinguish canonical doctrine gaps from installer/distribution gaps and target-repo local context gaps. It should include an implementation-neutral APT Agent blueprint note only when automation would help.

## Guardrails

- Do not recommend adding installer, profile detection, path mapping, or `.apt/installation.json` ownership to `apt-principles-agents`.
- Do not overwrite target-owned `docs/project-context.md`.
- Do not treat tool-native installed files as canonical doctrine.
- Do not run sync or repair without dry-run evidence when managed files are involved.
- Do not claim maturity without validation output.

## Related Documents

- `../ai-agent-framework.md`
- `../knowledge-system.md`
- `../standards/ai/repository-lifecycle-standard.md`
- `../checklists/project-adoption-checklist.md`
- `../examples/workflows/repository-drift-repair-flow.md`
- `../references/agent-standards-contract.json`
