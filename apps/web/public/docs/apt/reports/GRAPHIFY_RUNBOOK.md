---
title: APT Graphify Runbook
version: v1
last_updated: 2026-05-22
owner: APT
status: draft
---

# APT Graphify Runbook

## Purpose

Graphify gives APT operators and AI agents a workspace-wide knowledge graph that connects canonical doctrine, validation scripts, public-site implementation, and project evidence.

Use it to answer:

- Which APT concepts are central across repos?
- Which doctrine areas have weak implementation evidence?
- Which names, routes, prompts, or contracts may be drifting?
- Which remediation items should move into project-profile reports?

Graphify complements `npm run validate` and `npm run sweep:project-profiles`. It does not replace deterministic validation gates.

## Governance Recommendation

Use Graphify as a curated knowledge-management layer for APT, not as a replacement for canonical docs, project context, validation scripts, or source-controlled decision records.

APT should keep the Graphify operating workflow in `apt-principles` because this repo owns canonical doctrine, project adoption rules, validation expectations, portfolio-level reports, and cross-repo evidence review. Do not create a separate `apt-graphify-standards` repository unless Graphify becomes an independently versioned product with its own installers, fixtures, release cadence, and compatibility tests.

Use `apt-agent-standards` for distribution guidance only: optional agent instructions, project-context prompts, ignore-policy reminders, and repo-local usage rules. That lets target repos participate in the APT graph without turning generated graph output into another source of truth.

Ownership summary:

| Area | Owner |
| --- | --- |
| APT-wide graph scripts, curated repo set, gap reports, and Graphify runbook | `apt-principles` |
| Optional installed guidance for agents and repo-local graph participation notes | `apt-agent-standards` |
| Product-specific architecture, sensitive-path exclusions, local project context, and graph exceptions | target repo |
| Generated graph files, caches, HTML, cost files, and manifests | local operator workspace only |

## Repo Participation Tiers

Prioritize graph participation where cross-file and cross-repo relationships are hard to hold in working memory.

| Tier | Repos | Why they benefit |
| --- | --- | --- |
| Core graph governance | `apt-principles`, `apt-agent-standards`, `applied-practical-thinking` | Doctrine, standards distribution, public publishing, generated docs, AI prompts, and cross-repo drift checks need traceable relationships. |
| High-value product graphs | `apt-anet-integration-toolbox`, `apt-anet-accept-suite-toolbox`, `apt-coach`, `apt-commerce`, `apt-dream-to-reality`, `crt-world` | These combine app code, APIs, docs, prompts, integrations, and local APT evidence. Graph traversal can reveal implementation evidence and drift. |
| Focused or periodic graphing | `apt-payment-rpc-api`, `apt-novel-reviewer`, `apt-design-reference`, `apt-issue-system` | These are smaller or more bounded, so graphing is useful for audits, migrations, and standards reviews rather than every routine change. |
| Needs tighter filtering before broad graphing | `apt-exercise` | The repo has a large file surface and likely generated/dependency-heavy content. Build a narrow staging filter before including it in broad workspace runs. |

When adding a repo to the default graph set, first run `npm run graphify:apt -- --stage-only --repos repo-name` and review the staged file count and obvious noisy paths. Update `.graphifyignore` or staging filters before running semantic extraction.

## What Was Added

This repo now has a lightweight APT-wide Graphify workflow:

- `npm run graphify:check` verifies the local Graphify CLI, required sibling repos, and OpenAI backend readiness.
- `npm run graphify:apt` stages the selected APT repos in `.graphify-workspace/` and writes local graph output under `graphify-out/`.
- `npm run graphify:gaps` queries `graphify-out/graph.json` and writes a curated Markdown gap report under `reports/`. It now fails by default when the graph still contains known noisy sources such as runtime artifacts or project-profile sweep outputs.
- `.gitignore` and `.graphifyignore` keep bulky local graph outputs, caches, manifests, and HTML artifacts out of git.

The local setup also installed `uv`, `graphifyy`, and the Graphify Codex skill. If a fresh terminal cannot find `uv` or `graphify`, add `C:\Users\sanch\.local\bin` to PATH or restart the shell.

