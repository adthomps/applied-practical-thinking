---
id: "apt-site"
title: "APT Site"
type: "system"
description: "Portfolio and demonstration platform built with Vite, React, and Cloudflare Pages."
publishedAt: "2026-02-01"
featured: false
tags: ["vite", "react", "cloudflare"]
related:
  - case-study-apt-lab
  - case-study-portfolio-redesign
  - portfolio-website
---

This site itself—a Vite + React + Tailwind stack deployed on Cloudflare Pages with optional Hono worker APIs.

## Production Guide
- **Overview:** Vite + React SPA deployed on Cloudflare Pages, with optional Hono worker APIs for backend.
- **Deployment:** See README for build and deploy steps. Configure Cloudflare Pages and Wrangler for worker APIs.
- **API:** Worker APIs documented in /api routes. Auth via JWT, data via REST endpoints.
- **Operations:** Monitor via Cloudflare dashboard. Rollback via git and redeploy.

## Learning Resources
- **Rationale:** Static-first for speed and simplicity. Unified design system for consistency.
- **Case Studies:** case-study-apt-lab, case-study-portfolio-redesign
- **Tutorials:** guide-to-deployment, guide-to-content-management
- **Glossary:** SSR, SPA, API, Design System
