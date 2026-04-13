---
docId: pattern-bar-chart
slug: patterns/bar-chart
title: Bar Chart
version: v2
major: 2
semanticVersion: 2.0.0
status: candidate
publishedAt: 2026-04-12
description: "Bar chart pattern for comparing values across categories with clear labels and accessible states."
---

## Intent

Use bar charts to compare values across categories when users need fast magnitude comparison.

## Anatomy

- Chart title and optional subtitle
- Category axis and value axis
- Bar marks
- Legend when multiple series are shown
- Inline empty/error/no-permission message area

## Accessibility

Provide a text summary of the key comparison, label axes, and ensure keyboard access to chart details. When interactive, expose focusable data points and announce values with clear category context.

## Tokens & Theming

Use semantic chart tokens and system foreground/background tokens. Keep strong contrast for bars against the plotting surface and reserve accent for emphasized interactions only.

## API/Components

Compose with `ChartContainer` and tooltip/legend helpers from the chart UI contract. Keep data mapping explicit and deterministic.

## Code examples

See `examples/bar-chart.example.tsx`.

## Integration notes

Use aggregated server-side data for large datasets. Include unit labels and sort categories intentionally to avoid misleading interpretation.

## Variants

- Single-series category comparison
- Grouped multi-series comparison
- Stacked bars for part-to-whole relationships

## Empty states

If no results match filters or search, render an inline empty state in the chart container: heading, one-sentence context, and a recovery action such as clearing filters.

## Tests & QA

Verify axis labels, tooltip accuracy, color contrast, keyboard traversal, and fallback behavior for empty, error, partial-data, and permission-restricted states.
