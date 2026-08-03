---
title: "Working Backwards Stage Gate Status"
kind: "template"
domain: "thinking"
status: "draft"
owner: "APT"
last_updated: "2026-08-02"
source_paths: ["apt-principles-agents/templates/working-backwards/stage-gate-status.md", "apt-product-team/.claude/skills/wb-status/SKILL.md", "apt-product-team/templates/session.json.template"]
---

# Working Backwards Stage Gate Status

Use this template when a product, repo, or agent needs to display the current state of a Working Backwards package without changing it.

## Status Values

- `PENDING`: stage has not started.
- `IN PROGRESS`: stage is active or awaiting revision.
- `PASS`: critic approved the stage.
- `NEEDS REVISION`: critic found failing dimensions and the stage is still editable.
- `BLOCKED`: the stage cannot proceed without external evidence, owner action, or an explicit decision.

## Status View

```text
WORKING BACKWARDS SESSION
ID:      {session_id}
Feature: {feature_idea}
Started: {created_at}
Updated: {updated_at}

Stage 1: Press Release        [{status}] {revision_note}
Stage 2: External FAQ         [{status}] {revision_note}
Stage 2: Internal FAQ         [{status}] {revision_note}
Stage 3: Requirements         [{status}] {revision_note}
Stage 4: Engineering Handoff  [{status}] {revision_note}

Current stage: {current_stage}
Open items:    {open_item_count}
Blockers:      {blocker_count}
Next action:   {next_action}
```

## Artifact Checklist

```text
Committed or persisted artifacts:
  {mark} press-release.md
  {mark} faq-external.md
  {mark} faq-internal.md
  {mark} requirements.md
  {mark} engineering-prompt.md
  {mark} delivery-preview.md
```

Use `x` or `done` only when the artifact has durable source lineage and review state. A generated draft without approval should be shown as in progress, not complete.

## Next-Action Rules

- If a stage is `IN PROGRESS`, continue or revise that stage.
- If a stage is `NEEDS REVISION`, show the critic feedback before asking for new generation.
- If any blocker exists, show the blocker owner and why it prevents handoff.
- If all required stages pass, show the approved package and ask for explicit delivery confirmation.
- If delivery has not been confirmed, do not create backlog records or implementation tasks.

## Read-Only Rule

Status views should not mutate session files, artifact records, review events, or delivery items. They are reporting surfaces only.
