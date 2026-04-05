// Copy public Markdown content and approved public docs to public for frontend access
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const CONTENT_TYPES = ['blog', 'guides', 'podcasts', 'design-reviews', 'labs', 'demos', 'systems'];
const CONTENT_ROOT = path.join(__dirname, '../content');
const PUBLIC_CONTENT_ROOT = path.join(__dirname, '../public/content');
const DESIGN_DOCS_ROOT = path.join(__dirname, '../docs/design');
const PUBLIC_DOCS_ROOT = path.join(__dirname, '../public/docs/design');
const REVIEW_BUNDLE_MANIFEST = 'APT-AI-REVIEW-BUNDLE.json';
const DESIGN_DOCS_MANIFEST = 'APT-DESIGN-DOCS-MANIFEST.json';
const STATIC_PUBLIC_DESIGN_DOCS = [
  DESIGN_DOCS_MANIFEST,
  REVIEW_BUNDLE_MANIFEST,
  'APT-AI-REVIEW-BUNDLE.md',
  'APT-AI-INSTRUCTIONS-REFERENCE.md',
  'APT-DESIGN-SYSTEM-LINT-CHECKLIST.md',
  'APT-DESIGN-SYSTEM-LINT-CHECKLIST.json',
  'APT-REVIEW-STANDARD.md',
  'APT-DESIGN-VERSIONING.md',
  'APT-FIGMA-TOKENS.json',
  'tokens.json',
];
const STATIC_VERSIONED_PUBLIC_DESIGN_DOCS = [
  'APT-AI-INSTRUCTIONS-REFERENCE.md',
  'tokens.json',
  'APT-DESIGN-SYSTEM-LINT-CHECKLIST.md',
  'APT-DESIGN-SYSTEM-LINT-CHECKLIST.json',
];

function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function toPosixPath(value) {
  return String(value || '').replace(/\\/g, '/');
}

function pathFromAlias(aliasPath) {
  if (!aliasPath) return '';
  const parts = toPosixPath(aliasPath).split('/').filter(Boolean);
  return parts[parts.length - 1] || '';
}

function ensureDesignPath(pathname, label) {
  const normalized = toPosixPath(pathname);
  if (!normalized.startsWith('/docs/design/')) {
    throw new Error(`${label} must start with /docs/design/, received: ${pathname}`);
  }
  return normalized;
}

function toPublicDocsFilePath(publicDocsRoot, docsPathname) {
  const normalized = ensureDesignPath(docsPathname, 'Design docs path');
  const relative = normalized.replace('/docs/design/', '');
  return path.join(publicDocsRoot, ...relative.split('/'));
}

function readDesignDocsManifest(designDocsRoot = DESIGN_DOCS_ROOT) {
  const manifestPath = path.join(designDocsRoot, DESIGN_DOCS_MANIFEST);
  if (!fs.existsSync(manifestPath)) {
    throw new Error(`Missing required design docs manifest: ${manifestPath}`);
  }

  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  const documents = Array.isArray(manifest.documents) ? manifest.documents : [];
  for (const doc of documents) {
    if (!isNonEmptyString(doc?.docId) || !isNonEmptyString(doc?.slug) || !isNonEmptyString(doc?.title)) {
      throw new Error(`Manifest document is missing required fields (docId/slug/title): ${JSON.stringify(doc)}`);
    }
    if (!Array.isArray(doc.versions) || doc.versions.length === 0) {
      throw new Error(`Manifest document ${doc.docId} must define at least one version.`);
    }
  }

  return manifest;
}

function getVersionEntry(doc, major) {
  return (doc.versions || []).find((entry) => Number(entry.major) === Number(major)) || null;
}

function getLatestVersionEntry(doc) {
  const latestMajor = Number(doc.latestMajor);
  if (Number.isInteger(latestMajor)) {
    const explicit = getVersionEntry(doc, latestMajor);
    if (explicit) return explicit;
  }

  const sorted = [...(doc.versions || [])]
    .filter((entry) => Number.isInteger(Number(entry.major)))
    .sort((a, b) => Number(b.major) - Number(a.major));
  return sorted[0] || null;
}

