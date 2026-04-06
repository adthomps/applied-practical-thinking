const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const { generateFrontmatterReport } = require('./frontmatter-report.cjs');

const REPO_ROOT = path.resolve(__dirname, '../../..');
const VALID_WAVES = new Set(['wave1', 'wave2', 'wave3']);

function parseArgs(argv) {
  const waveArg = argv.find((arg) => arg.startsWith('--wave='));
  const wave = waveArg ? waveArg.split('=')[1] : 'wave1';
  const apply = argv.includes('--apply');
  const preview = !apply;
  return { wave, apply, preview };
}

function inferTitle(relativePath, markdown) {
  const heading = markdown.split(/\r?\n/).find((line) => line.trim().startsWith('# '));
  if (heading) return heading.replace(/^#\s+/, '').trim();
  const base = path.posix.basename(relativePath).replace(/\.md$/i, '');
  return base.replace(/[-_]+/g, ' ').trim();
}

function defaultMetadataFor(relativePath, existingData, markdown) {
  const isPrompt = relativePath.startsWith('apps/web/ai/prompts/');
  const defaultVersion = Number.isInteger(existingData.major)
    ? `v${existingData.major}`
    : isPrompt
      ? 'v1'
      : 'v2';
  const defaultStatus = isPrompt ? 'draft' : 'candidate';

  return {
    title: inferTitle(relativePath, markdown),
    version: defaultVersion,
    status: defaultStatus,
    audience: isPrompt ? 'internal' : 'developer',
    visibility: isPrompt ? 'internal' : 'public',
    source: 'manual',
  };
}

function resolveTargetEntries(report, wave) {
  return (report.entries || [])
    .filter((entry) => entry.waveId === wave)
    .filter((entry) => !entry.exceptionReason)
    .filter((entry) => Array.isArray(entry.missingKeys) && entry.missingKeys.length > 0);
}

function proposePatchForFile(relativePath, rootDir = REPO_ROOT) {
  const absolutePath = path.join(rootDir, relativePath);
  const raw = fs.readFileSync(absolutePath, 'utf8');
  const parsed = matter(raw);
  const defaults = defaultMetadataFor(relativePath, parsed.data || {}, parsed.content || raw);
  const merged = { ...(parsed.data || {}) };
  const injectedKeys = [];

  for (const [key, value] of Object.entries(defaults)) {
    const current = merged[key];
    const isMissing = current === undefined || current === null || (typeof current === 'string' && current.trim() === '');
    if (!isMissing) continue;
    merged[key] = value;
    injectedKeys.push(key);
  }

  return {
    relativePath,
    absolutePath,
    injectedKeys,
    content: parsed.content || raw,
    data: merged,
  };
}

function formatPreviewPatch(patch) {
  const preview = matter.stringify(patch.content, patch.data).split(/\r?\n/).slice(0, 20).join('\n');
  return [`- ${patch.relativePath}`, `  - injected: ${patch.injectedKeys.join(', ') || '(none)'}`, '  - preview:', preview]
    .join('\n');
}

function run({ wave, apply, preview, rootDir = REPO_ROOT, reportOverride = null }) {
  if (!VALID_WAVES.has(wave)) {
    throw new Error(`Unsupported wave "${wave}". Use one of: wave1, wave2, wave3`);
  }

  const report = reportOverride || generateFrontmatterReport();
  const targets = resolveTargetEntries(report, wave);
  const patches = targets
    .map((entry) => proposePatchForFile(entry.relativePath, rootDir))
    .filter((patch) => patch.injectedKeys.length > 0);

  if (preview) {
    console.log(`Frontmatter autofix preview (${wave})`);
    console.log(`Files needing updates: ${patches.length}`);
    for (const patch of patches) {
      console.log(formatPreviewPatch(patch));
    }
    return { wave, mode: 'preview', totalTargets: targets.length, updated: 0, patches };
  }

  for (const patch of patches) {
    const next = matter.stringify(patch.content, patch.data);
    fs.writeFileSync(patch.absolutePath, next, 'utf8');
  }

  console.log(`Frontmatter autofix applied (${wave})`);
  console.log(`Files updated: ${patches.length}`);
  return { wave, mode: 'apply', totalTargets: targets.length, updated: patches.length, patches };
}

function main() {
  const options = parseArgs(process.argv.slice(2));
  run(options);
}

if (require.main === module) {
  main();
}

module.exports = {
  defaultMetadataFor,
  inferTitle,
  parseArgs,
  proposePatchForFile,
  resolveTargetEntries,
  run,
};
