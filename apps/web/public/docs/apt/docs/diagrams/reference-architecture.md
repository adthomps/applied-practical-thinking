---
title: APT Reference Architecture Diagram
version: v1
last_updated: 2026-05-31
owner: APT
status: stable
---

# APT Reference Architecture Diagram

The APT reference architecture defines the baseline system structure for Cloudflare-based projects. It establishes responsibility boundaries between layers so that each layer has a single, clear owner.

## System Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                          CLIENT (Browser)                           │
│                    React + TypeScript + Vite                        │
│                      Tailwind + Design System                       │
└───────────────────────────────┬─────────────────────────────────────┘
                                │ HTTPS
                                ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      CLOUDFLARE PAGES                               │
│                   Static asset hosting + CDN                        │
│               Branch previews · Custom domains                      │
└───────────────────────────────┬─────────────────────────────────────┘
                                │ /api/* routes
                                ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      CLOUDFLARE WORKER                              │
│                    Hono API (/api/v1/*)                             │
│                                                                     │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │  Route Layer          Auth guard → Input validation →        │  │
│  │                       Business logic → Response shape        │  │
│  └───────────────────────────────┬──────────────────────────────┘  │
│                                  │                                  │
│  ┌────────────┐  ┌────────────┐  │  ┌────────────┐  ┌──────────┐  │
│  │    D1      │  │     KV     │  │  │     R2     │  │ External │  │
│  │ (Database) │  │  (Cache /  │  │  │  (Object   │  │  APIs    │  │
│  │            │  │  Sessions) │  │  │  Storage)  │  │          │  │
│  └────────────┘  └────────────┘  │  └────────────┘  └──────────┘  │
└─────────────────────────────────────────────────────────────────────┘
```

## Responsibility Map

```
┌────────────────────┬───────────────────────────────────────────────┐
│  Layer             │  Owns                                         │
├────────────────────┼───────────────────────────────────────────────┤
│  Client (React)    │  Rendering, user interaction, client state    │
│                    │  Does NOT own: business rules, data contracts  │
├────────────────────┼───────────────────────────────────────────────┤
│  Cloudflare Pages  │  Static delivery, CDN, branch previews        │
│                    │  Does NOT own: API logic, data storage         │
├────────────────────┼───────────────────────────────────────────────┤
│  Hono Route Layer  │  Route matching, auth guards, input validation │
│                    │  Does NOT own: business logic, DB queries       │
├────────────────────┼───────────────────────────────────────────────┤
│  Business Logic    │  Domain rules, orchestration, error handling  │
│                    │  Does NOT own: HTTP, rendering, storage access │
├────────────────────┼───────────────────────────────────────────────┤
│  D1 (SQLite)       │  Relational data, queries, migrations         │
│                    │  Access via: parameterized queries only        │
├────────────────────┼───────────────────────────────────────────────┤
│  KV Store          │  Sessions, cache, feature flags, edge config  │
│                    │  Does NOT own: relational data or joins        │
├────────────────────┼───────────────────────────────────────────────┤
│  R2 (Object Store) │  Files, images, exports, large blobs          │
│                    │  Access via: signed URLs, never direct public  │
└────────────────────┴───────────────────────────────────────────────┘
```

## Request Flow

```
Browser Request
       │
       ▼
Cloudflare Pages (static)
  └── /api/* proxy ──▶ Cloudflare Worker
                              │
                         Hono Router
                              │
                    ┌─────────▼──────────┐
                    │  Auth Middleware    │
                    │  (JWT / Cookie)    │
                    └─────────┬──────────┘
                              │ (if authorized)
                    ┌─────────▼──────────┐
                    │  Input Validation  │
                    │  (schema / type)   │
                    └─────────┬──────────┘
                              │ (if valid)
                    ┌─────────▼──────────┐
                    │  Business Logic    │
                    │  + D1 / KV / R2    │
                    └─────────┬──────────┘
                              │
                    ┌─────────▼──────────┐
                    │  Response Shape    │
                    │  { success, data } │
                    └────────────────────┘
```

## API Route Convention

```
Internal app routes:    /api/*
Public stable routes:   /v1/*

Resource naming (nouns, not verbs):
  ✓  GET    /api/v1/users
  ✓  POST   /api/v1/invoices
  ✓  GET    /api/v1/invoices/:id
  ✗  GET    /api/v1/getUsers
  ✗  POST   /api/v1/createInvoice
```

## Monorepo Layout

```
project/
├── apps/
│   ├── site/          Cloudflare Pages (React + Vite)
│   └── worker/        Cloudflare Worker (Hono API)
├── packages/
│   ├── ui/            Shared components (no app-specific imports)
│   ├── config/        Tokens, env helpers, constants
│   └── utils/         Pure utilities (no platform side effects)
└── docs/
    ├── decisions/     ADRs
    └── diagrams/      Structure diagrams
```

## Related Docs

- `architecture.md` — canonical architecture standards and responsibility rules
- `system-standards.md` — API naming, response shape, configuration rules
- `examples/architecture/cloudflare-pages-workers-example.md` — applied example
- `examples/architecture/monorepo-layout-example.md` — monorepo applied example
