// Published token mirror check (APT-019).
//
// Canonical tokens live in apt-principles-agents/design/tokens/ and arrive here through
// `apt-assets sync` as .apt/design/tokens/. apps/web/index.css imports the generated CSS, and
// .apt/design/bin/apt-design-check.mjs checks it. This script only keeps the downloadable
// copies under docs/design/static/ identical to the synced canonical files.
//
//   node scripts/token-drift-check.cjs          fail if a published copy differs
//   node scripts/token-drift-check.cjs --fix    copy the canonical files over the published ones
const fs = require('fs');
const path = require('path');

const WEB_ROOT = path.resolve(__dirname, '..');
const CANONICAL_DIR = path.resolve(WEB_ROOT, '..', '..', '.apt', 'design', 'tokens');
const PUBLISHED_DIR = path.join(WEB_ROOT, 'docs', 'design', 'static');
const FILES = ['APT-TOKENS.json', 'APT-TOKENS-CONTRACT.json'];
const fix = process.argv.includes('--fix');

const read = (file) => fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n');
const stale = [];
for (const file of FILES) {
  const canonical = path.join(CANONICAL_DIR, file);
  if (!fs.existsSync(canonical)) {
    console.error(`Missing ${path.relative(WEB_ROOT, canonical)}. Sync the design manifest from apt-principles-agents.`);
    process.exit(1);
  }
  const published = path.join(PUBLISHED_DIR, file);
  if (fs.existsSync(published) && read(published) === read(canonical)) continue;
  if (fix) fs.copyFileSync(canonical, published);
  stale.push(file);
}

if (stale.length && !fix) {
  console.error(`Published token copies differ from canonical .apt/design/tokens: ${stale.join(', ')}. Run: node scripts/token-drift-check.cjs --fix`);
  process.exit(1);
}
console.log(stale.length ? `Updated published token copies: ${stale.join(', ')}` : 'Published token copies match canonical .apt/design/tokens.');
