// scripts/generate-systems-index.cjs
// Generate systems-index.json from markdown files in content/systems

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const systemsDir = path.join(__dirname, '../content/systems');
const outPath = path.join(__dirname, '../data/systems-index.json');

const files = fs.readdirSync(systemsDir).filter(f => f.endsWith('.md'));

const index = files.map(filename => {
  const filePath = path.join(systemsDir, filename);
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data } = matter(raw);
  // Map summary->description, date->publishedAt for consistency
  const description = data.description || data.summary || "";
  const publishedAt = data.publishedAt || data.date || "";
  // Merge tags into concepts, dedupe
  const tags = Array.isArray(data.tags) ? data.tags : [];
  const concepts = Array.isArray(data.concepts) ? data.concepts : [];
  const mergedConcepts = Array.from(new Set([...concepts, ...tags]));
  return {
    id: data.id,
    title: data.title,
    type: data.type || "system",
    description,
    publishedAt,
    featured: typeof data.featured === 'boolean' ? data.featured : false,
    concepts: mergedConcepts,
    platforms: Array.isArray(data.platforms) ? data.platforms : [],
    technologies: Array.isArray(data.technologies) ? data.technologies : [],
    status: data.status || "",
    thumbnail: data.thumbnail || data.image || undefined,
    links: typeof data.links === 'object' && data.links !== null ? data.links : {},
    related: Array.isArray(data.related) ? data.related : [],
    contentPath: `systems/${filename}`,
    excerpt: raw.split('\n').slice(0, 8).join(' ').replace(/[#>*-]/g, '').trim(),
  };
});

fs.writeFileSync(outPath, JSON.stringify(index, null, 2));
console.log('Generated systems-index.json');
