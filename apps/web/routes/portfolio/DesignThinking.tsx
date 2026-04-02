import { Link } from "react-router-dom";
import {
  AptButton,
  AptCard,
  AptCardHeader,
  AptCardTitle,
  AptCardDescription,
  AptCardContent,
  AptTag,
} from "@/components/apt";
import {
  Brain,
  Target,
  Lightbulb,
  Scale,
  GitBranch,
  CheckCircle2,
  ArrowRight,
  AlertTriangle,
  Compass,
  Layers,
  Eye,
  Repeat,
  FileText,
} from "lucide-react";
import { tryGetWorkerApiUrl } from "@/src/services/api";

interface FrameworkCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  steps: string[];
  when: string;
}

function FrameworkCard({ icon, title, description, steps, when }: FrameworkCardProps) {
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
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Process</p>
            <ol className="space-y-1.5">
              {steps.map((step, i) => (
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
        </div>
      </AptCardContent>
    </AptCard>
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
  const frameworks = [
    {
      icon: <Target className="h-5 w-5" />,
      title: "Problem Framing",
      description: "Define the problem before jumping to solutions.",
      steps: [
        "State the observable symptom",
        "Identify who experiences it",
        "Quantify the impact",
        "Ask 'why' 5 times",
        "Reframe as opportunity",
      ],
      when: "Starting any new project or when solutions aren't working",
    },
    {
      icon: <AlertTriangle className="h-5 w-5" />,
      title: "Assumption Mapping",
      description: "Surface and test the beliefs driving decisions.",
      steps: [
        "List all assumptions",
        "Rate by risk and certainty",
        "Identify killer assumptions",
        "Design validation tests",
        "Update based on evidence",
      ],
      when: "Before major investments or when facing uncertainty",
    },
    {
      icon: <Scale className="h-5 w-5" />,
      title: "Constraint Analysis",
      description: "Use limitations as creative forcing functions.",
      steps: [
        "List hard constraints (non-negotiable)",
        "List soft constraints (preferences)",
        "Identify hidden constraints",
        "Rank by impact on solution space",
        "Design within, not around",
      ],
      when: "When the solution space feels too large or undefined",
    },
    {
      icon: <GitBranch className="h-5 w-5" />,
      title: "Decision Trees",
      description: "Map decision points and their consequences.",
      steps: [
        "Identify the core decision",
        "Branch into options",
        "Map second-order effects",
        "Assign probabilities",
        "Calculate expected value",
      ],
      when: "Facing irreversible decisions or multiple viable paths",
    },
    {
      icon: <Repeat className="h-5 w-5" />,
      title: "Iteration Cycles",
      description: "Build learning into the development process.",
      steps: [
        "Define the hypothesis",
        "Build minimum viable test",
        "Measure against criteria",
        "Learn and document",
        "Decide: pivot, persevere, or pause",
      ],
      when: "Building anything new or improving existing systems",
    },
    {
      icon: <Layers className="h-5 w-5" />,
      title: "Systems Mapping",
      description: "Understand the relationships between components.",
      steps: [
        "Identify system boundaries",
        "Map inputs and outputs",
        "Trace feedback loops",
        "Find leverage points",
        "Model interventions",
      ],
      when: "Dealing with complex, interconnected problems",
    },
  ];

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
      <div className="max-w-3xl mb-12">
        <div className="flex items-center gap-3 mb-4">
          <AptTag variant="accent">Design Thinking</AptTag>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          How Problems Get Solved
        </h1>
        <p className="text-lg text-muted-foreground mb-6">
          Problem framing, assumption testing, constraint mapping, and decision-making in practice. 
          This is how problems are defined before solutions exist—the thinking that precedes the doing.
        </p>
        <AptButton variant="outline" asChild>
          <a
            href={thinkingDocUrl || "#"}
            target={thinkingDocUrl ? "_blank" : undefined}
            rel={thinkingDocUrl ? "noopener noreferrer" : undefined}
            aria-disabled={!thinkingDocUrl}
          >
            <FileText className="h-4 w-4" />
            View Full Framework
          </a>
        </AptButton>
      </div>

      {/* Principles */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold tracking-tight mb-6">Core Principles</h2>
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
        <h2 className="text-2xl font-semibold tracking-tight mb-2">Thinking Frameworks</h2>
        <p className="text-muted-foreground mb-6">
          Repeatable processes for tackling different types of problems.
        </p>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {frameworks.map((framework) => (
            <FrameworkCard key={framework.title} {...framework} />
          ))}
        </div>
      </section>

      {/* Case Studies */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight mb-2">Applied Examples</h2>
            <p className="text-muted-foreground">
              Real decisions from APT projects, documented for reference.
            </p>
          </div>
          <AptButton variant="ghost" asChild>
            <Link to="/learn/guides">
              All Guides <ArrowRight className="h-4 w-4" />
            </Link>
          </AptButton>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {caseStudies.map((study) => (
            <CaseStudyPreview key={study.title} {...study} />
          ))}
        </div>
      </section>

      {/* Next Step CTA */}
      <section>
        <AptCard variant="feature" padding="large">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-primary/10 text-primary">
                <Brain className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-1">Design Architecture</h3>
                <p className="text-muted-foreground">
                  See how APT turns design thinking into delivery structure, ownership boundaries, and repeatable system decisions.
                </p>
              </div>
            </div>
            <AptButton asChild>
              <a
                href={architectureDocUrl || "#"}
                target={architectureDocUrl ? "_blank" : undefined}
                rel={architectureDocUrl ? "noopener noreferrer" : undefined}
                aria-disabled={!architectureDocUrl}
              >
                View Architecture
                <ArrowRight className="h-4 w-4" />
              </a>
            </AptButton>
          </div>
        </AptCard>
      </section>
    </div>
  );
}
