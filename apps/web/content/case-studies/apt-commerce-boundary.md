---
title: "Commerce Compass: A Payments Proof Without a Live Processor"
featured: false
id: apt-commerce-boundary
type: case-study
status: active
description: "Why APT Commerce Compass ships signup, review, and a sandbox money path, and why that must not be described as live Authorize.Net or Cybersource processing."
publishedAt: 2026-10-12
concepts:
  - payments
  - sandbox
  - proof
platforms:
  - Web
technologies:
  - Cloudflare
  - React
---

## Problem And Audience

People looking at the portfolio need to see a payments flow they can click. They also need a hard line between a working proof and a live gateway. Merchants, partners, and reviewers should not leave thinking the site authorizes real cards.

## Intended Outcome

Show merchant signup, partner and merchant portals, and staff approve or reject, with an audited decision. Record a money-path result without calling a live processor.

## Thinking And Decision

The money path uses the APT sandbox processor and stores a mock result. Live Authorize.Net and Cybersource stay out of the claim, and so do processor webhooks.

Tradeoff: the demo cannot prove settlement, funding, or a production certification. It can prove the product path and the review controls.

## What Was Left Out

Live card processing, processor webhooks, account closure, and any statement that this is an acquiring service.
