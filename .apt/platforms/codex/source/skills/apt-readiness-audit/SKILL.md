---
name: apt-readiness-audit
description: Use when scoring a repository for readiness across APT alignment, architecture, documentation, UX, API, testing, Cloudflare, and maintainability.
title: "APT Readiness Audit"
kind: "platform-adapter"
domain: "platforms"
status: "active"
owner: "APT"
last_updated: "2026-06-28"
source_paths: ["apt-agent-standards/codex/skills/apt-readiness-audit/SKILL.md"]
---

# APT Readiness Audit

## Purpose
Score repository readiness and produce a prioritized adoption plan.

## When To Use
Use before rollout, after major migrations, or when deciding which profiles to install next.

## When Not To Use
Do not use for narrow code review where a focused skill is enough.

## Required Reading
Read:

- `docs/project-context.md`.
- `AGENTS.md`, `.claude/CLAUDE.md`, `.github/copilot-instructions.md`, and relevant `.codex/skills`.
- README and setup/run/deploy docs.
- Root and package `package.json` scripts.
- Deployment config, environment docs, and infrastructure config.
- Major app entry points, route handlers, UI workflows, and tests.

## Process
1. Inventory repo purpose, architecture, apps/packages, runtime, integrations, and commands.
2. Score APT alignment, architecture, documentation, UX, API, testing, Cloudflare readiness, and maintainability from 0 to 5.
3. Cite evidence for each score.
4. Identify release blockers, high-value quick wins, and larger follow-ups.
5. Recommend a staged rollout or modernization plan.
6. Do not edit files during the first audit pass.

## Output Format
Return score table, evidence, top risks, quick wins, staged plan, validation commands, and open questions.

## Validation Checklist
- All eight categories are scored.
- Scores include evidence.
- Recommendations are ordered and actionable.
- Risks distinguish blockers from follow-ups.
- Validation commands are specific to the repo.
