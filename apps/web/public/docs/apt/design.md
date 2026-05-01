---
title: APT Design Principles (What)
version: v1
last_updated: 2026-04-28
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
- Blue is the primary brand and action color for primary calls to action, links, focus rings, and high-frequency emphasis.
- Muted teal/green is a restrained accent for active navigation, selected states, hover or focus surface accents, badges, large callouts, chart accents, and success treatment.
- System font stack is the default.
- Motion should be subtle and short.

Canonical token roles from the current APT runtime:

```text
background: --background
surface: --card
primary: --primary
accent: --accent
text: --foreground
border: --border
radius-sm: 0.85rem
radius-md: 1.1rem
radius-lg: 1.35rem
motion-fast: 140ms
motion-normal: 220ms
```

## Brand Color Decision

APT uses a mostly blue visual system by design. Blue carries the brand mark, default primary calls to action, focus rings, links, and high-frequency emphasis because it anchors the calm technical identity of Applied Practical Thinking.

Muted teal/green is intentionally secondary. It should create contrast for active navigation, selected states, hover or focus surface accents, badges and tags, large callouts, chart accents, and success treatment where relevant. It should not become the default CTA color unless a project records an explicit brand decision.

## Color Roles and Interaction Rules

Color choices must start from semantic role, not visual preference.

- Blue is for brand identity, primary calls to action, links, focus rings, and high-frequency action emphasis.
- Muted teal is for active navigation, selected states, hover or focus surface accents, badges and tags, large callouts, chart accents, and success treatment.
- Neutral surfaces are for default navigation, secondary buttons, inactive tabs, cards, panels, dividers, and disabled surfaces.
- Danger, warning, and success colors are semantic feedback colors. Do not use them as general decoration or to create arbitrary variety.
- Disabled treatment should reduce contrast and interaction affordance without hiding the control or changing its meaning.
- Raw colors require a design decision record. Implementation should use the semantic aliases in `references/design-tokens.json` even when an alias maps to an existing base token value.

## Full Design System Standard

The APT design system covers:

- semantic color tokens for background, surfaces, borders, text, navigation, action, focus, selection, disabled, accent, success, warning, and danger
- system typography with clear hierarchy and `0` letter spacing
- stable spacing and responsive constraints for boards, grids, toolbars, cards, and repeated items
- global footer shells that use the compact APT footer template for product/site navigation and legal metadata
- restrained surfaces with no nested cards or decorative page-section cards
- action components that use shared button, icon, menu, tab, toggle, slider, and input patterns
- complete state design for loading, empty, success, error, disabled, permission, offline, and degraded states
- content naming and messaging that is precise, honest, and matched to user intent
- accessibility expectations for contrast, focus, keyboard use, reduced motion, and readable text wrapping

Token and lint contracts live in `references/design-tokens.json` and `references/design-lint-gates.json`.

## Footer Template Pattern

APT product and doctrine sites should use the compact footer pattern proven in `apt-dream-to-reality` unless a project records a brand-layer exception.

The footer contract is:

- outer shell: top border using `border-border/60`, subtle `bg-card/55`, and optional backdrop blur
- inner width: standard container with `px-4 py-8 md:py-10`
- primary layout: `grid grid-cols-1 gap-8 md:grid-cols-4`
- brand block: first column group spans two desktop columns and includes a small APT emblem, product/site name, Applied Practical Thinking label, and one concise description
- link groups: two short columns with `text-sm` headings, `space-y-2` links, muted default text, and foreground hover state
- divider: one horizontal border at `my-6`
- metadata row: stacked on mobile and horizontal on desktop, using `text-sm` legal text and optional `text-xs` build, license, disclaimer, or AI-use note

Keep the footer compact. It should confirm identity, expose the most useful routes, and close the page without becoming a second sitemap or marketing section.

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
- `examples/ui/footer-layout-pattern.md`

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
