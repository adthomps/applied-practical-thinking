---
title: "Agent Harness Architecture"
kind: "guide"
domain: "documentation"
status: "active"
owner: "APT"
last_updated: "2026-06-28"
source_paths: ["apt-agent-standards/docs/HARNESS-ARCHITECTURE.md"]
---

# Agent Harness Architecture

This repository is the operational harness and distribution platform for APT agent standards. `apt-principles-agents` remains the canonical doctrine source for APT principles, review criteria, and reference material.

## Target Flow

```text
User Request
  -> apt-router
  -> Skill and Context Selection
  -> Task Packet Builder
  -> apt-model-router
  -> Specialist Agent or Skill
  -> apt-verifier
  -> Human Approval
  -> Implementation or Repair
```

## Harness Layers

| Layer | Repository area | Responsibility |
| --- | --- | --- |
| Agent roles | `agents/` and `claude/agents/` | Canonical harness roles and tool-native reviewer/architect agents. |
| Skills | `codex/skills/` and `skills/` | Repeatable procedures, including token-efficiency guidance. |
| Prompts | `github-copilot/prompts/` | Copilot-compatible entry points for skill-equivalent workflows. |
| Profiles | `profiles/` | Composable capability bundles. |
| Routing | `routing/` | Model tiers, task classification, token budgeting, and registry validation. |
| Context packs | `context/` | Small reusable context bundles loaded by task need. |
| Lifecycle tooling | `scripts/` | Install, scan, repair, sync, audit, and validation commands. |
| Manifests | `agent-repo.manifest.json` and `.apt/installation.json/manifest.json` | Source and target install state. |

## Task Packet Contract

Every routed task should name:

- goal and success criteria
- target repository or files
- selected profiles, skills, agents, and context packs
- Working Backwards package status, source artifact IDs, blockers, and deferred artifacts when available
- model tier recommendation
- token budget
- material-change approval gates
- validation commands or checks
- documentation updates required

## Approval Gates

Human approval is required before:

- writing to a target repo outside a dry run
- overwriting existing target files
- running paid API calls
- deploying or changing infrastructure
- deleting, moving, or bulk rewriting files
- repairing drifted managed files with local modifications

## Compatibility Model

Existing `.apt/installation.json` installs remain valid. New lifecycle scripts also create `.apt/installation.json/` metadata and reports so repositories can migrate gradually.
