---
title: Intent Based UI
kind: example
status: active
owner: APT
last_updated: 2026-06-27
source: APT consolidated examples
domain: "intent-based-ui"
source_paths: ["apt-principles-agents/examples/intent-based-ui/README.md"]
---

# Intent Based UI

## Scenario

A team needs a reviewable starter pattern for intent based ui without assuming provider-specific behavior.

## Audience

Business/merchant, partner/acquirer, integrator/developer, support/operations, product/internal teams, and AI automation.

## Problem

The current journey, contracts, risks, and operational handoffs are incomplete or spread across multiple artifacts.

## Suggested Architecture

Start from intent; map UI, API, permissions, lifecycle states, data boundaries, observability, support identifiers, and a reversible rollout. The design should start from user intent and align journeys, roles, permissions, states, accessibility, UI, API, documentation, and demos.

## Relevant Principles

- [Design](../../principles/design/README.md)

## Relevant Skills And Agents

- Use the Design skill catalog and the closest specialist reviewer.

## Example Output Or Flow

Intent → validated request → explicit state transition → durable identifier → observable outcome → audience-specific response → reconciliation/support evidence.

## Open Questions

- Which behavior is verified versus assumed?
- What parity, security, compliance, or support evidence is missing?
- Who owns launch approval and rollback?
