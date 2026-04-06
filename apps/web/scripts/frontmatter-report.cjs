const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const REQUIRED_KEYS = ['title', 'version', 'status', 'audience', 'visibility', 'source'];
const REPO_ROOT = path.resolve(__dirname, '../../..');

const WAVE_RULES = [
  {
    id: 'wave1',
    label: 'Design static + AI prompts',
    enforceOn: '2026-04-20',
    matches: (relativePath) =>
      relativePath.startsWith('apps/web/docs/design/static/') ||
      relativePath.startsWith('apps/web/ai/prompts/'),
  },
  {
    id: 'wave2',
    label: 'Internal operational docs',
    enforceOn: '2026-05-15',
    matches: (relativePath) =>
      relativePath.startsWith('docs/') ||
      [
        'README.md',
        'PROJECT_RULES.md',
        'DOCUMENTATION_INDEX.md',
        'AGENTS.md',
        'QUICK_REFERENCE.md',
      ].includes(relativePath),
  },
  {
    id: 'wave3',
    label: 'Worker AI docs + .github docs',
    enforceOn: '2026-06-15',
    matches: (relativePath) =>
      relativePath.startsWith('apps/worker/src/ai/docs/') ||
      (relativePath.startsWith('.github/') && relativePath.endsWith('.md')),
  },
];

const EXCEPTIONS = [
  {
    pattern: /^docs\/DECISION_LOG\.md$/,
    reason: 'Historical log format is preserved; frontmatter rollout deferred.',
  },
  {
    pattern: /^\.github\/pull_request_template\.md$/,
    reason: 'GitHub PR template structure is preserved; metadata rollout deferred.',
  },
];

const SKIP_SEGMENTS = new Set([
  '.git',
  '.turbo',
  'node_modules',
  'dist',
  'coverage',
  '.wrangler',
]);

function toPosix(relativePath) {
  return relativePath.split(path.sep).join('/');
}

function shouldSkipDirectory(name) {
  return SKIP_SEGMENTS.has(name);
}

function shouldSkipFile(relativePath) {
  if (!relativePath.endsWith('.md')) return true;
  if (relativePath.includes('/public/')) return true;
  if (relativePath.startsWith('apps/web/public/')) return true;
  return false;
}

function walkMarkdownFiles(rootDir) {
  const files = [];
  const stack = [rootDir];

  while (stack.length > 0) {
    const current = stack.pop();
    const entries = fs.readdirSync(current, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(current, entry.name);
      if (entry.isDirectory()) {
        if (shouldSkipDirectory(entry.name)) continue;
        stack.push(fullPath);
        continue;
      }
      if (!entry.isFile()) continue;

      const relativePath = toPosix(path.relative(REPO_ROOT, fullPath));
      if (shouldSkipFile(relativePath)) continue;
      files.push({ fullPath, relativePath });
    }
  }

  return files.sort((a, b) => a.relativePath.localeCompare(b.relativePath));
}

function getException(relativePath) {
  return EXCEPTIONS.find((entry) => entry.pattern.test(relativePath)) || null;
}

function getWave(relativePath) {
  return WAVE_RULES.find((wave) => wave.matches(relativePath)) || null;
}

function analyzeFile({ fullPath, relativePath }) {
  const exception = getException(relativePath);
  const wave = getWave(relativePath);
  const contents = fs.readFileSync(fullPath, 'utf8');
  const lineCount = contents === '' ? 0 : contents.split(/\r?\n/).length;
  const result = {
    relativePath,
    waveId: wave ? wave.id : null,
    waveLabel: wave ? wave.label : null,
    enforceOn: wave ? wave.enforceOn : null,
    exceptionReason: exception ? exception.reason : null,
    charCount: contents.length,
    lineCount,
    hasFrontmatter: false,
    missingKeys: [],
  };

  if (!wave || exception) return result;

  const trimmed = contents.trimStart();
  if (!trimmed.startsWith('---')) {
    result.missingKeys = [...REQUIRED_KEYS];
    return result;
  }

  const parsed = matter(contents);
  result.hasFrontmatter = true;
  result.missingKeys = REQUIRED_KEYS.filter((key) => {
    const value = parsed.data[key];
    if (typeof value === 'string') return value.trim().length === 0;
    return value === undefined || value === null;
  });

  return result;
}

function formatMissingKeys(entry) {
  return entry.missingKeys.length === 0 ? '-' : entry.missingKeys.join(', ');
}

function summarizeEntries(entries) {
  const inScope = entries.filter((entry) => entry.waveId);
  const failing = inScope.filter((entry) => !entry.exceptionReason && entry.missingKeys.length > 0);
  const waves = WAVE_RULES.map((wave) => {
    const waveEntries = inScope.filter((entry) => entry.waveId === wave.id);
    const exceptions = waveEntries.filter((entry) => entry.exceptionReason).length;
    const missing = waveEntries.filter((entry) => !entry.exceptionReason && entry.missingKeys.length > 0).length;
    const passed = waveEntries.filter((entry) => !entry.exceptionReason && entry.missingKeys.length === 0).length;
    return {
      id: wave.id,
      label: wave.label,
      enforceOn: wave.enforceOn,
      total: waveEntries.length,
      passed,
      missing,
      exceptions,
    };
  });

  return {
    scannedCount: entries.length,
    inScopeCount: inScope.length,
    missingCount: failing.length,
    waves,
    missingEntries: failing,
  };
}

function printSummary(entries) {
  const summary = summarizeEntries(entries);

  console.log('\nFrontmatter report (report-only, non-blocking)');
  console.log(`Scanned markdown files: ${summary.scannedCount}`);
  console.log(`In wave scope: ${summary.inScopeCount}`);
  console.log(`Missing frontmatter/keys: ${summary.missingCount}`);

  for (const wave of summary.waves) {
    console.log(`- ${wave.id} (${wave.label}, enforce ${wave.enforceOn}): total=${wave.total}, pass=${wave.passed}, missing=${wave.missing}, exceptions=${wave.exceptions}`);
  }

  if (summary.missingEntries.length === 0) {
    console.log('No in-scope frontmatter gaps detected.');
    return;
  }

  console.log('\nMissing frontmatter/keys by file:');
  for (const entry of summary.missingEntries) {
    console.log(`- ${entry.relativePath} [${entry.waveId}] missing: ${formatMissingKeys(entry)}`);
  }
}

function generateFrontmatterReport() {
  const files = walkMarkdownFiles(REPO_ROOT);
  const entries = files.map(analyzeFile);
  return {
    generatedAt: new Date().toISOString(),
    requiredKeys: [...REQUIRED_KEYS],
    entries,
    ...summarizeEntries(entries),
  };
}

function main() {
  const report = generateFrontmatterReport();
  const entries = report.entries;
  printSummary(entries);
}

if (require.main === module) {
  main();
}

module.exports = {
  REQUIRED_KEYS,
  WAVE_RULES,
  EXCEPTIONS,
  generateFrontmatterReport,
  summarizeEntries,
  printSummary,
};
