---
title: Agent Harness Flow Example
version: v1
last_updated: 2026-06-21
owner: APT
status: draft
kind: "example"
domain: "ai-agent"
source_paths: ["apt-principles/examples/ai-agent/agent-harness-flow-example.md"]
---

# Agent Harness Flow Example

## Context

An APT maintainer wants an AI agent to update documentation and related checklists for a new governance standard. The change is not product code, but it affects canonical guidance consumed by humans, Codex, GitHub Copilot, Claude, ChatGPT, local LLMs, and future AI platforms.

## Problem

A broad prompt such as "modernize the docs" lets the agent discover, edit, verify, and approve its own work in one pass. That hides source selection, risk classification, validation evidence, and human approval boundaries.

## APT Principles Applied

- AI: agent work follows explicit harness stages and canonical sources.
- Knowledge: docs link to source-of-truth material instead of duplicating doctrine.
- Quality: validation evidence is required before completion.
- Security: approval is required for sensitive or high-impact changes.
- Execution: remediation is bounded to the classified task.

## Solution

Use the harness lifecycle as the operating frame:

```text
Discover:
  Read README.md, AGENTS.md, ai-agent-framework.md, standards/README.md, relevant checklists, and validator rules.

Classify:
  APT layer: AI and Knowledge.
  Risk: medium because canonical doctrine changes.
  Approval: human review before merge.

Validate:
  Confirm current validator passes and identify missing standards.

Remediate:
  Add focused standards and update linked build-kit artifacts.

Verify:
  Run npm run validate and summarize changed files.

Approve:
  Human maintainer reviews the doctrine change and decides whether to publish or sync downstream.
```

## Example Structure

```text
Intent:
Modernize agent governance without making apt-principles-agents an implementation repo.

Owner:
APT doctrine maintainer.

Inputs:
Canonical docs, existing standards, validator, requested modernization themes.

Flow:
Discover -> Classify -> Validate -> Remediate -> Verify -> Approve.

Artifacts:
Updated ai-agent-framework.md, standards/ai/*.md, checklist, prompts, examples, references, assessment report.

Validation:
npm run validate.

Risks:
Doctrine drift, duplicated guidance, accidental installer ownership, model-name-specific rules.

Related APT docs:
ai-agent-framework.md, standards/ai/agent-harness-standard.md.
```

## Tradeoffs

The harness adds visible steps to work that could otherwise be done quickly with one prompt. That extra structure is worthwhile for canonical doctrine, security-sensitive work, repository lifecycle changes, and any workflow that later becomes reusable automation. For low-risk drafting, the same stages can be lightweight.

## Common Mistakes

- Starting remediation before reading canonical docs and validator rules.
- Treating model confidence as verification.
- Letting an agent approve its own high-risk or public-facing change.
- Updating doctrine without updating related checklists, prompts, examples, or references.
- Adding implementation responsibilities to `apt-principles-agents` that belong to APT Agent or `apt-principles-agents`.

## Implementation Notes

APT Agent can implement this as a workflow controller later, but this example is not a required module design. It shows the minimum evidence shape needed for a human maintainer to understand and review AI-assisted standards work.

## Related Documents

- `../../ai-agent-framework.md`
- `../../standards/ai/agent-harness-standard.md`
- `../../standards/ai/verification-standard.md`
- `../../checklists/ai-agent-review-checklist.md`
- `../../prompts/agent-harness-review-prompt.md`
