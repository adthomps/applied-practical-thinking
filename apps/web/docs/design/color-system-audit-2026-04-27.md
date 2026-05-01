---
title: Color System Audit - Applied Practical Thinking
version: v1
status: draft
audience: developer
visibility: internal
source: manual
last_updated: 2026-04-27
---

# Color System Audit - Applied Practical Thinking

This audit checks the `applied-practical-thinking` web app color system against the current APT design token standard from `apt-principles/references/design-tokens.json` and the local APT Design System v2 candidate docs.

## Canonical Standard

- Blue is the primary brand/action color.
- The restricted accent is secondary and limited to explicit support semantics such as section identity, selected support states, charts, and success treatment.
- UI surfaces should use semantic tokens such as `primary`, `accent`, `background`, `foreground`, `muted`, `border`, `ring`, and chart tokens.
- Raw Tailwind color utilities such as `blue-*`, `green-*`, `emerald-*`, `violet-*`, and `gray-*` should not appear in active app UI unless they are example content, generated public docs, or explicitly documented exceptions.

## Token Alignment

| Source | Primary/action | Accent/favorable | Result |
|---|---|---|---|
| `apt-principles/references/design-tokens.json` | `hsl(220,70%,55%)` | `hsl(165,45%,40%)` | Canonical source. |
| `apps/web/docs/design/static/APT-TOKENS.json` | `hsl(220, 70%, 55%)` dark / `hsl(220, 70%, 50%)` light | `hsl(165, 45%, 40%)` dark / `hsl(165, 45%, 35%)` light | Aligned. |
| `apps/web/index.css` | `--primary`, `--ring`, `--sidebar-primary`, and `--apt-glow` | `--accent` and chart token `--chart-2` | Aligned. |
| `apps/web/tailwind.config.ts` | `primary` maps to `hsl(var(--primary))` | `accent` maps to `hsl(var(--accent))` | Aligned. |

## Findings

| Severity | Finding | Evidence | Correction |
|---|---|---|---|
| Pass | Runtime color tokens match the current APT blue/green semantic standard. | `apps/web/index.css`; `apps/web/docs/design/static/APT-TOKENS.json` | No runtime token change needed. |
| Pass | Active app UI scan found no raw `blue-*`, `green-*`, `emerald-*`, or `violet-*` Tailwind utilities in `apps/web` or shared packages. | Focused `rg` scan over `apps/web` and `packages` source files | No UI cleanup needed. |
| Not Applicable | Raw color examples appear in versioned design docs and public generated docs as instructional examples. | `apps/web/docs/design/versions/v1/*`; `apps/web/docs/design/versions/v2/*`; `apps/web/public/docs/design/*` | Leave unchanged; these are documentation examples, not active product styling. |
| Not Applicable | Design-system portfolio examples include CSS snippets using token values and `hsl(var(--apt-glow))`. | `apps/web/routes/portfolio/DesignSystem.tsx` | Leave unchanged; these demonstrate the token system itself. |

## Remaining Allowed Color Patterns

- `hsl(var(--...))` dynamic color values remain in documentation examples, chart examples, and the design-system portfolio route.
- Versioned v1 design docs intentionally show historical raw examples and "do not use" examples.
- Generated `apps/web/public/**` design artifacts are publication outputs and should not be hand-edited as source.

## Conclusion

`applied-practical-thinking` is aligned with the current APT color doctrine for active UI. Blue remains the primary/action color, the restricted accent remains secondary for support semantics, and no low-risk app code color corrections were required in this pass.
