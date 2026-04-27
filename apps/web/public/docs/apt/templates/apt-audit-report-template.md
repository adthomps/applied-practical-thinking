---
title: {{PROJECT_NAME}} APT Audit Report
version: v1
owner: APT
status: draft
audience: developer
visibility: internal
source: manual-or-generated
last_updated: {{DATE}}
canonical_source: ../../apt-principles
---

# {{PROJECT_NAME}} APT Audit Report

## Purpose

Use this report to summarize how a specific project, repository, or release candidate aligns with the canonical APT doctrine.

This report must not copy the full APT principles. It should link to the canonical source, summarize repo-specific evidence, and record the findings, risks, and remediation actions for the reviewed scope.

## Scope

- Review target: `{{REVIEW_TARGET}}`
- Review type: `{{REVIEW_TYPE}}`
- Audit window: `{{AUDIT_WINDOW}}`
- Reviewer: `{{REVIEWER}}`
- Canonical APT source: `{{CANONICAL_SOURCE}}`

## Summary

| Area | Result | Notes |
|---|---|---|
| Overall | `{{OVERALL_RESULT}}` | `{{OVERALL_NOTES}}` |
| Blocking issues | `{{BLOCKING_COUNT}}` | `{{BLOCKING_SUMMARY}}` |
| Major issues | `{{MAJOR_COUNT}}` | `{{MAJOR_SUMMARY}}` |
| Minor issues | `{{MINOR_COUNT}}` | `{{MINOR_SUMMARY}}` |

## Canonical Inputs Used

List only the canonical APT materials used to evaluate this report.

- `../../apt-principles/apt-principles.md`
- `../../apt-principles/checklists/...`
- `../../apt-principles/references/...`
- `../../apt-principles/prompts/...`
- `../../apt-principles/templates/...`

## Findings

| Severity | APT layer | Finding | Evidence | Recommended action |
|---|---|---|---|---|
| `{{SEVERITY}}` | `{{LAYER}}` | `{{FINDING}}` | `{{EVIDENCE}}` | `{{ACTION}}` |

Add one row per distinct finding. Keep findings repo-specific and evidence-based.

## Rubric

Scores: `Pass`, `Partial`, `Gap`, `Not Applicable`.

| APT layer | Score | Evidence |
|---|---|---|
| Thinking | `{{SCORE}}` | `{{EVIDENCE}}` |
| Design | `{{SCORE}}` | `{{EVIDENCE}}` |
| Architecture | `{{SCORE}}` | `{{EVIDENCE}}` |
| System Standards | `{{SCORE}}` | `{{EVIDENCE}}` |
| Security | `{{SCORE}}` | `{{EVIDENCE}}` |
| Execution | `{{SCORE}}` | `{{EVIDENCE}}` |
| Quality | `{{SCORE}}` | `{{EVIDENCE}}` |
| Release | `{{SCORE}}` | `{{EVIDENCE}}` |
| Operations | `{{SCORE}}` | `{{EVIDENCE}}` |
| Knowledge | `{{SCORE}}` | `{{EVIDENCE}}` |
| AI | `{{SCORE}}` | `{{EVIDENCE}}` |

## Evidence Sampled

List the repo-local evidence that was reviewed.

- Project docs: `{{DOCS}}`
- Code paths: `{{CODE_PATHS}}`
- Test or validation outputs: `{{VALIDATION_OUTPUTS}}`
- Supporting records: `{{DECISIONS_OR_REPORTS}}`

## Remediation Recommendations

1. `{{REMEDIATION_1}}`
2. `{{REMEDIATION_2}}`
3. `{{REMEDIATION_3}}`

Prefer actions that are concrete, scoped, and verifiable.

## Validation Evidence

Record the exact validation commands and outcomes used during the audit.

- `{{COMMAND}}`: `{{RESULT}}`
- `{{COMMAND}}`: `{{RESULT}}`

If a command could not be run, state why and what alternative evidence was used.

## Generated Artifacts

If the audit produced machine-readable outputs, store them in `docs/apt/reports/static/` and list them here.

- `docs/apt/reports/static/{{ARTIFACT_NAME}}.json`

## Residual Risk

Summarize what was not reviewed, what remains uncertain, and what should be checked next.

## Related Documents

- `../../apt-principles/apt-principles.md`
- `../../apt-principles/checklists/project-adoption-checklist.md`
- `../../apt-principles/references/project-profile.schema.json`
- `../../apt-principles/templates/project-adoption-template.md`