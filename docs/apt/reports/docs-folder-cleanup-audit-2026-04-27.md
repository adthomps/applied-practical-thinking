---
title: Applied Practical Thinking Docs Folder Cleanup Audit
version: v1
last_updated: 2026-04-27
owner: APT
status: draft
audience: internal
visibility: internal
source: manual
review_type: docs-cleanup-audit
canonical_source: ../../../../apt-principles
---

# Applied Practical Thinking Docs Folder Cleanup Audit

## Summary

This audit classifies root `docs/` files after the public-docs source-of-truth cleanup. The active policy is aggressive: keep local operating facts and adoption evidence, remove duplicate APT-wide doctrine, and point reusable standards to canonical `apt-principles`.

## Classification

| File | Action | Reason |
| --- | --- | --- |
| `docs/ARCHITECTURE.md` | Keep | Repo-specific app/package boundaries, source/generated split, and local deployment shape. |
| `docs/DEPLOYMENT.md` | Keep | Repo-specific Cloudflare Pages/Worker deployment contract and production environment values. |
| `docs/LOCAL_DEV.md` | Keep | Repo-specific local setup, commands, environment variables, and verification entrypoints. |
| `docs/MAINTENANCE.md` | Keep | Repo-specific content, docs, prompt, review, and operations runbook. |
| `docs/DECISION_LOG.md` | Keep | Local decision history and exceptions. |
| `docs/DOCUMENTATION_METADATA_ROLLOUT.md` | Keep | Local metadata rollout schedule enforced by repo validation scripts. |
| `docs/LEARN_CONTENT_INVENTORY.md` | Keep | Local editorial inventory for public site content. |
| `docs/PLATFORM_IDS.md` | Keep | Local Cloudflare binding conventions and future binding IDs. |
| `docs/apt/**` | Keep | Local APT adoption, profile, audit reports, and machine-readable evidence. |
| `docs/AI_AGENTS.md` | Delete | Duplicated by `apps/web/ai/README.md`, `docs/MAINTENANCE.md`, and canonical `apt-principles/ai-agent-framework.md`. |
| `docs/AI_PROMPT.md` | Delete | Duplicated by `apps/web/ai/README.md` and canonical AI/prompt guidance in `apt-principles`. |
| `docs/ASSISTANT.md` | Delete | Stale design-assistant spec; local prompt ownership now lives in `apps/web/ai/README.md`. |
| `docs/EVALS.md` | Delete | Duplicated by canonical AI-agent review guidance and local validation/reporting flow. |
| `docs/PATTERNS.md` | Delete | Local boundaries consolidated into `PROJECT_RULES.md`, `docs/ARCHITECTURE.md`, and `docs/MAINTENANCE.md`. |
| `docs/REVIEW_CHECKLIST.md` | Delete | Superseded by `apps/web/docs/design/static/APT-REVIEW-STANDARD.md` and `apt-principles/checklists/design-review-checklist.md`. |
| `docs/SECURITY.md` | Delete | APT-wide security guidance belongs in `apt-principles/security.md`; local secret/binding notes moved to retained runbooks. |
| `docs/TESTING.md` | Delete | Testing commands moved to `docs/LOCAL_DEV.md`; quality doctrine belongs in `apt-principles/quality-testing.md`. |
| `docs/BRAND.md` | Delete | Brand/design rules belong in local design docs and `docs/DECISION_LOG.md`, not a duplicate quick reference. |
| `docs/MIGRATE_TO_DESIGN.md` | Delete | Explicitly historical migration note; current ownership is documented in retained architecture/design docs. |
| `docs/APT_SITE_LINT_VALIDATION_2026-04-05.md` | Delete | Superseded dated lint report; current validation evidence is generated under `reports/validation/` and summarized in audit reports. |

## Consolidated Details

- AI prompt and agent ownership moved into `apps/web/ai/README.md` and `docs/MAINTENANCE.md`.
- Security and quality review pointers now reference canonical `apt-principles` doctrine and checklists from `PROJECT_RULES.md` and `docs/MAINTENANCE.md`.
- Web test/lint/validation commands are retained in `docs/LOCAL_DEV.md`.
- Design review points to `apps/web/docs/design/static/APT-REVIEW-STANDARD.md` and canonical `apt-principles/checklists/design-review-checklist.md`.

## Residual Risk

- Existing external links to deleted root docs will break. The active repo index now points to retained docs and canonical sources.
- Historical lint and migration details are removed from active docs by design. If historical reconstruction is needed, use Git history.
- Future APT-wide guidance should be updated in `apt-principles`, then regenerated into public artifacts, instead of recreating root docs.
