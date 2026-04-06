---
title: BRAND.md
version: v2
status: candidate
audience: developer
visibility: public
source: manual
---
# BRAND.md

## Purpose

Internal brand quick reference for repo contributors.

Canonical brand and design behavior lives in:

- `apps/web/docs/design/versions/v2/APT-DESIGN-SYSTEM.md`
- `apps/web/docs/design/versions/v2/APT-DESIGN-THINKING.md`
- `docs/DECISION_LOG.md`

## Current rules

- Brand: Applied Practical Thinking (APT)
- Use shared token contracts from `packages/config` for colors, fonts, and spacing
- Use shared APT UI primitives from `packages/ui`, with app-specific composition in `apps/web/components/apt`
- Dark-first remains the default experience
- Brand assets for the web app live under `apps/web/public/`

## Change policy

- Brand or design deviations must be logged in `docs/DECISION_LOG.md`
- If a brand rule becomes durable product doctrine, update the canonical design docs under `apps/web/docs/design/`
