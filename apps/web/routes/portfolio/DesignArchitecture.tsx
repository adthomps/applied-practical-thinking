import { Link } from "react-router-dom";
import {
  AptButton,
  AptCard,
  AptCardHeader,
  AptCardTitle,
  AptCardDescription,
  AptCardContent,
  AptTag,
  SectionIntro,
} from "@/components/apt";
import {
  FolderTree,
  Server,
  Globe,
  GitBranch,
  Shield,
  Bot,
  ArrowRight,
  FileText,
  Layers,
  Code2,
  Cloud,
  Workflow,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";
import { getWorkerApiConfigError, tryGetWorkerApiUrl } from "@/src/services/api";

interface ArchitecturePatternProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  rules: string[];
  when: string;
}

function ArchitecturePatternCard({ icon, title, description, rules, when }: ArchitecturePatternProps) {
  return (
    <AptCard variant="interactive" className="h-full">
      <AptCardHeader>
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-primary/10 text-primary">
            {icon}
          </div>
          <AptCardTitle>{title}</AptCardTitle>
        </div>
        <AptCardDescription>{description}</AptCardDescription>
      </AptCardHeader>
      <AptCardContent>
        <div className="space-y-4">
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Hard Rules</p>
            <ul className="space-y-1.5">
              {rules.map((rule, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-accent mt-0.5" />
                  {rule}
                </li>
              ))}
            </ul>
          </div>
          <div className="pt-3 border-t border-border">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">When to apply</p>
            <p className="text-sm text-muted-foreground">{when}</p>
          </div>
        </div>
      </AptCardContent>
    </AptCard>
  );
}

interface BoundaryCardProps {
  title: string;
  stack: string;
  responsibilities: string[];
  constraints: string[];
}

