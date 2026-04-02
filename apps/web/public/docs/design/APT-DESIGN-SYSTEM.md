# APT Design System

**[2026-01-25] NOTE:**
This project now uses a monorepo structure. All design system code, docs, and AI prompts live under `apps/web/`. See [decision log](apps/web/docs/design/decision-log.md) for details.

A comprehensive design system specification for Applied Practical Thinking. Dark-first, card-based, calm motion.

---

## Table of Contents

1. [Design Philosophy](#design-philosophy)
2. [Color System](#color-system)
3. [Typography](#typography)
4. [Spacing](#spacing)
5. [Border Radius](#border-radius)
6. [Shadows](#shadows)
7. [Animation](#animation)
8. [Components](#components)
9. [Layout Patterns](#layout-patterns)
10. [Usage Guidelines](#usage-guidelines)

---

## Design Philosophy

### Core Principles

| Principle | Description |
|-----------|-------------|
| **Dark-First** | Dark mode is the primary experience. Light mode exists for completeness, never as default. |
| **Card-Based** | All content structured in semantic card containers. Cards create hierarchy and visual grouping. |
| **Calm Motion** | Only subtle, purposeful animations. 200-400ms durations, ease-out easing, no bouncing. |
| **Low-Noise** | Minimal visual clutter. Generous whitespace. Typography does the heavy lifting. |
| **One Accent** | Single accent color per section. Color is used sparingly for emphasis, never decoration. |
| **Semantic Tokens** | No raw colors. Every value references a design token for consistency and theming. |

### Design Goals

1. **Clarity** — Information is immediately scannable and understandable
2. **Consistency** — Patterns repeat predictably across all interfaces
3. **Calm** — The UI doesn't compete for attention; content does
4. **Portability** — Tokens export cleanly to other tools and projects

---

## Color System

### Dark Mode (Primary)

```css
.dark {
  --background: 220 20% 8%;        /* Deep space blue - HSL(220, 20%, 8%) */
  --foreground: 220 10% 95%;       /* Near-white text - HSL(220, 10%, 95%) */
  
  --card: 220 18% 12%;             /* Elevated surface */
  --card-foreground: 220 10% 95%;
  
  --popover: 220 18% 12%;
  --popover-foreground: 220 10% 95%;
  
  --primary: 220 70% 55%;          /* Blue accent */
  --primary-foreground: 220 20% 8%;
  
  --secondary: 220 15% 18%;
  --secondary-foreground: 220 10% 90%;
  
  --muted: 220 15% 15%;            /* Subdued backgrounds */
  --muted-foreground: 220 10% 55%; /* Secondary text */
  
  --accent: 165 45% 40%;           /* Muted teal highlight - calmer, professional */
  --accent-foreground: 220 20% 8%; /* Dark text for contrast on teal */
  
  --destructive: 0 65% 45%;
  --destructive-foreground: 0 0% 100%;
  
  --border: 220 15% 20%;           /* Subtle dividers */
  --input: 220 15% 18%;
  --ring: 220 70% 55%;             /* Focus ring */
}
```

### Light Mode (Secondary)

```css
:root {
  --background: 220 15% 95%;
  --foreground: 220 20% 10%;
  
  --card: 0 0% 100%;
  --card-foreground: 220 20% 10%;
  
  --primary: 220 70% 50%;
  --primary-foreground: 0 0% 100%;
  
  --secondary: 220 15% 90%;
  --secondary-foreground: 220 20% 10%;
  
  --muted: 220 15% 92%;
  --muted-foreground: 220 10% 40%;
  
  --accent: 165 45% 35%;           /* Muted teal for light mode */
  --accent-foreground: 0 0% 100%; /* White text for contrast */
  
  --border: 220 15% 85%;
  --input: 220 15% 85%;
  --ring: 220 70% 50%;
}
```

### APT-Specific Tokens

```css
/* Additional tokens for APT-specific effects */
--apt-glow: 220 70% 55%;           /* Glow effect base color */
--apt-surface: 220 18% 12%;        /* General surface */
--apt-surface-elevated: 220 16% 16%;
--apt-text-secondary: 220 10% 55%;
--apt-border-subtle: 220 15% 22%;
```

### Color Usage Rules

```tsx
// ✅ CORRECT — Use semantic tokens
<div className="bg-background text-foreground">
<div className="bg-card border-border">
<span className="text-muted-foreground">

// ❌ INCORRECT — Never use raw colors
<div className="bg-gray-900 text-white">
<div className="bg-[#1a1a2e]">
```

### Component Boundary Note

- Use APT components for user-facing actions and shell elements
- Native `<button>` is acceptable inside low-level composite controls where button semantics are the correct accessible primitive
- Shared UI primitives should still prefer semantic tokens over literal colors whenever feasible

---

## Typography

### Font Stack

```css
--font-sans: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 
             "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
--font-mono: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Monaco, 
             Consolas, "Liberation Mono", "Courier New", monospace;
```

### Type Scale

| Token | Classes | Usage |
|-------|---------|-------|
| `hero` | `text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight` | Main hero titles |
| `h1` | `text-3xl md:text-4xl font-bold tracking-tight` | Page titles |
| `h2` | `text-2xl md:text-3xl font-semibold tracking-tight` | Section headers |
| `h3` | `text-xl md:text-2xl font-semibold` | Card titles |
| `h4` | `text-lg font-semibold` | Subsection headers |
| `body` | `text-base leading-relaxed` | Body copy |
| `bodySmall` | `text-sm leading-relaxed` | Descriptions |
| `caption` | `text-xs text-muted-foreground` | Labels, timestamps |

### TypeScript Reference

```typescript
export const typography = {
  hero: "text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight",
  h1: "text-3xl md:text-4xl font-bold tracking-tight",
  h2: "text-2xl md:text-3xl font-semibold tracking-tight",
  h3: "text-xl md:text-2xl font-semibold",
  h4: "text-lg font-semibold",
  body: "text-base leading-relaxed",
  bodySmall: "text-sm leading-relaxed",
  caption: "text-xs text-muted-foreground",
} as const;
```

---

## Spacing

### Spacing Scale

| Token | Value | Pixels |
|-------|-------|--------|
| `1` | 0.25rem | 4px |
| `2` | 0.5rem | 8px |
| `3` | 0.75rem | 12px |
| `4` | 1rem | 16px |
| `5` | 1.25rem | 20px |
| `6` | 1.5rem | 24px |
| `8` | 2rem | 32px |
| `10` | 2.5rem | 40px |
| `12` | 3rem | 48px |
| `16` | 4rem | 64px |
| `20` | 5rem | 80px |
| `24` | 6rem | 96px |

### Semantic Spacing

| Token | Value | Usage |
|-------|-------|-------|
| `section` | `py-16 md:py-24` | Major page sections |
| `sectionCompact` | `py-8 md:py-12` | Condensed sections |
| `cardPadding` | `p-6` | Standard card interior |
| `cardPaddingLarge` | `p-8` | Hero/feature cards |
| `gap` | `gap-6` | Grid/flex spacing |
| `gapLarge` | `gap-8` | Larger component gaps |

### Container Widths

| Token | Max-width | Usage |
|-------|-----------|-------|
| `prose` | 65ch | Optimal reading width |
| `content` | 56rem (896px) | Standard content |
| `wide` | 72rem (1152px) | Wide layouts |
| `full` | 80rem (1280px) | Full-width sections |
| `container` | 1400px | Main page container |

---

## Border Radius

### Base Token

```css
--radius: 0.5rem;  /* 8px */
```

### Radius Scale

| Class | Calculation | Usage |
|-------|-------------|-------|
| `rounded-sm` | calc(var(--radius) - 4px) | Small elements, tags |
| `rounded-md` | calc(var(--radius) - 2px) | Inputs, small buttons |
| `rounded-lg` | var(--radius) | Cards, standard buttons |
| `rounded-xl` | 0.75rem | Hero cards |
| `rounded-2xl` | 1rem | Large feature elements |
| `rounded-full` | 9999px | Emblems, avatars, pills |

---

## Shadows

### Standard Shadows

```css
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow-default: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
--shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
--shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25);
```

### APT-Specific Shadows

```css
/* Subtle glow effect */
--shadow-apt-glow: 0 0 40px -10px hsl(var(--apt-glow) / 0.2);

/* Hover lift effect */
--shadow-apt-hover: 0 8px 24px -8px hsl(var(--apt-glow) / 0.15);
```

---

## Animation

### Duration Scale

| Token | Value | Usage |
|-------|-------|-------|
| `fast` | 150ms | Micro-interactions |
| `normal` | 200ms | Standard UI transitions |
| `slow` | 300ms | Emphasis animations |
| `slower` | 400ms | Fade-in effects |
| `slowest` | 500ms | Hero/modal entrances |

### Easing Functions

```css
--ease-default: ease-out;
--ease-smooth: cubic-bezier(0.4, 0, 0.2, 1);
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);  /* Use sparingly */
```

### Keyframes

```css
@keyframes aptFadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes aptSlideUp {
  from { 
    opacity: 0; 
    transform: translateY(10px); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0); 
  }
}

@keyframes apt-emblem-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes apt-pulse-glow {
  0%, 100% { 
    opacity: 0.6; 
    transform: scale(1); 
  }
  50% { 
    opacity: 1; 
    transform: scale(1.05); 
  }
}
```

### Utility Classes

```css
.apt-fade-in {
  animation: aptFadeIn 0.4s ease-out forwards;
}

.apt-slide-up {
  animation: aptSlideUp 0.5s ease-out forwards;
}

.apt-hover-lift {
  transition: transform 0.2s ease-out, box-shadow 0.2s ease-out;
}

.apt-hover-lift:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px -8px hsl(var(--apt-glow) / 0.15);
}

.apt-glow-subtle {
  box-shadow: 0 0 40px -10px hsl(var(--apt-glow) / 0.2);
}
```

### Motion Rules

1. **Duration**: 200-400ms for UI, up to 500ms for hero entrances
2. **Easing**: Always `ease-out` or the smooth cubic-bezier
3. **No bouncing**: No spring or bounce effects
4. **Transform-based**: Prefer transform/opacity for performance
5. **Purposeful**: Every animation should communicate state change

---

## Components

### AptButton

**Variants:**

| Variant | Description | Styles |
|---------|-------------|--------|
| `primary` | Main CTAs | Blue bg, contrast text, shadow |
| `secondary` | Secondary actions | Muted bg, border |
| `outline` | Tertiary | Transparent bg, border |
| `ghost` | Minimal | No bg until hover |
| `accent` | Highlight | Teal bg |
| `link` | Text-only | Underline on hover |

**Sizes:**

| Size | Height | Padding |
|------|--------|---------|
| `sm` | 36px | px-3 |
| `default` | 40px | px-4 py-2 |
| `lg` | 48px | px-8 |
| `icon` | 40x40px | — |

**Usage:**

```tsx
import { AptButton } from "@/components/apt";

<AptButton variant="primary">Primary</AptButton>
<AptButton variant="outline" size="lg">Large Outline</AptButton>
<AptButton asChild>
  <Link to="/path">As Link</Link>
</AptButton>
```

### AptCard

**Variants:**

| Variant | Description |
|---------|-------------|
| `default` | Standard card with border |
| `elevated` | With shadow-lg for emphasis |
| `interactive` | Hover border-primary/50, cursor-pointer |
| `hero` | 50% opacity bg, backdrop-blur, rounded-xl |
| `subtle` | Muted/50 bg, transparent border |
| `feature` | 80% opacity, blur, hover effects |

**Padding:**

| Token | Value |
|-------|-------|
| `default` | p-6 |
| `compact` | p-4 |
| `large` | p-8 |
| `none` | p-0 |

**Sub-components:**

- `AptCardHeader` — Title + description container
- `AptCardTitle` — `text-xl font-semibold`
- `AptCardDescription` — `text-sm text-muted-foreground`
- `AptCardContent` — Body content area
- `AptCardFooter` — Actions with border-t

### AptTag

**Variants:**

| Variant | Styles |
|---------|--------|
| `default` | bg-secondary text-secondary-foreground |
| `accent` | bg-accent/20 text-accent |
| `primary` | bg-primary/20 text-primary |
| `muted` | bg-muted text-muted-foreground |
| `secondary` | bg-secondary/80 text-secondary-foreground |
| `outline` | border bg-transparent |
| `ghost` | bg-transparent text-muted-foreground |

**Sizes:** `sm` (10px), `default` (12px)

### AptEmblem

The brand emblem with animated glow ring.

**Sizes:**

| Size | Dimensions |
|------|------------|
| `sm` | 32px |
| `md` | 48px |
| `lg` | 80px |
| `xl` | 128px |

**Glow:** `none`, `subtle`, `strong`

---

## Layout Patterns

### Page Structure

```
┌─────────────────────────────────────┐
│          AptNav (sticky)            │
├─────────────────────────────────────┤
│                                     │
│          Main Content               │
│       (container class)             │
│                                     │
├─────────────────────────────────────┤
│          AptFooter                  │
└─────────────────────────────────────┘
```

### Grid Patterns

| Content Type | Grid Classes |
|--------------|--------------|
| Feature cards | `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4` |
| Lab/Portfolio | `grid-cols-1 md:grid-cols-2` |
| Content lists | `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` |
| Gallery | `grid-cols-2 md:grid-cols-3 lg:grid-cols-4` |

### Standard Page Template

```tsx
export default function Page() {
  return (
    <div className="container py-12 md:py-16">
      {/* Hero */}
      <div className="max-w-3xl mb-12">
        <AptTag variant="accent">Section</AptTag>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          Page Title
        </h1>
        <p className="text-lg text-muted-foreground">
          Description text here.
        </p>
      </div>

      {/* Content Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Cards */}
      </div>
    </div>
  );
}
```

---

## Usage Guidelines

### Do

- Use semantic color tokens (`bg-background`, `text-foreground`)
- Apply consistent spacing from the scale
- Keep animations subtle and purposeful
- Structure content in cards
- Use the typography scale for hierarchy

### Don't

- Use raw color values (`bg-gray-900`, `text-white`)
- Create one-off spacing values
- Add bounce or spring animations
- Mix flat and card-based layouts
- Override component variants inline

### File Organization

```
apps/web/
├── components/apt/
│   ├── index.ts          # Public exports
│   ├── AptButton.tsx
│   ├── AptCard.tsx
│   ├── AptTag.tsx
│   ├── AptEmblem.tsx
│   ├── HeroCard.tsx
│   └── ...
├── theme/
│   └── aptTokens.ts      # TypeScript token definitions
└── index.css             # CSS custom properties
```

### Export Formats

- **CSS Variables**: `apps/web/index.css`
- **TypeScript Tokens**: `apps/web/theme/aptTokens.ts`
- **JSON (Figma/Style Dictionary)**: `docs/design/APT-FIGMA-TOKENS.json`

---

## Version

**v1.0.0** — January 2026

---

*APT Design System — Applied Practical Thinking*
