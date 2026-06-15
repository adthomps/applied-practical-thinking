---
title: APT Repository Review Process
version: v1
last_updated: 2026-05-31
owner: APT
status: draft
---

# APT Repository Review Process

## Purpose

The repository review process provides a structured, recurring assessment of how well a project follows APT principles. It creates accountability for framework adoption and generates findings that improve the project and the framework itself.

## Review Cadence

| Review Type | Trigger | Cadence |
|-------------|---------|---------|
| Self-review | Developer-initiated | Anytime |
| Peer review | Pre-merge for major changes | Per major release |
| Quarterly review | Scheduled | Every 3 months |
| Pre-launch review | Before first production release | Once per service |

## Participants

| Role | Responsibility |
|------|---------------|
| Repository owner | Completes scorecard, provides evidence |
| APT reviewer | Validates findings, signs off |
| Stakeholder (optional) | Reviews governance and risk findings |

## Review Steps

### 1. Prepare

- Run `npm run validate` and save output to `reports/`.
- Run `npm run sweep:project-profiles` if reviewing a workspace.
- Pull the latest `governance/scorecard.md` template.

### 2. Score

- Score each dimension 0–4 using the `governance/maturity-model.md` rubric.
- Use evidence (validation output, file inventory, ADR count) to justify scores.
- Do not score by intent — score by what exists.

### 3. Identify Gaps

- List missing or low-quality artifacts.
- Flag blockers (anything that prevents a production release or breaks APT structural contracts).
- Note drift: places where the repo has diverged from the last review.

### 4. Remediate

- Create issues or tasks for each gap.
- Assign owners and target dates.
- Prioritize blockers over improvements.

### 5. Record

- Save the completed scorecard to `reports/` with date suffix (e.g., `reports/scorecard-2026-Q2.md`).
- Update the project profile if the repo is part of the APT portfolio.
- Record any framework-level findings as feedback to `apt-principles`.

## Pass Criteria

A repository passes a quarterly review at Level 3 or above if:

- All required files are present and non-empty.
- Validation passes with zero critical errors.
- No dimension scores 0 or 1.
- All previous blockers have been resolved.

## Escalation

If a blocker cannot be resolved within one review cycle, it must be:

- Documented as a known risk with a timeline.
- Approved by the repository owner and an APT reviewer.
- Tracked until resolved.

## Related Docs

- `governance/maturity-model.md` — level definitions
- `governance/scorecard.md` — scoring template
- `governance/service-readiness-review.md` — pre-launch checklist
- `scripts/validate-apt-principles.mjs` — automated validation
