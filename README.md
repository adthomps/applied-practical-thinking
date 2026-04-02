# Applied Practical Thinking

APT is a monorepo for the Applied Practical Thinking portfolio site. The active application lives in `apps/web/` and is a static-first Vite + React + TypeScript app styled with Tailwind CSS, shadcn/ui primitives, and the APT component system.

## Current repo shape

```text
apps/
  web/       # Active frontend application
packages/    # Reserved for future shared packages
docs/        # Project/process documentation
```

Design system docs, prompts, and site-facing content all live under `apps/web/`.

## Getting started

Prerequisites:

- Node.js 18+
- `pnpm`

Install dependencies:

```sh
pnpm install
```

Run the web app:

```sh
pnpm dev
```

Build the web app:

```sh
pnpm build
```

Run tests:

```sh
pnpm test
```

You can also run the app directly from its workspace:

```sh
pnpm --dir apps/web dev
pnpm --dir apps/web build
pnpm --dir apps/web test
```

## Content and design guardrails

- Site content lives in `apps/web/content/` and `apps/web/data/`
- Routes and app code live in `apps/web/routes/` and `apps/web/components/`
- Design documentation lives in `apps/web/docs/design/`
- Use semantic design tokens only; avoid raw color classes in app components
- Prefer APT components such as `AptButton`, `AptCard`, `HeroCard`, and `AptTag`

## References

- [APT Design Architecture](apps/web/docs/design/APT-DESIGN-ARCHITECTURE.md)
- [APT Design System](apps/web/docs/design/APT-DESIGN-SYSTEM.md)
- [Decision Log](apps/web/docs/design/decision-log.md)
- [Documentation Index](DOCUMENTATION_INDEX.md)
