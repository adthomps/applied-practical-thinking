# APT Design Architecture

> Structure exists to prevent failure, not to enable creativity.

**[2026-01-25] NOTE:**
This project now uses a monorepo structure. All code, docs, and AI prompts live under `apps/web/`. See [decision log](apps/web/docs/design/decision-log.md) for details.

This document defines the architectural patterns, deployment strategies, and enforcement rules that govern how APT projects are built, organized, and delivered.

---

## Philosophy

Design Architecture at APT is about **predictable delivery**. It's the scaffolding that ensures:

- Code lives where it belongs
- Boundaries are respected
- Deployments are reproducible
- AI assistance has clear ownership

**Core Beliefs**

1. **Monorepo by default** — Shared code, unified tooling, atomic commits
2. **Static-first, API-optional** — Frontend deploys independently; backend is additive
3. **Boundaries over flexibility** — Clear separation prevents accidental coupling
4. **Docs as code** — Architecture decisions live in version control
5. **AI-aware from day one** — Prompt ownership and routing are first-class concerns

---

## Structural Patterns

### Monorepo Layout

```
.
├─ apps/
│  ├─ web/                  # Vite + React frontend
│  └─ worker/               # Cloudflare Worker (Hono API)
│
├─ packages/
│  ├─ ui/                   # Shared UI components
│  ├─ config/               # Design tokens, constants
│  └─ utils/                # Shared pure utilities
│
├─ docs/
│  ├─ architecture.md
│  ├─ api.md
│  └─ ai.md
│
├─ ai/
│  └─ prompts/              # Versioned AI prompts
│
├─ .github/
│  └─ workflows/
│
├─ wrangler.toml
└─ pnpm-workspace.yaml
```

### Hard Rules

| Rule | Rationale |
|------|-----------|
| No code at repo root | Forces explicit placement |
| No frontend logic in `worker/` | Separation of concerns |
| No backend logic in `web/` | Security boundary |
| Shared logic lives in `packages/` | Single source of truth |
| AI prompts live in `ai/prompts/` | Versioned, auditable |

---

## Frontend/Backend Boundaries

### Frontend (`apps/web`)

**Responsibilities:**
- UI rendering and state management
- Route handling and navigation
- API client calls (never direct DB access)
- Asset bundling and optimization

**Stack:** Vite + React + TypeScript + Tailwind + shadcn/ui

**Rules:**
- No `fetch` calls in components (use `services/`)
- Components are presentational by default
- Pages orchestrate data and layout
- All styling through Tailwind tokens

### Backend (`apps/worker`)

**Responsibilities:**
- API endpoints under `/api/*`
- Authentication and authorization
- Database queries and mutations
- External service integrations
- AI endpoint handling

**Stack:** Cloudflare Workers + Hono + TypeScript

**Rules:**
- Validation before execution
- Idempotent operations where possible
- Streaming responses for AI/long operations
- All secrets via environment bindings

---

## API Contracts

### Design Principles

1. **REST-first** — Standard HTTP verbs, predictable URLs
2. **Schema at boundaries** — Validate inputs, type outputs
3. **Error consistency** — Standard error envelope
4. **Versioning via path** — `/api/v1/...` when breaking changes

### Standard Error Envelope

```typescript
interface APIError {
  error: {
    code: string;       // Machine-readable: "VALIDATION_FAILED"
    message: string;    // Human-readable
    details?: unknown;  // Additional context
  };
}
```

### Authentication Pattern

```typescript
// httpOnly cookie for web clients
// Bearer token for mobile/API clients
// Refresh token rotation for long sessions
```

---

## AI Routing & Prompt Ownership

### Principles

1. **Prompts are code** — Versioned, reviewed, tested
2. **Explicit routing** — AI endpoints are clearly marked
3. **Ownership documented** — Each prompt has an owner
4. **Boundaries respected** — AI doesn't bypass auth or validation

### File Structure

```
ai/
├─ prompts/
│  ├─ system.md           # Base system prompts
│  ├─ api-maintainer.md   # API code generation
│  ├─ design-maintainer.md # Design system guidance
│  └─ repo-maintainer.md  # Repo structure guidance
│
└─ README.md              # AI usage documentation
```

### Routing Pattern

