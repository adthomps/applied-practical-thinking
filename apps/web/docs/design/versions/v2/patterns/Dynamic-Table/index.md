---
title: Dynamic Table
version: v2
description: Tables that support client-side interactions: sorting, filtering, pagination, and column actions.
---

## Intent

Present tabular data with controls for sorting, filtering, and pagination while keeping accessibility and performance in mind.

## Anatomy

- Table header with column actions
- Rows and cells
- Pagination and status
- Optional column resizing/reordering controls

## Accessibility

Use semantic `table` markup, provide scope attributes, and ensure keyboard-accessible controls for interactive column headers.

## Tokens & Theming

Use tokens for row stripes, header background, and focus outlines.

## API/Components

Provide `DataTable` primitives with hooks for sorting, filtering, and virtualized rendering when necessary.

## Code examples

See `examples/dynamic-table.example.tsx`.

## Integration notes

Prefer server-side pagination for large datasets; keep client-side operations limited to small result sets.

## Variants

- Paginated
- Infinite scroll
- Virtualized

## Tests & QA

Validate keyboard navigation, column sorting semantics, and ARIA announcements for dynamic changes.
