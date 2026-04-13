---
docId: pattern-heatmap
slug: patterns/heatmap
title: Heatmap
version: v2
major: 2
semanticVersion: 2.0.0
status: candidate
publishedAt: 2026-04-12
description: "Heatmap pattern for category-pair intensity analysis with accessible legends and value communication."
---

## Intent

Use heatmaps to show concentration or frequency across two categorical dimensions.

## Anatomy

- Row and column labels
- Cell matrix
- Intensity legend
- Tooltip or inline cell details
- Empty/error/no-permission inline message area

## Accessibility

Do not rely on color alone. Include numeric value exposure in tooltip or adjacent text and provide strong contrast across intensity bands.

## Tokens & Theming

Use semantic ramps derived from tokenized surfaces and foregrounds. Reserve accent for selected or hovered cells only.

## API/Components

Implement as a responsive grid with deterministic row/column ordering. Support keyboard focus for interactive cells.

## Code examples

See `examples/heatmap.example.tsx`.

## Integration notes

Normalize values before rendering to avoid skewed perception and document whether scales are absolute or relative.

## Variants

- Dense matrix with tooltip details
- Annotated matrix with direct value labels
- Clustered row/column ordering for pattern discovery

## Empty states

If either axis has no entries after filtering, render an inline empty state in place of the matrix with guidance and a recovery action.

## Tests & QA

Validate legend correctness, row/column alignment, screen-reader value announcements, and behavior under sparse, empty, and permission-limited datasets.
