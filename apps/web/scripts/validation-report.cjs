const fs = require('fs');
const path = require('path');
const { execSync, spawnSync } = require('child_process');
const {
  assertDesignDocAliasesInSync,
  assertAuditedDoctrineMetadataContract,
} = require('./copy-content-to-public.cjs');
const { generateFrontmatterReport } = require('./frontmatter-report.cjs');

const WEB_ROOT = path.resolve(__dirname, '..');
const REPO_ROOT = path.resolve(__dirname, '../../..');
const REPORTS_ROOT = path.join(REPO_ROOT, 'reports', 'validation');
const SEVERITY_ORDER = ['critical', 'high', 'medium', 'low'];
const RECOMMENDATIONS = {
  pass: 'pass',
  passWithFixes: 'pass_with_fixes',
  fail: 'fail',
};
const PUBLIC_REPORT_FILENAMES = {
  json: 'LATEST.public.json',
  md: 'LATEST.public.md',
};

function normalizeText(value) {
  return String(value || '').trim();
}

function nowIso() {
  return new Date().toISOString();
}

function timestampForFilename(isoTimestamp) {
  return isoTimestamp.replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z');
}

function safeExec(command, cwd = REPO_ROOT) {
  try {
    return normalizeText(execSync(command, { cwd, stdio: ['ignore', 'pipe', 'ignore'] }).toString('utf8'));
  } catch {
    return '';
  }
}

function getRunMetadata(startedAtIso, endedAtIso) {
  const startedMs = Date.parse(startedAtIso);
  const endedMs = Date.parse(endedAtIso);
  return {
    timestamp: startedAtIso,
    completedAt: endedAtIso,
    durationMs: Number.isFinite(startedMs) && Number.isFinite(endedMs) ? Math.max(0, endedMs - startedMs) : null,
    gitSha: safeExec('git rev-parse --short HEAD'),
    branch: safeExec('git rev-parse --abbrev-ref HEAD'),
    runner:
      process.env.GITHUB_ACTIONS === 'true'
        ? 'github-actions'
        : process.env.USERNAME || process.env.USER || 'local',
  };
}

function pushFinding(findings, section, severity, message, details = {}) {
  findings.push({
    section,
    severity,
    message,
    ...details,
  });
}

function runHardCheck(checkName, fn, section, findings) {
  const startedAt = nowIso();
  try {
    fn();
    return {
      name: checkName,
      section,
      status: 'pass',
      severity: 'low',
      message: `${checkName} passed`,
      startedAt,
      endedAt: nowIso(),
    };
  } catch (error) {
    const message = normalizeText(error && error.message ? error.message : error);
    pushFinding(findings, section, 'critical', `${checkName} failed`, { details: message });
    return {
      name: checkName,
      section,
      status: 'fail',
      severity: 'critical',
      message: `${checkName} failed`,
      details: message,
      startedAt,
      endedAt: nowIso(),
    };
  }
}

function runOptionalTests(section, findings) {
  const startedAt = nowIso();
  const result = {
    name: 'apps-web-tests',
    section,
    status: 'not_run',
    severity: 'low',
    message: 'tests not requested',
    startedAt,
    endedAt: nowIso(),
    exitCode: null,
  };

  const pnpmCommand = process.platform === 'win32' ? 'pnpm.cmd' : 'pnpm';
  const corepackCommand = process.platform === 'win32' ? 'corepack.cmd' : 'corepack';
  const vitestBin = path.join(WEB_ROOT, 'node_modules', 'vitest', 'vitest.mjs');
  let run = spawnSync(process.execPath, [vitestBin, 'run'], {
    cwd: WEB_ROOT,
    encoding: 'utf8',
  });

  if (run.error && run.error.code === 'ENOENT') {
    run = spawnSync(pnpmCommand, ['run', 'test'], {
      cwd: WEB_ROOT,
      encoding: 'utf8',
    });
  }

  if (run.error && run.error.code === 'ENOENT') {
    run = spawnSync(corepackCommand, ['pnpm', 'run', 'test'], {
      cwd: WEB_ROOT,
      encoding: 'utf8',
    });
  }

  result.exitCode = typeof run.status === 'number' ? run.status : 1;
  result.startedAt = startedAt;
  result.endedAt = nowIso();

  const combinedOutput = normalizeText(`${run.stdout || ''}\n${run.stderr || ''}`);
  const outputPreview = combinedOutput.length > 1200 ? `${combinedOutput.slice(0, 1200)}...` : combinedOutput;

  if (run.error && run.error.code === 'ENOENT') {
    result.status = 'not_run';
    result.message = 'apps/web test command unavailable in this environment';
    result.severity = 'low';
    result.details = normalizeText(run.error.message);
    return result;
  }

  if (result.exitCode === 0) {
    result.status = 'pass';
    result.message = 'apps/web test passed';
    result.severity = 'low';
    return result;
  }

  result.status = 'fail';
  result.message = 'apps/web test failed';
  result.severity = 'high';
  result.details = outputPreview;
  pushFinding(findings, section, 'high', result.message, { details: outputPreview });
  return result;
}

