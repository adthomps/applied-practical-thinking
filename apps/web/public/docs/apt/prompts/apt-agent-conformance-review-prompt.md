---
title: APT Agent Conformance Review Prompt
version: v1
last_updated: 2026-06-21
owner: APT
status: draft
kind: "prompt"
domain: "apt-agent-conformance-review-prompt"
source_paths: ["apt-principles/prompts/apt-agent-conformance-review-prompt.md"]
---

# APT Agent Conformance Review Prompt

## Purpose

Review an APT Agent or `apt-principles-agents` implementation against canonical APT Principles without copying implementation catalogs into `apt-principles-agents`. Use this when harness agents, routing docs, context packs, manifests, lifecycle scripts, or tool-native distribution files change.

## Input Expectations

- Implementation repository and change summary.
- Links or paths for harness architecture, agent catalog, skill catalog, prompt catalog, routing docs, context packs, manifests, and lifecycle scripts.
- Validation or dry-run outputs.
- Known local model, platform, or profile constraints.
- Any proposed changes to `apt-principles-agents` doctrine, standards, prompts, examples, or references.

## Prompt

```text
Review this APT Agent implementation against APT Principles.

Canonical doctrine and standards:
- ai-agent-framework.md
- standards/ai/agent-harness-standard.md
- standards/ai/ai-orchestration-standard.md
- standards/ai/model-routing-standard.md
- standards/ai/token-efficiency-standard.md
- standards/ai/verification-standard.md
- standards/ai/local-first-ai-standard.md
- standards/ai/security-harness-standard.md
- standards/ai/repository-lifecycle-standard.md
- references/agent-standards-contract.json
- references/ai-harness-contract.json

Implementation evidence to inspect:
- harness architecture
- agent, skill, and prompt catalogs
- routing docs and model registry
- context packs and token-budget guidance
- source and installed manifests
- install, scan, repair, sync, and validation scripts
- generated reports or dry-run output

Return:
1. Current-state summary.
2. Standards-to-implementation crosswalk.
3. Gaps where implementation lacks evidence for a standard.
4. Places where implementation appears to duplicate or redefine doctrine.
5. Boundary violations, if any, between apt-principles-agents, apt-principles-agents, and target repositories.
6. Required validation or dry-run checks.
7. Recommended smallest corrective changes.
8. Residual risks and human approval needs.
```

## Expected Output

The output should include a compact table with columns for implementation layer, implementation artifact, APT Principles standard, validation evidence, owning repository, and boundary notes. Findings should be ordered by severity and should cite specific files or docs.

## Guardrails

- Do not copy agent catalogs, routing matrices, manifests, or scripts into `apt-principles-agents`.
- Do not treat model names in implementation files as APT doctrine.
- Do not recommend moving installer, sync, scan, repair, profile detection, or tool-native mapping behavior into `apt-principles-agents`.
- Do not approve implementation changes that overwrite target-owned project context or local overrides.
- Treat missing dry-run output, validation reports, or approval records as missing evidence.

## Related Documents

- `../ai-agent-framework.md`
- `../standards/ai/agent-harness-standard.md`
- `../standards/ai/model-routing-standard.md`
- `../standards/ai/repository-lifecycle-standard.md`
- `../examples/ai-agent/apt-principles-agents-crosswalk-example.md`
- `../references/ai-harness-contract.json`
- `../references/agent-standards-contract.json`
