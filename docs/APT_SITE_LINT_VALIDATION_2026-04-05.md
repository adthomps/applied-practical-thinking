---
title: APT Site Lint Validation Report
version: v2
status: candidate
audience: developer
visibility: public
source: manual
---
# APT Site Lint Validation Report

Date: 2026-04-05
Scope: `apps/web` + shared primitives in `packages/ui`
Official lint gate: `apps/web` -> `eslint .`

## Recommendation
Pass with fixes

Official ESLint now runs successfully via pnpm/corepack and is clean after targeted fixes in this pass.

## Toolchain Recovery
- Restored package-manager execution via `corepack pnpm`.
- Repaired workspace dependencies with `corepack pnpm install`.
- Confirmed official lint path works: `corepack pnpm --dir apps/web lint`.

## Findings (Severity-Ordered)

### High
1. React effect state update lint error (fixed)
- Checklist mapping: `12. AI / Agent Compliance`, `7. Components & Pattern Reuse`
- File: `apps/web/hooks/useDesignDocVersion.ts`
- Issue: synchronous `setState` in effect body triggered `react-hooks/set-state-in-effect`.
- Fix applied: moved to resolved-state pattern keyed by slug without synchronous effect-body state writes.

### Medium
1. Accent misuse in dense/small text (fixed)
- Checklist mapping: `2. Theme & Color Usage`, `10. Content & Copy Expression`
- Files:
  - `apps/web/routes/portfolio/DesignSystem.tsx`
  - `apps/web/routes/portfolio/DesignThinking.tsx`
- Issue: `text-accent` used in small/body text contexts.
- Fix applied: replaced with semantic foreground/muted text for non-interactive copy.

2. Action-surface label ambiguity in Design System route (fixed)
- Checklist mapping: `7. Components & Pattern Reuse`, `10. Content & Copy Expression`
- File: `apps/web/routes/portfolio/DesignSystem.tsx`
- Issue: duplicate/ambiguous download labels made checklist vs system actions easy to confuse.
- Fix applied: disambiguated labels (`Download Checklist JSON`, `Download System Markdown`, `Download Tokens JSON`).

### Low / Watchlist
1. High volume of `AptCard` `subtle/feature` usage across routes
- Checklist mapping: `6. Card-Based Structure`, `7. Components & Pattern Reuse`
- Note: no hard runtime error; governance should continue through the variant-usage matrix and route-by-route alignment.

2. Non-token arbitrary utility values in third-party style surfaces (`components/ui`)
- Checklist mapping: `4. Spacing & Alignment`, `12. AI / Agent Compliance`
- Note: mostly from low-level UI primitives and utility internals, not major doctrine route regressions.

## Standards Conformance Scorecard

1. Brand & Design Intent: Pass
2. Theme & Color Usage: Pass with fixes (applied)
3. Typography: Pass
4. Spacing & Alignment: Pass with watchlist
5. Layout & Responsive Behavior: Pass
6. Card-Based Structure: Pass with watchlist
7. Components & Pattern Reuse: Pass with fixes (applied)
8. Interaction & Motion: Pass
9. States & Edge Cases: Pass (loading/empty/error patterns present in audited async views)
10. Content & Copy Expression: Pass with fixes (applied)
11. Accessibility & Readability: Pass (no blocking lint/accessibility regressions surfaced in this pass)
12. AI / Agent Compliance: Pass with watchlist

## Commands Run
- `corepack pnpm install`
- `corepack pnpm --dir apps/web lint`
- targeted `rg` audits for color/token usage, accent usage, card variants, action-surface duplication, and state-pattern signals
