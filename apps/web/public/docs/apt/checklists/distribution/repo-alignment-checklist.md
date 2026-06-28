---
title: "Repo Alignment Checklist"
kind: "checklist"
domain: "distribution"
status: "active"
owner: "APT"
last_updated: "2026-06-28"
source_paths: ["apt-agent-standards/checklists/repo-alignment-checklist.md"]
---

# Repo Alignment Checklist

Use this checklist when reviewing another repo against APT agent standards.

## Required Checks

- Identify the repo type from files, scripts, runtime config, docs, and deployment settings.
- Read `README.md`, `AGENTS.md` if present, package or build scripts, and project docs.
- Check `docs/project-context.md` if standards are installed.
- Identify installed profiles from `.apt/installation.json` or `.apt/installation.json/manifest.json`.
- Select relevant APT profiles, context packs, showcases, and domain checklists.
- Compare actual files against the selected checklists.
- Separate required fixes from recommended improvements.
- Document evidence for every compliance claim.

## Mandatory

- Preserve working behavior unless an explicit change requests otherwise.
- Do not claim APT compliance without checklist-backed evidence.
- Do not treat compressed context as sufficient for security, compliance, payments, final validation, or exact code edits.

## Recommended

- Start with a dry-run install or scan when onboarding.
- Use context packs to reduce repeated reading during planning.
- Create a short improvement backlog after the review.

## Output

Return:

- repo type
- selected APT packs and profiles
- required checks performed
- mandatory gaps
- recommended improvements
- evidence and file references
- validation commands
- next safe change
