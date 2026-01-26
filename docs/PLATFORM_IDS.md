# Platform IDs & Cloudflare Bindings

## Cloudflare Bindings
- All D1/KV/R2/Queues bindings must be declared in `wrangler.toml`.
- Document binding names and usage here.

## Example

```
[vars]
D1_DATABASE = "my_db"
KV_NAMESPACE = "my_kv"
R2_BUCKET = "my_bucket"
QUEUE_NAME = "my_queue"
```

## Usage
- Reference these bindings in worker code via environment variables.# PLATFORM_IDS.md

## Cloudflare Platform IDs and Bindings

- See `wrangler.toml` for all environment bindings
- D1/KV/R2/Queues: Add and document bindings here as needed
- Example:
  - D1: `DATABASE` (binding name)
  - KV: `APT_KV` (binding name)
  - R2: `APT_R2` (binding name)
- Update this file whenever bindings change
