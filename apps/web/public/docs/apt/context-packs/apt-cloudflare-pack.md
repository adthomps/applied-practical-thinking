---
title: APT Cloudflare Context Pack
version: v1
last_updated: 2026-07-25
owner: APT
status: draft
kind: "context-pack"
domain: "ai"
source_paths: ["apt-principles/context-packs/apt-cloudflare-pack.md"]
---

# APT Cloudflare Context Pack

## Purpose

Use this pack for Cloudflare Pages, Workers, Hono APIs, edge routing, bindings, deployment readiness, and operational review. It combines architecture, API, security, observability, and release expectations for edge projects.

## Use When

- Reviewing Worker or Hono project structure.
- Aligning deployment scripts, environment bindings, routes, and runtime boundaries.
- Checking Cloudflare-specific examples before adding or restructuring an edge service.
- Preparing a public or production release that uses Cloudflare infrastructure.
- Setting up or auditing Cloudflare agent skills and MCP server access.

## Avoid When

- The target repo is only a static docs package with no Cloudflare runtime.
- Secrets, auth, payments, or user data are involved and the security pack has not been included.
- Deployment state or environment bindings cannot be inspected.

## Source Docs

- [Architecture](../principles/architecture/README.md)
- [Operations & Support](../principles/execution/operations-and-support.md)
- [Security](../principles/security-risk/README.md)
- [API Standards](../standards/api/api-standards.md)
- [Observability Standards](../standards/observability/observability-standards.md)

## Required Checks

- [Architecture Review Checklist](../checklists/architecture-review-checklist.md)
- [API Standards Checklist](../checklists/api-standards-checklist.md) for Hono or API routes.
- [Operations Support Checklist](../checklists/operations-support-checklist.md)
- [Security Review Checklist](../checklists/security-review-checklist.md) for secrets, auth, and sensitive data.

## Examples And Prompts

- [Cloudflare Pages Workers Example](../examples/architecture/cloudflare-pages-workers-example.md)
- [Cloudflare Worker Hono Structure Showcase](../examples/showcases/cloudflare-worker-hono-structure.md)
- [Architecture Review Prompt](../prompts/architecture-review-prompt.md)
- [API Review Prompt](../prompts/api-review-prompt.md)

## Official External References

- [Cloudflare Agent Setup Prompt](https://developers.cloudflare.com/agent-setup/prompt.md) - official Cloudflare setup instructions for installing Cloudflare skills and MCP servers across supported agents. Re-verify before recommending commands because the source is vendor-owned and may change.

## Exact-Read Requirements

Before final Cloudflare edits or deployment recommendations, read route code, configuration, binding declarations, environment assumptions, tests, and runbook notes. Before recommending Cloudflare agent setup commands, re-read the official Cloudflare Agent Setup Prompt. Compressed context can identify likely files but cannot verify runtime safety.

## Mandatory Vs Recommended

Mandatory evidence includes boundary ownership, binding inventory, validation commands, rollback notes, and operations support. Recommended evidence includes architecture diagrams, example crosswalks, and deployment runbook excerpts.
