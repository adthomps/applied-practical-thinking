import { describe, expect, it } from "vitest";
import { aptPrincipleGroups, aptPrinciplesNavSections } from "@/data/aptPrinciples";

describe("apt principles nav contract", () => {
  it("keeps top-level principles nav progressive rather than listing all groups", () => {
    const topLevelGroupLinks = aptPrinciplesNavSections.filter((item) =>
      item.path.startsWith("/design/principles/")
    );

    expect(topLevelGroupLinks.length).toBeGreaterThan(0);
    expect(topLevelGroupLinks.length).toBeLessThan(aptPrincipleGroups.length);
  });

  it("includes framework entry and related surfaces in top-level principles nav", () => {
    const paths = new Set(aptPrinciplesNavSections.map((item) => item.path));

    expect(paths.has("/design/principles")).toBe(true);
    expect(paths.has("/design/system")).toBe(true);
    expect(paths.has("/design/docs")).toBe(true);
  });
});
