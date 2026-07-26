---
title: "Documentation Checklist"
kind: "checklist"
domain: "distribution"
status: "active"
owner: "APT"
last_updated: "2026-06-28"
source_paths: ["apt-agent-standards/checklists/documentation-checklist.md"]
---

# Documentation Checklist

Use this checklist for docs sites, README updates, setup guides, and project documentation.

## Required Checks

- README explains repo purpose, setup, common commands, and where deeper docs live.
- Setup instructions match current scripts, package manager, environment variables, and deployment flow.
- Architecture docs describe current structure without pretending planned work is already done.
- API, UI, security, and deployment docs link to source-backed details.
- `docs/project-context.md` is preserved and project-specific when standards are installed.
- Stale or duplicated docs are consolidated or clearly marked.

## Mandatory

- Do not invent behavior, commands, or integrations.
- Update docs when setup, install, sync, detection, profile, validation, or operating behavior changes.
- Keep canonical doctrine in `apt-principles-agents`; this repo may distribute summaries and operational guidance.

## Recommended

- Prefer short operational docs over long theory.
- Include examples only when they are stable enough to reuse.
- Keep checklists close to recurring review workflows.
