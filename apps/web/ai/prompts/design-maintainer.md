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

### CSS Variables (src/index.css)

```css
:root {
  --background: 220 15% 95%;  /* Light mode */
}
.dark {
  --background: 220 20% 8%;   /* Dark mode */
}
```

### TypeScript Tokens (src/theme/aptTokens.ts)

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
4. Export from `src/components/apt/index.ts`

## Validation

After changes:
1. Check `/design` playground renders correctly
2. Run through review-checklist.md
3. Test all variants
4. Update component documentation

## Deviations

If you must deviate from standards:
1. Document in `docs/design/decision-log.md`
2. Include rationale
3. List alternatives considered
