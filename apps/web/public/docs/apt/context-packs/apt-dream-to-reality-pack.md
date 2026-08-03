---
title: "APT Dream To Reality Context Pack"
version: v1
last_updated: 2026-07-26
owner: APT
status: active
kind: "context-pack"
domain: "ai"
source_paths: ["apt-principles-agents/context-packs/apt-dream-to-reality-pack.md"]
---

# APT Dream To Reality Context Pack

## Purpose

Use this pack when a repo turns raw ideas into product definition, generated assets, implementation prompts, build work, validation evidence, and release or deployment readiness.

The pack keeps idea generation creative while preventing agents from skipping the evidence loop that makes a project buildable, testable, supportable, and reusable.

## Use When

- Capturing a new idea, project, feature, prototype, or product concept.
- Turning an idea into a Working Backwards package, PRD, backlog, story map, spec, or implementation prompt.
- Generating demo plans, diagrams, docs, examples, screenshots, media, copy, or other project assets that will guide build work.
- Reviewing whether an AI-generated implementation prompt has enough context, stop conditions, validation commands, and approval points.
- Preparing a Cloudflare Worker, Pages app, product hub, or generated project for preview, deployment, operations, and learning.

## Source Docs

- [APT Principles Framework](../principles/framework.md)
- [Thinking](../principles/thinking/README.md)
- [Design](../principles/design/README.md)
- [Delivery Increments](../principles/execution/delivery-increments.md)
- [Quality & Testing](../principles/execution/quality-and-testing.md)
- [Release & Change Management](../principles/execution/release-and-change-management.md)
- [Operations & Support](../principles/execution/operations-and-support.md)
- [Knowledge & Learning](../principles/execution/knowledge-and-learning.md)
- [Working Backwards Context](../context/working-backwards/README.md)
- [Provider-Neutral AI Task Contract](../standards/ai/provider-neutral-ai-task-contract.md)
- [APT Agent Pack](apt-agent-pack.md)
- [APT UI Pack](apt-ui-pack.md)
- [APT Cloudflare Pack](apt-cloudflare-pack.md)

## Required Checks

- [Working Backwards Package Readiness Checklist](../checklists/working-backwards-package-readiness-checklist.md)
- [Thinking Review Checklist](../checklists/thinking-review-checklist.md)
- [Design Review Checklist](../checklists/design-review-checklist.md)
- [Execution Readiness Checklist](../checklists/execution-readiness-checklist.md)
- [Quality Testing Checklist](../checklists/quality-testing-checklist.md)
- [Release Readiness Checklist](../checklists/release-readiness-checklist.md)

## Canonical Flow

1. Frame the idea: customer, problem, desired outcome, constraints, assumptions, and success signal.
2. Work backwards: press release, external FAQ, internal FAQ, demo/mock evidence, end-user docs, telemetry plan, PRD or requirements, release decomposition, readiness checklist, outcome tracker, and what-to-build handoff.
3. Generate assets with traceability: docs, diagrams, examples, prompts, copy, demo plans, screenshots, media, and implementation briefs cite the approved source artifact they came from.
4. Design complete behavior: user journey, flows, states, interaction rules, accessibility, content voice, and acceptance criteria.
5. Architect boundaries: API contracts, persistence, auth, worker responsibilities, data ownership, observability, cost, and rollback path.
6. Build in slices: each increment names its input artifact, output artifact, validation command, stop condition, and reviewer.
7. Validate before promotion: tests, design checks, build, preview, deployment dry-run or deployment evidence, telemetry, docs, and support handoff.
8. Learn back into the system: captured decisions, outcome measures, prompt lessons, asset reuse notes, support findings, and follow-up backlog.

## Generated Asset Rules

- Generated assets are evidence, not decoration. They must explain or validate the project, user workflow, implementation plan, release, or support path.
- Every generated asset should name its source artifact, intended audience, approval status, and where it is used.
- AI generation should request provider-neutral task capabilities before selecting a hosted provider or local tool.
- Implementation prompts are build artifacts. They must include scope, non-goals, required files to inspect, expected file changes, validation commands, stop conditions, and human approval points.
- Demo/mock assets should be produced early enough to test comprehension before implementation hardens the wrong flow.
- Media, diagrams, screenshots, and examples should be regenerated from source instructions or scripts when available instead of edited as unmanaged final outputs.

## Agent Stop Conditions

Agents should pause before build or deployment when:

- the idea does not name a customer, problem, outcome, or success signal
- Working Backwards artifacts are missing, stale, unapproved, or deferred without a reason
- generated assets cannot be traced to approved intent
- acceptance criteria, validation commands, telemetry, rollback, or support path are missing
- security, payment, legal, compliance, or production-launch approval is required but absent
- local repo instructions, project context, or deployment commands conflict with the generated plan

## Outputs

A complete Dream-to-Reality handoff includes:

- idea framing and assumption register
- Working Backwards package status
- asset inventory with source links and approval state
- PRD, BRD, SRD, or equivalent requirements where relevant
- product hub or audience-layered docs when the project needs external explanation
- implementation blueprint and AI build prompt
- provider-neutral AI task contract and selected provider evidence when AI generated the artifact
- backlog slices with validation and stop conditions
- design, API, security, and Cloudflare review notes where relevant
- preview/build/test/deploy evidence
- release, operations, support, telemetry, and learning notes
