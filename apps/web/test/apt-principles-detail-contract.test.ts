import { describe, expect, it } from "vitest";
import {
  aptPrincipleGroups,
  aptPrinciplesFrameworkIndex,
  getAptPrincipleGroupByRouteSegment,
} from "@/data/aptPrinciples";

describe("apt principles detail contract", () => {
  it("defines required detail mapping for all principle groups", () => {
    expect(aptPrincipleGroups).toHaveLength(10);

    for (const group of aptPrincipleGroups) {
      expect(group.detailPath).toBe(`/design/principles/${group.id}`);
      expect(group.docSlug.length).toBeGreaterThan(0);
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
    expect(groupEntries).toHaveLength(10);
    for (const item of groupEntries) {
      expect(item.path.startsWith("/design/principles/")).toBe(true);
    }
  });
});
