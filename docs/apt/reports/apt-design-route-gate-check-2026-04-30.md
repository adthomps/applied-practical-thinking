---
title: applied-practical-thinking Design Route Gate Check
version: v1
owner: APT
status: draft
audience: developer
visibility: internal
source: manual
last_updated: 2026-04-30
canonical_source: ../../../../apt-principles
---

# applied-practical-thinking Design Route Gate Check

## Purpose

Capture route/example-level evidence for Batch B against apt-principles design gates.

## Scope

- Routes reviewed:
  - apps/web/routes/DesignPlayground.tsx
  - apps/web/routes/DesignDocs.tsx
  - apps/web/routes/DesignPatterns.tsx
  - apps/web/routes/DesignKnowledgeEngine.tsx
  - apps/web/routes/portfolio/DesignSystem.tsx
- Supporting source reviewed:
  - apps/web/lib/contrast.ts

## Gate Evidence

| Gate | Status | Evidence | Notes |
|---|---|---|---|
| Primary/action color uses blue role | Partial | apps/web/routes/DesignDocs.tsx, apps/web/routes/DesignPatterns.tsx, apps/web/routes/portfolio/DesignSystem.tsx | Primary usage is strong in actions and cards; full route-by-route screenshot evidence still pending. |
| Restricted accent is not default CTA/hover/focus/active nav | Partial | apps/web/lib/contrast.ts, apps/web/routes/portfolio/DesignSystem.tsx | Contrast samples updated to remove accent as default button/nav selection examples. Remaining validation is visual QA plus generated-doc refresh checks. |
| Navigation/selection states use primary or neutral roles | Partial | apps/web/lib/contrast.ts | Route-level nav behavior is not fully enumerated in this artifact yet; add explicit state inventory in next pass. |
| Complete states (loading, error, empty, disabled, success) | Partial | apps/web/routes/DesignDocs.tsx, apps/web/routes/DesignPatterns.tsx | Loading/error states are explicit in design docs routes; remaining surfaces require per-route state inventory. |
| Token-based color usage | Pass | apps/web/scripts/design-audit.cjs output, apps/web/scripts/token-drift-check.cjs output | Existing scripts pass and support gate conformance. |
| Accessibility and focus consistency | Partial | apt-principles checklist references, route source review | No blocker found in this pass; formal keyboard/focus evidence not yet attached per route. |

## Changes Applied In This Pass

- Updated contrast sample semantics in apps/web/lib/contrast.ts:
  - Accent Button -> Accent Support Badge
  - Nav Selected (Dark) -> Nav Active Primary (Dark)
  - Nav Selected (Light) -> Nav Selected Neutral
  - Corresponding class/value mappings updated from accent default treatment to primary/secondary selected treatment where applicable.

## Validation Commands

- pnpm --dir apps/web run design-audit: pass
- pnpm --dir apps/web run token-drift-check: pass
- pnpm --dir apps/web run lint: pass
- pnpm --dir apps/web run validation-report: pass

## Open Batch B Work

1. Add per-route state inventory checklist evidence (loading, empty, success, error, disabled, permission where relevant).
2. Add focused desktop/mobile screenshot evidence for DesignPlayground and DesignSystem routes.
3. Refresh generated public/design artifacts and verify no semantic drift in published mirrors.

## Related Documents

- docs/apt/reports/apt-principles-conformance-matrix-2026-04-30.md
- docs/apt/reports/static/apt-principles-conformance-matrix-2026-04-30.json
- ../../../../apt-principles/references/design-lint-gates.json
- ../../../../apt-principles/design.md
