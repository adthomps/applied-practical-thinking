---
title: Phase 1 Acceptance Criteria
kind: assessment
domain: architecture
status: active
owner: APT
last_updated: 2026-07-13
source_paths: ["apt-principles-agents/docs/refactor/phase-1-acceptance-criteria.md"]
---

# Phase 1 Acceptance Criteria

## Completion Criteria

- [Verified current state] The Phase 1 implementation is documentation-only.
- [Acceptance criterion] Repository behavior is unchanged: no runtime behavior, installer behavior, validator behavior, package behavior, or platform-adapter behavior changes.
- [Acceptance criterion] No existing asset is moved, renamed, deleted, or regenerated.
- [Acceptance criterion] No new top-level directory is introduced unless explicitly approved before implementation.
- [Acceptance criterion] No `docs/governance/` subtree is created while the existing top-level `governance/` directory remains the governance home.
- [Acceptance criterion] Every new document has one defined responsibility and clear frontmatter.
- [Acceptance criterion] Every new document names its authority level as canonical governance, governance convention, supporting governance, or evidence-only material.
- [Acceptance criterion] No new document duplicates an existing canonical source; where existing content is reused, the document names the source material and its relationship.
- [Acceptance criterion] Authority and conflict rules are explicit, including security, legal, privacy, regulatory, repository constraints, principles, standards, ADRs, root instructions, scoped instructions, canonical content, derived content, generated content, and human escalation.
- [Acceptance criterion] Doctrine amendment rules explain how an approved decision can require doctrine changes without silently overriding doctrine.
- [Acceptance criterion] Superseded decisions are retained with status and replacement evidence.
- [Acceptance criterion] The taxonomy covers all active first-class repository asset categories: policy, principle, standard, ADR, agent, skill, workflow, playbook, prompt, checklist, template, guide, reference, contract, schema-like reference, manifest, context pack, routing definition, evaluation, adapter, example, generated knowledge, historical content, and experimental content.
- [Acceptance criterion] The taxonomy distinguishes asset kind from properties such as canonical, derived, generated, historical, experimental, installable, local, tool-specific, and archived.
- [Acceptance criterion] Workflow and playbook have a practical discriminator: a workflow declares structured references, stages, gates, inputs, outputs, validation, and exit criteria; a playbook remains human-oriented situational guidance without a reference contract.
- [Acceptance criterion] Workflow conventions do not create or imply executable runtime orchestration.
- [Acceptance criterion] Context packet conventions remain documentation-only and schema-free unless a schema trigger is separately approved.
- [Acceptance criterion] Context packet conventions support selective loading by naming task intent, repository scope, applicable principles, standards, agent role, selected skill, selected workflow, security constraints, expected output, and validation steps.
- [Acceptance criterion] Generated-content policy explicitly covers generated wiki tooling, OKF, adapters, AI-produced summaries, generated indexes, context packs, and generated repository documentation.
- [Acceptance criterion] Generated-content policy states that generated content is not canonical until a human promotes source-supported material into canonical docs.
- [Acceptance criterion] Generated-content policy requires provenance, source commit, generator identity, generated timestamp, format or schema version when applicable, authority level, review status, reproducibility, failed-generation behavior, prompt-injection treatment, secret handling, sensitive-data handling, and rollback behavior.
- [Acceptance criterion] No generated wiki tooling output is generated.
- [Acceptance criterion] No OKF content is generated.
- [Acceptance criterion] No adapters are generated.
- [Acceptance criterion] No schemas or schema directories are introduced without meeting the approved trigger.
- [Acceptance criterion] ADR location and ownership are resolved before an ADR directory is created.
- [Acceptance criterion] If ADR location and ownership are not resolved, Phase 1 documents only the ADR convention under existing governance documentation.
- [Acceptance criterion] Future command specifications are labeled conceptual and mapped to current scripts or installers; no document claims a CLI command exists when only script behavior exists.
- [Acceptance criterion] The pilot uses verified existing assets or clearly labels proposed assets.
- [Acceptance criterion] The pilot uses `skills/product/voice-of-customer/SKILL.md` and `agents/product/apt-voice-of-customer-analyst.md` as existing assets.
- [Acceptance criterion] The pilot does not describe a Product Discovery Agent as existing unless one is verified.
- [Acceptance criterion] Working Backwards is treated as existing doctrine, context, and checklist material requiring possible future promotion, not as a new Phase 1 principle extraction.
- [Acceptance criterion] The proposed Market-to-Validated-Concept workflow is clearly labeled proposed and documentation-only.
- [Acceptance criterion] Existing manifests, installers, and validators continue to pass in a clean environment.
- [Acceptance criterion] If local ignored test residue causes validation failures, the result is recorded as a validator-exclusion gap; Phase 1 does not delete local residue as a workaround.
- [Acceptance criterion] The entire implementation can be reverted with one commit.