function bucketFindings(findings) {
  const buckets = {
    critical: [],
    high: [],
    medium: [],
    low: [],
  };

  for (const finding of findings) {
    if (!buckets[finding.severity]) {
      buckets.low.push(finding);
      continue;
    }
    buckets[finding.severity].push(finding);
  }

  return buckets;
}

function computeRecommendation(buckets) {
  if (buckets.critical.length > 0 || buckets.high.length > 0) return RECOMMENDATIONS.fail;
  if (buckets.medium.length > 0 || buckets.low.length > 0) return RECOMMENDATIONS.passWithFixes;
  return RECOMMENDATIONS.pass;
}

function toPercent(passed, total) {
  if (!total || total <= 0) return 100;
  return Math.round((passed / total) * 1000) / 10;
}

function groupFindingsByWaveAndFolder(findings) {
  const grouped = {};
  const sorted = [...findings].sort((a, b) => {
    const waveCompare = normalizeText(a.waveId).localeCompare(normalizeText(b.waveId));
    if (waveCompare !== 0) return waveCompare;
    return normalizeText(a.relativePath).localeCompare(normalizeText(b.relativePath));
  });

  for (const finding of sorted) {
    const wave = finding.waveId || 'unscoped';
    const relativePath = finding.relativePath || '';
    const folder = relativePath.includes('/') ? relativePath.slice(0, relativePath.lastIndexOf('/')) : '.';
    if (!grouped[wave]) grouped[wave] = {};
    if (!grouped[wave][folder]) grouped[wave][folder] = [];
    grouped[wave][folder].push({
      relativePath: finding.relativePath,
      message: finding.message,
      missingKeys: finding.missingKeys || [],
      missingKeyCount:
        Number.isInteger(finding.missingKeyCount) ? finding.missingKeyCount : (finding.missingKeys || []).length,
      charCount: Number.isInteger(finding.charCount) ? finding.charCount : null,
      lineCount: Number.isInteger(finding.lineCount) ? finding.lineCount : null,
    });
  }

  return grouped;
}

function computeTopQuickFixes(findings, limit = 10) {
  return [...findings]
    .filter((finding) => finding.section === 'docsGovernance' && finding.relativePath)
    .sort((a, b) => {
      const missingA = Number.isInteger(a.missingKeyCount) ? a.missingKeyCount : (a.missingKeys || []).length;
      const missingB = Number.isInteger(b.missingKeyCount) ? b.missingKeyCount : (b.missingKeys || []).length;
      if (missingB !== missingA) return missingB - missingA;
      const charsA = Number.isInteger(a.charCount) ? a.charCount : Number.MAX_SAFE_INTEGER;
      const charsB = Number.isInteger(b.charCount) ? b.charCount : Number.MAX_SAFE_INTEGER;
      if (charsA !== charsB) return charsA - charsB;
      return normalizeText(a.relativePath).localeCompare(normalizeText(b.relativePath));
    })
    .slice(0, limit)
    .map((finding) => ({
      relativePath: finding.relativePath,
      waveId: finding.waveId || 'unscoped',
      missingKeys: finding.missingKeys || [],
      missingKeyCount:
        Number.isInteger(finding.missingKeyCount) ? finding.missingKeyCount : (finding.missingKeys || []).length,
      charCount: Number.isInteger(finding.charCount) ? finding.charCount : null,
      lineCount: Number.isInteger(finding.lineCount) ? finding.lineCount : null,
    }));
}

