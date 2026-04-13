---
title: One-Time Passcode (OTP)
docId: pattern-one-time-passcode
slug: patterns/one-time-passcode
version: v2
major: 2
semanticVersion: 2.0.0
status: candidate
publishedAt: 2026-04-12
description: Short-lived passcode entry pattern for authentication flows.
---

## Intent

Provide a secure, accessible input pattern for one-time passcodes delivered via SMS, email, or authenticator apps.

## Anatomy

- N-digit input controls
- Resend code control
- Countdown or expiry indicator

## Accessibility

Ensure each input has a label or collective `aria-label`. Announce resend and error states. Support paste of full code.

## Tokens & Theming

Use tokens for input spacing and focus/error states to maintain consistency.

## API/Components

Offer `OtpInput` with controlled value and paste handling, and callbacks for submit and resend.

## Code examples

See `examples/one-time-passcode.example.tsx`.

## Integration notes

Avoid exposing full codes in logs; ensure server-side verification and rate-limiting.

## Variants

- Fixed-length individual inputs
- Single masked input

## Tests & QA

Test paste support, keyboard navigation across inputs, and resend flow timing.
