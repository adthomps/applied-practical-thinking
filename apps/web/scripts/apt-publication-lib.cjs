const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const PUBLICATION_CONTRACT_PATH = path.join("references", "publication-manifest.json");
const ALLOWED_EXTENSIONS = new Set([".md"]);
const SKIPPED_DIRECTORIES = new Set(["archive", "graphify-out", "node_modules", "platforms", "scripts"]);

function toPosix(value) {
  return String(value || "").replace(/\\/g, "/");
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function parseFrontmatter(markdown) {
  const match = markdown.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
  if (!match) return {};
  return Object.fromEntries(
    match[1].split(/\r?\n/).flatMap((line) => {
      const field = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
      return field ? [[field[1], field[2].trim().replace(/^["']|["']$/g, "")]] : [];
    })
  );
}

function readMetadata(fullPath, relativePath) {
  const raw = fs.readFileSync(fullPath, "utf8");
  const value = parseFrontmatter(raw);
  if (!value.kind || !value.domain || !value.status || !value.last_updated) {
    throw new Error(`Public artifact is missing required metadata: ${relativePath}`);
  }
  return {
    title: value.title || path.basename(relativePath),
    kind: value.kind,
    domain: value.domain,
    version: value.version || "1.0.0",
    status: value.status,
    visibility: value.visibility || "public",
    publicationStatus: value.publication_status || "published",
    lastUpdated: value.last_updated,
    checksum: crypto.createHash("sha256").update(raw).digest("hex"),
  };
}

function validateContract(contract) {
  if (!contract || contract.version !== 1) throw new Error("Publication manifest must use version 1.");
  if (contract.default_visibility !== "internal") {
    throw new Error("Publication manifest must default to internal visibility.");
  }
  if (!Array.isArray(contract.allowed_statuses) || contract.allowed_statuses.length === 0) {
    throw new Error("Publication manifest must declare allowed_statuses.");
  }
  if (!Array.isArray(contract.collections) || contract.collections.length === 0) {
    throw new Error("Publication manifest must declare at least one collection.");
  }
  const ids = new Set();
  for (const collection of contract.collections) {
    if (!collection.id || ids.has(collection.id)) {
      throw new Error(`Publication collection id is missing or duplicated: ${collection.id || "(missing)"}`);
    }
    ids.add(collection.id);
    if (!Array.isArray(collection.audience) || collection.audience.length === 0) {
      throw new Error(`Publication collection ${collection.id} must declare an audience.`);
    }
    if (!(collection.paths?.length || collection.prefixes?.length)) {
      throw new Error(`Publication collection ${collection.id} must declare paths or prefixes.`);
    }
  }
}

function loadContract(sourceRoot) {
  const contractPath = path.join(sourceRoot, PUBLICATION_CONTRACT_PATH);
  if (!fs.existsSync(contractPath)) throw new Error(`Canonical publication manifest is missing: ${contractPath}`);
  const contract = JSON.parse(fs.readFileSync(contractPath, "utf8"));
  validateContract(contract);
  return contract;
}

function findCollection(relativePath, contract) {
  return contract.collections.find((collection) =>
    (collection.paths || []).includes(relativePath) ||
    (collection.prefixes || []).some((prefix) => relativePath.startsWith(prefix))
  );
}

function walkMarkdownFiles(root) {
  const files = [];
  function walk(current) {
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const fullPath = path.join(current, entry.name);
      if (entry.isDirectory()) {
        if (entry.name.startsWith(".") || SKIPPED_DIRECTORIES.has(entry.name)) continue;
        walk(fullPath);
      } else if (entry.isFile() && ALLOWED_EXTENSIONS.has(path.extname(entry.name))) {
        files.push(fullPath);
      }
    }
  }
  walk(root);
  return files;
}

function createPublicationManifest(sourceRoot) {
  const contract = loadContract(sourceRoot);
  const allowedStatuses = new Set(contract.allowed_statuses);
  return walkMarkdownFiles(sourceRoot)
    .flatMap((fullPath) => {
      const relativePath = toPosix(path.relative(sourceRoot, fullPath));
      const collection = findCollection(relativePath, contract);
      if (!collection) return [];
      const metadata = readMetadata(fullPath, relativePath);
      if (!allowedStatuses.has(metadata.status)) return [];
      if (metadata.visibility === "internal" || metadata.publicationStatus === "withheld") return [];
      return [{
        id: relativePath.replace(/\.[^.]+$/, "").replace(/[^a-zA-Z0-9]+/g, "-").replace(/^-|-$/g, ""),
        title: metadata.title,
        kind: metadata.kind,
        domain: metadata.domain,
        collection: collection.id,
        category: collection.category,
        audience: collection.audience,
        featured: Boolean(collection.featured),
        sourcePath: `apt-principles-agents/${relativePath}`,
        publicPath: `/docs/apt/${relativePath}`,
        version: metadata.version,
        status: metadata.status,
        lastUpdated: metadata.lastUpdated,
        checksum: metadata.checksum,
        sourceFile: fullPath,
        relativePath,
      }];
    })
    .sort((a, b) => a.sourcePath.localeCompare(b.sourcePath));
}

function publishArtifacts(sourceRoot, publicRoot) {
  const manifest = createPublicationManifest(sourceRoot);
  for (const entry of manifest) {
    const targetPath = path.join(publicRoot, ...entry.relativePath.split("/"));
    ensureDir(path.dirname(targetPath));
    fs.copyFileSync(entry.sourceFile, targetPath);
  }
  return manifest.map(({ sourceFile, relativePath, ...entry }) => entry);
}

module.exports = { PUBLICATION_CONTRACT_PATH, createPublicationManifest, publishArtifacts, validateContract };