## Setup

This Windows workspace needs Python tooling before Graphify can run. Install:

1. Python 3.10 or newer.
2. `uv`.
3. The official Graphify package:

```powershell
uv tool install graphifyy
npm run graphify:install-openai
graphify install --platform codex
```

Graphify's PyPI package is `graphifyy`; the CLI command is `graphify`.

The OpenAI semantic backend also needs the Python `openai` package inside Graphify's `uv` tool environment. If extraction fails with `requires the openai package`, run:

```powershell
npm run graphify:install-openai
```

That command runs `uv tool install graphifyy --with openai --force`.

In PowerShell, use `graphify .` instead of `/graphify .`. A leading slash is treated as a path separator on Windows.

Useful references:

- https://graphify.net/graphify-cli-commands.html
- https://github.com/safishamsi/graphify

## OpenAI API Key

`graphify:apt` uses the OpenAI backend by default because this workspace is documentation-heavy and needs semantic extraction. Set `OPENAI_API_KEY` before running the graph build.

For the current PowerShell session:

```powershell
$env:OPENAI_API_KEY = "sk-..."
npm run graphify:check
npm run graphify:apt
```

To persist it for future PowerShell sessions:

```powershell
[Environment]::SetEnvironmentVariable("OPENAI_API_KEY", "sk-...", "User")
```

Then open a new terminal and run:

```powershell
npm run graphify:check
```

Expected readiness output should include:

```text
Graphify: graphify 0.8.16
Workspace repos: present
OpenAI semantic backend: OPENAI_API_KEY is set
```

Do not commit API keys, `.env` files with secrets, shell transcripts containing keys, or generated graph artifacts that may contain sensitive source summaries.

## Privacy Boundary

Graphify parses code locally with Tree-sitter/static extraction. Semantic extraction for Markdown, PDFs, images, and other prose/media can use the configured AI backend. For this APT workflow, assume Codex/OpenAI semantic extraction unless a local backend is intentionally configured.

Do not add secrets, private credentials, production dumps, or unsupported historical archives to the graph input set.

## APT Workspace Commands

Run these commands from `apt-principles`:

```bash
npm run graphify:check
npm run graphify:apt
npm run graphify:gaps
```

`graphify:check` verifies that `graphify` is on PATH, required sibling repos exist, `OPENAI_API_KEY` is set, and the OpenAI Python package is installed in Graphify's tool environment.

`graphify:apt` passes `gpt-4o-mini` as the default OpenAI model because Graphify's upstream default may request `gpt-4.1-mini`, which some OpenAI projects cannot access. It also defaults to `--max-concurrency 1` and `--token-budget 20000` to avoid context-limit splits and OpenAI token-per-minute throttling on the APT-wide corpus.

Override the model when needed:

```powershell
npm run graphify:apt -- --model gpt-5-mini
$env:GRAPHIFY_OPENAI_MODEL = "gpt-5-mini"
npm run graphify:apt
```

Use a model that your OpenAI project can access. OpenAI's model catalog lists `gpt-4o-mini` as a fast, affordable model for focused tasks: https://platform.openai.com/docs/models/gpt-4o-mini

If extraction fails with `rate_limit_exceeded`, rerun the same command after a short wait. For an even gentler run:

```powershell
npm run graphify:apt -- --max-concurrency 1 --token-budget 12000
```

If you have higher limits and want faster extraction:

```powershell
npm run graphify:apt -- --max-concurrency 2 --token-budget 20000
```

`graphify:apt` builds a temporary staging folder, `apt-graphify-workspace`, in the system temp directory and includes these repos by default:

- `apt-principles`
- `apt-agent-standards`
- `applied-practical-thinking`
- `apt-coach`
- `apt-dream-to-reality`
- `apt-novel-reviewer`
- `apt-payment-rpc-api`
- `crt-world`

It then runs Graphify from this repo so local outputs stay under `apt-principles/graphify-out/`. By default, the staging step copies filtered repo contents instead of creating Windows junctions because Graphify may skip junction-linked repos and report `found 0 code, 0 docs`.