function collectDeclaredExceptions(frontmatterReport) {
  const entries = Array.isArray(frontmatterReport.entries) ? frontmatterReport.entries : [];
  return entries
    .filter((entry) => Boolean(entry.exceptionReason))
    .map((entry) => ({
      relativePath: entry.relativePath,
      waveId: entry.waveId || 'unscoped',
      reason: entry.exceptionReason,
    }))
    .sort((a, b) => {
      const waveCompare = normalizeText(a.waveId).localeCompare(normalizeText(b.waveId));
      if (waveCompare !== 0) return waveCompare;
      return normalizeText(a.relativePath).localeCompare(normalizeText(b.relativePath));
    });
}

function toSectionStatus(checks) {
  if (checks.some((check) => check.status === 'fail')) return 'fail';
  if (checks.some((check) => check.status === 'warn')) return 'warn';
  return 'pass';
}

function buildSections({ aliasCheck, auditedCheck, frontmatter, testsResult }) {
  const waveLookup = new Map((frontmatter.waves || []).map((wave) => [wave.id, wave]));
  const wave1 = waveLookup.get('wave1') || { missing: 0 };
  const wave2 = waveLookup.get('wave2') || { missing: 0 };

  const designSystemChecks = [
    {
      name: 'audited-doctrine-metadata',
      status: auditedCheck.status,
      severity: auditedCheck.severity,
      message: auditedCheck.message,
    },
    {
      name: 'frontmatter-wave1',
      status: wave1.missing > 0 ? 'warn' : 'pass',
      severity: wave1.missing > 0 ? 'medium' : 'low',
      message: `Wave 1 missing metadata files: ${wave1.missing}`,
    },
  ];

  const architectureChecks = [
    {
      name: 'design-doc-alias-policy',
      status: aliasCheck.status,
      severity: aliasCheck.severity,
      message: aliasCheck.message,
    },
    {
      name: 'frontmatter-wave2',
      status: wave2.missing > 0 ? 'warn' : 'pass',
      severity: wave2.missing > 0 ? 'medium' : 'low',
      message: `Wave 2 missing metadata files: ${wave2.missing}`,
    },
  ];

  const docsGovernanceChecks = [
    {
      name: 'frontmatter-report',
      status: frontmatter.missingCount > 0 ? 'warn' : 'pass',
      severity: frontmatter.missingCount > 0 ? 'medium' : 'low',
      message: `Frontmatter gaps in scoped docs: ${frontmatter.missingCount}`,
    },
  ];

  const testChecks = [
    {
      name: testsResult.name,
      status: testsResult.status,
      severity: testsResult.severity,
      message: testsResult.message,
    },
  ];

  return {
    designSystem: {
      status: toSectionStatus(designSystemChecks),
      checks: designSystemChecks,
    },
    architecture: {
      status: toSectionStatus(architectureChecks),
      checks: architectureChecks,
    },
    docsGovernance: {
      status: toSectionStatus(docsGovernanceChecks),
      checks: docsGovernanceChecks,
      frontmatter: {
        scannedCount: frontmatter.scannedCount,
        inScopeCount: frontmatter.inScopeCount,
        missingCount: frontmatter.missingCount,
        waves: frontmatter.waves,
      },
    },
    tests: {
      status: toSectionStatus(testChecks),
      checks: testChecks,
    },
  };
}

