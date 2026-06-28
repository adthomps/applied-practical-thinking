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

  it("publishes build-kit and reference artifacts for public docs consumers", () => {
    const kinds = new Set(aptPrinciplesPublicManifest.map((item) => item.kind));

    expect(kinds.has("checklist")).toBe(true);
    expect(kinds.has("example")).toBe(true);
    expect(kinds.has("prompt")).toBe(true);
    expect(kinds.has("template")).toBe(true);
    expect(kinds.has("reference")).toBe(true);
  });

  it("uses public apt docs paths and source checksums for drift detection", () => {
    for (const item of aptPrinciplesPublicManifest) {
      expect(Object.keys(item).sort()).toEqual(
        ["checksum", "domain", "id", "kind", "lastUpdated", "publicPath", "sourcePath", "status", "title", "version"].sort()
      );
      expect(item.sourcePath.startsWith("apt-principles-agents/")).toBe(true);
      expect(item.publicPath.startsWith("/docs/apt/")).toBe(true);
      expect(item.checksum).toMatch(/^[a-f0-9]{64}$/);
      expect(item.title.length).toBeGreaterThan(0);
      expect(item.domain.length).toBeGreaterThan(0);
      expect(item.version.length).toBeGreaterThan(0);
      expect(item.status.length).toBeGreaterThan(0);
    }
  });
});
