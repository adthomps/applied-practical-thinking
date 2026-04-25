import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

function read(relativePath: string) {
  const absolutePath = path.resolve(process.cwd(), relativePath);
  return fs.readFileSync(absolutePath, "utf8");
}

describe("worker-first feed adoption contract", () => {
  it("uses feed hooks in Labs/Proof/Insights routes", () => {
    const labs = read("routes/portfolio/Labs.tsx");
    const proof = read("routes/Proof.tsx");
    const insights = read("routes/Insights.tsx");

    expect(labs.includes("useLabsFeedQuery")).toBe(true);
    expect(proof.includes("useProofFeedQuery")).toBe(true);
    expect(insights.includes("useInsightsFeedQuery")).toBe(true);
  });

  it("keeps production worker API base explicit (no implicit host fallback)", () => {
    const apiService = read("src/services/api.ts");

    expect(apiService.includes("known-pages-host")).toBe(false);
    expect(apiService.includes("production-default")).toBe(false);
    expect(apiService.includes("isKnownPagesHostname")).toBe(false);
    expect(apiService.includes("Set VITE_API_BASE")).toBe(true);
  });

  it("uses feed assembly in aggregate hooks used by shared pages", () => {
    const aggregates = read("hooks/useContentAggregateQueries.ts");

    expect(aggregates.includes("fetchFeed(")).toBe(true);
    expect(aggregates.includes("fetchContentIndex(")).toBe(false);
  });
});
