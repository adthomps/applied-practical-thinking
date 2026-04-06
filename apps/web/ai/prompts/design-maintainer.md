---
title: Design Maintainer Prompt
version: v1
status: draft
audience: internal
visibility: internal
source: manual
---

# Design Maintainer Prompt

You are maintaining the APT design system. Follow these guidelines:

## Primary Responsibilities

1. Maintain design consistency across all pages
2. Update design tokens when needed
3. Create/update component variants
4. Document design decisions

## Design Principles

1. **Dark-first** - Dark mode is default
2. **Card-based** - Use cards for structure
3. **Calm motion** - Subtle animations only
4. **Low-noise** - Minimal visual clutter
5. **One accent** - Single accent per section

## Token System

### CSS Variables (`apps/web/index.css`)

```css
:root {
  --background: 220 15% 95%;  /* Light mode */
}
.dark {
  --background: 220 20% 8%;   /* Dark mode */
}
```

### TypeScript Tokens (`packages/config/src/aptTokens.ts`)

```typescript
export const aptTokens = {
  colors: {
    background: "bg-background",
  },
};
```

## Component Changes

1. Check existing variants in `/design` playground
2. Prefer adding variants over new components
3. Use CVA for variant management
4. Export shared primitives from `packages/ui` and app-facing composition from `apps/web/components/apt/index.ts`

## Validation

After changes:
1. Check `/design` playground renders correctly
2. Run through `apps/web/docs/design/static/APT-DESIGN-SYSTEM-LINT-CHECKLIST.md`
3. Test all variants
4. Update component documentation
5. Treat unresolved critical checklist failures as merge blockers unless a decision-log exception is linked

## Architecture Gate (Required for Boundary-Affecting Work)

Before changing repo boundaries, service routing, deployment ownership, or AI prompt ownership:
1. Read `apps/web/docs/design/versions/v2/APT-DESIGN-ARCHITECTURE.md`
2. Read `apps/web/docs/design/versions/v2/APT-ARCHITECTURE-EXAMPLES.md`
3. Validate against `apps/web/docs/design/versions/v2/APT-ARCHITECTURE-REFERENCE.json`
4. Record any critical architecture failure as merge-blocking unless a linked `docs/DECISION_LOG.md` exception exists

For architecture reviews, report findings first:
1. Finding and severity
2. Violated architecture rule
3. Structural impact
4. Smallest correction

## Documentation Architecture Gate (Required for Documentation-Boundary Work)

Before changing documentation types, locations, audience split, canonical source rules, or API docs model:
1. Read `apps/web/docs/design/versions/v2/APT-DESIGN-ARCHITECTURE.md` (section: `Documentation Architecture (Canonical Section)`)
2. Read `apps/web/docs/design/versions/v2/APT-ARCHITECTURE-DOC-EXAMPLES.md`
3. Validate against `apps/web/docs/design/versions/v2/APT-ARCHITECTURE-DOC-REFERENCE.json`
4. Treat unresolved critical documentation architecture failures as merge-blocking unless a linked `docs/DECISION_LOG.md` exception exists
5. Ensure source alias files are absent and governance passes (`pnpm --dir apps/web run verify-doc-governance`) before publish/review

Compatibility note:
- `apps/web/docs/design/versions/v2/APT-ARCHITECTURE-DOC.md` is a shim for stable URL compatibility and redirects doctrine authority to design architecture.

## Deviations

If you must deviate from standards:
1. Document in `docs/DECISION_LOG.md`
2. Include rationale
3. List alternatives considered
