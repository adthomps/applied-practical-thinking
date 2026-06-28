---
title: "Using Installed Standards"
kind: "guide"
domain: "documentation"
status: "active"
owner: "APT"
last_updated: "2026-06-28"
source_paths: ["apt-agent-standards/docs/USING-INSTALLED-STANDARDS.md"]
---

# Using Installed Standards

Installing standards is the setup step. The useful work starts when you use the installed prompts, skills, agents, and instructions to improve the target repo.

## Operating Loop

Use this loop for updates, fixes, modernization, and cleanup:

1. Read `docs/project-context.md`.
2. Read `AGENTS.md` and the relevant AI tool files.
3. Pick the workflow that matches the task.
4. Pick the right AI mode for the task.
5. Ask the AI tool to inspect first and produce findings or a plan.
6. Review the plan before edits.
7. Make the smallest useful change.
8. Run target repo validation commands.
9. Update docs if behavior, setup, architecture, API contracts, or workflows changed.
10. Review the diff.

## Repo Alignment With This Standards Repo

When using this standards repo to review another repo, start with the public alignment guidance before editing:

1. Use `prompts/repo-alignment-review.md` for the review shape.
2. Choose context packs with `context-packs/README.md`.
3. Apply the relevant checklist from `checklists/`.
4. Use `showcases/` as examples for recommended patterns.
5. Use installable profiles only after the repo type and required capabilities are clear.

Return mandatory gaps separately from recommended improvements. A repo is not APT-aligned merely because it has installed files; the relevant files must be checked against the relevant checklist.

## Context Packs And Compression

Context packs and compressed summaries are useful for discovery, planning, summarization, and cross-repo alignment. Headroom or similar tools may help create compact summaries, but they are optional.

Do not rely on compressed context alone for:

- security findings
- compliance claims
- payment handling
- final validation
- exact code edits

For those workflows, read the exact source files, configs, schemas, docs, and local agent instructions before final findings or edits.

## Choose The Right AI Mode

Pick the mode before you paste a prompt or invoke a skill.

| Work type | Recommended mode | Why |
| --- | --- | --- |
| Understand a repo, ask questions, compare options | Chat mode | Good for explanation, planning, and narrowing scope without editing files. |
| Audit or review code/docs without edits | Review mode or Chat mode with "do not edit" | Keeps the output focused on findings, risks, and recommendations. |
| Make scoped file changes | Agent mode or Edit mode | Lets the tool inspect files, edit, and run validation commands. |
| Apply a known prompt template | Copilot Chat with a `.github/prompts/*.prompt.md` file | Reuses the installed prompt and adds task-specific scope. Copilot Chat generally will not discover Codex `.codex/skills` as skills. |
| Use installed Codex procedures | Codex with the relevant `.codex/skills/*/SKILL.md` named explicitly | Ensures Codex follows the skill process, required reading, output format, and validation checklist. |
| Use Claude role specialization | Claude Code with the relevant `.claude/agents/*.md` subagent | Routes architecture, documentation, API, UX, or readiness work to the right role. |
| Generate tests after a fix | Agent/Edit mode with test-generator guidance | The tool needs to edit files and run focused validation. |
| Modernize or migrate architecture | Chat first, then Agent/Edit mode for one approved stage | Planning should happen before file movement or platform changes. |

## Mode Rules

- Use Chat mode first when the scope is unclear.
- Use Review mode when you want findings and no changes.
- Use Agent/Edit mode only after the intended change and validation commands are clear.
- Use Copilot prompt files when the task maps to an installed `.github/prompts/*.prompt.md`.
- Use Codex skills when the task maps to an installed `.codex/skills/*/SKILL.md`.
- Use Claude agents when the task benefits from a specialist reviewer or architect.
- For risky work, ask for a plan first and explicitly say "do not edit files yet."
- For implementation work, ask for one small change plus validation, not a broad rewrite.

## If A Tool Cannot Find A Skill Or Agent

Some AI tools do not automatically index newly installed local files, especially if the chat was opened before installation or the workspace root is not the target repo.

If the tool says it cannot find a skill, agent, or prompt:

