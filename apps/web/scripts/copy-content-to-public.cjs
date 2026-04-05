
// Copy public Markdown content and approved public docs to public for frontend access
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const CONTENT_TYPES = ['blog', 'guides', 'podcasts', 'design-reviews', 'labs', 'demos', 'systems'];
const CONTENT_ROOT = path.join(__dirname, '../content');
const PUBLIC_CONTENT_ROOT = path.join(__dirname, '../public/content');
const DESIGN_DOCS_ROOT = path.join(__dirname, '../docs/design');
const PUBLIC_DOCS_ROOT = path.join(__dirname, '../public/docs/design');
const REVIEW_BUNDLE_MANIFEST = 'APT-AI-REVIEW-BUNDLE.json';
const PUBLIC_DESIGN_DOCS = [
  'APT-AI-REVIEW-BUNDLE.json',
  'APT-AI-REVIEW-BUNDLE.md',
  'APT-DESIGN-OVERVIEW.md',
  'APT-DESIGN-THINKING.md',
  'APT-DESIGN-SYSTEM.md',
  'APT-DESIGN-ARCHITECTURE.md',
  'APT-REVIEW-STANDARD.md',
  'APT-CONTENT-STRATEGY.md',
  'APT-DESIGN-SYSTEMS.md',
  'APT-FIGMA-TOKENS.json',
  'design-core.md',
  'design-demos.md',
  'design-site.md',
  'vpds-alignment.md',
];

function buildReviewBundleManifestForPublic() {
  const manifestPath = path.join(DESIGN_DOCS_ROOT, REVIEW_BUNDLE_MANIFEST);
  if (!fs.existsSync(manifestPath)) return null;

  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  const { bundleHash: _bundleHash, ...manifestWithoutHash } = manifest;
  const hash = crypto.createHash(manifest.hashAlgorithm || 'sha256');

  hash.update(JSON.stringify(manifestWithoutHash));

  for (const document of manifest.documents || []) {
    const docFilename = path.posix.basename(document.path || '');
    const docPath = path.join(DESIGN_DOCS_ROOT, docFilename);
    if (!fs.existsSync(docPath)) continue;
    hash.update(docFilename);
    hash.update(fs.readFileSync(docPath));
  }

  return {
    ...manifestWithoutHash,
    bundleHash: hash.digest('hex'),
  };
}

function removeTopLevelMarkdownFiles(dir) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isFile() && entry.name.endsWith('.md')) {
      fs.rmSync(path.join(dir, entry.name), { force: true });
    }
  }
}

fs.rmSync(path.join(PUBLIC_CONTENT_ROOT, 'case-studies'), { recursive: true, force: true });

for (const type of CONTENT_TYPES) {
  const srcDir = path.join(CONTENT_ROOT, type);
  const destDir = path.join(PUBLIC_CONTENT_ROOT, type);
  fs.mkdirSync(destDir, { recursive: true });
  removeTopLevelMarkdownFiles(destDir);
  if (!fs.existsSync(srcDir)) continue;
  const files = fs.readdirSync(srcDir).filter(f => f.endsWith('.md'));
  for (const file of files) {
    fs.copyFileSync(path.join(srcDir, file), path.join(destDir, file));
    console.log(`Copied ${type}/${file} to public/content/${type}`);
  }
}

// Copy only approved public design docs to public/docs/design
fs.rmSync(PUBLIC_DOCS_ROOT, { recursive: true, force: true });
fs.mkdirSync(PUBLIC_DOCS_ROOT, { recursive: true });

const reviewBundleManifestForPublic = buildReviewBundleManifestForPublic();

for (const file of PUBLIC_DESIGN_DOCS) {
  const srcPath = path.join(DESIGN_DOCS_ROOT, file);
  const destPath = path.join(PUBLIC_DOCS_ROOT, file);
  if (!fs.existsSync(srcPath)) continue;
  if (file === REVIEW_BUNDLE_MANIFEST && reviewBundleManifestForPublic) {
    fs.writeFileSync(destPath, `${JSON.stringify(reviewBundleManifestForPublic, null, 2)}\n`, 'utf8');
    console.log(`Generated docs/design/${file} for public/docs/design`);
    continue;
  }
  fs.copyFileSync(srcPath, destPath);
  console.log(`Copied docs/design/${file} to public/docs/design`);
}

// Copy video files from content/videos to public/content/videos
const VIDEO_EXTENSIONS = ['.mp4', '.webm', '.mov', '.ogg', '.m4v'];
const SRC_VIDEOS = path.join(CONTENT_ROOT, 'videos');
const DEST_VIDEOS = path.join(PUBLIC_CONTENT_ROOT, 'videos');
const MAX_BYTES = 25 * 1024 * 1024; // 25 MiB - Pages asset limit
if (fs.existsSync(SRC_VIDEOS)) {
  if (!fs.existsSync(DEST_VIDEOS)) fs.mkdirSync(DEST_VIDEOS, { recursive: true });
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
