---
title: Account UI Kit Reference
version: v1
last_updated: 2026-06-13
owner: APT
status: draft
---

# Account UI Kit Reference

## Context

This vendored kit demonstrates APT login, signup, settings, alerts, and toasts for authenticated product surfaces.

## Problem

Account flows can drift into isolated form screens with weak validation, missing recovery, unclear settings state, and unsafe destructive actions.

## APT Principles Applied

- Design: complete states and reusable account patterns.
- Security: authentication, consent, and destructive actions require explicit treatment.
- Quality: validation, recovery, and feedback need visible evidence.

## Solution

Open `index.html` to inspect the click-through account flow. It includes login, signup, settings tabs, password visibility, validation alerts, unsaved-change warnings, toasts, notification/security settings, and a danger zone.

Use `../../../account-auth-settings-pattern.md` as the canonical example that interprets this kit.

## Tradeoffs

The kit is richer than a minimum login form. That extra surface is useful when account settings, notifications, profile data, and destructive actions are part of the workflow.

## Common Mistakes

- Treating this README as doctrine instead of evidence.
- Copying the visual treatment without the validation and recovery states.
- Using toasts for blocking account errors.

## Related Documents

- `../../../account-auth-settings-pattern.md`
- `../../../../../design.md`
- `../../../../../security.md`
