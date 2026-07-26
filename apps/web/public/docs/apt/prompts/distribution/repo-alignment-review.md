---
title: "Repo Alignment Review Prompt"
kind: "prompt"
domain: "distribution"
status: "active"
owner: "APT"
last_updated: "2026-06-28"
source_paths: ["apt-agent-standards/prompts/repo-alignment-review.md"]
---

# Repo Alignment Review Prompt

Review a target repo for APT alignment.

## Instructions

1. Read `README.md`, `AGENTS.md` if present, package scripts, major docs, and project context if present.
2. Identify the repo type from source files, scripts, runtime config, deployment files, and docs.
3. Select relevant APT profiles, context packs, showcases, and checklists.
4. Check the relevant files against the selected checklists.
5. Separate mandatory gaps from recommended improvements.
6. Do not claim APT compliance unless the relevant checklist was applied.

## Output

Return:

- repo type
- applicable APT packs and profiles
- required checks performed
- mandatory gaps
- recommended improvements
- examples or showcases to follow
- validation commands
- safe next change
