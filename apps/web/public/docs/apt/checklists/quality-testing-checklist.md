---
title: Quality & Testing Checklist
version: v1
last_updated: 2026-04-24
owner: APT
status: draft
---

# Quality & Testing Checklist

## Scope

Use this checklist for any change that needs validation evidence before release or handoff.

Apply it to code, docs, references, examples, prompts, and project adoption changes. The amount of testing should match risk: small docs changes need link and validation checks; behavior, auth, data, release, or public-facing changes need broader evidence.

## Required Checks

- [ ] Risk level is understood.
- [ ] Fast checks are identified first.
- [ ] Boundary or contract tests are included when contracts change.
- [ ] Critical user journeys are covered by appropriate validation.
- [ ] Preview or visual checks are planned for user-facing changes.
- [ ] Failure diagnostics are usable.
- [ ] Residual coverage gaps are documented.

## Failure Conditions

- Release evidence is only "works locally".
- Contract behavior changes without boundary validation.
- Critical journey validation is missing.
- Failures would be difficult to diagnose from available logs or artifacts.

## Evidence Required

- Ordered validation plan.
- Test or check results.
- Preview evidence when applicable.
- Known gaps and residual risk.
- Failed-check notes with resolution or explicit deferral.
- Reviewer notes for areas that cannot be automated.

## Pass Standard

A reviewer can see what was tested, what was not tested, why the selected checks are enough, and what risk remains. "Works locally" is not evidence unless the change is explicitly local-only and low risk.

## Related Documents

- `../quality-testing.md`
- `../examples/quality/validation-plan-example.md`
- `../prompts/testing-review-prompt.md`
