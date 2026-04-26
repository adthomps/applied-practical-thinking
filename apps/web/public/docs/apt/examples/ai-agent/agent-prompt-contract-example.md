---
title: Agent Prompt Contract Example
version: v1
last_updated: 2026-04-24
owner: APT
status: draft
---

# Agent Prompt Contract Example

## Context

An AI agent will review pull request changes for APT doctrine alignment.

## Problem

A vague prompt such as "review this" produces inconsistent feedback and may ignore canonical standards.

## APT Principles Applied

- AI: prompts map to APT layers.
- Knowledge: canonical sources are explicit.
- Quality: output must be reviewable.
- Security: destructive and sensitive actions require approval.

## Solution

Define a prompt contract:

```text
Role:
APT framework reviewer.

Sources:
apt-principles.md, architecture.md, system-standards.md, security.md.

Allowed:
Read files, identify findings, suggest fixes.

Forbidden:
Mutate production, expose secrets, approve risky changes without validation.

Output:
Findings by severity, missing artifacts, validation gaps, residual risk.
```

## Example Structure

```text
Role:
Task:
Canonical sources:
Allowed tools:
Forbidden actions:
Expected output:
Validation criteria:
Human approval points:
```

Review output example:

```text
Finding: High - prompt can edit files without named validation.
Standard: ai-agent-framework.md, Required Artifacts.
Evidence: prompt has no validation criteria.
Fix: add allowed tools, expected output, validation commands, and approval points.
```

## Tradeoffs

A contract makes prompts longer, but it makes AI work easier to review and repeat.

## Common Mistakes

- No source docs.
- No output format.
- No approval boundary.
- Inline prompts scattered through code.
- Prompt asks for broad creativity in production-sensitive work.

## Implementation Notes

Reusable prompts should be versioned and reviewed like code. If the prompt can cause file edits, production impact, public messaging, or security-sensitive behavior, include explicit validation and human approval points.

## Related Documents

- `../../ai-agent-framework.md`
- `../../checklists/ai-agent-review-checklist.md`
