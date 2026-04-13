---
docId: pattern-notification-tray
slug: patterns/notification-tray
title: Notification Tray
version: v2
major: 2
semanticVersion: 2.0.0
status: candidate
publishedAt: 2026-04-12
description: Persistent, dismissible tray for system and account notifications.
---

## Intent

Surface important notifications and messages in a non-modal, discoverable tray.

## Anatomy

- Tray container
- Notification items (title, body, actions)
- Tray controls (open/close, mark all read)

## Accessibility

Ensure keyboard focus can reach the tray and that new notifications are programmatically exposed.

## Tokens & Theming

Use tokens for tray elevation, item dividers, and focus states.

## API/Components

Provide a `NotificationTray` component with a notifications store and item renderer.

## Code examples

See `examples/notification-tray.example.tsx`.

## Integration notes

Decouple tray UI from notification delivery; offer an API for adding/removing items.

## Variants

- Compact list
- Grouped by date/priority

## Tests & QA

Test keyboard accessibility, dismiss behavior, and persistence across sessions if applicable.
