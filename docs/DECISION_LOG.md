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
