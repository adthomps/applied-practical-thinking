---
title: APT Project Adoption Checklist
version: v1
last_updated: 2026-04-24
owner: APT
status: draft
---

# APT Project Adoption Checklist

## Scope

Use this checklist when applying `apt-principles` to a current or future APT project. It verifies that the project has a local adoption layer, clear principle coverage, validation evidence, and a reusable project profile for portfolio or learning use.

## Required Checks

- [ ] The project names its APT adoption mode: copy, sync, apply, or showcase.
- [ ] Local docs identify canonical `apt-principles` as the source of doctrine.
- [ ] Project-specific exceptions are documented as decisions instead of edits to copied doctrine.
- [ ] The project has a profile covering purpose, audience, principles demonstrated, maturity, and learning value.
- [ ] Validation commands and report paths are documented.
- [ ] Any vendored references identify their source version and refresh process.
- [ ] Public showcase text is accurate for real project status and does not describe prototypes as production.

## Failure Conditions

- The project forks APT doctrine without a local decision record.
- The project has no way to tell which APT principles it applies.
- Public portfolio material presents a concept as a real implementation.
- Validation reports are missing, stale, or disconnected from local changes.
- Copied references drift without a sync or review process.

## Evidence Required

- `docs/apt/adoption.md` or equivalent.
- `docs/apt/project-profile.md` or schema-compatible profile data.
- Decision records for local deviations.
- Latest validation report or command output.
- Links to canonical `apt-principles` sources used by the project.

## Related Documents

- `../apt-principles.md`
- `../templates/project-adoption-template.md`
- `../examples/projects/apt-project-profile-example.md`
- `../references/project-profile.schema.json`
