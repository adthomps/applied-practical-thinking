import fs from "fs";
import path from "path";
import { createRequire } from "module";
import { fileURLToPath } from "url";
import { describe, expect, it } from "vitest";

const require = createRequire(import.meta.url);
const matter = require("gray-matter");

type ManifestVersion = {
  major: number;
  semanticVersion: string;
  status: string;
  sourcePath: string;
  publishedAt: string;
};

type ManifestDocument = {
  docId: string;
  slug: string;
  versions: ManifestVersion[];
};

type DesignManifest = {
  documents: ManifestDocument[];
};

const fileDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(fileDir, "../../..");
const designDocsRoot = path.join(repoRoot, "apps", "web", "docs", "design");
const manifestPath = path.join(designDocsRoot, "APT-DESIGN-DOCS-MANIFEST.json");

const requiredMarkdownKeys = ["docId", "slug", "major", "semanticVersion", "status", "publishedAt"] as const;

describe("design docs frontmatter contract", () => {
  it("ensures manifest-registered markdown docs include required frontmatter and matching metadata", () => {
    const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8")) as DesignManifest;

    for (const doc of manifest.documents) {
      for (const version of doc.versions) {
        if (!version.sourcePath.endsWith(".md")) {
          continue;
        }

        const absoluteSourcePath = path.join(designDocsRoot, ...version.sourcePath.split("/"));
        expect(fs.existsSync(absoluteSourcePath), `Missing source doc: ${version.sourcePath}`).toBe(true);

        const raw = fs.readFileSync(absoluteSourcePath, "utf8");
        const parsed = matter(raw);
        const data = parsed.data ?? {};

        for (const key of requiredMarkdownKeys) {
          expect(data[key], `Missing frontmatter key '${key}' in ${version.sourcePath}`).toBeDefined();
        }

        expect(String(data.docId), `${version.sourcePath} docId mismatch`).toBe(String(doc.docId));
        expect(String(data.slug), `${version.sourcePath} slug mismatch`).toBe(String(doc.slug));
        expect(Number(data.major), `${version.sourcePath} major mismatch`).toBe(Number(version.major));
        expect(String(data.semanticVersion), `${version.sourcePath} semanticVersion mismatch`).toBe(String(version.semanticVersion));
        expect(String(data.status), `${version.sourcePath} status mismatch`).toBe(String(version.status));

        const publishedAt =
          data.publishedAt instanceof Date
            ? data.publishedAt.toISOString().slice(0, 10)
            : String(data.publishedAt || "");
        expect(publishedAt, `${version.sourcePath} publishedAt mismatch`).toBe(String(version.publishedAt));
      }
    }
  });
});
