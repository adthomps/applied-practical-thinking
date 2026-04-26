import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

function readRoute(relativePath: string) {
  const filePath = path.resolve(process.cwd(), relativePath);
  return fs.readFileSync(filePath, "utf8");
}

describe("apt principles ui density contract", () => {
  it("keeps framework page doctrine-first and removes standalone framework index", () => {
    const source = readRoute("routes/portfolio/Principles.tsx");

    expect(source.includes("Canonical doctrine is rendered directly")).toBe(true);
    expect(source.includes('title="Framework Index"')).toBe(false);
    expect(source.includes("aptPrinciplesFrameworkIndex.map")).toBe(false);
  });

  it("keeps framework and detail metadata display minimal", () => {
    const frameworkSource = readRoute("routes/portfolio/Principles.tsx");
    const detailSource = readRoute("routes/portfolio/PrincipleDetail.tsx");

    expect(frameworkSource.includes("publicDocMeta?.status")).toBe(false);
    expect(frameworkSource.includes("publicDocMeta?.checksum")).toBe(false);
    expect(detailSource.includes("publicDocMeta?.status")).toBe(false);
    expect(detailSource.includes("publicDocMeta?.checksum")).toBe(false);
  });

  it("uses compact detail layout with collapsed prompt starter and simplified adjacency links", () => {
    const source = readRoute("routes/portfolio/PrincipleDetail.tsx");

    expect(source.includes("Expand prompt starter")).toBe(true);
    expect(source.includes('title="Adjacent Groups"')).toBe(true);
    expect(source.includes('title="Related Links"')).toBe(false);
  });
});
