# Project Rules & Architecture Guardrails

## Monorepo Structure

- All code is in a single repo, split by function:
  - `apps/web`: Vite + React SPA (UI only, no business logic)
  - `apps/worker`: Cloudflare Worker (Hono, API only, no business logic in routes)
  - `packages/ui`: Presentational Apt* components only
  - `packages/config`: Design tokens and config only
  - `packages/core`: Business logic and data adapters only

## Data Flow

- UI fetches data from `/api/*` endpoints (served by worker). No direct fetches in React components—use service modules.
- All fetches in web use relative `/api/*` URLs (never hardcode full URLs).
- Internal API worker serves `/api/*` and may return UI-specific view models.
- Public API worker serves `/v1/*` and must be stable + versioned.

## Boundaries

- No business logic in UI or routes: All logic lives in services or shared packages.
- No cross-imports from `apps/*` to `packages/core`.
- Use Vite aliases for shared packages (`@apt/ui`, `@apt/config`).
- All AI/agent prompts must be file-based and versioned in `apps/worker/src/ai/prompts`.
- No custom colors, fonts, or spacing—use only tokens from `packages/config`.
- No light mode—dark-first only.

## Validation

- Validation schemas must be centralized (no duplication).

## Data Layers

- If D1/KV/R2/Queues are used, bindings must be declared in `wrangler.toml` and documented in `docs/PLATFORM_IDS.md`.

## Deployment

- Use Cloudflare Pages for web, Wrangler for workers.
- Pages preview/prod, Workers via GitHub Actions if present.

## Testing

- Use `pnpm test` for all packages.

## Local Development

- Start frontend: `cd apps/web && npm install && npm run dev`
- Start backend: `cd apps/worker && npm install && npm run dev`
- Frontend runs at http://localhost:5173
- Backend runs at http://localhost:8787 (proxied via Vite for `/api`)

## Examples

- To add a new UI feature, create a presentational component in `packages/ui`, import it in `apps/web`, and orchestrate data via a service in `src/services`.
- To add a new API endpoint, add a route in `apps/worker/src/routes`, implement logic in a service, and ensure no business logic leaks into the route handler.# Project Rules

**[2026-01-25] NOTE:**
This project now uses a monorepo structure. All code, docs, and AI prompts live under `apps/web/`. See [decision log](apps/web/docs/design/decision-log.md) for details.

## Non-Negotiables

1. **Dark-first design** - Dark mode is the default experience
2. **Card-based layout** - Structure content using cards
3. **Calm motion only** - No jarring animations
4. **Semantic tokens** - Never use raw colors
5. **Concise copy** - No marketing language

## Code Standards

### TypeScript

- Strict mode enabled
- Explicit types for function parameters
- Prefer interfaces over types for objects

### React

- Functional components only
- Custom hooks for shared logic
- Lazy loading for route components (future)

### CSS

- Tailwind utility classes
- CSS variables for theming
- No inline styles except for dynamic values

## File Naming

- Components: PascalCase (`AptButton.tsx`)
- Utilities: camelCase (`aptTokens.ts`)
- Routes: PascalCase (`Home.tsx`)

## Commit Messages

Format: `type(scope): description`

Types:
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation
- `style` - Formatting
- `refactor` - Code restructuring
- `test` - Adding tests

## Review Requirements

- Design changes: Check against apps/web/docs/design/review-checklist.md
- New components: Add to /design playground (apps/web/routes/DesignPlayground.tsx)
- Deviations: Document in apps/web/docs/design/decision-log.md
