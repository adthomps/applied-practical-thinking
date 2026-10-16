---
title: APT Commerce
featured: false
slug: apt-commerce-compass
date: 2026-10-12
description: The APT brand for gateway and acquiring. A full proof of concept and a new way of taking, understanding, and guiding payments so they can grow.
type: interactive
problem: How do you show merchant signup, partner and merchant portals, and a payments path without claiming a live processor?
thumbnail:
platforms:
  - Web
  - Cloud
technologies:
  - Cloudflare
  - React
  - TypeScript
tags:
  - demo
  - poc
status: active
links:
  demo: https://commerce.appliedpracticalthinking.com
  figma:
  repo:
---

APT Commerce is a working proof of concept for gateway and acquiring. The public site covers merchant signup, a partner portal, a merchant portal, and staff application review.

Applications are stored and staff can approve or reject them with an audit trail. The money path uses the APT sandbox processor, which records a mock result. It does not call live Authorize.Net or Cybersource, and it does not send webhooks from a real processor.
