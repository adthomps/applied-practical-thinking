---
title: "Governance Architecture"
kind: "guide"
domain: "documentation"
status: "active"
owner: "APT"
last_updated: "2026-06-28"
source_paths: ["apt-agent-standards/docs/GOVERNANCE-ARCHITECTURE.md"]
---

# Governance Architecture

## Source Of Truth

`apt-principles-agents` owns canonical doctrine. This repo owns the installable harness, profiles, tool-native instructions, routing config, lifecycle scripts, manifests, reports, and compatibility checks.

## Human Approval Gates

Require explicit approval before:

- applying installs, repairs, or syncs outside dry-run mode
- overwriting existing target files
- running paid API calls
- deploying infrastructure
- deleting or moving files
- escalating security-sensitive work to implementation

## Verification Flow

1. `apt-router` creates a task packet.
2. `apt-model-router` selects the smallest sufficient model tier.
3. A specialist skill or agent produces the work or plan.
4. `apt-verifier` checks outputs against files, manifests, docs, and validation commands.
5. A human approves material changes.
6. Lifecycle scripts write reports for auditability.

## Lifecycle Governance

- Install defaults must preserve existing files unless `--force` is passed.
- Scan is read-only except report generation.
- Repair defaults to dry-run or report-only.
- Sync updates only managed files.
- `docs/project-context.md` and `.apt/installation.json/local-overrides.md` are local and preserved.
- Profile additions must update profile docs and post-operation checks.

## Release Governance

Before release:

- validate profile source references
- run AI tool parity checks
- validate model routing
- dry-run installs for representative profiles
- scan and repair temp fixtures
- update README, setup, operating, actions, layout, profile, rollout, and post-operation docs
