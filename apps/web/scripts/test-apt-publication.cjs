const assert = require("assert");
const fs = require("fs");
const os = require("os");
const path = require("path");
const { createPublicationManifest, publishArtifacts } = require("./apt-publication-lib.cjs");

function write(root, relativePath, content) {
  const target = path.join(root, ...relativePath.split("/"));
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, content, "utf8");
}

function doc(title, status = "active", extra = "") {
  return `---\ntitle: ${title}\nkind: guide\ndomain: test\nstatus: ${status}\nlast_updated: 2026-08-16\n${extra}---\n\n# ${title}\n`;
}

const temporaryRoot = fs.mkdtempSync(path.join(os.tmpdir(), "apt-publication-"));
const sourceRoot = path.join(temporaryRoot, "source");
const publicRoot = path.join(temporaryRoot, "public");

try {
  write(sourceRoot, "references/publication-manifest.json", JSON.stringify({
    version: 1,
    default_visibility: "internal",
    allowed_statuses: ["active", "stable"],
    collections: [{
      id: "doctrine",
      category: "principles",
      audience: ["public"],
      featured: true,
      paths: ["README.md"],
      prefixes: ["principles/"],
    }],
  }));
  write(sourceRoot, "README.md", doc("Start Here"));
  write(sourceRoot, "principles/active.md", doc("Active"));
  write(sourceRoot, "principles/stable.md", doc("Stable", "stable"));
  write(sourceRoot, "principles/draft.md", doc("Draft", "draft"));
  write(sourceRoot, "principles/internal.md", doc("Internal", "active", "visibility: internal\n"));
  write(sourceRoot, "principles/withheld.md", doc("Withheld", "active", "publication_status: withheld\n"));
  write(sourceRoot, "docs/refactor/internal.md", doc("Internal Plan"));
  write(sourceRoot, ".wrangler/cache.md", doc("Cache"));

  const selected = createPublicationManifest(sourceRoot);
  assert.deepStrictEqual(selected.map((entry) => entry.relativePath), ["principles/active.md", "principles/stable.md", "README.md"]);
  assert(selected.every((entry) => entry.collection === "doctrine"));

  const published = publishArtifacts(sourceRoot, publicRoot);
  assert.strictEqual(published.length, 3);
  assert(fs.existsSync(path.join(publicRoot, "principles", "active.md")));
  assert(!fs.existsSync(path.join(publicRoot, "principles", "draft.md")));
  assert(!fs.existsSync(path.join(publicRoot, "docs", "refactor", "internal.md")));
  assert(!fs.existsSync(path.join(publicRoot, ".wrangler", "cache.md")));

  write(sourceRoot, "principles/invalid.md", "# Missing metadata\n");
  assert.throws(() => createPublicationManifest(sourceRoot), /missing required metadata/);
  console.log("APT publication contract tests passed.");
} finally {
  fs.rmSync(temporaryRoot, { recursive: true, force: true });
}
