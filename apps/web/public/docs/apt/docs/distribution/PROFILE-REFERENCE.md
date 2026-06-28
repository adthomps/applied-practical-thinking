---
title: "Profile Reference"
kind: "guide"
domain: "documentation"
status: "active"
owner: "APT"
last_updated: "2026-06-28"
source_paths: ["apt-agent-standards/docs/PROFILE-REFERENCE.md"]
---

# Profile Reference

Profiles are capabilities that can be combined. `apt-core` is always installed even when it is not listed in the command. Profiles distribute capability-specific agent files; canonical APT doctrine remains in `apt-principles-agents`.

Auto-detection is advisory. Review `payments`, `lovable`, and `migration` recommendations before bulk applying them because demos, lockfiles, generated ancestry, webhook docs, or payment examples can trigger valid but context-sensitive signals.

## apt-core

Baseline APT principles, review checklists, shared `AGENTS.md`, Claude guidance, and Copilot guidance.

Install when: always.

Primary installed areas: `apt-core/`, `AGENTS.md`, `.claude/CLAUDE.md`, `.github/copilot-instructions.md`.

## minimal

Minimal harness routing, model-routing overview, agent catalog, router, model router, and verifier.

Install when: a repo needs lightweight APT harness behavior without broader governance or domain profiles.

Primary installed areas: `docs/HARNESS-ARCHITECTURE.md`, `docs/AGENT-CATALOG.md`, `routing/`, `agents/apt-*`.

## standard

Standard APT harness profile for most repositories. Extends `minimal`, `documentation`, and `governance`.

Install when: a repo should use routing, verification, docs governance, readiness review, scan/repair guidance, and token efficiency.

Primary installed areas: harness docs, routing docs, token-efficiency skill, installer/scanner/repair agent specs, documentation and governance tool files.

## cloudflare

Cloudflare, React, Hono, TypeScript, Vite, Workers, Pages, D1, KV, and R2 guidance.

Install when: the repo runs or will run on Cloudflare, uses Workers or Pages, or has React/Vite/Hono runtime decisions.

Primary installed areas: `apt-core/cloudflare-standards.md`, `.claude/agents/cloudflare-*`, `.codex/skills/cloudflare-*`, `.github/instructions/cloudflare.instructions.md`, `.github/prompts/cloudflare-*.prompt.md`.

## documentation

Documentation architecture, docs sync, normalization, and documentation Copilot instructions.

Install when: the repo has meaningful docs, Markdown/MDX content, setup guides, architecture docs, or governance needs.

Primary installed areas: documentation standards, `.claude/agents/documentation-*`, `.codex/skills/docs-sync`, `.codex/skills/documentation-normalization`, `.github/instructions/docs.instructions.md`, `.github/prompts/docs-sync.prompt.md`, `.github/prompts/documentation-normalization.prompt.md`, `.github/prompts/update-docs.prompt.md`.

## api-review

API experience reviewer, API review skill, and API Copilot instructions.

Install when: the repo exposes endpoints, webhooks, OpenAPI specs, SDK behavior, or integration docs.

Primary installed areas: API standards, `.claude/agents/api-experience-reviewer.md`, `.codex/skills/api-review`, `.github/instructions/api.instructions.md`, `.github/prompts/api-review.prompt.md`, `.github/prompts/review-api.prompt.md`.

## ux-review

Intent UX reviewer, UX review skill, and shadcn/ui usage guidance for APT React, TypeScript, and Tailwind projects.

Install when: the repo contains UI components, pages, routes, forms, dashboards, or user workflows.

Primary installed areas: UX standards, `.claude/agents/intent-ux-reviewer.md`, `.codex/skills/ux-review`, `.github/instructions/frontend.instructions.md`, `.github/prompts/ux-review.prompt.md`. Use `docs/SHADCN-UI-STANDARD.md` from this standards repo for extended shadcn structure, registry, command, and migration guidance.

## migration

Repo standardization, Lovable-to-APT, Lovable-to-Cloudflare, and migration standards.

Install when: a repo is being converted, standardized, reorganized, or moved from generated structure to APT conventions.

Primary installed areas: migration standards, `.claude/agents/repo-standardizer.md`, Lovable migration agents, `.codex/skills/repo-standardization`, `.codex/skills/lovable-*`, `.github/prompts/repo-standardization.prompt.md`, `.github/prompts/lovable-*`, `.github/prompts/repo-standardize.prompt.md`.

## modernization

Cloudflare modernization and refactor safety.

Install when: an existing app is being modernized, moved to Cloudflare, or refactored with behavior-preservation requirements.

