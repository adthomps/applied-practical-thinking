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
- Inline message area for no-results or restricted-data states

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

## Empty states

When filtering yields no results, show an inline message inside the filtered results region with:

1. concise heading
2. one-sentence reason
3. recovery action such as clearing filters

If users do not have permission for a filtered dataset, state that explicitly and provide the next available action.

## Inline messages

Place inline messages directly below the related label or heading. Use text categories and descriptors from the content naming standard for predictable labeling.

## Variants

- Inline filter bar
- Collapsible filter panel

## Tests & QA

Verify keyboard navigation, state persistence, and expected result counts when filters change.
