---
title: APT Data Standards
version: v1
last_updated: 2026-05-31
owner: APT
status: stable
---

# Data Standards

Extracted from `system-standards.md` and `architecture.md`. See those files for full context.

## Identifiers

- All entities must have stable, opaque identifiers (e.g., `user_123`, `invoice_abc`).
- Do not use sequential integers as public-facing IDs.
- Do not expose internal database row IDs through the API.

## Timestamps

All stored entities should include:

```
created_at   — when the record was created
updated_at   — when the record was last modified
```

For audit-sensitive entities, also include:

```
created_by   — user or system that created the record
updated_by   — user or system that last modified it
```

## Referential Integrity

- Foreign key relationships must be defined and enforced at the schema level.
- Do not rely solely on application logic to maintain referential integrity.

## Schema Changes

- Do not make destructive schema changes (column drops, type changes) without a migration plan.
- Schema migrations must be reviewed before deployment.
- Rollback procedures must be documented for schema changes affecting production data.

## Soft Deletes

When records must be preserved for audit or recovery, prefer soft deletes:

```
deleted_at   — null means active; timestamp means deleted
```

Hard deletes require explicit authorization and documented rationale.

## Configuration & Secrets

- `.env.example` or equivalent must document all required environment variables.
- Secrets must never be committed to source control.
- Cloudflare bindings must be documented near `wrangler.toml` or equivalent.
- Environment names must be explicit: `dev`, `preview`, `production`.

## Related

- `system-standards.md` — canonical source
- `architecture.md` — data architecture section
- `security.md` — secrets management
