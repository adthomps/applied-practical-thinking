---
title: Contributing to APT Principles
version: v1
last_updated: 2026-05-31
owner: APT
status: stable
---

# Contributing to APT Principles

This repository is the authoritative source for Applied Practical Thinking (APT) doctrine, build kit, and governance. Contributions are reviewed against APT standards before merging.

---

## Before You Start

Read these files:

- `AGENTS.md` — working rules for all contributors (human and AI)
- `apt-principles.md` — the full APT framework and lifecycle map
- `README.md` — repository structure and canonical file inventory

---

## What Can Be Contributed

| Type | Examples |
|------|---------|
| Principle doc updates | Improvements to `thinking.md`, `design.md`, `architecture.md`, etc. |
| New examples | New files in `examples/` following `templates/example-template.md` |
| New checklists | New files in `checklists/` following `templates/checklist-template.md` |
| New prompts | New files in `prompts/` following `templates/prompt-template.md` |
| Governance docs | Updates to `governance/` |
| Standards docs | Updates to `standards/` |
| Template improvements | Updates to `templates/` |
| Bug fixes | Broken links, incorrect references, outdated content |
| Agent definitions | New or updated files in `.github/agents/` |
| Skills | New or updated `SKILL.md` files in `.github/skills/` |
| Prompts (Copilot) | New or updated `.prompt.md` files in `.github/prompts/` |
| Claude commands | New or updated files in `.claude/commands/` |

---

## Contribution Rules

### 1. One canonical source per topic

Do not duplicate guidance. If a rule exists in `design.md`, reference it — do not restate it elsewhere with slightly different wording.

### 2. Update the full artifact chain

When doctrine changes, update the corresponding:
- Example (in `examples/`)
- Checklist (in `checklists/`)
- Prompt (in `prompts/`)
- Reference (in `references/`) if machine-readable

### 3. Use frontmatter

Every canonical doc and build-kit file must include:

```yaml
---
title: [Title]
version: v1
last_updated: YYYY-MM-DD
owner: APT
status: draft | stable | deprecated
---
```

### 4. Validate before submitting

```bash
npm run validate
npm run validate:ai
npm run sync:check
```

Fix all errors before opening a PR. `validate:ai` confirms AI configuration files are present and correctly structured. `sync:check` confirms shared skills are consistent across `.github/`, `.claude/`, and `.codex/`.

### 5. Keep PRs scoped

One principle update or one example per PR. Mixed concerns belong in separate PRs.

---

## Branch Naming

```
docs/short-description
feat/short-description
fix/short-description
```

---

## PR Requirements

PR description must include:

- **What:** one-sentence summary
- **Why:** the outcome this delivers or the problem it fixes
- **Validation:** confirm `npm run validate` passes

---

## Architecture Decision Records

Changes that alter the structure of this repository (folder layout, required files, validator logic) require an ADR using `templates/ADR-TEMPLATE.md` stored in `docs/decisions/`.

---

## Maintaining AI Configuration

### Adding or updating agents (`.github/agents/`)

Each agent file must use GitHub Copilot agent frontmatter:

```yaml
---
name: Agent Display Name
description: "When to invoke this agent and what it does."
tools: [read, search, edit]
user-invocable: true
---
```

Valid tool values: `read`, `search`, `edit`, `execute`, and the task-tracking tool. Add only tools the agent actually uses.

After adding or changing an agent:
1. Update the task routing table in `AGENTS.md`.
2. Run `npm run validate:ai` to confirm the file is recognized.

### Adding or updating skills

`.github/skills/` is the canonical source for all skills. Four skills are also mirrored in `.claude/skills/` and `.codex/skills/`. When updating a mirrored skill:

1. Update `.github/skills/<name>/SKILL.md` first.
2. Sync the change to `.claude/skills/<name>/SKILL.md` and `.codex/skills/<name>/SKILL.md`.
3. Run `npm run sync:check` to confirm no drift remains.

Mirrored skills are: `api-first-openapi-designer`, `cloudflare-hono-worker-builder`, `docs-kb-maintainer`, `testing-validation-runner`.

### Adding or updating Claude commands (`.claude/commands/`)

Commands are Claude Code CLI `/command` shortcuts. Keep them scoped to a single task. After adding a command, update `.claude/commands/README.md` if one exists.

---

## What Not to Change

- Do not rename canonical root files (`thinking.md`, `design.md`, etc.) without updating the validator, README, and all internal cross-references.
- Do not add project-specific content to this repository. This is a generic doctrine repo.
- Do not modify agent definitions in `.github/agents/` without understanding the impact on agent behavior across projects.
- Do not update a mirrored skill in only one namespace — sync all three copies and run `npm run sync:check`.

---

## Questions

If you are unsure whether a change fits APT doctrine, open a discussion before writing code or documentation.
