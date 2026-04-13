---
docId: pattern-search
slug: patterns/search
title: Search
version: v2
major: 2
semanticVersion: 2.0.0
status: candidate
publishedAt: 2026-04-12
description: "Search input and results pattern with suggestions and keyboard interactions."
---

## Intent

Provide a fast, discoverable search input with optional suggestions, typeahead, and result navigation.

## Anatomy

- Search input
- Suggestions / typeahead list
- Result list / navigation

## Accessibility

Use appropriate ARIA roles for autocomplete and ensure keyboard navigation of suggestions. Announce result counts.

## Tokens & Theming

Use tokens for suggestion backgrounds, focus state, and input sizing.

## API/Components

Expose `SearchInput` with controlled suggestion provider and keyboard handlers.

## Code examples

See `examples/search.example.tsx`.

## Integration notes

Debounce input before calling APIs and prefer server-side search for large corpora. Support query param sync.

## Variants
- Faceted search

## Tests & QA

Verify keyboard navigation, screen reader announcements, and debounce behavior.
