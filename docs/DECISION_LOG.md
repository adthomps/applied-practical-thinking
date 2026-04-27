# APT Decision Log

Documented deviations from APT design standards.

---

## Template

```markdown
### [DECISION-ID] Brief Title

**Date:** YYYY-MM-DD  
**Author:** Name  
**Status:** Proposed | Accepted | Deprecated

**Context:**
What is the situation that led to this decision?

**Decision:**
What was decided?

**Rationale:**
Why this approach over alternatives?

**Alternatives Considered:**
1. Alternative A - Why rejected
2. Alternative B - Why rejected

**Consequences:**
- Positive: What improves?
- Negative: What tradeoffs?
```

---

## Decisions

### [APT-001] Dark Mode as Default

**Date:** 2024-01-01  
**Status:** Accepted

**Context:**
APT targets technical audiences who often prefer dark interfaces.

**Decision:**
Apply `dark` class to HTML element by default. Light mode exists but is secondary.

**Rationale:**
Reduces eye strain for extended reading. Aligns with developer tool conventions.

**Alternatives Considered:**
1. System preference detection - Added complexity, inconsistent experience
2. Light mode default - Doesn't match target audience preference

**Consequences:**
- Positive: Consistent experience, reduced eye strain
- Negative: Must test both modes, light mode may feel secondary

---

### [APT-002] Muted Teal Accent Color

**Date:** 2025-01-22  
**Status:** Accepted (Updated)

**Context:**
Initial teal/cyan accent (165° 55% 45%) was too bright/electric for the calm, professional APT aesthetic. Needed to reduce visual intensity while maintaining the cosmic theme.

**Decision:**
Use muted teal (165° 45% 40%) as the accent color - same hue, reduced saturation and lightness.

**Rationale:**
- Maintains the teal identity that fits the cosmic/space theme
- Reduced saturation (55% → 45%) removes the "electric" quality
- Lower lightness (45% → 40%) creates better contrast ratios
- Still distinguishable from primary blue for visual hierarchy

**Alternatives Considered:**
1. Cool Cyan (180° 40% 42%) - Too close to generic "tech blue"
2. Soft Violet (260° 50% 55%) - Beautiful but too much departure from established identity
3. Steel Blue (200° 35% 48%) - Too similar to primary, loses accent purpose

**Consequences:**
- Positive: Calmer visual experience, better accessibility contrast, professional tone
- Negative: Slightly less "pop" on interactive elements (acceptable tradeoff)

---

### [APT-003] APT Architecture Refactor

**Date:** 2026-01-25  
**Author:** GitHub Copilot  
**Status:** Accepted

**Context:**
Project needed to align with APT Design Architecture for predictable delivery, clear boundaries, and future extensibility.

**Decision:**
- All frontend, docs, AI, and public assets moved under `apps/web/`.
- Created `apps/worker/` and `packages/` for backend/API and future shared logic.
- Static-first remains the primary delivery model, with active worker endpoints available where needed.
- All design/architecture docs now under `apps/web/docs/design/`.
- AI prompts under `apps/web/ai/prompts/`.

**Rationale:**
- Predictable delivery, clear ownership, and maintainability.
- Prepares for future monorepo/API expansion.

**Alternatives Considered:**
1. Keep flat structure — rejected: lacks boundaries, not future-proof.
2. Immediate monorepo split — rejected: unnecessary for current static site scope.

**Consequences:**
- Positive: Structure matches APT standards, easier future expansion.
- Negative: Requires path/config updates, possible short-term disruption.

---

### [APT-004] Unified Design Docs Versioning From v1

**Date:** 2026-04-05  
**Author:** GitHub Copilot  
**Status:** Accepted

**Context:**
Design doctrine artifacts needed a single versioning and publication contract that works for both internal editing and external consumption without breaking existing links.

**Decision:**
- Adopt semantic versioning for all governed design artifacts.
- Publish canonical public artifacts under `/docs/design/v{major}/`.
- Keep `/docs/design/*` as latest-stable compatibility aliases.
- Add a design docs manifest as the source of truth for slug/title/path/version metadata.
- Keep external visibility at latest stable major only by default.

**Rationale:**
- Creates one predictable lifecycle from v1 onward.
- Supports machine consumers and API routes through stable metadata.
- Prevents path breakage for existing external links during migration.

**Alternatives Considered:**
1. Date-only versioning - rejected: weak compatibility signaling for breaking changes.
2. Per-artifact custom versioning - rejected: too hard to operate and validate consistently.

