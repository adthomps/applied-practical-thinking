---
title: Refactor Independent Architecture Review
kind: assessment
domain: architecture
status: active
owner: APT
last_updated: 2026-07-11
source_paths: ["apt-principles-agents/docs/refactor/independent-review.md"]
---

# Independent Architecture Review

Independent review of the refactor assessment in `docs/refactor/`. Claims were verified against the repository directly, not taken from the assessment. Verification evidence: file counts (`principles` 140, `skills` 144, `agents` 80, `platforms` 103, `prompts` 84, `templates` 93, `examples` 75), source ledger 505/505 with sha256, 75 active agents and 142 `SKILL.md` files, 89 active markdown files still naming former root doctrine files, stale `docs/diagrams/repository-structure.md`, and `references/` contents as listed. The assessment's factual base is largely accurate. The findings below are where it is wrong, overstated, or incomplete.

## 1. Repository Classification

- Finding: The label "partially consolidated APT platform" overstates what exists. Verified evidence supports "documentation and asset repository with distribution tooling." There is no runtime, no service, no independently consumable package, and no agent execution layer. `target-architecture.md` itself concedes this in its Packages Decision section, then the other documents continue using "platform."
- Evidence: `package.json` is private repo tooling with script entrypoints only; `scripts/apt-assets.mjs` is a file-copy lifecycle, not a runtime; no workspaces, no served APIs.
- Severity: Medium.
- Why it matters: Classification drives roadmap gravity. "Platform" framing is what pulls seven conceptual CLI commands, MCP servers, and knowledge services into `distribution-model.md`. If the classification is wrong, effort flows toward packaging and generation pipelines instead of content quality.
- Recommended correction: Adopt the classification "documentation and asset repository with distribution tooling; platform is an aspiration, not a current state" in the Phase 1 approval docs. Every future-directory decision should cite the current classification, not the aspiration.
- Blocking: Non-blocking (wording change, but required in Phase 1 approval text).

## 2. Authority Hierarchy

- Finding: The hierarchy is directionally correct but has three unresolved seams. (a) Tier 2 merges principles and standards into one tier while `current-state-inventory.md` separately states standards sit "below principles when judgment conflicts" — the precedence rule exists but is not in the hierarchy document. (b) The relationship between ADRs (tier 3) and doctrine (tier 2) is undefined for the evolution case: an ADR cannot override a principle, but ADRs are the mechanism by which doctrine changes get approved. (c) The conflict table's "Root instruction vs canonical doctrine → Depends on layer" is the only non-decidable row in the table.
- Evidence: `canonical-source-hierarchy.md` Authority Order and Conflict Resolution table; `current-state-inventory.md` `standards/` row.
- Severity: Medium.
- Why it matters: The hierarchy is Blocking for the pilot (DR-001). Approving it with an ambiguous principle/standard precedence and an undefined ADR-amendment path means the first real conflict will be resolved ad hoc, defeating the purpose of the hierarchy.
- Recommended correction: Before DR-001 approval, add: principles outrank standards on judgment conflicts, standards outrank principles on mechanical practice within their scope; ADRs never override doctrine directly — an approved ADR that contradicts doctrine creates a mandatory doctrine amendment task; replace "Depends on layer" with "canonical doctrine wins on policy, root instruction wins on immediate execution mechanics, and any residual conflict is recorded and escalated."
- Blocking: Blocking for DR-001 approval; a one-document fix.

- Finding (enforceability): Nothing enforces the hierarchy mechanically. All enforcement (adapter parity, generated markers, scoped-instruction checks) is future work. There is also no inventory of scoped instruction surfaces, even though `platforms/github-copilot/source/instructions/*` already contains directory-scoped policy-adjacent instructions.
- Severity: Low for a documentation phase; Medium by Phase 4.
- Recommended correction: Label the hierarchy as convention-until-validated in Phase 1, and add a scoped-instruction inventory as a Phase 2 deliverable.
- Blocking: Non-blocking.