1. Confirm the files exist in the target repo:

   ```text
   .codex/skills/
   .claude/agents/
   .github/prompts/
   .github/instructions/
   ```

2. Start a new chat/session from the target repo root when possible.
3. Name the literal file path in the prompt.
4. Tell the tool to read and follow the file, not just "use the skill."
5. If the file is missing, install the missing profile and re-run the check.

For GitHub Copilot Chat specifically, use `.github/prompts/*.prompt.md` and `.github/instructions/*.instructions.md`. Do not expect Copilot Chat to discover `.codex/skills/*/SKILL.md` as named skills. If a Codex skill has a Copilot equivalent, use the same-name prompt file.

Use this pattern:

```text
For Copilot Chat, read and follow .github/prompts/cloudflare-modernization.prompt.md and .github/prompts/cloudflare-react-hono.prompt.md.
If those prompts are not auto-discovered, open those files directly and follow their instructions.
Do not edit files yet. Return a staged plan first.
```

## Which Installed Files To Use

| Task | Installed files to use |
| --- | --- |
| General repo review | `AGENTS.md`, `.codex/skills/apt-review/SKILL.md`, `.claude/agents/apt-principles-agents-reviewer.md` |
| Readiness audit | `.codex/skills/apt-readiness-audit/SKILL.md`, `.claude/agents/apt-readiness-auditor.md`, `.github/prompts/apt-readiness-audit.prompt.md` |
| Working Backwards handoff review | `context/working-backwards/README.md`, `.claude/agents/apt-readiness-auditor.md`, `agents/apt-verifier.md` |
| Fix or refactor safely | `.codex/skills/refactor-safety/SKILL.md`, `.github/prompts/refactor-safety.prompt.md`, `.github/prompts/review-diff.prompt.md` |
| Generate tests | `.codex/skills/test-generator/SKILL.md`, `.github/prompts/test-generator.prompt.md`, `.github/prompts/generate-tests.prompt.md` |
| Update docs | `.codex/skills/docs-sync/SKILL.md`, `.github/prompts/docs-sync.prompt.md`, `.github/prompts/update-docs.prompt.md` |
| Normalize docs | `.codex/skills/documentation-normalization/SKILL.md`, `.claude/agents/documentation-normalizer.md`, `.github/prompts/documentation-normalization.prompt.md` |
| Review API changes | `.codex/skills/api-review/SKILL.md`, `.claude/agents/api-experience-reviewer.md`, `.github/prompts/api-review.prompt.md`, `.github/prompts/review-api.prompt.md` |
| Review UX changes | `.codex/skills/ux-review/SKILL.md`, `.claude/agents/intent-ux-reviewer.md`, `.github/prompts/ux-review.prompt.md` |
| Modernize Cloudflare app | Codex: `.codex/skills/cloudflare-modernization/SKILL.md`, `.codex/skills/cloudflare-react-hono/SKILL.md`; Copilot: `.github/prompts/cloudflare-modernization.prompt.md`, `.github/prompts/cloudflare-react-hono.prompt.md`; Claude: `.claude/agents/cloudflare-modernization-architect.md`, `.claude/agents/cloudflare-react-hono-architect.md` |
| Standardize repo structure | `.codex/skills/repo-standardization/SKILL.md`, `.claude/agents/repo-standardizer.md`, `.github/prompts/repo-standardization.prompt.md`, `.github/prompts/repo-standardize.prompt.md` |
| Audit AI output | `.codex/skills/ai-output-review/SKILL.md`, `.claude/agents/ai-output-auditor.md`, `.github/prompts/ai-output-review.prompt.md` |
| Lovable migration | `.codex/skills/lovable-to-apt/SKILL.md`, `.codex/skills/lovable-to-cloudflare/SKILL.md`, `.github/prompts/lovable-to-apt.prompt.md`, `.github/prompts/lovable-to-cloudflare.prompt.md` |

## Public Standards-Repo Files To Use

These files are used from this standards repo and are not automatically installed into target repos by current profiles:

