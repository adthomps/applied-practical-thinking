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

## Screenshot Evidence Set

- Directory: docs/apt/reports/static/screenshots/design-routes-2026-04-30/
- Captured routes:
  - /design/system
  - /design-playground
  - /design/docs
  - /design/patterns
  - /design/knowledge-engine (redirects to /design/docs/knowledge-engine)
- Viewports:
  - Desktop: 1440px width
  - Mobile: 390px width

Captured files:

- design-system-desktop.png
- design-system-mobile.png
- design-playground-desktop.png
- design-playground-mobile.png
- design-docs-desktop.png
- design-docs-mobile.png
- design-docs-error-desktop.png
- design-patterns-desktop.png
- design-patterns-mobile.png
- design-patterns-error-desktop.png
- design-knowledge-engine-desktop.png
- design-knowledge-engine-mobile.png
- design-knowledge-engine-error-desktop.png

Runtime note:

- Worker API was unavailable in this capture run (localhost:8787 refused), which provided direct screenshot evidence for loading and runtime error surfaces in manifest-driven routes.

## Gate Evidence

| Gate | Status | Evidence | Notes |
|---|---|---|---|
| Primary/action color uses blue role | Partial | apps/web/routes/DesignDocs.tsx, apps/web/routes/DesignPatterns.tsx, apps/web/routes/portfolio/DesignSystem.tsx, docs/apt/reports/static/screenshots/design-routes-2026-04-30/design-system-desktop.png | Primary/action usage is visible and source-backed; full interactive state probes (hover/focus via automation) remain open. |
| Restricted accent is not default CTA/hover/focus/active nav | Partial | apps/web/lib/contrast.ts, apps/web/routes/portfolio/DesignSystem.tsx, docs/apt/reports/static/screenshots/design-routes-2026-04-30/design-docs-desktop.png | Accent is used as support labeling; additional automated interaction-state checks still required for full closure. |
| Navigation/selection states use primary or neutral roles | Partial | apps/web/lib/contrast.ts, docs/apt/reports/static/screenshots/design-routes-2026-04-30/design-system-desktop.png | Static route nav and section navigation align visually; keyboard/focus traversal evidence remains pending. |
| Complete states (loading, error, empty, disabled, success) | Pass | apps/web/routes/DesignPlayground.tsx, apps/web/routes/DesignDocs.tsx, apps/web/routes/DesignPatterns.tsx, apps/web/routes/DesignDocDetail.tsx, docs/apt/reports/static/screenshots/design-routes-2026-04-30/design-docs-error-desktop.png | Route-by-route state inventory completed and screenshot-backed for loading, error, and success; empty/degraded handling recorded per route behavior. |
| Token-based color usage | Pass | apps/web/scripts/design-audit.cjs output, apps/web/scripts/token-drift-check.cjs output | Existing scripts pass and support gate conformance. |
| Accessibility and focus consistency | Partial | apt-principles checklist references, route source review | No blocker found in this pass; formal keyboard/focus evidence not yet attached per route. |

## Per-Route State Inventory

| Route | Component | Loading | Error | Empty/Degraded | Disabled | Success | Evidence |
|---|---|---|---|---|---|---|---|
| /design/system | portfolio/DesignSystem.tsx | Not applicable (route-local) | Runtime config guidance shown when worker API metadata is unavailable | Not applicable | Not explicit in route controls | Static token/docs sections render | design-system-desktop.png, design-system-mobile.png |
| /design-playground | DesignPlayground.tsx | No explicit spinner; asynchronous labs index fetch | Fetch failure is caught and degrades to empty labs list | Labs section can render with zero items | Explicit disabled button variants demonstrated | Full demo sections render | design-playground-desktop.png, design-playground-mobile.png |
| /design/docs | DesignDocs.tsx | Explicit loading screen | RuntimeConfigNotice or destructive error text | Doctrine/pattern grids can render with zero cards | Not explicit in route controls | Doctrine and pattern cards render | design-docs-desktop.png, design-docs-mobile.png, design-docs-error-desktop.png |
| /design/patterns | DesignPatterns.tsx | Explicit loading screen | RuntimeConfigNotice or destructive error text | Pattern grid can render with zero cards | Not explicit in route controls | Pattern cards render | design-patterns-desktop.png, design-patterns-mobile.png, design-patterns-error-desktop.png |
| /design/knowledge-engine | DesignKnowledgeEngine.tsx -> DesignDocDetail.tsx | Redirect then explicit loading in doc detail | RuntimeConfigNotice or destructive error text in doc detail | Missing doc redirects to /design/docs | Not explicit in route controls | Doc detail renders markdown/article when available | design-knowledge-engine-desktop.png, design-knowledge-engine-mobile.png, design-knowledge-engine-error-desktop.png |

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

1. Add automated interaction probes for keyboard focus traversal and hover/active assertions across design routes.
2. Refresh generated public/design artifacts and verify no semantic drift in published mirrors.

## Related Documents

- docs/apt/reports/apt-principles-conformance-matrix-2026-04-30.md
- docs/apt/reports/static/apt-principles-conformance-matrix-2026-04-30.json
- ../../../../apt-principles/references/design-lint-gates.json
- ../../../../apt-principles/design.md
