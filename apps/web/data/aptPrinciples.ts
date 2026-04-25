import {
  getAptPublicDocBySourcePath,
  type AptPublicDocManifestEntry,
} from "@/data/generated/aptPrinciplesPublicManifest";

export type AptPrincipleGroupId =
  | "thinking"
  | "design"
  | "architecture"
  | "system"
  | "security"
  | "execution"
  | "quality-testing"
  | "release-change-management"
  | "operations"
  | "knowledge"
  | "ai-agent";

export type AptPrincipleDocSlug =
  | "thinking"
  | "system"
  | "architecture"
  | "system-standards"
  | "security"
  | "execution"
  | "quality-testing"
  | "release-change-management"
  | "operations-support"
  | "knowledge-engine"
  | "ai-agent-framework";

export type AptPrinciplePromptExample = {
  readonly goal: string;
  readonly inputs: readonly string[];
  readonly expectedOutputFormat: string;
};

export type AptPublicDocMeta = Pick<
  AptPublicDocManifestEntry,
  "id" | "sourcePath" | "publicPath" | "version" | "status" | "lastUpdated" | "checksum"
>;

function getAptPublicDocMeta(sourcePath: string): AptPublicDocMeta | null {
  const doc = getAptPublicDocBySourcePath(sourcePath);
  if (!doc) return null;
  return {
    id: doc.id,
    sourcePath: doc.sourcePath,
    publicPath: doc.publicPath,
    version: doc.version,
    status: doc.status,
    lastUpdated: doc.lastUpdated,
    checksum: doc.checksum,
  };
}

export type AptPrincipleGroup = {
  readonly id: AptPrincipleGroupId;
  readonly title: string;
  readonly shortTitle: string;
  readonly displayLabel: string;
  readonly framing: string;
  readonly anchor: string;
  readonly detailPath: string;
  readonly docSlug: AptPrincipleDocSlug;
  readonly sourcePath: string;
  readonly publicDocPath: string | null;
  readonly publicDocMeta: AptPublicDocMeta | null;
  readonly detailSummary: string;
  readonly focus: readonly string[];
  readonly principles: readonly string[];
  readonly outputs: readonly string[];
  readonly example: string;
  readonly aiPromptExample: AptPrinciplePromptExample;
};

