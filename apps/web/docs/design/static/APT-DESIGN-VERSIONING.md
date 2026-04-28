---
title: APT Design Versioning
version: v2
status: candidate
audience: developer
visibility: public
source: manual
---

# APT Design Versioning

Local mirror and runtime compatibility policy for published APT design artifacts in `applied-practical-thinking`.

---

## Scope

This policy applies to local published mirror artifacts and compatibility metadata in this repo:

- APT Design Overview
- APT Design Thinking
- APT Design System
- APT Design Architecture
- APT Content Strategy
- APT Design Systems
- APT Review Standard
- APT AI Review Bundle (Markdown + JSON manifest)

---

## Versioning Model

`apt-principles` owns doctrine meaning and version authority. This repo keeps only the metadata needed to publish and serve compatible mirror artifacts.

Local mirror artifacts retain semantic versions so runtime consumers can resolve the right published file:

- Major: `X.0.0`
- Minor: `X.Y.0`
- Patch: `X.Y.Z`

Release semantics:

- Major: Upstream doctrine version change or a local breaking change to published artifact location or machine-consumed structure.
- Minor: Backward-compatible mirror metadata or compatibility-layer additions.
- Patch: Non-semantic local fixes such as wording, typo, link, or formatting corrections.

---

## Lifecycle States

Each governed artifact or artifact set uses one of:

- Draft
- Candidate
- Stable
- Deprecated

Public publishing rule:

- External consumers get only the latest published stable major at `/docs/design/v{major}/...`.
- Compatibility aliases at `/docs/design/...` must resolve to the latest stable major.

---

## Internal vs External Placement

Local authored mirror/reference source:

- `apps/web/docs/design/`

Upstream doctrine/version authority:

- `apt-principles`

Public runtime output:

- Versioned published paths in `apps/web/public/docs/design/v1/`
- Latest-stable aliases in `apps/web/public/docs/design/`

Generated public output is not source of truth.

---

## Change Governance

When a local published mirror artifact changes:

1. Confirm whether the upstream change already exists in `apt-principles` or whether the change is only local compatibility metadata.
2. Determine if the local mirror metadata change is major, minor, or patch.
3. Update design docs manifest and AI review bundle metadata only as needed for published compatibility.
4. Rebuild public docs and verify alias compatibility.

Required for major and minor:

- Decision log entry when local runtime compatibility behavior changes materially.
- Reviewer confirmation that route/API consumers remain compatible or are intentionally migrated.

---

## Artifact Metadata Contract

All manifested design artifacts should include or be represented by metadata with:

- `id`
- `title`
- `slug`
- `semanticVersion`
- `major`
- `status`
- `canonicalPath`
- `aliasPath`
- `updatedAt`

The AI review bundle JSON should additionally include:

- `docsMajor`
- `compatibility` guidance for consumers

---

## v1 Baseline

Initial baseline release for this policy:

- Design docs major: `1`
- Bundle semantic version: `1.0.0`
- Public published root: `/docs/design/v1/`
- Public latest alias root: `/docs/design/`

---

## Upgrade Path for Future Majors

To release a new major:

1. Update or import the upstream doctrine version from `apt-principles`.
2. Update major/version metadata in `APT-DESIGN-DOCS-MANIFEST.json` and `APT-AI-REVIEW-BUNDLE.json` only for local published compatibility.
3. Publish mirror docs to `apps/web/public/docs/design/v{nextMajor}/` via the build script.
4. Move alias targets in `apps/web/public/docs/design/` to `{nextMajor}`.
5. Record a decision log entry only if local compatibility behavior or routing changes materially.
6. Announce compatibility and migration notes for tooling consumers when needed.
