---
title: Working Backwards Product Team Application
kind: operating-guidance
status: draft
owner: APT
last_updated: 2026-08-02
domain: thinking
source_paths: ["apt-principles-agents/docs/working-backwards-product-team-application.md", "apt-product-team/README.md", "apt-product-team/prd-pm-ai-team.md", "apt-product-team/.claude/agents/critic.md", "apt-product-team/.claude/agents/press-release-writer.md", "apt-product-team/.claude/agents/faq-writer.md", "apt-product-team/.claude/skills/working-backwards/SKILL.md", "apt-product-team/.claude/skills/working-backwards-methodology/SKILL.md"]
---

# Working Backwards Product Team Application

## Purpose

Use this guide when promoting reusable Working Backwards material from `../apt-product-team` into `apt-principles-agents`.

`apt-product-team` is the internal planning cockpit and fast-moving Working Backwards lab. `apt-principles-agents` owns the provider-neutral doctrine, rubrics, templates, agent-role contracts, and review standards that should be reused across APT products. Productized behavior belongs in `../apt-dream-to-reality`; public narrative belongs in `../applied-practical-thinking` only after it is sanitized and polished.

## What Belongs Here

Promote product-team material into this repo when it is reusable across tools or projects:

- Stage order: Press Release, External FAQ, Internal FAQ, Requirements, then engineering handoff.
- Role separation: writer agents produce artifacts; critic agents review artifacts and do not edit them.
- Review gates: downstream stages stay locked until the current artifact passes the critic or records an explicit stop condition.
- Rubrics: pass/fail criteria for customer definition, problem evidence, question quality, evasion, blocker flagging, traceability, and testable requirements.
- Artifact templates: press release, FAQ, requirements, session state, status reports, and task contracts.
- Open-item semantics: unresolved questions keep owners; blockers prevent safe build handoff.
- Source-lineage rules: requirements and implementation prompts trace back to approved Working Backwards artifacts.

## What Does Not Belong Here

Do not promote these as canonical doctrine:

- Claude-specific slash commands, tool names, or local command mechanics.
- GitHub persistence as a universal requirement. Treat it as an adapter option, not the doctrine.
- Raw internal planning sessions unless they are sanitized and converted into examples.
- Product-specific roadmap claims from `prd-pm-ai-team.md` unless they become reusable product-planning guidance.

## Canonical Mapping

| Product-team source | Canonical destination |
| --- | --- |
| `.claude/skills/working-backwards-methodology/SKILL.md` | `principles/thinking/README.md`, `templates/working-backwards/README.md`, and related checklists |
| `.claude/agents/press-release-writer.md` | `templates/working-backwards/agent-role-contracts.md` and product-planning skills |
| `.claude/agents/faq-writer.md` | `templates/working-backwards/agent-role-contracts.md` and FAQ template guidance |
| `.claude/agents/critic.md` | `templates/working-backwards/agent-role-contracts.md` and `templates/working-backwards/critic-rubric.json` |
| `.claude/rubrics/*.json` | `templates/working-backwards/critic-rubric.json` or versioned rubric library |
| `.claude/skills/working-backwards/SKILL.md` | provider-neutral orchestration guidance; productized implementation in `../apt-dream-to-reality` |
| `.claude/skills/wb-status/SKILL.md` | `templates/working-backwards/stage-gate-status.md` |
| `.claude/skills/github-operations/SKILL.md` | platform adapter guidance only when GitHub persistence is selected |
| `templates/output-formats/*.template` | `templates/working-backwards/*` |
| `templates/session.json.template` | `templates/working-backwards/session.json` |
| `working-backwards/*` | internal evidence or sanitized examples only |

## Application Rules

1. Preserve method before mechanics.
   - Canonical assets should describe the required behavior independent of Claude, Codex, GitHub, or a specific UI.

2. Keep the stage gate real.
   - The system must not generate requirements from an unapproved press release and FAQ package.
   - A skipped or failed gate is a stop condition, not a convenience state.

3. Keep critic feedback separate from authoring.
   - The critic returns verdicts, dimensions, evidence, and suggested fixes.
   - The writer revises only failing dimensions unless the user explicitly asks for a broader rewrite.

4. Carry uncertainty forward.
   - `[OPEN - owner: name]` items can proceed only when the risk is visible and owned.
   - `[BLOCKER - owner: name]` items prevent build handoff until resolved or explicitly accepted by an accountable decision.

5. Keep adapters optional.
   - GitHub commits, slash commands, local session folders, and model/provider choices belong in platform adapters or product repos.
   - The canonical rule is durable state, source lineage, and reviewability.

## Validation

After canonical changes in this repo, run:

```bash
npm run check
```

After productized changes in `../apt-dream-to-reality`, run that repo's contract, design, and build checks.
