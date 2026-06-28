---
title: "Apply APT Principles Prompt"
kind: "prompt"
domain: "distribution"
status: "active"
owner: "APT"
last_updated: "2026-06-28"
source_paths: ["apt-agent-standards/prompts/apply-apt-principles.md"]
---

# Apply APT Principles Prompt

Apply specific APT standards to a target repo.

## Instructions

1. Name the requested APT principle, standard, profile, checklist, or showcase.
2. Read the target repo files needed to verify current behavior.
3. Produce a patch plan before editing.
4. Preserve existing behavior unless a change is explicitly requested.
5. Edit only the files required for the selected standard.
6. Run focused validation commands.
7. Update docs if setup, behavior, architecture, API contracts, or workflows changed.

## Safety Rules

- Use compressed context only for discovery and planning.
- Read exact source before final edits.
- Treat security, compliance, payments, health data, and auth as full-source-read workflows.

## Output

Return summary, files changed, validation, and remaining risks.
