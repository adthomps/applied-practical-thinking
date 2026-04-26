import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { siteConfig } from "@/data/site";

function readAppSource() {
  const appPath = path.resolve(process.cwd(), "App.tsx");
  return fs.readFileSync(appPath, "utf8");
}

describe("principles summary routes and nav contract", () => {
  it("defines canonical /principles routes", () => {
    const source = readAppSource();

    expect(source.includes('path="/principles" element={<PrinciplesHome />}')).toBe(true);
    expect(source.includes('path="/principles/framework"')).toBe(true);
    expect(source.includes('path="/principles/thinking"')).toBe(true);
    expect(source.includes('path="/principles/design"')).toBe(true);
    expect(source.includes('path="/principles/architecture"')).toBe(true);
    expect(source.includes('path="/principles/system"')).toBe(true);
    expect(source.includes('path="/principles/execution"')).toBe(true);
    expect(source.includes('path="/principles/quality"')).toBe(true);
    expect(source.includes('path="/principles/release"')).toBe(true);
    expect(source.includes('path="/principles/operations"')).toBe(true);
    expect(source.includes('path="/principles/knowledge"')).toBe(true);
    expect(source.includes('path="/principles/ai"')).toBe(true);
    expect(source.includes('path="/principles/security"')).toBe(true);

    expect(source.includes('path="/design/principles" element={<PrinciplesHome />}')).toBe(true);
  });

  it("uses the flat top-level IA and hard-cut canonical routes", () => {
    const topLevelPaths = new Set(siteConfig.nav.map((item) => item.path));

    expect(topLevelPaths.has("/")).toBe(true);
    expect(topLevelPaths.has("/labs")).toBe(true);
    expect(topLevelPaths.has("/proof")).toBe(true);
    expect(topLevelPaths.has("/principles")).toBe(true);
    expect(topLevelPaths.has("/insights")).toBe(true);
    expect(topLevelPaths.has("/about")).toBe(true);
    expect(topLevelPaths.has("/start")).toBe(false);
    expect(topLevelPaths.has("/learn")).toBe(false);
    expect(topLevelPaths.has("/experiments")).toBe(false);

    const source = readAppSource();
    expect(source.includes('path="/learn" element={<Insights />}')).toBe(false);
    expect(source.includes('path="/experiments" element={<PortfolioLabs />}')).toBe(false);
    expect(source.includes('path="/design/systems" element={<Systems />}')).toBe(false);
  });
});
