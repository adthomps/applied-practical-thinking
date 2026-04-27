---
title: applied-practical-thinking Project Profile
version: v1
last_updated: 2026-04-26
owner: APT
status: draft
---

# applied-practical-thinking Project Profile

## Context

`applied-practical-thinking` is the public APT platform repo that publishes doctrine-aligned content and product surfaces across web and worker applications.

## Schema-Compatible Profile Data

```yaml
project: applied-practical-thinking
purpose: Public platform repo for Applied Practical Thinking doctrine, content publishing, and worker-backed API surfaces.
audience:
  - builders
  - architects
  - product teams
  - public APT learners
adoption_mode: apply
principles_demonstrated:
  - thinking
  - design
  - architecture
  - system-standards
  - knowledge-system
  - ai-agent-framework
architecture_pattern: Vite/React web app plus Cloudflare Worker API with shared packages for UI, config, and knowledge contracts
ai_agent_usage: Worker-side AI/content routes with prompt files and explicit route boundaries
security_model: Worker boundary with environment-specific API base and documented production origin contracts
learning_value: Demonstrates doctrine-to-product publishing with generated public artifacts and validation gates
reusable_artifacts:
  - APT public content generation flow
  - design doctrine and token contracts
  - worker route boundaries for public feeds
  - validation-report and governance scripts
maturity: active
showcase:
  include: true
  summary: Public-facing APT platform that demonstrates doctrine publishing, design governance, and worker-backed content delivery.
```

## Related Documents

- `adoption.md`
- `references/project-profile.json`
- `reports/apt-principles-audit-2026-04-26.md`
