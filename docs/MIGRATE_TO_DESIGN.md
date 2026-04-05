# MIGRATE_TO_DESIGN.md

## Status

This file is now a historical migration note, not the canonical design-system spec.

The current monorepo contract is:

- Shared presentational primitives live in `packages/ui`
- Shared TypeScript token contracts live in `packages/config`
- `apps/web/components/apt` may re-export shared primitives and own app-specific composition components
- Canonical design doctrine lives in `apps/web/docs/design/`

## Ongoing migration rules

1. Move stable reusable presentational components to `packages/ui`
2. Use shared semantic token contracts from `packages/config`
3. Keep app-shell and route composition in `apps/web`
4. Document durable design deviations in `docs/DECISION_LOG.md`
5. Update canonical design doctrine under `apps/web/docs/design/` when the migration changes ownership or standards
