---
name: repo-standardization
description: Use when bringing a repository into APT folder, docs, scripts, and agent instruction conventions.
title: "Repo Standardization"
kind: "platform-adapter"
domain: "platforms"
status: "active"
owner: "APT"
last_updated: "2026-06-28"
source_paths: ["apt-agent-standards/codex/skills/repo-standardization/SKILL.md"]
---

# Repo Standardization

## Purpose
Standardize repository structure and agent context.

## When To Use
Use during adoption, cleanup, or migration planning.

## When Not To Use
Do not use for feature-only tasks.

## Required Reading
Read repo tree, package scripts, README, `AGENTS.md`, `.claude`, `.codex`, `.github`, docs, tests, and `docs/project-context.md`.

## Process
1. Inventory apps, packages, scripts, docs, tests, deployment config, and AI tool files.
2. Compare current state to APT standards and installed profiles.
3. Identify missing setup/run guides, project context, validation commands, and governance docs.
4. Produce a staged plan before moving or renaming files.
5. Implement only safe scoped updates after plan review.
6. Update docs and validation commands with each stage.

## Output Format
Return inventory, gaps, staged standardization plan, files to change, validation commands, risks, and follow-ups.

## Validation Checklist
- Existing workflows still work.
- Agent files are useful.
- Project context exists.
- No broad restructuring happens without an approved plan.
- Scripts and docs agree.
