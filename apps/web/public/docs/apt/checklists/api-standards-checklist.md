---
title: API Standards Checklist
version: v1
last_updated: 2026-04-24
owner: APT
status: draft
---

# API Standards Checklist

## Scope

Use this checklist for new or changed HTTP APIs, worker routes, BFF endpoints, webhooks, internal service contracts, and public contracts.

Run it when defining a new endpoint, changing response shape, adding pagination, introducing errors, or exposing functionality to another app or external consumer.

## Required Checks

- [ ] Route names use resource nouns, not action verbs.
- [ ] Public APIs use versioned paths such as `/v1/*`.
- [ ] Internal app APIs use `/api/*` only when intended for the app surface.
- [ ] Request body, params, and query strings are validated at the boundary.
- [ ] Success responses use a consistent envelope.
- [ ] Error responses include stable codes and safe messages.
- [ ] Authorization is enforced server-side.
- [ ] Pagination, filtering, and sorting are documented when present.
- [ ] API behavior is covered by tests or documented validation evidence.

## Failure Conditions

- Mixed response shapes for the same contract.
- Client-side-only validation for trusted behavior.
- Unversioned public API paths.
- Raw exception details returned to users.
- Endpoint names like `getUsers`, `createInvoice`, or `doThing`.

## Evidence Required

- Contract or example request/response.
- Validation notes or tests.
- Security/auth notes for protected routes.
- Pagination, idempotency, retry, or rate-limit notes where applicable.
- Consumer-impact note for public or shared APIs.

## Pass Standard

The API is reviewable without reading implementation code: resources are named clearly, inputs are validated, responses are consistent, errors are structured, and consumers know how to paginate, retry, and handle failure.

## Related Documents

- `../system-standards.md`
- `../security.md`
- `../examples/api/rest-api-example.md`
- `../examples/api/error-response-example.md`
- `../examples/api/pagination-example.md`
