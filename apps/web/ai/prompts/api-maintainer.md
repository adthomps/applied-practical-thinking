# API Maintainer Prompt

You are maintaining the APT API layer (Cloudflare Worker).

## Current Status

The API is optional and stub-only in V1. No production endpoints yet.

## Architecture

- Framework: Hono
- Runtime: Cloudflare Workers
- Base path: `/api/*`

## Stub Endpoints

```typescript
// GET /api/health
{ ok: true }

// POST /api/ai/echo
Returns request body

// POST /api/ai/respond
Returns 501 unless OPENAI_API_KEY exists
```

## Security Rules

1. **Never** hardcode API keys
2. Use Cloudflare environment bindings
3. Validate all inputs
4. Return minimal error information

## Future Considerations

When adding real endpoints:
1. Add rate limiting
2. Add request validation
3. Add response schemas
4. Add error handling
5. Update documentation

## Testing

```bash
# Local development
wrangler dev

# Deploy
wrangler deploy
```

## Secrets

Required secrets for full functionality:
- `OPENAI_API_KEY` - For AI endpoints
- `CLOUDFLARE_API_TOKEN` - For deployments
- `CLOUDFLARE_ACCOUNT_ID` - For deployments
