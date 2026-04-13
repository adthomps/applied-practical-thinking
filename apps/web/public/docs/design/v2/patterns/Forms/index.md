---
docId: pattern-forms
slug: patterns/forms
title: Forms
version: v2
major: 2
semanticVersion: 2.0.0
status: candidate
publishedAt: 2026-04-12
description: Patterns and best practices for building accessible, resilient forms.
---

## Intent

Create predictable, accessible forms with clear validation, submission handling, and state management.

## Anatomy

- Form container
- Field rows (label, control, help/error)
- Actions (submit/cancel)
- Inline message region below each related label/heading when context is needed

## Accessibility

Use label associations, `aria-describedby` for help/error text, and `role="alert"` for persistent errors as appropriate.

## Inline messages

Use inline helper and error messages directly below the related text category (`Label`, `Heading`, or `Title`). Keep copy concise and action-oriented when recovery is required.

## Content naming

Use descriptor plus text category naming for medium-fidelity labels. Example: `Billing section heading`, `Address label`, `Primary action`.

## Tokens & Theming

Use tokens for spacing, control heights, and validation colors.

## API/Components

Build forms from `AptForm`, `AptInput`, `AptSelect`, and validation helpers. Encourage form-level error handling and field-level messages.

## Code examples

See `examples/forms.example.tsx`.

## Integration notes

Integrate with central form state libraries or backend validation endpoints; avoid duplicating validation logic.

## Variants

- Multi-step forms
- Inline forms
- Large/complex forms with grouped sections

## Tests & QA

Test for keyboard-only completion, error announcements, and form submission edge cases.
