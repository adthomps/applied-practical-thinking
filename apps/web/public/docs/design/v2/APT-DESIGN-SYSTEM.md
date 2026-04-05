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
15. [Component Inventory](#component-inventory)
16. [Usage Guidelines](#usage-guidelines)

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

### Error State

Structure:

- destructive or warning visual treatment
- plain-language explanation
- next step or retry action
- no blame language

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
