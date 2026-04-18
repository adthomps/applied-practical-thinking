import { Link } from "react-router-dom";
import {
  AptButton,
  AptCard,
  AptCardContent,
  AptCardDescription,
  AptCardHeader,
  AptCardTitle,
  AptTag,
  DesignDocVersionSwitcher,
  ReviewBundleCallout,
  SectionIntro,
} from "@/components/apt";
import { getWorkerApiConfigError, tryGetWorkerApiUrl } from "@/src/services/api";
import { useDesignDocVersion } from "@/hooks/useDesignDocVersion";
import { downloadWorkerMarkdown } from "@/src/services/download";
import { getAptPrincipleGroups } from "@/data/aptPrinciples";
import {
  ArrowRight,
  AlertTriangle,
  BookOpen,
  CheckCircle2,
  FlaskConical,
  LayoutGrid,
  Layers3,
  FileText,
  Route,
} from "lucide-react";

const pillars = [
  {
    icon: <BookOpen className="h-5 w-5" />,
    title: "Learn",
    description: "Articles, podcasts, guides, and worked examples that help people understand and apply the ideas.",
    rationale: "This is the educational surface. It should answer what APT believes and how to use it.",
  },
  {
    icon: <FlaskConical className="h-5 w-5" />,
    title: "Experiments",
    description: "Concepts, mocks, prototypes, and live demos that make proof visible before it becomes a stable reference.",
    rationale: "This is the experimentation surface. It should make proof visible without pretending every artifact is complete.",
  },
  {
    icon: <LayoutGrid className="h-5 w-5" />,
    title: "Design",
    description: "The operating doctrine behind APT: thinking, system, architecture, content strategy, and systems.",
    rationale: "This is the standards surface. It explains why the site is organized the way it is.",
  },
  {
    icon: <Layers3 className="h-5 w-5" />,
    title: "Systems",
    description: "Stable system references inside Design with architecture, decisions, constraints, and tradeoffs.",
    rationale: "This is the reference layer inside Design. It shows what has become coherent enough to reuse.",
  },
];

const visitorPaths = [
  {
    title: "I want to understand the ideas",
    path: "/learn",
    summary: "Start with Articles and Podcasts, then move into Guides when you need a practical path.",
  },
  {
    title: "I want reusable patterns",
    path: "/design/systems",
    summary: "Use Design > Systems when you need architecture, tradeoffs, and reference-model thinking.",
  },
  {
    title: "I want to see proof-of-work",
    path: "/experiments",
    summary: "Use Experiments for concepts and mocks, then Live Demos when you want to interact with the work.",
  },
];

const operatingSignals = [
  {
    title: "Use content strategy when labels could mislead",
    description: "This layer matters most when content types, site sections, and visitor goals could easily be confused without explicit structure.",
  },
  {
    title: "Organize around intent before internal taxonomy",
    description: "The public structure should match why a visitor came, not just how the team happens to store or produce the material.",
  },
  {
    title: "Treat IA as a product decision",
    description: "Navigation, section naming, and cross-links are part of the user experience, not an afterthought after the content exists.",
  },
];

const workingArtifacts = [
  "A top-level IA that separates learning, experiments, doctrine, and stable references",
  "Section names that communicate visitor intent without requiring insider language",
  "Cross-links that connect Learn, Experiments, Design, and Systems without collapsing them together",
  "A clear authored-source model so public content, doctrine, and internal docs do not drift",
];

const antiPatterns = [
  {
    title: "Format-First Taxonomy",
    description: "Grouping content only by media type instead of by what the visitor is trying to accomplish.",
  },
  {
    title: "Everything Is a Portfolio Piece",
    description: "Treating learning content, reference models, and experiments as if they all serve the same job in the system.",
  },
  {
    title: "Navigation by Internal Vocabulary",
    description: "Using labels that make sense to the builders but force visitors to decode the structure before they can use it.",
  },
];

const contentLifecycle = [
  {
    title: "Learn",
    summary: "Use when the job is explanation, instruction, or helping someone apply an idea.",
  },
  {
    title: "Experiments",
    summary: "Use when the job is proof, exploration, or showing work before it becomes stable doctrine or reference.",
  },
  {
    title: "Design",
    summary: "Use when the job is to define standards, method, architecture, or information strategy itself.",
  },
  {
    title: "Systems",
    summary: "Use when experiments have converged into a reusable reference model with decisions and tradeoffs worth preserving.",
  },
];

