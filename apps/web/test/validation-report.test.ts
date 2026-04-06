import { createRequire } from "module";
import { describe, expect, it } from "vitest";

const require = createRequire(import.meta.url);
const {
  RECOMMENDATIONS,
  buildReport,
  computeRecommendation,
  renderMarkdownReport,
} = require("../scripts/validation-report.cjs");

describe("validation report builder", () => {
  it("computes recommendation by severity buckets", () => {
    expect(
      computeRecommendation({
        critical: [],
        high: [],
        medium: [],
        low: [],
      })
    ).toBe(RECOMMENDATIONS.pass);

    expect(
      computeRecommendation({
        critical: [],
        high: [],
        medium: [{ id: 1 }],
        low: [],
      })
    ).toBe(RECOMMENDATIONS.passWithFixes);

    expect(
      computeRecommendation({
        critical: [{ id: 1 }],
        high: [],
        medium: [],
        low: [],
      })
    ).toBe(RECOMMENDATIONS.fail);
  });

  it("builds a report contract with required top-level fields", () => {
    const report = buildReport();

    expect(report).toHaveProperty("run.timestamp");
    expect(report).toHaveProperty("run.durationMs");
    expect(report).toHaveProperty("sections.designSystem");
    expect(report).toHaveProperty("sections.architecture");
    expect(report).toHaveProperty("sections.docsGovernance");
    expect(report).toHaveProperty("sections.tests");
    expect(report).toHaveProperty("severitySummary.critical");
    expect(report).toHaveProperty("severitySummary.high");
    expect(report).toHaveProperty("severitySummary.medium");
    expect(report).toHaveProperty("severitySummary.low");
    expect(report).toHaveProperty("recommendation");
    expect(report).toHaveProperty("waveProgress");
    expect(Array.isArray(report.waveProgress)).toBe(true);
    expect(report).toHaveProperty("triage.groupedByWaveAndFolder");
    expect(report).toHaveProperty("triage.topQuickFixes");
  });

  it("renders markdown with deterministic section ordering", () => {
    const markdown = renderMarkdownReport({
      run: {
        timestamp: "2026-04-06T00:00:00.000Z",
        gitSha: "abc123",
        branch: "main",
        runner: "local",
        durationMs: 1000,
      },
      recommendation: "pass_with_fixes",
      sections: {
        designSystem: { status: "pass", checks: [] },
        architecture: { status: "pass", checks: [] },
        docsGovernance: { status: "warn", checks: [] },
        tests: { status: "not_run", checks: [] },
      },
      severitySummary: { critical: 0, high: 0, medium: 1, low: 0 },
      findings: [],
      waveProgress: [],
      triage: {
        groupedByWaveAndFolder: {},
        topQuickFixes: [],
      },
    });

    const designPos = markdown.indexOf("### designSystem");
    const architecturePos = markdown.indexOf("### architecture");
    const docsPos = markdown.indexOf("### docsGovernance");
    const testsPos = markdown.indexOf("### tests");

    expect(designPos).toBeGreaterThan(-1);
    expect(architecturePos).toBeGreaterThan(designPos);
    expect(docsPos).toBeGreaterThan(architecturePos);
    expect(testsPos).toBeGreaterThan(docsPos);
    expect(markdown.indexOf("## Wave Progress")).toBeGreaterThan(testsPos);
    expect(markdown.indexOf("## Triage (Grouped by Wave/Folder)")).toBeGreaterThan(
      markdown.indexOf("## Wave Progress")
    );
    expect(markdown.indexOf("## Top 10 Quickest Fixes")).toBeGreaterThan(
      markdown.indexOf("## Triage (Grouped by Wave/Folder)")
    );
  });
});
