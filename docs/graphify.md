# Graphify Guide

Use Graphify to understand how the public APT site, Worker, shared packages, authored content registries, and publication generators connect. Do not graph copied public output as though it were authored source.

## Build

Run from the sibling `apt-principles-agents` repository:

```powershell
node scripts/graphify-workspace.mjs code applied-practical-thinking
node scripts/graphify-workspace.mjs status applied-practical-thinking
```

The build uses local AST extraction and writes an ignored immutable candidate. It never promotes automatically.

## Included architecture

- `apps/web/` application, authored registries, routes, and publication generators
- `apps/worker/` API, feed, AI, and vector-search boundaries
- `packages/ui/`, `packages/config/`, and `packages/knowledge/`
- repository-local authored maintenance scripts

Copied public assets, the design-document tree, generated indexes and manifests, validation reports, tests, vendored UI components, dependencies, build output, caches, secrets, and Graphify output are excluded. Authored design and product documentation remains better handled through the focused `doctrine-adoption-drift`, `design-provenance`, and `public-proof` investigation packs.

## Questions

- How does canonical APT doctrine become the curated public reference experience?
- Which authored sources generate public content, indexes, and validation evidence?
- How do the browser application, Worker, and shared packages interact?
- What code is affected by changing the publication manifest or taxonomy?
- Where can generated public content drift from canonical sources?

Confirm all publication and public-proof claims in authored source, generator code, and validation contracts. Generated public copies are evidence of a build, not authority.