## 3. Asset Taxonomy

- Finding: The 12-type taxonomy is conceptually clean but not exhaustive against the repository it describes. Prompts (84 files, top-level directory), checklists, manifests, context/context-packs, and routing policies have no taxonomy type. The inventory table maps them ad hoc. "Generated knowledge" is a property (provenance) masquerading as a kind — any asset type can be generated.
- Evidence: `current-state-inventory.md` Asset Taxonomy table versus actual top level: `prompts/`, `checklists/`, `manifests/`, `context/`, `context-packs/`, `routing/`.
- Severity: High, because DR-002 is Blocking for the pilot and the taxonomy as written cannot classify roughly a third of the repository's first-class directories.
- Why it matters: A taxonomy approved with known coverage gaps invites the same ad hoc classification it was meant to end. The review question "do prompts require their own category" is answered by the repository itself: 84 files with their own catalog generation say yes.
- Recommended correction: Either add Prompt, Checklist, Manifest, Context Pack, and Routing Policy as explicit types, or restructure as two axes: kind (what it is) plus properties (canonical/derived, human/generated, installable/local). Remove "Generated knowledge" as a kind; make generated a marked property per the existing generated-content controls. Routing definitions do not need a separate top-level concept beyond a Routing Policy type; they are operational policy, as the inventory already says.
- Blocking: Blocking for DR-002 approval.

## 4. Skills Versus Workflows

- Finding: The skill/workflow line ("one bounded capability" vs "coordination") is workable, and the descriptive-schema-first recommendation in DR-005 is right. The weak point is the workflow/playbook boundary: "human-oriented guidance for a recurring operational situation" also describes a coordinated multi-stage document. As written, the same asset could be filed either way.
- Evidence: Taxonomy definitions in `current-state-inventory.md`; existing workflow-shaped assets confirmed at `examples/workflows/` (7 files including `spec-to-story-flow.md`, `preview-to-prod-flow.md`, `repository-drift-repair-flow.md`) and `prompts/planning/*`.
- Severity: Medium.
- Why it matters: DR-005 is Blocking for the pilot workflow, and the pilot's centerpiece workflow (Market-to-Validated-Concept) does not exist yet — it will be authored against whatever boundary is approved.
- Recommended correction: Adopt one discriminator: a workflow declares machine-checkable references (skills, agent roles, decision/approval gates, inputs, outputs) and is validatable against a workflow contract; a playbook is narrative guidance with no reference contract. Add: workflows are documentation-only until an executable state model is separately approved; workflows reference agent roles but agents do not own workflows; workflows reference skills by path and never inline skill bodies; workflow state is out of scope for the descriptive schema. No top-level `workflows/` yet — agreed with the assessment; the pilot workflow can live under existing paths (e.g., docs or examples) marked as pilot.
- Blocking: Blocking for DR-005 approval; resolvable with the discriminator above.

## 5. `references/` Versus `schemas/`

- Finding: The recommendation (keep `references/` stable, defer `schemas/`) is correct, but the supporting evidence overstates coupling. `references/installation.schema.json` has no script consumer at all — `apt-assets.mjs` hard-codes `schemaVersion !== 1` and never loads the schema; the only reference to it is from `references/agent-standards-contract.json`. `project-profile.schema.json` is consumed by exactly two scripts (`validate-project-profile.mjs`, `sweep-project-profiles.mjs`). The claim of "Direct validator use for installation record" is inaccurate for the installation schema.
- Evidence: `grep` across `scripts/` for schema references; `apt-assets.mjs:208`.
- Severity: Medium — the conclusion survives, but a dead schema being cited as a consumer-coupling argument is exactly the kind of unverified assumption this repo's doctrine warns against.
- Why it matters: If `installation.schema.json` validates nothing, it is documentation wearing a schema extension, and it can silently drift from the real record format `apt-assets.mjs` writes.
- Recommended correction: During the pilot, either wire `apt-assets.mjs`/tests to validate `.apt/installation.json` against the schema or relabel the file as a reference contract. Adopt this decision rule for `schemas/`: create it only when all three hold — (1) at least one schema is enforced in CI against at least one asset class, (2) at least two schema files have independent script consumers, (3) redirect or compatibility stubs for old `references/` paths are specified. Until then, schemas stay in `references/` near their consumers.
- Blocking: Non-blocking for the pilot; the concrete rule should be recorded in DR-003.