function validateDocVersionFrontmatter({ designDocsRoot, doc, version }) {
  const relativeSource = toPosixPath(version.sourcePath || '');
  if (!isNonEmptyString(relativeSource)) {
    throw new Error(`Manifest version entry missing sourcePath for ${doc.docId} v${version.major}`);
  }

  const sourcePath = path.join(designDocsRoot, ...relativeSource.split('/'));
  if (!fs.existsSync(sourcePath)) {
    throw new Error(`Missing versioned source doc: ${sourcePath}`);
  }

  const raw = fs.readFileSync(sourcePath, 'utf8');
  const parsed = matter(raw);
  const data = parsed.data || {};
  const normalizedPublishedAt =
    data.publishedAt instanceof Date ? data.publishedAt.toISOString().slice(0, 10) : String(data.publishedAt || '');

  if (data.docId !== doc.docId) {
    throw new Error(`Frontmatter mismatch in ${sourcePath}: docId expected ${doc.docId}, found ${String(data.docId)}`);
  }
  if (data.slug !== doc.slug) {
    throw new Error(`Frontmatter mismatch in ${sourcePath}: slug expected ${doc.slug}, found ${String(data.slug)}`);
  }
  if (Number(data.major) !== Number(version.major)) {
    throw new Error(`Frontmatter mismatch in ${sourcePath}: major expected ${version.major}, found ${String(data.major)}`);
  }
  if (String(data.semanticVersion || '') !== String(version.semanticVersion || '')) {
    throw new Error(
      `Frontmatter mismatch in ${sourcePath}: semanticVersion expected ${version.semanticVersion}, found ${String(data.semanticVersion)}`
    );
  }
  if (String(data.status || '') !== String(version.status || '')) {
    throw new Error(`Frontmatter mismatch in ${sourcePath}: status expected ${version.status}, found ${String(data.status)}`);
  }
  if (normalizedPublishedAt !== String(version.publishedAt || '')) {
    throw new Error(
      `Frontmatter mismatch in ${sourcePath}: publishedAt expected ${version.publishedAt}, found ${String(data.publishedAt)}`
    );
  }

  return sourcePath;
}

function collectReviewBundleManifestValidationErrors(manifest) {
  const errors = [];

  const bundleFiles = Array.isArray(manifest.bundleFiles) ? manifest.bundleFiles : [];
  for (const file of bundleFiles) {
    const fileLabel = isNonEmptyString(file?.id) ? file.id : '(missing-id)';
    if (!file || typeof file !== 'object') {
      errors.push(`bundleFiles[${fileLabel}] must be an object`);
      continue;
    }

    const ui = file.ui;
    if (!ui || typeof ui !== 'object') {
      errors.push(`bundleFiles[${fileLabel}].ui is required`);
      continue;
    }

    if (!Number.isInteger(ui.cardOrder)) errors.push(`bundleFiles[${fileLabel}].ui.cardOrder must be an integer`);
    if (!isNonEmptyString(ui.tagLabel)) errors.push(`bundleFiles[${fileLabel}].ui.tagLabel is required`);
    if (!isNonEmptyString(ui.tagVariant)) errors.push(`bundleFiles[${fileLabel}].ui.tagVariant is required`);
    if (!isNonEmptyString(ui.icon)) errors.push(`bundleFiles[${fileLabel}].ui.icon is required`);

    const hasCtaOrder = Object.prototype.hasOwnProperty.call(ui, 'ctaOrder');
    const hasCtaLabel = Object.prototype.hasOwnProperty.call(ui, 'ctaLabel');
    const hasCtaVariant = Object.prototype.hasOwnProperty.call(ui, 'ctaVariant');
    if (hasCtaOrder || hasCtaLabel || hasCtaVariant) {
      if (!Number.isInteger(ui.ctaOrder)) {
        errors.push(`bundleFiles[${fileLabel}].ui.ctaOrder must be an integer when CTA metadata is present`);
      }
      if (!isNonEmptyString(ui.ctaLabel)) {
        errors.push(`bundleFiles[${fileLabel}].ui.ctaLabel is required when CTA metadata is present`);
      }
      if (!isNonEmptyString(ui.ctaVariant)) {
        errors.push(`bundleFiles[${fileLabel}].ui.ctaVariant is required when CTA metadata is present`);
      }
    }
  }

  const recommendedHandoffs = Array.isArray(manifest.recommendedHandoffs) ? manifest.recommendedHandoffs : [];
  for (const handoff of recommendedHandoffs) {
    const handoffLabel = isNonEmptyString(handoff?.name) ? handoff.name : '(missing-name)';
    if (!handoff || typeof handoff !== 'object') {
      errors.push(`recommendedHandoffs[${handoffLabel}] must be an object`);
      continue;
    }

    const ui = handoff.ui;
    if (!ui || typeof ui !== 'object') {
      errors.push(`recommendedHandoffs[${handoffLabel}].ui is required`);
      continue;
    }

    if (!Number.isInteger(ui.order)) errors.push(`recommendedHandoffs[${handoffLabel}].ui.order must be an integer`);
    if (!isNonEmptyString(ui.title)) errors.push(`recommendedHandoffs[${handoffLabel}].ui.title is required`);
    if (handoff.requiresTargetArtifact && !isNonEmptyString(ui.targetArtifactLabel)) {
      errors.push(`recommendedHandoffs[${handoffLabel}].ui.targetArtifactLabel is required when requiresTargetArtifact=true`);
    }
  }

  return errors;
}