Primary installed areas: `.claude/agents/cloudflare-modernization-architect.md`, `.codex/skills/cloudflare-modernization`, `.codex/skills/refactor-safety`, `.github/prompts/cloudflare-modernization.prompt.md`, `.github/prompts/refactor-safety.prompt.md`, `.github/instructions/testing.instructions.md`.

## governance

APT readiness audit, AI output audit, and review checklists.

Install when: the repo needs readiness scoring, release discipline, AI-output review, or multi-agent governance.

Primary installed areas: `.claude/agents/apt-readiness-auditor.md`, `.claude/agents/ai-output-auditor.md`, `.codex/skills/apt-readiness-audit`, `.codex/skills/ai-output-review`, `.github/prompts/apt-readiness-audit.prompt.md`, `.github/prompts/ai-output-review.prompt.md`, `.github/prompts/review-diff.prompt.md`.

## security

Security review, secret handling, prompt-injection review, MCP permission review, and sensitive-workflow routing.

Install when: the repo handles secrets, auth, payments, health data, MCP permissions, deployment credentials, or other sensitive workflows.

Primary installed areas: `agents/apt-security-reviewer.md`, `context/security/README.md`, and governance guidance.

## knowledge-graph

Graphify and knowledge-graph participation guidance for source-backed discovery, graph hygiene, and drift review.

Install when: the repo participates in the APT-wide Graphify workflow, has enough docs/prompts/contracts/packages that graph traversal helps maintenance, or needs explicit rules for generated graph artifacts and semantic-extraction privacy.

Primary installed areas: `apt-core/knowledge-graph-standards.md`, `.codex/skills/knowledge-graph-review`, `.github/prompts/knowledge-graph-review.prompt.md`.

## lovable

Lovable project detection and conversion guidance.

Install when: the repo contains Lovable references, generated UI patterns, or is being converted from Lovable.

Primary installed areas: Lovable-to-APT and Lovable-to-Cloudflare agents, skills, prompts, and `.github/instructions/lovable-migration.instructions.md`.

## payments

Payment, merchant, webhook, Authorize.net, Cybersource, and Visa Acceptance guidance.

Install when: the repo handles payment flows, merchant onboarding, card acceptance, payment webhooks, or payment service integrations.

Primary installed areas: `.claude/agents/service-readiness-reviewer.md`, API review skill, `.github/prompts/api-review.prompt.md`, and API instructions.

## health

Workout, biomarker, Withings, Dexa, nutrition, and health-data guidance.

Install when: the repo handles health, fitness, nutrition, biomarker, wearable, or body-composition data.

Primary installed areas: service readiness review, readiness audit, API guidance, and UX guidance through inherited profiles.

## training

Testing and agent training support.

Install when: the repo needs test generation, standards adoption exercises, or contributor onboarding support.

Primary installed areas: `.codex/skills/test-generator`, `.github/instructions/testing.instructions.md`, `.github/prompts/test-generator.prompt.md`, `.github/prompts/generate-tests.prompt.md`.

## ai-development

Claude, Codex, and GitHub Copilot standards for AI-assisted development repositories.

Install when: the repo already contains `.claude`, `.codex`, `.github/copilot`, or formal AI-development workflows.

Primary installed areas: `.claude/agents/apt-principles-agents-reviewer.md`, `.codex/skills/apt-review`, `.github/instructions/apt.instructions.md`, `.github/prompts/apt-review.prompt.md`, AI-output governance through inherited profiles.

## full

All current harness and capability profiles.

Install when: building fixtures, validating release coverage, or intentionally installing every current APT capability into a repo.

Primary installed areas: all current profile-managed surfaces, routing registry, context packs, harness catalogs, and specialist agent specs.

## custom

Custom harness starter for manual profile selection.

Install when: a repo needs routing basics and profile-selection guidance, but the final capability set should be curated by an operator.

Primary installed areas: minimal harness, profile reference, proposed file changes, and token-efficiency skill.

## Suggested Combinations

- General project: `standard`
- Lightweight project: `minimal`
- Cloudflare web app: `cloudflare,documentation,ux-review,api-review`
- Cloudflare harness install: `standard,cloudflare,ux-review,api-review`
- Lovable conversion: `lovable,migration,documentation`
- Lovable to Cloudflare: `lovable,migration,cloudflare,modernization`
- API service: `api-review,documentation,governance,training`
- Payment integration: `payments,api-review,governance`
- Sensitive integration: `security,api-review,governance`
- Health product: `health,api-review,ux-review,governance`
- Graph-aware documentation or governance repo: `documentation,governance,knowledge-graph`
