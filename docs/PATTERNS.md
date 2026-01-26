# Patterns & Conventions

## UI
- Use Apt* components from `apps/web/components/apt` for all UI.
- No direct fetch or business logic in components.

## API
- All routes in `apps/worker/src/routes`.
- No business logic in routes; use services.

## Shared
- Only pure functions/utilities in `packages/utils`.
- Only presentational components in `packages/ui`.

## Integration
- All API calls go through `/api/*` endpoints.
- All prompts and handlers are in `apps/worker/src/ai`.
- Prompts must be versioned and reviewed.

## Design System
- Use only tokens from `packages/config` for colors, fonts, spacing.
- No custom colors, fonts, or spacing.
- Dark-first only.

## File Organization
- See `AGENTS.md` and `PROJECT_RULES.md` for structure.# PATTERNS.md

## APT Patterns

- All code in `apps/` and `packages/`
- Shared logic in `packages/`
- No code at root
- Internal API: `/api/*` (worker)
- Public API: `/v1/*` (worker, versioned)
- SPA fetches only relative `/api/...` endpoints
- Use semantic tokens for all design
- Document all deviations in `apps/web/docs/design/decision-log.md`
