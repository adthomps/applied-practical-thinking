import { Link } from "react-router-dom";
import {
  AptButton,
  AptCard,
  AptCardContent,
  AptCardDescription,
  AptCardFooter,
  AptCardHeader,
  AptCardTitle,
  AptTag,
  SectionIntro,
} from "@/components/apt";
import {
  ArrowRight,
  Bot,
  Download,
  FileText,
  FolderOpen,
  HardDriveDownload,
  Network,
  Palette,
  Route,
  Sparkles,
} from "lucide-react";

const bundleDocs = [
  {
    title: "Review Standard",
    path: "/docs/design/APT-REVIEW-STANDARD.md",
    filename: "APT-REVIEW-STANDARD.md",
    description: "The umbrella review contract for IA, design system usage, design architecture, systems, and content strategy.",
    icon: Bot,
    tag: "Start Here",
  },
  {
    title: "AI Review Bundle",
    path: "/docs/design/APT-AI-REVIEW-BUNDLE.md",
    filename: "APT-AI-REVIEW-BUNDLE.md",
    description: "The compact handoff file that tells an outside reviewer which doctrine documents to pair with the target work.",
    icon: FolderOpen,
    tag: "Bundle",
  },
  {
    title: "JSON Manifest",
    path: "/docs/design/APT-AI-REVIEW-BUNDLE.json",
    filename: "APT-AI-REVIEW-BUNDLE.json",
    description: "A machine-readable manifest for tool-driven review workflows, including entry points, document inventory, and recommended handoff sets.",
    icon: HardDriveDownload,
    tag: "Machine Readable",
  },
  {
    title: "Design Thinking",
    path: "/docs/design/APT-DESIGN-THINKING.md",
    filename: "APT-DESIGN-THINKING.md",
    description: "Use for problem framing, constraints, alternatives, and decision quality.",
    icon: Sparkles,
    tag: "Doctrine",
  },
  {
    title: "Design System",
    path: "/docs/design/APT-DESIGN-SYSTEM.md",
    filename: "APT-DESIGN-SYSTEM.md",
    description: "Use for tokens, components, spacing ownership, and shared APT primitives.",
    icon: Palette,
    tag: "Doctrine",
  },
  {
    title: "Design Architecture",
    path: "/docs/design/APT-DESIGN-ARCHITECTURE.md",
    filename: "APT-DESIGN-ARCHITECTURE.md",
    description: "Use for monorepo boundaries, deployment surfaces, prompt ownership, and service separation.",
    icon: Network,
    tag: "Doctrine",
  },
  {
    title: "Content Strategy",
    path: "/docs/design/APT-CONTENT-STRATEGY.md",
    filename: "APT-CONTENT-STRATEGY.md",
    description: "Use for naming, visitor intent, navigation, and content placement.",
    icon: Route,
    tag: "Doctrine",
  },
];

const routeCompanions = [
  {
    title: "Design",
    path: "/design",
    description: "The public doctrine index and the main entry point for design standards.",
  },
  {
    title: "Design Thinking",
    path: "/design/thinking",
    description: "Use when the review is about framing, alternatives, and decision-making quality.",
  },
  {
    title: "Design System",
    path: "/design/system",
    description: "Use when the review is about the shared component contract and visual language.",
  },
  {
    title: "Design Architecture",
    path: "/design/architecture",
    description: "Use when the review is about structure, boundaries, or deployment concerns.",
  },
  {
    title: "Content Strategy",
    path: "/design/content-strategy",
    description: "Use when the review is about IA, section roles, and public navigation.",
  },
  {
    title: "Systems",
    path: "/design/systems",
    description: "Use when the review depends on stable reference models and system relationships.",
  },
];

const handoffBundles = [
  {
    title: "Route review",
    items: ["Review Standard", "Design System", "Content Strategy", "Target route or page"],
  },
  {
    title: "Component review",
    items: ["Review Standard", "Design System", "Design Architecture", "Target component"],
  },
  {
    title: "Architecture review",
    items: ["Review Standard", "Design Architecture", "Target repo area or service boundary"],
  },
  {
    title: "Doctrine review",
    items: ["Review Standard", "Design Thinking", "Content Strategy", "Target doctrine change"],
  },
];

