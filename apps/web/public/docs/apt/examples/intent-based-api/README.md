---
title: Intent Based API
kind: example
status: active
owner: APT
last_updated: 2026-06-27
source: APT consolidated examples
domain: "intent-based-api"
source_paths: ["apt-principles-agents/examples/intent-based-api/README.md"]
---

# Intent Based API

## Scenario

A team needs a reviewable starter pattern for intent based api without assuming provider-specific behavior.

## Audience

Business/merchant, partner/acquirer, integrator/developer, support/operations, product/internal teams, and AI automation.

## Problem

The current journey, contracts, risks, and operational handoffs are incomplete or spread across multiple artifacts.

## Suggested Architecture

Start from intent; map UI, API, permissions, lifecycle states, data boundaries, observability, support identifiers, and a reversible rollout. The design should select API styles from audience and behavior, then make contracts predictable, secure, observable, evolvable, and usable by humans and agents.

## Relevant Principles

- [API](../../principles/api/README.md)

## Relevant Skills And Agents

- Use the API skill catalog and the closest specialist reviewer.

## Example Output Or Flow

Intent → validated request → explicit state transition → durable identifier → observable outcome → audience-specific response → reconciliation/support evidence.

## Open Questions

- Which behavior is verified versus assumed?
- What parity, security, compliance, or support evidence is missing?
- Who owns launch approval and rollback?
