---
docId: pattern-line-chart
slug: patterns/line-chart
title: Line Chart
version: v2
major: 2
semanticVersion: 2.0.0
status: candidate
publishedAt: 2026-04-12
description: "Line chart pattern for showing how values change over time with readable trends and state handling."
---

## Intent

Use line charts to show change over time or ordered sequences where trend direction matters.

## Anatomy

- Time or ordered x-axis
- Value y-axis
- Line series and optional point markers
- Optional threshold or reference lines
- Inline message zone for empty/error/partial states

## Accessibility

Provide a concise trend summary near the chart and ensure values can be read without color alone. Include descriptive labels for series and units.

## Tokens & Theming

Use semantic chart series tokens, muted grid lines, and readable axis text tokens. Keep interaction highlights consistent with APT focus states.

## API/Components

Build with `ChartContainer` and controlled tooltip formatting. Keep date formatting consistent with locale and product context.

## Code examples

See `examples/line-chart.example.tsx`.

## Integration notes

Downsample responsibly for high-frequency series and disclose when points are aggregated.

## Variants

- Single trend line
- Multi-series comparison
- Area-under-line emphasis for cumulative interpretation

## Empty states

When no time series exists for the selected range, show an inline message that explains why and offers the next action.

## Tests & QA

Validate point-to-time mapping, tooltip precision, zoom/range changes, and handling for missing intervals, partial-data windows, and no-access states.
