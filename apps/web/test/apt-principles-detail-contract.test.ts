import { describe, expect, it } from "vitest";
import {
  aptPrincipleGroups,
  aptPrinciplesFrameworkPublicDocPath,
  aptPrinciplesFrameworkIndex,
  getAptPrincipleGroupByRouteSegment,
} from "@/data/aptPrinciples";
import { aptPrinciplesPublicManifest } from "@/data/generated/aptPrinciplesPublicManifest";

describe("apt principles detail contract", () => {
  it("defines required detail mapping for all principle groups", () => {
    expect(aptPrincipleGroups).toHaveLength(11);

    for (const group of aptPrincipleGroups) {
      expect(group.detailPath).toBe(`/design/principles/${group.id}`);
      expect(group.docSlug.length).toBeGreaterThan(0);
      expect(group.sourcePath.startsWith("apt-principles/")).toBe(true);
      expect(group.publicDocPath?.startsWith("/docs/apt/")).toBe(true);
      expect(group.publicDocMeta?.publicPath).toBe(group.publicDocPath);
      expect(group.publicDocMeta?.checksum).toMatch(/^[a-f0-9]{64}$/);
      expect(group.detailSummary.length).toBeGreaterThan(0);
      expect(group.aiPromptExample.goal.length).toBeGreaterThan(0);
      expect(group.aiPromptExample.inputs.length).toBeGreaterThan(0);
      expect(group.aiPromptExample.expectedOutputFormat.length).toBeGreaterThan(0);
    }
  });

  it("maps route segment resolver to known principle ids", () => {
    for (const group of aptPrincipleGroups) {
      expect(getAptPrincipleGroupByRouteSegment(group.id)?.id).toBe(group.id);
    }

    expect(getAptPrincipleGroupByRouteSegment("unknown-group")).toBeNull();
  });

  it("prioritizes detail paths in framework index for group entries", () => {
    const groupEntries = aptPrinciplesFrameworkIndex.filter((item) => item.id !== "framework");
    expect(groupEntries).toHaveLength(11);
    for (const item of groupEntries) {
      expect(item.path.startsWith("/design/principles/")).toBe(true);
    }
  });

  it("backs every public principle group with generated canonical apt-principles docs", () => {
    const generatedSourcePaths = new Set(aptPrinciplesPublicManifest.map((item) => item.sourcePath));

    for (const group of aptPrincipleGroups) {
      expect(generatedSourcePaths.has(group.sourcePath)).toBe(true);
    }
  });

  it("maps the framework page to canonical apt-principles markdown", () => {
    expect(aptPrinciplesFrameworkPublicDocPath).toBe("/docs/apt/apt-principles.md");
  });
});
