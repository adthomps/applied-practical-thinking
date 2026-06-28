---
title: "Migration Standards"
kind: "standard"
domain: "installable-summaries"
status: "active"
owner: "APT"
last_updated: "2026-06-28"
source_paths: ["apt-agent-standards/apt-core/migration-standards.md"]
---

# Migration Standards

Migrations should preserve working behavior while making architecture easier to understand.

## Process

1. Inspect the current structure.
2. Identify generated assumptions and implicit coupling.
3. Map current behavior to the target standard.
4. Write a migration plan before editing.
5. Move in small stages with validation after each stage.
