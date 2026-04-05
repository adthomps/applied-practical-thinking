# APT Design Versioning

Unified versioning policy for APT design doctrine and review artifacts.

---

## Scope

This policy applies to all governed design artifacts:

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

APT design artifacts use semantic versioning:

- Major: `X.0.0`
- Minor: `X.Y.0`
- Patch: `X.Y.Z`

Release semantics:

- Major: Breaking changes to doctrine meaning, review contracts, artifact location, or machine-consumed structure.
- Minor: Additive and backward-compatible guidance, sections, or metadata.
- Patch: Non-semantic fixes such as wording, typo, link, and formatting corrections.

---

## Lifecycle States

Each governed artifact or artifact set uses one of:

- Draft
- Candidate
- Stable
- Deprecated

Public publishing rule:

- External consumers get only the latest stable major at `/docs/design/v{major}/...`.
- Compatibility aliases at `/docs/design/...` must resolve to the latest stable major.

---

## Internal vs External Placement

Internal authoring source:

- `apps/web/docs/design/`

Public runtime output:

- Canonical versioned paths in `apps/web/public/docs/design/v1/`
- Latest-stable aliases in `apps/web/public/docs/design/`

Generated public output is not source of truth.

---

## Change Governance

When a governed artifact changes:

1. Determine if the change is major, minor, or patch.
2. Update artifact version metadata and release notes.
3. If major or minor, add a decision entry in `docs/DECISION_LOG.md`.
4. Update design docs manifest and AI review bundle metadata.
5. Rebuild public docs and verify alias compatibility.

Required for major and minor:

- Decision log entry with rationale and consequences.
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
- Public canonical root: `/docs/design/v1/`
- Public latest alias root: `/docs/design/`

---

## Upgrade Path for Future Majors

To release a new major:

1. Update authored doctrine in `apps/web/docs/design/` and classify major-impact changes.
2. Update major/version metadata in `APT-DESIGN-DOCS-MANIFEST.json` and `APT-AI-REVIEW-BUNDLE.json`.
3. Publish canonical docs to `apps/web/public/docs/design/v{nextMajor}/` via the build script.
4. Move alias targets in `apps/web/public/docs/design/` to `{nextMajor}`.
5. Record a major-change decision log entry.
6. Announce compatibility and migration notes for tooling consumers.
