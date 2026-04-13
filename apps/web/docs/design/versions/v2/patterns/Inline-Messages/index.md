---
docId: pattern-inline-messages
slug: patterns/inline-messages
title: Inline Messages
version: v2
major: 2
semanticVersion: 2.0.0
status: candidate
publishedAt: 2026-04-12
description: "Inline message pattern for helper, empty, warning, and error guidance inside components and forms."
---

## Intent

Use inline messages to provide immediate context directly under the related title, heading, or label without interrupting workflow.

## Message Formula

For generic mid-fidelity copy, use:

`This is required or optional text that describes the component name or text category in more detail.`

## Anatomy

- Related text category (for example: Label, Title, Heading)
- Inline message body (required when context is needed)
- Optional action link or small CTA when recovery is possible

## Text Categories

Use explicit categories in labels and headings:

- Action
- Body text
- Header
- Heading
- Label
- Subtitle
- Subheading
- Title

## Descriptors

Descriptors add context such as component, group, section, level, page, or variant. Use simple descriptors whenever possible. Keep ordinal wording minimal except for common CTA labeling where `Primary action` and `Secondary action` are expected.

## Accessibility

Associate inline messages with controls using `aria-describedby`. Use `role="alert"` only for urgent inline errors that need immediate announcement.

## Tokens & Theming

Use semantic foreground/surface tokens and state colors that match status meaning. Preserve contrast and avoid accent-heavy body copy.

## API/Components

Inline messages can be composed from existing text primitives and status callouts. Keep message placement consistent: directly below the related text category.

## Code examples

See `examples/inline-messages.example.tsx`.

## Empty states

Inline messages are required in empty component states where no data is shown because of filtering, searching, uninitialized data, or permission restrictions.

## Variants

- Helper inline message
- Validation inline error
- No-results inline empty message
- Permission inline message

## Tests & QA

Verify association to the target control, screen-reader announcement behavior, concise sentence-case language, and correct state-specific copy.