function renderMarkdownReport(report) {
  const lines = [];
  lines.push('# APT Validation Report');
  lines.push('');
  lines.push(`- Timestamp: ${report.run.timestamp}`);
  lines.push(`- Git SHA: ${report.run.gitSha || 'unknown'}`);
  lines.push(`- Branch: ${report.run.branch || 'unknown'}`);
  lines.push(`- Runner: ${report.run.runner}`);
  lines.push(`- Duration: ${report.run.durationMs === null ? 'unknown' : `${report.run.durationMs}ms`}`);
  lines.push(`- Recommendation: ${report.recommendation}`);
  lines.push('');
  lines.push('## Section Outcomes');
  lines.push('');

  const sectionOrder = ['designSystem', 'architecture', 'docsGovernance', 'tests'];
  for (const sectionName of sectionOrder) {
    const section = report.sections[sectionName];
    lines.push(`### ${sectionName}`);
    lines.push(`- Status: ${section.status}`);
    for (const check of section.checks) {
      lines.push(`- ${check.name}: ${check.status} (${check.severity}) - ${check.message}`);
    }
    lines.push('');
  }

  lines.push('## Severity Summary');
  lines.push('');
  for (const severity of SEVERITY_ORDER) {
    lines.push(`- ${severity}: ${report.severitySummary[severity]}`);
  }
  lines.push('');

  lines.push('## Findings');
  lines.push('');
  if (report.findings.length === 0) {
    lines.push('- None');
  } else {
    for (const finding of report.findings) {
      lines.push(`- [${finding.severity}] ${finding.section}: ${finding.message}`);
      if (finding.details) {
        lines.push(`  - details: ${finding.details}`);
      }
      if (finding.relativePath) {
        lines.push(`  - path: ${finding.relativePath}`);
      }
    }
  }
  lines.push('');

  lines.push('## Exception Summary');
  lines.push('');
  if (!Array.isArray(report.exceptionSummary) || report.exceptionSummary.length === 0) {
    lines.push('- None');
  } else {
    for (const exception of report.exceptionSummary) {
      lines.push(`- ${exception.relativePath} [${exception.waveId}] - ${exception.reason}`);
    }
  }
  lines.push('');

  lines.push('## Wave Progress');
  lines.push('');
  for (const wave of report.waveProgress || []) {
    lines.push(
      `- ${wave.id} (${wave.label}): passed=${wave.passed}/${wave.total}, missing=${wave.missing}, exceptions=${wave.exceptions}, complete=${wave.completionPercent}%`
    );
  }
  lines.push('');

  lines.push('## Triage (Grouped by Wave/Folder)');
  lines.push('');
  const waveIds = Object.keys(report.triage?.groupedByWaveAndFolder || {}).sort();
  if (waveIds.length === 0) {
    lines.push('- None');
  } else {
    for (const waveId of waveIds) {
      lines.push(`### ${waveId}`);
      const folders = Object.keys(report.triage.groupedByWaveAndFolder[waveId] || {}).sort();
      for (const folder of folders) {
        lines.push(`- ${folder}`);
        for (const item of report.triage.groupedByWaveAndFolder[waveId][folder]) {
          lines.push(`  - ${item.relativePath} (missing: ${item.missingKeyCount}, chars: ${item.charCount ?? 'n/a'})`);
        }
      }
      lines.push('');
    }
  }

  lines.push('## Top 10 Quickest Fixes');
  lines.push('');
  if (!report.triage?.topQuickFixes || report.triage.topQuickFixes.length === 0) {
    lines.push('- None');
  } else {
    for (const item of report.triage.topQuickFixes) {
      lines.push(
        `- ${item.relativePath} [${item.waveId}] missing=${item.missingKeyCount} chars=${item.charCount ?? 'n/a'}`
      );
    }
  }
  lines.push('');

  return `${lines.join('\n')}\n`;
}

function sanitizeReportForPublic(report) {
  const safeRun = {
    timestamp: report?.run?.timestamp || null,
    completedAt: report?.run?.completedAt || null,
    durationMs: report?.run?.durationMs ?? null,
    gitSha: report?.run?.gitSha || null,
  };

  const safeFindings = Array.isArray(report?.findings)
    ? report.findings.map((finding) => ({
        section: finding.section,
        severity: finding.severity,
        message: finding.message,
        waveId: finding.waveId || null,
      }))
    : [];

  const safeExceptions = Array.isArray(report?.exceptionSummary)
    ? report.exceptionSummary.map((entry) => ({
        waveId: entry.waveId || null,
        reason: entry.reason || '',
      }))
    : [];

  return {
    run: safeRun,
    mode: report?.mode || 'quick',
    recommendation: report?.recommendation || RECOMMENDATIONS.pass,
    sections: report?.sections || {},
    severitySummary: report?.severitySummary || { critical: 0, high: 0, medium: 0, low: 0 },
    findings: safeFindings,
    exceptionSummary: safeExceptions,
    waveProgress: Array.isArray(report?.waveProgress) ? report.waveProgress : [],
    triage: report?.triage || { groupedByWaveAndFolder: {}, topQuickFixes: [] },
    checks: report?.checks || {},
  };
}

