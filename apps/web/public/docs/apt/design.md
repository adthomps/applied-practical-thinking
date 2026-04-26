---
title: APT Design Principles (What)
version: v1
last_updated: 2026-04-24
owner: APT
status: draft
---

# APT Design Principles

## Overview

APT Design Principles define what the solution is, how it behaves, and how users experience it across states.

Design answers:

- What is the user trying to do?
- What should the system communicate?
- Which states must exist?
- Which interaction patterns are reused?
- Which visual rules protect clarity?

## Purpose

Design keeps product behavior, interface structure, and visual language coherent before implementation spreads decisions across components, routes, and copy.

## Core Principles

### 1. Clarity over cleverness

If an interface requires explanation, it is not clear enough.

### 2. Structure over decoration

Organization, hierarchy, and state clarity matter more than ornament.

### 3. Systems over screens

Design reusable patterns, not isolated pages.

### 4. Complete states are required

Every meaningful workflow needs loading, empty, success, error, and disabled states where applicable.

### 5. Consistency beats novelty

Predictable interaction patterns reduce cognitive load and implementation drift.

## Standards / Rules

- Use APT visual tokens instead of one-off colors, spacing, radius, shadows, or motion.
- Use Apt-prefixed presentational components where the project provides them.
- Keep UI components free of business logic and direct API calls.
- Use calm motion only: subtle fade, transition, or hover lift.
- Keep copy concise, precise, and non-marketing.
- Treat accessibility states as part of the design, not a later fix.
- Public APT surfaces should use the full APT design system unless a project has an approved brand layer.
- Critical design lint failures block promotion unless a decision record accepts the exception.

## Baseline Visual Language

- Dark-first background with deep navy/cosmic tones.
- Glass surfaces may be used for cards and major panels.
- Mint accent is reserved for primary emphasis and action.
- System font stack is the default.
- Motion should be subtle and short.

Reference token values harvested from legacy theme material:

```text
bg: #070b16
surface: rgba(255,255,255,0.05)
accent: #8ff2c8
text: #eaf2ff
border: rgba(255,255,255,0.10)
radius-sm: 0.85rem
radius-md: 1.1rem
radius-lg: 1.35rem
motion-fast: 140ms
motion-normal: 220ms
```

## Full Design System Standard

The APT design system covers:

- semantic color tokens for background, surfaces, borders, text, accent, success, warning, and danger
- system typography with clear hierarchy and `0` letter spacing
- stable spacing and responsive constraints for boards, grids, toolbars, cards, and repeated items
- restrained surfaces with no nested cards or decorative page-section cards
- action components that use shared button, icon, menu, tab, toggle, slider, and input patterns
- complete state design for loading, empty, success, error, disabled, permission, offline, and degraded states
- content naming and messaging that is precise, honest, and matched to user intent
- accessibility expectations for contrast, focus, keyboard use, reduced motion, and readable text wrapping

Token and lint contracts live in `references/design-tokens.json` and `references/design-lint-gates.json`.

## Required Artifacts

- UX flow
- State map
- Interaction rules
- Acceptance criteria
- Design review checklist
- Token/component notes for any new pattern

## Good Example

For a new document browser, define:

- empty state when no documents match
- loading state while metadata is fetched
- error state with retry and support context
- success state with filters, results, and active selection
- disabled state for actions that require a selected document

## Bad Example

Building only the happy path screen and letting errors, empty states, keyboard behavior, and support messaging be invented during implementation.

## AI Prompt Example

```text
Design the UX behavior for this feature using APT Design Principles.

Input:
- Feature intent:
- Primary user:
- Critical workflow:
- Known constraints:

Return:
1. UX flow
2. Required states
3. Interaction rules
4. Copy guidance
5. Acceptance criteria
```

## Related Checklists

- `checklists/design-review-checklist.md`

## Related Examples

- `examples/ui/dashboard-layout-pattern.md`
- `examples/ui/navigation-layout-pattern.md`

## Related Prompts

- `prompts/design-review-prompt.md`

## Related References

- `references/design-tokens.json`
- `references/design-lint-gates.json`

## Related Documents

- `thinking.md`
- `architecture.md`
- `system-standards.md`

## Summary

Design turns the problem into a coherent user experience with complete states and reusable patterns.
