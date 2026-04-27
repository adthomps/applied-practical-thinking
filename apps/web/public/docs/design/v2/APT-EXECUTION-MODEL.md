---
docId: execution-model
slug: execution
major: 2
semanticVersion: 2.0.0
status: candidate
publishedAt: 2026-04-18
title: APT Execution Model
---

# APT Execution Model (Build)

Public companion summary for execution behavior in the APT site/design docs. Canonical execution doctrine lives in `apt-principles/execution.md` and is published into this site at `/docs/apt/execution.md`.

## Focus

- Turn specs into working systems
- Development workflow and delivery cadence
- Automation and build hygiene

## Principles

- Spec-driven development
- Small, testable increments
- Preview-first workflow
- Automate repeatable steps

## Outputs

- Build scripts and CI workflows
- Task definitions and tickets
- Release artifacts and deployment records

This is a draft candidate for the Execution area. Link back to the canonical Principles Framework for lifecycle context.

## Recommended Practices

- Keep specs as small, reviewable artifacts (one feature = one spec)
- Use pull-request + preview deployment as the primary feedback loop
- Automate checklists: lint, types, unit tests, build, preview smoke tests
- Make CI results actionable (links to failing tests, reproduction steps)

## Example Playbook

1. Create spec in `apps/web/docs/` and link related design/arch docs
2. Open a feature branch and implement in small increments
3. Attach preview link and run the review checklist
4. Merge only after validation pipeline passes and reviewer sign-off

## Checklist

- [ ] Spec exists and is linked from the PR
- [ ] Unit tests added for new logic
- [ ] Preview deployment URL available
- [ ] CI green (lint, types, tests, build)
- [ ] Release notes / changelog entry prepared

## Responsibilities

- Authors: write spec, code, and tests
- Reviewers: verify spec -> implementation congruence
- CI / DevOps: maintain reliable preview and build pipelines

