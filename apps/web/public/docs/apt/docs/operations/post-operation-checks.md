---
title: Post-operation checks
kind: checklist
domain: operations
status: active
owner: APT maintainers
last_updated: 2026-06-28
source_paths: ["apt-principles-agents/scripts/apt-assets.mjs"]
---

# Post-operation checks

- [ ] `.apt/installation.json` is valid and committed.
- [ ] `scan` reports no missing or changed managed files.
- [ ] Local `AGENTS.md`, `docs/project-context.md`, and product exceptions still describe the target accurately.
- [ ] Forced replacements have timestamped backups under `.apt-backups/`.
- [ ] Model-routing and tool-native adapter paths match the selected platforms.
- [ ] Repository-local validation, tests, and build pass.
- [ ] No generated or copied public artifact was edited as authored source.
- [ ] Any intentional drift is documented before the next sync.
