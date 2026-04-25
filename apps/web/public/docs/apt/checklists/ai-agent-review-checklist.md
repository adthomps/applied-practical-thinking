---
title: AI Agent Review Checklist
version: v1
last_updated: 2026-04-24
owner: APT
status: draft
---

# AI Agent Review Checklist

## Scope

Use this checklist for reusable prompts, AI routes, agent workflows, tool permissions, and AI-assisted implementation tasks.

Run it before an agent prompt becomes reusable, before an AI route ships, and before a human delegates broad implementation or review work to an agent. The checklist applies to both product-facing AI and internal developer-agent workflows.

## Required Checks

- [ ] Role and task are explicit.
- [ ] Canonical sources are named.
- [ ] In-scope and out-of-scope work are clear.
- [ ] Allowed tools and approval points are defined.
- [ ] Output format is deterministic enough to review.
- [ ] Validation criteria are included.
- [ ] Security, secrets, and production-impacting boundaries are protected.

## Failure Conditions

- Prompt asks for broad improvement with no sources or boundaries.
- Agent can mutate production or secrets without human approval.
- Output cannot be validated.
- AI behavior is embedded inline and unreviewable.

## Evidence Required

- Prompt contract.
- Source list.
- Tool/approval notes.
- Evaluation or validation criteria.
- Guardrail notes for secrets, production data, destructive actions, and external calls.
- Example output or dry-run review for reusable prompts.

## Pass Standard

The agent can act only inside named boundaries, cite or use canonical sources, produce a reviewable output, and explain what validation remains. If the prompt would let the agent invent architecture, mutate risky systems, or hide assumptions, it fails.

## Related Documents

- `../ai-agent-framework.md`
- `../examples/ai-agent/agent-prompt-contract-example.md`
- `../prompts/framework-review-prompt.md`
