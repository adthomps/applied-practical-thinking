---
title: "Agent Checklist"
kind: "checklist"
domain: "distribution"
status: "active"
owner: "APT"
last_updated: "2026-06-28"
source_paths: ["apt-agent-standards/checklists/agent-checklist.md"]
---

# Agent Checklist

Use this checklist when creating or updating agent instructions, skills, prompts, profiles, or installed standards.

## Required Checks

- Root `AGENTS.md` gives practical read order and source-of-truth rules.
- Tool-specific files are installed in the correct target-native paths.
- Codex skills, Claude agents, and Copilot prompts do not contradict each other.
- Profile manifests include only files that should be managed by install and sync.
- Generated files contain useful starter guidance and are not empty placeholders.
- Local project context remains in `docs/project-context.md` or `.apt/installation.json/local-overrides.md`.

## Mandatory

- Installer must always include `apt-core`.
- Sync must update only managed files.
- Do not overwrite target files unless `--force` is passed.
- Keep recurring operating docs current when install, sync, detection, release, recovery, profile, or path behavior changes.

## Recommended

- Keep prompts short and reusable.
- Keep profiles composable as capabilities.
- Run parity checks after adding or renaming skills or prompts.
