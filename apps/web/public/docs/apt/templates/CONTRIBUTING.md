---
title: Contributing
version: v1
last_updated: {{DATE}}
owner: {{OWNER}}
status: draft
---

# Contributing

Thank you for contributing to this project. This guide covers how to propose changes, submit work, and meet the review standards expected by APT-aligned repositories.

---

## Before You Start

Read the following files before making any changes:

- `AGENTS.md` — working rules for all contributors (human and AI)
- `ARCHITECTURE.md` — how the system is structured and where things belong
- `DESIGN.md` — how the product should look and behave
- `CONTRIBUTING.md` (this file)

If you are using an AI coding assistant, these files are its operating instructions.

---

## Contribution Workflow

### 1. Frame the work

Every change should start with a clear problem statement. Do not open a PR for a feature that does not have a documented outcome.

- For bug fixes: describe the broken behavior and expected behavior.
- For features: describe the problem being solved, not just the solution.
- For refactors: describe what becomes simpler, safer, or clearer.

### 2. Create an issue or spec

For any non-trivial change, create an issue or spec before writing code. This gives reviewers context and prevents wasted work.

### 3. Branch

Create a branch from `main`. Use a descriptive name:

```
feat/short-description
fix/short-description
docs/short-description
refactor/short-description
```

### 4. Make changes

- Follow the patterns already established in the repository.
- Update docs, examples, and checklists when behavior changes.
- Keep PRs scoped to a coherent change.
- Do not mix feature work, refactoring, and documentation in one PR.

### 5. Validate

Run the validation script before opening a PR:

```
npm run validate
```

Fix any errors before submitting.

### 6. Open a PR

PR description must include:

- **What:** one-sentence summary of the change
- **Why:** the outcome this change delivers
- **How:** how it was implemented
- **Validation:** what was tested or validated

---

## Review Standards

All PRs are reviewed against APT principles. Reviewers check:

- Does the change follow the architecture and responsibility map?
- Are all affected states covered (loading, empty, success, error)?
- Is security handled correctly at boundaries?
- Are docs, examples, or checklists updated to reflect behavior changes?
- Does validation pass?

---

## What Not to Change

- Do not edit root canonical doctrine files (`apt-principles.md`, `thinking.md`, `design.md`, etc.) without understanding their downstream impact on checklists, prompts, examples, and references.
- Do not move files without updating all internal references and the validator.
- Do not add new AI agent instructions outside `AGENTS.md`, `.github/instructions/`, or `.github/agents/`.

---

## Architecture Decision Records

Changes that alter the API, auth model, data schema, repo structure, or deployment topology require an ADR.

Use `templates/ADR-TEMPLATE.md` and store the ADR in `docs/decisions/`.

---

## Questions

If you are unsure whether a change is in scope or whether it follows APT standards, open a discussion or draft PR before investing significant time.
