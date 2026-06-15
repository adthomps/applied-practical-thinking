---
description: "Holistic APT repository health review. Use for a broad repo assessment covering structure, documentation coverage, agent/skill readiness, validation commands, and adoption posture — distinct from the evidence-first audit in standard-repo-audit.prompt.md."
---

# Review Repo (APT)

## Purpose
Produce a holistic health snapshot of a repository against APT standards: structure, documentation, tooling, agent readiness, and adoption posture.

## Input Expectations
Provide:
- Repository name and primary purpose
- Stack and deployment target (if known)
- APT adoption mode: Copy / Sync / Apply / Showcase
- Any known gaps or recent changes to review

If inputs are missing, state assumptions explicitly.

## Prompt
```text
You are performing an Applied Practical Thinking (APT) repository health review.

Repository: [INSERT NAME]
Purpose: [INSERT PURPOSE]
Stack: [INSERT STACK]
APT adoption mode: [Copy / Sync / Apply / Showcase]

Review the following dimensions and return a scored health summary:

1. Structure
   - Does the repo follow the APT downstream project template (docs/, .github/agents/, .github/skills/, scripts/)?
   - Are AGENTS.md, README.md, and CONTRIBUTING.md present and current?
   - Is there a docs/apt/ adoption record?

2. Documentation coverage
   - Are all relevant APT principle layers represented in local docs or linked references?
   - Is there an ARCHITECTURE.md or DESIGN.md defining project-specific decisions?
   - Are ADRs present for non-obvious decisions?

3. Validation tooling
   - Are there scripts for validate-repo, check-docs, or smoke-test?
   - Are CI checks configured for docs and code quality?
   - Is there a validation runbook?

4. Agent and skill readiness
   - Are .github/agents/ files present for the roles this repo needs?
   - Are .github/skills/ present for the primary build tasks?
   - Do agent and skill descriptions match actual repo scope?

5. APT adoption posture
   - Does the project profile reference apt-principles as the canonical source?
   - Is there a project-profile.json or adoption.md with maturity evidence?
   - Are checklists being run and results recorded?

Score each dimension: Green (complete), Yellow (gaps), Red (missing or broken).

Return:
- Per-dimension score and evidence
- Top 3 highest-impact improvements
- Recommended next step for each improvement
- Overall adoption maturity level: Starter / Developing / Established / Advanced
```

## Expected Output
- Scored health summary across 5 dimensions
- Concrete evidence for each score
- Prioritized improvement list with next steps

## Related Documents
- [apt-principles.md](../../apt-principles.md)
- [governance/repository-review.md](../../governance/repository-review.md)
- [governance/maturity-model.md](../../governance/maturity-model.md)
- [checklists/project-adoption-checklist.md](../../checklists/project-adoption-checklist.md)
