---
title: Working Backwards Examples
version: v1
last_updated: 2026-10-04
owner: APT
status: active
kind: "example"
domain: "execution"
source_paths: ["apt-principles-agents/examples/working-backwards/README.md"]
---

# Working Backwards Examples

Working Backwards is a general APT method. Each repository builds its own version on top of it in three layers: the APT method, an optional shared domain profile, and the repository's own profile. These examples show the method itself and three ways repositories adopt it.

## The method, domain-neutral

[booking-data-export/](booking-data-export/README.md): a complete, short package for a small booking app — press release through critic review — with no domain profile. Use it to see what each stage must contain. Its evidence is illustrative and labelled as such.

## Adoption patterns

| Pattern | Repository | Layers | What it shows |
| --- | --- | --- | --- |
| **Established local implementation** | APT Commerce (`apt-commerce/docs/apt/working-backwards/`) | Method + its own rules in its package README; its own critic skill and hook | A mature practice (50+ packages) that predates the APT system. It references the APT rubric and role contracts, keeps its own critic and hook as repository-owned paths (`localTargets`), and is the source of the `payments` domain profile. It can move its README rules into a repository profile when its owner chooses. |
| **Domain profile plus repository profile** | Grey Rain (`apt-grey-rain/docs/apt/working-backwards/`) | Method + `game-development` + Grey Rain profile | A new adoption: the shared game profile handles what every game needs (core loop, playtests, cut list); Grey Rain's own profile adds its AI dungeon master, campaign state, and pilot scope. |
| **Shared domain profile for sibling repositories** | Authorize.Net and VAS SMB integration toolboxes (`docs/apt/working-backwards/` in each) | Method + `integration-toolbox` + each toolbox's profile | Two repositories with the same rules share one domain profile (developer job, sources, sandbox safety, counterpart and catalog consistency); each profile adds only its own rules, such as legacy-method honesty or SMB applicability. |
| **Method plus repository profile only** | Any repository with no matching domain | Method + repository profile | Start from `templates/working-backwards/repo-profile.md`. Propose a new shared domain profile only when a second repository needs the same rules. |

## How a repository adopts it

Follow the [`working-backwards/adopt`](../../skills/working-backwards/adopt/SKILL.md) skill. In short:

1. Install the `working-backwards` manifest.
2. Choose a domain profile, or none.
3. Write `docs/apt/working-backwards/profile.md` and `profile.rubric.json` from the repository-profile template.
4. Write personas in `docs/apt/personas/` and index them in the APT persona register.
5. Create the package index and `_template/`, and add the gate to `AGENTS.md`.

What the repository references from APT, unchanged: the principle, stage templates, base rubric, domain profiles, the orchestrator and writer and critic sub-agents, the skills, and the critic guard hook. What the repository owns: its profile, personas, and packages.