export default function PortfolioContentStrategy() {
  const contentStrategyVersion = useDesignDocVersion("content-strategy");
  const contentStrategyDocUrl = tryGetWorkerApiUrl(contentStrategyVersion.downloadApiPath);
  const contentStrategyCanonicalUrl = contentStrategyVersion.canonicalPath || null;
  const configError = getWorkerApiConfigError();

  const handleContentStrategyMarkdownDownload = async () => {
    const majorSuffix = contentStrategyVersion.activeMajor ? `-v${contentStrategyVersion.activeMajor}` : "";
    await downloadWorkerMarkdown(contentStrategyVersion.downloadApiPath, `apt-content-strategy${majorSuffix}.md`);
  };
  const relevantPrincipleGroups = getAptPrincipleGroups(["design", "system", "knowledge", "operations"]);

  return (
    <div className="container py-12 md:py-16 space-y-16">
      <section>
        <SectionIntro
          title="How APT Organizes Information"
          description="Content strategy at APT is not decoration. It is the information architecture that helps people understand what they are looking at, why it exists, and how to move from learning to reference to working proof."
          titleClassName="text-3xl md:text-4xl"
          descriptionClassName="text-lg"
          eyebrow={<AptTag variant="accent">Content Strategy</AptTag>}
        >
          <div className="flex flex-wrap gap-3">
            <AptButton variant="outline" asChild>
              <Link to="/start">
                <Route className="h-4 w-4" />
                Follow the Start Path
              </Link>
            </AptButton>
            <AptButton
              variant="ghost"
              type="button"
              onClick={() => {
                void handleContentStrategyMarkdownDownload();
              }}
              disabled={!contentStrategyDocUrl}
            >
              <FileText className="h-4 w-4" />
              Download Content Strategy Markdown
            </AptButton>
            {contentStrategyCanonicalUrl ? (
              <AptButton variant="ghost" asChild>
                <a href={contentStrategyCanonicalUrl} target="_blank" rel="noreferrer">
                  Open canonical
                </a>
              </AptButton>
            ) : null}
          </div>
          <DesignDocVersionSwitcher versionState={contentStrategyVersion} />
          {!contentStrategyDocUrl && configError ? (
            <p className="text-sm text-muted-foreground mt-3">
              Configure <code>{configError.envVar}</code> on the Pages project to enable full-doc links.
            </p>
          ) : null}
        </SectionIntro>
      </section>

      <section>
        <SectionIntro
          title="Relevant Principle Groups"
          description="Content Strategy aligns to the canonical principles framework. These are the groups most directly tied to naming, structure, and long-term clarity."
          className="mb-6"
        />
        <div className="grid gap-4 md:grid-cols-2">
          {relevantPrincipleGroups.map((group) => (
            <AptCard key={group.id} variant="default" className="h-full">
              <AptCardHeader>
                <div className="flex items-center justify-between gap-3">
                  <AptCardTitle className="text-lg">{group.title}</AptCardTitle>
                  <AptTag variant="outline" size="sm">{group.framing}</AptTag>
                </div>
              </AptCardHeader>
              <AptCardContent className="space-y-3">
                <ul className="space-y-1.5 text-sm text-muted-foreground">
                  {group.principles.slice(0, 3).map((item) => (
                    <li key={`${group.id}-${item}`} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <AptButton variant="ghost" size="sm" asChild className="px-0">
                  <Link to="/design/principles">
                    Open full framework
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </AptButton>
              </AptCardContent>
            </AptCard>
          ))}
        </div>
      </section>

      <section>
        <SectionIntro
          title="When to Use It"
          description="Content strategy becomes visible when structure, naming, and content relationships materially affect whether people can understand the system."
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

      <section>
        <SectionIntro
          title="Section Roles"
          description="Each top-level section has a distinct job so visitors do not have to infer the structure."
          className="mb-6"
        />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {pillars.map((pillar) => (
            <AptCard key={pillar.title} variant="interactive" className="h-full">
              <AptCardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="rounded-lg bg-primary/10 p-2 text-primary">
                    {pillar.icon}
                  </div>
                  <AptCardTitle>{pillar.title}</AptCardTitle>
                </div>
                <AptCardDescription>{pillar.description}</AptCardDescription>
              </AptCardHeader>
              <AptCardContent>
                <p className="text-sm text-muted-foreground">{pillar.rationale}</p>
              </AptCardContent>
            </AptCard>
          ))}
        </div>
      </section>

      <section>
        <SectionIntro
          title="Working Artifacts"
          description="Good content strategy leaves behind durable structures and rules, not just better prose."
          className="mb-6"
        />
        <AptCard variant="default" padding="large">
          <div className="grid gap-4 md:grid-cols-2">
            {workingArtifacts.map((artifact) => (
              <div key={artifact} className="flex items-start gap-3 rounded-lg border border-border/60 bg-background/40 p-4">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <p className="text-sm text-muted-foreground">{artifact}</p>
              </div>
            ))}
          </div>
        </AptCard>
      </section>

      <section>
        <SectionIntro
          title="Content Lifecycle"
          description="APT uses different sections for different stages of maturity and intent, so content does not all get forced into one undifferentiated portfolio bucket."
          className="mb-6"
        />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {contentLifecycle.map((stage) => (
            <AptCard key={stage.title} variant="subtle" className="h-full">
              <AptCardHeader>
                <AptCardTitle className="text-lg">{stage.title}</AptCardTitle>
              </AptCardHeader>
              <AptCardContent>
                <p className="text-sm text-muted-foreground">{stage.summary}</p>
              </AptCardContent>
            </AptCard>
          ))}
        </div>
      </section>

      <section>
        <SectionIntro
          title="Audience Paths"
          description="The site should meet visitors where they are instead of forcing them to learn internal labels first."
          className="mb-6"
        />
        <div className="grid gap-6 lg:grid-cols-3">
          {visitorPaths.map((path) => (
            <AptCard key={path.title} variant="feature" className="h-full">
              <AptCardHeader>
                <AptCardTitle className="text-lg">{path.title}</AptCardTitle>
                <AptCardDescription>{path.summary}</AptCardDescription>
              </AptCardHeader>
              <AptCardContent>
                <AptButton variant="ghost" asChild>
                  <Link to={path.path}>
                    Explore
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </AptButton>
              </AptCardContent>
            </AptCard>
          ))}
        </div>
      </section>

      <section>
        <SectionIntro
          title="Failure Modes"
          description="These are the patterns content strategy is meant to prevent before visitors feel the confusion as navigation friction."
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
      <ReviewBundleCallout />
    </div>
  );
}
