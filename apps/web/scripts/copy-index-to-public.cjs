// Copy all index files to public/data for frontend access
const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '../data');
const PUBLIC_DATA_DIR = path.join(__dirname, '../public/data');

if (!fs.existsSync(PUBLIC_DATA_DIR)) fs.mkdirSync(PUBLIC_DATA_DIR);

const files = fs.readdirSync(DATA_DIR).filter(f => f.endsWith('-index.json'));
for (const file of files) {
  fs.copyFileSync(path.join(DATA_DIR, file), path.join(PUBLIC_DATA_DIR, file));
  console.log(`Copied ${file} to public/data`);
}
