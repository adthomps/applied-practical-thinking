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

### [APT-002] APT Architecture Refactor

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