export const aptPrincipleGroups: readonly AptPrincipleGroup[] = [
  {
    id: "thinking",
    title: "Thinking",
    shortTitle: "Thinking",
    displayLabel: "APT Thinking Principles (Why)",
    framing: "Why",
    anchor: "thinking-why",
    detailPath: "/design/principles/thinking",
    docSlug: "thinking",
    sourcePath: "apt-principles/thinking.md",
    publicDocPath: getAptPublicDocBySourcePath("apt-principles/thinking.md")?.publicPath ?? null,
    publicDocMeta: getAptPublicDocMeta("apt-principles/thinking.md"),
    detailSummary:
      "Thinking defines why the work exists by clarifying problem, user context, and measurable outcomes before solutioning.",
    focus: [
      "Define the problem, the user, and the outcome",
      "What problem is worth solving",
      "Who it is for",
      "What success looks like",
    ],
    principles: [
      "Problem-first, not solution-first",
      "Clear user and context definition",
      "Define measurable outcomes",
      "Explicit tradeoffs over vague intent",
      "Avoid unnecessary scope",
    ],
    outputs: ["Problem statements", "Success criteria", "User journeys", "Decision logs"],
    example:
      "Before building a new review dashboard, write a problem statement and measurable outcome (for example, reduce review handoff time by 30%).",
    aiPromptExample: {
      goal: "Frame the problem before proposing any solution.",
      inputs: [
        "Observed user pain or incident summary",
        "Known audience and usage context",
        "Current baseline metric",
      ],
      expectedOutputFormat:
        "Problem statement, measurable success criteria, and top 3 tradeoffs to manage.",
    },
  },
  {
    id: "design",
    title: "Design",
    shortTitle: "Design",
    displayLabel: "APT Design Principles (What)",
    framing: "What",
    anchor: "design-what",
    detailPath: "/design/principles/design",
    docSlug: "system",
    sourcePath: "apt-principles/design.md",
    publicDocPath: getAptPublicDocBySourcePath("apt-principles/design.md")?.publicPath ?? null,
    publicDocMeta: getAptPublicDocMeta("apt-principles/design.md"),
    detailSummary:
      "Design defines what the solution is, how it behaves, and how user interactions stay coherent across states.",
    focus: ["Define what the solution is and how it behaves", "User experience", "Functional behavior", "System interactions (conceptual)"],
    principles: [
      "Simplicity over flexibility",
      "Design complete states (loading, error, empty)",
      "Consistent interaction patterns",
      "UX clarity over feature density",
      "Reusable patterns first",
    ],
    outputs: ["UX flows", "Feature definitions", "Conceptual data models", "Interaction and state maps"],
    example:
      "When defining a new route, specify empty, loading, success, and error states before implementation so behavior is complete from day one.",
    aiPromptExample: {
      goal: "Define complete UX behavior for a feature before engineering starts.",
      inputs: [
        "Feature intent and user goal",
        "Primary user flow",
        "State requirements (loading/empty/error/success)",
      ],
      expectedOutputFormat:
        "State map, interaction rules, and concise UX acceptance criteria.",
    },
  },
  {
    id: "architecture",
    title: "Architecture",
    shortTitle: "Architecture",
    displayLabel: "APT Architecture Standards (How)",
    framing: "How",
    anchor: "architecture-how",
    detailPath: "/design/principles/architecture",
    docSlug: "architecture",
    sourcePath: "apt-principles/architecture.md",
    publicDocPath: getAptPublicDocBySourcePath("apt-principles/architecture.md")?.publicPath ?? null,
    publicDocMeta: getAptPublicDocMeta("apt-principles/architecture.md"),
    detailSummary:
      "Architecture defines technical structure, service boundaries, and API/data contracts so systems scale without coupling drift.",
    focus: ["Define how the system is structured", "Technical structure", "Boundaries and responsibilities", "Data and API design"],
    principles: [
      "API-first backend",
      "Static-first frontend",
      "Strict separation of concerns",
      "Clear service boundaries",
      "Design for change and scale",
    ],
    outputs: ["System diagrams", "API contracts (OpenAPI/GraphQL)", "Data flow definitions", "Service and module boundaries"],
    example:
      "For a new feature, define worker API contracts first, then implement frontend consumers against that contract instead of ad-hoc endpoint discovery.",
    aiPromptExample: {
      goal: "Propose a boundary-safe architecture for a new capability.",
      inputs: [
        "Feature requirements",
        "Current repo/module boundaries",
        "Existing deploy and API constraints",
      ],
      expectedOutputFormat:
        "Service boundary proposal, API contract sketch, and ownership mapping by layer.",
    },
  },
  {
    id: "system",
    title: "System",
    shortTitle: "System",
    displayLabel: "APT System Standards (Consistency)",
    framing: "Consistency",
    anchor: "system-consistency",
    detailPath: "/design/principles/system",
    docSlug: "system-standards",
    sourcePath: "apt-principles/system-standards.md",
    publicDocPath: getAptPublicDocBySourcePath("apt-principles/system-standards.md")?.publicPath ?? null,
    publicDocMeta: getAptPublicDocMeta("apt-principles/system-standards.md"),
    detailSummary:
      "System standards enforce reusable conventions through shared tokens, contracts, and versioned governance surfaces.",
    focus: ["Enforce standards across everything", "Reusability", "Consistency", "Standardization"],
    principles: [
      "Standardize early",
      "Tokens and configs as source of truth",
      "Reuse over reinvention",
      "Enforce via structure, not memory",
      "Version critical systems",
    ],
    outputs: ["Design system (tokens + components)", "API standards", "Repo structure", "Naming conventions", "Shared packages"],
    example:
      "If a new component style is needed, add a shared token/variant contract instead of introducing route-specific color utilities.",
    aiPromptExample: {
      goal: "Check whether a proposed change conforms to system standards.",
      inputs: [
        "Proposed UI or API change",
        "Current token/contract references",
        "Affected shared packages",
      ],
      expectedOutputFormat:
        "Compliance verdict, violated standards (if any), and smallest corrective change.",
    },
  },
  {
    id: "security",
    title: "Security",
    shortTitle: "Security",
    displayLabel: "APT Security & Authentication Standard",
    framing: "Protect",
    anchor: "security-protect",
    detailPath: "/design/principles/security",
    docSlug: "security",
    sourcePath: "apt-principles/security.md",
    publicDocPath: getAptPublicDocBySourcePath("apt-principles/security.md")?.publicPath ?? null,
    publicDocMeta: getAptPublicDocMeta("apt-principles/security.md"),
    detailSummary:
      "Security defines trust boundaries, authentication, authorization, sessions, secrets, and abuse controls as part of the system architecture.",
    focus: ["Protect users, data, and trust boundaries", "Authentication and authorization", "Session, secrets, and abuse controls"],
    principles: [
      "Trust is enforced server-side",
      "Authentication and authorization are separate concerns",
      "Sensitive actions need stronger controls",
      "Inputs are validated at system boundaries",
      "Security failures must be safe, traceable, and supportable",
    ],
    outputs: ["Auth/session model", "Authorization matrix", "Threat and abuse notes", "Security review evidence"],
    example:
      "For a billing settings flow, enforce server-side authorization, use step-up MFA for payout changes, rate-limit sensitive endpoints, and log audit-relevant actions.",
    aiPromptExample: {
      goal: "Review a workflow for trust-boundary and authentication risks.",
      inputs: [
        "Changed endpoints or workflows",
        "Auth/session behavior",
        "Roles, permissions, and sensitive data touched",
      ],
      expectedOutputFormat:
        "Trust-boundary map, critical findings, required fixes, validation evidence, and residual risk.",
    },
  },
  {
    id: "execution",
    title: "Execution",
    shortTitle: "Execution",
    displayLabel: "APT Execution Model (Build)",
    framing: "Build",
    anchor: "execution-build",
    detailPath: "/design/principles/execution",
    docSlug: "execution",
    sourcePath: "apt-principles/execution.md",
    publicDocPath: getAptPublicDocBySourcePath("apt-principles/execution.md")?.publicPath ?? null,
    publicDocMeta: getAptPublicDocMeta("apt-principles/execution.md"),
    detailSummary:
      "Execution converts approved specs into shipping systems via incremental delivery, preview-first validation, and automation.",
    focus: ["Turn specs into working systems", "How work gets implemented", "Development workflow"],
    principles: [
      "Spec-driven development (docs = source of truth)",
      "Small, testable increments",
      "Preview-first workflow",
      "Fail fast on bad assumptions",
      "Automate repeatable steps",
    ],
    outputs: ["Specs (Markdown)", "Tasks and tickets", "CI workflows", "Build scripts"],
    example:
      "Ship principles changes in small PRs: update data model, then UI surfaces, then docs mirror sync with validation gates between each step.",
    aiPromptExample: {
      goal: "Break a spec into small buildable increments.",
      inputs: [
        "Approved spec",
        "Current codebase state",
        "CI constraints and required checks",
      ],
      expectedOutputFormat:
        "Sequenced implementation steps with validation checkpoints per increment.",
    },
  },
  {
    id: "quality-testing",
    title: "Quality and Testing",
    shortTitle: "Quality & Testing",
    displayLabel: "APT Quality & Testing (Validate)",
    framing: "Validate",
    anchor: "quality-testing-validate",
    detailPath: "/design/principles/quality-testing",
    docSlug: "quality-testing",
    sourcePath: "apt-principles/quality-testing.md",
    publicDocPath: getAptPublicDocBySourcePath("apt-principles/quality-testing.md")?.publicPath ?? null,
    publicDocMeta: getAptPublicDocMeta("apt-principles/quality-testing.md"),
    detailSummary:
      "Quality and Testing protects release safety through layered validation, diagnostics, and deterministic build/test workflows.",
    focus: ["Ensure correctness before anything reaches users", "Prevent defects early", "Validate behavior at multiple levels"],
    principles: [
      "Fast checks first (lint -> type -> test -> build -> E2E)",
      "Test logic close to where it lives",
      "E2E tests validate journeys, not everything",
      "Preview environment must be tested",
      "Failures must produce usable diagnostics",
    ],
    outputs: ["Test suites", "CI validation pipelines", "Test artifacts (logs, traces, reports)"],
    example:
      "After nav updates, run lint/test/build plus keyboard-flow checks to confirm active states, anchors, and dropdown accessibility still behave correctly.",
    aiPromptExample: {
      goal: "Generate a focused validation plan for a change set.",
      inputs: [
        "Change summary",
        "Critical user journeys impacted",
        "Existing automated test coverage",
      ],
      expectedOutputFormat:
        "Ordered checks (lint->type->test->build->E2E), expected evidence, and fail criteria.",
    },
  },
  {
    id: "release-change-management",
    title: "Release and Change Management",
    shortTitle: "Release & Change Management",
    displayLabel: "APT Release & Change Management (Promote)",
    framing: "Promote",
    anchor: "release-change-management-promote",
    detailPath: "/design/principles/release-change-management",
    docSlug: "release-change-management",
    sourcePath: "apt-principles/release-change-management.md",
    publicDocPath: getAptPublicDocBySourcePath("apt-principles/release-change-management.md")?.publicPath ?? null,
    publicDocMeta: getAptPublicDocMeta("apt-principles/release-change-management.md"),
    detailSummary:
      "Release and Change Management governs safe promotion, clear traceability, and intentional production change communication.",
    focus: ["Control how changes move to production and are understood", "Safe promotion of changes", "Clear visibility of what changed"],
    principles: [
      "Every change must be traceable",
      "Preview is required before production",
      "Production releases are intentional",
      "Changelog is a required artifact",
      "Group changes into meaningful releases",
      "Support must understand every release",
    ],
    outputs: ["CHANGELOG.md", "Release notes", "Version tags", "Deployment records"],
    example:
      "Bundle nav IA updates and principles content updates into one documented release note so stakeholders can trace what changed and why.",
    aiPromptExample: {
      goal: "Prepare a release-ready change summary with clear traceability.",
      inputs: [
        "Merged PR list",
        "Validation artifacts",
        "Deployment plan and rollback notes",
      ],
      expectedOutputFormat:
        "Release notes draft, risk summary, and promotion checklist with owner assignments.",
    },
  },
  {
    id: "operations",
    title: "Operations",
    shortTitle: "Operations",
    displayLabel: "APT Operations & Support Thinking (Run & Support)",
    framing: "Run & Support",
    anchor: "operations-support-run-support",
    detailPath: "/design/principles/operations",
    docSlug: "operations-support",
    sourcePath: "apt-principles/operations-support.md",
    publicDocPath: getAptPublicDocBySourcePath("apt-principles/operations-support.md")?.publicPath ?? null,
    publicDocMeta: getAptPublicDocMeta("apt-principles/operations-support.md"),
    detailSummary:
      "Operations and Support sustains reliability through observability, incident readiness, and support-informed feedback loops.",
    focus: ["Keep the system running and support users effectively", "Stability", "Observability", "Support workflows"],
    principles: [
      "Design for support from day one",
      "Everything must be observable",
      "Actions must be traceable",
      "Support feedback drives improvements",
      "Systems should explain themselves",
    ],
    outputs: ["Logging and monitoring", "Alerts and dashboards", "Support playbooks", "Incident workflows"],
    example:
      "Add clear failure messaging and traceable logs for docs downloads so support can diagnose whether issues are config, routing, or artifact-related.",
    aiPromptExample: {
      goal: "Create an operations-ready incident response starter for a feature.",
      inputs: [
        "Service/component description",
        "Known failure modes",
        "Current observability signals",
      ],
      expectedOutputFormat:
        "Alert conditions, first-response steps, and escalation workflow in runbook form.",
    },
  },
  {
    id: "knowledge",
    title: "Knowledge",
    shortTitle: "Knowledge",
    displayLabel: "APT Knowledge System (Learn & Scale)",
    framing: "Learn & Scale",
    anchor: "knowledge-learn-scale",
    detailPath: "/design/principles/knowledge",
    docSlug: "knowledge-engine",
    sourcePath: "apt-principles/knowledge-system.md",
    publicDocPath: getAptPublicDocBySourcePath("apt-principles/knowledge-system.md")?.publicPath ?? null,
    publicDocMeta: getAptPublicDocMeta("apt-principles/knowledge-system.md"),
    detailSummary:
      "Knowledge converts decisions and outcomes into reusable, versioned assets that scale understanding for humans and AI.",
    focus: ["Capture and reuse what is learned", "Documentation", "Knowledge reuse", "Long-term efficiency"],
    principles: [
      "Document once, reuse everywhere",
      "Separate internal vs external knowledge",
      "Structure knowledge for both humans and AI",
      "Keep knowledge versioned",
      "Avoid duplication",
    ],
    outputs: ["Documentation systems", "Knowledge base", "Training content", "AI-ingestible markdown"],
    example:
      "Keep principles content in one canonical source file and consume it in both route UIs and docs to prevent doctrine drift.",
    aiPromptExample: {
      goal: "Turn project learnings into reusable knowledge artifacts.",
      inputs: [
        "Decision log entries",
        "Release outcomes and incidents",
        "Audience (human, AI, or both)",
      ],
      expectedOutputFormat:
        "Versioned knowledge update with concise summary, canonical links, and reusable guidance bullets.",
    },
  },
  {
    id: "ai-agent",
    title: "AI / Agent",
    shortTitle: "AI / Agent",
    displayLabel: "APT AI & Agent Framework (Augmentation Layer)",
    framing: "Augmentation Layer",
    anchor: "ai-agent-augmentation-layer",
    detailPath: "/design/principles/ai-agent",
    docSlug: "ai-agent-framework",
    sourcePath: "apt-principles/ai-agent-framework.md",
    publicDocPath: getAptPublicDocBySourcePath("apt-principles/ai-agent-framework.md")?.publicPath ?? null,
    publicDocMeta: getAptPublicDocMeta("apt-principles/ai-agent-framework.md"),
    detailSummary:
      "AI & Agent framework standardizes prompt governance, agent contracts, and evaluation guardrails across every lifecycle layer.",
    focus: ["Use AI to accelerate, not replace, structured thinking", "AI-assisted development", "Agent workflows", "Prompt standardization"],
    principles: [
      "AI follows system structure",
      "Prompts map to APT layers",
      "Deterministic inputs -> reliable outputs",
      "Guardrails over creativity in production",
      "AI enhances execution, not direction",
    ],
    outputs: ["One-shot prompts", "Copilot instructions", "Agent workflows", "Evaluation frameworks"],
    example:
      "Use a structured review prompt tied to principle groups so AI feedback maps directly to APT standards instead of generic style advice.",
    aiPromptExample: {
      goal: "Define an agent-ready prompt contract tied to APT standards.",
      inputs: [
        "Task intent and boundaries",
        "Required doctrine sources",
        "Expected deterministic output structure",
      ],
      expectedOutputFormat:
        "Prompt template with guardrails, validation criteria, and machine-readable output schema notes.",
    },
  },
] as const;

