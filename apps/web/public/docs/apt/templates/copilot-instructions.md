---
title: Copilot Instructions
version: v1
last_updated: {{DATE}}
owner: {{OWNER}}
status: draft
---

# Copilot Instructions

Follow the repository standards defined in:

- `AGENTS.md` — working rules for all contributors (human and AI)
- `DESIGN.md` — design standards, visual language, and state coverage requirements
- `ARCHITECTURE.md` — system structure, responsibility map, and boundary rules
- `CONTRIBUTING.md` — contribution workflow and review standards

These files are authoritative. Do not invent new patterns, structures, or standards that contradict them.

---

## APT Operating Hierarchy

When making decisions, evaluate in this order:

1. Principles
2. Outcomes
3. User Experience
4. Architecture
5. Implementation
6. Operations
7. Optimization

Higher levels always take precedence over lower levels.

---

## Always

- Read existing code before proposing changes.
- Follow established patterns in this repository.
- Minimize scope of changes.
- Update tests and documentation when behavior changes.
- Explain risks and tradeoffs.

---

## Never

- Expose secrets, tokens, credentials, or personal information.
- Bypass authentication, authorization, or validation gates.
- Create duplicate docs or standards — link to the canonical source instead.
- Make architectural changes without documenting them in `docs/decisions/`.

---

## Validation

Run `npm run validate` to check structural integrity before submitting changes.

---

## Prioritize

- APT Principles
- Existing repository patterns
- Documentation accuracy
- Test coverage
- Service readiness
