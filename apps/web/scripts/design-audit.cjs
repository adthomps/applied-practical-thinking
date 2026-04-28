const fs = require('fs');
const path = require('path');

const WEB_ROOT = path.resolve(__dirname, '..');
const REPO_ROOT = path.resolve(WEB_ROOT, '../..');

const SCAN_ROOTS = [
  path.join(REPO_ROOT, 'apps', 'web'),
  path.join(REPO_ROOT, 'packages', 'ui'),
  path.join(REPO_ROOT, 'packages', 'config'),
];

const SOURCE_EXTENSIONS = new Set(['.css', '.js', '.jsx', '.ts', '.tsx', '.md', '.json']);
const MEDIA_EXTENSIONS = new Set(['.svg', '.png', '.jpg', '.jpeg', '.webp', '.gif', '.ico']);
const GENERATED_DIR_PARTS = new Set(['node_modules', 'dist', '.vite']);
const LEGACY_COLOR_UTILITY =
  /\b(?:bg|text|border|from|via|to)-(?:gray|slate|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|black|white)(?:-\d{2,3})?(?:\/\d+)?\b/;
const RAW_COLOR = /(?<![A-Za-z0-9_-])#[0-9A-Fa-f]{3,8}\b|\brgba?\(/;
const STALE_COLOR_VAR = /--color-(?:card|card-foreground|primary|primary-foreground|secondary|error|error-foreground|muted|success)\b/;
const LEGACY_SHADOW = /\bshadow-(?:sm|md|lg|xl|2xl)\b|shadow-\[/;
const RAW_SHADOW = /box-shadow:[ \t]+(?!var\(--elevation-)/;
const RAW_OVERLAY = /\bbg-black\/\d+\b|background:\s*rgba?\(/;

function toPosix(value) {
  return value.replace(/\\/g, '/');
}

function isTokenDefinition(filePath) {
  const normalized = toPosix(path.relative(REPO_ROOT, filePath));
  const basename = path.basename(filePath);
  return (
    normalized === 'apps/web/index.css' ||
    normalized === 'apps/web/tailwind.config.ts' ||
    normalized === 'packages/config/src/aptTokens.ts' ||
    basename === 'APT-TOKENS.json' ||
    basename === 'APT-TOKENS-CONTRACT.json' ||
    basename === 'tokens.json' ||
    basename === 'design-tokens.json'
  );
}

function isAllowedDynamicColorFile(filePath) {
  const normalized = toPosix(path.relative(REPO_ROOT, filePath));
  return (
    normalized === 'apps/web/components/ui/chart.tsx' ||
    normalized.includes('/patterns/Bar-Chart/examples/') ||
    normalized.includes('/patterns/Line-Chart/examples/') ||
    normalized.includes('/patterns/Dumbbell-Plot/examples/')
  );
}

function shouldSkipDir(dirent) {
  return dirent.isDirectory() && GENERATED_DIR_PARTS.has(dirent.name);
}

function walk(root, files = []) {
  if (!fs.existsSync(root)) return files;
  for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
    if (shouldSkipDir(entry)) continue;
    const fullPath = path.join(root, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath, files);
      continue;
    }
    if (!entry.isFile()) continue;
    const extension = path.extname(entry.name).toLowerCase();
    if (MEDIA_EXTENSIONS.has(extension)) continue;
    if (!SOURCE_EXTENSIONS.has(extension)) continue;
    files.push(fullPath);
  }
  return files;
}

function checkLine({ filePath, line, lineNumber, failures }) {
  const relative = toPosix(path.relative(REPO_ROOT, filePath));
  const tokenDefinition = isTokenDefinition(filePath);
  const dynamicColorFile = isAllowedDynamicColorFile(filePath);

  const checks = [
    ['legacy Tailwind color utility', LEGACY_COLOR_UTILITY, !tokenDefinition],
    ['raw color literal', RAW_COLOR, !tokenDefinition],
    ['stale undefined --color-* variable', STALE_COLOR_VAR, !tokenDefinition && !dynamicColorFile],
    ['legacy shadow utility', LEGACY_SHADOW, !tokenDefinition],
    ['raw box-shadow', RAW_SHADOW, !tokenDefinition],
    ['raw overlay background', RAW_OVERLAY, !tokenDefinition],
  ];

  for (const [label, regex, enabled] of checks) {
    if (enabled && regex.test(line)) {
      failures.push(`${relative}:${lineNumber} ${label}: ${line.trim()}`);
      return;
    }
  }
}

function main() {
  const failures = [];
  const files = SCAN_ROOTS.flatMap((root) => walk(root));

  for (const filePath of files) {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split(/\r?\n/);
    lines.forEach((line, index) => {
      checkLine({ filePath, line, lineNumber: index + 1, failures });
    });
  }

  if (failures.length > 0) {
    console.error('APT design audit failed:');
    for (const failure of failures) {
      console.error(`- ${failure}`);
    }
    process.exit(1);
  }

  console.log('APT design audit passed: semantic colors, overlays, and elevation tokens are respected.');
}

main();
