---
title: "Update Agent Standards Prompt"
kind: "prompt"
domain: "distribution"
status: "active"
owner: "APT"
last_updated: "2026-06-28"
source_paths: ["apt-agent-standards/prompts/update-agent-standards.md"]
---

# Update Agent Standards Prompt

Update agent instructions, skills, prompts, profiles, or repo operating rules.

## Instructions

1. Read this repo's `README.md`, `AGENTS.md`, relevant docs, profile manifests, and affected source files.
2. Identify whether the change affects install behavior, sync behavior, profiles, path mapping, prompts, skills, agents, context packs, or docs.
3. Keep profiles composable and managed paths stable.
4. Update required operating docs when behavior changes.
5. Preserve `apt-principles-agents` as the canonical doctrine source.
6. Run parity, routing, profile detection, and dry-run checks as relevant.

## Output

Return summary, files changed, managed-path impact, validation commands, and follow-up recommendations.
