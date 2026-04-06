import { createRequire } from "module";
import fs from "fs";
import os from "os";
import path from "path";
import { describe, expect, it } from "vitest";

const require = createRequire(import.meta.url);
const {
  publishDesignDocsFromManifest,
} = require("../scripts/copy-content-to-public.cjs");

function writeJson(filePath: string, value: unknown) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

function writeDoc(filePath: string, contents: string) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, contents, "utf8");
}

describe("copy-content-to-public design docs publishing", () => {
  it("preserves historical version folders and publishes alias from latestMajor", () => {
    const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "apt-design-publish-"));
    const designDocsRoot = path.join(tempRoot, "docs", "design");
    const publicDocsRoot = path.join(tempRoot, "public", "docs", "design");

    const manifest = {
      id: "apt-design-docs-manifest",
      documents: [
        {
          docId: "design-overview",
          slug: "overview",
          title: "APT Design Overview",
          latestMajor: 2,
          aliasPath: "/docs/design/APT-DESIGN-OVERVIEW.md",
          versions: [
            {
              major: 1,
              semanticVersion: "1.0.0",
              status: "stable",
              sourcePath: "versions/v1/APT-DESIGN-OVERVIEW.md",
              canonicalPath: "/docs/design/v1/APT-DESIGN-OVERVIEW.md",
              publishedAt: "2026-04-05",
            },
            {
              major: 2,
              semanticVersion: "2.0.0",
              status: "candidate",
              sourcePath: "versions/v2/APT-DESIGN-OVERVIEW.md",
              canonicalPath: "/docs/design/v2/APT-DESIGN-OVERVIEW.md",
              publishedAt: "2026-04-05",
            },
          ],
        },
      ],
    };

    writeJson(path.join(designDocsRoot, "APT-DESIGN-DOCS-MANIFEST.json"), manifest);
    writeJson(path.join(designDocsRoot, "APT-AI-REVIEW-BUNDLE.json"), {
      id: "bundle",
      hashAlgorithm: "sha256",
      bundleFiles: [],
      documents: [],
      recommendedHandoffs: [],
    });
    writeJson(path.join(designDocsRoot, "static", "APT-TOKENS-CONTRACT.json"), {
      id: "apt-tokens-contract",
      docId: "tokens-contract",
      slug: "tokens",
      major: 2,
      semanticVersion: "2.0.0",
      status: "candidate",
      publishedAt: "2026-04-05",
      tokens: {},
    });
    writeDoc(
      path.join(designDocsRoot, "versions", "v1", "APT-DESIGN-OVERVIEW.md"),
      `---\ndocId: design-overview\nslug: overview\nmajor: 1\nsemanticVersion: 1.0.0\nstatus: stable\npublishedAt: 2026-04-05\n---\n\n# v1\n`
    );
    writeDoc(
      path.join(designDocsRoot, "versions", "v2", "APT-DESIGN-OVERVIEW.md"),
      `---\ndocId: design-overview\nslug: overview\nmajor: 2\nsemanticVersion: 2.0.0\nstatus: candidate\npublishedAt: 2026-04-05\n---\n\n# v2\n`
    );

    writeDoc(path.join(publicDocsRoot, "v1", "legacy-kept.md"), "legacy");
    writeDoc(path.join(publicDocsRoot, "legacy-alias.md"), "stale-alias");

    publishDesignDocsFromManifest({ designDocsRoot, publicDocsRoot });

    expect(fs.existsSync(path.join(publicDocsRoot, "v1", "legacy-kept.md"))).toBe(true);
    expect(fs.existsSync(path.join(publicDocsRoot, "legacy-alias.md"))).toBe(false);
    expect(fs.readFileSync(path.join(publicDocsRoot, "v1", "APT-DESIGN-OVERVIEW.md"), "utf8")).toContain("# v1");
    expect(fs.readFileSync(path.join(publicDocsRoot, "v2", "APT-DESIGN-OVERVIEW.md"), "utf8")).toContain("# v2");
    expect(fs.readFileSync(path.join(publicDocsRoot, "APT-DESIGN-OVERVIEW.md"), "utf8")).toContain("# v2");
  });

  it("fails when frontmatter metadata does not match manifest metadata", () => {
    const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "apt-design-publish-"));
    const designDocsRoot = path.join(tempRoot, "docs", "design");
    const publicDocsRoot = path.join(tempRoot, "public", "docs", "design");

    writeJson(path.join(designDocsRoot, "APT-DESIGN-DOCS-MANIFEST.json"), {
      id: "apt-design-docs-manifest",
      documents: [
        {
          docId: "design-overview",
          slug: "overview",
          title: "APT Design Overview",
          latestMajor: 1,
          aliasPath: "/docs/design/APT-DESIGN-OVERVIEW.md",
          versions: [
            {
              major: 1,
              semanticVersion: "1.0.0",
              status: "stable",
              sourcePath: "versions/v1/APT-DESIGN-OVERVIEW.md",
              canonicalPath: "/docs/design/v1/APT-DESIGN-OVERVIEW.md",
              publishedAt: "2026-04-05",
            },
          ],
        },
      ],
    });

    writeJson(path.join(designDocsRoot, "APT-AI-REVIEW-BUNDLE.json"), {
      id: "bundle",
      hashAlgorithm: "sha256",
      bundleFiles: [],
      documents: [],
      recommendedHandoffs: [],
    });
    writeJson(path.join(designDocsRoot, "static", "APT-TOKENS-CONTRACT.json"), {
      id: "apt-tokens-contract",
      docId: "tokens-contract",
      slug: "tokens",
      major: 2,
      semanticVersion: "2.0.0",
      status: "candidate",
      publishedAt: "2026-04-05",
      tokens: {},
    });

    writeDoc(
      path.join(designDocsRoot, "versions", "v1", "APT-DESIGN-OVERVIEW.md"),
      `---\ndocId: design-overview\nslug: overview\nmajor: 1\nsemanticVersion: 9.9.9\nstatus: stable\npublishedAt: 2026-04-05\n---\n\n# v1\n`
    );

    expect(() => publishDesignDocsFromManifest({ designDocsRoot, publicDocsRoot })).toThrow(
      /semanticVersion expected 1.0.0/
    );
  });
});
