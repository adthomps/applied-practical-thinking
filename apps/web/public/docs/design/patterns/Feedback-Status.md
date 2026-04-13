---
docId: pattern-feedback-status
slug: patterns/feedback-status
title: Feedback / Status
version: v2
major: 2
semanticVersion: 2.0.0
status: candidate
publishedAt: 2026-04-12
description: Patterns for transient and persistent feedback indicating status, success, error, and loading.
---

## Intent

Clearly communicate operation results and system state (success, error, warning, info).

## Anatomy

- Title (optional)
- Message (required)
- CTA (required when user action is needed)
- Status container (toast, inline status, banner, or modal)

## Message rules

- Use sentence case and plain language.
- Keep titles to three to five words and avoid punctuation.
- Use descriptive purpose language instead of generic words like warning or error as titles.
- Give concrete next steps in the message body.
- Use clear verb-first CTA labels such as `Save`, `Remove`, `Create`, `Retry`, or `Dismiss`.
- Avoid blame language and avoid jargon.

## Voice and tone

Prefer active voice for direct actions. Use passive voice when active phrasing sounds punitive during error explanation.

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

## Status types

- Informational: communicate a state change without blocking flow.
- Success: confirm completion; include undo only when meaningful.
- Warning: indicate potential impact and what to check next.
- Error: explain what failed, consequences, and how to recover.

## Inline error guidance

The `Error:` prefix is allowed when it improves scanability, but it must be used consistently inside the same experience.

## Tests & QA

Test screen-reader announcements and focus behavior when toasts appear and when they are dismissed.
