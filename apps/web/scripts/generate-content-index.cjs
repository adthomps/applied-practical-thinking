// scripts/generate-content-index.cjs
// Usage: node scripts/generate-content-index.cjs
// Generates JSON index files for each content type (blog, guides, podcasts, case-studies, labs, demos, systems)
// by parsing Markdown frontmatter in apps/web/content/*

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const CONTENT_TYPES = ['blog', 'guides', 'podcasts', 'case-studies', 'labs', 'demos', 'systems'];
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
  // Normalize related fields
  let related = [];
  if (Array.isArray(data.related)) related = data.related;
  if (Array.isArray(data.relatedLabs)) related = related.concat(data.relatedLabs);
  if (Array.isArray(data.relatedInsights)) related = related.concat(data.relatedInsights);
  if (Array.isArray(data.relatedSystems)) related = related.concat(data.relatedSystems);
  // Remove nulls/duplicates
  related = Array.from(new Set(related.filter(Boolean)));
  // Map date to publishedAt
  const publishedAt = data.publishedAt || data.date || '';
  // Map summary to description
  const description = data.description || data.summary || '';
  // For labs, ensure both id and slug
  let id = data.id;
  let slug = data.slug;
  if (!id && slug) id = slug;
  if (!slug && id) slug = id;
  // Merge tags into concepts, dedupe
  const tags = Array.isArray(data.tags) ? data.tags : [];
  const concepts = Array.isArray(data.concepts) ? data.concepts : [];
  const mergedConcepts = Array.from(new Set([...concepts, ...tags]));
  return {
    id,
    slug,
    title: data.title,
    type: data.type || '',
    description,
    publishedAt,
    featured: typeof data.featured === 'boolean' ? data.featured : false,
    concepts: mergedConcepts,
    platforms: Array.isArray(data.platforms) ? data.platforms : [],
    technologies: Array.isArray(data.technologies) ? data.technologies : [],
    status: data.status || '',
    thumbnail: data.thumbnail || data.image || undefined,
    links: typeof data.links === 'object' && data.links !== null ? data.links : {},
    related,
    contentPath: path.relative(CONTENT_ROOT, filePath).replace(/\\/g, '/'),
    excerpt: content.split('\n').slice(0, 8).join(' ').replace(/[#>*-]/g, '').trim(),
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
