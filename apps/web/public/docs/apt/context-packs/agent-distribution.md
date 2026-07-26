---
title: "Context Pack Strategy"
kind: "context-pack"
domain: "ai"
status: "active"
owner: "APT"
last_updated: "2026-06-28"
source_paths: ["apt-agent-standards/context-packs/README.md"]
---

# Context Pack Strategy

Context packs are compact, task-focused bundles that help agents load the smallest useful set of APT guidance before planning or reviewing a target repo.

This folder explains the public strategy. The installable pack sources remain in `context/` so existing profiles, manifests, install, and sync behavior stay stable.

## Available Packs

| Pack | Use for | Existing source |
| --- | --- | --- |
| APT core | APT intent, behavior preservation, source-of-truth boundaries | `context/apt-principles-agents/README.md` |
| Architecture | repo shape, ownership, modernization, routing | `context/architecture/README.md` |
| UI | workflows, accessibility, state design, frontend review | `context/ui/README.md` |
| API | API review through `.apt/standards/installable-summaries/api-standards.md` and API manifests | `.apt/standards/installable-summaries/api-standards.md` |
| Documentation | docs structure, drift checks, setup and operating docs | `context/documentation/README.md` |
| Cloudflare | Workers, Pages, Hono, bindings, deployment review | `context/cloudflare/README.md` |
| Security | secrets, auth, permissions, sensitive workflows | `context/security/README.md` |
| Payments | payment flows, webhooks, merchant integrations | `context/payments/README.md` |

## When To Use Context Packs

- Use packs during discovery, planning, summarization, and cross-repo alignment.
- Load only packs that match the target repo type and requested work.
- Record which packs were used when producing repo-alignment findings.
- Pair packs with `docs/project-context.md` from the target repo whenever available.

## When Not To Rely On Packs Alone

Compression is allowed for discovery, planning, summarization, and cross-repo alignment.

Compression is not enough for security, compliance, payment handling, final validation, or exact code edits.

For sensitive or final-change work, read the full relevant source files before making claims or edits. This includes code, config, schema, docs, manifests, route handlers, auth logic, payment handlers, deployment settings, and local agent instructions.

## Headroom And Similar Tools

Headroom or similar compression tools may create compact pack summaries for faster orientation. They are optional support, not required infrastructure.

Compressed output must:

- identify source files used
- preserve source-of-truth boundaries
- mark uncertainty and omitted areas
- avoid replacing exact source reads for final edits

## Agent Usage Rules

- Start with target repo facts, then choose packs.
- Use packs to decide what to inspect, not as proof that a repo complies.
- Do not claim a repo follows APT standards unless the relevant files were checked against the relevant checklist.
- For exact edits, read the source files that will be changed and the local instructions that govern them.