function validateReviewBundleManifestOrThrow(manifest) {
  const errors = collectReviewBundleManifestValidationErrors(manifest);
  if (errors.length === 0) return;
  const details = errors.map((error, index) => `${index + 1}. ${error}`).join('\n');
  throw new Error(`Invalid ${REVIEW_BUNDLE_MANIFEST}: required UI metadata is missing or malformed.\n${details}`);
}

function buildReviewBundleManifestForPublic(designDocsRoot = DESIGN_DOCS_ROOT) {
  const manifestPath = path.join(designDocsRoot, REVIEW_BUNDLE_MANIFEST);
  if (!fs.existsSync(manifestPath)) return null;

  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  validateReviewBundleManifestOrThrow(manifest);
  const { bundleHash: _bundleHash, ...manifestWithoutHash } = manifest;
  const hash = crypto.createHash(manifest.hashAlgorithm || 'sha256');

  hash.update(JSON.stringify(manifestWithoutHash));

  for (const document of manifest.documents || []) {
    const docFilename = path.posix.basename(document.path || '');
    const docPath = path.join(designDocsRoot, docFilename);
    if (!fs.existsSync(docPath)) continue;
    hash.update(docFilename);
    hash.update(fs.readFileSync(docPath));
  }

  return {
    ...manifestWithoutHash,
    bundleHash: hash.digest('hex'),
  };
}

function copyContentToPublic(contentRoot = CONTENT_ROOT, publicContentRoot = PUBLIC_CONTENT_ROOT) {
  fs.rmSync(path.join(publicContentRoot, 'case-studies'), { recursive: true, force: true });

  for (const type of CONTENT_TYPES) {
    const srcDir = path.join(contentRoot, type);
    const destDir = path.join(publicContentRoot, type);
    fs.mkdirSync(destDir, { recursive: true });

    if (fs.existsSync(destDir)) {
      for (const entry of fs.readdirSync(destDir, { withFileTypes: true })) {
        if (entry.isFile() && entry.name.endsWith('.md')) {
          fs.rmSync(path.join(destDir, entry.name), { force: true });
        }
      }
    }

    if (!fs.existsSync(srcDir)) continue;

    const files = fs.readdirSync(srcDir).filter((file) => file.endsWith('.md'));
    for (const file of files) {
      fs.copyFileSync(path.join(srcDir, file), path.join(destDir, file));
      console.log(`Copied ${type}/${file} to public/content/${type}`);
    }
  }
}

