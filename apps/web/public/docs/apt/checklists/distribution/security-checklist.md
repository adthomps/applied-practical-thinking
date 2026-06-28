---
title: "Security Checklist"
kind: "checklist"
domain: "distribution"
status: "active"
owner: "APT"
last_updated: "2026-06-28"
source_paths: ["apt-agent-standards/checklists/security-checklist.md"]
---

# Security Checklist

Use this checklist for auth, secrets, deployments, payments, health data, MCP permissions, and sensitive automation.

## Required Checks

- Secrets are not committed, logged, echoed, or embedded in generated docs.
- Auth, authorization, and role boundaries are explicit.
- Webhook and callback verification is source-backed.
- Deployment config separates local, staging, and production assumptions.
- Logs avoid tokens, card data, health data, and other sensitive payloads.
- Agent or MCP permissions are scoped to the task.

## Mandatory

- Read full relevant source before security findings, final validation, or edits.
- Do not use compressed context as proof of security or compliance.
- Escalate ambiguous payment, health, identity, or credential behavior for owner review.

## Recommended

- Prefer deny-by-default guidance for permissions and secrets.
- Add regression tests for authorization and webhook validation changes.
- Document remaining risks explicitly.
