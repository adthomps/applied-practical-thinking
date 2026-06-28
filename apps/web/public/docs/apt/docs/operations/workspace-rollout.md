---
title: Workspace rollout
kind: runbook
domain: operations
status: active
owner: APT maintainers
last_updated: 2026-06-28
source_paths: ["apt-principles-agents/scripts/apt-assets.mjs", "apt-agent-standards/scripts/audit-workspace-agent-standards.mjs"]
supersedes: ["apt-agent-standards/docs/WORKSPACE-ROLLOUT-PLAYBOOK.md"]
---

# Workspace rollout

Audit the workspace before changing targets:

```powershell
node scripts/apt-assets.mjs audit-workspace --workspace-root ..
```

Choose manifests from product scope and existing local instructions—not detection alone. Preserve target-owned `AGENTS.md`, product context, architecture decisions, commands, and exceptions. Preview each installation, apply it, then run the target’s own documentation and CI checks.

The archive gate is intentionally strict:

1. Every active target has `.apt/installation.json`.
2. No target has `.apt/installation.json`.
3. Every managed installation scans clean.
4. Active workspace references point to `apt-principles-agents`; old names remain only in provenance, migration, and history.
5. The public site regenerates from the new schema and passes its tests and build.
6. The archive-readiness report records evidence and explicit approval.

Do not archive a source repository merely because its content was copied. Archive only after its consumers and operational capabilities have cut over.
