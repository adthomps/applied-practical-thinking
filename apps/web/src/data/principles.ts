export type PrincipleSlug =
  | "framework"
  | "thinking"
  | "design"
  | "architecture"
  | "system"
  | "execution"
  | "quality"
  | "release"
  | "operations"
  | "knowledge"
  | "ai"
  | "security";

export type PrincipleExample = {
  readonly label: string;
  readonly href: string;
  readonly status?: "planned" | "available";
};

export type PrincipleSection = {
  readonly slug: PrincipleSlug;
  readonly title: string;
  readonly summary: string;
  readonly role: string;
  readonly keyRules: readonly string[];
  readonly howUsed: readonly string[];
  readonly patterns: readonly string[];
  readonly examples: readonly PrincipleExample[];
  readonly sourceHref: string;
  readonly aiUsage: readonly string[];
};

export const PRINCIPLES_GITHUB_ROOT = "https://github.com/adthomps/apt-principles/blob/main/apt-principles";

const source = (relativePath: string) => `${PRINCIPLES_GITHUB_ROOT}/${relativePath}`;

export const principlesLifecycle = [
  "Think",
  "Design",
  "Build",
  "Validate",
  "Promote",
  "Run",
  "Learn",
  "Augment",
  "Secure",
] as const;

export const principlesSections: readonly PrincipleSection[] = [
  {
    slug: "framework",
    title: "APT Principles Framework",
    summary:
      "The operating model that connects thinking, design, architecture, delivery, operations, learning, AI, and security into one system.",
    role: "Sets shared language, lifecycle flow, and governance expectations across all APT work.",
    keyRules: [
      "Default to the lifecycle before proposing implementation details.",
      "Avoid isolated decisions that are not traceable to a framework layer.",
      "Use one source of truth for doctrine, then summarize for public consumption.",
      "Treat standards as reusable contracts, not one-off advice.",
      "Use principle-aligned review before promoting major changes.",
    ],
    howUsed: [
      "Drives architecture and planning decisions in labs and demos.",
      "Provides review criteria for apps, docs, and release readiness.",
      "Aligns public portfolio narratives with practical implementation standards.",
    ],
    patterns: [
      "Lifecycle-first planning templates",
      "Principle-aligned review checklists",
      "Canonical-source + curated-summary publishing model",
    ],
    examples: [
      { label: "Experiments", href: "/experiments", status: "available" },
      { label: "Live Demos", href: "/experiments/live-demos", status: "available" },
      { label: "Systems", href: "/learn/systems", status: "available" },
    ],
    sourceHref: source("apt-principles.md"),
    aiUsage: [
      "Maps AI prompts to principle layers so outputs stay structured.",
      "Uses framework language for coding-agent tasks and review outputs.",
      "Keeps generated guidance aligned with canonical doctrine.",
    ],
  },
  {
    slug: "thinking",
    title: "Thinking (Why)",
    summary: "Defines why a problem matters, who it affects, and what measurable success looks like.",
    role: "Prevents solution-first delivery and keeps teams outcome-focused.",
    keyRules: [
      "Default to problem statements before solution proposals.",
      "Define user, context, and success metrics before scoping.",
      "Avoid vague goals that cannot be measured.",
      "Use explicit tradeoffs when constraints conflict.",
      "Use small, testable assumptions instead of broad bets.",
    ],
    howUsed: [
      "Shapes early direction for labs, prototypes, and architecture spikes.",
      "Sets measurable outcomes used in quality and release reviews.",
      "Documents core decisions for future reuse.",
    ],
    patterns: [
      "Problem framing canvas",
      "Decision log with tradeoffs",
      "Outcome and metric baseline check",
    ],
    examples: [
      { label: "Practice Guides", href: "/learn/practice", status: "available" },
      { label: "Systems", href: "/learn/systems", status: "available" },
    ],
    sourceHref: source("thinking.md"),
    aiUsage: [
      "Prompts AI to produce problem framing before implementation suggestions.",
      "Uses deterministic templates for assumptions, outcomes, and constraints.",
    ],
  },
  {
    slug: "design",
    title: "Design (What)",
    summary: "Defines what is being built and how user-facing behavior remains coherent across states.",
    role: "Turns intent into usable interaction and state models.",
    keyRules: [
      "Default to clarity over feature density.",
      "Define complete states: loading, empty, error, success.",
      "Use reusable patterns before custom variants.",
      "Avoid interaction patterns that break established system behavior.",
      "Use explicit acceptance criteria for UX behavior.",
    ],
    howUsed: [
      "Guides route and component behavior in portfolio and demo pages.",
      "Aligns documentation and UI patterns with system standards.",
      "Feeds architecture and testing contracts.",
    ],
    patterns: ["State mapping", "Interaction contracts", "Component usage conventions"],
    examples: [
      { label: "Design System", href: "/design/system", status: "available" },
      { label: "Design Patterns", href: "/design/patterns", status: "available" },
      { label: "Live Demos", href: "/experiments/live-demos", status: "available" },
    ],
    sourceHref: source("design.md"),
    aiUsage: [
      "Uses prompt contracts to generate complete UX state definitions.",
      "Evaluates generated UI against shared design and accessibility rules.",
    ],
  },
  {
    slug: "architecture",
    title: "Architecture (How)",
    summary: "Defines technical boundaries, service interactions, and contracts that keep systems maintainable.",
    role: "Ensures implementation structure supports scale, change, and ownership clarity.",
    keyRules: [
      "Default to clear boundaries and explicit contracts.",
      "Use API-first thinking for cross-layer integration.",
      "Avoid hidden coupling across modules and services.",
      "Use ownership mapping for every core surface.",
      "Use architecture decisions to reduce operational risk.",
    ],
    howUsed: [
      "Shapes repo and deployment strategy for apps and demos.",
      "Guides API/worker contracts and frontend consumption.",
      "Supports release and operations readiness.",
    ],
    patterns: ["Boundary map", "Contract-first API design", "Ownership-by-layer model"],
    examples: [
      { label: "Design Architecture", href: "/design/architecture", status: "available" },
      { label: "Systems", href: "/learn/systems", status: "available" },
    ],
    sourceHref: source("architecture.md"),
    aiUsage: [
      "Prompts agents to propose boundary-safe implementations.",
      "Checks generated changes against architecture contracts before merge.",
    ],
  },
  {
    slug: "system",
    title: "System (Consistency)",
    summary: "Enforces shared standards across naming, tokens, APIs, structure, and operational conventions.",
    role: "Protects consistency so teams can scale output without drift.",
    keyRules: [
      "Default to existing standards before new abstractions.",
      "Use tokens/contracts as source of consistency.",
      "Avoid one-off local conventions for shared surfaces.",
      "Use structure-enforced rules instead of memory-based rules.",
      "Version shared standards as formal assets.",
    ],
    howUsed: [
      "Keeps design, API, and documentation behavior aligned.",
      "Supports predictable onboarding and review quality.",
      "Improves cross-project portability of APT practices.",
    ],
    patterns: ["Tokenized UI", "Naming contract", "Shared package and folder conventions"],
    examples: [
      { label: "Design Docs Browser", href: "/design/docs", status: "available" },
      { label: "Systems", href: "/learn/systems", status: "available" },
    ],
    sourceHref: source("system-standards.md"),
    aiUsage: [
      "Uses standards-aware prompts to detect policy drift.",
      "Applies consistency checks to generated code and docs.",
    ],
  },
  {
    slug: "execution",
    title: "Execution (Build)",
    summary: "Converts approved specs into incremental, testable, production-ready changes.",
    role: "Operationalizes delivery with repeatable build and validation flows.",
    keyRules: [
      "Default to small, testable increments.",
      "Use specs as implementation anchors.",
      "Avoid large unvalidated change batches.",
      "Use preview-first verification before production promotion.",
      "Automate repeatable build and quality gates.",
    ],
    howUsed: [
      "Defines how portfolio and app changes move from idea to shipped state.",
      "Coordinates implementation with quality and release checkpoints.",
      "Supports consistent contributor workflow.",
    ],
    patterns: ["Spec-to-story sequencing", "Preview-to-prod flow", "Incremental PR strategy"],
    examples: [
      { label: "Experiments", href: "/experiments", status: "available" },
      { label: "Live Demos", href: "/experiments/live-demos", status: "available" },
    ],
    sourceHref: source("execution.md"),
    aiUsage: [
      "Uses task-splitting prompts for incremental execution plans.",
      "Aligns agent output format to delivery checkpoints.",
    ],
  },
  {
    slug: "quality",
    title: "Quality (Validate)",
    summary: "Applies layered validation to catch defects early and protect user-facing behavior.",
    role: "Ensures releases are trustworthy through repeatable quality gates.",
    keyRules: [
      "Default to fast checks before deep checks.",
      "Use layered validation: lint, type, test, build, journey checks.",
      "Avoid shipping when diagnostics are missing.",
      "Use critical-path journey testing for user trust.",
      "Validate preview behavior before promotion.",
    ],
    howUsed: [
      "Sets CI and local verification expectations.",
      "Validates nav, content, and runtime behavior changes.",
      "Produces evidence for release decisions.",
    ],
    patterns: ["Validation checklist", "Evidence-driven QA notes", "Journey-first testing"],
    examples: [
      { label: "Practice Guides", href: "/learn/practice", status: "available" },
      { label: "Systems", href: "/learn/systems", status: "available" },
    ],
    sourceHref: source("quality-testing.md"),
    aiUsage: [
      "Uses prompts to generate focused validation plans by change scope.",
      "Requires structured failure analysis from AI review outputs.",
    ],
  },
  {
    slug: "release",
    title: "Release (Promote)",
    summary: "Governs safe promotion of changes with traceability, communication, and rollback awareness.",
    role: "Makes production change intentional and understandable.",
    keyRules: [
      "Default to traceable releases with clear change summaries.",
      "Use preview validation as a promotion prerequisite.",
      "Avoid undocumented production changes.",
      "Use grouped, meaningful release units.",
      "Prepare rollback-aware promotion notes.",
    ],
    howUsed: [
      "Shapes how portfolio and app updates are communicated.",
      "Links validation evidence to deployment actions.",
      "Keeps support context aligned with what changed.",
    ],
    patterns: ["Release notes template", "Promotion checklist", "Rollback-aware deployment notes"],
    examples: [
      { label: "Live Demos", href: "/experiments/live-demos", status: "available" },
      { label: "Systems", href: "/learn/systems", status: "available" },
    ],
    sourceHref: source("release-change-management.md"),
    aiUsage: [
      "Generates structured release summaries from merged change sets.",
      "Evaluates release risk and missing evidence before promotion.",
    ],
  },
  {
    slug: "operations",
    title: "Operations (Run & Support)",
    summary: "Designs for observability, supportability, and incident response from day one.",
    role: "Sustains reliability and user trust after release.",
    keyRules: [
      "Default to observable systems with actionable signals.",
      "Use traceable logs for critical flows.",
      "Avoid unrecoverable failure states without support guidance.",
      "Use support feedback to drive design and architecture improvements.",
      "Treat runbooks as required operational artifacts.",
    ],
    howUsed: [
      "Supports runtime diagnostics for public routes and demos.",
      "Improves support response for content and deployment issues.",
      "Feeds learning loops back into standards.",
    ],
    patterns: ["Runbook starter", "Alert condition map", "Support handoff template"],
    examples: [
      { label: "Support Design", href: "/design/support", status: "available" },
      { label: "Systems", href: "/learn/systems", status: "available" },
    ],
    sourceHref: source("operations-support.md"),
    aiUsage: [
      "Uses AI to produce incident triage starters from system context.",
      "Applies structured prompts for post-incident summaries.",
    ],
  },
  {
    slug: "knowledge",
    title: "Knowledge (Learn & Scale)",
    summary: "Turns decisions, outcomes, and lessons into reusable assets for humans and AI.",
    role: "Prevents relearning and increases delivery velocity over time.",
    keyRules: [
      "Default to canonical documentation with clear ownership.",
      "Use one authoritative source for each doctrine artifact.",
      "Avoid duplicate guidance across repos and routes.",
      "Use structured metadata to keep knowledge machine-readable.",
      "Promote reusable learnings back into standards.",
    ],
    howUsed: [
      "Aligns apt-principles and applied-practical-thinking documentation flows.",
      "Supports public summary pages linked to canonical GitHub sources.",
      "Improves onboarding and cross-project continuity.",
    ],
    patterns: ["Canonical + curated model", "Decision-log reuse", "Knowledge contract metadata"],
    examples: [
      { label: "Design Docs", href: "/design/docs", status: "available" },
      { label: "Systems", href: "/learn/systems", status: "available" },
    ],
    sourceHref: source("knowledge-system.md"),
    aiUsage: [
      "Guides AI to prefer canonical sources and stable references.",
      "Structures prompts to emit reusable documentation updates.",
    ],
  },
  {
    slug: "ai",
    title: "AI (Augment)",
    summary: "Defines how AI and agents accelerate work while staying bounded by APT standards.",
    role: "Enables faster execution without losing architectural or quality discipline.",
    keyRules: [
      "Default to structured prompts with explicit constraints.",
      "Use deterministic output formats for agent tasks.",
      "Avoid unconstrained generation for production-critical changes.",
      "Use principle-aligned review prompts for AI outputs.",
      "Keep human ownership for high-impact decisions.",
    ],
    howUsed: [
      "Powers coding-agent workflows and review bundles.",
      "Supports planning, implementation, and validation acceleration.",
      "Aligns AI-generated output to framework layers.",
    ],
    patterns: ["Prompt contract", "AI review bundle", "Agent guardrail checklist"],
    examples: [
      { label: "AI Review Bundle", href: "/design/review-bundle", status: "available" },
      { label: "Practice Guides", href: "/learn/practice", status: "available" },
    ],
    sourceHref: source("ai-agent-framework.md"),
    aiUsage: [
      "Defines standards for agent instructions and expected outputs.",
      "Links prompt design directly to validation and governance layers.",
    ],
  },
  {
    slug: "security",
    title: "Security",
    summary: "Integrates trust boundaries, auth, authorization, and abuse controls into core system design.",
    role: "Protects users, data, and service trust across the full lifecycle.",
    keyRules: [
      "Default to server-side trust enforcement.",
      "Use separate authentication and authorization controls.",
      "Avoid implicit trust across boundaries.",
      "Use stronger controls for sensitive operations.",
      "Require traceable security validation evidence.",
    ],
    howUsed: [
      "Shapes auth/session behaviors in app and API design.",
      "Informs release and operations risk controls.",
      "Guides incident handling for trust-impacting events.",
    ],
    patterns: ["Session model contract", "Authorization matrix", "Sensitive-flow hardening checklist"],
    examples: [
      { label: "Systems", href: "/learn/systems", status: "available" },
      { label: "Live Demos", href: "/experiments/live-demos", status: "available" },
    ],
    sourceHref: source("security.md"),
    aiUsage: [
      "Uses trust-boundary review prompts for changed workflows.",
      "Requires AI to surface security risks and required mitigations explicitly.",
    ],
  },
] as const;

