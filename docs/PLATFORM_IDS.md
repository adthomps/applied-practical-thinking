---
title: PLATFORM_IDS.md
version: v2
status: candidate
audience: developer
visibility: public
source: manual
---
# PLATFORM_IDS.md

## Cloudflare Platform IDs and Bindings

- All D1/KV/R2/Queues bindings must be declared in `wrangler.toml`
- Document binding names and usage in this file whenever bindings change
- Reference bindings in worker code via environment variables

## Binding Conventions

```toml
# D1:    DATABASE   (binding name)
# KV:    APT_KV     (binding name)
# R2:    APT_R2     (binding name)
# Queue: APT_QUEUE  (binding name)
```

Add and document concrete binding names here as each service is introduced.
