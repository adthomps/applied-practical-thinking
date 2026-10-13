---
title: Release Communications
kind: principle
status: active
owner: APT
last_updated: 2026-08-16
source: apt-principles and apt-agent-standards
domain: "service-readiness"
source_paths: ["apt-principles-agents/principles/service-readiness/release-communications.md"]
---

# Release Communications

## Purpose

Communicate a release as an audience-specific operational contract: what is changing, who is affected, when it happens, what action is required, what evidence supports readiness, and how people obtain help or recover.

## Principles

- Derive claims from the approved release scope, validation evidence, known issues, compatibility decisions, and support plan.
- Segment internal operators, support, developers, partners, administrators, end users, and public audiences by impact and required action.
- State effective time, rollout stages, availability, prerequisites, migration or opt-in steps, behavioral changes, and limitations precisely.
- Separate confirmed behavior from expected rollout, experiment, preview, future intent, and unresolved risk.
- Pair every material risk or breaking change with detection, mitigation, rollback, support, and status-update paths.
- Keep pre-release, launch, incident, rollback, recovery, and completion messages prepared and owned before execution.

## Required Artifacts

At minimum, produce: audience/impact matrix, approved claim source, release timeline and time zone, action and migration instructions, known issues and limitations, support/escalation routes, status-update cadence, rollback/recovery messages, owner/approver record, and publication/retirement plan.

## Tradeoffs And Failure Modes

Review for marketing claims beyond evidence, vague dates, hidden breaking changes, undifferentiated audiences, instructions without prerequisites or recovery, copied secrets or internal-only details, inaccessible language, stale known issues, missing translations, and no message for rollback or delayed rollout.

## Review Questions

1. What changes for each audience, and what must they know, decide, do, monitor, or avoid?
2. Which approved artifact and validation evidence supports every material claim?
3. Are timing, availability, prerequisites, compatibility, limitations, and required actions unambiguous?
4. How will support, status, incident, rollback, recovery, and completion communications stay consistent?
5. Who approves, publishes, updates, translates, and retires each message?

## Topic-Specific Guidance

- Maintain one approved release fact set and adapt explanation and action by audience without changing the underlying truth.
- State exact scope, effective time/time zone, rollout stage, prerequisites, availability, limitations, and compatibility impact.
- Give every affected audience a clear action, validation step, recovery path, support route, and deadline where applicable.
- Prepare launch, delay, partial-rollout, incident, rollback, recovery, and completion variants before change execution.
- Exclude secrets, exploitable detail, customer data, unsupported guarantees, and internal-only speculation from public messages.
- Assign approval, publication, status-update, translation/accessibility, correction, and retirement ownership.

See the [Service Readiness canonical hub](README.md) and linked standards/checklists before making final claims.
## Related

- [APT Principles](../README.md)
- [Skills](../../skills/README.md)
- [Templates](../../templates/README.md)