```typescript
// apps/worker/src/routes/ai.ts
app.post('/api/ai/generate', authMiddleware, rateLimiter, async (c) => {
  // 1. Validate request
  // 2. Load appropriate prompt
  // 3. Call AI service
  // 4. Stream or return response
});
```

---

## CI/CD Flows

### Deployment Model

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  Push to Branch │────▶│  Preview Deploy │────▶│  PR Review      │
└─────────────────┘     └─────────────────┘     └─────────────────┘
                                                        │
                                                        ▼
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  Production     │◀────│  Merge to Main  │◀────│  Approval       │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

### Environments

| Environment | Trigger | URL Pattern |
|-------------|---------|-------------|
| Preview | Any branch push | `{branch}.{project}.pages.dev` |
| Staging | `main` branch | `staging.{project}.pages.dev` |
| Production | Release tag | `{project}.pages.dev` / custom domain |

### Pipeline Stages

1. **Lint** — ESLint, TypeScript, Prettier
2. **Test** — Unit tests, integration tests
3. **Build** — Vite build, Worker bundling
4. **Deploy** — Cloudflare Pages/Workers
5. **Verify** — Health checks, smoke tests

---

## Enforcement Rules

### Pre-commit Hooks

```yaml
# .husky/pre-commit
- lint-staged
- type-check
- test:affected
```

### Branch Protection

| Rule | Setting |
|------|---------|
| Require PR reviews | 1+ approval |
| Require status checks | lint, test, build |
| Require linear history | Squash merge |
| No force push | Protected |

### Code Ownership

```
# CODEOWNERS
/apps/web/           @frontend-team
/apps/worker/        @backend-team
/packages/ui/        @design-team
/ai/prompts/         @ai-team
/docs/               @all
```

---

## Applied Examples

### APT Site Architecture

**Pattern:** Static-first portfolio with optional API layer

```
apt-site/
├─ src/                    # React frontend (single app, no monorepo needed)
│  ├─ components/apt/      # APT design system
│  ├─ routes/              # Page components
│  ├─ data/                # Content registries
│  └─ theme/               # Design tokens
│
├─ docs/design/            # Portable specifications
├─ ai/prompts/             # AI agent instructions
└─ public/                 # Static assets
```

**Decisions:**
- Single app (not monorepo) due to portfolio scope
- No worker API initially (content is static)
- Design system is local (not a shared package)
- AI prompts live with the project

### Production Microservice

**Pattern:** API-first with worker functions

```
service/
├─ apps/
│  ├─ web/                 # Admin dashboard
│  └─ worker/              # Core API
│
├─ packages/
│  ├─ types/               # Shared TypeScript types
│  └─ validation/          # Zod schemas
│
└─ docs/
   └─ api.md               # OpenAPI spec
```

**Decisions:**
- Monorepo for shared types
- Worker handles all business logic
- Web is thin admin UI only
- Validation schemas shared between frontend/backend

---

## Anti-Patterns

| Anti-Pattern | Problem | Cure |
|--------------|---------|------|
| **Flat repo** | No clear ownership | Organize into apps/packages |
| **Shared mutable state** | Race conditions | Isolate per-request |
| **Inline prompts** | Unversioned, untestable | Extract to `ai/prompts/` |
| **Manual deploys** | Inconsistent, error-prone | CI/CD automation |
| **Missing boundaries** | Spaghetti dependencies | Enforce via linting |
| **Undocumented APIs** | Integration friction | Schema-first design |

---

## Quick Reference

### New Project Checklist

- [ ] Repo structure follows pattern
- [ ] README with setup instructions
- [ ] CI/CD pipeline configured
- [ ] Branch protection enabled
- [ ] CODEOWNERS defined
- [ ] API contracts documented
- [ ] AI prompts versioned

### Deployment Checklist

- [ ] Environment variables configured
- [ ] Secrets in secure storage
- [ ] Health checks passing
- [ ] Error monitoring enabled
- [ ] Performance baseline captured

### Architecture Decision Checklist

- [ ] Problem clearly stated
- [ ] Alternatives considered
- [ ] Tradeoffs documented
- [ ] Decision recorded in log
- [ ] Team notified

---

## Related Documents

- [APT Design System](./APT-DESIGN-SYSTEM.md) — Visual tokens and components
- [APT Design Thinking](./APT-DESIGN-THINKING.md) — Problem-solving methodology
- [Decision Log](./decision-log.md) — Architectural decision records
