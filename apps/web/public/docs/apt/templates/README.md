---
title: Templates Index
version: v1
last_updated: 2026-05-31
owner: APT
status: stable
---

# Templates

This directory contains reusable starter files for APT-aligned projects.

Copy the relevant template into your project and customize it. Do not edit these templates to add project-specific content — keep them generic.

## Template Inventory

| Template | Use When |
|----------|---------|
| [AGENTS.md](AGENTS.md) | Setting up AI agent working rules for a new project |
| [ARCHITECTURE.md](ARCHITECTURE.md) | Documenting the architecture of a new project |
| [DESIGN.md](DESIGN.md) | Documenting the design standards and UX patterns for a project |
| [CONTRIBUTING.md](CONTRIBUTING.md) | Writing a contribution guide for a new repository |
| [README.md](README.md) | This file — explains the templates directory |
| [ADR-TEMPLATE.md](ADR-TEMPLATE.md) | Recording an architecture decision |
| [copilot-instructions.md](copilot-instructions.md) | Configuring GitHub Copilot instructions for a project |
| [apt-audit-report-template.md](apt-audit-report-template.md) | Running a full APT audit of a repository |
| [checklist-template.md](checklist-template.md) | Creating a new review checklist |
| [example-template.md](example-template.md) | Creating a new example document |
| [principle-doc-template.md](principle-doc-template.md) | Creating a new canonical principle document |
| [project-adoption-template.md](project-adoption-template.md) | Documenting how a project adopts APT |
| [prompt-template.md](prompt-template.md) | Creating a new AI review prompt |

## Adoption Modes

See `apt-principles.md` for the four project adoption modes:

- **Copy** — vendor selected templates into the project
- **Sync** — periodically refresh from `apt-principles`
- **Apply** — treat `apt-principles` as external source of truth
- **Showcase** — publish a project profile to the APT portfolio

## Template vs. Canonical Doc

Templates are starters. The canonical docs (`design.md`, `architecture.md`, etc.) are the source of truth for what each document must contain. When in doubt, check the canonical doc.
