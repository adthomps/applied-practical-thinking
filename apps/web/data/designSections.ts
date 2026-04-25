export type DesignSectionCategory = "core" | "runtime" | "reference";

export type DesignSection = {
  readonly label: string;
  readonly path: string;
  readonly description: string;
  readonly tagline?: string;
  readonly category: DesignSectionCategory;
};

type DesignNavSection = Omit<DesignSection, "category">;

export const designSectionCatalog: readonly DesignSection[] = [
  {
    label: "Design Thinking",
    path: "/design/thinking",
    description: "Problem framing, assumptions, constraints, and decision-making in practice.",
    tagline: "How problems are defined before solutions exist.",
    category: "core",
  },
  {
    label: "Principles",
    path: "/design/principles",
    description: "Canonical APT principles framework across Thinking, Design, Architecture, System, Security, Execution, Quality, Release, Operations, Knowledge, and AI.",
    tagline: "One model for why, what, how, and operational consistency.",
    category: "core",
  },
  {
    label: "Design System",
    path: "/design/system",
    description: "How APT applies design systems: tokens, semantics, components, and constraints.",
    tagline: "Designing for clarity, consistency, and scale.",
    category: "core",
  },
  {
    label: "Design Architecture",
    path: "/design/architecture",
    description: "Repo layout, deployment flows, API contracts, and enforcement rules.",
    tagline: "Structure exists to prevent failure, not to enable creativity.",
    category: "core",
  },
  {
    label: "Content Strategy",
    path: "/design/content-strategy",
    description: "How APT organizes information so people can understand, navigate, and apply it.",
    tagline: "Information architecture made visible.",
    category: "core",
  },
  {
    label: "Docs Browser",
    path: "/design/docs",
    description: "Manifest-driven browser for doctrine and pattern docs with version-aware rendering.",
    tagline: "Browse docs from runtime manifest metadata.",
    category: "runtime",
  },
  {
    label: "Patterns",
    path: "/design/patterns",
    description: "Curated landing area for manifest-driven pattern docs.",
    tagline: "Reusable patterns with version-aware docs routing.",
    category: "runtime",
  },
  {
    label: "Support Design",
    path: "/design/support",
    description: "Operational response patterns, incident runbooks, and recovery playbooks.",
    tagline: "How we detect, diagnose, and restore service and UX continuity.",
    category: "runtime",
  },
  {
    label: "Knowledge Engine",
    path: "/design/knowledge-engine",
    description: "Runtime patterns for ingesting, indexing, and serving knowledge artifacts.",
    tagline: "Contracts, APIs, and validation for the knowledge layer.",
    category: "runtime",
  },
  {
    label: "Systems",
    path: "/design/systems",
    description: "Stable system references that capture architecture, decisions, and reusable models inside the APT doctrine.",
    tagline: "Reference models governed by the design doctrine.",
    category: "reference",
  },
  {
    label: "AI Review Bundle",
    path: "/design/review-bundle",
    description: "A single public handoff for AI reviewers with the review standard and the core doctrine documents in one place.",
    tagline: "One entry point for standards-based review.",
    category: "reference",
  },
] as const;

export const mostUsedDesignSectionPaths = [
  "/design/thinking",
  "/design/principles",
  "/design/system",
  "/design/architecture",
  "/design/systems",
  "/design/docs",
  "/design/review-bundle",
] as const;

const DESIGN_NAV_PATHS = new Set([
  "/design/thinking",
  "/design/principles",
  "/design/system",
  "/design/architecture",
  "/design/systems",
  "/design/docs",
  "/design/patterns",
  "/design/review-bundle",
]);

export const designNavSections: readonly DesignNavSection[] = designSectionCatalog
  .filter((section) => DESIGN_NAV_PATHS.has(section.path))
  .map((section) => ({
    label: section.label,
    path: section.path,
    description: section.description,
    tagline: section.tagline,
  }));
