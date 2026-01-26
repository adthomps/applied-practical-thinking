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
- `AptButton` - All buttons
- `AptCard` - Card containers
- `HeroCard` - Page heroes
- `AptTag` - Labels/tags

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
- `labs.ts` - Lab definitions
- `systems.ts` - System definitions
- `learn.ts` - Blog/podcast/guide metadata
- `strong.ts` - Case studies

### 5. Design Deviations

Log any design deviations in `apps/web/docs/design/decision-log.md`.

## Common Tasks

### Add a new Lab

1. Add entry to `src/data/labs.ts`
2. Lab will appear on `/labs` automatically

### Add a new page

1. Create component in `src/routes/`
2. Add route in `src/App.tsx`
3. Add nav item in `src/data/site.ts`

### Modify design tokens

1. Update CSS variables in `src/index.css`
2. Update TypeScript tokens in `src/theme/aptTokens.ts`
3. Document in decision log

## Testing

```bash
pnpm dev     # Local development
pnpm build   # Production build
pnpm test    # Run tests
```
