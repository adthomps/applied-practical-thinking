---
docId: architecture-examples
slug: architecture-examples
major: 2
semanticVersion: 2.0.0
status: candidate
publishedAt: 2026-04-05
---
# APT Design Architecture Examples

Use these examples to review architecture intent against implementation reality.

---

## 1) Boundary Ownership

### Good

```tsx
// apps/web/routes/SomePage.tsx
const data = useQuery({ queryKey: ["x"], queryFn: service.fetchX });
```

```ts
// apps/web/src/services/x.ts
export async function fetchX() {
  return fetch("/api/x").then((r) => r.json());
}
```

```ts
// apps/worker/src/routes/x.ts
app.get("/api/x", auth, async (c) => {
  const result = await loadX();
  return c.json(result);
});
```

### Bad

```tsx
// apps/web/routes/SomePage.tsx
const rows = await db.query("SELECT * FROM x");
```

Why fail: frontend crosses backend boundary.

---

## 2) Service Routing

### Good

- Route orchestrates layout and intent.
- Service layer handles HTTP details and mapping.
- Worker route validates and executes side effects.

### Bad

- Component embeds URL composition, auth fallback, and error normalization.
- Multiple routes duplicate API call logic with drift.

Why fail: no single ownership point for request contracts.

---

## 3) Deploy Authority

### Good

- Pages builds `apps/web` with `VITE_API_BASE` in Pages environment.
- Worker deploys API independently with `PUBLIC_SITE_ORIGIN` in Worker config.
- Runtime changes deploy Worker first, then Pages.

### Bad

- Production Web uses one API origin while Worker was deployed from a different branch.
- Two deploy scripts modify the same surface without a single source of truth.

Why fail: split-brain deploy path and non-traceable production state.

---

## 4) Prompt Ownership

### Good

- Internal behavior control remains in `.github/copilot-instructions.md`.
- External collaborators receive `APT-AI-INSTRUCTIONS-REFERENCE.md`.
- Review bundle references public-safe docs only.

### Bad

- Public handoff includes internal-only operational rules.
- AI outputs are accepted without architecture checklist gate.

Why fail: audience contract breach and governance gap.

---

## 5) Architecture Review Fast Gate

Fail review if any are true:

- Web and worker responsibilities are mixed.
- Service layer is bypassed in data-driven route work.
- Deploy ownership is ambiguous.
- Prompt ownership/internal-vs-external split is broken.
- Doctrine and repo behavior materially drift.

Reviewer outcomes:

- Pass
- Pass with fixes
- Fail
