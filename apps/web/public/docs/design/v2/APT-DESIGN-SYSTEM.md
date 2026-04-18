---
docId: design-system
slug: system
major: 2
semanticVersion: 2.0.0
status: candidate
publishedAt: 2026-04-05
---
# APT Design System

APT Design System is a strict UI contract for calm, structured, production-grade interfaces.

---

## Table of Contents

1. [Design Philosophy](#design-philosophy)
2. [Token Usage Rules](#token-usage-rules)
3. [Color System](#color-system)
4. [Accent Restrictions](#accent-restrictions)
5. [Typography](#typography)
6. [Lead Typography](#lead-typography)
7. [Spacing](#spacing)
8. [Semantic Spacing Rules](#semantic-spacing-rules)
9. [Card Variant Usage Matrix](#card-variant-usage-matrix)
10. [AptSection Primitive](#aptsection-primitive)
11. [State Patterns](#state-patterns)
12. [Motion Timing Rules](#motion-timing-rules)
13. [AI / Agent Misuse Prevention](#ai--agent-misuse-prevention)
14. [Button and Card API Contract](#button-and-card-api-contract)
15. [Pattern Reference Map](#pattern-reference-map)
16. [Component Inventory](#component-inventory)
17. [Usage Guidelines](#usage-guidelines)

---

## Design Philosophy

### Core Principles

| Principle | Description |
|-----------|-------------|
| **Dark-First** | Dark mode is the primary experience. Light mode is secondary. |
| **Card-Based** | Content is grouped in semantic card containers. |
| **Calm Motion** | Motion must clarify state change, never decorate. |
| **Low-Noise** | Visual treatment supports comprehension over novelty. |
| **One Accent** | Accent is limited to explicit semantic contexts. |
| **Semantic Tokens** | Tokenized values only for color, spacing, radius, and motion. |
| **State-Aware** | All async/data-driven surfaces define loading/empty/error/success/partial states. |
| **Guard-Railed by Default** | Misuse boundaries are explicit and merge-gated. |

---

## Token Usage Rules

Hard constraints:

- No raw color values in components (`hex`, `rgb`, ad hoc `hsl`).
- No arbitrary spacing values outside semantic spacing tokens.
- No new radius values outside tokenized radius scale.
- No ad hoc shadow styles outside shared tokenized shadow patterns.
- No inline styles unless required for dynamic measurement/runtime geometry.
- No `text-accent` below `text-lg` unless the element is clearly interactive.

---

## Base Elements

### About Design Tokens

Design tokens are the single source of truth for color, spacing, radius, motion, and elevation. Tokens are semantic (never raw color values) and intended to be consumed as CSS variables or tokenized classes. Tokens map to design intent (e.g., `surface`, `card`, `primary`, `muted`) and should be used by components and layout primitives.

Example tokens:

```css
/* color (semantic) */
--background, --foreground, --card, --primary, --accent
/* spacing */
--space-1, --space-2, --space-3
/* radius */
--radius-sm, --radius-md, --radius-lg
/* elevation */
--elevation-0, --elevation-1, --elevation-2
```

### Elevation

Elevation represents stacking and emphasis through tokenized shadows and subtle surface tints. Use elevation tokens to express layer depth consistently: `elevation-0` (flat) through `elevation-4` (highest emphasis). Prefer tokenized classes over bespoke shadows.

Example:

```css
.elevation-1 { box-shadow: 0 1px 2px rgba(0,0,0,0.08); }
.elevation-2 { box-shadow: 0 6px 18px rgba(0,0,0,0.14); }
.elevation-3 { box-shadow: 0 28px 60px rgba(0,0,0,0.20); }
```

### Responsive Grid System

The grid is a constrained container plus a 12-column responsive system. Key tokens: `--grid-columns`, `--grid-gutter`, and breakpoint tokens (`bp-sm`, `bp-md`, `bp-lg`). Use container width tokens for page and content rhythm.

Example usage:

```html
<div class="container">
  <div class="grid grid-cols-12 gap-grid-gutter">...</div>
</div>
```

Example tokens:

```
--grid-columns: 12;
--grid-gutter: 1.5rem;
--container-width-md: 920px;
```

### Size and Shape

Sizes and radii are tokenized for predictable, reusable geometry. Use size tokens for icons, controls and spacing patterns; use radius tokens for consistent corner treatments across components.

Examples:

```
--size-icon-sm: 20px;
--size-icon-md: 28px;
--radius-sm: 6px;
--radius-md: 10px;
```

### Surface

Surfaces are semantic roles mapped to tokens: `surface` (global canvas), `card` (grouping container), `muted` (support panels). Each surface has a paired foreground token. Map surface tokens to component variants (e.g., `AptCard.variant="elevated"` -> `--card` + `--elevation-2`).

Example:

```css
:root { --surface: 220 15% 95%; --surface-foreground: 220 20% 10%; }
.card { background: color(var(--card) / 1); color: color(var(--card-foreground) / 1); }
```

## Color System

### Dark Mode (Primary)

```css
.dark {
  --background: 220 20% 8%;
  --foreground: 220 10% 95%;
  --card: 220 18% 12%;
  --card-foreground: 220 10% 95%;
  --primary: 220 70% 55%;
  --primary-foreground: 220 20% 8%;
  --secondary: 220 15% 18%;
  --secondary-foreground: 220 10% 90%;
  --muted: 220 15% 15%;
  --muted-foreground: 220 10% 55%;
  --accent: 165 45% 40%;
  --accent-foreground: 220 20% 8%;
  --border: 220 15% 20%;
  --ring: 220 70% 55%;
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
  --accent: 165 45% 35%;
  --accent-foreground: 0 0% 100%;
  --border: 220 15% 85%;
  --ring: 220 70% 50%;
}
```

### Chart Theme Mapping Policy

Chart tokens are explicitly theme-scoped:

- Dark runtime uses the canonical chart palette in `--chart-1..--chart-5`.
- Light mode uses a light-tuned chart palette for surface contrast while preserving series identity.

```css
/* Dark chart palette (primary runtime) */
.dark {
  --chart-1: 220 70% 55%;
  --chart-2: 165 45% 40%;
  --chart-3: 280 55% 55%;
  --chart-4: 30 75% 50%;
  --chart-5: 340 65% 55%;
}

/* Light chart palette (secondary runtime contract) */
:root {
  --chart-1: 220 70% 50%;
  --chart-2: 165 60% 40%;
  --chart-3: 280 60% 50%;
  --chart-4: 30 80% 55%;
  --chart-5: 340 70% 50%;
}
```

---

## Accent Restrictions

Accent is allowed for:

- interactive elements
- selected states
- badges/tags
- large callouts

Accent is not allowed for:

- body text
- captions
- dense metadata
- inline links inside paragraphs unless clearly interactive and underlined

---

## Typography

### Type Scale

| Token | Classes | Usage |
|-------|---------|-------|
| `hero` | `text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight` | Hero titles |
| `h1` | `text-3xl md:text-4xl font-bold tracking-tight` | Page titles |
| `h2` | `text-2xl md:text-3xl font-semibold tracking-tight` | Section headers |
| `h3` | `text-xl md:text-2xl font-semibold` | Card titles |
| `h4` | `text-lg font-semibold` | Subsection headers |
| `body` | `text-base leading-relaxed` | Body copy |
| `bodySmall` | `text-sm leading-relaxed` | Supporting text |
| `caption` | `text-xs text-muted-foreground` | Labels, timestamps |

---

## Lead Typography

Lead token:

```ts
lead: "text-lg md:text-xl leading-relaxed text-foreground/90"
```

Use lead for:

- page intros
- section intros
- hero supporting copy

Do not replace body copy with lead in dense sections.

---

## Spacing

### Semantic Spacing Tokens

| Token | Value |
|-------|-------|
| `section` | `py-12 md:py-16` |
| `sectionCompact` | `py-8 md:py-12` |
| `cardPaddingDense` | `p-5` |
| `cardPaddingDefault` | `p-6` |
| `cardPaddingFeature` | `p-8` |
| `gapDense` | `gap-4` |
| `gapDefault` | `gap-6` |
| `gapLarge` | `gap-8` |

---

## Semantic Spacing Rules

- `cardPaddingDense` (`p-5`) for metadata-heavy or compact cards.
- `cardPaddingDefault` (`p-6`) for default prose/support cards.
- `cardPaddingFeature` (`p-8`) for hero or feature cards only.
- `gapDense` for compact metadata grids/lists.
- `gapDefault` for standard content grids.
- `gapLarge` for high-separation sections and major compositional breaks.

---

## Card Variant Usage Matrix

Canonical variants (6):

| Variant | Purpose | Allowed Contexts | Disallowed Contexts |
|---------|---------|------------------|---------------------|
| `default` | Standard content container | Prose/support cards, docs sections | High-emphasis hero framing |
| `interactive` | Clickable navigation/selection | Route cards, selectable lists | Non-clickable static content |
| `elevated` | Emphasized non-clickable content | Priority summaries, key info blocks | Primary navigation selection |
| `hero` | Top-of-page emphasis | One per view, page hero only | Repeated in content grids |
| `subtle` | Low-emphasis support container | Secondary metadata, supporting sidecards | Primary CTA surfaces, key narrative blocks |
| `feature` | Mid/high-emphasis featured content | Spotlight modules, summary callouts, guided paths | Dense repeated list cards, default content grids |

Guard rails:

- `hero` cannot be used as the default list/grid card style.
- `feature` cannot be the default treatment for repeated cards in feed/list layouts.
- If more than one card in a view competes with hero-level emphasis, reduce to `elevated`, `default`, or `subtle`.

### Variant Example Mapping

- `default`: docs/support prose cards
- `interactive`: navigation pickers and selectable tiles
- `elevated`: highlighted summary with no click affordance
- `hero`: top-of-page spotlight, max one per view
- `subtle`: contextual metadata and secondary support clusters
- `feature`: intentional spotlight in a mixed hierarchy, not the baseline pattern

---

## AptSection Primitive

`AptSection` is a shared structural primitive in `@apt/ui` used to standardize section rhythm and width.

API:

- `spacing`: `default | compact | none`
- `width`: `prose | content | wide | full`
- `tone`: `default | subtle | elevated`
- optional header support: `title`, `description`, `eyebrow`, `actions`

Use `AptSection` to enforce card-based structure and predictable layout rhythm without replacing `SectionIntro`.

Example:

```tsx
<AptSection
  spacing="default"
  width="content"
  tone="subtle"
  title="Design Standards"
  description="Portable section scaffold with token-friendly defaults."
  actions={<AptButton variant="outline">Read doctrine</AptButton>}
>
  <AptCard variant="default" padding="default">
    <AptCardHeader>
      <AptCardTitle>Shared baseline</AptCardTitle>
      <AptCardDescription>Card-based structure with calm motion.</AptCardDescription>
    </AptCardHeader>
  </AptCard>
</AptSection>
```

---

## State Patterns

Every async or data-driven surface must define:

- loading
- empty
- error
- success (if relevant)
- partial data

### Loading State

- Use card-shaped skeletons.
- Use muted surfaces (`--muted`).
- Opacity pulse only; avoid aggressive shimmer.
- Preserve final layout shape to reduce jump.

### Empty State

Structure:

1. optional icon
2. concise heading
3. one sentence of context
4. optional primary CTA
5. optional secondary help link

Inline messages are required when a component view is empty because of search/filter constraints, missing data setup, or permission limitations.

### Error State

Structure:

- destructive or warning visual treatment
- plain-language explanation
- next step or retry action
- no blame language

### Messaging Anatomy Standard

Messages in badges, banners, dialogs, notification trays, inline status, and tooltips follow:

1. optional title (three to five words)
2. required message body in plain language
3. required CTA when user action is needed

CTA labels should use clear verbs (`Save`, `Remove`, `Create`, `Retry`, `Dismiss`) with no trailing punctuation.

### Voice and Tone

- Prefer active voice for direct action.
- Use passive voice only when active wording sounds punitive in error contexts.
- Keep message language descriptive and direct; avoid jargon and hype.

### Success State

- quiet confirmation
- short-lived unless tied to persisted state
- never brighter than primary CTA system

### Partial Data State

- clearly label partial availability
- render available content first
- provide recovery action for missing slices

---

## Motion Timing Rules

- Hover/focus/press: `150-200ms`
- Standard UI transitions: `180-250ms`
- Entrances/page transitions: `220-320ms`
- Hero-only transitions: up to `400ms` and rare

Rules:

- No bounce, overshoot, parallax, or decorative looping.
- Reserve cubic-bezier emphasis for page/view transitions, not all microinteractions.
- Motion must increase comprehension of state change.

---

## AI / Agent Misuse Prevention

Reject output when any of these appear:

- invented visual tokens
- arbitrary spacing/radius/shadow values
- default scaffold styling left unadapted
- accent misuse in body/caption/dense metadata text
- missing required state patterns
- `hero` or `feature` misused as default list-card treatment

AI review output must include:

1. violated rule name
2. structural impact
3. smallest correction

---

## Button and Card API Contract

`AptButton` contract:

- Variants: `primary | secondary | outline | ghost | accent | link`
- Sizes: `sm | default | lg | icon`

`AptCard` contract:

- Variants: `default | elevated | interactive | hero | subtle | feature`
- Subcomponents: `AptCardHeader | AptCardTitle | AptCardDescription | AptCardContent | AptCardFooter`

These interfaces are backward-compatible and remain the canonical reusable surface for app routes.

---

## Pattern Reference Map

The following pattern docs are the canonical locations for chart and inline-message guidance in v2:

- Data visuals:
  - [Bar Chart](./patterns/Bar-Chart/index.md)
  - [Line Chart](./patterns/Line-Chart/index.md)
  - [Heatmap](./patterns/Heatmap/index.md)
  - [Dumbbell Plot](./patterns/Dumbbell-Plot/index.md)
- Messaging and labeling:
  - [Inline Messages](./patterns/Inline-Messages/index.md)
  - [Feedback / Status](./patterns/Feedback-Status/index.md)
  - [APT Content Naming and Messaging](./APT-CONTENT-NAMING-AND-MESSAGING.md)

These references define required behavior for empty states, inline helper/error messages, and chart readability/accessibility.

### Chart Selection Quick Table

Use this table to choose the correct chart pattern before implementation:

| Use case | Preferred chart | Why | Avoid when |
|---|---|---|---|
| Compare values across categories | [Bar Chart](./patterns/Bar-Chart/index.md) | Fast category magnitude comparison | The primary question is trend over time |
| Show trend over time or ordered sequence | [Line Chart](./patterns/Line-Chart/index.md) | Direction and rate of change are easy to scan | Categories are unrelated or unordered |
| Show intensity across two dimensions | [Heatmap](./patterns/Heatmap/index.md) | Highlights dense and sparse category pairings | Exact value-by-value reading is the primary task |
| Compare two related values per category | [Dumbbell Plot](./patterns/Dumbbell-Plot/index.md) | Emphasizes delta between paired points | More than two values per category are needed |

Chart guard rails:

- Always provide an inline empty or restricted-data message when no data can be shown.
- Do not rely on color only; expose readable labels, legend context, and value cues.
- Prefer concise titles and clear units for axis or tooltip values.
- Use semantic chart tokens and avoid ad hoc color values.

### Message Type Chooser

Use this table to select both the message type and delivery pattern:

| Message type | Preferred delivery | Use when | Avoid when |
|---|---|---|---|
| Informational | Inline first, Toast second | Sharing non-blocking context near the related element or confirming a low-impact system update | The user must take immediate corrective action |
| Success | Toast first, Inline second | Confirming completed user actions with optional undo | The confirmation contains critical details that must persist for workflow completion |
| Warning | Inline first, Modal second | Signaling potential risk or workflow impact while keeping recovery actions visible | A transient toast could be missed and create downstream errors |
| Error | Inline for field/context errors, Modal for blocking failures | Explaining what failed, impact, and next step to recover | Error details are hidden behind generic copy or no action is provided |

Delivery guard rails:

- Inline is the default for contextual guidance and empty-state explanations.
- Toast is for transient confirmations and lightweight informational updates.
- Modal is reserved for blocking conditions, destructive confirmation, or failures that require explicit acknowledgment.
- Always include clear verb-first actions (`Retry`, `Save`, `Remove`, `Dismiss`) when recovery is possible.

---

## Usage Guidelines

### Do

- Use semantic tokens and canonical spacing rules.
- Use all 6 canonical card variants with declared intent and guard rails.
- Add state patterns before considering a view complete.
- Use lead typography for intro bridges between heading and body.

### Don't

- Use raw color utilities.
- Introduce one-off spacing/radius/shadow values.
- Use accent as decorative body emphasis.
- Ship async surfaces without explicit state definitions.

### Navigation Model Note

Canonical site navigation uses a nested dropdown model in `AptNav` with parent and child routes.
The v1 flat-navigation note is legacy historical guidance and not the current runtime contract.
Selected nav states use `bg-accent` with `text-accent-foreground` for contrast-safe emphasis.

---

## Component Inventory

### Current Major Primitives

- `AptButton`
- `AptCard` (+ `AptCardHeader`, `AptCardTitle`, `AptCardDescription`, `AptCardContent`, `AptCardFooter`)
- `AptSection`
- `AptTag`
- `HeroCard`
- `SectionIntro` (app-facing composition helper)

### Missing Shared Primitives (Priority Tiers)

P1 (recommended next):

- `AptStatePanel` for standardized loading/empty/error/success/partial wrappers

P2 (optional, based on repeat pattern confirmation):

- `AptField` for shared form field baseline and consistent label/help/error composition

Merge policy:

- Unresolved critical lint checklist failures block merge unless a documented exception is linked in `docs/DECISION_LOG.md`.

---

## Version

**v2.0.0-candidate** — April 2026

---

*APT Design System — Applied Practical Thinking*
