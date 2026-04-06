import { Link } from "react-router-dom";
import {
  FolderTree,
  Server,
  Globe,
  GitBranch,
  Shield,
  Bot,
  ArrowRight,
  FileText,
  Download,
  Cloud,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";
import {
  AptButton,
  AptCard,
  AptCardHeader,
  AptCardTitle,
  AptCardDescription,
  AptCardContent,
  AptTag,
  DesignDocVersionSwitcher,
  ReviewBundleCallout,
  SectionIntro,
} from "@/components/apt";
import { getWorkerApiConfigError, tryGetWorkerApiUrl } from "@/src/services/api";
import { useDesignDocVersion } from "@/hooks/useDesignDocVersion";
import { downloadWorkerMarkdown } from "@/src/services/download";
import { architecturePatterns } from "@/data/architecturePatterns";
import { useValidationReport } from "@/hooks/useValidationReport";

interface ArchitecturePatternProps {
  slug: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  rules: string[];
  when: string;
}

function ArchitecturePatternCard({ slug, icon, title, description, rules, when }: ArchitecturePatternProps) {
  return (
    <Link to={`/design/architecture/${slug}`} className="block group">
      <AptCard variant="interactive" className="h-full">
        <AptCardHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                {icon}
              </div>
              <div>
                <AptTag variant="outline" size="sm" className="mb-2">Pattern</AptTag>
                <AptCardTitle>{title}</AptCardTitle>
              </div>
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
          </div>
          <AptCardDescription>{description}</AptCardDescription>
        </AptCardHeader>
        <AptCardContent>
          <div className="space-y-4">
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Hard Rules</p>
              <ul className="space-y-1.5">
                {rules.slice(0, 3).map((rule, i) => (
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
            <div className="pt-1">
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                Open pattern
                <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </div>
        </AptCardContent>
      </AptCard>
    </Link>
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
  const architectureVersion = useDesignDocVersion("architecture");
  const architectureDocUrl = tryGetWorkerApiUrl(architectureVersion.downloadApiPath);
  const architectureCanonicalUrl = architectureVersion.canonicalPath || null;
  const architectureCanonicalMajor = architectureVersion.activeMajor || architectureVersion.latestMajor;
  const architectureExamplesCanonicalUrl = architectureCanonicalMajor
    ? `/docs/design/v${architectureCanonicalMajor}/APT-ARCHITECTURE-EXAMPLES.md`
    : null;
  const architectureReferenceCanonicalUrl = architectureCanonicalMajor
    ? `/docs/design/v${architectureCanonicalMajor}/APT-ARCHITECTURE-REFERENCE.json`
    : null;
  const configError = getWorkerApiConfigError();
  const { report: validationReport } = useValidationReport();
  const handleArchitectureMarkdownDownload = async () => {
    const majorSuffix = architectureVersion.activeMajor ? `-v${architectureVersion.activeMajor}` : "";
    await downloadWorkerMarkdown(architectureVersion.downloadApiPath, `apt-design-architecture${majorSuffix}.md`);
  };
  const patterns = architecturePatterns;

  const operatingSignals = [
    {
      title: "Use explicit architecture when boundaries matter",
      description: "The full architecture layer matters most when multiple deploy surfaces, shared packages, or cross-system contracts could drift without clear ownership.",
    },
    {
      title: "Keep the structure proportional to the risk",
      description: "Not every project needs heavyweight diagrams or process, but every project needs enough structure to prevent accidental coupling and deployment confusion.",
    },
    {
      title: "Favor enforceable rules over aspirational guidance",
      description: "Architecture is strongest when it creates observable boundaries in code, builds, and deploys, not just good intentions in a document.",
    },
  ];

  const artifacts = [
    "Repo and package boundaries that define what belongs in apps versus shared packages",
    "Deployment contracts that name the build authority, runtime surfaces, and environment ownership",
    "API and content boundaries that prevent the frontend and backend from drifting into each other",
    "Decision records for architecture choices that are expensive, risky, or precedent-setting",
  ];

  const antiPatterns = [
    {
      title: "Boundary Erosion",
      description: "Frontend, backend, and shared layers slowly leak into one another until no part of the system has a clear owner.",
    },
    {
      title: "Tooling Split-Brain",
      description: "Two build or deploy paths exist for the same surface, creating inconsistent artifacts and environment drift.",
    },
    {
      title: "Docs That Describe a Different System",
      description: "The architecture write-up says one thing while the repo, packages, and deployment pipeline do another.",
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
        <AptButton
          variant="outline"
          onClick={() => {
            void handleArchitectureMarkdownDownload();
          }}
          disabled={!architectureDocUrl}
        >
          <FileText className="h-4 w-4" />
          Download Architecture Markdown
        </AptButton>
        {architectureCanonicalUrl ? (
          <AptButton variant="ghost" asChild>
            <a href={architectureCanonicalUrl} target="_blank" rel="noreferrer">
              Open canonical
            </a>
          </AptButton>
        ) : null}
        <DesignDocVersionSwitcher versionState={architectureVersion} />
        {!architectureDocUrl && configError ? (
          <p className="text-sm text-muted-foreground mt-3">
            Configure <code>{configError.envVar}</code> on the Pages project to enable full-doc links.
          </p>
        ) : null}
      </SectionIntro>

      <section className="mb-16">
        <AptCard variant="subtle" padding="large">
          <AptCardHeader>
            <AptCardTitle className="text-xl">Architecture Checklist & Reference</AptCardTitle>
            <AptCardDescription>
              Critical architecture gate artifacts for boundary, routing, deploy authority, and AI ownership validation.
            </AptCardDescription>
          </AptCardHeader>
          <AptCardContent className="flex flex-wrap gap-3">
            <AptButton asChild>
              <a href="/docs/design/APT-ARCHITECTURE-EXAMPLES.md" target="_blank" rel="noreferrer">
                Open Architecture Examples
                <ArrowRight className="h-4 w-4" />
              </a>
            </AptButton>
            <AptButton variant="outline" asChild>
              <a href="/docs/design/APT-ARCHITECTURE-EXAMPLES.md" download>
                <Download className="h-4 w-4" />
                Download Examples Markdown
              </a>
            </AptButton>
            <AptButton variant="outline" asChild>
              <a href="/docs/design/APT-ARCHITECTURE-REFERENCE.json" download>
                <Download className="h-4 w-4" />
                Download Reference JSON
              </a>
            </AptButton>
            {architectureExamplesCanonicalUrl ? (
              <AptButton variant="ghost" asChild>
                <a href={architectureExamplesCanonicalUrl} target="_blank" rel="noreferrer">
                  Open Examples Canonical
                </a>
              </AptButton>
            ) : null}
            {architectureReferenceCanonicalUrl ? (
              <AptButton variant="ghost" asChild>
                <a href={architectureReferenceCanonicalUrl} target="_blank" rel="noreferrer">
                  Open Reference Canonical
                </a>
              </AptButton>
            ) : null}
          </AptCardContent>
        </AptCard>
      </section>

      <section className="mb-16">
        <AptCard variant="subtle" padding="large">
          <AptCardHeader>
            <AptCardTitle className="text-xl">Validation Status</AptCardTitle>
            <AptCardDescription>
              Current public-safe validation snapshot for design system, architecture, and docs governance.
            </AptCardDescription>
          </AptCardHeader>
          <AptCardContent className="flex flex-wrap items-center gap-3">
            <AptTag variant={validationReport?.recommendation === "pass" ? "accent" : "outline"}>
              {validationReport ? validationReport.recommendation : "unavailable"}
            </AptTag>
            <AptButton variant="outline" asChild>
              <Link to="/design/validation">
                Open Validation Page
                <ArrowRight className="h-4 w-4" />
              </Link>
            </AptButton>
            <AptButton variant="outline" asChild>
              <a href="/docs/design/validation/LATEST.md" download>
                Download Validation Markdown
              </a>
            </AptButton>
            <AptButton variant="outline" asChild>
              <a href="/docs/design/validation/LATEST.json" download>
                Download Validation JSON
              </a>
            </AptButton>
          </AptCardContent>
        </AptCard>
      </section>

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

      <section className="mb-16">
        <SectionIntro
          title="When to Use It"
          description="APT architecture becomes most visible when projects need durable boundaries, repeatable deploys, and shared ownership without ambiguity."
          className="mb-6"
        />
        <div className="grid gap-4 md:grid-cols-3">
          {operatingSignals.map((signal) => (
            <AptCard key={signal.title} variant="subtle">
              <AptCardHeader>
                <AptCardTitle className="text-lg">{signal.title}</AptCardTitle>
              </AptCardHeader>
              <AptCardContent>
                <p className="text-sm text-muted-foreground">{signal.description}</p>
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

      <section className="mb-16">
        <SectionIntro
          title="Working Artifacts"
          description="Good architecture leaves behind concrete operating structures, not just principles or diagrams."
          className="mb-6"
        />
        <AptCard variant="default" padding="large">
          <div className="grid gap-4 md:grid-cols-2">
            {artifacts.map((artifact) => (
              <div key={artifact} className="flex items-start gap-3 rounded-lg border border-border/60 bg-background/40 p-4">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <p className="text-sm text-muted-foreground">{artifact}</p>
              </div>
            ))}
          </div>
        </AptCard>
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

      <section className="mb-16">
        <SectionIntro
          title="Failure Modes"
          description="APT architecture is designed to prevent these common structural breakdowns before they become expensive to reverse."
          className="mb-6"
        />
        <div className="grid gap-4 md:grid-cols-3">
          {antiPatterns.map((item) => (
            <AptCard key={item.title} variant="subtle">
              <AptCardHeader>
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-primary/10 p-2 text-primary">
                    <AlertTriangle className="h-4 w-4" />
                  </div>
                  <AptCardTitle className="text-lg">{item.title}</AptCardTitle>
                </div>
              </AptCardHeader>
              <AptCardContent>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </AptCardContent>
            </AptCard>
          ))}
        </div>
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
      <ReviewBundleCallout />
    </div>
  );
}
