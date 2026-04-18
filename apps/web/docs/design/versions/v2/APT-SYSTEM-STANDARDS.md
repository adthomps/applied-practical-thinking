---
docId: system-standards
slug: system-standards
major: 2
semanticVersion: 2.0.0
status: candidate
publishedAt: 2026-04-18
title: APT System Standards
---

# APT System Standards (Consistency)

## Focus

- Enforce consistency across design and implementation
- Reuse and standardization via tokens and shared primitives
- Repository and naming standards

## Principles

- Standardize early and document decisions
- Tokens and configs are the source of truth
- Reuse over reinvention; prefer shared packages

## Outputs

- Design tokens and component contracts
- Naming conventions and repo structure guides
- Shared package contracts


Draft candidate for System Standards.

## Enforcement

- Keep tokens and contracts in `packages/config` authoritative
- Use linting and build-time checks to prevent token drift
- Require PR-level checks for contract / token changes with migration notes

## Examples

- Semantic tokens for colors, spacing, and typography
- Component contracts in `@apt/ui` for shared primitives
- Naming conventions for packages, files, and public APIs

## Checklist

- [ ] Tokens updated in `packages/config` with contract changes
- [ ] Component contracts documented and versioned
- [ ] Breaking changes reviewed and migration documented

## Roles

- Design System Steward: approve token changes and contract updates
- Engineers: follow token usage and raise proposal PRs for changes

