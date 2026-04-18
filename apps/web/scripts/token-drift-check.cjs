const fs = require('fs');
const path = require('path');

const WEB_ROOT = path.resolve(__dirname, '..');
const INDEX_CSS_PATH = path.join(WEB_ROOT, 'index.css');
const TOKENS_JSON_PATH = path.join(WEB_ROOT, 'docs', 'design', 'static', 'APT-TOKENS.json');

function readFile(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing required file: ${filePath}`);
  }
  return fs.readFileSync(filePath, 'utf8');
}

function normalizeCssToken(value) {
  return value.trim().replace(/;$/, '').replace(/\s+/g, ' ');
}

function normalizeHslToken(value) {
  const match = String(value || '')
    .trim()
    .match(/^hsl\(\s*([0-9.]+)\s*,\s*([0-9.]+)%\s*,\s*([0-9.]+)%\s*\)$/i);
  if (!match) {
    return null;
  }
  return `${match[1]} ${match[2]}% ${match[3]}%`;
}

function getCssBlock(content, selector) {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const blockMatch = content.match(new RegExp(`${escaped}\\s*\\{([\\s\\S]*?)\\}`, 'm'));
  if (!blockMatch) {
    throw new Error(`Unable to find CSS block for selector "${selector}"`);
  }
  return blockMatch[1];
}

function parseCssVariables(block) {
  const map = new Map();
  const regex = /(--[a-z0-9-]+)\s*:\s*([^;]+);/gi;
  let match = regex.exec(block);
  while (match) {
    map.set(match[1], normalizeCssToken(match[2]));
    match = regex.exec(block);
  }
  return map;
}

function getTokenValue(tokens, pathParts) {
  let current = tokens;
  for (const part of pathParts) {
    current = current?.[part];
  }
  return current?.value ?? null;
}

function buildComparisons(tokens) {
  const semanticKeys = [
    'background',
    'foreground',
    'card',
    'card-foreground',
    'popover',
    'popover-foreground',
    'primary',
    'primary-foreground',
    'secondary',
    'secondary-foreground',
    'muted',
    'muted-foreground',
    'accent',
    'accent-foreground',
    'destructive',
    'destructive-foreground',
    'border',
    'input',
    'ring',
  ];

  const comparisons = [];

  for (const key of semanticKeys) {
    comparisons.push({
      cssVar: `--${key}`,
      expected: normalizeHslToken(getTokenValue(tokens, ['apt', 'color', 'light', key])),
      theme: 'light',
    });
    comparisons.push({
      cssVar: `--${key}`,
      expected: normalizeHslToken(getTokenValue(tokens, ['apt', 'color', 'dark', key])),
      theme: 'dark',
    });
  }

  for (let i = 1; i <= 5; i += 1) {
    comparisons.push({
      cssVar: `--chart-${i}`,
      expected: normalizeHslToken(getTokenValue(tokens, ['apt', 'color', 'chartLight', String(i)])),
      theme: 'light',
    });
    comparisons.push({
      cssVar: `--chart-${i}`,
      expected: normalizeHslToken(getTokenValue(tokens, ['apt', 'color', 'chart', String(i)])),
      theme: 'dark',
    });
  }

  return comparisons;
}

function main() {
  const css = readFile(INDEX_CSS_PATH);
  const tokens = JSON.parse(readFile(TOKENS_JSON_PATH));

  const rootVars = parseCssVariables(getCssBlock(css, ':root'));
  const darkVars = parseCssVariables(getCssBlock(css, '.dark'));
  const comparisons = buildComparisons(tokens);

  const mismatches = [];
  const missingExpectations = [];

  for (const comparison of comparisons) {
    if (!comparison.expected) {
      missingExpectations.push(`${comparison.theme} ${comparison.cssVar}`);
      continue;
    }

    const map = comparison.theme === 'dark' ? darkVars : rootVars;
    const actual = map.get(comparison.cssVar);

    if (!actual) {
      mismatches.push(`[${comparison.theme}] ${comparison.cssVar}: missing in index.css`);
      continue;
    }

    if (actual !== comparison.expected) {
      mismatches.push(
        `[${comparison.theme}] ${comparison.cssVar}: css="${actual}" token="${comparison.expected}"`
      );
    }
  }

  if (missingExpectations.length > 0) {
    console.error('Token JSON is missing expected values for:');
    for (const entry of missingExpectations) {
      console.error(`- ${entry}`);
    }
    process.exit(1);
  }

  if (mismatches.length > 0) {
    console.error('Token drift detected between index.css and APT-TOKENS.json:');
    for (const mismatch of mismatches) {
      console.error(`- ${mismatch}`);
    }
    process.exit(1);
  }

  console.log('Token drift check passed: index.css matches APT-TOKENS.json for light/dark semantic and chart tokens.');
}

main();