## 6. Adapter Strategy

- Finding: The three-part model (shared generated core, generated mapping, handwritten extension) is coherent, and deferring generation to Phase 4 is right. Two gaps: (a) no cost case — no generator exists, and the assessment never weighs building/owning a generation pipeline against the simpler alternative of thin handwritten root files that point to canonical sources (the root files are already thin); (b) `platforms/github-copilot/distribution/` is committed output with no generator contract, so today it is hand-maintained-as-if-generated, which is the worst of both models and the current live drift risk.
- Evidence: `platforms/github-copilot/` contains both `source/` and `distribution/`; root `AGENTS.md`/`CLAUDE.md`/`CODEX.md`/`GEMINI.md` are short pointer-style files; no generator scripts exist in `scripts/`.
- Severity: Medium.
- Why it matters: Generation is not automatically superior. A generator adds a pipeline, markers, hash checks, and overwrite risk to protect content that could instead be a single source with references. If the pilot "documents mapping only" (as the assessment says), that documentation should include the do-nothing/thin-pointer option evaluated honestly.
- Recommended correction: Phase 4 must open with an explicit comparison: generator vs thin-pointer-plus-parity-check. Before any generation, require: generated markers, source hash, a rule that generation never touches files lacking the marker (protects handwritten extensions), and a documented editable-vs-generated split for Copilot source/distribution. Existing installers can distribute generated files unchanged, so no installer rework is implied — the assessment is right on that point.
- Blocking: Non-blocking for the documentation pilot.

## 7. generated wiki tooling

- Finding: The safety design is good (untrusted input, provenance, failure-preservation, exclusion lists), but the value case is weak. The repository already has four navigation surfaces: README hierarchy, `context-packs/`, generated catalogs in `docs/`, and diagrams. generated wiki tooling would be a fifth, with review burden the assessment itself flags as a risk (DR-012). No consumer is identified.
- Evidence: No `generated-wiki` paths exist in the active tree (verified); `context-packs/` has 8 packs; `docs/` contains generated catalogs with row-count validation.
- Severity: Low (because it is already deferred to Phase 5).
- Why it matters: Every generated surface added is a permanent review and staleness liability. Additional live evidence from this review: the repository's link validator scans any directory not explicitly excluded — installer-test residue under gitignored `.tmp/` produced 111 validation issues in this review environment. A committed `docs/generated-wiki/` would enter link validation the same way; the commit policy must account for validator exclusion rules, which the design does not mention.
- Recommended correction: Do not implement generated wiki tooling in the pilot. Keep the boundary ADR in the pilot (it is cheap and settles authority questions). After the pilot, if pursued at all, test in an isolated branch with a named consumer and a validator-exclusion rule; rejection must remain a live option. Recommendation among the offered options: deferred until after the pilot, first trial in an isolated branch.
- Blocking: Non-blocking.

## 8. OKF