function renderPublicMarkdownReport(report) {
  const lines = [];
  lines.push('# APT Validation Report (Public)');
  lines.push('');
  lines.push(`- Timestamp: ${report.run.timestamp || 'unknown'}`);
  lines.push(`- Duration: ${report.run.durationMs === null ? 'unknown' : `${report.run.durationMs}ms`}`);
  lines.push(`- Recommendation: ${report.recommendation}`);
  lines.push('');
  lines.push('## Section Outcomes');
  lines.push('');

  const sectionOrder = ['designSystem', 'architecture', 'docsGovernance', 'tests'];
  for (const sectionName of sectionOrder) {
    const section = report.sections[sectionName];
    if (!section) continue;
    lines.push(`### ${sectionName}`);
    lines.push(`- Status: ${section.status}`);
    for (const check of section.checks || []) {
      lines.push(`- ${check.name}: ${check.status} (${check.severity}) - ${check.message}`);
    }
    lines.push('');
  }

  lines.push('## Severity Summary');
  lines.push('');
  for (const severity of SEVERITY_ORDER) {
    lines.push(`- ${severity}: ${report.severitySummary[severity]}`);
  }
  lines.push('');

  lines.push('## Findings');
  lines.push('');
  if (!Array.isArray(report.findings) || report.findings.length === 0) {
    lines.push('- None');
  } else {
    for (const finding of report.findings) {
      lines.push(`- [${finding.severity}] ${finding.section}: ${finding.message}`);
    }
  }
  lines.push('');

  lines.push('## Exception Summary');
  lines.push('');
  if (!Array.isArray(report.exceptionSummary) || report.exceptionSummary.length === 0) {
    lines.push('- None');
  } else {
    for (const exception of report.exceptionSummary) {
      lines.push(`- [${exception.waveId || 'unscoped'}] ${exception.reason}`);
    }
  }
  lines.push('');

  lines.push('## Wave Progress');
  lines.push('');
  for (const wave of report.waveProgress || []) {
    lines.push(
      `- ${wave.id} (${wave.label}): passed=${wave.passed}/${wave.total}, missing=${wave.missing}, exceptions=${wave.exceptions}, complete=${wave.completionPercent}%`
    );
  }
  lines.push('');

  return `${lines.join('\n')}\n`;
}

function ensureReportsDir() {
  fs.mkdirSync(REPORTS_ROOT, { recursive: true });
}

function writeReportArtifacts(report) {
  ensureReportsDir();
  const stamp = timestampForFilename(report.run.timestamp);
  const jsonName = `validation-${stamp}.json`;
  const mdName = `validation-${stamp}.md`;
  const jsonPath = path.join(REPORTS_ROOT, jsonName);
  const mdPath = path.join(REPORTS_ROOT, mdName);
  const latestJsonPath = path.join(REPORTS_ROOT, 'LATEST.json');
  const latestMdPath = path.join(REPORTS_ROOT, 'LATEST.md');

  const markdown = renderMarkdownReport(report);
  fs.writeFileSync(jsonPath, `${JSON.stringify(report, null, 2)}\n`, 'utf8');
  fs.writeFileSync(mdPath, markdown, 'utf8');
  fs.writeFileSync(latestJsonPath, `${JSON.stringify(report, null, 2)}\n`, 'utf8');
  fs.writeFileSync(latestMdPath, markdown, 'utf8');

  return {
    jsonPath,
    mdPath,
    latestJsonPath,
    latestMdPath,
  };
}

function writePublicReportArtifacts(report) {
  ensureReportsDir();
  const publicJsonPath = path.join(REPORTS_ROOT, PUBLIC_REPORT_FILENAMES.json);
  const publicMdPath = path.join(REPORTS_ROOT, PUBLIC_REPORT_FILENAMES.md);
  const publicReport = sanitizeReportForPublic(report);
  const publicMarkdown = renderPublicMarkdownReport(publicReport);

  fs.writeFileSync(publicJsonPath, `${JSON.stringify(publicReport, null, 2)}\n`, 'utf8');
  fs.writeFileSync(publicMdPath, publicMarkdown, 'utf8');

  return {
    publicJsonPath,
    publicMdPath,
  };
}

