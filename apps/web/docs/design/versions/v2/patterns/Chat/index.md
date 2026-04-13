---
title: Chat
version: v2
description: Real-time conversational UI pattern for user-agent interactions.
---

## Intent

Enable conversational exchanges with streaming content, message history, and input controls.

## Anatomy

- Message list
- Composer (input area)
- Attachments/controls
- Message meta (timestamp, author)

## Accessibility

Ensure messages are announced to screen readers when new content arrives. Provide accessible labels for composer and send action.

## Tokens & Theming

Use tokens for message background, author emphasis, and timestamp typography.

## API/Components

Compose using message list primitives and a controlled `ChatComposer` component.

## Code examples

See `examples/chat.example.tsx`.

## Integration notes

Handle incremental updates, server-sent events, or websockets for streaming behavior. Persist minimal history client-side as needed.

## Variants

- One-to-one chat
- Group chat
- Read-only transcript

## Tests & QA

Test announcement behavior, focus after send, and edge cases with long messages and attachments.
