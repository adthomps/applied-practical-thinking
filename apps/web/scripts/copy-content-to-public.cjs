
// Copy all Markdown content and docs to public for frontend access
const fs = require('fs');
const path = require('path');

const CONTENT_TYPES = ['blog', 'guides', 'podcasts', 'case-studies', 'labs', 'demos'];
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

// Copy all docs (including design) to public/docs
const DOCS_ROOT = path.join(__dirname, '../docs');
const PUBLIC_DOCS_ROOT = path.join(__dirname, '../public/docs');

function copyDirRecursive(src, dest) {
  if (!fs.existsSync(src)) return;
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src)) {
    const srcPath = path.join(src, entry);
    const destPath = path.join(dest, entry);
    if (fs.statSync(srcPath).isDirectory()) {
      copyDirRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
      console.log(`Copied ${srcPath} to ${destPath}`);
    }
  }
}

copyDirRecursive(DOCS_ROOT, PUBLIC_DOCS_ROOT);
