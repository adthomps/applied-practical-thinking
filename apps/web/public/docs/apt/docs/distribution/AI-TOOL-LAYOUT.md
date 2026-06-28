---
title: "AI Tool Layout"
kind: "guide"
domain: "documentation"
status: "active"
owner: "APT"
last_updated: "2026-06-28"
source_paths: ["apt-agent-standards/docs/AI-TOOL-LAYOUT.md"]
---

# AI Tool Layout

This repo stores standards in readable source folders, then installs them into tool-native target folders.

## Source Layout In This Repo

The source-of-truth files live in stable, explicit folders:

```text
standards/
agents/
routing/
context/
context-packs/
checklists/
showcases/
prompts/
skills/token-efficiency/
claude/agents/
codex/skills/
github-copilot/instructions/
github-copilot/prompts/
```

These folders are easier to review in the standards repo and match the profile manifests.

`context-packs/`, `checklists/`, `showcases/`, and `prompts/` are public guidance layers for operators and agents. They do not replace the installable source folders and are not automatically installed unless a future profile explicitly includes them.

## Installed Layout In Target Repos

The installer maps those source paths into the locations AI tools expect:

| Source path | Installed target path |
| --- | --- |
| `standards/AGENTS.md` | `AGENTS.md` |
| `standards/CLAUDE.md` | `.claude/CLAUDE.md` |
| `standards/copilot-instructions.md` | `.github/copilot-instructions.md` |
| `agents/*.md` | `agents/*.md` |
| `routing/*` | `routing/*` |
| `context/*/README.md` | `context/*/README.md` |
| `skills/token-efficiency/SKILL.md` | `skills/token-efficiency/SKILL.md` |
| `claude/agents/*.md` | `.claude/agents/*.md` |
| `codex/skills/*/SKILL.md` | `.codex/skills/*/SKILL.md` |
| `github-copilot/instructions/*.instructions.md` | `.github/instructions/*.instructions.md` |
| `github-copilot/prompts/*.prompt.md` | `.github/prompts/*.prompt.md` |

APT Core files stay installed under `apt-core/`, harness files stay in their stable source paths, and project context stays at `docs/project-context.md`.

The public guidance folders stay in this repo by default:

| Folder | Role |
| --- | --- |
| `context-packs/` | Strategy for compressed and generated context packs; points to installable `context/` sources. |
| `checklists/` | Repo alignment, documentation, API, UI, security, and agent verification checklists. |
| `showcases/` | Short examples of APT-aligned patterns. |
| `prompts/` | Tool-neutral reusable prompts. |

Do not confuse `prompts/` with `github-copilot/prompts/`. Copilot-native prompt files still install to `.github/prompts/`.

## Why This Split Exists

- `AGENTS.md` belongs at the target repo root so agent tools can find the nearest agent instruction file.
- GitHub Copilot uses `.github/copilot-instructions.md` for repository-wide instructions and `.github/instructions/*.instructions.md` for path-specific instructions.
- Claude Code supports project instructions at either `CLAUDE.md` or `.claude/CLAUDE.md`, and project subagents under `.claude/agents/`.
- Codex skills are installed under `.codex/skills/` so project-specific skills live with the target repo.

## Manifest Behavior

`.apt/installation.json` records installed target paths in `managedFiles` and records source-to-target mapping in `managedFileSources`.

That lets sync update tool-native files in the target repo while still reading the canonical source file from this standards repo.

Example:

```json
{
  "managedFiles": [
    "AGENTS.md",
    ".claude/CLAUDE.md",
    ".github/copilot-instructions.md",
    ".codex/skills/api-review/SKILL.md"
  ],
  "managedFileSources": {
    "AGENTS.md": "standards/AGENTS.md",
    ".claude/CLAUDE.md": "standards/CLAUDE.md",
    ".github/copilot-instructions.md": "standards/copilot-instructions.md",
    ".codex/skills/api-review/SKILL.md": "codex/skills/api-review/SKILL.md"
  }
}
```

## Review Guidance

When reviewing a target install, review the target-native files first:

```text
AGENTS.md
.claude/CLAUDE.md
.claude/agents/
.codex/skills/
.github/copilot-instructions.md
.github/instructions/
.github/prompts/
docs/project-context.md
.apt/installation.json
```

Do not edit managed files in the target repo unless the change is intentionally local. Prefer editing the source file in `apt-principles-agents`, then syncing.

## Harness Metadata

New harness installs also write:

```text
.apt/installation.json/manifest.json
.apt/installation.json/local-overrides.md
.apt/installation.json/install-report.md
.apt/installation.json/scan-report.md
.apt/installation.json/repair-plan.md
.apt/installation.json/repair-report.md
.apt/installation.json/sync-report.md
```

The local overrides file is project-owned and preserved. Reports are operator artifacts for auditability.

## Cross-Tool Parity

Codex skills, Claude agents, and Copilot prompts are separate tool surfaces. A name in one surface is not automatically discoverable in another.

Every Codex skill should have a same-name Copilot prompt:

```text
codex/skills/<skill-name>/SKILL.md
github-copilot/prompts/<skill-name>.prompt.md
```

This gives Copilot Chat a tool-native file to follow when a user refers to a Codex skill name. Profiles that include a Codex skill should also include the same-name Copilot prompt so install and sync carry both surfaces together.

For high-value workflows, also keep equivalent Claude agents documented:

| Workflow | Codex | Claude | GitHub Copilot |
| --- | --- | --- | --- |
| Cloudflare modernization | `.codex/skills/cloudflare-modernization/SKILL.md` | `.claude/agents/cloudflare-modernization-architect.md` | `.github/prompts/cloudflare-modernization.prompt.md` |
| React/Hono Cloudflare app | `.codex/skills/cloudflare-react-hono/SKILL.md` | `.claude/agents/cloudflare-react-hono-architect.md` | `.github/prompts/cloudflare-react-hono.prompt.md` |
| API review | `.codex/skills/api-review/SKILL.md` | `.claude/agents/api-experience-reviewer.md` | `.github/prompts/api-review.prompt.md` |
| APT readiness audit | `.codex/skills/apt-readiness-audit/SKILL.md` | `.claude/agents/apt-readiness-auditor.md` | `.github/prompts/apt-readiness-audit.prompt.md` |
| Documentation sync | `.codex/skills/docs-sync/SKILL.md` | `.claude/agents/documentation-architect.md` | `.github/prompts/docs-sync.prompt.md` |
| Refactor safety | `.codex/skills/refactor-safety/SKILL.md` | use the relevant review agent for the code area | `.github/prompts/refactor-safety.prompt.md` |
| Test generation | `.codex/skills/test-generator/SKILL.md` | use the relevant review agent for the code area | `.github/prompts/test-generator.prompt.md` |

In Copilot Chat, ask for the `.github/prompts/*.prompt.md` file. Do not ask Copilot Chat to discover `.codex/skills/*/SKILL.md` as a skill.

Run this check after adding or renaming skills, prompts, or profiles:

```bash
node scripts/check-ai-tool-parity.mjs
```

## Alignment Guidance Layers

For cross-repo alignment, use the public guidance folders before choosing install or sync actions:

```text
context-packs/README.md
checklists/
showcases/
prompts/
```

These files help decide what to inspect and how to report findings. They are not proof of compliance by themselves. Compliance claims require checking the target repo's relevant files against the relevant checklist.
