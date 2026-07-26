---
title: APT API Context Pack
version: v1
last_updated: 2026-06-22
owner: APT
status: draft
kind: "context-pack"
domain: "ai"
source_paths: ["apt-principles/context-packs/apt-api-pack.md"]
---

# APT API Context Pack

## Purpose

Use this pack for API routes, service contracts, integrations, gateways, payment-adjacent flows, and typed request or response design. It keeps API work anchored to contract clarity, boundary ownership, validation, and release evidence.

## Use When

- Reviewing route shape, request validation, error responses, pagination, or versioning.
- Applying APT to a Cloudflare Worker, Hono API, payment gateway, or integration layer.
- Checking whether UI behavior is backed by durable API contracts.
- Producing a patch plan for API standards adoption in another repo.

## Avoid When

- The task is only content, UI layout, or agent instruction wording.
- Payment handling, authentication, or authorization is involved and the security pack has not been included.
- The target repo's actual route files, schemas, and tests are unavailable.

## Source Docs

- [Architecture](../principles/architecture/README.md)
- [System Standards](../principles/system-standards/README.md)
- [Security](../principles/security-risk/README.md)
- [Quality & Testing](../principles/execution/quality-and-testing.md)
- [API Standards](../standards/api/api-standards.md)

## Required Checks

- [API Standards Checklist](../checklists/api-standards-checklist.md)
- [Security Review Checklist](../checklists/security-review-checklist.md) for auth, identity, payment, or sensitive data boundaries.
- [Quality & Testing Checklist](../checklists/quality-testing-checklist.md)

## Examples And Prompts

- [REST API Example](../examples/api/rest-api-example.md)
- [Error Response Example](../examples/api/error-response-example.md)
- [Pagination Example](../examples/api/pagination-example.md)
- [API Route Design Showcase](../examples/showcases/api-route-design.md)
- [API Review Prompt](../prompts/api-review-prompt.md)

## Exact-Read Requirements

Before final API edits or approval, read the route handlers, schemas, tests, auth middleware, error mapping, and relevant deployment bindings. Compressed summaries cannot prove request or response correctness.

## Mandatory Vs Recommended

Mandatory evidence includes contract shape, validation rules, failure behavior, security boundary checks, and tests. Recommended evidence includes example crosswalks, release notes, and consumer migration notes.
