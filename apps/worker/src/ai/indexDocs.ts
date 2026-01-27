// Only load dotenv locally (not in Worker)
if (typeof process !== 'undefined' && process.env) {
  require('dotenv').config();
}
// Script to index markdown docs into Cloudflare Vectorize (or similar)
// Run this script on deploy or doc update

const fs = require('fs');
const path = require('path');
const { embed, upsertToVectorDb } = require('./vectorClient');
const { splitMarkdown } = require('./splitMarkdown');

const DOCS_DIR = path.join(__dirname, 'docs');

// Accept env for VECTORIZE binding (for Worker), or use REST API for local/dev
async function indexDocs(env?: any) {
  const files = fs.readdirSync(DOCS_DIR).filter((f: string) => f.endsWith('.md'));
  for (const file of files) {
    const filePath = path.join(DOCS_DIR, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const chunks = splitMarkdown(content);
    for (const chunk of chunks) {
      const embedding = await embed(chunk.text);
      await upsertToVectorDb({
        id: chunk.id,
        embedding,
        metadata: { path: file, heading: chunk.heading }
      }, env);
    }
  }
  console.log('Docs indexed.');
}

// CLI entry point for local Node.js usage
if (require.main === module) {
  if (!process.env.OPENAI_API_KEY) {
    console.error('Set OPENAI_API_KEY in your environment.');
    process.exit(1);
  }
  indexDocs();
}
