# Project Rules

## Monorepo Structure

- `apps/web`: Vite + React SPA, routing, shell, page composition, content source
- `apps/worker`: Cloudflare Worker API/AI subsystem
- `packages/ui`: shared presentational APT primitives
- `packages/config`: shared design tokens/config contracts
- `packages/knowledge`: shared content/domain/assistant contracts
- `packages/utils`: framework-agnostic helpers only if actively used

## Boundaries

- No app may import from another app
- Shared code flows only from `packages/*` into apps
- No business logic in routes or presentational components
- Prompts are file-based and versioned in `apps/web/ai/prompts`
- No custom colors, fonts, or spacing; use shared token contracts from `packages/config`
- Dark-first only

## Data Flow

- Web runtime data may come from generated static assets in `apps/web/public/*` and from relative `/api/*` worker endpoints
- No direct fetches in React components; use services/modules
- Public API routes, if introduced, live under `/v1/*`

## Source vs Generated

- Source of truth:
  - `apps/web/content/`
  - `apps/web/docs/`
  - `apps/web/data/`
- Generated runtime copies:
  - `apps/web/public/content/`
  - `apps/web/public/docs/`
  - `apps/web/public/data/`

Do not edit copied markdown/docs in `public/` as authored source.

## Testing and Local Development

- Web: `pnpm --dir apps/web dev`
- Worker: `pnpm --dir apps/worker dev`
- Web tests: `pnpm --dir apps/web test`

## Review Requirements

- Design changes: check `apps/web/docs/design/review-checklist.md`
- Deviations: document in `apps/web/docs/design/decision-log.md`
