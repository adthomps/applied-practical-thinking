---
title: APT Standards Index
version: v1
last_updated: 2026-05-31
owner: APT
status: stable
---

# APT Standards

This directory contains domain-specific standards that extend the canonical principle docs with enforceable rules per technical area.

## Structure

| Domain | File | Canonical Source |
|--------|------|----------------|
| API | [api/api-standards.md](api/api-standards.md) | `system-standards.md` |
| Coding | [coding/coding-standards.md](coding/coding-standards.md) | `system-standards.md`, `execution.md` |
| Data | [data/data-standards.md](data/data-standards.md) | `system-standards.md` |
| Documentation | [documentation/documentation-standards.md](documentation/documentation-standards.md) | `system-standards.md`, `knowledge-system.md` |
| Observability | [observability/observability-standards.md](observability/observability-standards.md) | `operations-support.md`, `architecture.md` |
| Testing | [testing/testing-standards.md](testing/testing-standards.md) | `quality-testing.md` |

## Relationship to Canonical Docs

These standards are specific, enforceable rule sets. The canonical docs (`system-standards.md`, `quality-testing.md`, etc.) contain the principles and reasoning. Standards files contain the rules in their most actionable form.

When a standard conflicts with a canonical doc, the canonical doc takes precedence.
