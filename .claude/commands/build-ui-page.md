# Build UI Page

Build or update a React TypeScript UI page in apps/web following APT design system standards.

## Instructions

1. Read `AGENTS.md` and `apps/web/docs/design/static/APT-REVIEW-STANDARD.md`.
2. Inspect existing route and component patterns in `apps/web/routes/` and `apps/web/components/apt/`.
3. Reuse existing APT components (`AptCard`, `AptButton`, `AptTag`, `AptSection`, `SectionIntro`, `HeroSection`).
4. Use only semantic design tokens — no raw Tailwind colors.
5. Use TypeScript. Add proper types.
6. Include all required states:
   - Loading state (while data fetches)
   - Empty state (no results)
   - Error state (fetch failed or unavailable)
   - Success state (data loaded)
7. Keep data fetching in hooks (`apps/web/hooks/`) or services (`apps/web/src/services/`) — not inline in the component.
8. Keep responsive layout using existing Tailwind grid patterns.
9. Add accessible labels (aria-label, aria-expanded, role) where applicable.
10. Add or update route registration in `App.tsx` if adding a new page.
11. Update `data/site.ts` navigation if the page should appear in the nav or footer.

## Preferred Page Pattern

Use summary-to-detail structure:
- List view with `ContentStateGate` for loading/empty/error
- Filter controls via `ContentFilters` when useful
- Detail page via existing `ContentDetailPage` pattern when applicable
- Related content via `RelatedContentList`
- Clear CTA actions using `AptButton`

## Required Output

Return:
1. UI summary (purpose, user flow)
2. Files changed or created
3. Components reused and new components added
4. States handled (loading / empty / error / success)
5. Navigation updates made
6. Tests added or skipped (with reason)
7. Validation results (`pnpm lint`, `pnpm build`)