export const aptLifecycleFlow: readonly AptPrincipleGroupId[] = [
  "thinking",
  "design",
  "architecture",
  "system",
  "security",
  "execution",
  "quality-testing",
  "release-change-management",
  "operations",
  "knowledge",
] as const;

export const aptAiOverlayGroupId: AptPrincipleGroupId = "ai-agent";

export type AptPrinciplesIndexItem = {
  readonly id: "framework" | AptPrincipleGroupId;
  readonly label: string;
  readonly path: string;
  readonly frameworkPath?: string;
  readonly description: string;
};

export const aptPrinciplesFrameworkSourcePath = "apt-principles/apt-principles.md" as const;
export const aptPrinciplesFrameworkPublicDocMeta = getAptPublicDocMeta(aptPrinciplesFrameworkSourcePath);
export const aptPrinciplesFrameworkPublicDocPath = aptPrinciplesFrameworkPublicDocMeta?.publicPath ?? null;

export function getAptPrinciplesFrameworkDocMeta(): AptPublicDocMeta | null {
  return aptPrinciplesFrameworkPublicDocMeta;
}

export function getAptPublicDocMetaBySourcePath(sourcePath: string): AptPublicDocMeta | null {
  return getAptPublicDocMeta(sourcePath);
}

export const aptPrincipleGroupsById: Record<AptPrincipleGroupId, AptPrincipleGroup> = aptPrincipleGroups.reduce(
  (acc, group) => {
    acc[group.id] = group;
    return acc;
  },
  {} as Record<AptPrincipleGroupId, AptPrincipleGroup>
);

