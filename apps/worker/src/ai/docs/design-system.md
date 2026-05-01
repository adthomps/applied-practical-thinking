---
title: Design System
version: v2
status: candidate
audience: developer
visibility: public
source: manual
---
# Design System

APT uses a semantic design token system for all UI components. Tokens include colors, spacing, typography, and elevation. All components must use tokens from the config package.

## Tokens
- `bg-background`, `text-foreground`, `bg-card`, `text-card-foreground`

## Components
- `AptButton`, `AptCard`, `AptTag`, `HeroCard`
- Global footer shell: compact APT footer template with a two-column brand span, two short link groups, divider, and legal/support metadata row

## Rules
- No raw colors or spacing
- No light mode
- All UI must use Apt* components
- Footer shells use `border-border/60`, `bg-card/55`, `px-4 py-8 md:py-10`, `grid grid-cols-1 gap-8 md:grid-cols-4`, and compact `text-sm` / `text-xs` hierarchy
