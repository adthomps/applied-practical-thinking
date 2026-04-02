# PATTERNS.md

## UI

- Reusable APT primitives belong in `packages/ui`
- `apps/web/components/apt` may re-export shared primitives and own app-specific composition components
- No direct fetch or business logic in components

## API

- All worker routes live in `apps/worker/src/routes`
- No business logic in routes; use lower-level services/runtime modules

## Shared

- Shared token/config contracts belong in `packages/config`
- Shared content/domain/assistant contracts belong in `packages/knowledge`
- `packages/utils` should contain only framework-agnostic helpers if used

## Integration

- All API calls go through relative `/api/*` endpoints
- Prompts are versioned in `apps/web/ai/prompts`
- Worker handlers/runtime code live in `apps/worker/src/ai` and `apps/worker/src/routes`

## Design System

- Use only shared semantic token contracts from `packages/config`
- No custom raw colors, fonts, or spacing
- Dark-first only