**Consequences:**
- Positive: Clear release governance, safer evolution to v2+, and cleaner external contracts.
- Negative: Requires manifest upkeep and additional build validation discipline.

---

### [APT-005] Versioned Source Snapshots And Per-Doc Majoring

**Date:** 2026-04-05  
**Author:** Codex  
**Status:** Accepted

**Context:**
The initial v1 design docs publishing model copied authored files directly into public aliases and a single stable major folder. That approach could not preserve immutable historical originals once v2 started, and it did not support mixed major rollout per document.

**Decision:**
- Move governed design doc source-of-truth into versioned snapshots under `apps/web/docs/design/versions/v{major}/`.
- Expand the design docs manifest to per-document version arrays with `latestMajor`.
- Publish aliases from each document's `latestMajor`, while preserving canonical historical paths (for example `/docs/design/v1/*`).
- Validate markdown frontmatter metadata against manifest metadata during publish.

**Rationale:**
- Preserves v1 originals while allowing selective v2 adoption.
- Keeps external alias links stable while exposing explicit canonical version URLs.
- Enforces metadata integrity so UI and API contracts remain trustworthy.

**Alternatives Considered:**
1. Keep single-major manifest and overwrite aliases only - rejected: cannot preserve historical versions safely.
2. Store history only in git tags - rejected: runtime/API consumers need durable versioned paths.

**Consequences:**
- Positive: Safe mixed-major rollout, clearer public metadata, deterministic publishing.
- Negative: Higher manifest/frontmatter maintenance burden and stricter publish validation.

---

### [APT-006] Design Lint Critical Gate And Core Doctrine v2 Kickoff

**Date:** 2026-04-05  
**Author:** Codex  
**Status:** Accepted

**Context:**
The initial lint checklist was useful but too compact for consistent review outcomes. We needed a stricter, explicit quality gate and a controlled way to begin v2 doctrine updates without forcing all docs to move majors at once.

**Decision:**
- Adopt the 12-section APT Design System Lint Checklist as the canonical lint contract (markdown + machine-readable JSON).
- Treat unresolved critical checklist failures as merge blockers unless a documented exception is linked in this decision log.
- Kick off doctrine v2 for `Design Thinking`, `Design System`, and `Design Architecture` only, while keeping other doctrine docs on v1.
- Keep v2 entries in `candidate` status until route/checklist verification is complete.

**Rationale:**
- Improves review consistency across humans and AI agents.
- Makes pass/fail criteria explicit and auditable.
- Preserves per-doc majoring flexibility while v2 rollout is still partial.

**Alternatives Considered:**
1. Keep checklist advisory-only - rejected: did not prevent drift.
2. Force all doctrine docs to v2 immediately - rejected: higher migration risk and unnecessary churn.

**Consequences:**
- Positive: Stronger quality gate, clearer governance, safer incremental v2 rollout.
- Negative: More checklist/metadata maintenance overhead and stricter PR requirements.

---

### [APT-007] Architecture v2 Refinement With Enforceable References

**Date:** 2026-04-05  
**Author:** Codex  
**Status:** Accepted

**Context:**
Architecture doctrine was directionally strong but still too principle-heavy for consistent enforcement in reviews and AI-assisted implementation. We needed explicit guard rails, machine-readable references, and stronger handoff alignment without forcing a new major.

**Decision:**
- Extend `APT-DESIGN-ARCHITECTURE` v2 as `candidate` with stricter MUST/NEVER boundary rules, deploy authority matrix, service-flow reference, and critical architecture gate language.
- Add `APT-ARCHITECTURE-EXAMPLES.md` and `APT-ARCHITECTURE-REFERENCE.json` as external-first architecture enforcement artifacts.
- Add those artifacts to manifest and AI review bundle handoff contracts.
- Update architecture-related AI prompts with findings-first architecture gate behavior and merge-block policy for unresolved critical violations.

**Rationale:**
- Converts architecture from advisory guidance into enforceable operational contract.
- Improves review consistency for humans and AI by pairing narrative doctrine with machine-readable checks.
- Maintains partial v2 rollout safety without introducing v3 churn.

**Alternatives Considered:**
1. Keep architecture as principle-only doctrine - rejected: inconsistent review outcomes and drift risk.
2. Start architecture v3 immediately - rejected: unnecessary major churn while v2 is still candidate.

**Consequences:**
- Positive: Stronger architecture governance, clearer handoff references, better AI review determinism.
- Negative: Additional manifest/bundle maintenance and stricter review discipline required.

---

### [APT-008] Documentation Architecture Standardization (Definition-First)

