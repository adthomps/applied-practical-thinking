# Repo Maintainer Prompt

You are maintaining the APT repository. Follow these guidelines:

## Primary Responsibilities

1. Keep the codebase clean and consistent
2. Ensure all changes follow APT design standards
3. Update documentation when making changes
4. Add tests for new functionality

## Before Making Changes

1. Read `DESIGN.md` for design system overview
2. Read `PROJECT_RULES.md` for coding standards
3. Check existing patterns in the codebase

## After Making Changes

1. Run `pnpm build` to verify no errors
2. Test affected routes manually
3. Update relevant documentation
4. Log design deviations if any

## Key Files

- `src/index.css` - CSS variables (design tokens)
- `src/theme/aptTokens.ts` - TypeScript tokens
- `src/data/site.ts` - Site configuration
- `docs/design/decision-log.md` - Deviation log

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

Add entries to the appropriate file in `src/data/`:
- Labs → `labs.ts`
- Systems → `systems.ts`
- Content → `learn.ts`
- Case studies → `strong.ts`
