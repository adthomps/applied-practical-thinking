---
title: Beginner User Review
kind: example
status: active
owner: APT
last_updated: 2026-06-27
source: APT consolidated examples
domain: "beginner-user-review"
source_paths: ["apt-principles-agents/examples/beginner-user-review/README.md"]
---

# Beginner User Review

## Scenario

A team needs a reviewable starter pattern for beginner user review without assuming provider-specific behavior.

## Audience

Business/merchant, partner/acquirer, integrator/developer, support/operations, product/internal teams, and AI automation.

## Problem

The current journey, contracts, risks, and operational handoffs are incomplete or spread across multiple artifacts.

## Suggested Architecture

Start from intent; map UI, API, permissions, lifecycle states, data boundaries, observability, support identifiers, and a reversible rollout. The design should frame the real problem, expose assumptions, compare meaningful options, and explain decisions in beginner-clear language.

## Relevant Principles

- [Thinking](../../principles/thinking/README.md)

## Relevant Skills And Agents

- Use the Thinking skill catalog and the closest specialist reviewer.

## Example Output Or Flow

Intent → validated request → explicit state transition → durable identifier → observable outcome → audience-specific response → reconciliation/support evidence.

## Open Questions

- Which behavior is verified versus assumed?
- What parity, security, compliance, or support evidence is missing?
- Who owns launch approval and rollback?
