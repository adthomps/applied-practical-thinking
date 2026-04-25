import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

function readWorkerPublicContentSource() {
  const workerRoutePath = path.resolve(process.cwd(), "..", "worker", "src", "routes", "publicContent.ts");
  return fs.readFileSync(workerRoutePath, "utf8");
}

describe("worker feed API contract", () => {
  it("defines canonical feed endpoints", () => {
    const source = readWorkerPublicContentSource();

    expect(source.includes('.get("/api/feed/:feed"')).toBe(true);
    expect(source.includes('.get("/api/feed/:feed/:idOrSlug"')).toBe(true);
  });

  it("assembles each feed from expected source indexes", () => {
    const source = readWorkerPublicContentSource();

    expect(source.includes('if (feed === "labs")')).toBe(true);
    expect(source.includes('fetchNormalizedIndex(c, "labs")')).toBe(true);
    expect(source.includes('fetchNormalizedIndex(c, "demos")')).toBe(true);

    expect(source.includes('if (feed === "proof")')).toBe(true);
    expect(source.includes('fetchNormalizedIndex(c, "systems")')).toBe(true);
    expect(source.includes('fetchNormalizedIndex(c, "design-reviews")')).toBe(true);

    expect(source.includes('fetchNormalizedIndex(c, "blog")')).toBe(true);
    expect(source.includes('fetchNormalizedIndex(c, "podcasts")')).toBe(true);
    expect(source.includes('fetchNormalizedIndex(c, "guides")')).toBe(true);
  });
});