## Scope Controls

- [Acceptance criterion] The smallest accepted Phase 1 implementation creates no more than five new governance documents plus an optional `governance/README.md` index update.
- [Acceptance criterion] Authority, lifecycle, doctrine amendment, and ADR convention are combined unless human approval requires separation.
- [Acceptance criterion] Asset taxonomy and lifecycle classification are combined unless human approval requires separation.
- [Acceptance criterion] Workflow convention, context packet convention, and future command mapping are combined unless human approval requires separation.
- [Acceptance criterion] Stale-reference cleanup in `CONTRIBUTING.md` and `docs/diagrams/repository-structure.md` is either explicitly included as approved scope or deferred.
- [Acceptance criterion] No Phase 1 document creates generated wiki tooling, OKF, adapter, package, schema, workflow-directory, or runtime implementation obligations.

## Validation Criteria

- [Validation] Run `npm run check`.
- [Validation] Run `npm run validate`.
- [Validation] Run `npm run validate:metadata`.
- [Validation] Run `npm run validate:parity`.
- [Validation] Confirm any validation failures are unrelated to the three readiness files before claiming the readiness package is complete.
- [Validation] Confirm the created-file set for this task is exactly:
  - `docs/refactor/phase-1-readiness-check.md`
  - `docs/refactor/phase-1-file-plan.md`
  - `docs/refactor/phase-1-acceptance-criteria.md`
- [Validation] Confirm no Phase 1 implementation files were created or modified.
- [Validation] Confirm no pre-existing line-ending churn was normalized.
- [Validation] Confirm no sandbox-controlled `.tmp/` files were deleted.

## Validation Record

[Validation] `npm run check` failed. It ran `npm run validate` first and stopped there with `Validation failed: 111 issue(s), 0 warning(s)`. Every reported issue was a broken link under `.tmp/installer-tests/target/.apt/` or `.tmp/installer-tests/target/.apt-backups/`; no reported issue named `docs/refactor/phase-1-readiness-check.md`, `docs/refactor/phase-1-file-plan.md`, or `docs/refactor/phase-1-acceptance-criteria.md`.

[Validation] `npm run validate` failed with the same result: `Validation failed: 111 issue(s), 0 warning(s)`. The failures are local ignored installer-test residue, which this task intentionally did not delete.

[Validation] `npm run validate:metadata` passed with `Artifact metadata: PASS`.

[Validation] `npm run validate:parity` passed with JSON output showing `"manifests": 22`, `"issues": []`, and `"status": "passed"`.

[Validation] `git diff --name-only` emitted line-ending warnings and no tracked file names. `git ls-files --others --exclude-standard` showed pre-existing untracked `.wrangler/`, pre-existing untracked refactor assessment files, pre-existing `scripts/cleanup-cloudflare-pages-deployments.ps1`, and the three files created by this task.

[Validation] The files created by this task are exactly:

- `docs/refactor/phase-1-readiness-check.md`
- `docs/refactor/phase-1-file-plan.md`
- `docs/refactor/phase-1-acceptance-criteria.md`

[Validation] No Phase 1 implementation occurred. No existing asset was moved. No new top-level directory was introduced. No generated wiki tooling output, OKF content, adapters, schemas, ADR directory, runtime code, installer behavior, or validator behavior was created or changed. No sandbox-controlled `.tmp/` files were deleted.
