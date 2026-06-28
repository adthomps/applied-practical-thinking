---
title: "Working Backwards Context Pack"
kind: "context"
domain: "ai"
status: "active"
owner: "APT"
last_updated: "2026-06-28"
source_paths: ["apt-agent-standards/context/working-backwards/README.md"]
---

# Working Backwards Context Pack

Use when a target repo or product workflow has a Working Backwards package, PRD, press release, FAQ set, release plan, readiness checklist, telemetry plan, or outcome tracker.

Load:

- target repo `docs/project-context.md` and `AGENTS.md`
- the local Working Backwards package or equivalent artifacts
- `apt-principles-agents/checklists/working-backwards-package-readiness-checklist.md`
- relevant target repo specs, backlog items, release notes, telemetry docs, and validation commands

Task packet should include:

- package status and build/release readiness
- approved source artifact IDs
- open items, blockers, and deferred artifacts with reasons
- press release, external FAQ, internal FAQ, PRD/requirements, release decomposition, readiness, telemetry, outcome tracker, and what-to-build handoff when present
- required validation commands and human approval points

Agents should pause before implementation when required package artifacts are missing, stale, blocked, unapproved, or deferred without a reason.