export function getAptPrincipleGroup(id: AptPrincipleGroupId): AptPrincipleGroup {
  return aptPrincipleGroupsById[id];
}

export function getAptPrincipleGroups(ids: readonly AptPrincipleGroupId[]): AptPrincipleGroup[] {
  return ids.map((id) => getAptPrincipleGroup(id)).filter(Boolean);
}

export function getAptPrincipleGroupByRouteSegment(segment: string): AptPrincipleGroup | null {
  const match = aptPrincipleGroups.find((group) => group.id === segment);
  return match || null;
}

export function getAptAdjacentPrincipleGroups(id: AptPrincipleGroupId): {
  previous: AptPrincipleGroup | null;
  next: AptPrincipleGroup | null;
} {
  const index = aptPrincipleGroups.findIndex((group) => group.id === id);
  if (index < 0) {
    return { previous: null, next: null };
  }

  return {
    previous: index > 0 ? aptPrincipleGroups[index - 1] : null,
    next: index < aptPrincipleGroups.length - 1 ? aptPrincipleGroups[index + 1] : null,
  };
}

export const aptPrinciplesFrameworkIndex: readonly AptPrinciplesIndexItem[] = [
  {
    id: "framework",
    label: "APT Principles Framework",
    path: "/design/principles",
    description: "Canonical full model and lifecycle map.",
  },
  ...aptPrincipleGroups.map((group) => ({
    id: group.id,
    label: group.displayLabel,
    path: group.detailPath,
    frameworkPath: `/design/principles#${group.anchor}`,
    description: `${group.shortTitle} governance layer and expected outputs.`,
  })),
] as const;

