# Repo Maintainer Prompt

You are maintaining the APT repository. Follow these guidelines:

## Primary Responsibilities

1. Keep the codebase clean and consistent
2. Ensure all changes follow APT design standards
3. Update documentation when making changes
4. Add tests for new functionality

## Before Making Changes

1. Read `DESIGN.md` for design doctrine entrypoints
2. Read `PROJECT_RULES.md` for coding standards
3. Check existing patterns in the codebase

## After Making Changes

1. Run `pnpm build` to verify no errors
2. Test affected routes manually
3. Update relevant documentation
4. Log design deviations if any

## Key Files

- `apps/web/index.css` - CSS variables (design tokens)
- `packages/config/src/aptTokens.ts` - Shared TypeScript token contract
- `apps/web/data/site.ts` - Site configuration
- `apps/web/docs/design/decision-log.md` - Internal deviation log

## Common Patterns

### Adding a component

```tsx
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const variants = cva("base-classes", {
  variants: {
    variant: {
      default: "variant-classes",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export function Component({ className, variant, ...props }) {
  return <div className={cn(variants({ variant, className }))} {...props} />;
}
```

### Adding content

Add entries to the appropriate source location:
- Experiments → markdown files in `apps/web/content/labs` and generated index in `apps/web/data/labs-index.json`
- Systems → `apps/web/data/systems.ts`
- Learn content → markdown under `apps/web/content/*` with generated indexes in `apps/web/data/*-index.json`
