---
docId: tokens-guide
slug: tokens
major: 2
semanticVersion: 2.0.0
status: candidate
publishedAt: 2026-04-05
---
# APT Tokens

This document is the human-readable companion for APT token contracts.

Canonical machine-readable artifacts:

- `APT-TOKENS.json` (full token values and scales)
- `tokens.json` (enforcement contract and policy guard rails)

## Purpose

- Explain token intent for maintainers and reviewers.
- Clarify how value tokens and policy tokens relate.
- Provide a safe update path that avoids drift.

## Source of Truth

1. `APT-TOKENS.json` is the canonical value dataset.
2. `tokens.json` is the canonical enforcement/policy contract.
3. This markdown file is explanatory guidance for humans.

## Token Categories

- Color tokens
- Typography tokens
- Spacing tokens
- Radius and shadow tokens
- Motion tokens
- Container and sizing tokens

## Guard Rails

- Use semantic tokens only in UI components.
- Do not introduce raw color values when token equivalents exist.
- Do not add arbitrary spacing/radius/shadow values outside token contracts.
- Keep `APT-TOKENS.json` and `tokens.json` aligned with doctrine updates.

## Update Workflow

1. Update `APT-TOKENS.json` for value changes.
2. Update `tokens.json` for policy/guard-rail changes.
3. Update this document when naming, structure, or governance changes.
4. Run governance checks and publish script before merge.

## Review Gate

Treat unresolved token contract drift as a review defect:

- value tokens and enforcement policy contradict each other
- docs/published aliases are out of sync with latest versioned source
- raw values bypass token contracts in governed UI surfaces