export default function PortfolioReviewBundle() {
  return (
    <div className="container py-12 md:py-16 space-y-16">
      <section>
        <SectionIntro
          title="AI Review Bundle"
          description="A single public handoff for standards-based review. Use this page when you want to point an external AI or collaborator to the review standard and the core doctrine docs without sending them through the full repo first."
          titleClassName="text-3xl md:text-4xl"
          descriptionClassName="text-lg"
          eyebrow={<AptTag variant="accent">AI Review Bundle</AptTag>}
        >
          <div className="flex flex-wrap gap-3">
            <AptButton asChild>
              <a href="/docs/design/APT-REVIEW-STANDARD.md" download>
                <Download className="h-4 w-4" />
                Download Review Standard
              </a>
            </AptButton>
            <AptButton variant="outline" asChild>
              <a href="/docs/design/APT-AI-REVIEW-BUNDLE.md" download>
                <FileText className="h-4 w-4" />
                Download Bundle Markdown
              </a>
            </AptButton>
            <AptButton variant="ghost" asChild>
              <a href="/docs/design/APT-AI-REVIEW-BUNDLE.json" download>
                <HardDriveDownload className="h-4 w-4" />
                Download JSON Manifest
              </a>
            </AptButton>
          </div>
        </SectionIntro>
      </section>

      <section>
        <SectionIntro
          title="Core bundle files"
          description="These are the public markdown assets that make the review bundle portable. Start with the review standard, then pair it with the doctrine docs that match the work under review."
          className="mb-6"
        />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {bundleDocs.map((doc) => {
            const Icon = doc.icon;
            return (
              <AptCard key={doc.title} variant="interactive" padding="large" className="h-full flex flex-col">
                <AptCardHeader className="p-0">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-primary/10 p-2 text-primary">
                        <Icon className="h-5 w-5" />
                      </div>
                      <AptTag variant={doc.tag === "Start Here" ? "accent" : "ghost"}>{doc.tag}</AptTag>
                    </div>
                  </div>
                  <AptCardTitle className="text-lg">{doc.title}</AptCardTitle>
                  <AptCardDescription>{doc.description}</AptCardDescription>
                </AptCardHeader>
                <AptCardContent className="mt-5">
                  <p className="text-xs text-muted-foreground">{doc.filename}</p>
                </AptCardContent>
                <AptCardFooter className="mt-auto flex-wrap px-0 pb-0">
                  <AptButton variant="outline" size="sm" asChild>
                    <a href={doc.path} target="_blank" rel="noreferrer">
                      Open
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </AptButton>
                  <AptButton variant="ghost" size="sm" asChild>
                    <a href={doc.path} download>
                      <Download className="h-4 w-4" />
                      Download
                    </a>
                  </AptButton>
                </AptCardFooter>
              </AptCard>
            );
          })}
        </div>
      </section>

      <section>
        <SectionIntro
          title="Use with the Design area"
          description="The markdown files are the portable handoff, but the route pages remain the clearest public reading experience when a reviewer needs more context."
          className="mb-6"
        />

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {routeCompanions.map((item) => (
            <Link key={item.path} to={item.path} className="block group">
              <AptCard variant="subtle" padding="large" className="h-full">
                <AptCardHeader className="p-0">
                  <AptCardTitle className="text-lg">{item.title}</AptCardTitle>
                  <AptCardDescription>{item.description}</AptCardDescription>
                </AptCardHeader>
                <AptCardFooter className="px-0 pb-0 border-0">
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-primary">
                    Open route
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </AptCardFooter>
              </AptCard>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <SectionIntro
          title="Recommended handoff sets"
          description="Use the smallest bundle that still gives the reviewer the governing standards and the target artifact."
          className="mb-6"
        />

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {handoffBundles.map((bundle) => (
            <AptCard key={bundle.title} variant="default" padding="large" className="h-full">
              <AptCardHeader className="p-0">
                <AptCardTitle className="text-lg">{bundle.title}</AptCardTitle>
              </AptCardHeader>
              <AptCardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {bundle.items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </AptCardContent>
            </AptCard>
          ))}
        </div>
      </section>
    </div>
  );
}