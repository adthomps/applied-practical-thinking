---
title: Email UI Kit Reference
version: v1
last_updated: 2026-06-13
owner: APT
status: draft
---

# Email UI Kit Reference

## Context

This vendored kit demonstrates an APT transactional or notification email using email-safe HTML constraints.

## Problem

Email designs fail when they assume browser layout, CSS variables, external scripts, or modern app component behavior.

## APT Principles Applied

- Design: clarity and structure over decoration.
- System Standards: email is a separate delivery surface.
- Release: email requires preview evidence before promotion.

## Solution

Open `index.html` to inspect the table-based email template. It includes preheader text, brand lockup, short body copy, stat/highlight rows, one primary CTA, and preference/unsubscribe/disclaimer footer content.

Use `../../../transactional-email-pattern.md` as the canonical example that interprets this kit.

## Tradeoffs

The table and inline-style approach is less elegant than product UI code, but it is more reliable across email clients.

## Common Mistakes

- Building email from browser-only app components.
- Omitting preheader, preference, unsubscribe, or sender context.
- Creating multiple competing primary calls to action.

## Related Documents

- `../../../transactional-email-pattern.md`
- `../../../../../design.md`
- `../../../../../release-change-management.md`
