const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');

const requiredProxyFiles = [
  'examples/README.md',
  'prompts/README.md',
  'checklists/README.md',
  'templates/README.md',
  'references/README.md',
];

const expectedProxyMarkers = [
  'Canonical source:',
  '../apt-principles/',
  'Policy:',
];

const requiredRulesMarkers = [
  'APT root artifact proxy rule:',
  'APT doctrine mapping for reviews:',
  'Thinking:',
  'Design:',
  'Architecture:',
  'System Standards:',
  'Security:',
  'Execution:',
  'Quality:',
  'Release/Change:',
  'Operations:',
  'Knowledge:',
  'AI:',
];

function readText(filePath) {
  return fs.readFileSync(path.join(root, filePath), 'utf8');
}

function assertExists(filePath, errors) {
  if (!fs.existsSync(path.join(root, filePath))) {
    errors.push(`Missing required file: ${filePath}`);
  }
}

function assertMarkers(filePath, markers, errors) {
  const text = readText(filePath);
  for (const marker of markers) {
    if (!text.includes(marker)) {
      errors.push(`Missing marker "${marker}" in ${filePath}`);
    }
  }
}

function main() {
  const errors = [];

  for (const filePath of requiredProxyFiles) {
    assertExists(filePath, errors);
    if (fs.existsSync(path.join(root, filePath))) {
      assertMarkers(filePath, expectedProxyMarkers, errors);
    }
  }

  const projectRulesPath = 'PROJECT_RULES.md';
  assertExists(projectRulesPath, errors);
  if (fs.existsSync(path.join(root, projectRulesPath))) {
    assertMarkers(projectRulesPath, requiredRulesMarkers, errors);
  }

  if (errors.length > 0) {
    console.error('APT root surface verification failed.');
    for (const error of errors) {
      console.error(`- ${error}`);
    }
    process.exit(1);
  }

  console.log('APT root surface verification passed.');
}

if (require.main === module) {
  main();
}
