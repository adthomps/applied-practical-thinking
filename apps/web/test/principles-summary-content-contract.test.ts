import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { principlesSections } from "@/src/data/principles";

function readRoute(relativePath: string) {
  const filePath = path.resolve(process.cwd(), relativePath);
  return fs.readFileSync(filePath, "utf8");
}

describe("principles summary content contract", () => {
  it("defines all required principle summary pages with key sections and source links", () => {
    expect(principlesSections).toHaveLength(12);

    for (const section of principlesSections) {
      expect(section.title.length).toBeGreaterThan(0);
      expect(section.summary.length).toBeGreaterThan(0);
      expect(section.role.length).toBeGreaterThan(0);
      expect(section.keyRules.length).toBeGreaterThanOrEqual(5);
      expect(section.keyRules.length).toBeLessThanOrEqual(10);
      expect(section.howUsed.length).toBeGreaterThan(0);
      expect(section.patterns.length).toBeGreaterThan(0);
      expect(section.aiUsage.length).toBeGreaterThan(0);
      expect(section.examples.length).toBeGreaterThanOrEqual(2);
      expect(section.examples.length).toBeLessThanOrEqual(4);
      for (const example of section.examples) {
        expect(example.href.startsWith("/")).toBe(true);
        expect((example.rationale || "").length).toBeGreaterThan(15);
      }
      expect(section.sourceAnchors.length).toBeGreaterThanOrEqual(4);
      for (const anchor of section.sourceAnchors) {
        expect(anchor.href.startsWith("https://github.com/adthomps/apt-principles/blob/main/apt-principles/")).toBe(true);
      }
      expect(section.moreDetail.decisionCues.length).toBeGreaterThan(0);
      expect(section.moreDetail.failureModes.length).toBeGreaterThan(0);
      expect(section.moreDetail.implementationHeuristics.length).toBeGreaterThan(0);
      expect(section.moreDetail.antiPatterns.length).toBeGreaterThan(0);
      expect(section.operationalSummary.focus.length).toBeGreaterThan(0);
      expect(section.operationalSummary.outputs.length).toBeGreaterThan(0);
      expect(section.operationalSummary.practicalExample.length).toBeGreaterThan(20);
      expect(section.whenToUse.length).toBeGreaterThan(0);
      expect(section.whenNotToUse.length).toBeGreaterThan(0);
      expect(section.promptStarter.goal.length).toBeGreaterThan(10);
      expect(section.promptStarter.inputs.length).toBeGreaterThan(0);
      expect(section.promptStarter.expectedOutputFormat.length).toBeGreaterThan(0);
      expect(section.relatedArtifacts.length).toBeGreaterThan(0);
      expect(section.sourceHref.startsWith("https://github.com/adthomps/apt-principles/blob/main/apt-principles/")).toBe(true);
      expect(section.sourceHref.endsWith(".md")).toBe(true);
    }
  });

  it("keeps principles pages as curated summaries and avoids markdown-doc rendering", () => {
    const homeSource = readRoute("routes/principles/PrinciplesHome.tsx");
    const detailSource = readRoute("routes/principles/PrinciplesDetail.tsx");

    expect(homeSource.includes("MarkdownContent")).toBe(false);
    expect(detailSource.includes("MarkdownContent")).toBe(false);
    expect(detailSource.includes('title="Summary"')).toBe(true);
    expect(detailSource.includes('title="Key Rules"')).toBe(true);
    expect(detailSource.includes('title="How This Is Used"')).toBe(true);
    expect(detailSource.includes('title="Patterns"')).toBe(true);
    expect(detailSource.includes('title="Operational Summary"')).toBe(true);
    expect(detailSource.includes('title="When To Use"')).toBe(true);
    expect(detailSource.includes('title="When Not To Use"')).toBe(true);
    expect(detailSource.includes('title="Prompt Starter"')).toBe(true);
    expect(detailSource.includes('title="Adjacent Principles"')).toBe(true);
    expect(detailSource.includes('title="Examples"')).toBe(true);
    expect(detailSource.includes('title="Source of Truth"')).toBe(true);
    expect(detailSource.includes('title="AI Usage"')).toBe(true);
    expect(detailSource.includes("More detail")).toBe(true);
    expect(detailSource.includes("Read canonical")).toBe(true);
  });
});