| Task | Standards repo files |
| --- | --- |
| Repo alignment review | `prompts/repo-alignment-review.md`, `checklists/repo-alignment-checklist.md` |
| Apply APT principles | `prompts/apply-apt-principles-agents.md`, relevant checklist and showcase |
| Apply shadcn UI standards | `docs/SHADCN-UI-STANDARD.md`, `checklists/ui-checklist.md`, `context/ui/README.md` |
| Generate a context pack | `prompts/generate-context-pack.md`, `context-packs/README.md` |
| Update agent standards | `prompts/update-agent-standards.md`, `checklists/agent-checklist.md` |
| Pattern examples | `showcases/` |

## Example Prompts To Run In A Target Repo

Use these from the target repo after standards are installed.

### Readiness Audit

```text
Mode: Chat or Review mode.

Read and follow .codex/skills/apt-readiness-audit/SKILL.md.
If it is not auto-discovered as a skill, open the file directly and follow its process.

Read docs/project-context.md, AGENTS.md, package scripts, README, docs, app entry points, and deployment config.
Score APT alignment, architecture, documentation, UX, API, testing, Cloudflare readiness, and maintainability.
Return findings, evidence, risks, and a prioritized improvement plan. Do not edit files yet.
```

### Working Backwards Handoff Review

```text
Mode: Chat or Review mode before implementation.

Read context/working-backwards/README.md from apt-principles-agents and the target repo's Working Backwards package or equivalent artifacts.

Check press release, external FAQ, internal FAQ, demo/mock, end-user docs, telemetry plan, PRD/requirements, release decomposition, readiness checklist, outcome tracker, what-to-build, and agent handoff.
Return missing artifacts, blockers, deferred items without reasons, validation commands, and whether build or release handoff is ready. Do not edit files yet.
```

### Fix A Bug Safely

```text
Mode: Agent mode or Edit mode after initial inspection.

Read and follow .codex/skills/refactor-safety/SKILL.md and .codex/skills/test-generator/SKILL.md.
If they are not auto-discovered as skills, open those files directly and follow their processes.

Investigate this bug: <describe bug>.
Identify the smallest behavior-preserving fix, name affected files, propose tests, and wait for approval before editing.
After editing, run the most focused validation commands available.
```

### Modernize Cloudflare Structure

```text
Mode: Chat mode for the plan first. Agent mode only for one approved stage.

If using Codex, read and follow .codex/skills/cloudflare-modernization/SKILL.md and .codex/skills/cloudflare-react-hono/SKILL.md.
If using GitHub Copilot Chat, read and follow .github/prompts/cloudflare-modernization.prompt.md and .github/prompts/cloudflare-react-hono.prompt.md.
If using Claude Code, use .claude/agents/cloudflare-modernization-architect.md and .claude/agents/cloudflare-react-hono-architect.md.
If any are not auto-discovered, open those files directly and follow their guidance.

Inspect the current frontend, worker/API routes, wrangler config, bindings, secrets assumptions, and build scripts.
Recommend a staged modernization plan for Cloudflare Pages, Workers, Hono, D1, KV, or R2 only where justified.
Preserve current behavior and document migration risks before editing.
```

### API Review

```text
Mode: Review mode or Chat mode. Use Agent/Edit mode only if you ask for fixes after reviewing findings.

Read and follow .codex/skills/api-review/SKILL.md and .claude/agents/api-experience-reviewer.md.
If they are not auto-discovered, open those files directly and follow their guidance.

Review the API routes, webhook handlers, request validation, error shape, auth boundaries, idempotency, logging, and docs.
Return findings by severity with file references and concrete fixes. Do not make broad refactors.
```

### UX Review

```text
Mode: Review mode or Chat mode.

Read and follow .codex/skills/ux-review/SKILL.md and .claude/agents/intent-ux-reviewer.md.
If they are not auto-discovered, open those files directly and follow their guidance.

Review the main user workflows, loading states, empty states, error states, responsive behavior, accessibility, and task completion.
For React, TypeScript, and Tailwind projects, also use docs/SHADCN-UI-STANDARD.md from apt-principles-agents to inspect shadcn structure, component layering, installed primitives, and migration readiness.
Return workflow blockers first, then polish opportunities.
```

### Documentation Sync

