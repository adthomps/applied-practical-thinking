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
  readonly framing: string;
  readonly focus: readonly string[];
  readonly principles: readonly string[];
  readonly outputs: readonly string[];
};

export const aptPrincipleGroups: readonly AptPrincipleGroup[] = [
  {
    id: "thinking",
    title: "Thinking",
    framing: "Why",
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
  },
  {
    id: "design",
    title: "Design",
    framing: "What",
    focus: ["Define what the solution is and how it behaves", "User experience", "Functional behavior", "System interactions (conceptual)"],
    principles: [
      "Simplicity over flexibility",
      "Design complete states (loading, error, empty)",
      "Consistent interaction patterns",
      "UX clarity over feature density",
      "Reusable patterns first",
    ],
    outputs: ["UX flows", "Feature definitions", "Conceptual data models", "Interaction and state maps"],
  },
  {
    id: "architecture",
    title: "Architecture",
    framing: "How",
    focus: ["Define how the system is structured", "Technical structure", "Boundaries and responsibilities", "Data and API design"],
    principles: [
      "API-first backend",
      "Static-first frontend",
      "Strict separation of concerns",
      "Clear service boundaries",
      "Design for change and scale",
    ],
    outputs: ["System diagrams", "API contracts (OpenAPI/GraphQL)", "Data flow definitions", "Service and module boundaries"],
  },
  {
    id: "system",
    title: "System",
    framing: "Consistency",
    focus: ["Enforce standards across everything", "Reusability", "Consistency", "Standardization"],
    principles: [
      "Standardize early",
      "Tokens and configs as source of truth",
      "Reuse over reinvention",
      "Enforce via structure, not memory",
      "Version critical systems",
    ],
    outputs: ["Design system (tokens + components)", "API standards", "Repo structure", "Naming conventions", "Shared packages"],
  },
  {
    id: "execution",
    title: "Execution",
    framing: "Build",
    focus: ["Turn specs into working systems", "How work gets implemented", "Development workflow"],
    principles: [
      "Spec-driven development (docs = source of truth)",
      "Small, testable increments",
      "Preview-first workflow",
      "Fail fast on bad assumptions",
      "Automate repeatable steps",
    ],
    outputs: ["Specs (Markdown)", "Tasks and tickets", "CI workflows", "Build scripts"],
  },
  {
    id: "quality-testing",
    title: "Quality and Testing",
    framing: "Validate",
    focus: ["Ensure correctness before anything reaches users", "Prevent defects early", "Validate behavior at multiple levels"],
    principles: [
      "Fast checks first (lint -> type -> test -> build -> E2E)",
      "Test logic close to where it lives",
      "E2E tests validate journeys, not everything",
      "Preview environment must be tested",
      "Failures must produce usable diagnostics",
    ],
    outputs: ["Test suites", "CI validation pipelines", "Test artifacts (logs, traces, reports)"],
  },
  {
    id: "release-change-management",
    title: "Release and Change Management",
    framing: "Promote",
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
  },
  {
    id: "operations",
    title: "Operations",
    framing: "Run and Support",
    focus: ["Keep the system running and support users effectively", "Stability", "Observability", "Support workflows"],
    principles: [
      "Design for support from day one",
      "Everything must be observable",
      "Actions must be traceable",
      "Support feedback drives improvements",
      "Systems should explain themselves",
    ],
    outputs: ["Logging and monitoring", "Alerts and dashboards", "Support playbooks", "Incident workflows"],
  },
  {
    id: "knowledge",
    title: "Knowledge",
    framing: "Learn and Scale",
    focus: ["Capture and reuse what is learned", "Documentation", "Knowledge reuse", "Long-term efficiency"],
    principles: [
      "Document once, reuse everywhere",
      "Separate internal vs external knowledge",
      "Structure knowledge for both humans and AI",
      "Keep knowledge versioned",
      "Avoid duplication",
    ],
    outputs: ["Documentation systems", "Knowledge base", "Training content", "AI-ingestible markdown"],
  },
  {
    id: "ai-agent",
    title: "AI / Agent",
    framing: "Augmentation Layer",
    focus: ["Use AI to accelerate, not replace, structured thinking", "AI-assisted development", "Agent workflows", "Prompt standardization"],
    principles: [
      "AI follows system structure",
      "Prompts map to APT layers",
      "Deterministic inputs -> reliable outputs",
      "Guardrails over creativity in production",
      "AI enhances execution, not direction",
    ],
    outputs: ["One-shot prompts", "Copilot instructions", "Agent workflows", "Evaluation frameworks"],
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
  "ai-agent",
] as const;

export const aptAiOverlayGroupId: AptPrincipleGroupId = "ai-agent";

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
