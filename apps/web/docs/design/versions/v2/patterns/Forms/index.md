---
title: Forms
version: v2
description: Patterns and best practices for building accessible, resilient forms.
---

## Intent

Create predictable, accessible forms with clear validation, submission handling, and state management.

## Anatomy

- Form container
- Field rows (label, control, help/error)
- Actions (submit/cancel)

## Accessibility

Use label associations, `aria-describedby` for help/error text, and `role="alert"` for persistent errors as appropriate.

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
