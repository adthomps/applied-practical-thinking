---
title: "APT Core"
kind: "standard"
domain: "installable-summaries"
status: "active"
owner: "APT"
last_updated: "2026-06-28"
source_paths: ["apt-agent-standards/apt-core/APT.md"]
---

# APT Core

APT Core is the baseline operating system for AI-assisted project work.

## Principles

- Preserve working behavior before improving structure.
- Make intent visible in code, docs, tests, and decisions.
- Prefer small, reviewable changes with clear rollback paths.
- Treat AI output as a draft until it is inspected and grounded in the repo.
- Keep local project context close to the code.

## Default Review Questions

- What user or maintainer outcome does this change improve?
- What behavior must not change?
- What assumptions did the agent make?
- What evidence verifies the result?
- What needs to be documented for future contributors?