function BoundaryCard({ title, stack, responsibilities, constraints }: BoundaryCardProps) {
  return (
    <AptCard variant="feature">
      <AptCardHeader>
        <AptCardTitle>{title}</AptCardTitle>
        <AptCardDescription className="font-mono text-xs">{stack}</AptCardDescription>
      </AptCardHeader>
      <AptCardContent>
        <div className="space-y-4">
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Responsibilities</p>
            <ul className="space-y-1">
              {responsibilities.map((item, i) => (
                <li key={i} className="text-sm flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Constraints</p>
            <ul className="space-y-1">
              {constraints.map((item, i) => (
                <li key={i} className="text-sm flex items-center gap-2 text-muted-foreground">
                  <AlertTriangle className="h-3 w-3 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </AptCardContent>
    </AptCard>
  );
}

export default function PortfolioDesignArchitecture() {
  const architectureDocUrl = tryGetWorkerApiUrl("/api/design/docs/architecture");
  const configError = getWorkerApiConfigError();
  const patterns = [
    {
      icon: <FolderTree className="h-5 w-5" />,
      title: "Monorepo Layout",
      description: "Unified codebase with explicit boundaries between apps and packages.",
      rules: [
        "No code at repo root",
        "Apps contain deployable units only",
        "Shared logic lives in packages/",
        "Docs live with the code",
      ],
      when: "Multi-app projects or shared component libraries",
    },
    {
      icon: <Layers className="h-5 w-5" />,
      title: "Frontend/Backend Split",
      description: "Clear separation between client and server concerns.",
      rules: [
        "No fetch calls in components",
        "API routes under /api/*",
        "Validation at boundaries",
        "Types shared via packages",
      ],
      when: "Any project with server-side logic",
    },
    {
      icon: <Bot className="h-5 w-5" />,
      title: "AI Prompt Ownership",
      description: "Prompts are versioned code, not inline strings.",
      rules: [
        "Prompts live in ai/prompts/",
        "Each prompt has a documented owner",
        "AI endpoints are explicitly routed",
        "AI doesn't bypass auth or validation",
      ],
      when: "Projects using AI assistance or LLM integrations",
    },
    {
      icon: <Workflow className="h-5 w-5" />,
      title: "CI/CD Pipeline",
      description: "Automated, reproducible deployments from version control.",
      rules: [
        "PRs trigger preview deploys",
        "Main branch deploys to staging",
        "Release tags deploy to production",
        "No manual production deploys",
      ],
      when: "Every project—no exceptions",
    },
    {
      icon: <Shield className="h-5 w-5" />,
      title: "Branch Protection",
      description: "Enforce quality gates before code reaches production.",
      rules: [
        "Require PR reviews (1+)",
        "Require passing status checks",
        "Squash merge only",
        "No force push to protected branches",
      ],
      when: "Team projects or anything in production",
    },
    {
      icon: <Code2 className="h-5 w-5" />,
      title: "Code Ownership",
      description: "Explicit ownership for code review and accountability.",
      rules: [
        "CODEOWNERS file in repo root",
        "Owners auto-assigned as reviewers",
        "Cross-team changes require dual approval",
        "Ownership matches team structure",
      ],
      when: "Teams larger than 2 people",
    },
  ];

  const principles = [
    {
      icon: <FolderTree className="h-5 w-5" />,
      title: "Monorepo by Default",
      description: "Shared code, unified tooling, atomic commits across the entire system.",
    },
    {
      icon: <Globe className="h-5 w-5" />,
      title: "Static-First, API-Optional",
      description: "Frontend deploys independently; backend functionality is additive, not required.",
    },
    {
      icon: <Shield className="h-5 w-5" />,
      title: "Boundaries Over Flexibility",
      description: "Clear separation prevents accidental coupling. Constraints enable velocity.",
    },
    {
      icon: <FileText className="h-5 w-5" />,
      title: "Docs as Code",
      description: "Architecture decisions live in version control, reviewed like any other change.",
    },
    {
      icon: <Bot className="h-5 w-5" />,
      title: "AI-Aware From Day One",
      description: "Prompt ownership and routing are first-class architectural concerns.",
    },
    {
      icon: <GitBranch className="h-5 w-5" />,
      title: "Reproducible Deploys",
      description: "Every deployment is traceable to a commit. No snowflakes, no manual steps.",
    },
  ];

  const boundaries = [
    {
      title: "Frontend",
      stack: "Vite + React + TypeScript + Tailwind",
      responsibilities: [
        "UI rendering and state management",
        "Route handling and navigation",
        "API client calls via services/",
        "Asset bundling and optimization",
      ],
      constraints: [
        "No direct database access",
        "No secrets in client code",
        "No business logic in components",
      ],
    },
    {
      title: "Backend",
      stack: "Cloudflare Workers + Hono",
      responsibilities: [
        "API endpoints under /api/*",
        "Authentication and authorization",
        "Database queries and mutations",
        "External service integrations",
      ],
      constraints: [
        "No UI rendering",
        "No client-side state",
        "Stateless per-request execution",
      ],
    },
  ];

  return (
    <div className="container py-12 md:py-16">
      {/* Hero */}
      <SectionIntro
        title="How Projects Get Built"
        description="Repo layout, deployment flows, API contracts, AI routing, and enforcement rules."
        titleClassName="text-3xl md:text-4xl"
        descriptionClassName="text-lg"
        eyebrow={<AptTag variant="accent">Design Architecture</AptTag>}
        className="mb-12"
      >
        <p className="text-base text-muted-foreground/80">
          <em>Structure exists to prevent failure, not to enable creativity.</em>
        </p>
        <AptButton variant="outline" asChild>
          <a
            href={architectureDocUrl || "#"}
            target={architectureDocUrl ? "_blank" : undefined}
            rel={architectureDocUrl ? "noopener noreferrer" : undefined}
            aria-disabled={!architectureDocUrl}
          >
            <FileText className="h-4 w-4" />
            View Full Specification
          </a>
        </AptButton>
        {!architectureDocUrl && configError ? (
          <p className="text-sm text-muted-foreground mt-3">
            Configure <code>{configError.envVar}</code> on the Pages project to enable full-doc links.
          </p>
        ) : null}
      </SectionIntro>

      {/* Principles */}
      <section className="mb-16">
        <SectionIntro
          title="Core Principles"
          description="The governing architectural positions that keep the system legible and enforceable."
          className="mb-6"
        />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {principles.map((principle) => (
            <AptCard key={principle.title} variant="subtle">
              <AptCardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-accent/10 text-accent">
                    {principle.icon}
                  </div>
                  <AptCardTitle className="text-lg">{principle.title}</AptCardTitle>
                </div>
              </AptCardHeader>
              <AptCardContent>
                <p className="text-sm text-muted-foreground">{principle.description}</p>
              </AptCardContent>
            </AptCard>
          ))}
        </div>
      </section>

      {/* Boundaries */}
      <section className="mb-16">
        <SectionIntro
          title="Frontend/Backend Boundaries"
          description="Clear separation of concerns between client and server."
          className="mb-6"
        />
        <div className="grid gap-6 md:grid-cols-2">
          {boundaries.map((boundary) => (
            <BoundaryCard key={boundary.title} {...boundary} />
          ))}
        </div>
      </section>

      {/* Architectural Patterns */}
      <section className="mb-16">
        <SectionIntro
          title="Architectural Patterns"
          description="Repeatable structures for common project needs."
          className="mb-6"
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {patterns.map((pattern) => (
            <ArchitecturePatternCard key={pattern.title} {...pattern} />
          ))}
        </div>
      </section>

      {/* Deployment Flow */}
      <section className="mb-16">
        <SectionIntro
          title="Deployment Flow"
          description="From commit to production, every step is automated."
          className="mb-6"
        />
        <AptCard variant="feature" padding="large">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="text-center p-4">
              <div className="mx-auto w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-3">
                <GitBranch className="h-5 w-5" />
              </div>
              <p className="font-medium mb-1">Branch Push</p>
              <p className="text-sm text-muted-foreground">Preview deploy triggered</p>
            </div>
            <div className="text-center p-4">
              <div className="mx-auto w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-3">
                <Server className="h-5 w-5" />
              </div>
              <p className="font-medium mb-1">Merge to Main</p>
              <p className="text-sm text-muted-foreground">Staging deploy triggered</p>
            </div>
            <div className="text-center p-4">
              <div className="mx-auto w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mb-3">
                <Cloud className="h-5 w-5 text-accent" />
              </div>
              <p className="font-medium mb-1">Release Tag</p>
              <p className="text-sm text-muted-foreground">Production deploy triggered</p>
            </div>
          </div>
        </AptCard>
      </section>

      {/* Related Resources CTA */}
      <section>
        <AptCard variant="feature" padding="large">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-primary/10 text-primary">
                <FileText className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-1">Related Documentation</h3>
                <p className="text-muted-foreground">
                  See how architecture connects to design systems and decision-making.
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <AptButton variant="outline" asChild>
                <Link to="/design/system">
                  Design System
                </Link>
              </AptButton>
              <AptButton variant="outline" asChild>
                <Link to="/design/thinking">
                  Design Thinking
                </Link>
              </AptButton>
            </div>
          </div>
        </AptCard>
      </section>
    </div>
  );
}
