---
docId: design-site
slug: site
major: 1
semanticVersion: 1.0.0
status: stable
publishedAt: 2026-04-05
---
# APT Site Design

Site-specific design patterns and component implementations.

## Layout

### Page Structure

```
┌─────────────────────────────────────┐
│            AptNav (sticky)          │
├─────────────────────────────────────┤
│                                     │
│            Main Content             │
│         (container class)           │
│                                     │
├─────────────────────────────────────┤
│            AptFooter                │
└─────────────────────────────────────┘
```

### Container

Use `container` class for consistent max-width and padding:

```tsx
<div className="container py-8 md:py-12">
  {/* Page content */}
</div>
```

## Navigation

- Flat navigation (no nested dropdowns) - legacy v1 guidance only
- Canonical runtime navigation now uses nested dropdowns in `AptNav` driven by `siteConfig.nav` children
- Current route indicated with `bg-accent text-accent-foreground`
- Mobile: hamburger menu with slide-down panel

## Footer

Required elements:
1. "APT — Applied Practical Thinking"
2. Disclaimer: "This is a demonstration, not a production system."
3. Applied Gallery link (external)

## Component Usage

### HeroCard

Use for primary page headers:

```tsx
<HeroCard
  brand="APT"
  tagline="Applied Practical Thinking"
  title="Short positioning statement"
  description="One paragraph max"
  primaryCta={{ label: "Action", to: "/path" }}
/>
```

### AptCard

Variants:
- `default` - Standard cards
- `elevated` - With shadow (for emphasis)
- `interactive` - Hover states (clickable)
- `subtle` - Muted background (sections)

### AptButton

Variants:
- `primary` - Main actions
- `secondary` - Secondary actions
- `outline` - Tertiary actions
- `ghost` - Minimal emphasis
- `link` - Text-only

## Grid Patterns

| Content | Grid |
|---------|------|
| Feature cards | `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4` |
| Lab/System cards | `grid-cols-1 md:grid-cols-2` |
| Content lists | `grid-cols-1 md:grid-cols-2` |
