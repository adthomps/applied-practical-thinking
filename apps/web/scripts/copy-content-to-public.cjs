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
const REPO_ROOT = path.resolve(__dirname, '../../..');
const VALIDATION_REPORTS_ROOT = path.join(REPO_ROOT, 'reports', 'validation');
const PUBLIC_VALIDATION_ROOT = path.join(PUBLIC_DOCS_ROOT, 'validation');
const REVIEW_BUNDLE_MANIFEST = 'APT-AI-REVIEW-BUNDLE.json';
const DESIGN_DOCS_MANIFEST = 'APT-DESIGN-DOCS-MANIFEST.json';
const PUBLIC_VALIDATION_FILES = ['LATEST.json', 'LATEST.md'];
const STATIC_PUBLIC_DESIGN_DOCS = [
  REVIEW_BUNDLE_MANIFEST,
  'APT-AI-REVIEW-BUNDLE.md',
  'APT-AI-INSTRUCTIONS-REFERENCE.md',
  'APT-DESIGN-SYSTEM-LINT-CHECKLIST.md',
  'APT-DESIGN-SYSTEM-LINT-CHECKLIST.json',
  'APT-REVIEW-STANDARD.md',
  'APT-SUPPORT-DESIGN.md',
  'APT-KNOWLEDGE-ENGINE.md',
  'APT-DESIGN-VERSIONING.md',
  'APT-TOKENS.json',
  'APT-TOKENS-CONTRACT.json',
  'tokens.json',
];
const STATIC_VERSIONED_PUBLIC_DESIGN_DOCS = [
  'APT-AI-INSTRUCTIONS-REFERENCE.md',
  'tokens.json',
  'APT-DESIGN-SYSTEM-LINT-CHECKLIST.md',
  'APT-DESIGN-SYSTEM-LINT-CHECKLIST.json',
];
const AUDITED_DOCTRINE_DOC_IDS = new Set([
  'principles-framework',
  'design-thinking',
  'design-system',
  'design-architecture',
  'design-systems-reference',
  'content-strategy',
]);
const REVIEW_BUNDLE_MARKDOWN_METADATA = {
  requiredKeys: ['docId', 'slug', 'major', 'semanticVersion', 'status', 'publishedAt'],
};

