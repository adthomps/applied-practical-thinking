import { describe, expect, it } from "vitest";
import { careerPhases } from "../data/career";
import { authorConfig } from "../data/site";

describe("career timeline data", () => {
  it("lists phases newest first, each with at least one role", () => {
    expect(careerPhases.length).toBeGreaterThan(0);
    for (const phase of careerPhases) {
      expect(phase.roles.length).toBeGreaterThan(0);
      expect(phase.summary.length).toBeGreaterThan(0);
    }
    expect(careerPhases[0].roles[0].end).toBe("Present");
  });

  it("keeps the current role in sync with the profile title", () => {
    const current = careerPhases[0].roles[0].title.replace(/,\s*/, " of ");
    expect(current.toLowerCase()).toContain("service experience");
    expect(authorConfig.title.toLowerCase()).toContain("service experience");
    expect(authorConfig.title.toLowerCase()).toContain("go to market");
  });
});
