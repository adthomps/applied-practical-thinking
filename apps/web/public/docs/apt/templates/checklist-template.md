---
title: {{TITLE}}
version: v1
last_updated: {{DATE}}
owner: APT
status: draft
---

# {{TITLE}}

## Scope

Describe when this checklist is used, who uses it, and which APT principle areas it protects. Name the artifact under review, such as a spec, design, API contract, prompt, release, support flow, or project adoption record.

Also state when this checklist is not enough and another review gate is required.

## Required Checks

- [ ] The artifact has a clear owner, audience, and intended outcome.
- [ ] The relevant canonical APT docs are linked or named.
- [ ] Required inputs, constraints, assumptions, and non-goals are visible.
- [ ] The artifact uses approved patterns, contracts, and references.
- [ ] User, system, security, support, and release impacts are considered where applicable.
- [ ] Evidence is available for every claim that affects implementation or promotion.
- [ ] Open risks are either resolved or explicitly accepted with a decision record.

## Failure Conditions

List conditions that block approval. These should be concrete enough that two reviewers would reach the same result.

Typical failures:

- Missing owner, scope, success criteria, or required evidence.
- Hidden assumptions that change implementation risk.
- Broken links to canonical docs, examples, prompts, or references.
- Security, privacy, auth, release, or support implications left unreviewed.
- Local project guidance contradicts canonical APT doctrine without a decision record.

## Evidence Required

Name the artifacts that prove the checklist passed.

- Reviewed source artifact.
- Links to relevant APT doctrine and build-kit assets.
- Validation output, screenshots, logs, schema checks, or review notes where applicable.
- Decision records for exceptions.
- Owner sign-off or approval notes for high-risk changes.

## Related Documents

- `../apt-principles.md`
- `../templates/example-template.md`
- `../templates/prompt-template.md`
