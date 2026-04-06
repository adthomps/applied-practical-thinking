---
title: Design Architecture
version: v2
status: candidate
audience: developer
visibility: public
source: manual
---
# Design Architecture

APT's architecture is modular, monorepo-based, and enforces strict boundaries between UI, API, and business logic.

## Structure
- Vite + React SPA (UI)
- Cloudflare Worker (API)
- Shared packages for config, UI, and utils

## Rules
- No business logic in UI or routes
- All fetches use /api/* endpoints
- Use Vite aliases for shared packages
