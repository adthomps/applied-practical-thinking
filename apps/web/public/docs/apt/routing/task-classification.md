---
title: "Task Classification"
kind: "routing"
domain: "ai"
status: "active"
owner: "APT"
last_updated: "2026-06-28"
source_paths: ["apt-agent-standards/routing/task-classification.md"]
---

# Task Classification

## Task Types

| Type | Primary route | Notes |
| --- | --- | --- |
| `classify` | `apt-router` | Local-first. |
| `plan` | relevant architect/reviewer | Human review before edits. |
| `review` | specialist reviewer | Findings first. |
| `implement` | specialist skill or builder | Requires validation. |
| `verify` | `apt-verifier` | Checks outputs and commands. |
| `install` | `apt-installer` | Dry-run first. |
| `scan` | `apt-repo-scanner` | Read-only except reports. |
| `repair` | `apt-repair-agent` | Report-only or dry-run by default. |
| `sync` | lifecycle sync | Managed files only. |
| `route` | `apt-model-router` | Advisory model selection. |

## Risk Flags

Add risk flags when the task includes:

- security, secrets, auth, payment, health, privacy, deployment, destructive operations
- generated code migration
- cross-repo changes
- profile or manifest changes
- model routing, paid API use, or MCP permissions

Risk flags increase verification and approval requirements.
