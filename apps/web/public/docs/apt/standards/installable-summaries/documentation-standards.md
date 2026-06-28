---
title: "Documentation Standards"
kind: "standard"
domain: "installable-summaries"
status: "active"
owner: "APT"
last_updated: "2026-06-28"
source_paths: ["apt-agent-standards/apt-core/documentation-standards.md"]
---

# Documentation Standards

Documentation should explain decisions, workflows, and project-specific constraints.

## Required Project Context

Every installed repo should have `docs/project-context.md` covering:

- Product or repository purpose.
- Architecture and runtime model.
- Important dependencies and integrations.
- Testing and deployment commands.
- Installed APT profiles.
- Local conventions and known risks.

## Governance

Update docs when behavior, setup, deployment, API contracts, or user workflows change.
