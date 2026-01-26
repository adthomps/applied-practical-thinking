# Security

## Guardrails
- No secrets or credentials in code or config files.
- Use environment variables for all sensitive data.
- All Cloudflare bindings must be declared in `wrangler.toml`.
- Validate all external input using centralized schemas.

## Review
- All security-related changes require review.# SECURITY.md

## Security Practices

- All secrets managed via Cloudflare environment bindings (see wrangler.toml)
- No secrets in code or config files
- API endpoints validate all inputs
- Public API (`/v1/*`) is versioned and stable
- Internal API (`/api/*`) is not exposed publicly
- Document all security changes in `apps/web/docs/design/decision-log.md`
