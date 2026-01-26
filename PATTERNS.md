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

## APT Monorepo Patterns

- All app code lives under `apps/` (web, worker)
- Shared code in `packages/` (ui, config, utils)
- All design system docs/tokens in `apps/web/docs/design/`
- AI prompts in `apps/web/ai/prompts/`
- No code at repo root except config/docs
- Internal API: `/api/*` (served by worker)
- Public API: `/v1/*` (served by worker, versioned)
- SPA fetches only relative `/api/...` endpoints
- packages/core must not import from apps

## Example File Tree

```
apps/
  web/
    components/
    data/
    routes/
    docs/
    ai/
  worker/
packages/
  ui/
  config/
  utils/
```

## Import Rules

- Use `@/components/apt` for APT components
- Use `@/lib/utils` for utilities
- Never import from apps/web in packages/
