---
title: APT Project Adoption Prompt
version: v1
last_updated: 2026-04-24
owner: APT
status: draft
---

# APT Project Adoption Prompt

## Purpose

Use this prompt to apply `apt-principles` to a real project without casually forking doctrine. The output should identify adoption mode, local docs, project-specific decisions, validation evidence, and public showcase readiness.

## Input Expectations

Provide the project name, repository structure, intended audience, current maturity, principle areas used, validation commands, and whether the project should appear on the Applied Practical Thinking public site.

## Prompt

```text
Review this project for APT adoption readiness.

Canonical source:
- apt-principles/

Project context:
- Project name:
- Purpose:
- Audience:
- Current maturity:
- Repository/docs structure:
- APT principle areas used:
- Validation commands:
- Public showcase intent:

Return:
1. Recommended adoption mode: copy, sync, apply, or showcase.
2. Required local docs and where they should live.
3. Project-specific decisions or exceptions that need records.
4. Missing checklists, prompts, examples, or references.
5. Project profile draft for public or internal reuse.
6. Validation and evidence required before promotion.
```

## Expected Output

- Adoption mode recommendation.
- Local APT docs structure.
- Principle coverage table.
- Project profile draft.
- Validation gaps and next actions.
- Public showcase readiness notes.

## Guardrails

- Do not rewrite canonical APT doctrine inside the project.
- Do not claim production maturity without evidence.
- Do not invent missing architecture, security, or AI usage.
- Keep local exceptions separate from reusable APT improvements.

## Related Documents

- `../apt-principles.md`
- `../checklists/project-adoption-checklist.md`
- `../templates/project-adoption-template.md`
- `../examples/projects/apt-project-profile-example.md`
