# Patterns

## UI

- Use Apt\* components for all UI
- No business logic in UI
- No direct fetch in components

## API

- All routes in apps/worker/src/routes
- No business logic in routes
- Use services for logic

## Shared

- Only pure functions/utilities in packages/utils
- Only presentational components in packages/ui
