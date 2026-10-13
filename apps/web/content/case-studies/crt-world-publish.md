---
title: "CRT World: A Live Author Site With a Separate Editorial Path"
featured: false
id: crt-world-publish
type: case-study
status: active
description: "How CRT World publishes C. R. Thompson's worlds on a public site while keeping editorial control in an admin surface backed by a Worker and D1."
publishedAt: 2026-10-12
concepts:
  - content
  - publishing
  - cloudflare
platforms:
  - Web
technologies:
  - Cloudflare
  - React
---

## Problem And Audience

An author site has to be findable, and the writing workflow has to stay in the hands of the editor. Readers should not need the admin to discover the worlds.

## Intended Outcome

Serve The Worlds of C. R. Thompson at the public site, and keep drafts and publishing decisions in the editorial admin.

## Thinking And Decision

One Cloudflare app covers the public site and the admin. A Worker API and D1 hold the content. The public URL is the live site, not a mock.

Tradeoff: anonymous visitors see the published worlds. They do not get the editorial tools.

## What Was Left Out

A claim that every admin control is public. Grey Rain is a game concept and is not part of this site.