- Finding: The design contradicts its own selectivity principle. It recommends "no bulk conversion" and "selective portable knowledge," then specifies roughly 26 concept types with metadata and relationship models — schema governance for a system with zero consumers. No retrieval system, MCP server, or downstream tool consumes OKF today. Markdown front matter already exists on every active file and is already validated (`kind`, `domain`, `status`, `owner`, `last_updated`, `source_paths`).
- Evidence: `okf-design.md` Recommended OKF Concept Types table (26 rows); `references/knowledge-contracts.json` exists but no `knowledge/` tree; `scripts/validate-repository.mjs` metadata checks.
- Severity: High for the design document, Low for the plan (because generation is deferred to Phase 5).
- Why it matters: A 26-type ontology approved now becomes the de facto schema before any consumer proves what is needed. This is premature schema governance and pure symmetry-driven architecture — the exact failure mode `target-architecture.md` warns against.
- Recommended correction: Cut the pilot-facing concept set to at most five types aligned to the pilot slice: Principle, Skill, Agent, Workflow, Decision. Park the remaining types as an unapproved appendix. Require a named consumer before any OKF generation. Minimum viable experiment, only if a consumer is named: hand-author five canonical OKF records for the pilot slice and have the consumer read them; no generator. Otherwise defer OKF entirely — front matter is sufficient for the pilot.
- Blocking: Blocking for DR-008 as currently written; non-blocking once the concept set is cut.

## 9. Pilot Design

- Finding: The pilot is presented as a validation slice, but four of its five named assets do not exist. Verified: Voice of Customer Analysis exists (`skills/product/voice-of-customer/SKILL.md`, 60 lines, mature and validated). Working Backwards exists only as a section of `principles/thinking/README.md` plus `context/working-backwards/` and a checklist — there is no canonical Working Backwards principle file. Product Discovery Agent does not exist (DR-011 admits this). Market-to-Validated-Concept appears nowhere in the repository. The boundary ADR does not exist and the repository has no ADR home directory (only templates: `templates/ADR-TEMPLATE.md`, `templates/decision-records/ADR.md`).
- Evidence: Direct file inspection and repository-wide grep for "market-to-validated" and "product discovery" (zero hits outside `docs/refactor/`).
- Severity: High.
- Why it matters: A pilot that must author a new principle, a new agent, a new workflow, and a new ADR is not testing the operating model against existing content — it is a content-creation project wearing a pilot's name, with correspondingly larger scope, review load, and rollback surface. It also does not test adapter generation (deferred), barely tests validation (new files only), and tests context selection only if a task packet is actually built.
- Recommended correction: Re-scope to maximize use of existing assets. The assessment overlooked that `agents/product/apt-voice-of-customer-analyst.md` already exists and pairs exactly with the existing VoC skill. Revised slice: (1) existing skill `voice-of-customer`; (2) existing agent `apt-voice-of-customer-analyst` (resolves DR-011 without creating anything); (3) one new descriptive workflow, Market-to-Validated-Concept, authored as the single net-new asset and the actual test of the workflow contract; (4) the boundary ADR, which also decides the ADR home. Defer the Working Backwards principle extraction to Phase 6 content work. Add measurable exit criteria (see `implementation-readiness.md`). Keep the pilot to one commit or one tightly grouped set so a single revert works — plausible only with this narrowing.
- Blocking: Blocking — pilot scope must be corrected before Phase 2 starts (not before Phase 1).

## 10. Migration Plan

- Finding: The phase structure is sound, reversible, and honestly gated. Three gaps. (a) Phase 1 says "possibly a future ADR location" in passing — creating an ADR home is a structural decision that is nowhere in the decision register. (b) Phase 2's exit criterion ("pilot proves the taxonomy and source hierarchy are usable") is not measurable. (c) Deferring all stale-reference work to Phase 6 leaves actively harmful instructions live for the whole program: `CONTRIBUTING.md` line 156 tells contributors not to rename "canonical root files (`thinking.md`, `design.md`, etc.)" — files that no longer exist — and `docs/diagrams/repository-structure.md` presents the obsolete root-doctrine layout as current.
- Evidence: `migration-plan.md` Phases 1–6; `CONTRIBUTING.md:23,32,156`; diagram header claims to show the current tree.
- Severity: Medium.
- Why it matters: (a) is hidden scope; (b) makes pilot success a judgment call; (c) means the two most misleading documents in the repository stay misleading through five phases despite being a two-file, low-risk fix.
- Recommended correction: Add DR-013 (ADR home location) to the decision register. Give Phase 2 measurable exit criteria. Authorize a targeted micro-cleanup of exactly `CONTRIBUTING.md` and `docs/diagrams/repository-structure.md` as part of Phase 1 or immediately after — two files, no path changes, single revert. No other Phase 6 work moves earlier. No hidden file movement, irreversible steps, premature packaging, or premature generation was found in any phase — the plan is clean on those axes.
- Blocking: Non-blocking, except that DR-013 should exist before Phase 1 sign-off.

