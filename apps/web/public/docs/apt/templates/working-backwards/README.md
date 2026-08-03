---
title: "Working Backwards Templates"
kind: "template"
domain: "thinking"
status: "active"
owner: "APT"
last_updated: "2026-08-01"
source_paths: ["apt-principles-agents/templates/working-backwards/README.md", "apt-product-team/templates/session.json.template", "apt-product-team/templates/output-formats/press-release.md.template", "apt-product-team/templates/output-formats/faq.md.template"]
---

# Working Backwards Templates

Use these templates when turning an idea into a staged product package before backlog generation or implementation handoff.

## Package Order

1. Press release
2. External FAQ
3. Internal FAQ
4. Requirements
5. Engineering prompt or implementation blueprint

Each stage should preserve open items with an owner. Blockers must remain visible until resolved and should prevent build handoff.

## Templates

- [Session](session.json)
- [Press Release](press-release.md)
- [FAQ](faq.md)
- [Requirements](requirements.md)
- [Critic Rubric](critic-rubric.json)
- [Agent Role Contracts](agent-role-contracts.md)
- [Stage Gate Status](stage-gate-status.md)
- [AI Task Contract](ai-task-contract.json)

## Use In Target Repos

Target repos can copy these templates into their local planning area, `.apt/` package, or product workspace. Claude Code-specific commands, slash commands, GitHub commits, and session mechanics belong in platform adapters, internal planning repos, or product implementations; these templates are provider-neutral.

## Role Boundary

Working Backwards implementations should keep authoring and review separate. Writer roles draft or revise artifacts. Critic roles evaluate against versioned rubrics and do not edit artifacts directly. Orchestrators preserve stage state, source lineage, open items, blockers, and approval history.
