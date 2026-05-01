---
title: applied-practical-thinking APT Conformance Matrix
version: v1
owner: APT
status: draft
audience: developer
visibility: internal
source: manual
last_updated: 2026-04-30
canonical_source: ../../../../apt-principles
---

# applied-practical-thinking APT Conformance Matrix

## Purpose

This report is the execution baseline for full apt-principles conformance in applied-practical-thinking, with strict enforcement and exception logging.

It links canonical requirements to repo-local evidence and remediation batches.

## Scope

- Review target: applied-practical-thinking monorepo
- Review type: conformance matrix plus implementation starter batch
- Audit window: 2026-04-30
- Reviewer: GitHub Copilot
- Canonical APT source: ../../../../apt-principles

## Summary

| Area | Result | Notes |
|---|---|---|
| Overall | Partial | Strong design/runtime validation exists; structural and governance conformance gaps remain. |
| Blocking issues | 0 | No unresolved blocker remains in this pass. |
| Major issues | 5 | AI adoption evidence not centralized, docs architecture target-state not completed, and CI coverage scope still limited to worker deploy path. |
| Minor issues | 4 | Metadata rollout completion, doctrine mapping automation, and component-export governance checks need tightening. |

## Progress Update (2026-04-30)

- Batch B started.
- Updated design contrast examples to align with apt-principles restricted-accent rule:
	- `Accent Button` changed to `Accent Support Badge`.
	- Navigation selected examples changed from accent treatment to primary/neutral selected treatments.
- Source-level scan in active web source surfaces found no remaining `Accent Button` or `Nav Selected (Dark/Light)` example labels.
- Existing repo tests include unrelated pre-existing failures in `test/apt-primitives-contract.test.ts` and `test/apt-principles-ui-density-contract.test.ts` that were not introduced by this pass.
- Batch C started.
- Added root artifact proxy surfaces to align with APT build-kit expectations:
	- `examples/README.md`
	- `prompts/README.md`
	- `checklists/README.md`
	- `templates/README.md`
	- `references/README.md`
- Confirmed docs-root stale-file cleanup is already in effect (retained only current repo operating docs).
- Hardened doctrine traceability in `PROJECT_RULES.md` via explicit per-layer mapping references.
- Added root conformance verification script `scripts/verify-apt-root-surfaces.cjs` and package scripts:
	- `verify:apt-root-surfaces`
	- `validate:apt-conformance`
- Batch D started.
- Wired conformance validation into CI deploy path in `.github/workflows/worker.yml` via:
	- `Validate APT conformance gates` step running `pnpm run validate:apt-conformance`
- Batch B evidence closure progressed:
	- Added per-route state inventory for design routes in `docs/apt/reports/apt-design-route-gate-check-2026-04-30.md`.
	- Added screenshot-backed route proof under `docs/apt/reports/static/screenshots/design-routes-2026-04-30/`.
	- Updated machine-readable route gate artifact with state inventory and screenshot evidence mapping.

## Canonical Inputs Used

- ../../../../apt-principles/apt-principles.md
- ../../../../apt-principles/design.md
- ../../../../apt-principles/checklists/design-review-checklist.md
- ../../../../apt-principles/references/design-tokens.json
- ../../../../apt-principles/references/design-lint-gates.json
- ../../../../apt-principles/templates/apt-audit-report-template.md
- ../../../../apt-principles/examples/ui/dashboard-layout-pattern.md
- ../../../../apt-principles/examples/ui/navigation-layout-pattern.md
- ../../../../apt-principles/examples/ui/footer-layout-pattern.md

## Conformance Matrix (Batch A baseline)

Scores: Pass, Partial, Gap, Not Applicable.

| APT layer | Score | Evidence | Batch |
|---|---|---|---|
| Thinking | Pass | README and doctrine sync sections are present and actively referenced. | B |
| Design | Partial | Strong script coverage in apps/web package plus route-level design surfaces; examples and artifact consistency still need end-to-end reconciliation. | B |
| Architecture | Partial | Clear boundaries in project rules and architecture docs; target documentation architecture migration still pending. | C |
| System Standards | Partial | Existing validation scripts are strong; doctrine-link and artifact-presence checks are not yet complete. | D |
| Security | Partial | Canonical references exist, but this pass has not yet revalidated all security checklist alignment with updated docs structure. | D |
| Execution | Partial | Implementation batches are defined; conformance ledger and owners now initialized in static artifact. | A |
| Quality | Pass | Validation report, design-audit, and token-drift checks are present and wired to web workflows. | D |
| Release | Partial | Public-doc generation exists, but drift detection and blocker-mode policy not fully enforced. | D |
| Operations | Partial | Maintenance and deployment runbooks exist; doctrine and evidence linkage needs tightening. | C |
| Knowledge | Partial | Root-level APT build-kit proxy surfaces now exist; CI presence enforcement still pending. | C |
| AI | Partial | AI prompt/runtime assets exist but adoption evidence is not centralized under docs/apt. | C |

## Findings

