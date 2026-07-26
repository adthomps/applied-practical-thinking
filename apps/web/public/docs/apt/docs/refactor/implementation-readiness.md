---
title: Refactor Implementation Readiness
kind: assessment
domain: governance
status: active
owner: APT
last_updated: 2026-07-11
source_paths: ["apt-principles-agents/docs/refactor/implementation-readiness.md"]
---

# Implementation Readiness

## Overall Readiness Rating

Ready with required changes. The assessment is evidence-based (all checkable factual claims verified accurate except two minor overstatements), internally consistent, incremental, reversible, vendor-neutral, and free of hidden file movement or irreversible steps. It is not yet ready to guide Phase 2 because the taxonomy cannot classify a third of the repository's first-class directories, the hierarchy leaves two precedence questions open, and four of the five named pilot assets do not exist.

## Blocking Decisions

These must be resolved before the phase they block. R-numbers reference `docs/refactor/required-revisions.md`.

| Decision | Blocks | Resolution required |
| --- | --- | --- |
| DR-001 authority hierarchy | Phase 1 sign-off | Approve only with R1 amendments (principle/standard precedence, ADR amendment rule, decidable root-instruction row). |
| DR-002 asset taxonomy | Phase 1 sign-off | Approve only with R2 coverage extension. |
| DR-005 workflow boundary | Pilot workflow authoring | Approve only with R3 workflow/playbook discriminator. |
| DR-011 pilot agent mapping | Phase 2 start | Resolve via R4: use existing `apt-voice-of-customer-analyst`. |
| DR-013 ADR home location (new) | Pilot ADR authoring | Add per R5 and decide with or in the boundary ADR. |
| DR-008 OKF concept scope | Any OKF work | Amend per R8 (≤5 types, named consumer required). |
| Generated-content safety controls | Phase 1 sign-off | Approvable as written; enforcement tooling becomes a Phase 5 precondition (A3). |

## Non-Blocking Decisions

DR-003 (`references/`/`schemas/`, record R6 rule), DR-004 (`platforms/` stays adapter home), DR-006 (adapter generation boundary, plus A2 comparison), DR-007 (generated wiki tooling commit policy), DR-009 (packages), DR-010 (stale-reference cleanup, plus A1 micro-cleanup), DR-012 (generated review load).

## Smallest Safe Implementation Phase

Phase 1 narrowed to documentation-only approval, no new validation code:

1. Amend the four assessment documents per R1, R2, R3, R6, R7, R8 (or record amendments in the decision register).
2. Record approvals for DR-001 through DR-006 outcomes plus new DR-013.
3. Optionally the A1 two-file micro-cleanup (`CONTRIBUTING.md`, `docs/diagrams/repository-structure.md`).

Everything lands in `docs/` plus at most two root doc files; `npm run check` is the gate; rollback is one revert. No file movement, no new directories, no schemas, no generation.

## Pilot Recommendation

Run the pilot only after Phase 1 sign-off, re-scoped per R4:

- Skill: `skills/product/voice-of-customer/SKILL.md` (exists, validated).
- Agent: `agents/product/apt-voice-of-customer-analyst.md` (exists; resolves DR-011 with zero new content).
- Workflow: Market-to-Validated-Concept, the single net-new asset, authored descriptively against the approved workflow boundary, placed under an existing path and marked pilot — no `workflows/` directory.
- ADR: Canonical Knowledge, OKF Projection and generated wiki tooling Boundaries — also decides the ADR home (DR-013) and records the ≤5-type OKF scope.
- Excluded: generated wiki tooling implementation, OKF generation, adapter generation, Working Backwards principle extraction, task-packet schema.

generated wiki tooling in the first pilot: no — boundary ADR only. OKF in the first pilot: no generation — at most the ADR-recorded scope; hand-authored records only if a named consumer appears.

## Validation Requirements

Measurable pilot exit criteria:

1. `npm run check` passes at every pilot commit.
2. The workflow file references only existing skill and agent paths (checkable by the existing broken-link validator).
3. The ADR exists at the decided ADR home, follows `templates/ADR-TEMPLATE.md` or `templates/decision-records/ADR.md`, and passes metadata validation.
4. All four platform consumption paths are documented for the pilot slice as text (no adapter files generated or modified).
5. A named reviewer set (APT maintainer, security reviewer, beginner reviewer, one adapter owner — as the migration plan already requires) signs off.
6. Zero changes outside the pilot file set, verified by diff scope.

## Rollback Requirements

The pilot must be one commit or one tightly grouped commit set; a rollback rehearsal (revert, then `npm run check`) must be performed before merge; no pilot file may be referenced from manifests, installers, or platform adapters during the pilot, so reverting cannot break installation paths.

## Approval Recommendation

Approve the assessment as the basis for Phase 1 with the eight required revisions (R1–R8) applied first, and Phase 2 only under the re-scoped pilot with the measurable exit criteria above. The assessment's core judgments — keep the repository unified, move nothing yet, defer all generation, gate new directories on consumers — all survived independent challenge.

Environment note: in this review sandbox, `npm run validate`, `validate:metadata`, and `validate:parity` pass on repository content; the installer lifecycle test fails only at cleanup because the sandbox forbids deleting its own `.tmp/installer-tests/` residue, which then appears in subsequent link-validation runs (111 issues, all confined to gitignored `.tmp/`). This is a sandbox artifact, not a repository defect, but it evidences the validator-exclusion gap recorded as Finding 12 / A3.

APPROVE WITH REQUIRED CHANGES
