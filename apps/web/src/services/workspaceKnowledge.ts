type WorkspaceKnowledgeContext = "design-system" | "design-architecture";

type WorkspaceKnowledgeContextCopy = {
  title: string;
  emphasis: string[];
};

const contextCopy: Record<WorkspaceKnowledgeContext, WorkspaceKnowledgeContextCopy> = {
  "design-system": {
    title: "APT Design System",
    emphasis: [
      "Use semantic tokens only (`bg-background`, `text-foreground`, etc.).",
      "Prefer shared primitives from `@apt/ui` and app-level composition from `apps/web/components/apt`.",
      "Preserve accessibility and readability over decorative complexity.",
    ],
  },
  "design-architecture": {
    title: "APT Design Architecture",
    emphasis: [
      "Preserve explicit boundaries between web app, worker runtime, and shared packages.",
      "Keep source-of-truth content in authored locations, not generated `public/` copies.",
      "Favor enforceable contracts (types, manifests, route/module boundaries) over implicit conventions.",
    ],
  },
};

function buildWorkspaceKnowledgeMarkdown(context: WorkspaceKnowledgeContext): string {
  const now = new Date().toISOString();
  const copy = contextCopy[context];

  return [
    "# Workspace Knowledge",
    "",
    "Set shared rules and preferences that apply to every project in this workspace.",
    "",
    `- Generated: ${now}`,
    `- Context: ${copy.title}`,
    "",
    "## Shared Rules and Preferences",
    "",
    "### 1) Coding Style and Naming Conventions",
    "- Prefer clear, explicit names over abbreviations.",
    "- Keep files organized by domain responsibility (route, hook, service, data).",
    "- Favor typed contracts and reusable helpers over repeated inline logic.",
    "",
    "### 2) Preferred Libraries, Frameworks, and Patterns",
    "- Frontend: React + TypeScript + semantic design tokens.",
    "- Data loading: React Query with shared query keys and route-level hooks.",
    "- UI primitives: `@apt/ui` first, app composition in `components/apt`.",
    "",
    "### 3) Behavioral Rules (Tone, Language, Formatting)",
    "- Keep documentation direct, practical, and operational.",
    "- Use consistent labels for IA sections and route naming.",
    "- Prefer concise, scannable structure with predictable section ordering.",
    "",
    "## Context Focus",
    ...copy.emphasis.map((line) => `- ${line}`),
    "",
    "## Adoption Checklist",
    "- Confirm rules are reflected in code review guidance.",
    "- Confirm shared query key + hook patterns are used for new pages.",
    "- Confirm design documentation routes and nav remain curated and non-duplicative.",
    "",
  ].join("\n");
}

export function downloadWorkspaceKnowledge(context: WorkspaceKnowledgeContext) {
  const markdown = buildWorkspaceKnowledgeMarkdown(context);
  const filename = `apt-workspace-knowledge-${context}.md`;
  const blob = new Blob([markdown], { type: "text/markdown;charset=utf-8" });
  const objectUrl = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = objectUrl;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(objectUrl);
}

export type { WorkspaceKnowledgeContext };

