# AI Agents

**[2026-01-25] NOTE:**
This project now uses a monorepo structure. All code, docs, and AI prompts live under `apps/web/`. See [decision log](apps/web/docs/design/decision-log.md) for details.

This document provides instructions for AI agents working on this codebase.

## Project Overview

APT (Applied Practical Thinking) is a personal portfolio and demonstration brand built with:
- Vite + React + TypeScript
- Tailwind CSS + shadcn/ui
- React Router for navigation
- Cloudflare Pages for deployment

## Key Rules

### 1. Design System

**NEVER** use raw colors in components. Use semantic tokens:

```tsx
// ✅ Correct
<div className="bg-background text-foreground">
<div className="bg-card text-card-foreground">

// ❌ Incorrect  
<div className="bg-gray-900 text-white">
```

### 2. Component Usage

Use APT components from `apps/web/components/apt`:
- `AptButton` - User-facing action buttons and shell controls
- `AptCard` - Card containers
- `HeroCard` - Page heroes
- `AptTag` - Labels/tags

Exception:
- Native `<button>` is acceptable inside low-level accessible controls such as tabs, menus, and disclosure toggles when it is the correct semantic primitive.

### 3. File Organization

```
apps/web/
├── components/apt/     # APT design system components
├── components/ui/      # shadcn/ui base components
├── data/              # Content registries
├── routes/            # Page components
└── theme/             # Design tokens
```

### 4. Content Changes

Content lives in `apps/web/data/`:
- `site.ts` - Site configuration
- `systems.ts` - System definitions
- `gallery.ts` - Visual gallery definitions
- `*-index.json` - Generated content indexes for blogs, guides, podcasts, case studies, labs, demos, and systems

### 5. Design Deviations

Log any design deviations in `apps/web/docs/design/decision-log.md`.

## Common Tasks

### Add a new Lab

1. Add or update the lab markdown/content in `apps/web/content/labs/`
2. Rebuild content indexes via the web app scripts
3. Labs appear canonically on `/portfolio/labs` (`/labs` is a legacy redirect)

### Add a new page

1. Create component in `apps/web/routes/`
2. Add route in `apps/web/App.tsx`
3. Add nav item in `apps/web/data/site.ts`

### Modify design tokens

1. Update CSS variables in `apps/web/index.css`
2. Update TypeScript tokens in `apps/web/theme/aptTokens.ts`
3. Document in decision log

## Testing

```bash
pnpm dev     # Local development
pnpm build   # Production build
pnpm test    # Run tests
```
