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

Use when a target repo or product workflow has a Working Backwards package, PRD, press release, FAQ set, release plan, readiness checklist, telemetry plan, outcome tracker, generated asset plan, or AI implementation handoff.

Working Backwards is staged product definition before build: idea framing leads to press release, external FAQ, internal FAQ, requirements, and finally implementation handoff. The stage order protects the customer problem from being overwritten by premature solution work.

Load:

- target repo `docs/project-context.md` and `AGENTS.md`
- the local Working Backwards package or equivalent artifacts
- `apt-principles-agents/checklists/working-backwards-package-readiness-checklist.md`
- `apt-principles-agents/templates/working-backwards/`
- `apt-principles-agents/standards/ai/provider-neutral-ai-task-contract.md`
- relevant target repo specs, backlog items, release notes, telemetry docs, and validation commands

Task packet should include:

- package status and build/release readiness
- approved source artifact IDs
- open items, blockers, and deferred artifacts with reasons
- press release, external FAQ, internal FAQ, PRD/requirements, demo or mock evidence, generated asset inventory, release decomposition, readiness, telemetry, outcome tracker, and what-to-build handoff when present
- task capability when AI is used: `draft_press_release`, `generate_external_faq`, `generate_internal_faq`, `critic_review`, `generate_requirements`, or `generate_engineering_prompt`
- required validation commands and human approval points

Agents should pause before implementation when required package artifacts are missing, stale, blocked, unapproved, or deferred without a reason.

Generated assets and AI build prompts should trace back to approved Working Backwards artifacts. Treat diagrams, media, examples, copy, screenshots, demo plans, and implementation prompts as downstream evidence, not as independent sources of product truth.

Provider-specific agent mechanics belong in platform adapters or local repos. For example, an internal Claude Code planning lab may keep fast-moving slash commands and Claude-specific session behavior, while a hosted Dream-to-Reality product should consume the provider-neutral stages, rubrics, templates, and task contract.
