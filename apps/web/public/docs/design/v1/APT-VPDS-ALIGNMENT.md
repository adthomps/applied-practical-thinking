---
docId: vpds-alignment
slug: vpds-alignment
major: 1
semanticVersion: 1.0.0
status: stable
publishedAt: 2026-04-05
---
# VPDS Alignment

Visual and Product Design System alignment guide.

## Purpose

This document ensures visual design decisions align with product goals.

## Alignment Principles

### 1. Form Follows Function

Visual design serves the product purpose:
- **Labs**: Exploration, experimentation → More visual flexibility
- **Systems**: Production-ready → Conservative, stable design
- **Learn**: Content consumption → Typography-focused
- **Practice**: Guides and design reviews → Decision-focused layout

### 2. Consistency Over Novelty

Reuse existing patterns before creating new ones:
1. Check existing components in `/design` playground
2. Check design tokens in `aptTokens.ts`
3. Only create new patterns if existing don't fit

### 3. Responsive by Default

All designs must work across:
- Mobile (320px+)
- Tablet (768px+)
- Desktop (1024px+)

## Component Ownership

| Component | Owner | Purpose |
|-----------|-------|---------|
| HeroCard | Design | Page introductions |
| AptCard | Design | Content containers |
| AptButton | Design | Actions |
| DecisionBlock | Product | Technical decisions |
| LimitationNotice | Product | Constraints |

## Review Process

1. Design changes reviewed against the internal review checklist
2. Product changes reviewed for consistency
3. Deviations logged in the internal decision log

