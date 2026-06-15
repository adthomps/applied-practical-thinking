---
title: ARCHITECTURE.md
version: v1
last_updated: {{DATE}}
owner: {{OWNER}}
status: draft
---

# ARCHITECTURE.md

## Purpose

This document defines the architectural standards used across APT projects.

---

# Architecture Principles

## Outcome Driven

Architecture exists to support business and user outcomes.

Avoid architecture for architecture's sake.

---

## Practicality

Prefer:

* Simplicity
* Reliability
* Maintainability

Over:

* Novelty
* Complexity
* Over-engineering

---

## Serviceability

Systems should be easy to:

* Support
* Monitor
* Troubleshoot
* Extend

---

# Reference Architecture

```text
Frontend
    │
    ▼
Cloudflare Pages
    │
    ▼
Hono API (/api)
    │
    ├── D1
    ├── KV
    ├── R2
    └── External APIs
```

---

# Frontend Standards

Preferred stack:

* React
* TypeScript
* Vite
* Tailwind

Guidelines:

* Component driven
* Reusable patterns
* Strong typing
* Minimal state complexity

---

# API Standards

API-first development.

Requirements:

* OpenAPI support
* Consistent error responses
* Pagination
* Validation
* Versioning strategy

Preferred route structure:

```text
/api/v1/*
```

---

# Data Standards

Requirements:

* Stable identifiers
* Audit timestamps
* Referential integrity
* Migration support

Avoid destructive schema changes.

---

# Security Architecture

Principles:

* Least privilege
* Defense in depth
* Secure by default

Requirements:

* Authentication
* Authorization
* Audit logging
* Input validation
* Output sanitization

---

# Observability

Required:

* Structured logging
* Request IDs
* Error tracking
* Metrics

Preferred metrics:

* Availability
* Performance
* Errors
* Adoption
* Business outcomes

---

# Documentation Architecture

```text
docs/
├── decisions/
├── diagrams/
├── presentations/
└── reference/
```

---

# Architecture Decision Records

Store in:

```text
docs/decisions/
```

Naming:

```text
ADR-001-title.md
ADR-002-title.md
```

Structure:

* Context
* Decision
* Alternatives
* Consequences

---

# Operational Readiness

Before release:

✓ Monitoring configured

✓ Logging configured

✓ Alerts defined

✓ Documentation updated

✓ Runbooks available

✓ Rollback identified

✓ Support informed

---

# Continuous Improvement

Systems should generate measurable feedback.

Review:

* Performance
* Reliability
* Usage
* Support requests
* User feedback

Use findings to guide future improvements.

---

# APT Architecture Definition of Done

✓ Architecture documented

✓ Security reviewed

✓ Data model reviewed

✓ APIs documented

✓ Monitoring defined

✓ Operational impact reviewed

✓ Support readiness confirmed

✓ Future maintainers can understand the system

---

# Downstream Project Repository Template

Use this layout when starting a new project that adopts APT. Product and application repos should follow this structure — it differs intentionally from `apt-principles` itself, which is a doctrine repo, not a product repo.

```text
.
├─ AGENTS.md                          # Agent working rules for this repo
├─ CONTRIBUTING.md                    # Contribution guidelines
├─ README.md                          # Repo index and quick-start
├─ package.json                       # Scripts: validate, test, build, deploy
├─ pnpm-workspace.yaml                # Monorepo projects only; omit for single-package repos
├─ docs/
│  ├─ architecture.md                 # This file, filled in for the project
│  ├─ design.md                       # Project-specific design decisions
│  ├─ api-standards.md                # Project API contract and deviation notes
│  ├─ testing.md                      # Test strategy and validation approach
│  └─ deployment.md                   # Deployment runbook and rollback plan
│  └─ apt/
│     ├─ adoption.md                  # APT adoption mode and maturity record
│     └─ decisions/                   # ADRs: ADR-001-title.md, ADR-002-title.md
├─ .github/
│  ├─ copilot-instructions.md         # Workspace rules for GitHub Copilot
│  ├─ agents/
│  │  ├─ apt-auditor-readonly.agent.md   # Copy from apt-principles templates/
│  │  ├─ api-architect.agent.md          # Adapt scope to this project's API layer
│  │  ├─ frontend-implementer.agent.md   # Adapt scope to this project's UI layer
│  │  ├─ test-engineer.agent.md          # Adapt scope to this project's test strategy
│  │  ├─ docs-maintainer.agent.md        # Adapt scope to this project's docs/
│  │  └─ security-reviewer.agent.md      # Adapt scope to this project's auth model
│  ├─ skills/                            # Copy relevant skills from apt-principles
│  │  ├─ apt-repo-architect/SKILL.md
│  │  ├─ cloudflare-hono-worker-builder/SKILL.md   # If using Cloudflare + Hono
│  │  ├─ api-first-openapi-designer/SKILL.md
│  │  ├─ webhook-event-designer/SKILL.md           # If handling webhooks
│  │  ├─ testing-validation-runner/SKILL.md
│  │  └─ docs-kb-maintainer/SKILL.md
│  └─ prompts/
│     ├─ review-repo.prompt.md            # Copy from apt-principles .github/prompts/
│     ├─ generate-api.prompt.md           # Copy and adapt for this project's API
│     ├─ add-feature.prompt.md            # Copy and adapt for this project's stack
│     └─ create-docs.prompt.md            # Copy from apt-principles .github/prompts/
└─ scripts/
   ├─ validate-repo.mjs                # Structure and frontmatter checks
   ├─ check-docs.mjs                   # Broken link and coverage checks
   └─ smoke-test.mjs                   # Basic end-to-end readiness check
```

## Key differences from `apt-principles`

| `apt-principles` (doctrine repo) | Downstream project repo |
|-----------------------------------|------------------------|
| Canonical principle files at root | Principle files live in `docs/` |
| `checklists/`, `prompts/`, `references/` as first-class dirs | Checklists and prompts copied/adapted into `.github/` |
| Agents scope to doctrine maintenance | Agents scope to product implementation roles |
| No `pnpm-workspace.yaml` | Add only if monorepo |
| Scripts: validate doctrine structure | Scripts: validate project health and docs |

## Adoption modes

See [checklists/project-adoption-checklist.md](../checklists/project-adoption-checklist.md) for gate criteria per mode.

- **Copy**: vendor selected APT assets into the project at project setup; update manually on APT version bumps.
- **Sync**: periodically refresh `.github/agents/`, `.github/prompts/`, and skills from `apt-principles`.
- **Apply**: reference `apt-principles` as external canonical source; keep local docs linked but not copied.
- **Showcase**: publish a `docs/apt/adoption.md` with maturity evidence for public portfolio.
