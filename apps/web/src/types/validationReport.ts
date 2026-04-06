export type ValidationSeverity = "critical" | "high" | "medium" | "low";
export type ValidationRecommendation = "pass" | "pass_with_fixes" | "fail";
export type ValidationSectionKey = "designSystem" | "architecture" | "docsGovernance" | "tests";

export interface PublicValidationSectionCheck {
  name: string;
  status: string;
  severity: ValidationSeverity;
  message: string;
}

export interface PublicValidationSection {
  status: string;
  checks: PublicValidationSectionCheck[];
}

export interface PublicValidationWaveProgress {
  id: string;
  label: string;
  enforceOn: string;
  total: number;
  passed: number;
  missing: number;
  exceptions: number;
  completionPercent: number;
}

export interface PublicValidationExceptionSummary {
  waveId: string | null;
  reason: string;
}

export interface PublicValidationReport {
  run: {
    timestamp: string | null;
    completedAt: string | null;
    durationMs: number | null;
    gitSha: string | null;
  };
  mode: "quick" | "full";
  recommendation: ValidationRecommendation;
  sections: Record<ValidationSectionKey, PublicValidationSection>;
  severitySummary: Record<ValidationSeverity, number>;
  findings: Array<{
    section: string;
    severity: ValidationSeverity;
    message: string;
    waveId: string | null;
  }>;
  exceptionSummary: PublicValidationExceptionSummary[];
  waveProgress: PublicValidationWaveProgress[];
}
