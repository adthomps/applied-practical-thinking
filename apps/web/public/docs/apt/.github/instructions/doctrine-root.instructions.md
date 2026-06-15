---
description: "Use when editing canonical APT doctrine markdown files at repo root. Applies to doctrine-only updates, terminology alignment, and principle-level guidance changes."
applyTo: "{apt-principles.md,thinking.md,design.md,architecture.md,system-standards.md,security.md,execution.md,quality-testing.md,release-change-management.md,operations-support.md,knowledge-system.md,ai-agent-framework.md}"
---
# Doctrine Root File Instructions

## Goal
Keep root doctrine files canonical, concise, and internally consistent.

## Required Behavior
- Preserve frontmatter keys and style used by existing doctrine docs.
- Keep section structure aligned with validator expectations.
- Link to build-kit assets instead of duplicating detailed implementation guidance.
- Keep terminology synchronized with related docs in `checklists/`, `prompts/`, and `references/`.

## Do Not
- Do not add project-specific implementation details that belong in downstream repos.
- Do not convert examples into doctrine.
- Do not introduce new canonical terms without updating related artifacts.

## Before Finishing
- Validate changed doctrine paths and terminology consistency.
- Run `npm run validate` when possible.
- If doctrine intent changed, call out required follow-up in checklists/prompts/references.
