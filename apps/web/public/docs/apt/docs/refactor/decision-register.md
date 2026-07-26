---
title: Refactor Decision Register
kind: decision-register
domain: governance
status: active
owner: APT
last_updated: 2026-07-11
source_paths: ["apt-principles-agents/docs/refactor/decision-register.md"]
---

# Decision Register

No decision in this register is approved unless a later record shows explicit human approval.

## DR-001: Authority Hierarchy

- Identifier: DR-001.
- Decision: Approve the canonical source hierarchy and conflict rules.
- Why it matters: Agents and humans need a decidable rule when policies, doctrine, standards, ADRs, instructions, generated content, and archives conflict.
- Verified evidence: `AGENTS.md` is the immediate root operational instruction; `principles/` and `standards/` are first-class; generated content is explicitly treated as non-authoritative in existing guidance; the prior hierarchy did not fully resolve principle/standard or ADR/doctrine evolution.
- Available options: keep implicit hierarchy; approve the revised hierarchy; treat root instructions as conceptually highest authority.
- Recommendation: approve the revised hierarchy with security/repository constraints first, principles before standards on judgment conflicts, standards as required practice within scope, ADRs as bounded decisions that cannot silently override doctrine, and generated content below its source.
- Consequences: Clearer conflict handling and safer generated-content controls.
- Consequence of delay: Adapter, stale-reference, and pilot decisions remain ad hoc.
- Human approval required: Yes.
- Blocking or non-blocking: Blocking for Phase 1 sign-off.
- Target phase: Phase 1.
- Status: Proposed, required revision applied in assessment docs.

## DR-002: Asset Taxonomy

- Identifier: DR-002.
- Decision: Approve the expanded asset taxonomy and generated/canonical/derived properties.
- Why it matters: The taxonomy must classify first-class repo areas including prompts, checklists, manifests, context packs, and routing definitions.
- Verified evidence: Top-level directories include `prompts/`, `checklists/`, `manifests/`, `context/`, `context-packs/`, and `routing/`; the initial taxonomy did not classify all of them.
- Available options: keep current directory labels only; approve expanded taxonomy; use two axes only: kind and properties.
- Recommendation: approve expanded practical taxonomy and treat generated, canonical, derived, installable, archived, and tool-specific as properties.
- Consequences: Better classification, ownership, and migration rules.
- Consequence of delay: Future cleanup continues to classify assets ad hoc.
- Human approval required: Yes.
- Blocking or non-blocking: Blocking for Phase 1 sign-off.
- Target phase: Phase 1.
- Status: Proposed, required revision applied in assessment docs.

## DR-003: `references/` Versus Future `schemas/`

- Identifier: DR-003.
- Decision: Decide when schema-like files should move from `references/` to a future `schemas/`.
- Why it matters: Schema-like files can drift if they are descriptive but not consumed by validators.
- Verified evidence: `references/installation.schema.json` exists and appears schema-like, but no confirmed script consumer was found in this assessment; other reference JSON files serve mixed contract, vocabulary, token, or validation-support roles.
- Available options: keep all JSON in `references/`; create `schemas/` now; create `schemas/` only after trigger criteria are met.
- Recommendation: keep current paths. Create `schemas/` only when at least one approved trigger exists: two or more schemas need shared discovery/versioning; a validator loads schemas from a stable path; installers or adapters consume schemas programmatically; schema ownership and compatibility policy are approved; schema files need tests independent of descriptive references; or external consumers need a stable machine-readable contract location.
- Consequences: Avoids path churn while exposing unclear operational status.
- Consequence of delay: Acceptable short term; schema-like files must be treated as reference contracts unless enforced.
- Human approval required: Yes.
- Blocking or non-blocking: Non-blocking for the documentation pilot; blocking for schema hardening.
- Target phase: Phase 1 for policy, Phase 3 for any movement.
- Status: Proposed, required revision applied in assessment docs.

## DR-004: `platforms/` Versus Future `adapters/`

- Identifier: DR-004.
- Decision: Decide whether `platforms/` remains the adapter home or a future `adapters/` directory is introduced.
- Why it matters: Two adapter homes would create drift.
- Verified evidence: `platforms/` already contains active Codex, Claude, Gemini, Copilot, local LLM, VS Code, and shared-source content.
- Available options: keep `platforms/`; rename to `adapters/`; use `adapters/` as generator source and `platforms/` as distribution output.
- Recommendation: keep `platforms/` now and revisit only after an adapter-generation or thin-pointer parity pilot.
- Consequences: Preserves installer behavior and avoids needless movement.
- Consequence of delay: Low if no new adapter directory is created.
- Human approval required: Yes.
- Blocking or non-blocking: Non-blocking for the revised pilot.
- Target phase: Phase 1 or Phase 4.
- Status: Proposed.

## DR-005: Workflow And Playbook Boundary

