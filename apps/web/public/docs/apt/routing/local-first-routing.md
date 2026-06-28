---
title: "Local-First Routing"
kind: "routing"
domain: "ai"
status: "active"
owner: "APT"
last_updated: "2026-06-28"
source_paths: ["apt-agent-standards/routing/local-first-routing.md"]
---

# Local-First Routing

Local-first routing uses local models for low-risk classification and compression before sending work to larger models.

## Phi Router Role

Microsoft Phi-class models are candidates for:

- request classification
- skill selection
- checklist validation
- prompt compression
- markdown cleanup
- duplicate detection
- file organization suggestions
- lightweight summaries
- task-packet drafts

## Not Suitable For Phi-Only Decisions

- complex architecture
- payment or health security review
- large migrations
- major refactors
- final approval decisions
- cross-system reasoning

## Local Escalation Triggers

Escalate beyond local when:

- the task affects production behavior
- security, secrets, auth, payment, health, or privacy are involved
- the task spans multiple systems or repositories
- source context exceeds the local budget
- confidence is low or validation cannot be performed locally
