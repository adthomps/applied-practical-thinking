---
docId: pattern-filters
slug: patterns/filters
title: Filters
version: v2
major: 2
semanticVersion: 2.0.0
status: candidate
publishedAt: 2026-04-12
description: UI patterns for filtering collections and result sets.
---

## Intent

Allow users to narrow or refine data sets using clear, discoverable controls.

## Anatomy

- Filter bar or panel
- Individual filter controls (select, chips, range inputs)
- Active filter summary and clear controls

## Accessibility

Ensure filter controls are keyboard accessible, and that changes to result counts are announced.

## Tokens & Theming

Use tokens for chip background, active state, and filter panel elevation.

## API/Components

Compose filters from `AptSelect`, `AptInput`, and `AptTag` components; expose a central state hook for filter queries.

## Code examples

See `examples/filters.example.tsx`.

## Integration notes

Prefer URL-driven filter state for shareability and back/forward navigation.

## Variants

- Inline filter bar
- Collapsible filter panel

## Tests & QA

Verify keyboard navigation, state persistence, and expected result counts when filters change.