## 11. Context Efficiency

- Finding: The read-order model and the Maximum Context Guidance table are immediately usable and cost nothing. The task-packet proposal, though, adds yet another asset type (absent from the taxonomy, see Finding 3) with a schema, review requirement, and no consumer — the same premature-schema pattern as OKF. Counting them, the design would maintain five navigation layers (context packs, indexes, task packets, OKF, generated wiki tooling) whose combined maintenance cost plausibly exceeds their token savings.
- Evidence: `context-efficiency.md` Task Packet Structure and recommended metadata; taxonomy table lacks a task-packet type.
- Severity: Low.
- Why it matters: Context efficiency achieved through more maintained artifacts is self-defeating unless each artifact has a consumer and a staleness owner.
- Recommended correction: Minimum viable context packet for the pilot: `AGENTS.md` + one existing context pack + the pilot's canonical files, listed in a plain section of the pilot ADR — no new schema, no new asset type. Adopt the Maximum Context Guidance table as-is. Defer the task-packet schema until an agent framework actually consumes packets.
- Blocking: Non-blocking.

## 12. Security And Trust

- Finding: The generated-content controls (markers, provenance, review status, authority labels, untrusted-input stance, circular-generation prevention, failure-preservation) are the strongest part of the assessment and are consistent across all five documents that touch them. Gaps: no secret-scanning mechanism is named, only an intention; none of the controls are enforced by any current validator (all enforcement is future work); and validator directory-exclusion boundaries are demonstrably fragile — gitignored `.tmp/` installer-test residue produced 111 link-validation failures in this review environment, proving that any future generated-output directory needs an explicit validator-exclusion or inclusion decision, which no document specifies. Prompt-injection controls are stated as policy but have no described mechanism.
- Evidence: `.tmp/installer-tests/` residue vs `scripts/validate-repository.mjs` scanning behavior; `risks-and-decisions.md` safety requirements; `okf-design.md` operating model.
- Severity: Low for Phases 0–2 (documentation only, nothing generated, nothing installed cross-repo). Medium-High as a precondition for Phase 5.
- Why it matters: For a docs-only first phase there is no blocking security issue. But approving Phase 5 later on the strength of paper controls would be a mistake — the controls need named tools (secret scanner, injection filter, exclusion config) and at least one validator that enforces generated markers.
- Recommended correction: Add to Phase 5 preconditions: named secret-scanning tool, validator exclusion/inclusion rule for generated output paths, a generated-marker check in `validate-repository.mjs`, and a written injection-handling rule for any generator consuming repository text. No changes needed for Phases 0–2.
- Blocking: Non-blocking for the pilot; blocking for Phase 5 as preconditions.

## Cross-Document Consistency

The twelve documents are internally consistent to an unusual degree: authority hierarchy, generated-content controls, non-deletion rules, and phase gating are stated identically or compatibly everywhere checked. The two real inconsistencies found: principles/standards precedence (Finding 2) and the pilot naming assets the inventory's own DR-011 knows don't exist without the migration plan's pilot section carrying the same caveat prominently (Finding 9). Evidence quality is high — of the assessment's checkable factual claims, all verified accurately except the `references/` consumer claim (Finding 5) and the "required top-level directories" description of the validator (it checks required root files, not directories; trivial).
