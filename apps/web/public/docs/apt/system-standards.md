---
title: APT System Standards (Consistency)
version: v1
last_updated: 2026-04-24
owner: APT
status: draft
---

# APT System Standards

## Overview

APT System Standards define shared conventions that make systems predictable across projects.

System standards answer:

- How are things named?
- How do APIs respond?
- Where do shared contracts live?
- How is configuration documented?
- How is consistency enforced?

## Purpose

System standards reduce ambiguity and drift. They make systems easier to build, review, test, document, and scale.

## Core Principles

### 1. Consistency over novelty

A consistent pattern used well beats a clever pattern used once.

### 2. Predictability over personal preference

The next maintainer should understand the system without guessing.

### 3. Contracts over assumptions

Define behavior explicitly at boundaries.

### 4. Validation at the edge

Reject bad input at the system boundary.

### 5. Errors must be structured

Errors should inform without leaking implementation detail.

## Standards / Rules

### API Style

REST is the default baseline for service contracts unless a project explicitly chooses another contract style.

Use nouns, not verbs, for primary resources.

Good:

```text
/api/v1/users
/api/v1/customers
/api/v1/invoices
```

Bad:

```text
/api/v1/getUsers
/api/v1/createInvoice
```

### Internal and Public API Boundaries

- Internal app APIs may use `/api/*`.
- Public stable APIs should use versioned paths such as `/v1/*`.
- Internal APIs may return UI-specific view models.
- Public APIs must be stable, documented, and versioned.

### Response Shape

Success:

```json
{
  "success": true,
  "data": {
    "id": "user_123",
    "email": "test@example.com"
  }
}
```

Error:

```json
{
  "success": false,
  "error": {
    "code": "INVALID_INPUT",
    "message": "Email is required"
  }
}
```

### Package Standards

- `packages/ui` contains reusable UI components only.
- `packages/config` contains tokens, environment helpers, and constants.
- `packages/utils` contains pure utilities with no platform side effects.
- Shared packages must not import app-specific code.

### Configuration Standards

- `.env.example` or equivalent configuration docs must exist for deployable apps.
- Secrets must not be committed.
- Cloudflare bindings must be documented near `wrangler.toml` or deployment docs.
- Environment names should be explicit: dev, preview, production.

### Documentation Standards

Every production-oriented repo should include:

- README with purpose, local run, and deployment
- architecture doc
- API doc when APIs exist
- security notes when auth, sessions, or secrets exist
- AI docs when prompts or agent behavior exist

### Metadata and Versioning Standards

Canonical APT docs and build-kit files use required frontmatter: `title`, `version`, `last_updated`, `owner`, and `status`.

Recommended project adoption metadata includes audience, visibility, source, and applies-to fields. Generated public views must identify their source, and deprecated guidance must identify its replacement or archive rationale.

## Required Artifacts

- API contract or schema
- Naming convention notes
- Error code list for meaningful errors
- Config/environment notes
- Shared package ownership notes
- API standards checklist

## Good Example

A new `invoices` API exposes `GET /api/v1/invoices`, validates query params at the route boundary, returns a structured success/error shape, and documents pagination behavior.

## Bad Example

A route named `/getInvoices` accepts unknown input, returns mixed response formats, and duplicates validation logic in the UI.

## Related Checklists

- `checklists/api-standards-checklist.md`

## Related Examples

- `examples/api/rest-api-example.md`
- `examples/api/error-response-example.md`
- `examples/api/pagination-example.md`

## Related Prompts

- `prompts/api-review-prompt.md`

## Related References

- `references/metadata-versioning-contract.json`

## Related Documents

- `architecture.md`
- `security.md`
- `quality-testing.md`

## Summary

System standards make common behavior boring, predictable, and reviewable.