Optional flags:

```bash
npm run graphify:apt -- --force
npm run graphify:apt -- --stage-only
npm run graphify:apt -- --no-cluster
npm run graphify:apt -- --model gpt-4o-mini
npm run graphify:apt -- --backend openai --max-concurrency 1
npm run graphify:apt -- --max-concurrency 1 --token-budget 12000
npm run graphify:apt -- --repos apt-principles,apt-coach
npm run graphify:apt -- --workspace-root ../
npm run graphify:apt -- --staging-root C:/tmp/apt-graphify-workspace
npm run graphify:apt -- --link
```

Use `--stage-only` if Graphify reports an empty corpus. It prepares the staging workspace, prints the staged file count, and stops before requiring `OPENAI_API_KEY` or calling Graphify.

Use `--link` only for quick local experiments. If Graphify reports `found 0 code, 0 docs`, rerun without `--link`.

`graphify:gaps` queries `graphify-out/graph.json` and writes `reports/graphify-apt-gap-analysis-YYYY-MM-DD.md`.

The gap report is expected to contain raw Graphify traversal evidence: `NODE` and `EDGE` rows with source paths and communities. That is useful for inspection, but it is not automatically a polished gap analysis. Treat the Graphify sections as evidence, then use the built-in validation sweep section and human review to decide which findings become remediation work.

If the report is dominated by generated/test paths such as `playwright-cli/`, `.wrangler/tmp/`, `output/playwright/`, generated public docs, or project-profile sweep artifacts, rebuild the graph after pulling the latest `.graphifyignore` and staging filters:

```powershell
npm run graphify:apt -- --force
npm run graphify:gaps
```

If you need to inspect a known-noisy graph temporarily, bypass the default failure explicitly:

```powershell
npm run graphify:gaps -- --allow-noisy
```

Optional flags:

```bash
npm run graphify:gaps -- --date 2026-05-22
npm run graphify:gaps -- --graph graphify-out/graph.json
```

## Parameter Tuning

| Scenario | Recommendation |
|----------|---------------|
| Default / safe for CI | `--max-concurrency 1 --token-budget 20000 --model gpt-4o-mini` |
| Large principle files (>5k tokens each) | `--token-budget 40000` |
| Faster local extraction | `--max-concurrency 2` (safe on most laptops; keep at 1 for CI) |
| Higher semantic quality (before governance review) | `--model gpt-4o` (costs more; use when relationship extraction quality matters) |
| Tight API limits / rate errors | `--max-concurrency 1 --token-budget 12000` |
| Target a subset of repos | `--repos apt-principles,apt-coach` |

**Why `.claude/` and `MEMORY.md` are excluded from staging:** These contain Claude Code workspace configuration, session hooks, and agent session memory. They are IDE tooling artifacts, not APT doctrine. Including them would pollute the doctrine graph with agent scaffolding and produce misleading relationship edges in gap queries.

## Output Policy

Generated graph assets are local operator artifacts:

- `graphify-out/`
- `.graphify-workspace/`
- Graphify cache, cost, manifest, and HTML output

Do not commit generated graph artifacts unless the storage policy is explicitly changed.

Commit durable, curated outputs:

- runbook updates
- script updates
- `.graphifyignore` and `.gitignore`
- dated gap reports under `reports/`

## Gap Review Workflow

1. Run `npm run validate`.
2. Run `npm run graphify:check`.
3. Run `npm run graphify:apt`.
4. Run `npm run graphify:gaps`.
5. Read the dated gap report alongside the latest `project-profile-validation-sweep-YYYY-MM-DD.md`.
6. Convert only source-supported findings into doctrine updates, project-profile remediation items, or explicit non-actions.
7. Re-run `npm run validate` and `npm run sweep:project-profiles` after any remediation.

## Related Documents

- `reports/README.md`
- `reports/VALIDATION_RESULTS_GUIDE.md`
- `knowledge-system.md`
- `ai-agent-framework.md`
