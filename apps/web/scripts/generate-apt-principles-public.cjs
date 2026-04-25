// Generate public APT principles docs from the sibling canonical apt-principles package.
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const WEB_ROOT = path.resolve(__dirname, "..");
const REPO_ROOT = path.resolve(WEB_ROOT, "../..");
const WORKSPACE_ROOT = path.resolve(REPO_ROOT, "..");
const APT_PRINCIPLES_ROOT = path.join(WORKSPACE_ROOT, "apt-principles");
const PUBLIC_APT_ROOT = path.join(WEB_ROOT, "public", "docs", "apt");
const GENERATED_DATA_DIR = path.join(WEB_ROOT, "data", "generated");
const GENERATED_TS_PATH = path.join(GENERATED_DATA_DIR, "aptPrinciplesPublicManifest.ts");
const PUBLIC_MANIFEST_PATH = path.join(PUBLIC_APT_ROOT, "manifest.json");

const ALLOWED_EXTENSIONS = new Set([".md", ".json"]);
const EXCLUDED_DIRS = new Set(["node_modules", ".git", "scripts"]);
const EXCLUDED_FILES = new Set(["package.json"]);
const ROOT_DOCTRINE_FILES = new Set([
  "README.md",
  "apt-principles.md",
  "thinking.md",
  "design.md",
  "architecture.md",
  "system-standards.md",
  "security.md",
  "execution.md",
  "quality-testing.md",
  "release-change-management.md",
  "operations-support.md",
  "knowledge-system.md",
  "ai-agent-framework.md",
  "apt-principles-framework-audit.md",
]);

const PRINCIPLE_AREA_BY_FILE = {
  "apt-principles.md": "framework",
  "thinking.md": "thinking",
  "design.md": "design",
  "architecture.md": "architecture",
  "system-standards.md": "system-standards",
  "security.md": "security",
  "execution.md": "execution",
  "quality-testing.md": "quality-testing",
  "release-change-management.md": "release-change-management",
  "operations-support.md": "operations-support",
  "knowledge-system.md": "knowledge-system",
  "ai-agent-framework.md": "ai-agent-framework",
};

