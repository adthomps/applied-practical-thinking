---
title: {{PROJECT}} APT Adoption
version: v1
last_updated: {{DATE}}
owner: APT
status: draft
---

# {{PROJECT}} APT Adoption

## Purpose

Describe why this project applies APT and what outcomes the adoption should improve.

Include the project type, primary audience, current maturity, and which risk the adoption reduces, such as doctrine drift, inconsistent releases, weak AI prompts, unclear architecture, or missing public showcase context.

## Adoption Mode

Choose one primary mode:

- Copy: vendor selected APT docs, prompts, examples, checklists, and references into the project.
- Sync: periodically refresh local APT assets from `apt-principles`.
- Apply: reference canonical `apt-principles` while keeping local project implementation docs.
- Showcase: publish a project profile that can feed the public APT portfolio site.

## Principles Applied

List the APT principle areas this project actively uses.

For each selected principle, name the local artifact that proves adoption. Examples: architecture doc, design state map, API contract, validation report, support runbook, AI prompt contract, project profile, or decision record.

## Local Structure

Recommended structure:

```text
docs/apt/
  README.md
  adoption.md
  project-profile.md
  decisions/
  reports/
  references/
```

## Local Decisions

Record any project-specific decisions, exceptions, or extensions. Do not fork canonical doctrine without explaining why.

Each decision should include the date, owner, affected principle area, rationale, expected duration, and whether it should become a reusable improvement to `apt-principles`.

## Validation

List the validation command, review gates, and report paths used by the project.

Include both local checks and APT checks. If the project copies or syncs references, identify the source version and refresh cadence.

## Public Showcase

Describe whether this project should appear on the public Applied Practical Thinking site and what learning value it demonstrates.

Use the project profile schema when the project should feed the portfolio site. Do not describe concepts, prototypes, or experimental branches as production-ready unless release evidence supports that status.

## Related Documents

- `../README.md`
- `../apt-principles.md`
- `../references/project-profile.schema.json`
