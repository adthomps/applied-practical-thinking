---
title: "UI Checklist"
kind: "checklist"
domain: "distribution"
status: "active"
owner: "APT"
last_updated: "2026-06-28"
source_paths: ["apt-agent-standards/checklists/ui-checklist.md"]
---

# UI Checklist

Use this checklist for React/Vite apps, dashboards, forms, workflows, and visual reviews.

## Required Checks

- Primary user intent is clear from the first interaction.
- Navigation supports repeated work and not only first-time discovery.
- Loading, empty, error, disabled, and success states are handled.
- Text fits in supported mobile and desktop viewports.
- Forms show validation, recovery, and completion states.
- Accessibility is treated as product quality, including labels, focus, contrast, and keyboard flow.
- React, TypeScript, and Tailwind projects use shadcn/ui as the default repo-owned foundation unless VPDS or another approved enterprise design system is required.
- Existing `components.json`, import aliases, Tailwind config or global CSS, installed primitives, local wrappers, and product blocks are inspected before adding shadcn components.
- Component layering is clear: `components/ui` for shadcn primitives, `components/apt` for reusable APT wrappers, and `components/blocks` for product workflow blocks.
- UI styling uses tokens, CSS variables, Tailwind utilities, and APT naming conventions rather than one-off colors or component shapes.

## Mandatory

- Review the actual rendered UI for material layout or interaction claims.
- Preserve current behavior unless the requested change explicitly alters it.
- Do not claim UX readiness without checking core workflows.
- Do not claim shadcn readiness without verifying installed components, accessibility behavior, keyboard behavior, focus states, and semantic structure.

## Recommended

- Use screenshots or browser checks for responsive and visual issues.
- Prefer task completion and clarity over decorative polish.
- Pair UI review with API review when workflows depend on backend behavior.
- Use `docs/SHADCN-UI-STANDARD.md` for repo structure examples, pnpm commands, registry guidance, and migration checks.
