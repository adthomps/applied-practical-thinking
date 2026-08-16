import { describe, expect, it } from "vitest";
import { aptPrinciplesPublicManifest } from "@/data/generated/aptPrinciplesPublicManifest";

const requiredDoctrineSources = [
  "apt-principles-agents/principles/framework.md",
  "apt-principles-agents/principles/thinking/README.md",
  "apt-principles-agents/principles/design/README.md",
  "apt-principles-agents/principles/architecture/README.md",
  "apt-principles-agents/principles/system-standards/README.md",
  "apt-principles-agents/principles/security-risk/README.md",
  "apt-principles-agents/principles/execution/delivery-increments.md",
  "apt-principles-agents/principles/execution/quality-and-testing.md",
  "apt-principles-agents/principles/execution/release-and-change-management.md",
  "apt-principles-agents/principles/execution/operations-and-support.md",
  "apt-principles-agents/principles/execution/knowledge-and-learning.md",
  "apt-principles-agents/principles/ai/README.md",
];

describe("apt principles public manifest", () => {
  it("publishes every canonical doctrine source from apt-principles-agents", () => {
    const sources = new Set(aptPrinciplesPublicManifest.map((item) => item.sourcePath));

    for (const source of requiredDoctrineSources) {
      expect(sources.has(source)).toBe(true);
    }
  });

  it("publishes only the curated collections and excludes operational asset roots", () => {
    const collections = new Set(aptPrinciplesPublicManifest.map((item) => item.collection));
    expect(collections).toEqual(new Set([
      "start-here",
      "doctrine",
      "standards",
      "examples",
      "reference-architecture",
      "flagship-product-example",
    ]));

    const excludedRoots = ["agents", "checklists", "prompts", "references", "skills", "templates"];
    for (const item of aptPrinciplesPublicManifest) {
      const relativeRoot = item.sourcePath.split("/")[1];
      expect(excludedRoots).not.toContain(relativeRoot);
      expect(["active", "stable"]).toContain(item.status);
    }
  });

  it("uses public apt docs paths and source checksums for drift detection", () => {
    for (const item of aptPrinciplesPublicManifest) {
      expect(Object.keys(item).sort()).toEqual(
        [
          "audience",
          "category",
          "checksum",
          "collection",
          "domain",
          "featured",
          "id",
          "kind",
          "lastUpdated",
          "publicPath",
          "sourcePath",
          "status",
          "title",
          "version",
        ].sort()
      );
      expect(item.sourcePath.startsWith("apt-principles-agents/")).toBe(true);
      expect(item.publicPath.startsWith("/docs/apt/")).toBe(true);
      expect(item.checksum).toMatch(/^[a-f0-9]{64}$/);
      expect(item.title.length).toBeGreaterThan(0);
      expect(item.domain.length).toBeGreaterThan(0);
      expect(item.version.length).toBeGreaterThan(0);
      expect(item.status.length).toBeGreaterThan(0);
      expect(item.collection.length).toBeGreaterThan(0);
      expect(item.category.length).toBeGreaterThan(0);
      expect(item.audience.length).toBeGreaterThan(0);
    }
  });
});
