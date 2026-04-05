// scripts/generate-content-index.cjs
// Usage: node scripts/generate-content-index.cjs
// Generates JSON index files for each content type (blog, guides, podcasts, design-reviews, labs, demos, systems)
// by parsing Markdown frontmatter in apps/web/content/*

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const CONTENT_TYPES = ['blog', 'guides', 'podcasts', 'design-reviews', 'labs', 'demos', 'systems'];
const CONTENT_ROOT = path.join(__dirname, '../content');
const OUTPUT_ROOT = path.join(__dirname, '../data');
const DRAFT_STATUSES = new Set(['draft', 'hidden', 'private']);
const PLACEHOLDER_PATTERNS = [
  /_content coming soon\._/i,
  /\bcontent coming soon\b/i,
  /^coming soon[.!\s]*$/im,
  /\btbd\b/i,
];

function getAllMarkdownFiles(dir) {
  return fs.readdirSync(dir)
    .filter(f => f.endsWith('.md'))
    .map(f => path.join(dir, f));
}

function normalizeStatus(status) {
  return typeof status === 'string' ? status.trim().toLowerCase() : '';
}

function hasPlaceholderContent(content) {
  return PLACEHOLDER_PATTERNS.some((pattern) => pattern.test(content));
}

function extractExcerpt(content) {
  return content
    .split('\n')
    .slice(0, 8)
    .join(' ')
    .replace(/[#>*-]/g, '')
    .trim();
}

function isInternalLinkTarget(value) {
  return typeof value === 'string' && value.length > 0 && !/^https?:\/\//i.test(value);
}

function validateEntries(type, parsedEntries) {
  const issues = [];
  const seenIds = new Map();
  const seenSlugs = new Map();

  for (const parsed of parsedEntries) {
    const { entry, filePath, hasPlaceholder } = parsed;

    if (!entry.title) {
      issues.push(`[${type}] Missing title in ${filePath}`);
    }
    if (!entry.id) {
      issues.push(`[${type}] Missing id in ${filePath}`);
    }
    if (!entry.slug) {
      issues.push(`[${type}] Missing slug in ${filePath}`);
    }
    if (!entry.type) {
      issues.push(`[${type}] Missing type in ${filePath}`);
    }
    if (hasPlaceholder) {
      issues.push(`[${type}] Placeholder content must be marked draft before publishing: ${filePath}`);
    }

    if (entry.id) {
      const previous = seenIds.get(entry.id);
      if (previous) {
        issues.push(`[${type}] Duplicate id "${entry.id}" in ${previous} and ${filePath}`);
      } else {
        seenIds.set(entry.id, filePath);
      }
    }

    if (entry.slug) {
      const previous = seenSlugs.get(entry.slug);
      if (previous) {
        issues.push(`[${type}] Duplicate slug "${entry.slug}" in ${previous} and ${filePath}`);
      } else {
        seenSlugs.set(entry.slug, filePath);
      }
    }

    for (const [label, target] of Object.entries(entry.links || {})) {
      if (!isInternalLinkTarget(target)) continue;
      if (/[=\s]/.test(target)) {
        issues.push(`[${type}] Malformed ${label} link target "${target}" in ${filePath}`);
      }
    }
  }

  return issues;
}

function validateCrossTypeLinks(indexesByType) {
  const issues = [];
  const publishedTargets = new Set();

  for (const items of Object.values(indexesByType)) {
    for (const item of items) {
      if (item.id) publishedTargets.add(item.id);
      if (item.slug) publishedTargets.add(item.slug);
    }
  }

  for (const [type, items] of Object.entries(indexesByType)) {
    for (const item of items) {
      for (const [label, target] of Object.entries(item.links || {})) {
        if (!isInternalLinkTarget(target)) continue;
        if (!publishedTargets.has(target)) {
          issues.push(`[${type}] Unresolved ${label} link target "${target}" in ${item.contentPath}`);
        }
      }
    }
  }

  return issues;
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
  const status = normalizeStatus(data.status);
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
    entry: {
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
      status,
      thumbnail: data.thumbnail || data.image || undefined,
      links: typeof data.links === 'object' && data.links !== null ? data.links : {},
      related,
      contentPath: path.relative(CONTENT_ROOT, filePath).replace(/\\/g, '/'),
      excerpt: extractExcerpt(content),
    },
    filePath,
    hasPlaceholder: hasPlaceholderContent(content),
  };
}

function generateIndexForType(type) {
  const dir = path.join(CONTENT_ROOT, type);
  if (!fs.existsSync(dir)) return [];
  const files = getAllMarkdownFiles(dir);
  const parsedEntries = files.map(parseMarkdownFile);
  const publishedEntries = parsedEntries.filter(({ entry }) => !DRAFT_STATUSES.has(entry.status));
  const issues = validateEntries(type, publishedEntries);
  if (issues.length) {
    throw new Error(issues.join('\n'));
  }

  return publishedEntries
    .map(({ entry }) => entry)
    .sort((left, right) => String(right.publishedAt || '').localeCompare(String(left.publishedAt || '')));
}

function main() {
  if (!fs.existsSync(OUTPUT_ROOT)) fs.mkdirSync(OUTPUT_ROOT);
  fs.rmSync(path.join(OUTPUT_ROOT, 'case-studies-index.json'), { force: true });
  const indexesByType = {};

  CONTENT_TYPES.forEach(type => {
    indexesByType[type] = generateIndexForType(type);
  });

  const crossTypeIssues = validateCrossTypeLinks(indexesByType);
  if (crossTypeIssues.length) {
    throw new Error(crossTypeIssues.join('\n'));
  }

  CONTENT_TYPES.forEach(type => {
    const index = indexesByType[type];
    const outPath = path.join(OUTPUT_ROOT, `${type}-index.json`);
    fs.writeFileSync(outPath, JSON.stringify(index, null, 2), 'utf8');
    console.log(`Wrote ${index.length} entries to ${outPath}`);
  });
}

main();
