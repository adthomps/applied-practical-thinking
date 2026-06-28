---
title: "Risk Assessment"
kind: "guide"
domain: "documentation"
status: "active"
owner: "APT"
last_updated: "2026-06-28"
source_paths: ["apt-agent-standards/docs/RISK-ASSESSMENT.md"]
---

# Risk Assessment

| Risk | Impact | Mitigation |
| --- | --- | --- |
| Doctrine drift from `apt-principles-agents` | Conflicting standards across repos. | Keep doctrine boundary explicit and link out instead of duplicating long doctrine. |
| Harness scope creep | Large unreviewable rewrite. | Add harness layers incrementally and preserve current installer behavior. |
| Tool sprawl | Confusing duplicated agents, skills, and prompts. | Maintain catalogs and parity checks. |
| Unsafe repair | Local target customizations overwritten. | Default to dry-run/report-only, preserve local context, require `--force`, and support `--backup`. |
| Stale model registry | Bad routing recommendations. | Validate registry references and flag deprecated entries. |
| Paid or network calls by accident | Cost or privacy exposure. | Local detection only by default; cloud detection is configuration-only until explicitly enabled. |
| Excessive token use | Slow or expensive workflows. | Use context packs, task packets, and `apt-cost-controller`. |
| Cross-platform incompatibility | Codex, Claude, Copilot, and local LLM surfaces drift. | Keep stable path mapping, profile manifests, and tool-native prompt equivalents. |
