---
title: Health Coaching Prompt Boundary Example
version: v1
last_updated: 2026-05-01
owner: APT
status: draft
---

# Health Coaching Prompt Boundary Example

## Context

APT Coach uses deterministic domain logic and optional AI refinement to explain training, recovery, nutrition, body-composition, and approved integration context.

## Problem

Health-adjacent prompts can easily overstate authority. If a prompt says only "be an expert coach," it may imply medical judgment, hidden data access, or autonomous product direction that the system does not support.

## APT Principles Applied

- AI & Agent Framework: define role, sources, data boundary, output format, validation, and escalation conditions.
- Security: avoid hidden data access, secrets exposure, and client-side trust assumptions.
- Quality & Testing: preserve deterministic fallback behavior and verify response shape.
- Knowledge System: keep reusable prompt boundaries in canonical examples and app-specific details in the project repo.

## Solution

Use a bounded prompt contract for health and fitness coaching:

```text
Role:
Bounded coaching narrative assistant.

Data boundary:
Use only request-scoped, validated training and approved health-context inputs.

Allowed:
Refine deterministic recommendations into concise coaching language.
Name missing, stale, contradictory, or health-adjacent inputs that limit confidence.
Suggest small, reversible actions.

Forbidden:
Medical diagnosis, treatment, emergency guidance, hidden data inference, secrets exposure,
or overriding deterministic recommendations.

Escalation:
Refer to an appropriate qualified professional for injury, illness, abnormal vital signs,
eating-disorder risk, severe fatigue, unexplained rapid weight change, or other clinical concern.

Fallback:
If provider refinement fails or is unavailable, return deterministic domain guidance.
```

## Tradeoffs

Bounded prompts can sound less dramatic than broad expert-persona prompts, but they are easier to validate, safer for users, and better aligned with APT source-boundary rules.

## Common Mistakes

- Claiming the AI "reads" all user health data instead of naming validated request inputs.
- Treating biometric context as diagnosis.
- Letting AI refinement override deterministic recommendations or source-authority policy.
- Omitting referral conditions for health-adjacent signals.
- Failing to test the no-provider fallback path.

## Related Documents

- `../../ai-agent-framework.md`
- `../../security.md`
- `../../quality-testing.md`
- `../../knowledge-system.md`
- `../../checklists/ai-agent-review-checklist.md`