- Identifier: DR-005.
- Decision: Approve workflow versus playbook discriminator.
- Why it matters: The pilot workflow must be authored against a practical boundary.
- Verified evidence: Workflow-shaped assets exist in `examples/workflows/` and planning prompts; no canonical top-level workflow model exists.
- Available options: keep workflows as examples; define narrative-only workflows; define descriptive workflows with machine-checkable references; define executable workflows now.
- Recommendation: define descriptive workflows with machine-checkable references to skills, roles, gates, inputs, outputs, and completion criteria. Playbooks remain narrative operational guidance. Executable state is out of scope until separately approved.
- Consequences: Supports validation without building runtime orchestration.
- Consequence of delay: Pilot workflow authoring remains ambiguous.
- Human approval required: Yes.
- Blocking or non-blocking: Blocking for Phase 2 workflow authoring.
- Target phase: Phase 1.
- Status: Proposed, required revision applied in assessment docs.

## DR-006: Adapter Generation Boundary

- Identifier: DR-006.
- Decision: Decide whether to build adapter generation or use thin pointers plus parity checks.
- Why it matters: Generation adds pipeline cost and overwrite risk; manual adapters add drift risk.
- Verified evidence: Root tool files are thin; Copilot has both source and distribution surfaces; no adapter generator script exists.
- Available options: keep manual adapters; generate all adapters; generate shared core and mappings; use thin pointers plus parity checks.
- Recommendation: before any generation, compare generator cost against thin-pointer-plus-parity-check. If generation proceeds, require generated markers, source hashes, never-touch-unmarked-files behavior, and editable-vs-generated split.
- Consequences: Avoids building a generator just because adapters exist.
- Consequence of delay: Current adapter drift risk remains manageable under documentation-only phases.
- Human approval required: Yes.
- Blocking or non-blocking: Non-blocking for revised pilot; blocking for adapter generation.
- Target phase: Phase 4.
- Status: Proposed.

## DR-007: generated wiki tooling Policy

- Identifier: DR-007.
- Decision: Decide whether and how generated wiki tooling output is committed.
- Why it matters: generated wiki tooling would add another generated navigation surface with review and staleness cost.
- Verified evidence: No active generated wiki tooling integration exists; existing navigation surfaces include README, context packs, catalogs, and diagrams.
- Available options: never commit generated wiki tooling output; commit only reviewed output; commit all generated output; keep local only.
- Recommendation: no generated wiki tooling implementation in the pilot. If pursued later, trial in an isolated branch with a named consumer, validator inclusion/exclusion decision, generated markers, and rejection as a live option.
- Consequences: Keeps generated narrative from becoming policy.
- Consequence of delay: Low; existing navigation remains available.
- Human approval required: Yes.
- Blocking or non-blocking: Non-blocking for revised pilot; blocking for generated wiki tooling work.
- Target phase: Phase 5.
- Status: Proposed, required revision reflected in assessment docs.

## DR-008: OKF Scope

- Identifier: DR-008.
- Decision: Approve a reduced OKF concept scope.
- Why it matters: A broad ontology without a consumer would create premature schema governance.
- Verified evidence: No active OKF tree or consumer exists; current metadata frontmatter is already validated; the initial OKF proposal listed too many concept types for a selective pilot.
- Available options: defer OKF entirely; pilot four concept types; pilot five concept types including Agent; approve broad model.
- Recommendation: no OKF generation in Phase 1. If a named consumer appears later, start with Principle, Skill, Workflow, and Decision. Add Agent only if the consumer needs the existing Voice of Customer analyst mapping.
- Consequences: Keeps OKF selective and evidence-based.
- Consequence of delay: Low; frontmatter and context packs remain sufficient.
- Human approval required: Yes.
- Blocking or non-blocking: Blocking for any OKF work, non-blocking for revised pilot if no OKF is generated.
- Target phase: Phase 5.
- Status: Proposed, required revision applied in assessment docs.

## DR-009: Packages

- Identifier: DR-009.
- Decision: Decide when to introduce `packages/`.
- Why it matters: Packages imply independent versioning, ownership, release, and support.
- Verified evidence: Current `package.json` is private repo tooling; no workspaces, independently versioned packages, served APIs, or runtime services exist.
- Available options: no packages; create CLI package; create schema/validator/generator packages; wait for independent consumers.
- Recommendation: wait until a component is independently useful, testable, versionable, and consumable.
- Consequences: Avoids premature monorepo complexity.
- Consequence of delay: Existing scripts continue to work.
- Human approval required: Yes.
- Blocking or non-blocking: Non-blocking.
- Target phase: Phase 3 or later.
- Status: Proposed.

## DR-010: Stale Reference Cleanup

- Identifier: DR-010.
- Decision: Decide how to update old root doctrine names in active content.
- Why it matters: Some active docs and prompts still name former root doctrine files.
- Verified evidence: Active search found many references to former root doctrine filenames; independent review identified misleading claims in `CONTRIBUTING.md` and a stale structure diagram.
- Available options: leave as historical aliases; update all active references; update only misleading references; add alias map first.
- Recommendation: approve a targeted two-file micro-cleanup after Phase 1, then broader stale-reference cleanup after compatibility review.
- Consequences: Reduces confusion while preserving provenance.
- Consequence of delay: Misleading docs remain live longer.
- Human approval required: Yes.
- Blocking or non-blocking: Non-blocking for revised pilot, but important before broad migration.
- Target phase: Phase 1 follow-up and Phase 6.
- Status: Proposed.

