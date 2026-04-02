# Applied Practical Thinking

APT is a monorepo for the Applied Practical Thinking platform.

## Current repo shape

```text
apps/
  web/       # Public Vite + React application
  worker/    # Cloudflare Worker API/AI subsystem
packages/
  ui/        # Shared APT presentational primitives
  config/    # Shared token/config contracts
  knowledge/ # Shared content/domain/assistant contracts
docs/        # Internal project/process documentation
```

Authored site content and design docs live under `apps/web/`. Shared package contracts live under `packages/`.

## Getting started

Prerequisites:

- Node.js 20+
- `pnpm`

Install dependencies:

```sh
pnpm install
```

Run the web app:

```sh
pnpm dev
```

Run the worker:

```sh
pnpm dev:worker
```

Build the web app:

```sh
pnpm build
```

Run tests:

```sh
pnpm test
```

You can also run each app directly from its workspace:

```sh
pnpm --dir apps/web dev
pnpm --dir apps/web build
pnpm --dir apps/worker dev
```

## Content and design guardrails

- Source content lives in `apps/web/content/` and authored registries live in `apps/web/data/`
- Source design docs live in `apps/web/docs/design/`
- Shared APT primitives live in `packages/ui/` and are re-exported through `apps/web/components/apt/` during the migration
- Shared TypeScript token contracts live in `packages/config/`
- Shared content/domain contracts live in `packages/knowledge/`
- `apps/web/public/` is output-oriented:
  - copied markdown/docs/indexes are generated artifacts
  - authored markdown/docs should not be edited in `public/`
- Use semantic design tokens only; avoid raw color classes in app components

## References

- [APT Design Architecture](apps/web/docs/design/APT-DESIGN-ARCHITECTURE.md)
- [APT Design System](apps/web/docs/design/APT-DESIGN-SYSTEM.md)
- [Decision Log](apps/web/docs/design/decision-log.md)
- [Documentation Index](DOCUMENTATION_INDEX.md)
