---
title: Working Backwards Package Readiness Checklist
version: v1
last_updated: 2026-06-22
owner: APT
status: draft
kind: "checklist"
domain: "working-backwards-package-readiness-checklist"
source_paths: ["apt-principles/checklists/working-backwards-package-readiness-checklist.md"]
---

# Working Backwards Package Readiness Checklist

## Scope

Use this checklist when a product idea, feature, implementation prompt, or release should be driven by a complete Working Backwards package.

The package is ready when the team can trace what to build from customer intent through FAQ risk, demo or doc evidence, telemetry, release readiness, and outcome measures.

## Required Checks

- [ ] Press release states the customer, problem, outcome, and why now.
- [ ] External FAQ covers adoption, value, workflow change, trust, pricing or cost, and customer-visible risks.
- [ ] Internal FAQ covers feasibility, architecture, security, operations, legal/compliance when relevant, cost, and ownership.
- [ ] Demo/mock evidence is attached or intentionally deferred with a reason.
- [ ] End-user docs or help notes describe how the target user starts, succeeds, recovers, and gets support.
- [ ] Telemetry plan names events, properties, success/failure states, and correlation or request identifiers where relevant.
- [ ] Requirements/PRD trace back to the press release and FAQ answers.
- [ ] Release decomposition breaks the work into reviewable slices with validation and stop conditions.
- [ ] Readiness checklist covers quality, security, operations, support, docs, and release gates.
- [ ] Outcome tracker defines adoption, usage, love/satisfaction, and revenue or business-value signals.
- [ ] What-to-build and agent handoff artifacts cite approved source artifacts and validation commands.

## Failure Conditions

- Requirements introduce scope that does not trace back to approved intent or FAQ evidence.
- External FAQ open items hide customer or adoption risk.
- Internal FAQ open items hide build, operational, security, legal, or readiness risk.
- Telemetry and outcome tracking are missing without an explicit deferral reason.
- Release slices are too broad to review or validate independently.
- Agent handoff asks an implementer to infer source, scope, validation, or stop conditions.

## Evidence Required

- Working Backwards package with artifact status for every required slot.
- Trace links from downstream artifacts to source artifacts.
- Open item and blocker register.
- Validation commands and expected evidence.
- Outcome tracker with owner and measurement cadence when known.

## Pass Standard

An engineer or AI agent can explain why the work matters, what to build, what not to build, how to validate it, how release readiness will be judged, and how the outcome will be measured.

## Related Documents

- `../thinking.md`
- `../execution.md`
- `../design.md`
- `../operations-support.md`
- `../release-change-management.md`
- `../knowledge-system.md`
- `../ai-agent-framework.md`

