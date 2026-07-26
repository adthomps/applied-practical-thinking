---
title: "Shadcn UI Standard"
kind: "guide"
domain: "documentation"
status: "active"
owner: "APT"
last_updated: "2026-06-28"
source_paths: ["apt-agent-standards/docs/SHADCN-UI-STANDARD.md"]
---

# Shadcn UI Standard

Use this guide when applying APT UI standards to React, TypeScript, Tailwind, Vite, Next.js, Hono, and Cloudflare projects.

## Standard

shadcn/ui is the default UI implementation foundation for APT-aligned React, TypeScript, and Tailwind projects unless the project requires VPDS or another approved enterprise design system.

Treat shadcn/ui as:

- repo-owned component source, not a black-box dependency
- a composable UI pattern system
- a registry-based distribution model for components, hooks, utilities, pages, config, and rules
- an agent-friendly way to keep UI decisions consistent across repos

Components installed from shadcn are owned by the repo and may be modified. Preserve accessibility, keyboard behavior, focus states, semantic structure, ARIA behavior, token-based styling, and local naming conventions when modifying them.

## When To Use

Use shadcn/ui when a project uses React, TypeScript, and Tailwind and needs reusable UI primitives, forms, dashboards, docs surfaces, data tables, navigation, overlays, feedback, or workflow blocks.

Do not use shadcn/ui when:

- VPDS or another enterprise design system is mandatory
- the project is not React/Tailwind
- the surface is transactional email or another constrained client
- the UI is a simple static surface that does not need component infrastructure
- adopting shadcn would conflict with an approved local design-system decision

## Required Agent Behavior

Before adding or updating shadcn components:

- inspect the package manager and use that runner, usually `pnpm dlx`
- inspect `components.json` when present
- inspect current component folders, routes/pages, hooks, utilities, and local wrappers
- inspect import aliases and resolved component paths
- inspect Tailwind version, Tailwind config, and global CSS/token file
- inspect installed shadcn primitives before importing or re-adding them
- inspect whether VPDS or another enterprise design system is required
- preview updates with dry-run or diff before overwriting repo-owned components

Do not add components blindly. Reuse installed primitives and local wrappers first.

## Component Layers

Single-app projects should use this shape unless the project already has a stronger local convention:

```text
src/
  components/
    ui/          # shadcn primitives
    apt/         # reusable APT wrappers
    blocks/      # product and workflow blocks
  hooks/
  lib/
  pages/         # Vite or router pages, when used
  routes/        # Next.js app routes or router routes, when used
  styles/        # global CSS or token entry, when used
```

Monorepos may keep UI app-local:

```text
apps/
  web/
    components/
      ui/
      apt/
      blocks/
    hooks/
    lib/
    app/ or src/
```

Or shared through a package when more than one app consumes the same UI:

```text
packages/
  ui/
    src/
      components/
        ui/
        apt/
        blocks/
      hooks/
      lib/
```

Keep ownership clear. `components/ui` contains primitives and small primitive adaptations. `components/apt` contains reusable APT wrappers. `components/blocks` contains product workflows and may import wrappers and primitives, but primitives should not import app-specific blocks.

## Recommended APT Patterns

- `AptPageShell`: consistent page layout, heading area, actions, and optional breadcrumbs.
- `AptEmptyState`: reusable empty state with title, description, primary action, and secondary recovery path.
- `AptStatusBadge`: token-based status display with semantic variants.
- `AptNextActionPanel`: focused next-step guidance for workflow continuation.
- `AptDataTable`: table composition with sorting, filtering, loading, empty, and error states.
- `AptReviewChecklist`: checklist display for review, readiness, and migration workflows.
- `AptDocsLayout`: docs/principles layout with navigation, article body, and optional table of contents.

Build these from shadcn primitives such as Button, Card, Badge, Alert, Table, Tabs, Dialog, Sheet, Sidebar, Breadcrumb, Separator, Skeleton, Toast/Sonner, and form primitives. Keep business logic outside presentational wrappers.

## Install Commands

Use the package manager already used by the project. For pnpm projects:

```bash
pnpm dlx shadcn@latest init
pnpm dlx shadcn@latest add button card dialog table badge
pnpm dlx shadcn@latest add <component> --dry-run
pnpm dlx shadcn@latest add <component> --diff <file>
```

When a registry item is added, read the added files before continuing. Confirm imports match the project aliases and that accessibility, keyboard behavior, focus management, and token usage remain intact.

## Future APT Registry

APT should eventually publish a shadcn registry for reusable APT UI assets:

- primitives adapted to APT tokens
- `components/apt` wrappers
- product blocks for docs, reviews, dashboards, onboarding, and migration flows
- hooks and utilities
- pages and layouts
- Tailwind, CSS variable, and token config
- agent rules and usage notes

Registry items must remain explicit. Agents should not guess a registry source for a requested block or component.

## Migration Checklist

- [ ] Identify whether the project is React, TypeScript, and Tailwind.
- [ ] Check whether VPDS or another enterprise design system is required.
- [ ] Inspect current component structure, routes/pages, hooks, utilities, and styles.
- [ ] Inspect `components.json`, aliases, Tailwind version, and global CSS/token file.
- [ ] Inventory existing buttons, forms, cards, tables, dialogs, navigation, badges, alerts, empty states, and loading states.
- [ ] Map existing UI into `components/ui`, `components/apt`, and `components/blocks`.
- [ ] Add only the shadcn primitives needed for the next workflow.
- [ ] Replace one-off UI with composed primitives or APT wrappers in small reviewed steps.
- [ ] Preserve current behavior, accessibility, keyboard flow, focus states, and semantic structure.
- [ ] Run lint, typecheck, tests, build, and browser checks when available.
- [ ] Document local exceptions in project context or a decision record.
