import { Link } from "react-router-dom";
import {
  AptButton,
  AptCard,
  AptCardHeader,
  AptCardTitle,
  AptCardDescription,
  AptCardContent,
  AptTag,
  ReviewBundleCallout,
  SectionIntro,
} from "@/components/apt";
import {
  Brain,
  Target,
  Scale,
  CheckCircle2,
  ArrowRight,
  AlertTriangle,
  Compass,
  Eye,
  Repeat,
  FileText,
} from "lucide-react";
import { getWorkerApiConfigError, tryGetWorkerApiUrl } from "@/src/services/api";
import { downloadWorkerMarkdown } from "@/src/services/download";
import { designThinkingFrameworks } from "@/data/designThinkingFrameworks";

interface FrameworkCardProps {
  slug: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  steps: string[];
  when: string;
}

function FrameworkCard({ slug, icon, title, description, steps, when }: FrameworkCardProps) {
  return (
    <Link to={`/design/thinking/${slug}`} className="block group">
      <AptCard variant="interactive" className="h-full">
        <AptCardHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                {icon}
              </div>
              <div>
                <AptTag variant="outline" size="sm" className="mb-2">Framework</AptTag>
                <AptCardTitle className="text-lg">{title}</AptCardTitle>
              </div>
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
          </div>
          <AptCardDescription>{description}</AptCardDescription>
        </AptCardHeader>
        <AptCardContent>
          <div className="space-y-4">
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Process</p>
              <ol className="space-y-1.5">
                {steps.slice(0, 3).map((step, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-secondary text-xs flex items-center justify-center">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
            <div className="pt-3 border-t border-border">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">When to use</p>
              <p className="text-sm text-muted-foreground">{when}</p>
            </div>
            <div className="pt-1">
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                Open framework
                <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </div>
        </AptCardContent>
      </AptCard>
    </Link>
  );
}

interface CaseStudyPreviewProps {
  title: string;
  problem: string;
  constraint: string;
  outcome: string;
  tags: string[];
}

function CaseStudyPreview({ title, problem, constraint, outcome, tags }: CaseStudyPreviewProps) {
  return (
    <AptCard variant="feature">
      <AptCardHeader>
        <div className="flex flex-wrap gap-2 mb-2">
          {tags.map((tag) => (
            <AptTag key={tag} variant="outline" size="sm">{tag}</AptTag>
          ))}
        </div>
        <AptCardTitle>{title}</AptCardTitle>
      </AptCardHeader>
      <AptCardContent>
        <div className="space-y-3">
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Problem</p>
            <p className="text-sm">{problem}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Constraint</p>
            <p className="text-sm">{constraint}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Outcome</p>
            <p className="text-sm text-accent">{outcome}</p>
          </div>
        </div>
      </AptCardContent>
    </AptCard>
  );
}

export default function PortfolioDesignThinking() {
  const thinkingDocUrl = tryGetWorkerApiUrl("/api/design/docs/thinking");
  const architectureDocUrl = tryGetWorkerApiUrl("/api/design/docs/architecture");
  const configError = getWorkerApiConfigError();
  const frameworks = designThinkingFrameworks;

  const handleThinkingMarkdownDownload = async () => {
    await downloadWorkerMarkdown("/api/design/docs/thinking", "apt-design-thinking.md");
  };

  const handleArchitectureMarkdownDownload = async () => {
    await downloadWorkerMarkdown("/api/design/docs/architecture", "apt-design-architecture.md");
  };

  const principles = [
    {
      icon: <Compass className="h-5 w-5" />,
      title: "Start with Why",
      description: "Every decision traces back to purpose. If you can't articulate why, you're not ready to decide how.",
    },
    {
      icon: <Eye className="h-5 w-5" />,
      title: "Make Thinking Visible",
      description: "Document reasoning, not just conclusions. Future you (and your team) will thank you.",
    },
    {
      icon: <Scale className="h-5 w-5" />,
      title: "Embrace Constraints",
      description: "Limitations aren't obstacles—they're the shape of the solution. Work with them, not against.",
    },
    {
      icon: <Repeat className="h-5 w-5" />,
      title: "Iterate Intentionally",
      description: "Every iteration should have a hypothesis. Wandering without learning is just busy work.",
    },
    {
      icon: <CheckCircle2 className="h-5 w-5" />,
      title: "Decide and Document",
      description: "Decisions deferred are decisions made. Capture the reasoning so you can revisit, not repeat.",
    },
    {
      icon: <Target className="h-5 w-5" />,
      title: "Optimize for Learning",
      description: "The goal isn't to be right the first time. It's to be less wrong faster.",
    },
  ];

  const operatingSignals = [
    {
      title: "Use formal thinking when stakes are high",
      description: "Use the full process when decisions are expensive to reverse, contested, or likely to set precedent for future work.",
    },
    {
      title: "Keep it light when the path is already proven",
      description: "Do not over-formalize simple, low-risk work. The method should add clarity, not bureaucracy.",
    },
    {
      title: "Document reasoning, not just the answer",
      description: "The value of design thinking compounds when future teams can see why a path was chosen and when it should be revisited.",
    },
  ];

  const antiPatterns = [
    {
      title: "Analysis Paralysis",
      description: "Research and planning continue indefinitely, but no decision or learning loop ever closes.",
    },
    {
      title: "Solution-First Thinking",
      description: "The team falls in love with a direction before it has defined the problem clearly enough to evaluate alternatives.",
    },
    {
      title: "Iteration Theater",
      description: "Versions keep shipping without explicit hypotheses, measures, or captured learning.",
    },
  ];

  const artifacts = [
    "Problem statements that define the symptom, affected people, and impact",
    "Assumption maps that expose what is known, believed, and guessed",
    "Constraint lists that separate hard boundaries from inherited defaults",
    "Decision records that explain why a path was chosen and what could invalidate it",
  ];

  const caseStudies = [
    {
      title: "APT Design System Architecture",
      problem: "Multiple projects with inconsistent UI patterns and duplicate component code",
      constraint: "Must work with existing Tailwind + shadcn setup, no additional dependencies",
      outcome: "Unified token system with 6 component variants, 50% reduction in CSS",
      tags: ["Design Systems", "Tokens", "DX"],
    },
    {
      title: "Navigation Restructure",
      problem: "Flat navigation couldn't communicate content hierarchy or relationships",
      constraint: "Preserve all existing routes, mobile-first responsive design",
      outcome: "Hover dropdowns with descriptions, reduced time-to-content by 2 clicks",
      tags: ["IA", "UX", "Navigation"],
    },
    {
      title: "Content Taxonomy",
      problem: "Learning content, system references, and experiments overlapped, confusing visitors",
      constraint: "Clarify Learn, Systems, Labs, and Design without breaking older links",
      outcome: "A clearer intent-based mental model with less navigation ambiguity",
      tags: ["IA", "Content Strategy"],
    },
  ];

  return (
    <div className="container py-12 md:py-16">
      {/* Hero */}
      <SectionIntro
        title="How Problems Get Solved"
        description="Problem framing, assumption testing, constraint mapping, and decision-making in practice. This is how problems are defined before solutions exist, the thinking that precedes the doing."
        titleClassName="text-3xl md:text-4xl"
        descriptionClassName="text-lg"
        eyebrow={<AptTag variant="accent">Design Thinking</AptTag>}
        className="mb-12"
      >
        <div className="flex flex-wrap gap-3">
          <AptButton
            variant="outline"
            onClick={() => {
              void handleThinkingMarkdownDownload();
            }}
            disabled={!thinkingDocUrl}
          >
            <FileText className="h-4 w-4" />
            Download Thinking Markdown
          </AptButton>
          <AptButton variant="ghost" asChild>
            <Link to="/design/architecture">
              Continue to Architecture
              <ArrowRight className="h-4 w-4" />
            </Link>
          </AptButton>
        </div>
        {!thinkingDocUrl && configError ? (
          <p className="text-sm text-muted-foreground mt-3">
            Configure <code>{configError.envVar}</code> on the Pages project to enable full-doc links.
          </p>
        ) : null}
      </SectionIntro>

      {/* Principles */}
      <section className="mb-16">
        <SectionIntro
          title="Core Principles"
          description="The governing habits behind how APT frames problems before it proposes solutions."
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

      {/* Frameworks */}
      <section className="mb-16">
        <SectionIntro
          title="Thinking Frameworks"
          description="Repeatable processes for tackling different types of problems."
          className="mb-6"
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {frameworks.map((framework) => (
            <FrameworkCard key={framework.title} {...framework} />
          ))}
        </div>
      </section>

      <section className="mb-16">
        <SectionIntro
          title="When to Use It"
          description="APT design thinking is most valuable when the cost of being wrong is meaningful and the right move is not obvious yet."
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

      <section className="mb-16">
        <SectionIntro
          title="Working Artifacts"
          description="Good thinking leaves durable outputs behind so decisions can be inspected, challenged, and reused later."
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

      {/* Applied Examples */}
      <section className="mb-16">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-6">
          <SectionIntro
            title="Applied Examples"
            description="Real decisions from APT projects, documented for reference."
          />
          <AptButton variant="ghost" asChild>
            <Link to="/learn/practice">
              All Practice <ArrowRight className="h-4 w-4" />
            </Link>
          </AptButton>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {caseStudies.map((study) => (
            <CaseStudyPreview key={study.title} {...study} />
          ))}
        </div>
      </section>

      <section className="mb-16">
        <SectionIntro
          title="Failure Modes"
          description="These are the patterns APT is trying to prevent. Design thinking becomes valuable when it keeps teams out of these traps."
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

      {/* Next Step CTA */}
      <section>
        <AptCard variant="feature" padding="large">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-primary/10 text-primary">
                <Brain className="h-6 w-6" />
              </div>
              <div>
                <AptTag variant="outline" size="sm" className="mb-2">Next Design Layer</AptTag>
                <h3 className="text-xl font-semibold mb-1">Design Architecture</h3>
                <p className="text-muted-foreground">
                  See how APT turns design thinking into delivery structure, ownership boundaries, and repeatable system decisions.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <AptButton variant="outline" asChild>
                <Link to="/design/architecture">
                  Open Architecture Page
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </AptButton>
              <AptButton
                variant="ghost"
                type="button"
                onClick={() => {
                  void handleArchitectureMarkdownDownload();
                }}
                disabled={!architectureDocUrl}
              >
                <FileText className="h-4 w-4" />
                Download Architecture Markdown
              </AptButton>
            </div>
          </div>
        </AptCard>
      </section>
      <ReviewBundleCallout />
    </div>
  );
}