**Date:** 2026-04-05  
**Author:** Codex  
**Status:** Accepted

**Context:**
Documentation rules were present across multiple files but not yet defined as a first-class architecture standard with enforceable contracts, examples, and machine-readable checks.

**Decision:**
- Add Documentation Architecture as a major section in `APT-DESIGN-ARCHITECTURE` v2.
- Introduce three external-first doctrine artifacts:
  - `APT-ARCHITECTURE-DOC.md`
  - `APT-ARCHITECTURE-DOC-EXAMPLES.md`
  - `APT-ARCHITECTURE-DOC-REFERENCE.json`
- Keep current public docs source under `apps/web/docs/design/` for now.
- Define `apps/docs` and OpenAPI-generated API reference model as target-state contracts (planned, not yet active).
- Add documentation-architecture checks to review bundle and AI prompt reading-order/gating contracts.

**Rationale:**
- Makes documentation a formal architecture layer rather than implicit process guidance.
- Reduces internal/external leakage and source-of-truth drift.
- Enables decision-safe migration to `apps/docs` later without forcing immediate file-structure churn.

**Alternatives Considered:**
1. Immediate migration to `apps/docs` in same pass - rejected: high change surface and avoidable risk.
2. Keep documentation architecture as informal guidance - rejected: weak enforceability and inconsistent reviews.

**Consequences:**
- Positive: Clear documentation architecture contract with enforceable review gates and machine-readable policy.
- Negative: Additional doctrine/manifest maintenance and phased migration coordination required.

---

### [APT-009] Doctrine Integrity Enforcement (Alias Sync + Metadata Contract)

**Date:** 2026-04-05  
**Author:** Codex  
**Status:** Accepted

**Context:**
Audited doctrine surfaces showed drift between alias docs and manifest-selected latest sources, plus inconsistent metadata treatment. This reduced trust in review outcomes and AI/tool-driven governance checks.

**Decision:**
- Enforce `alias == latest version source` for all manifest-governed docs via automated verification and sync commands.
- Add audited doctrine metadata verification across the six governed audit surfaces:
  - `APT-DESIGN-THINKING.md`
  - `APT-DESIGN-SYSTEM.md`
  - `APT-DESIGN-ARCHITECTURE.md`
  - `APT-DESIGN-SYSTEMS.md`
  - `APT-CONTENT-STRATEGY.md`
  - `APT-AI-REVIEW-BUNDLE.md`
- Adopt strict-frontmatter governance for the audited set with no exceptions in this phase.
- Normalize status vocabulary to include `candidate`.

**Rationale:**
- Eliminates compatibility alias drift as a hidden source of doctrine inconsistency.
- Makes metadata contract checks predictable for both human reviewers and AI tooling.
- Aligns policy language with actual rollout states already used in v2 governance.

**Alternatives Considered:**
1. Keep alias syncing as informal/manual process - rejected: high drift risk.
2. Allow metadata exceptions in audited set - rejected: weakens contract clarity at rollout stage.

**Consequences:**
- Positive: deterministic doctrine integrity checks and stronger merge-gate enforcement.
- Negative: stricter pre-merge discipline and additional validation steps in local workflow/CI.

---

### [APT-010] Architecture Doctrine Consolidation (Documentation Architecture Merge)

**Date:** 2026-04-05  
**Author:** Codex  
**Status:** Accepted

**Context:**
`APT-DESIGN-ARCHITECTURE.md` and `APT-ARCHITECTURE-DOC.md` both described documentation architecture policy, which created duplicate authority and review ambiguity.

**Decision:**
- Consolidate doctrine authority into `APT-DESIGN-ARCHITECTURE.md` (Documentation Architecture section).
- Keep `APT-ARCHITECTURE-DOC.md` as a compatibility shim for stable URLs and historical references.
- Retain `APT-ARCHITECTURE-DOC-EXAMPLES.md` and `APT-ARCHITECTURE-DOC-REFERENCE.json` as supporting artifacts that reference the canonical section.
- Update prompts, review bundle metadata, and governance/index docs to point to the consolidated source of truth.

**Rationale:**
- Removes duplicated doctrine ownership while preserving backward-compatible links.
- Keeps external/public URL contracts stable.
- Preserves compact doctrine structure with machine-readable and examples companions.

**Alternatives Considered:**
1. Keep duplicate doctrine files authoritative - rejected: unclear rule ownership and higher drift risk.
2. Delete `APT-ARCHITECTURE-DOC.md` outright - rejected: breaks stable links and external references.

