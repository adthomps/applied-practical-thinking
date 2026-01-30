// Copy all Markdown content to public/content for frontend access
const fs = require('fs');
const path = require('path');

const CONTENT_TYPES = ['blog', 'guides', 'podcasts', 'case-studies'];
const CONTENT_ROOT = path.join(__dirname, '../content');
const PUBLIC_CONTENT_ROOT = path.join(__dirname, '../public/content');

for (const type of CONTENT_TYPES) {
  const srcDir = path.join(CONTENT_ROOT, type);
  const destDir = path.join(PUBLIC_CONTENT_ROOT, type);
  if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });
  if (!fs.existsSync(srcDir)) continue;
  const files = fs.readdirSync(srcDir).filter(f => f.endsWith('.md'));
  for (const file of files) {
    fs.copyFileSync(path.join(srcDir, file), path.join(destDir, file));
    console.log(`Copied ${type}/${file} to public/content/${type}`);
  }
}
