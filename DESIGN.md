# APT Design System

> **APT (Applied Practical Thinking)** - A personal portfolio and demonstration brand.

**[2026-01-25] NOTE:**
This project now uses a monorepo structure. All design system code, docs, and AI prompts live under `apps/web/`. See [decision log](apps/web/docs/design/decision-log.md) for details.

This document is the entry point for the APT design system. All design decisions, tokens, and patterns are documented here.

## Quick Links

- [Design Core](apps/web/docs/design/design-core.md) - Foundational design principles
- [Design Site](apps/web/docs/design/design-site.md) - Site-specific implementations
- [Design Demos](apps/web/docs/design/design-demos.md) - Demo page patterns
- [Review Checklist](apps/web/docs/design/review-checklist.md) - Design review guide
- [VPDS Alignment](apps/web/docs/design/vpds-alignment.md) - Visual/Product design sync

## Design Principles

1. **Dark-first** - Primary experience is dark mode
2. **Card-based** - Structure content using cards
3. **Calm motion** - Subtle animations only (fade, translate, lift)
4. **Low-noise** - Minimal visual clutter
5. **One accent per section** - Use color sparingly

## Deviation Rules

Any intentional deviation from APT design standards must be:

1. Documented in [decision-log.md](apps/web/docs/design/decision-log.md)
2. Include rationale and alternatives considered
3. Reviewed before merge

## Token Sources

- CSS Variables: `apps/web/index.css`
- TypeScript Tokens: `apps/web/theme/aptTokens.ts`
- Tailwind Config: `tailwind.config.ts`