function publishDesignDocsFromManifest({ designDocsRoot = DESIGN_DOCS_ROOT, publicDocsRoot = PUBLIC_DOCS_ROOT } = {}) {
  const manifest = readDesignDocsManifest(designDocsRoot);
  const reviewBundleManifestForPublic = buildReviewBundleManifestForPublic(designDocsRoot);

  fs.mkdirSync(publicDocsRoot, { recursive: true });
  const expectedTopLevelFiles = new Set(STATIC_PUBLIC_DESIGN_DOCS);

  for (const doc of manifest.documents || []) {
    const latest = getLatestVersionEntry(doc);
    if (!latest) {
      throw new Error(`Unable to resolve latest version for ${doc.docId}`);
    }

    const aliasPathname = doc.aliasPath || `/docs/design/${pathFromAlias(latest.canonicalPath || '')}`;
    const aliasDestPath = toPublicDocsFilePath(publicDocsRoot, aliasPathname);
    const aliasFilename = path.basename(aliasDestPath);
    expectedTopLevelFiles.add(aliasFilename);

    for (const version of doc.versions || []) {
      const canonicalPathname = ensureDesignPath(version.canonicalPath, `canonicalPath for ${doc.docId} v${version.major}`);
      const sourcePath = validateDocVersionFrontmatter({ designDocsRoot, doc, version });
      const canonicalDestPath = toPublicDocsFilePath(publicDocsRoot, canonicalPathname);

      fs.mkdirSync(path.dirname(canonicalDestPath), { recursive: true });
      fs.copyFileSync(sourcePath, canonicalDestPath);
      console.log(`Copied ${sourcePath} to ${canonicalPathname}`);
    }

    const latestSourcePath = validateDocVersionFrontmatter({ designDocsRoot, doc, version: latest });
    fs.mkdirSync(path.dirname(aliasDestPath), { recursive: true });
    fs.copyFileSync(latestSourcePath, aliasDestPath);
    console.log(`Published alias ${aliasPathname} from ${toPosixPath(latest.sourcePath)}`);
  }

  // Remove stale top-level static aliases before rewriting static files.
  for (const entry of fs.readdirSync(publicDocsRoot, { withFileTypes: true })) {
    if (!entry.isFile()) continue;
    const isTrackableDoc = entry.name.endsWith('.md') || entry.name.endsWith('.json');
    const shouldRemove = isTrackableDoc && !expectedTopLevelFiles.has(entry.name);
    if (shouldRemove) fs.rmSync(path.join(publicDocsRoot, entry.name), { force: true });
  }

  for (const file of STATIC_PUBLIC_DESIGN_DOCS) {
    const srcPath = path.join(designDocsRoot, file);
    if (!fs.existsSync(srcPath)) continue;

    const destPath = path.join(publicDocsRoot, file);
    fs.mkdirSync(path.dirname(destPath), { recursive: true });

    if (file === REVIEW_BUNDLE_MANIFEST && reviewBundleManifestForPublic) {
      fs.writeFileSync(destPath, `${JSON.stringify(reviewBundleManifestForPublic, null, 2)}\n`, 'utf8');
      console.log(`Generated docs/design/${file} for public/docs/design`);
      continue;
    }

    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied docs/design/${file} to public/docs/design`);
  }

  const supportedMajors = Array.isArray(manifest.supportedMajors) ? manifest.supportedMajors : [];
  for (const major of supportedMajors) {
    const majorNumber = Number(major);
    if (!Number.isInteger(majorNumber)) continue;

    for (const file of STATIC_VERSIONED_PUBLIC_DESIGN_DOCS) {
      const srcPath = path.join(designDocsRoot, file);
      if (!fs.existsSync(srcPath)) continue;

      const destPath = path.join(publicDocsRoot, `v${majorNumber}`, file);
      fs.mkdirSync(path.dirname(destPath), { recursive: true });
      fs.copyFileSync(srcPath, destPath);
      console.log(`Copied docs/design/${file} to public/docs/design/v${majorNumber}`);
    }
  }

  return manifest;
}

function copyVideosToPublic(contentRoot = CONTENT_ROOT, publicContentRoot = PUBLIC_CONTENT_ROOT) {
  const VIDEO_EXTENSIONS = ['.mp4', '.webm', '.mov', '.ogg', '.m4v'];
  const SRC_VIDEOS = path.join(contentRoot, 'videos');
  const DEST_VIDEOS = path.join(publicContentRoot, 'videos');
  const MAX_BYTES = 25 * 1024 * 1024;

  if (!fs.existsSync(SRC_VIDEOS)) return;

  fs.mkdirSync(DEST_VIDEOS, { recursive: true });
  const skipped = [];
  for (const entry of fs.readdirSync(SRC_VIDEOS)) {
    const ext = path.extname(entry).toLowerCase();
    const srcPath = path.join(SRC_VIDEOS, entry);
    if (!VIDEO_EXTENSIONS.includes(ext)) continue;

    const stat = fs.statSync(srcPath);
    if (stat.size > MAX_BYTES) {
      skipped.push({ name: entry, size: stat.size });
      console.warn(`Skipping videos/${entry}: ${Math.round((stat.size / (1024 * 1024)) * 100) / 100} MiB (exceeds ${MAX_BYTES / (1024 * 1024)} MiB)`);
      continue;
    }

    fs.copyFileSync(srcPath, path.join(DEST_VIDEOS, entry));
    console.log(`Copied videos/${entry} to public/content/videos`);
  }

  if (skipped.length) {
    console.log(`Skipped ${skipped.length} large video(s). Consider external hosting (R2, S3, or CDN) for files >25 MiB.`);
  }
}

function main() {
  copyContentToPublic();
  publishDesignDocsFromManifest();
  copyVideosToPublic();
}

if (require.main === module) {
  main();
}

module.exports = {
  buildReviewBundleManifestForPublic,
  copyContentToPublic,
  copyVideosToPublic,
  getLatestVersionEntry,
  publishDesignDocsFromManifest,
  readDesignDocsManifest,
  validateDocVersionFrontmatter,
};