function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function hasRequiredMetadataValue(value) {
  if (value instanceof Date) return true;
  if (Number.isInteger(value)) return true;
  return isNonEmptyString(value);
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

function resolveStaticDesignDocPath(designDocsRoot, filename) {
  const staticPath = path.join(designDocsRoot, 'static', filename);
  if (fs.existsSync(staticPath)) return staticPath;
  const legacyRootPath = path.join(designDocsRoot, filename);
  if (fs.existsSync(legacyRootPath)) return legacyRootPath;
  return null;
}

function readCanonicalTokensContract(designDocsRoot) {
  const contractPath = resolveStaticDesignDocPath(designDocsRoot, 'APT-TOKENS-CONTRACT.json');
  if (!contractPath || !fs.existsSync(contractPath)) {
    throw new Error('Missing canonical tokens contract: apps/web/docs/design/static/APT-TOKENS-CONTRACT.json');
  }
  return fs.readFileSync(contractPath, 'utf8');
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

function getManifestAliasCandidates({ designDocsRoot = DESIGN_DOCS_ROOT, manifest = null } = {}) {
  const resolvedManifest = manifest || readDesignDocsManifest(designDocsRoot);
  const aliases = [];

  for (const doc of resolvedManifest.documents || []) {
    const latest = getLatestVersionEntry(doc);
    if (!latest) {
      throw new Error(`Unable to resolve latest version for ${doc.docId}`);
    }

    const aliasPathname = doc.aliasPath || `/docs/design/${pathFromAlias(latest.canonicalPath || '')}`;
    const aliasFilename = pathFromAlias(aliasPathname);
    const aliasPath = path.join(designDocsRoot, aliasFilename);

    aliases.push({
      docId: doc.docId,
      aliasPathname,
      aliasFilename,
      aliasPath,
    });
  }

  return aliases.sort((a, b) => a.aliasFilename.localeCompare(b.aliasFilename));
}

function assertDesignDocAliasesInSync({ designDocsRoot = DESIGN_DOCS_ROOT } = {}) {
  const manifest = readDesignDocsManifest(designDocsRoot);
  const aliases = getManifestAliasCandidates({ designDocsRoot, manifest });
  const failures = [];

  for (const alias of aliases) {
    if (fs.existsSync(alias.aliasPath)) {
      failures.push(
        `${alias.docId}: source alias file present (${alias.aliasFilename}). Remove source aliases; aliases are publish-generated only.`
      );
    }
  }

  if (failures.length > 0) {
    throw new Error(`Design docs source alias policy check failed:\n${failures.map((failure) => `- ${failure}`).join('\n')}`);
  }
}

function syncDesignDocAliasesFromManifest({ designDocsRoot = DESIGN_DOCS_ROOT } = {}) {
  assertDesignDocAliasesInSync({ designDocsRoot });
  console.log('No source aliases to sync. Aliases are generated during publish to public/docs/design.');
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
  const sourceExtension = path.extname(sourcePath).toLowerCase();
  let data = {};
  if (sourceExtension === '.json') {
    try {
      data = JSON.parse(raw);
    } catch (error) {
      throw new Error(`Invalid JSON metadata in ${sourcePath}: ${String(error && error.message ? error.message : error)}`);
    }
  } else {
    const parsed = matter(raw);
    data = parsed.data || {};
  }
  const normalizedPublishedAt =
    data.publishedAt instanceof Date ? data.publishedAt.toISOString().slice(0, 10) : String(data.publishedAt || '');
  const resolvedDocId =
    sourceExtension === '.json' ? String(data.docId || data.id || '') : String(data.docId || '');
  const resolvedSlug =
    sourceExtension === '.json'
      ? (data.slug === undefined || data.slug === null || String(data.slug).trim() === '' ? String(doc.slug || '') : String(data.slug))
      : String(data.slug || '');

  if (resolvedDocId !== String(doc.docId || '')) {
    throw new Error(`Frontmatter mismatch in ${sourcePath}: docId expected ${doc.docId}, found ${resolvedDocId || 'undefined'}`);
  }
  if (resolvedSlug !== String(doc.slug || '')) {
    throw new Error(`Frontmatter mismatch in ${sourcePath}: slug expected ${doc.slug}, found ${resolvedSlug || 'undefined'}`);
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

function assertAuditedDoctrineMetadataContract({ designDocsRoot = DESIGN_DOCS_ROOT } = {}) {
  const manifest = readDesignDocsManifest(designDocsRoot);
  const manifestDocIds = new Set((manifest.documents || []).map((doc) => String(doc.docId || '').trim()));
  const missingAuditedDocIds = [...AUDITED_DOCTRINE_DOC_IDS].filter((docId) => !manifestDocIds.has(docId));
  const audited = (manifest.documents || []).filter((doc) => AUDITED_DOCTRINE_DOC_IDS.has(doc.docId));
  const failures = [];

  for (const missingDocId of missingAuditedDocIds) {
    failures.push(`APT-DESIGN-DOCS-MANIFEST.json: missing required audited docId "${missingDocId}"`);
  }

  for (const doc of audited) {
    const latest = getLatestVersionEntry(doc);
    if (!latest) {
      failures.push(`${doc.docId}: missing latest version entry`);
      continue;
    }

    try {
      validateDocVersionFrontmatter({ designDocsRoot, doc, version: latest });
    } catch (error) {
      failures.push(`${doc.docId}: ${String(error && error.message ? error.message : error)}`);
    }
  }

  const reviewBundlePath = resolveStaticDesignDocPath(designDocsRoot, 'APT-AI-REVIEW-BUNDLE.md');
  if (!reviewBundlePath || !fs.existsSync(reviewBundlePath)) {
    failures.push('APT-AI-REVIEW-BUNDLE.md: missing file');
  } else {
    const parsed = matter(fs.readFileSync(reviewBundlePath, 'utf8'));
    const data = parsed.data || {};
    for (const key of REVIEW_BUNDLE_MARKDOWN_METADATA.requiredKeys) {
      if (!hasRequiredMetadataValue(data[key])) {
        failures.push(`APT-AI-REVIEW-BUNDLE.md: missing required metadata key "${key}"`);
      }
    }
  }

  const reviewBundleManifestPath = resolveStaticDesignDocPath(designDocsRoot, REVIEW_BUNDLE_MANIFEST);
  if (!reviewBundleManifestPath || !fs.existsSync(reviewBundleManifestPath)) {
    failures.push(`${REVIEW_BUNDLE_MANIFEST}: missing file`);
  } else {
    try {
      const reviewBundleManifest = JSON.parse(fs.readFileSync(reviewBundleManifestPath, 'utf8'));
      validateReviewBundleManifestOrThrow(reviewBundleManifest);
    } catch (error) {
      failures.push(`${REVIEW_BUNDLE_MANIFEST}: ${String(error && error.message ? error.message : error)}`);
    }
  }

  const designSectionsSourcePath = path.resolve(designDocsRoot, '../../data/designSections.ts');
  if (!fs.existsSync(designSectionsSourcePath)) {
    failures.push('apps/web/data/designSections.ts: missing file');
  } else {
    const designSectionsSource = fs.readFileSync(designSectionsSourcePath, 'utf8');
    if (!designSectionsSource.includes('path: "/design/principles"')) {
      failures.push('apps/web/data/designSections.ts: missing catalog entry for /design/principles');
    }
    if (!/mostUsedDesignSectionPaths[\s\S]*"\/design\/principles"/m.test(designSectionsSource)) {
      failures.push('apps/web/data/designSections.ts: missing /design/principles in mostUsedDesignSectionPaths');
    }
    if (!/DESIGN_NAV_PATHS[\s\S]*"\/design\/principles"/m.test(designSectionsSource)) {
      failures.push('apps/web/data/designSections.ts: missing /design/principles in DESIGN_NAV_PATHS');
    }
  }

  if (failures.length > 0) {
    throw new Error(`Audited doctrine metadata contract failed:\n${failures.map((failure) => `- ${failure}`).join('\n')}`);
  }
}

function collectReviewBundleManifestValidationErrors(manifest) {
  const errors = [];
  const documentIds = new Set(
    (Array.isArray(manifest.documents) ? manifest.documents : [])
      .map((document) => String(document?.id || '').trim())
      .filter((id) => id.length > 0)
  );

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
    if (!Array.isArray(handoff.documents) || handoff.documents.length === 0) {
      errors.push(`recommendedHandoffs[${handoffLabel}].documents must be a non-empty array`);
      continue;
    }
    for (const docId of handoff.documents) {
      if (!documentIds.has(String(docId))) {
        errors.push(`recommendedHandoffs[${handoffLabel}] references unknown document id "${docId}"`);
      }
    }
  }

  const starterPacks = Array.isArray(manifest.starterPacks) ? manifest.starterPacks : [];
  for (const starterPack of starterPacks) {
    const packLabel = isNonEmptyString(starterPack?.id) ? starterPack.id : '(missing-id)';
    if (!starterPack || typeof starterPack !== 'object') {
      errors.push(`starterPacks[${packLabel}] must be an object`);
      continue;
    }

    if (!isNonEmptyString(starterPack.title)) errors.push(`starterPacks[${packLabel}].title is required`);
    if (!Number.isInteger(starterPack.order)) errors.push(`starterPacks[${packLabel}].order must be an integer`);
    if (!Array.isArray(starterPack.documents) || starterPack.documents.length === 0) {
      errors.push(`starterPacks[${packLabel}].documents must be a non-empty array`);
      continue;
    }
    if (starterPack.requiresTargetArtifact && !isNonEmptyString(starterPack.targetArtifactLabel)) {
      errors.push(`starterPacks[${packLabel}].targetArtifactLabel is required when requiresTargetArtifact=true`);
    }
    for (const docId of starterPack.documents) {
      if (!documentIds.has(String(docId))) {
        errors.push(`starterPacks[${packLabel}] references unknown document id "${docId}"`);
      }
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
  const manifestPath = resolveStaticDesignDocPath(designDocsRoot, REVIEW_BUNDLE_MANIFEST);
  if (!manifestPath || !fs.existsSync(manifestPath)) return null;

  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  validateReviewBundleManifestOrThrow(manifest);
  const { bundleHash: _bundleHash, ...manifestWithoutHash } = manifest;
  const hash = crypto.createHash(manifest.hashAlgorithm || 'sha256');

  hash.update(JSON.stringify(manifestWithoutHash));

  for (const document of manifest.documents || []) {
    const docFilename = path.posix.basename(document.path || '');
    const docPath = resolveStaticDesignDocPath(designDocsRoot, docFilename);
    if (!docPath || !fs.existsSync(docPath)) continue;
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
  const expectedTopLevelFiles = new Set([DESIGN_DOCS_MANIFEST, ...STATIC_PUBLIC_DESIGN_DOCS]);

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

  const manifestSrcPath = path.join(designDocsRoot, DESIGN_DOCS_MANIFEST);
  if (fs.existsSync(manifestSrcPath)) {
    const manifestDestPath = path.join(publicDocsRoot, DESIGN_DOCS_MANIFEST);
    fs.copyFileSync(manifestSrcPath, manifestDestPath);
    console.log(`Copied docs/design/${DESIGN_DOCS_MANIFEST} to public/docs/design`);
  }

  for (const file of STATIC_PUBLIC_DESIGN_DOCS) {
    const destPath = path.join(publicDocsRoot, file);
    fs.mkdirSync(path.dirname(destPath), { recursive: true });

    if (file === REVIEW_BUNDLE_MANIFEST && reviewBundleManifestForPublic) {
      fs.writeFileSync(destPath, `${JSON.stringify(reviewBundleManifestForPublic, null, 2)}\n`, 'utf8');
      console.log(`Generated docs/design/${file} for public/docs/design`);
      continue;
    }

    if (file === 'tokens.json') {
      fs.writeFileSync(destPath, readCanonicalTokensContract(designDocsRoot), 'utf8');
      console.log(`Generated docs/design/${file} from APT-TOKENS-CONTRACT.json`);
      continue;
    }

    const srcPath = resolveStaticDesignDocPath(designDocsRoot, file);
    if (!srcPath || !fs.existsSync(srcPath)) continue;

    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied docs/design/${file} to public/docs/design`);
  }

  const supportedMajors = Array.isArray(manifest.supportedMajors) ? manifest.supportedMajors : [];
  for (const major of supportedMajors) {
    const majorNumber = Number(major);
    if (!Number.isInteger(majorNumber)) continue;

    for (const file of STATIC_VERSIONED_PUBLIC_DESIGN_DOCS) {
      const destPath = path.join(publicDocsRoot, `v${majorNumber}`, file);
      fs.mkdirSync(path.dirname(destPath), { recursive: true });

      if (file === 'tokens.json') {
        fs.writeFileSync(destPath, readCanonicalTokensContract(designDocsRoot), 'utf8');
        console.log(`Generated docs/design/v${majorNumber}/${file} from APT-TOKENS-CONTRACT.json`);
        continue;
      }

      const srcPath = resolveStaticDesignDocPath(designDocsRoot, file);
      if (!srcPath || !fs.existsSync(srcPath)) continue;

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

function publishValidationReports({
  reportsRoot = VALIDATION_REPORTS_ROOT,
  publicValidationRoot = PUBLIC_VALIDATION_ROOT,
} = {}) {
  const publicJsonSource = path.join(reportsRoot, 'LATEST.public.json');
  const publicMdSource = path.join(reportsRoot, 'LATEST.public.md');

  if (!fs.existsSync(publicJsonSource) || !fs.existsSync(publicMdSource)) {
    throw new Error(
      [
        'Missing public-safe validation report artifacts.',
        `Expected: ${publicJsonSource}`,
        `Expected: ${publicMdSource}`,
        'Run `pnpm --dir apps/web run validation-report` before publishing docs.',
      ].join('\n')
    );
  }

  fs.mkdirSync(publicValidationRoot, { recursive: true });
  for (const entry of fs.readdirSync(publicValidationRoot, { withFileTypes: true })) {
    if (!entry.isFile()) continue;
    if (!PUBLIC_VALIDATION_FILES.includes(entry.name)) {
      fs.rmSync(path.join(publicValidationRoot, entry.name), { force: true });
    }
  }

  fs.copyFileSync(publicJsonSource, path.join(publicValidationRoot, 'LATEST.json'));
  fs.copyFileSync(publicMdSource, path.join(publicValidationRoot, 'LATEST.md'));
  console.log('Copied public-safe validation report artifacts to public/docs/design/validation');
}

function main() {
  copyContentToPublic();
  assertDesignDocAliasesInSync();
  assertAuditedDoctrineMetadataContract();
  publishDesignDocsFromManifest();
  publishValidationReports();
  copyVideosToPublic();
}

if (require.main === module) {
  main();
}

module.exports = {
  buildReviewBundleManifestForPublic,
  copyContentToPublic,
  copyVideosToPublic,
  publishValidationReports,
  assertAuditedDoctrineMetadataContract,
  assertDesignDocAliasesInSync,
  getLatestVersionEntry,
  getManifestAliasCandidates,
  publishDesignDocsFromManifest,
  readDesignDocsManifest,
  syncDesignDocAliasesFromManifest,
  validateDocVersionFrontmatter,
};
