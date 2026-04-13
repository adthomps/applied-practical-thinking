---
docId: pattern-card-input
slug: patterns/card-input
title: Card Input
version: v2
major: 2
semanticVersion: 2.0.0
status: candidate
publishedAt: 2026-04-12
description: Card-based input pattern for compact data capture.
---

## Intent

Provide a compact, card-based input pattern for capturing grouped fields in a small surface.

## Anatomy

- Card container
- Input rows
- Actions (Save, Cancel)

## Accessibility

Use semantic form controls, ensure keyboard focus order within the card, and provide clear labels.

## Tokens & Theming

Use tokens for card elevation, spacing, and control sizing.

## API/Components

Compose using `AptCard`, `AptInput`, and `AptButton` primitives.

## Code examples

See `examples/card-input.example.tsx`.

## Tests & QA

Validate keyboard focus, form submission, and card-level error presentation.
