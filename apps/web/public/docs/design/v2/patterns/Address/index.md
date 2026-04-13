---
docId: pattern-address
slug: patterns/address
title: Address
version: v2
major: 2
semanticVersion: 2.0.0
status: candidate
publishedAt: 2026-04-12
description: Standardized pattern for capturing postal and billing addresses.
---

## Intent

Collect structured postal, billing, or shipping addresses in a consistent, accessible way.

## Anatomy

- Address container
- Line 1 (street)
- Line 2 (optional)
- City, State/Region, Postal Code, Country
- Optional phone/email metadata

## Accessibility

Use semantic form controls with clear labels and grouped fields with `fieldset`/`legend` where appropriate. Ensure proper autocomplete attributes (eg `address-line1`, `postal-code`).

## Tokens & Theming

Use semantic tokens for spacing, field background, focus, and error states. Avoid raw colors.

## API/Components

Expose a composable `AddressForm` built from `AptInput`, `AptSelect`, and form primitives. Validate client-side and defer authoritative validation to the backend service.

## Code examples

See `examples/address.example.tsx` for a minimal usage example.

## Integration notes

Map form fields to your backend address model and ensure normalization (country codes, postal code formats).

## Variants

- Compact (inline city/state/postal)
- International (adds region selection and formatting hints)
- Read-only (display only)

## Tests & QA

Validate keyboard navigation, autocomplete behavior, and screen-reader announcements for validation errors.
