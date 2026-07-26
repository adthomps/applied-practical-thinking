---
title: APT Security Context Pack
version: v1
last_updated: 2026-06-22
owner: APT
status: draft
kind: "context-pack"
domain: "ai"
source_paths: ["apt-principles/context-packs/apt-security-pack.md"]
---

# APT Security Context Pack

## Purpose

Use this pack for authentication, authorization, session control, secrets, sensitive data, abuse protection, payment-adjacent behavior, and high-risk AI or agent changes. It ensures token savings never weaken security review.

## Use When

- Reviewing auth, identity, payment, webhook, data access, or trust-boundary changes.
- Checking whether a repo can claim APT security alignment.
- Preparing remediation plans for sensitive workflows.
- Reviewing agent behavior that could perform destructive or privileged actions.

## Avoid When

- The task is low-risk presentation work with no sensitive data or privileged action.
- The reviewer cannot access exact source files, tests, configs, and relevant policies.
- The request asks for a compliance or production-readiness claim without evidence.

## Source Docs

- [Security](../principles/security-risk/README.md)
- [Architecture](../principles/architecture/README.md)
- [Quality & Testing](../principles/execution/quality-and-testing.md)
- [Operations & Support](../principles/execution/operations-and-support.md)
- [Security Harness Standard](../standards/ai/security-harness-standard.md)

## Required Checks

- [Security Review Checklist](../checklists/security-review-checklist.md)
- [Architecture Review Checklist](../checklists/architecture-review-checklist.md)
- [Quality & Testing Checklist](../checklists/quality-testing-checklist.md)
- [AI Agent Review Checklist](../checklists/ai-agent-review-checklist.md) when agents can affect sensitive systems.

## Examples And Prompts

- [Threat Auth Review Example](../examples/security/threat-auth-review-example.md)
- [Login Session Flow](../examples/security/login-session-flow.md)
- [Magic Link Flow](../examples/security/magic-link-flow.md)
- [Security Review Expectations Showcase](../examples/showcases/security-review-expectations.md)
- [Security Review Prompt](../prompts/security-review-prompt.md)

## Exact-Read Requirements

Exact source reads are mandatory before final security findings, compliance statements, payment recommendations, auth edits, or production approval. Read the affected code, configuration, data contracts, tests, logs or runbooks when available, and the relevant checklist. Headroom or similar compression can support discovery only.

## Mandatory Vs Recommended

Mandatory evidence includes trust boundaries, authentication and authorization behavior, input validation, secrets handling, abuse controls, tests, and residual risk. Recommended support includes threat-review examples, escalation notes, and release rollback guidance.
