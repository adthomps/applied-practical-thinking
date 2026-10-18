#!/usr/bin/env node
// Writes public/sitemap.xml from the public routes plus the generated content
// indexes. Run after build-content-index so drafts are already excluded.
const fs = require('fs');
const path = require('path');

const SITE_ORIGIN = 'https://appliedpracticalthinking.com';
const dataDir = path.join(__dirname, '..', 'data');
const outputPath = path.join(__dirname, '..', 'public', 'sitemap.xml');

const STATIC_ROUTES = [
  '/',
  '/about',
  '/about/visual-gallery',
  '/labs',
  '/labs/live-demos',
  '/proof',
  '/insights',
  '/insights/blog',
  '/insights/case-studies',
  '/insights/podcast',
  '/principles',
  '/design',
];

// Index file -> detail route builder.
const CONTENT_ROUTES = {
  'labs-index.json': (item) => `/labs/${item.slug || item.id}`,
  'demos-index.json': (item) => `/labs/live-demos/${item.slug || item.id}`,
  'systems-index.json': (item) => `/proof/${item.id}`,
  'blog-index.json': (item) => `/insights/${item.id}`,
  'guides-index.json': (item) => `/insights/${item.id}`,
  'podcasts-index.json': (item) => `/insights/${item.id}`,
  'case-studies-index.json': (item) => `/insights/${item.id}`,
};

function readIndex(fileName) {
  const filePath = path.join(dataDir, fileName);
  if (!fs.existsSync(filePath)) return [];
  const parsed = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  return Array.isArray(parsed) ? parsed : [];
}

function toIsoDate(value) {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date.toISOString().slice(0, 10);
}

function escapeXml(value) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function buildEntries() {
  const entries = new Map();
  for (const route of STATIC_ROUTES) entries.set(route, null);

  for (const [fileName, toRoute] of Object.entries(CONTENT_ROUTES)) {
    for (const item of readIndex(fileName)) {
      if (!item || !(item.id || item.slug)) continue;
      const route = toRoute(item);
      if (!entries.has(route)) entries.set(route, toIsoDate(item.date || item.publishedAt));
    }
  }

  return entries;
}

function renderSitemap(entries) {
  const urls = [...entries].map(([route, lastmod]) => {
    const loc = `    <loc>${escapeXml(`${SITE_ORIGIN}${route}`)}</loc>`;
    return lastmod ? `  <url>\n${loc}\n    <lastmod>${lastmod}</lastmod>\n  </url>` : `  <url>\n${loc}\n  </url>`;
  });
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`;
}

if (require.main === module) {
  const entries = buildEntries();
  fs.writeFileSync(outputPath, renderSitemap(entries));
  console.log(`Wrote ${entries.size} URLs to public/sitemap.xml`);
}

module.exports = { buildEntries, renderSitemap, STATIC_ROUTES };
