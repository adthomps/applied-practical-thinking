---
id: apt-commerce-compass
title: APT Commerce Compass
type: system
description: A working payments proof. Merchant signup, partner and merchant portals, and staff review are implemented. The money path is the APT sandbox processor.
publishedAt: 2026-10-12
featured: false
status: working-proof
tags:
  - payments
  - cloudflare
  - sandbox
links:
  demo: https://commerce.appliedpracticalthinking.com
---

APT Commerce Compass is a working proof of a gateway and acquiring flow.

## What a visitor can verify

The public site covers merchant signup, a partner portal, a merchant portal, and staff application review. Staff can approve or reject an application, and that decision is audited. The money path records a result through the APT sandbox processor.

## What must not be claimed

It does not call live Authorize.Net or Cybersource. It does not send webhooks from a real processor. Shipping the site is not the same as offering acquiring.