| Severity | APT layer | Finding | Evidence | Recommended action |
|---|---|---|---|---|
| Major | Knowledge | Root build-kit surfaces are now proxy-based with local verification, but CI enforcement is still pending. | examples/README.md, prompts/README.md, checklists/README.md, templates/README.md, references/README.md, scripts/verify-apt-root-surfaces.cjs | Wire root verification script into CI workflow gates. |
| Resolved | Knowledge / Architecture | Stale docs marked for deletion no longer remain in docs root. | docs/ listing, docs/apt/reports/docs-folder-cleanup-audit-2026-04-27.md | Keep docs root constrained to active repo-specific operating docs. |
| Major | System Standards / Release | Doctrine drift and generated artifact checks are now enforced in worker deploy CI, but not yet guaranteed on all PR paths. | .github/workflows/worker.yml, package.json, apps/web package scripts | Add equivalent required checks for pull-request validation workflows. |
| Major | AI | AI adoption evidence is scattered across prompts, worker routes, and docs. | apps/web/ai/README.md, apps/worker/src/routes, docs/apt/project-profile.md | Create docs/apt/ai-adoption.md with scope, ownership, guardrails, and validation evidence. |
| Major | Design | Design routes now include state inventory and screenshot-backed proof, but interaction-state automation (focus/hover traversal) is still incomplete. | apps/web/routes/DesignPlayground.tsx, apps/web/routes/portfolio/DesignSystem.tsx, apps/web/lib/contrast.ts, docs/apt/reports/apt-design-route-gate-check-2026-04-30.md, docs/apt/reports/static/screenshots/design-routes-2026-04-30/ | Add automated interaction-state probes and complete remaining gate assertions. |
| Major | Architecture | Target documentation architecture migration path exists but remains incomplete. | PROJECT_RULES.md, docs/ARCHITECTURE.md | Add explicit migration milestones and acceptance checks in docs/apt/reports. |
| Minor | System Standards | Project rules now include layer mapping, but automated verification of mapping coverage is not yet in CI. | PROJECT_RULES.md | Add a verification script that fails when doctrine mapping references are missing/invalid. |
| Minor | Quality | Metadata rollout completion state is not fully captured in one pass/fail report. | docs/DOCUMENTATION_METADATA_ROLLOUT.md | Add metadata coverage report output and gate on completion threshold. |
| Minor | Design | Shared component export/usage governance can drift from docs over time. | AGENTS.md, packages/ui | Add script/gate that verifies documented shared primitives still exist and are exported. |
| Resolved | Operations | Report cadence and ownership are now explicit. | docs/apt/reports/README.md | Keep report contract fields current as batches close. |

## Evidence Sampled

- Project docs: PROJECT_RULES.md, README.md, docs/ARCHITECTURE.md, docs/MAINTENANCE.md, docs/DOCUMENTATION_METADATA_ROLLOUT.md
- Prior local audits: docs/apt/reports/apt-principles-audit-2026-04-26.md, docs/apt/reports/docs-folder-cleanup-audit-2026-04-27.md, docs/apt/reports/apt-public-docs-source-audit-2026-04-27.md
- Design routes and examples: apps/web/routes/DesignPlayground.tsx, apps/web/routes/DesignPatterns.tsx, apps/web/routes/DesignDocs.tsx, apps/web/routes/DesignKnowledgeEngine.tsx
- Design system and tokens: packages/config/src/aptTokens.ts, packages/ui/src/*.tsx
- Validation scripts: apps/web/scripts/design-audit.cjs, apps/web/scripts/token-drift-check.cjs, apps/web/scripts/validation-report.cjs, apps/web/scripts/generate-apt-principles-public.cjs

## Implementation Batches

1. Batch A (in progress): baseline conformance matrix plus machine-readable evidence ledger.
2. Batch B (in progress): design-system and route/example conformance closure against design lint gates.
3. Batch C: root artifact structure normalization, stale-doc cleanup, doctrine citation hardening.
4. Batch D: CI enforcement, drift blockers, exception log, final conformance report.

## Validation Evidence

To run in subsequent batches:

- npm --prefix apt-principles run validate
- npm --prefix apt-principles run run-all-checks
- pnpm --dir apps/web run validation-report
- pnpm --dir apps/web run token-drift-check
- pnpm --dir apps/web run design-audit
- pnpm --dir apps/web run lint
- pnpm --dir apps/web run generate-apt-principles-public
- pnpm --dir apps/web run build-content-index
- pnpm --dir apps/web run copy-content-to-public

## Generated Artifacts

- docs/apt/reports/static/apt-principles-conformance-matrix-2026-04-30.json

## Residual Risk

This starter implementation defines the matrix and backlog but does not yet complete Batch B through D remediations. Until those are executed, conformance remains Partial and cannot be considered promotion-ready without exception records.

## Related Documents

- ../../../../apt-principles/apt-principles.md
- ../../../../apt-principles/checklists/project-adoption-checklist.md
- ../../../../apt-principles/references/project-profile.schema.json
- ../../../../apt-principles/templates/project-adoption-template.md
- docs/apt/reports/apt-principles-audit-2026-04-26.md
