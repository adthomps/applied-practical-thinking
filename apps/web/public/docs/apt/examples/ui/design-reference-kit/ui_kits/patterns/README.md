---
title: Interaction Patterns UI Kit Reference
version: v1
last_updated: 2026-06-13
owner: APT
status: draft
---

# Interaction Patterns UI Kit Reference

## Context

This vendored kit demonstrates modal/dialog variants, onboarding checklist states, empty states, toasts, and route-level error pages.

## Problem

Interaction patterns often drift when every feature invents its own confirmation, onboarding, empty, or error behavior.

## APT Principles Applied

- Design: complete states and shared interaction patterns.
- Quality: failure and confirmation paths need evidence.
- Operations: error pages should be honest and recoverable.

## Solution

Open `index.html` or `index.standalone.html` to inspect the pattern launcher. It includes information, confirmation, destructive confirm, form, and success dialogs; onboarding checklist and empty state; shared toasts; and 403, 404, and 500 pages.

Use `../../../feedback-alert-toast-pattern.md` and `../../../design-system-primitives-pattern.md` as canonical examples that interpret this kit.

## Tradeoffs

The kit covers more variants than most single features need. Use it as a source for the smallest appropriate pattern.

## Common Mistakes

- Using modals for non-blocking feedback.
- Skipping type-to-confirm or equivalent controls for high-impact destructive actions.
- Creating full-page errors without recovery paths.

## Related Documents

- `../../../feedback-alert-toast-pattern.md`
- `../../../design-system-primitives-pattern.md`
- `../../../../../design.md`