```text
Mode: Agent mode or Edit mode after identifying stale docs.

Read and follow .codex/skills/docs-sync/SKILL.md.
If it is not auto-discovered as a skill, open the file directly and follow its process.

Compare README, docs/project-context.md, setup docs, deployment docs, API docs, and current scripts/config.
Update stale documentation only where the code or commands prove it is stale.
Preserve project-specific context.
```

### Repo Standardization

```text
Mode: Chat mode for the plan first. Agent mode only after the plan is reviewed.

Read and follow .codex/skills/repo-standardization/SKILL.md and .claude/agents/repo-standardizer.md.
If using Copilot Chat, read and follow .github/prompts/repo-standardization.prompt.md.
If they are not auto-discovered, open those files directly and follow their guidance.

Inspect the repository layout, scripts, docs, tests, agent files, and project context.
Recommend a standardization plan that preserves behavior.
Do not move files until the plan is reviewed.
```

## Using GitHub Copilot Prompt Files

Installed prompt files live in:

```text
.github/prompts/
```

Use them as reusable prompt templates for recurring work:

- `cloudflare-modernization.prompt.md`
- `cloudflare-react-hono.prompt.md`
- `api-review.prompt.md`
- `review-api.prompt.md`
- `test-generator.prompt.md`
- `generate-tests.prompt.md`
- `docs-sync.prompt.md`
- `update-docs.prompt.md`
- `review-diff.prompt.md`
- `repo-standardization.prompt.md`
- `lovable-to-apt.prompt.md`
- `lovable-to-cloudflare.prompt.md`
- `repo-standardize.prompt.md`
- `apt-readiness-audit.prompt.md`
- `ai-output-review.prompt.md`
- `documentation-normalization.prompt.md`
- `refactor-safety.prompt.md`
- `ux-review.prompt.md`

When using a prompt file, add the concrete scope:

```text
Mode: Copilot Chat.

Use .github/prompts/review-diff.prompt.md to review the current diff.
Focus on apps/worker/src/routes and apps/web/src/components.
Return findings first, then test gaps.
```

## Using Codex Skills

Installed skills live in:

```text
.codex/skills/
```

Each `SKILL.md` includes:

- Purpose.
- When to use.
- When not to use.
- Required reading.
- Process.
- Output format.
- Validation checklist.

When prompting Codex, name the skill and the target scope:

```text
Mode: Codex Agent mode for edits, Codex Chat/Review mode for findings.

Use .codex/skills/api-review/SKILL.md.
Review apps/worker/src/routes for payment API contract issues.
Return findings first and do not edit files.
```

## Using Claude Agents

Installed Claude agents live in:

```text
.claude/agents/
```

Use them for specialized review and planning:

- `apt-readiness-auditor.md`
- `cloudflare-architect.md`
- `api-experience-reviewer.md`
- `intent-ux-reviewer.md`
- `documentation-architect.md`
- `repo-standardizer.md`
- `ai-output-auditor.md`

Start with an inspection prompt:

```text
Mode: Claude Code with the cloudflare-architect subagent.

Use the cloudflare-architect subagent to review the Worker and Pages architecture.
Inspect wrangler config, route structure, bindings, secrets assumptions, and deployment scripts.
Return a staged modernization plan with risks and validation commands.
```

## After The AI Suggests Changes

Before accepting or implementing suggestions:

- Check the recommendation against `docs/project-context.md`.
- Confirm it preserves current behavior unless a behavior change is explicit.
- Confirm it does not introduce unneeded platform services or abstractions.
- Confirm validation commands are specific and runnable.
- Prefer a small first change over a broad rewrite.

After changes:

```bash
git status --short
```

Then run target-specific checks from `docs/POST-OPERATION-CHECKS.md`.

## Improvement Backlog Template

After an audit, create a short backlog:

```text
# APT Improvement Backlog

## Now
- [ ] Fix critical validation/security/doc drift issue.

## Next
- [ ] Add focused tests for changed behavior.
- [ ] Normalize stale docs.

## Later
- [ ] Modernize structure after behavior is covered by tests.

## Deferred
- [ ] Larger refactor or platform change that needs separate planning.
```

Keep the backlog in the target repo issue tracker or a project-specific doc. Do not put target-specific backlog items into managed standards files.