function buildReport({ includeTests = false } = {}) {
  const startedAt = nowIso();
  const findings = [];

  const aliasCheck = runHardCheck(
    'verify-design-doc-alias-sync',
    () => assertDesignDocAliasesInSync(),
    'architecture',
    findings
  );
  const auditedCheck = runHardCheck(
    'verify-audited-doctrine-metadata',
    () => assertAuditedDoctrineMetadataContract(),
    'designSystem',
    findings
  );

  const frontmatter = generateFrontmatterReport();
  for (const entry of frontmatter.missingEntries || []) {
    pushFinding(findings, 'docsGovernance', 'medium', `Missing frontmatter metadata: ${entry.relativePath}`, {
      relativePath: entry.relativePath,
      waveId: entry.waveId,
      missingKeys: entry.missingKeys,
      missingKeyCount: entry.missingKeys.length,
      charCount: entry.charCount,
      lineCount: entry.lineCount,
    });
  }

  const testsResult = includeTests
    ? runOptionalTests('tests', findings)
    : {
        name: 'apps-web-tests',
        status: 'not_run',
        severity: 'low',
        message: 'tests not requested',
      };

  const buckets = bucketFindings(findings);
  const recommendation = computeRecommendation(buckets);
  const endedAt = nowIso();
  const sections = buildSections({ aliasCheck, auditedCheck, frontmatter, testsResult });
  const waveProgress = (frontmatter.waves || []).map((wave) => ({
    id: wave.id,
    label: wave.label,
    enforceOn: wave.enforceOn,
    total: wave.total,
    passed: wave.passed,
    missing: wave.missing,
    exceptions: wave.exceptions,
    completionPercent: toPercent(wave.passed, wave.total),
  }));
  const triageFindings = findings.filter((finding) => finding.section === 'docsGovernance');
  const triage = {
    groupedByWaveAndFolder: groupFindingsByWaveAndFolder(triageFindings),
    topQuickFixes: computeTopQuickFixes(triageFindings, 10),
  };
  const exceptionSummary = collectDeclaredExceptions(frontmatter);

  return {
    run: getRunMetadata(startedAt, endedAt),
    mode: includeTests ? 'full' : 'quick',
    recommendation,
    sections,
    severitySummary: {
      critical: buckets.critical.length,
      high: buckets.high.length,
      medium: buckets.medium.length,
      low: buckets.low.length,
    },
    findings,
    exceptionSummary,
    waveProgress,
    triage,
    checks: {
      verifyDesignDocAliasSync: aliasCheck.status,
      verifyAuditedDoctrineMetadata: auditedCheck.status,
      frontmatterReport: frontmatter.missingCount > 0 ? 'warn' : 'pass',
      tests: testsResult.status,
    },
  };
}

function parseArgs(argv) {
  return {
    includeTests: argv.includes('--full'),
  };
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const report = buildReport({ includeTests: args.includeTests });
  const artifacts = writeReportArtifacts(report);
  const publicArtifacts = writePublicReportArtifacts(report);

  console.log('Validation report written:');
  console.log(`- ${artifacts.jsonPath}`);
  console.log(`- ${artifacts.mdPath}`);
  console.log(`- ${artifacts.latestJsonPath}`);
  console.log(`- ${artifacts.latestMdPath}`);
  console.log(`- ${publicArtifacts.publicJsonPath}`);
  console.log(`- ${publicArtifacts.publicMdPath}`);
  console.log(`Recommendation: ${report.recommendation}`);

  if (report.checks.verifyDesignDocAliasSync !== 'pass' || report.checks.verifyAuditedDoctrineMetadata !== 'pass') {
    process.exitCode = 1;
  }
}

if (require.main === module) {
  main();
}

module.exports = {
  PUBLIC_REPORT_FILENAMES,
  RECOMMENDATIONS,
  SEVERITY_ORDER,
  bucketFindings,
  buildReport,
  computeRecommendation,
  renderMarkdownReport,
  renderPublicMarkdownReport,
  sanitizeReportForPublic,
  timestampForFilename,
  writePublicReportArtifacts,
  writeReportArtifacts,
};
