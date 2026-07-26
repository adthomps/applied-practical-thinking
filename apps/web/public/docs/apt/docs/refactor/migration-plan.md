---
title: Refactor Migration Plan
kind: plan
domain: architecture
status: active
owner: APT
last_updated: 2026-07-11
source_paths: ["apt-principles-agents/docs/refactor/migration-plan.md"]
---

# Migration Plan

## Migration Principles

- Preserve the merged repository.
- Move nothing until authority, taxonomy, compatibility, and validation rules are approved.
- Prefer small reversible phases.
- Keep existing installation and validation paths operational.
- Treat generated content as derived, marked, and disposable.
- Keep archives as history, not active policy.

## Phase 0: Assessment Package

- Goal: Document current state, authority, taxonomy, target architecture, generated-content model, and migration path.
- Scope: `docs/refactor/**` only.
- Files affected: the assessment files in this directory.
- Preconditions: merged repo exists and validation can run.
- Validation: `npm run check`; verify requested files; confirm diff scope.
- Rollback: single revert of `docs/refactor/**`.
- Human decisions: none required to publish assessment as draft/active documentation.
- Exit criteria: all required deliverables exist and no broad refactor occurred.

## Phase 1: Approve The Operating Model

- Goal: Approve authority hierarchy, expanded asset taxonomy, workflow/playbook boundary, generated-content controls, references/schemas direction, ADR location decision, and shared adapter model.
- Scope: Documentation and minimal validation rules only.
- Files affected: likely `docs/`, possibly a future ADR location, and minimal schema docs if approved. No content movement.
- Preconditions: assessment reviewed by APT maintainer, security reviewer, beginner reviewer, and one platform adapter owner.
- Validation: `npm run check`, stale-reference report if added, no installer behavior change.
- Rollback: revert the operating-model docs and validation additions.
- Human decisions: authority hierarchy, asset taxonomy, workflow boundary, `references/` vs `schemas/`, adapter source strategy, ADR home/indexing.
- Exit criteria: maintainers can tell where each asset type belongs and which source wins in conflicts.

## Phase 2: Pilot One Vertical Slice

- Goal: Test the model with one principle, one skill, one agent, one workflow, and one ADR without broad movement.
- Scope: pilot definitions and generated/derived design only if approved.
- Files affected: minimal pilot docs under existing locations or a small approved pilot area. Do not create all future directories.
- Preconditions: Phase 1 decisions approved.
- Validation: references exist, task packet works, all four platform consumption paths are documented, `npm run check`.
- Rollback: revert pilot files and any pilot validation additions.
- Human decisions: pilot scope, workflow state model, whether any generated adapter is allowed.
- Exit criteria: pilot proves the taxonomy and source hierarchy are usable without breaking existing consumers.

## Phase 3: Schema And Workflow Hardening

- Goal: Add minimal schemas for agent, skill, workflow, adapter metadata, and generated knowledge if the pilot proves value.
- Scope: schema docs and validators; possible `schemas/` creation only if approved.
- Files affected: approved schema location, validator scripts, docs.
- Preconditions: references/schemas decision approved and pilot successful.
- Validation: schema tests, existing `npm run check`, target fixture tests.
- Rollback: revert schema additions and validators; leave current content paths intact.
- Human decisions: schema strictness and compatibility policy.
- Exit criteria: schemas improve safety without forcing broad rewrites.

## Phase 4: Adapter Generation Pilot

- Goal: Generate a small shared adapter core for the pilot assets while preserving handwritten tool extensions.
- Scope: one pilot slice across Codex, Claude, Gemini, and Copilot.
- Files affected: selected adapter source/distribution files only after explicit approval.
- Preconditions: adapter generation strategy and generated markers approved.
- Validation: adapter parity, generated marker checks, platform smoke tests, `npm run check`.
- Rollback: restore previous adapter files from git.
- Human decisions: generated vs handwritten boundaries and promotion policy.
- Exit criteria: generated adapters are reproducible and do not fork doctrine.

## Phase 5: generated wiki tooling And OKF Bounded Pilots

