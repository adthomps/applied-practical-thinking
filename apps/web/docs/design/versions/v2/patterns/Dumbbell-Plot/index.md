---
docId: pattern-dumbbell-plot
slug: patterns/dumbbell-plot
title: Dumbbell Plot
version: v2
major: 2
semanticVersion: 2.0.0
status: candidate
publishedAt: 2026-04-12
description: "Dumbbell plot pattern for comparing two related values across categories and highlighting deltas."
---

## Intent

Use dumbbell plots to compare two related points per category and emphasize the difference between them.

## Anatomy

- Category axis
- Connecting line segment between two values
- Start and end markers
- Delta label or tooltip explanation
- Inline empty/error/no-permission message area

## Accessibility

Provide direct text for both values and delta so meaning does not depend on marker color. Ensure focus and hover states are equivalent in information.

## Tokens & Theming

Use distinct semantic series tokens for start and end values, and a muted connector token for the range line.

## API/Components

Compose with `ChartContainer` and explicit marker labels. Preserve category ordering and avoid crossing connectors through sorting mistakes.

## Code examples

See `examples/dumbbell-plot.example.tsx`.

## Integration notes

Use for before/after, target/actual, or period-over-period comparisons where two points are sufficient.

## Variants

- Horizontal category comparison
- Vertical compact comparison
- Delta-sorted ordering

## Empty states

If one side of the pair is missing for all categories, show an inline message explaining incomplete comparison and how to recover.

## Tests & QA

Test marker-to-label consistency, delta calculations, ordering stability, and empty/partial-data handling.
