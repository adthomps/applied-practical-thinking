import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import {
  aptPrincipleGroups,
  aptPrinciplesFrameworkPublicDocPath,
} from "@/data/aptPrinciples";

function toPublicFilePath(publicPath: string) {
  return path.resolve(process.cwd(), "public", publicPath.replace(/^\/docs\//, "docs/"));
}

describe("apt principles canonical public assets", () => {
  it("ships framework and group markdown artifacts under /public/docs/apt", () => {
    const requiredPublicPaths = [
      aptPrinciplesFrameworkPublicDocPath,
      ...aptPrincipleGroups.map((group) => group.publicDocPath),
    ].filter((value): value is string => !!value);

    for (const publicPath of requiredPublicPaths) {
      expect(publicPath.startsWith("/docs/apt/")).toBe(true);
      const localPath = toPublicFilePath(publicPath);
      expect(fs.existsSync(localPath), `Missing generated public doc: ${publicPath}`).toBe(true);
      expect(fs.readFileSync(localPath, "utf8").trim().length).toBeGreaterThan(0);
    }
  });
});