**Consequences:**
- Positive: single authoritative doctrine path with lower review ambiguity.
- Negative: requires ongoing shim wording discipline so no second authority emerges.

---

### [APT-011] Design Docs 2-Zone Source Model (Publish-Generated Aliases)

**Date:** 2026-04-05  
**Author:** Codex  
**Status:** Accepted

**Context:**
The source tree previously included compatibility alias files alongside versioned doctrine and static support artifacts. That layout increased source noise and made contributors treat aliases like authored files.

**Decision:**
- Adopt a strict 2-zone source model for design docs:
  - `apps/web/docs/design/versions/` for governed authored doctrine
  - `apps/web/docs/design/static/` for authored support contracts
- Keep `apps/web/docs/design/APT-DESIGN-DOCS-MANIFEST.json` as the control plane for per-doc major routing and publish behavior.
- Remove source alias files from `apps/web/docs/design/` root.
- Keep public compatibility URLs by generating aliases at publish time into `/docs/design/*` (from versioned sources), while canonical majors continue at `/docs/design/v*/...`.
- Update governance checks to enforce source-alias absence and metadata compliance.

**Rationale:**
- Reduces authored-source duplication and review noise.
- Clarifies contributor workflow: edit only `versions/*` and `static/*`.
- Preserves external/public URL stability without reintroducing source alias drift.

**Alternatives Considered:**
1. Keep source aliases with stricter sync checks - rejected: continued source clutter and contributor confusion.
2. Remove aliases from both source and public URLs - rejected: breaks compatibility contracts for consumers.

**Consequences:**
- Positive: cleaner source structure, simpler edit model, unchanged public URL contracts.
- Negative: docs/prompts/governance wording needed a broad alignment sweep; alias validation semantics changed from drift-check to source-absence policy.

---

### [APT-012] Phased Markdown Metadata Enforcement (Project-Wide)

**Date:** 2026-04-05  
**Author:** Codex  
**Status:** Accepted

**Context:**
After adopting the design-docs 2-zone model, repo-wide documentation metadata remained inconsistent outside governed doctrine files. Immediate global blocking would create large migration risk.

**Decision:**
- Keep strict metadata enforcement for manifest-governed design doctrine artifacts.
- Add a report-only project-wide `frontmatter-report` governance step now.
- Enforce markdown metadata in phased waves:
  - Wave 1 (2026-04-20): `apps/web/docs/design/static/*.md`, `apps/web/ai/prompts/*.md`
  - Wave 2 (2026-05-15): `docs/*.md` and root operational docs
  - Wave 3 (2026-06-15): `apps/worker/src/ai/docs/*.md`, `.github/*.md`
- Maintain explicit rollout exceptions in `docs/DOCUMENTATION_METADATA_ROLLOUT.md`.

**Rationale:**
- Preserves merge velocity while removing ambiguity about enforcement direction.
- Provides deterministic visibility now, strict blocking later, and clear ownership by wave.

**Alternatives Considered:**
1. Immediate global strict enforcement - rejected: high churn/risk in one pass.
2. Keep metadata best-effort indefinitely - rejected: weak governance and drift risk.

**Consequences:**
- Positive: consistent roadmap to full metadata compliance with low disruption.
- Negative: temporary dual state where some scopes are report-only until enforcement dates.

---

### [APT-013] Blue Primary With Muted Teal Accent

**Date:** 2026-04-26
**Author:** Codex
**Status:** Accepted

**Context:**
Canonical APT principles drifted from the web app's accepted design system by describing mint/teal as the primary emphasis and action color. The runtime app already uses blue for brand, primary actions, links, focus rings, and high-frequency emphasis, with muted teal reserved for selected and interactive accent states.

**Decision:**
Keep blue as the primary brand/action color. Keep muted teal as a restrained accent for active navigation, selected states, hover or focus surfaces, badges and tags, large callouts, chart series, and success states where relevant.

**Rationale:**
- Blue anchors the calm, technical Applied Practical Thinking identity.
- Muted teal provides useful contrast without becoming the default CTA color.
- The hierarchy matches the v2 design system, runtime CSS tokens, shared APT primitives, and current app surfaces.

**Alternatives Considered:**
1. Make teal the default primary action color - rejected: conflicts with current runtime behavior and would make the interface feel less anchored.
2. Split brand blue from action teal - rejected for now: adds unnecessary hierarchy complexity without a product need.

**Consequences:**
- Positive: Canonical doctrine, public generated docs, and runtime token intent align.
- Negative: Future teal-heavy experiments need an explicit decision if they promote teal beyond accent usage.