- Goal: Add generated repository-understanding and selective OKF projection for the pilot slice only.
- Scope: bounded generated wiki tooling output and OKF concept set if approved.
- Files affected: approved future `docs/generated-wiki/` or `knowledge/okf/*` locations only after phase approval.
- Preconditions: named consumer, generated-content safety controls, named secret-scanning tool, validator inclusion/exclusion policy, generated-marker check, and prompt-injection handling approved.
- Validation: provenance, staleness, safety scan, schema validation, review status.
- Rollback: delete generated output or revert commit; canonical sources unchanged.
- Human decisions: commit policy, generation tool, sensitive-path exclusions.
- Exit criteria: generated wiki tooling and OKF remain distinct and non-authoritative.

## Phase 6: Targeted Cleanup

- Goal: Repair stale references and reduce adapter drift based on validated model.
- Scope: update old root doctrine references, classify installable summaries, classify workflow candidates.
- Files affected: selected active docs, prompts, examples, adapters.
- Preconditions: pilot success and compatibility plan.
- Validation: `npm run check`, stale-reference checker, installation smoke tests.
- Rollback: batch changes in small commits by subsystem.
- Human decisions: old-name compatibility and deprecation windows.
- Exit criteria: active docs no longer mislead about canonical paths.

## Recommended Pilot

Use a smaller evidence-based vertical slice:

- Existing skill: Voice of Customer skill at `skills/product/voice-of-customer/SKILL.md`.
- Existing agent: Voice of Customer analyst at `agents/product/apt-voice-of-customer-analyst.md`.
- Existing content requiring promotion later: Working Backwards content in current doctrine/context/checklist material; do not extract it during the pilot.
- Proposed new asset: one minimal descriptive Market-to-Validated-Concept workflow specification.
- Architecture decision: Canonical versus Generated Knowledge Boundary ADR, including ADR home decision.

APT sequence:

```text
Market
-> Intent
-> Customer or stakeholder
-> Need, pain point or stressor
-> Product hypothesis
-> Validation
-> Delivery handoff
```

### Why This Pilot

- It exercises market, customer, stakeholder, and intent-driven working-backwards methods.
- It connects existing skill and agent assets to a workflow specification without creating a new top-level directory.
- It is product-facing but can be piloted without touching payment/security runtime behavior.
- It tests classification, canonical authority, relationships, validation, selective context packaging, and compatibility with current distribution paths.
- It does not test generated wiki tooling generation, OKF generation, full adapter generation, runtime orchestration, or large file movement.

### Current Source Locations

- Voice of Customer Analysis: `skills/product/voice-of-customer/SKILL.md`.
- Voice of Customer Analyst: `agents/product/apt-voice-of-customer-analyst.md`.
- Working Backwards evidence: existing doctrine/context/checklist material only; promotion deferred.
- Workflow candidates: `examples/workflows/*`, `prompts/planning/*`, and product templates.
- Architecture decision source: future ADR or decision record, not yet created.

### Generated And Handwritten Split

- Handwritten: workflow definition and ADR. Existing skill and agent remain in place.
- Existing content requiring promotion later: Working Backwards principle candidate.
- Generated: none in the initial pilot.
- Never generated as authority: doctrine, approval gates, or security constraints.

### Pilot Success Criteria

- Existing validation remains green.
- One existing skill is classified without moving it.
- One existing agent is classified without moving it.
- One existing doctrine section is mapped to a proposed canonical principle asset without extraction.
- One minimal workflow specification is documented under an existing approved path.
- One ADR records canonical and generated knowledge boundaries and ADR home/index requirements.
- One minimum viable context packet can reference `AGENTS.md`, one existing context pack, and the pilot assets without loading the full repository.
- No existing installer, manifest, or platform path breaks.
- No generated wiki tooling, OKF, adapter generation, runtime orchestration, or new top-level directory is introduced.
- The pilot can be reverted with one commit and `npm run check` remains green after rehearsal.

### Rollback

The pilot should be one small commit or tightly grouped commits. Rollback should be a single revert, leaving existing repository paths and installers unchanged.

## Misleading Active Documentation Candidates

These are out of scope for this task but should be considered after Phase 1 approval:

- `CONTRIBUTING.md`: stale claims that contributors should not rename former root canonical doctrine files, including root file names that no longer exist as active canonical files.
- `docs/diagrams/repository-structure.md`: stale structure diagram that presents former root-doctrine layout as current.

Classification: non-blocking for this assessment, blocking for broad stale-reference cleanup credibility. Recommended action: targeted two-file micro-cleanup after approval, with no path movement and a single-revert rollback.
