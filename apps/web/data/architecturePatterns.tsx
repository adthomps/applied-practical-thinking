import type { ReactNode } from "react";
import {
  Bot,
  Code2,
  FolderTree,
  Layers,
  Shield,
  Workflow,
} from "lucide-react";

export type ArchitecturePattern = {
  slug: string;
  title: string;
  description: string;
  when: string;
  whyItMatters: string;
  rules: string[];
  artifacts: string[];
  antiPattern: string;
  icon: ReactNode;
};

export const architecturePatterns: ArchitecturePattern[] = [
  {
    slug: "monorepo-layout",
    title: "Monorepo Layout",
    description: "Unified codebase with explicit boundaries between apps and packages.",
    when: "Multi-app projects or shared component libraries.",
    whyItMatters:
      "APT uses monorepos to make boundaries explicit while keeping shared contracts and atomic changes visible in one place.",
    rules: [
      "No code at repo root",
      "Apps contain deployable units only",
      "Shared logic lives in packages/",
      "Docs live with the code",
    ],
    artifacts: [
      "Clear apps/ and packages/ ownership",
      "Shared package entrypoints",
      "Documented repo structure and boundaries",
    ],
    antiPattern:
      "A flat repo that slowly accumulates code in arbitrary places until ownership and deploy boundaries blur.",
    icon: <FolderTree className="h-5 w-5" />,
  },
  {
    slug: "frontend-backend-split",
    title: "Frontend/Backend Split",
    description: "Clear separation between client and server concerns.",
    when: "Any project with server-side logic.",
    whyItMatters:
      "This pattern prevents UI code, runtime logic, and data boundaries from drifting into one another.",
    rules: [
      "No fetch calls in components",
      "API routes under /api/*",
      "Validation at boundaries",
      "Types shared via packages",
    ],
    artifacts: [
      "Service-layer API clients",
      "Worker/API route ownership",
      "Shared request/response contracts",
    ],
    antiPattern:
      "Letting client code absorb backend logic until the UI becomes the de facto system boundary.",
    icon: <Layers className="h-5 w-5" />,
  },
  {
    slug: "ai-prompt-ownership",
    title: "AI Prompt Ownership",
    description: "Prompts are versioned code, not inline strings.",
    when: "Projects using AI assistance or LLM integrations.",
    whyItMatters:
      "APT treats prompts as governed operating logic with explicit ownership, routing, and review history.",
    rules: [
      "Prompts live in ai/prompts/",
      "Each prompt has a documented owner",
      "AI endpoints are explicitly routed",
      "AI doesn't bypass auth or validation",
    ],
    artifacts: [
      "Named prompt files",
      "Owned AI routes",
      "Prompt-review history in version control",
    ],
    antiPattern:
      "Embedding prompts inline across the codebase so critical behavior becomes invisible and unreviewable.",
    icon: <Bot className="h-5 w-5" />,
  },
  {
    slug: "ci-cd-pipeline",
    title: "CI/CD Pipeline",
    description: "Automated, reproducible deployments from version control.",
    when: "Every project with a real deployment surface.",
    whyItMatters:
      "A repeatable pipeline removes hidden manual steps and makes delivery behavior observable and recoverable.",
    rules: [
      "PRs trigger preview deploys",
      "Main branch deploys to staging",
      "Release tags deploy to production",
      "No manual production deploys",
    ],
    artifacts: [
      "Documented pipeline stages",
      "Preview and production deploy triggers",
      "Verification steps after deployment",
    ],
    antiPattern:
      "A deployment process that depends on tribal knowledge, dashboard clicking, or undocumented manual fixes.",
    icon: <Workflow className="h-5 w-5" />,
  },
  {
    slug: "branch-protection",
    title: "Branch Protection",
    description: "Enforce quality gates before code reaches production.",
    when: "Team projects or anything in production.",
    whyItMatters:
      "This pattern turns quality and review standards into enforceable rules instead of informal team hopes.",
    rules: [
      "Require PR reviews (1+)",
      "Require passing status checks",
      "Squash merge only",
      "No force push to protected branches",
    ],
    artifacts: [
      "Protected branches",
      "Required checks",
      "Review ownership expectations",
    ],
    antiPattern:
      "A production branch that accepts direct pushes or bypasses quality gates when the team is under pressure.",
    icon: <Shield className="h-5 w-5" />,
  },
  {
    slug: "code-ownership",
    title: "Code Ownership",
    description: "Explicit ownership for code review and accountability.",
    when: "Teams larger than 2 people.",
    whyItMatters:
      "APT uses ownership to make responsibility legible so review, escalation, and accountability follow the actual structure of the system.",
    rules: [
      "CODEOWNERS file in repo root",
      "Owners auto-assigned as reviewers",
      "Cross-team changes require dual approval",
      "Ownership matches team structure",
    ],
    artifacts: [
      "Active CODEOWNERS rules",
      "Aligned reviewer assignment",
      "Ownership that maps to real boundaries",
    ],
    antiPattern:
      "A repo where everyone can change everything but no one is clearly responsible when boundaries are crossed or quality drops.",
    icon: <Code2 className="h-5 w-5" />,
  },
];

export function getArchitecturePattern(slug: string) {
  return architecturePatterns.find((pattern) => pattern.slug === slug);
}
