export type AptPrincipleGroupId =
  | "thinking"
  | "design"
  | "architecture"
  | "system"
  | "execution"
  | "quality-testing"
  | "release-change-management"
  | "operations"
  | "knowledge"
  | "ai-agent";

export type AptPrincipleGroup = {
  readonly id: AptPrincipleGroupId;
  readonly title: string;
  readonly shortTitle: string;
  readonly displayLabel: string;
  readonly framing: string;
  readonly anchor: string;
  readonly focus: readonly string[];
  readonly principles: readonly string[];
  readonly outputs: readonly string[];
  readonly example: string;
};

export const aptPrincipleGroups: readonly AptPrincipleGroup[] = [
  {
    id: "thinking",
    title: "Thinking",
    shortTitle: "Thinking",
    displayLabel: "APT Thinking Principles (Why)",
    framing: "Why",
    anchor: "thinking-why",
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
  },
  {
    id: "design",
    title: "Design",
    shortTitle: "Design",
    displayLabel: "APT Design Principles (What)",
    framing: "What",
    anchor: "design-what",
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
  },
  {
    id: "architecture",
    title: "Architecture",
    shortTitle: "Architecture",
    displayLabel: "APT Architecture Standards (How)",
    framing: "How",
    anchor: "architecture-how",
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
  },
  {
    id: "system",
    title: "System",
    shortTitle: "System",
    displayLabel: "APT System Standards (Consistency)",
    framing: "Consistency",
    anchor: "system-consistency",
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
  },
  {
    id: "execution",
    title: "Execution",
    shortTitle: "Execution",
    displayLabel: "APT Execution Model (Build)",
    framing: "Build",
    anchor: "execution-build",
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
  },
  {
    id: "quality-testing",
    title: "Quality and Testing",
    shortTitle: "Quality & Testing",
    displayLabel: "APT Quality & Testing (Validate)",
    framing: "Validate",
    anchor: "quality-testing-validate",
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
  },
  {
    id: "release-change-management",
    title: "Release and Change Management",
    shortTitle: "Release & Change Management",
    displayLabel: "APT Release & Change Management (Promote)",
    framing: "Promote",
    anchor: "release-change-management-promote",
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
  },
  {
    id: "operations",
    title: "Operations",
    shortTitle: "Operations",
    displayLabel: "APT Operations & Support Thinking (Run & Support)",
    framing: "Run & Support",
    anchor: "operations-support-run-support",
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
  },
  {
    id: "knowledge",
    title: "Knowledge",
    shortTitle: "Knowledge",
    displayLabel: "APT Knowledge System (Learn & Scale)",
    framing: "Learn & Scale",
    anchor: "knowledge-learn-scale",
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
  },
  {
    id: "ai-agent",
    title: "AI / Agent",
    shortTitle: "AI / Agent",
    displayLabel: "APT AI & Agent Framework (Augmentation Layer)",
    framing: "Augmentation Layer",
    anchor: "ai-agent-augmentation-layer",
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
  },
] as const;

export const aptLifecycleFlow: readonly AptPrincipleGroupId[] = [
  "thinking",
  "design",
  "architecture",
  "system",
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
  readonly description: string;
};

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
    path: `/design/principles#${group.anchor}`,
    description: `${group.shortTitle} governance layer and expected outputs.`,
  })),
] as const;

export const aptPrinciplesNavSections: readonly {
  label: string;
  path: string;
  description: string;
  tagline?: string;
}[] = [
  ...aptPrinciplesFrameworkIndex.map((item) => ({
    label: item.label,
    path: item.path,
    description: item.description,
    tagline: item.id === "framework" ? "Start here for the complete 10-group framework." : undefined,
  })),
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
