---
title: Feedback / Status
version: v2
description: Patterns for transient and persistent feedback indicating status, success, error, and loading.
---

## Intent

Clearly communicate operation results and system state (success, error, warning, info).

## Anatomy

- Status container (toast, inline status)
- Message text
- Optional actions (retry, dismiss)

## Accessibility

Use `role="status"` or `role="alert"` appropriately. Ensure messages are programmatically determinable and not lost to screen readers.

## Tokens & Theming

Use semantic tokens for success, error, and warning colors and surface contrasts.

## API/Components

Provide `Toast` and `InlineStatus` primitives with auto-dismiss and manual dismiss options.

## Code examples

See `examples/feedback-status.example.tsx`.

## Integration notes

Throttle and de-duplicate messages to avoid overwhelming users. Use persistent UI for actionable failures.

## Variants

- Toast (transient)
- Inline (contextual)
- Modal (blocking)

## Tests & QA

Test screen-reader announcements and focus behavior when toasts appear and when they are dismissed.
