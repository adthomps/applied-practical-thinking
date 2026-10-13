---
id: apt-site
title: APT Site
type: system
description: The public portfolio. Cloudflare Pages serves the Vite and React app. A separate Worker reads those public files and returns the Labs, Proof, and Insights feeds.
publishedAt: 2026-10-12
featured: false
status: active
tags:
  - vite
  - react
  - cloudflare
---

This site is the public Applied Practical Thinking portfolio.

## What is implemented

The browser app is built with Vite and React and deployed on Cloudflare Pages. Authored pages live in `apps/web/content`. A Cloudflare Worker, deployed separately, reads the published indexes and markdown and serves the public feeds.

## What must not be claimed

This site does not authenticate visitors with JWT, and it does not expose a general data API. The Worker is a content and assistant boundary, not an account system.
