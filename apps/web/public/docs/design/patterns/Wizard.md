---
title: Wizard
docId: pattern-wizard
slug: patterns/wizard
version: v2
major: 2
semanticVersion: 2.0.0
status: candidate
publishedAt: 2026-04-12
description: Multi-step guided flow pattern for complex, staged tasks.
---

## Intent

Break complex tasks into manageable steps with progress, validation, and clear navigation.

## Anatomy

- Stepper / progress indicator
- Step content region
- Navigation actions (Back, Next, Finish)
- Optional sidebar/summary

## Accessibility

Ensure steps are announced, focus is managed when navigating, and keyboard access to Next/Back actions exists.

## Tokens & Theming

Use tokens for progress indicators, step spacing, and action emphasis.

## API/Components

Provide a `Wizard` primitive with step registration, validation hooks, and navigation helpers.

## Code examples

See `examples/wizard.example.tsx`.

## Integration notes

Persist working state between steps and support resumable flows or cancellations with confirmation.

## Variants

- Linear (enforced step order)
- Non-linear (free navigation)

## Tests & QA

Test step validation, focus transitions, and behavior on incomplete or aborted flows.