function toPosix(value) {
  return String(value || "").replace(/\\/g, "/");
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function removeDir(dir) {
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

function walkFiles(root) {
  const files = [];

  function walk(current) {
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      if (entry.isDirectory()) {
        if (EXCLUDED_DIRS.has(entry.name)) continue;
        walk(path.join(current, entry.name));
        continue;
      }

      if (!entry.isFile()) continue;
      if (EXCLUDED_FILES.has(entry.name)) continue;
      const fullPath = path.join(current, entry.name);
      if (!ALLOWED_EXTENSIONS.has(path.extname(fullPath))) continue;
      files.push(fullPath);
    }
  }

  walk(root);
  return files;
}

function parseFrontmatter(markdown) {
  const match = markdown.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
  if (!match) return {};

  const data = {};
  for (const line of match[1].split(/\r?\n/)) {
    const keyMatch = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (keyMatch) {
      data[keyMatch[1]] = keyMatch[2].trim().replace(/^["']|["']$/g, "");
    }
  }
  return data;
}

function inferKind(relativePath) {
  if (relativePath.startsWith("checklists/")) return "checklist";
  if (relativePath.startsWith("examples/")) return "example";
  if (relativePath.startsWith("prompts/")) return "prompt";
  if (relativePath.startsWith("templates/")) return "template";
  if (relativePath.startsWith("references/")) return "reference";
  if (ROOT_DOCTRINE_FILES.has(relativePath)) {
    return relativePath === "apt-principles-framework-audit.md" ? "audit" : "doctrine";
  }
  return "support";
}

function inferPrincipleArea(relativePath, kind) {
  if (PRINCIPLE_AREA_BY_FILE[relativePath]) return PRINCIPLE_AREA_BY_FILE[relativePath];
  const parts = relativePath.split("/");
  if (kind === "checklist" || kind === "prompt") {
    return path.basename(relativePath, ".md").replace(/-(review|readiness|checklist|prompt)$/g, "");
  }
  if (kind === "example" && parts.length > 1) return parts[1];
  if (kind === "reference") return path.basename(relativePath, ".json");
  if (kind === "template") return "template";
  return "general";
}

function readMetadata(fullPath, relativePath) {
  const extension = path.extname(fullPath);
  const raw = fs.readFileSync(fullPath, "utf8");
  const hash = crypto.createHash("sha256").update(raw).digest("hex");

  if (extension === ".json") {
    const parsed = JSON.parse(raw);
    return {
      title: parsed.title || path.basename(relativePath),
      version: parsed.version || parsed.semanticVersion || "v1",
      status: parsed.status || "draft",
      lastUpdated: parsed.last_updated || parsed.updatedAt || parsed.publishedAt || null,
      checksum: hash,
    };
  }

  const frontmatter = parseFrontmatter(raw);
  return {
    title: frontmatter.title || path.basename(relativePath),
    version: frontmatter.version || "v1",
    status: frontmatter.status || "draft",
    lastUpdated: frontmatter.last_updated || null,
    checksum: hash,
  };
}

function writeGeneratedTypeScript(manifest) {
  ensureDir(GENERATED_DATA_DIR);
  const contents = `// Generated by scripts/generate-apt-principles-public.cjs. Do not edit by hand.
export type AptPublicDocKind =
  | "audit"
  | "checklist"
  | "doctrine"
  | "example"
  | "prompt"
  | "reference"
  | "support"
  | "template";

export type AptPublicDocManifestEntry = {
  readonly id: string;
  readonly title: string;
  readonly kind: AptPublicDocKind;
  readonly principleArea: string;
  readonly sourcePath: string;
  readonly publicPath: string;
  readonly version: string;
  readonly status: string;
  readonly lastUpdated: string | null;
  readonly checksum: string;
};

export const aptPrinciplesPublicManifest = ${JSON.stringify(manifest, null, 2)} as const satisfies readonly AptPublicDocManifestEntry[];

export function getAptPublicDocsByKind(kind: AptPublicDocKind): readonly AptPublicDocManifestEntry[] {
  return aptPrinciplesPublicManifest.filter((item) => item.kind === kind);
}

export function getAptPublicDocBySourcePath(sourcePath: string): AptPublicDocManifestEntry | undefined {
  return aptPrinciplesPublicManifest.find((item) => item.sourcePath === sourcePath);
}
`;

  fs.writeFileSync(GENERATED_TS_PATH, contents, "utf8");
}

function getLatestSourceUpdate(manifest) {
  const updates = manifest
    .map((item) => item.lastUpdated)
    .filter((value) => typeof value === "string" && value.length > 0 && !value.includes("{{"))
    .sort();
  return updates[updates.length - 1] || null;
}

function main() {
  if (!fs.existsSync(APT_PRINCIPLES_ROOT)) {
    throw new Error(`Missing canonical apt-principles folder: ${APT_PRINCIPLES_ROOT}`);
  }

  removeDir(PUBLIC_APT_ROOT);
  ensureDir(PUBLIC_APT_ROOT);

  const manifest = walkFiles(APT_PRINCIPLES_ROOT)
    .map((fullPath) => {
      const relativePath = toPosix(path.relative(APT_PRINCIPLES_ROOT, fullPath));
      const kind = inferKind(relativePath);
      const principleArea = inferPrincipleArea(relativePath, kind);
      const metadata = readMetadata(fullPath, relativePath);
      const publicPath = `/docs/apt/${relativePath}`;
      const targetPath = path.join(PUBLIC_APT_ROOT, ...relativePath.split("/"));

      ensureDir(path.dirname(targetPath));
      fs.copyFileSync(fullPath, targetPath);

      return {
        id: relativePath.replace(/\.[^.]+$/, "").replace(/[^a-zA-Z0-9]+/g, "-").replace(/^-|-$/g, ""),
        title: metadata.title,
        kind,
        principleArea,
        sourcePath: `apt-principles/${relativePath}`,
        publicPath,
        version: metadata.version,
        status: metadata.status,
        lastUpdated: metadata.lastUpdated,
        checksum: metadata.checksum,
      };
    })
    .sort((a, b) => a.sourcePath.localeCompare(b.sourcePath));

  fs.writeFileSync(
    PUBLIC_MANIFEST_PATH,
    `${JSON.stringify(
      {
        id: "apt-principles-public-manifest",
        title: "APT Principles Public Manifest",
        generatedAt: getLatestSourceUpdate(manifest),
        sourceRoot: "apt-principles",
        publicRoot: "/docs/apt",
        documents: manifest,
      },
      null,
      2
    )}\n`,
    "utf8"
  );

  writeGeneratedTypeScript(manifest);
  console.log(`Generated ${manifest.length} APT public docs from ${APT_PRINCIPLES_ROOT}`);
  console.log(`Public docs: ${PUBLIC_APT_ROOT}`);
  console.log(`Manifest: ${PUBLIC_MANIFEST_PATH}`);
  console.log(`Route data: ${GENERATED_TS_PATH}`);
}

main();