export const aptPrinciplesNavSections: readonly {
  label: string;
  path: string;
  description: string;
  tagline?: string;
}[] = [
  {
    label: "Framework Overview",
    path: "/design/principles",
    description: "Canonical APT model with source-backed doctrine and lifecycle map.",
    tagline: "Start here for the complete framework.",
  },
  {
    label: "Thinking (Why)",
    path: "/design/principles/thinking",
    description: "Problem framing and measurable outcome definition before solutioning.",
  },
  {
    label: "Execution (Build)",
    path: "/design/principles/execution",
    description: "Spec-to-implementation delivery model with incremental validation.",
  },
  {
    label: "AI & Agent",
    path: "/design/principles/ai-agent",
    description: "Prompt governance and agent contract standards across lifecycle layers.",
  },
  {
    label: "Design System",
    path: "/design/system",
    description: "Visual tokens, component semantics, and usage doctrine.",
    tagline: "How APT keeps UI consistent and accessible.",
  },
  {
    label: "Design Architecture",
    path: "/design/architecture",
    description: "Boundaries, ownership, deployment contracts, and enforcement.",
    tagline: "How systems stay structurally correct.",
  },
  {
    label: "Content Strategy",
    path: "/design/content-strategy",
    description: "Information architecture, naming, and navigation clarity.",
    tagline: "How doctrine stays discoverable and usable.",
  },
  {
    label: "AI Review Bundle",
    path: "/design/review-bundle",
    description: "Starter packs and full review artifacts for AI and human review.",
    tagline: "Portable standards-based review handoff.",
  },
  {
    label: "Docs Browser",
    path: "/design/docs",
    description: "Manifest-driven browsing of versioned doctrine and patterns.",
    tagline: "Browse canonical docs by governed metadata.",
  },
] as const;