## DR-011: Pilot Agent Mapping

- Identifier: DR-011.
- Decision: Decide pilot agent mapping.
- Why it matters: The earlier Product Discovery Agent named in the pilot does not currently exist.
- Verified evidence: `agents/product/apt-voice-of-customer-analyst.md` exists and pairs with `skills/product/voice-of-customer/SKILL.md`; no exact Product Discovery Agent was verified.
- Available options: create a new Product Discovery Agent; compose existing product/customer agents; use existing Voice of Customer analyst; omit an agent.
- Recommendation: use existing `agents/product/apt-voice-of-customer-analyst.md` for the revised pilot.
- Consequences: Pilot uses current assets and avoids unnecessary content creation.
- Consequence of delay: Pilot scope remains overstated.
- Human approval required: Yes.
- Blocking or non-blocking: Blocking for Phase 2 start.
- Target phase: Phase 2.
- Status: Proposed, required revision applied in assessment docs.

## DR-012: Generated Content Review Load

- Identifier: DR-012.
- Decision: Decide how much generated content can be produced per phase.
- Why it matters: Generated adapters, generated wiki tooling, OKF, and compact views can overwhelm review.
- Verified evidence: Repository already has multiple navigation surfaces; no generated wiki tooling or OKF consumer exists; review noted generated-output validation boundaries are fragile.
- Available options: no generated content; one bounded generated artifact per pilot; generate broadly and review later.
- Recommendation: no generated content in the revised pilot. Later pilots may add one bounded generated artifact type only with a named consumer and review gates.
- Consequences: Keeps review load practical.
- Consequence of delay: Low; generation should not start without this decision.
- Human approval required: Yes.
- Blocking or non-blocking: Blocking for generated pilots.
- Target phase: Phase 5.
- Status: Proposed.

## DR-013: Canonical ADR Location, Ownership, Lifecycle, And Indexing

- Identifier: DR-013.
- Decision: Decide canonical ADR location, ownership, lifecycle, and indexing.
- Why it matters: The revised pilot includes a boundary ADR, but the repository currently has ADR templates rather than an approved ADR home.
- Verified evidence: ADR templates exist under `templates/ADR-TEMPLATE.md` and `templates/decision-records/ADR.md`; no canonical active ADR directory was confirmed in this assessment.
- Available options: store ADRs under `docs/`; store ADRs under `governance/`; store ADRs under another existing area; defer ADR authoring; create a new ADR directory later after approval.
- Recommendation: decide ADR home in Phase 1 before pilot ADR authoring. Prefer an existing `docs/` location unless governance owners require `governance/`; do not create a new directory during this task.
- Consequences: ADRs can record bounded architecture decisions without pretending to override doctrine.
- Consequence of delay: Pilot boundary ADR cannot be authored safely.
- Human approval required: Yes.
- Blocking or non-blocking: Blocking for pilot ADR authoring.
- Target phase: Phase 1 for location decision, Phase 2 for pilot ADR.
- Status: Proposed, newly added required decision.

Additional DR-013 requirements for approval:

- Candidate locations must be compared against discoverability, ownership, validation, and relationship to governance.
- Naming convention should include stable numeric or date-based identifiers and short slugs.
- Status model should include proposed, accepted, superseded, deprecated, and rejected.
- Ownership should name an architecture/governance owner and reviewer set.
- Approval process should require affected principle/standard owners when doctrine changes.
- Superseded ADRs must remain historical and link to replacements.
- An ADR index is required before multiple ADRs exist.
- ADRs are canonical for bounded architecture decisions, not for doctrine replacement.

## DR-014: Validator Scope And Ignored Paths

- Identifier: DR-014.
- Decision: Decide whether repository validators should be gitignore-aware or use explicit excluded paths for temporary/generated residue.
- Why it matters: Local validation can report false positives from ignored temporary files, especially in sandbox environments or future generated-output directories.
- Verified evidence: Independent review reported 111 issues under gitignored temporary residue in the sandbox environment; this does not indicate repository content defects.
- Available options: validate all files regardless of ignore state; honor gitignore; add explicit excluded paths; separate CI and local validation behavior; validate generated output only when explicitly included.
- Recommendation: document the gap now and defer validator changes. Before generated output is committed, decide inclusion/exclusion rules and compare CI versus local behavior.
- Consequences: Prevents false positives from being mistaken for content failures.
- Consequence of delay: Local sandbox validation may remain noisy in some environments.
- Human approval required: Yes.
- Blocking or non-blocking: Non-blocking for documentation-only work; blocking before generated wiki tooling or generated-output directories are introduced.
- Target phase: Phase 1 policy, Phase 5 enforcement.
- Status: Proposed, added from independent review.
