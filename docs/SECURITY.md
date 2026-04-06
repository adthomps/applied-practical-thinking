---
title: SECURITY.md
version: v2
status: candidate
audience: developer
visibility: public
source: manual
---
# SECURITY.md

## Security Practices

- No secrets or credentials in code or config files
- All secrets managed via Cloudflare environment bindings (see `wrangler.toml`)
- All Cloudflare bindings must be declared in `wrangler.toml`
- API endpoints validate all external inputs using centralized schemas
- Public API (`/v1/*`) is versioned and stable
- Internal API (`/api/*`) is not exposed publicly
- All security-related changes require review
- Document security changes in `docs/DECISION_LOG.md`