const sectionMap = new Map(principlesSections.map((section) => [section.slug, section]));

export function getPrincipleSection(slug: PrincipleSlug): PrincipleSection {
  return sectionMap.get(slug)!;
}

export const principleNavSections = [
  { label: "Overview", path: "/principles", description: "Public summary of the APT principles system." },
  { label: "Framework", path: "/principles/framework", description: "Lifecycle model and framework-level rules." },
  { label: "Thinking", path: "/principles/thinking", description: "Problem framing and outcome definition." },
  { label: "Execution", path: "/principles/execution", description: "Spec-to-build delivery model." },
  { label: "Quality", path: "/principles/quality", description: "Validation and quality gates." },
  { label: "AI", path: "/principles/ai", description: "AI and agent augmentation standards." },
] as const;

const legacySlugMap: Record<string, PrincipleSlug> = {
  framework: "framework",
  thinking: "thinking",
  design: "design",
  architecture: "architecture",
  system: "system",
  execution: "execution",
  quality: "quality",
  release: "release",
  operations: "operations",
  knowledge: "knowledge",
  ai: "ai",
  security: "security",
  "quality-testing": "quality",
  "release-change-management": "release",
  "ai-agent": "ai",
} as const;

export function resolvePrincipleSlug(value: string | undefined): PrincipleSlug | null {
  if (!value) return null;
  return legacySlugMap[value] ?? null;
}
