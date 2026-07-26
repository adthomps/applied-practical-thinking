---
title: "APT Principles"
kind: "standard"
domain: "installable-summaries"
status: "active"
owner: "APT"
last_updated: "2026-06-28"
source_paths: ["apt-agent-standards/apt-core/principles.md"]
---

# APT Principles

## Preserve Behavior

Stabilize the current system before reshaping it. When behavior is unclear, characterize it with tests or documented observations before editing.

## Capability Profiles

Profiles add capabilities such as Cloudflare modernization, documentation governance, or API review. They are not repo types, and multiple profiles may be installed together.

## Human-Grounded Automation

Agent output should make review easier, not replace review. The best generated work states assumptions, evidence, and unresolved risks.

## Local Context First

Each project should maintain `docs/project-context.md` with product purpose, architecture, constraints, deployment notes, and active standards.
