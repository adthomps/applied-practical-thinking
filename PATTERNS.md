# PATTERNS.md

## APT Monorepo Patterns

- All app code lives under `apps/`
- Shared code lives under `packages/`
- No app imports from another app
- Shared package imports use explicit package contracts such as `@apt/ui`, `@apt/config`, and `@apt/knowledge`
- Internal API routes live under `/api/*`
- Public API routes, if introduced, live under `/v1/*`
- Prompts live in `apps/web/ai/prompts/`
- Source markdown/docs are authored outside `public/`

## Import Rules

- Reusable primitives belong in `packages/ui`
- Shared token contracts belong in `packages/config`
- Shared content/domain contracts belong in `packages/knowledge`
- `apps/web/components/apt` may re-export stable shared primitives during migration
