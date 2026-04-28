---
docId: design-core
slug: core
major: 1
semanticVersion: 1.0.0
status: stable
publishedAt: 2026-04-05
---
# APT Design Core

Foundational design principles and tokens for the APT design system.

## Color System

### Semantic Colors

| Token | Purpose |
|-------|---------|
| `background` | Page background |
| `foreground` | Primary text |
| `card` | Card backgrounds |
| `muted` | Subdued backgrounds |
| `muted-foreground` | Secondary text |
| `primary` | Brand accent |
| `accent` | Highlight color |
| `border` | Borders and dividers |

### Usage

```tsx
// ✅ Correct - Use semantic tokens
<div className="bg-background text-foreground">
<div className="bg-card border-border">

// ❌ Incorrect - Never use raw colors
<div className="bg-background text-foreground">
```

## Typography Scale

| Class | Usage |
|-------|-------|
| `text-4xl font-bold` | Hero titles |
| `text-2xl font-semibold` | Section headers |
| `text-xl font-semibold` | Card titles |
| `text-base` | Body text |
| `text-sm text-muted-foreground` | Descriptions |
| `text-xs text-muted-foreground` | Captions |

## Spacing

Use Tailwind's spacing scale consistently:

- Section padding: `py-8 md:py-12`
- Card padding: `p-6` or `p-8`
- Component gaps: `gap-4` or `gap-6`
- Stack spacing: `space-y-4` or `space-y-6`

## Motion

Only calm, purposeful animations:

| Animation | Use Case |
|-----------|----------|
| `apt-fade-in` | Initial element appearance |
| `apt-slide-up` | Hero and modal entrances |
| `apt-hover-lift` | Interactive cards |

Duration: 200-400ms
Easing: `ease-out` or `cubic-bezier(0.4, 0, 0.2, 1)`

## Border Radius

Use the `--radius` token:

- `rounded-lg` - Cards, buttons
- `rounded-xl` - Hero cards
- `rounded-md` - Small elements
