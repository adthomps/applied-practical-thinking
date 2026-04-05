// scripts/generate-content-index.js
// Usage: node scripts/generate-content-index.js
// Generates JSON index files for each content type (blog, guides, podcasts, design-reviews)
// by parsing Markdown frontmatter in apps/web/content/*

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const CONTENT_TYPES = ['blog', 'guides', 'podcasts', 'design-reviews'];
const CONTENT_ROOT = path.join(__dirname, '../content');
const OUTPUT_ROOT = path.join(__dirname, '../data');

function getAllMarkdownFiles(dir) {
  return fs.readdirSync(dir)
    .filter(f => f.endsWith('.md'))
    .map(f => path.join(dir, f));
}

function parseMarkdownFile(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(raw);
  return {
    ...data,
    contentPath: path.relative(CONTENT_ROOT, filePath).replace(/\\/g, '/'),
    excerpt: content.split('\n').slice(0, 8).join(' ').replace(/[#>*-]/g, '').trim()
  };
}

function generateIndexForType(type) {
  const dir = path.join(CONTENT_ROOT, type);
  if (!fs.existsSync(dir)) return [];
  const files = getAllMarkdownFiles(dir);
  return files.map(parseMarkdownFile);
}

function main() {
  if (!fs.existsSync(OUTPUT_ROOT)) fs.mkdirSync(OUTPUT_ROOT);
  CONTENT_TYPES.forEach(type => {
    const index = generateIndexForType(type);
    const outPath = path.join(OUTPUT_ROOT, `${type}-index.json`);
    fs.writeFileSync(outPath, JSON.stringify(index, null, 2), 'utf8');
    console.log(`Wrote ${index.length} entries to ${outPath}`);
  });
}

main();
