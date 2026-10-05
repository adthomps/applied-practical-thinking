---
title: "APT Design Source"
kind: guide
domain: design
status: active
owner: APT
last_updated: 2026-10-04
source_paths: ["apt-principles-agents/design/"]
---

# APT Design Source

This folder is the single source of APT design tokens (DR-015 / APT-019). Products receive it through the `design` manifest, installed under `.apt/design/` in each repository.

| Path | What it is |
|---|---|
| `tokens/APT-TOKENS.json` | Canonical token values (Tokens Studio format). The only file to edit by hand. |
| `VERSION`, `CHANGELOG.md` | Design version recorded by consumers as `designVersion`, with migration notes. |
| `generated/apt-tokens.css` | Generated token CSS: `:root` light, `.dark` dark. |
| `generated/apt-tokens.dark-first.css` | Generated token CSS: `:root` dark, `.light` light. |
| `generated/tailwind-preset.cjs` | Generated Tailwind v3 preset (colors, radius, shadows, durations). |
| `generated/apt-theme.css` | Generated Tailwind v4 `@theme inline` mapping. |
| `generated/tokens.ts` | Generated typed token values. |
| `bin/apt-design-check.mjs` | Contrast, token-drift and design-lint check driven by `apt-design.json`. |

The generated folder is deliberately not called `dist/`: nearly every product's `.gitignore` ignores `dist/`, which would leave `.apt/design/dist/` out of fresh clones and CI.

## Using it in a product

1. Add the manifest. `node ../apt-principles-agents/scripts/apt-assets.mjs install --target . --manifests design` installs it, and later syncs keep it current.
2. Add `apt-design.json` at the repository root (schema: `.apt/references/apt-design.schema.json`):

   ```json
   {
     "$schema": "./.apt/references/apt-design.schema.json",
     "tier": 1,
     "css": "apps/web/src/index.css",
     "lint": { "roots": ["apps/web/src"], "allowlist": ["apps/web/src/components/ui/chart.tsx"] }
   }
   ```

3. Import the generated tokens in the product stylesheet. Use `apt-tokens.css` or `apt-tokens.dark-first.css` to match the theme layout, and keep only product-specific variables locally:

   ```css
   @import "../../../.apt/design/generated/apt-tokens.dark-first.css";
   ```

4. Tailwind v3: `presets: [require("../../.apt/design/generated/tailwind-preset.cjs")]`. Tailwind v4: `@import` `apt-theme.css` after the token CSS.
5. Run the check in a script and in CI: `node .apt/design/bin/apt-design-check.mjs`.

## Tiers

- **Tier 1 (APT products):** values must equal `generated/` except listed `exclusions`. Each exclusion needs a `reason` and a `decision` record.
- **Tier 2 (brand products):** own palette allowed. The APT semantic token names must exist, and contrast must pass.
- **Tier 3 (legacy or no UI):** guidance only. The check exits successfully without checking.

The tier is set in `references/workspace-consumers.json`, not by the product. `apt-design.json` must declare the same tier, and `audit-workspace` lists any repository that doesn't under `designTierMismatch`. Moving a repository between tiers is a decision record here.

**Lint baseline.** A repository with existing raw colours can set `lint.baseline` to its current finding count. The check fails only when findings rise above it, and asks for the baseline to be lowered when they fall, so the count only goes down. Tier 1 repositories should reach 0.

## Changing a token

1. Edit `tokens/APT-TOKENS.json`.
2. Run `node scripts/build-design.mjs`.
3. Bump `VERSION` and add a `CHANGELOG.md` entry with migration notes.
4. Run `npm run check`, then commit.
5. Run `node scripts/apt-assets.mjs audit-workspace --workspace-root ..` and read `designBehind` to see which repositories to sync.
