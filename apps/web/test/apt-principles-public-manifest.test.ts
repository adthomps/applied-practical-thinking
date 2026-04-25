import { describe, expect, it } from "vitest";
import { aptPrinciplesPublicManifest } from "@/data/generated/aptPrinciplesPublicManifest";

const requiredDoctrineSources = [
  "apt-principles/apt-principles.md",
  "apt-principles/thinking.md",
  "apt-principles/design.md",
  "apt-principles/architecture.md",
  "apt-principles/system-standards.md",
  "apt-principles/security.md",
  "apt-principles/execution.md",
  "apt-principles/quality-testing.md",
  "apt-principles/release-change-management.md",
  "apt-principles/operations-support.md",
  "apt-principles/knowledge-system.md",
  "apt-principles/ai-agent-framework.md",
];

describe("apt principles public manifest", () => {
  it("publishes every canonical doctrine source from apt-principles", () => {
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
      expect(item.sourcePath.startsWith("apt-principles/")).toBe(true);
      expect(item.publicPath.startsWith("/docs/apt/")).toBe(true);
      expect(item.checksum).toMatch(/^[a-f0-9]{64}$/);
      expect(item.title.length).toBeGreaterThan(0);
      expect(item.version.length).toBeGreaterThan(0);
      expect(item.status.length).toBeGreaterThan(0);
    }
  });
});
