# APT Design System Lint Checklist

Use this checklist before shipping routes, components, or design-system-facing docs.

Scope:
- Route/page composition in `apps/web/routes/*`
- App-level composition in `apps/web/components/apt/*`
- Shared primitives in `packages/ui/*`

Passing policy:
- A change should pass all `MUST` items.
- Any `NEVER` violation requires correction or an explicit decision log entry.

## 1. Tokens and Visual Contract

MUST:
- Use semantic tokens (`bg-background`, `text-foreground`, `border-border`, etc.).
- Keep visual choices aligned with `apps/web/docs/design/tokens.json`.
- Prefer `@apt/ui` primitives for repeated UI patterns.

NEVER:
- Introduce raw color utilities where tokenized equivalents exist.
- Hard-code ad hoc visual values that bypass token contracts.

## 2. Component Contract

MUST:
- Use `AptButton`, `AptCard`, `HeroCard`, and `AptTag` for user-facing patterns when applicable.
- Keep variants semantic and consistent with doctrine naming.
- Preserve accessibility semantics (buttons, links, headings, labels).

NEVER:
- Replace shared primitives with one-off lookalikes without documented intent.
- Break existing variant semantics for convenience.

## 3. Layout Baseline

MUST:
- Preserve shell structure in `apps/web/components/apt/AptLayout.tsx`.
- Keep page hierarchy clear: hero/intro, sections, support content.
- Maintain mobile-first responsiveness and readable spacing rhythm.

NEVER:
- Introduce layout changes that conflict with design architecture without a logged decision.

## 4. Content and Docs Integrity

MUST:
- Treat authored docs (`apps/web/docs/design/*`) as source of truth.
- Keep review/handoff assets current when doctrine-level changes occur.
- Update versioned docs and metadata when structural standards change.

NEVER:
- Treat generated `apps/web/public/docs/*` content as authored source.

## 5. AI and Enforcement Layers

MUST:
- Align generated/review guidance to:
  - `APT-DESIGN-SYSTEM.md`
  - `.github/copilot-instructions.md` (internal)
  - `APT-AI-INSTRUCTIONS-REFERENCE.md` (external)
  - `apps/web/docs/design/tokens.json`
  - `apps/web/components/apt/AptLayout.tsx`

NEVER:
- Produce instructions that conflict with the above contracts.

## 6. Pre-Ship Quick Checks

1. Open changed pages at mobile and desktop widths.
2. Confirm token usage for new visual styles.
3. Confirm primary/secondary action order is clear.
4. Confirm markdown/json docs links resolve.
5. Confirm no new raw color utility classes were added.
