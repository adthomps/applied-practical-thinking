---
title: Graphify APT Gap Analysis 2026-05-23
version: v1
last_updated: 2026-05-23
owner: APT
status: draft
---

# Graphify APT Gap Analysis 2026-05-23

## Summary

This report uses the local Graphify workspace graph to collect raw traversal evidence for APT-wide knowledge, doctrine, implementation, and evidence gaps. It complements the deterministic APT validator and project-profile sweep; it does not replace either gate.

Graphify `query` returns nearby nodes and edges, not a polished narrative answer. Treat the sections below as evidence to inspect, then promote only source-supported findings into project-profile remediation or doctrine updates.

Graph source: `graphify-out/graph.json`

## Graph Hygiene Warning

This graph still contains generated, runtime, or validation-output paths that should be excluded from APT analysis:

- `playwright-cli/`
- `project-profile-validation-sweep-`

Rebuild the graph with the current staging filters before treating traversal results as useful evidence:

```bash
npm run graphify:apt -- --force
npm run graphify:gaps
```

## Highest-connected APT concepts

Traversal: BFS depth=2 | Start: ['APT', 'THEMES', 'THEMES'] | 62 nodes found

NODE index.ts [src=apt-dream-to-reality/packages/ui/src/index.ts loc=L1 community=7]
NODE Dream to Reality [src=apt-dream-to-reality/README.md loc=None community=82]
NODE utils.ts [src=apt-dream-to-reality/apps/web/src/lib/utils.ts loc=L1 community=117]
NODE utils.ts [src=apt-dream-to-reality/packages/ui/src/utils.ts loc=L1 community=7]
NODE chart.tsx [src=apt-dream-to-reality/packages/ui/src/chart.tsx loc=L1 community=384]
NODE chart.tsx [src=apt-dream-to-reality/apps/web/src/components/ui/chart.tsx loc=L1 community=382]
NODE ARCHITECTURE.md [src=applied-practical-thinking/docs/ARCHITECTURE.md loc=None community=192]
NODE Refine Requirements Prompt [src=apt-dream-to-reality/apps/worker/src/ai/prompts/refine-requirements.md loc=None community=91]
NODE Placeholder SVG [src=apt-dream-to-reality/apps/web/public/placeholder.svg loc=None community=27]
NODE Decision Log [src=apt-dream-to-reality/docs/DECISION_LOG.md loc=None community=310]
NODE Suggest Improvements Prompt [src=apt-dream-to-reality/apps/worker/src/ai/prompts/suggest-improvements.md loc=None community=82]
NODE ChartLegendContent [src=apt-dream-to-reality/packages/ui/src/chart.tsx loc=L259 community=384]
NODE ChartContextProps [src=apt-dream-to-reality/packages/ui/src/chart.tsx loc=L19 community=384]
NODE Generate Specification Prompt [src=apt-dream-to-reality/apps/worker/src/ai/prompts/generate-spec.md loc=None community=82]
NODE AI Integration [src=apt-dream-to-reality/docs/ai.md loc=None community=82]
NODE Design System Lint Checklist [src=apt-dream-to-reality/docs/design-system-lint-checklist.md loc=None community=82]
NODE License [src=apt-dream-to-reality/README.md loc=None community=82]
NODE Robots.txt [src=apt-dream-to-reality/apps/web/public/robots.txt loc=None community=82]
NODE Pull Request Template [src=apt-dream-to-reality/.github/pull_request_template.md loc=None community=82]
NODE ChartLegendContent [src=apt-dream-to-reality/apps/web/src/components/ui/chart.tsx loc=L260 community=382]
NODE getPayloadConfigFromPayload() [src=apt-dream-to-reality/packages/ui/src/chart.tsx loc=L318 community=384]
NODE Getting Started [src=apt-dream-to-reality/apps/web/public/docs/getting-started.md loc=None community=82]
NODE Deployment [src=apt-dream-to-reality/README.md loc=None community=82]
NODE Deploy Workflow [src=apt-dream-to-reality/.github/workflows/deploy.yml loc=None community=82]
NODE Quick Start [src=apt-dream-to-reality/README.md loc=None community=82]
NODE getPayloadConfigFromPayload() [src=apt-dream-to-reality/apps/web/src/components/ui/chart.tsx loc=L319 community=382]
NODE Features [src=apt-dream-to-reality/apps/web/public/docs/features.md loc=None community=82]
NODE ChartContainer [src=apt-dream-to-reality/packages/ui/src/chart.tsx loc=L35 community=384]
NODE ChartTooltipContent [src=apt-dream-to-reality/packages/ui/src/chart.tsx loc=L103 community=384]
NODE THEMES [src=apt-dream-to-reality/apps/web/src/components/ui/chart.tsx loc=L7 community=382]
NODE Start Prompt Example [src=apt-dream-to-reality/ai/prompts/start-prompt-example.md loc=None community=82]
NODE APT [src=apt-dream-to-reality/README.md loc=None community=82]
NODE Data Access [src=apt-dream-to-reality/README.md loc=None community=82]
NODE Overview [src=apt-dream-to-reality/apps/web/public/docs/overview.md loc=None community=82]
NODE ChartContext [src=apt-dream-to-reality/apps/web/src/components/ui/chart.tsx loc=L23 community=382]
NODE Contributing [src=apt-dream-to-reality/README.md loc=None community=82]
NODE ChartStyle() [src=apt-dream-to-reality/apps/web/src/components/ui/chart.tsx loc=L68 community=382]
NODE Deployment Guide [src=apt-dream-to-reality/docs/deployment.md loc=None community=82]
NODE ChartContextProps [src=apt-dream-to-reality/apps/web/src/components/ui/chart.tsx loc=L19 community=382]
NODE Technology Stack [src=apt-dream-to-reality/README.md loc=None community=82]
NODE Documentation [src=apt-dream-to-reality/README.md loc=None community=82]
NODE Index HTML [src=apt-dream-to-reality/apps/web/index.html loc=None community=82]
NODE Roadmap [src=apt-dream-to-reality/apps/web/public/docs/roadmap.md loc=None community=82]
NODE ChartContainer [src=apt-dream-to-reality/apps/web/src/components/ui/chart.tsx loc=L35 community=382]
NODE D1 Database Schema [src=apt-dream-to-reality/apps/worker/src/db/schema.md loc=None community=82]
NODE ChartStyle() [src=apt-dream-to-reality/packages/ui/src/chart.tsx loc=L68 community=384]
NODE THEMES [src=apt-dream-to-reality/packages/ui/src/chart.tsx loc=L7 community=384]
NODE APT Copilot Instructions [src=apt-dream-to-reality/.github/copilot-instructions.md loc=None community=82]
NODE useChart() [src=apt-dream-to-reality/apps/web/src/components/ui/chart.tsx loc=L25 community=382]
NODE Architecture [src=apt-dream-to-reality/docs/architecture.md loc=None community=82]
NODE useChart() [src=apt-dream-to-reality/packages/ui/src/chart.tsx loc=L25 community=384]
NODE ChartTooltipContent [src=apt-dream-to-reality/apps/web/src/components/ui/chart.tsx loc=L103 community=382]
NODE Cloudflare Migration Checklist [src=apt-dream-to-reality/docs/cloudflare-migration-checklist.md loc=None community=82]
NODE Governance Checks [src=apt-dream-to-reality/README.md loc=None community=82]
NODE ChartContext [src=apt-dream-to-reality/packages/ui/src/chart.tsx loc=L23 community=384]
NODE Cloudflare Worker Backend Integration [src=apt-dream-to-reality/docs/cloudflare-worker-backend.md loc=None community=82]
NODE Launch Status [src=apt-dream-to-reality/docs/alpha-status.md loc=None community=82]
NODE ChartConfig [src=apt-dream-to-reality/apps/web/src/components/ui/chart.tsx loc=L9 community=382]
NODE Workflow [src=apt-dream-to-reality/apps/web/public/docs/workflow.md loc=None community=82]
NODE API [src=apt-dream-to-reality/docs/api.md loc=None community=82]
NODE ChartConfig [src=apt-dream-to-reality/packages/ui/src/chart.tsx loc=L9 community=384]
NODE Security Policy [src=apt-dream-to-reality/.github/SECURITY.md loc=None community=82]
EDGE THEMES --contains [EXTRACTED]--> chart.tsx
EDGE THEMES --contains [EXTRACTED]--> chart.tsx
EDGE APT --references [EXTRACTED]--> Dream to Reality
EDGE chart.tsx --imports_from [EXTRACTED context=import]--> utils.ts
EDGE chart.tsx --contains [EXTRACTED]--> ChartConfig
EDGE chart.tsx --contains [EXTRACTED]--> ChartContextProps
EDGE chart.tsx --contains [EXTRACTED]--> ChartContext
EDGE chart.tsx --contains [EXTRACTED]--> useChart()
EDGE chart.tsx --contains [EXTRACTED]--> ChartContainer
EDGE chart.tsx --contains [EXTRACTED]--> ChartStyle()
EDGE chart.tsx --contains [EXTRACTED]--> ChartTooltipContent
EDGE chart.tsx --contains [EXTRACTED]--> ChartLegendContent
EDGE chart.tsx --contains [EXTRACTED]--> getPayloadConfigFromPayload()
EDGE chart.tsx --re_exports [EXTRACTED context=export]--> index.ts
EDGE chart.tsx --imports_from [EXTRACTED context=import]--> utils.ts
EDGE chart.tsx --contains [EXTRACTED]--> ChartConfig
EDGE chart.tsx --contains [EXTRACTED]--> ChartContextProps
EDGE chart.tsx --contains [EXTRACTED]--> ChartContext
EDGE chart.tsx --contains [EXTRACTED]--> useChart()
EDGE chart.tsx --contains [EXTRACTED]--> ChartContainer
EDGE chart.tsx --contains [EXTRACTED]--> ChartStyle()
EDGE chart.tsx --contains [EXTRACTED]--> ChartTooltipContent
EDGE chart.tsx --contains [EXTRACTED]--> ChartLegendContent
EDGE chart.tsx --contains [EXTRACTED]--> getPayloadConfigFromPayload()
EDGE Dream to Reality --references [EXTRACTED]--> ARCHITECTURE.md
... (truncated � 0 more nodes cut by ~2500-token budget. Narrow with context_filter=['call'] or use get_node for a specific symbol)

## Surprising cross-repo connections

Traversal: BFS depth=2 | Start: ['Project', 'Project', 'Project'] | 22 nodes found

NODE index.ts [src=apt-novel-reviewer/packages/types/src/index.ts loc=L1 community=46]
NODE index.ts [src=apt-novel-reviewer/packages/db/src/index.ts loc=L1 community=71]
NODE projects.ts [src=apt-novel-reviewer/packages/db/src/repositories/projects.ts loc=L1 community=46]
NODE getDb() [src=apt-novel-reviewer/packages/db/src/index.ts loc=L19 community=128]
NODE index.d.ts [src=apt-novel-reviewer/packages/db/src/index.d.ts loc=L1 community=128]
NODE index.d.ts [src=apt-novel-reviewer/packages/types/src/index.d.ts loc=L1 community=46]
NODE CreateProjectInput [src=apt-novel-reviewer/packages/types/src/project.ts loc=L11 community=46]
NODE project.ts [src=apt-novel-reviewer/packages/types/src/project.ts loc=L1 community=46]
NODE project.ts [src=apt-dream-to-reality/apps/web/src/types/project.ts loc=L1 community=114]
NODE Project [src=apt-novel-reviewer/packages/types/src/project.ts loc=L1 community=46]
NODE ProjectPhase [src=apt-dream-to-reality/apps/web/src/types/project.ts loc=L1 community=114]
NODE projects.d.ts [src=apt-novel-reviewer/packages/db/src/repositories/projects.d.ts loc=L1 community=46]
NODE project.d.ts [src=apt-novel-reviewer/packages/types/src/project.d.ts loc=L1 community=888]
NODE touchProject() [src=apt-novel-reviewer/packages/db/src/repositories/projects.ts loc=L32 community=46]
NODE deleteProject() [src=apt-novel-reviewer/packages/db/src/repositories/projects.ts loc=L39 community=46]
NODE CreateProjectInput [src=apt-novel-reviewer/packages/types/src/project.d.ts loc=L10 community=888]
NODE createProject() [src=apt-novel-reviewer/packages/db/src/repositories/projects.ts loc=L10 community=46]
NODE ProjectStatus [src=apt-dream-to-reality/apps/web/src/types/project.ts loc=L2 community=114]
NODE listProjects() [src=apt-novel-reviewer/packages/db/src/repositories/projects.ts loc=L5 community=46]
NODE Project [src=apt-dream-to-reality/apps/web/src/types/project.ts loc=L4 community=114]
NODE Comment [src=apt-dream-to-reality/apps/web/src/types/project.ts loc=L15 community=114]
NODE Project [src=apt-novel-reviewer/packages/types/src/project.d.ts loc=L1 community=888]
EDGE Project --contains [EXTRACTED]--> project.ts
EDGE Project --contains [EXTRACTED]--> project.d.ts
EDGE Project --imports [EXTRACTED context=import]--> projects.d.ts
EDGE Project --imports [EXTRACTED context=import]--> projects.ts
EDGE Project --contains [EXTRACTED]--> project.ts
EDGE project.ts --contains [EXTRACTED]--> ProjectPhase
EDGE project.ts --contains [EXTRACTED]--> ProjectStatus
EDGE project.ts --contains [EXTRACTED]--> Comment
EDGE project.d.ts --contains [EXTRACTED]--> CreateProjectInput
EDGE projects.ts --imports_from [EXTRACTED context=re-export]--> index.d.ts
EDGE projects.ts --imports_from [EXTRACTED context=import]--> index.ts
EDGE projects.ts --imports [EXTRACTED context=import]--> getDb()
EDGE projects.ts --imports_from [EXTRACTED context=import]--> index.ts
EDGE projects.ts --contains [EXTRACTED]--> listProjects()
EDGE projects.ts --contains [EXTRACTED]--> createProject()
EDGE projects.ts --contains [EXTRACTED]--> touchProject()
EDGE projects.ts --contains [EXTRACTED]--> deleteProject()
EDGE projects.ts --imports [EXTRACTED context=import]--> CreateProjectInput
EDGE projects.d.ts --imports_from [EXTRACTED context=import]--> index.ts
EDGE projects.d.ts --imports [EXTRACTED context=import]--> CreateProjectInput
EDGE project.ts --re_exports [EXTRACTED context=export]--> index.d.ts
EDGE project.ts --re_exports [EXTRACTED context=export]--> index.ts
EDGE project.ts --contains [EXTRACTED]--> CreateProjectInput

## Doctrine-to-code coverage gaps

Traversal: BFS depth=2 | Start: ['code', 'code', 'Project'] | 9 nodes found

NODE withings.ts [src=apt-coach/apps/api/src/routes/integrations/withings.ts loc=L1 community=11]
NODE oura.ts [src=apt-coach/apps/api/src/routes/integrations/oura.ts loc=L1 community=14]
NODE project.ts [src=apt-dream-to-reality/apps/web/src/types/project.ts loc=L1 community=114]
NODE ProjectPhase [src=apt-dream-to-reality/apps/web/src/types/project.ts loc=L1 community=114]
NODE Project [src=apt-dream-to-reality/apps/web/src/types/project.ts loc=L4 community=114]
NODE ProjectStatus [src=apt-dream-to-reality/apps/web/src/types/project.ts loc=L2 community=114]
NODE code [src=apt-coach/apps/api/src/routes/integrations/oura.ts loc=L236 community=14]
NODE code [src=apt-coach/apps/api/src/routes/integrations/withings.ts loc=L328 community=11]
NODE Comment [src=apt-dream-to-reality/apps/web/src/types/project.ts loc=L15 community=114]
EDGE Project --contains [EXTRACTED]--> project.ts
EDGE code --contains [EXTRACTED]--> oura.ts
EDGE code --contains [EXTRACTED]--> withings.ts
EDGE project.ts --contains [EXTRACTED]--> ProjectPhase
EDGE project.ts --contains [EXTRACTED]--> ProjectStatus
EDGE project.ts --contains [EXTRACTED]--> Comment

## Drift candidates

Traversal: BFS depth=2 | Start: ['APT', 'looksLikeMarkdown()', 'looksLikeJson()'] | 79 nodes found

NODE index.ts [src=apt-dream-to-reality/packages/ui/src/index.ts loc=L1 community=7]
NODE ProjectDetail() [src=apt-dream-to-reality/apps/web/src/pages/ProjectDetail.tsx loc=L232 community=19]
NODE Dream to Reality [src=apt-dream-to-reality/README.md loc=None community=82]
NODE index.ts [src=apt-dream-to-reality/apps/web/src/components/apt/index.ts loc=L1 community=27]
NODE useIssues.ts [src=apt-dream-to-reality/apps/web/src/hooks/useIssues.ts loc=L1 community=19]
NODE issue.ts [src=apt-dream-to-reality/apps/web/src/lib/schemas/issue.ts loc=L1 community=19]
NODE useProjects() [src=apt-dream-to-reality/apps/web/src/hooks/useProjects.ts loc=L20 community=9]
NODE AptCard [src=apt-dream-to-reality/apps/web/src/components/apt/AptCard.tsx loc=L31 community=27]
NODE App.tsx [src=apt-dream-to-reality/apps/web/src/App.tsx loc=L1 community=90]
NODE AptButton [src=apt-dream-to-reality/apps/web/src/components/apt/AptButton.tsx loc=L50 community=27]
NODE AptTag [src=apt-dream-to-reality/apps/web/src/components/apt/AptTag.tsx loc=L43 community=27]
NODE ErrorBoundary [src=apt-dream-to-reality/packages/ui/src/error-boundary.tsx loc=L17 community=53]
NODE AptCardContent [src=apt-dream-to-reality/apps/web/src/components/apt/AptCard.tsx loc=L83 community=27]
NODE useSpecs.ts [src=apt-dream-to-reality/apps/web/src/hooks/useSpecs.ts loc=L1 community=19]
NODE AptCardTitle [src=apt-dream-to-reality/apps/web/src/components/apt/AptCard.tsx loc=L59 community=27]
NODE ARCHITECTURE.md [src=applied-practical-thinking/docs/ARCHITECTURE.md loc=None community=192]
NODE EmptyState() [src=apt-dream-to-reality/packages/ui/src/empty-state.tsx loc=L44 community=7]
NODE AptCardHeader [src=apt-dream-to-reality/apps/web/src/components/apt/AptCard.tsx loc=L47 community=27]
NODE Refine Requirements Prompt [src=apt-dream-to-reality/apps/worker/src/ai/prompts/refine-requirements.md loc=None community=91]
NODE Issue [src=apt-dream-to-reality/apps/web/src/lib/schemas/issue.ts loc=L39 community=19]
NODE IssueStatus [src=apt-dream-to-reality/apps/web/src/lib/schemas/issue.ts loc=L15 community=19]
NODE useProject() [src=apt-dream-to-reality/apps/web/src/hooks/useProjects.ts loc=L32 community=9]
NODE Placeholder SVG [src=apt-dream-to-reality/apps/web/public/placeholder.svg loc=None community=27]
NODE formatSpecForDisplay() [src=apt-dream-to-reality/apps/web/src/pages/ProjectDetail.tsx loc=L96 community=19]
NODE STATUS_COLORS [src=apt-dream-to-reality/apps/web/src/pages/ProjectDetail.tsx loc=L197 community=31]
NODE looksLikeJson() [src=apt-dream-to-reality/apps/web/src/pages/ProjectDetail.tsx loc=L91 community=19]
NODE Decision Log [src=apt-dream-to-reality/docs/DECISION_LOG.md loc=None community=310]
NODE useGenerateSpec() [src=apt-dream-to-reality/apps/web/src/hooks/useSpecs.ts loc=L51 community=19]
NODE useProjectEpics() [src=apt-dream-to-reality/apps/web/src/hooks/useIssues.ts loc=L28 community=19]
NODE useTransitionIssue() [src=apt-dream-to-reality/apps/web/src/hooks/useIssues.ts loc=L86 community=19]
NODE useSaveSpec() [src=apt-dream-to-reality/apps/web/src/hooks/useSpecs.ts loc=L31 community=19]
NODE looksLikeMarkdown() [src=apt-dream-to-reality/apps/web/src/pages/ProjectDetail.tsx loc=L118 community=19]
NODE useEpicSpecs() [src=apt-dream-to-reality/apps/web/src/hooks/useSpecs.ts loc=L19 community=19]
NODE shouldRenderSpecAsPlainText() [src=apt-dream-to-reality/apps/web/src/pages/ProjectDetail.tsx loc=L135 community=19]
NODE useCreateIssue() [src=apt-dream-to-reality/apps/web/src/hooks/useIssues.ts loc=L46 community=19]
NODE useUpdateIssue() [src=apt-dream-to-reality/apps/web/src/hooks/useIssues.ts loc=L69 community=19]
NODE Quick Start [src=apt-dream-to-reality/README.md loc=None community=82]
NODE Generate Specification Prompt [src=apt-dream-to-reality/apps/worker/src/ai/prompts/generate-spec.md loc=None community=82]
NODE defaultIssueDraft [src=apt-dream-to-reality/apps/web/src/pages/ProjectDetail.tsx loc=L222 community=19]
NODE AI Integration [src=apt-dream-to-reality/docs/ai.md loc=None community=82]
NODE License [src=apt-dream-to-reality/README.md loc=None community=82]
NODE Security Policy [src=apt-dream-to-reality/.github/SECURITY.md loc=None community=82]
NODE API [src=apt-dream-to-reality/docs/api.md loc=None community=82]
NODE Contributing [src=apt-dream-to-reality/README.md loc=None community=82]
NODE Cloudflare Worker Backend Integration [src=apt-dream-to-reality/docs/cloudflare-worker-backend.md loc=None community=82]
NODE TYPE_ICONS [src=apt-dream-to-reality/apps/web/src/pages/ProjectDetail.tsx loc=L190 community=19]
NODE Cloudflare Migration Checklist [src=apt-dream-to-reality/docs/cloudflare-migration-checklist.md loc=None community=82]
NODE Data Access [src=apt-dream-to-reality/README.md loc=None community=82]
NODE Overview [src=apt-dream-to-reality/apps/web/public/docs/overview.md loc=None community=82]
NODE Index HTML [src=apt-dream-to-reality/apps/web/index.html loc=None community=82]
NODE Robots.txt [src=apt-dream-to-reality/apps/web/public/robots.txt loc=None community=82]
NODE Technology Stack [src=apt-dream-to-reality/README.md loc=None community=82]
NODE TYPE_COLORS [src=apt-dream-to-reality/apps/web/src/pages/ProjectDetail.tsx loc=L204 community=19]
NODE defaultFormData [src=apt-dream-to-reality/apps/web/src/pages/ProjectDetail.tsx loc=L211 community=19]
NODE Architecture [src=apt-dream-to-reality/docs/architecture.md loc=None community=82]
NODE getSpecTabLabel() [src=apt-dream-to-reality/apps/web/src/pages/ProjectDetail.tsx loc=L164 community=19]
NODE Start Prompt Example [src=apt-dream-to-reality/ai/prompts/start-prompt-example.md loc=None community=82]
NODE Governance Checks [src=apt-dream-to-reality/README.md loc=None community=82]
NODE Deploy Workflow [src=apt-dream-to-reality/.github/workflows/deploy.yml loc=None community=82]
NODE Getting Started [src=apt-dream-to-reality/apps/web/public/docs/getting-started.md loc=None community=82]
NODE Deployment Guide [src=apt-dream-to-reality/docs/deployment.md loc=None community=82]
NODE Documentation [src=apt-dream-to-reality/README.md loc=None community=82]
NODE Roadmap [src=apt-dream-to-reality/apps/web/public/docs/roadmap.md loc=None community=82]
NODE APT [src=apt-dream-to-reality/README.md loc=None community=82]
NODE APT Copilot Instructions [src=apt-dream-to-reality/.github/copilot-instructions.md loc=None community=82]
NODE Design System Lint Checklist [src=apt-dream-to-reality/docs/design-system-lint-checklist.md loc=None community=82]
NODE Features [src=apt-dream-to-reality/apps/web/public/docs/features.md loc=None community=82]
NODE D1 Database Schema [src=apt-dream-to-reality/apps/worker/src/db/schema.md loc=None community=82]
NODE Launch Status [src=apt-dream-to-reality/docs/alpha-status.md loc=None community=82]
NODE Deployment [src=apt-dream-to-reality/README.md loc=None community=82]
NODE getSpecPlaceholder() [src=apt-dream-to-reality/apps/web/src/pages/ProjectDetail.tsx loc=L170 community=19]
NODE Pull Request Template [src=apt-dream-to-reality/.github/pull_request_template.md loc=None community=82]
NODE TYPE_TAG_VARIANT [src=apt-dream-to-reality/apps/web/src/pages/ProjectDetail.tsx loc=L183 community=19]
NODE formatDateDetail() [src=apt-dream-to-reality/apps/web/src/pages/ProjectDetail.tsx loc=L152 community=19]
NODE Workflow [src=apt-dream-to-reality/apps/web/public/docs/workflow.md loc=None community=82]
NODE STATUS_COLUMNS [src=apt-dream-to-reality/apps/web/src/pages/ProjectDetail.tsx loc=L176 community=19]
... (truncated � 3 more nodes cut by ~2500-token budget. Narrow with context_filter=['call'] or use get_node for a specific symbol)

## Remediation queue by APT layer

Traversal: BFS depth=2 | Start: ['APT', 'Most Used', 'Most Used'] | 41 nodes found

NODE Dream to Reality [src=apt-dream-to-reality/README.md loc=None community=82]
NODE ARCHITECTURE.md [src=applied-practical-thinking/docs/ARCHITECTURE.md loc=None community=192]
NODE Refine Requirements Prompt [src=apt-dream-to-reality/apps/worker/src/ai/prompts/refine-requirements.md loc=None community=91]
NODE Placeholder SVG [src=apt-dream-to-reality/apps/web/public/placeholder.svg loc=None community=27]
NODE Decision Log [src=apt-dream-to-reality/docs/DECISION_LOG.md loc=None community=310]
NODE Most Used [src=applied-practical-thinking/playwright-cli/page-2026-04-18T22-08-01-807Z.yml loc=None community=935]
NODE Start Prompt Example [src=apt-dream-to-reality/ai/prompts/start-prompt-example.md loc=None community=82]
NODE Overview [src=apt-dream-to-reality/apps/web/public/docs/overview.md loc=None community=82]
NODE Index HTML [src=apt-dream-to-reality/apps/web/index.html loc=None community=82]
NODE APT Copilot Instructions [src=apt-dream-to-reality/.github/copilot-instructions.md loc=None community=82]
NODE Getting Started [src=apt-dream-to-reality/apps/web/public/docs/getting-started.md loc=None community=82]
NODE Launch Status [src=apt-dream-to-reality/docs/alpha-status.md loc=None community=82]
NODE Deployment Guide [src=apt-dream-to-reality/docs/deployment.md loc=None community=82]
NODE Contributing [src=apt-dream-to-reality/README.md loc=None community=82]
NODE Core Design Thinking [src=applied-practical-thinking/playwright-cli/page-2026-04-18T22-08-01-807Z.yml loc=None community=935]
NODE Most Used [src=applied-practical-thinking/playwright-cli/page-2026-04-18T22-08-08-537Z.yml loc=None community=940]
NODE Suggest Improvements Prompt [src=apt-dream-to-reality/apps/worker/src/ai/prompts/suggest-improvements.md loc=None community=82]
NODE Cloudflare Worker Backend Integration [src=apt-dream-to-reality/docs/cloudflare-worker-backend.md loc=None community=82]
NODE Documentation [src=apt-dream-to-reality/README.md loc=None community=82]
NODE Roadmap [src=apt-dream-to-reality/apps/web/public/docs/roadmap.md loc=None community=82]
NODE Generate Specification Prompt [src=apt-dream-to-reality/apps/worker/src/ai/prompts/generate-spec.md loc=None community=82]
NODE Robots.txt [src=apt-dream-to-reality/apps/web/public/robots.txt loc=None community=82]
NODE Quick Start [src=apt-dream-to-reality/README.md loc=None community=82]
NODE Deploy Workflow [src=apt-dream-to-reality/.github/workflows/deploy.yml loc=None community=82]
NODE Features [src=apt-dream-to-reality/apps/web/public/docs/features.md loc=None community=82]
NODE API [src=apt-dream-to-reality/docs/api.md loc=None community=82]
NODE AI Integration [src=apt-dream-to-reality/docs/ai.md loc=None community=82]
NODE Governance Checks [src=apt-dream-to-reality/README.md loc=None community=82]
NODE Architecture [src=apt-dream-to-reality/docs/architecture.md loc=None community=82]
NODE Security Policy [src=apt-dream-to-reality/.github/SECURITY.md loc=None community=82]
NODE D1 Database Schema [src=apt-dream-to-reality/apps/worker/src/db/schema.md loc=None community=82]
NODE Technology Stack [src=apt-dream-to-reality/README.md loc=None community=82]
NODE Deployment [src=apt-dream-to-reality/README.md loc=None community=82]
NODE Cloudflare Migration Checklist [src=apt-dream-to-reality/docs/cloudflare-migration-checklist.md loc=None community=82]
NODE APT [src=apt-dream-to-reality/README.md loc=None community=82]
NODE License [src=apt-dream-to-reality/README.md loc=None community=82]
NODE Design System Lint Checklist [src=apt-dream-to-reality/docs/design-system-lint-checklist.md loc=None community=82]
NODE Core Design Thinking [src=applied-practical-thinking/playwright-cli/page-2026-04-18T22-08-08-537Z.yml loc=None community=940]
NODE Workflow [src=apt-dream-to-reality/apps/web/public/docs/workflow.md loc=None community=82]
NODE Pull Request Template [src=apt-dream-to-reality/.github/pull_request_template.md loc=None community=82]
NODE Data Access [src=apt-dream-to-reality/README.md loc=None community=82]
EDGE Most Used --references [EXTRACTED]--> Core Design Thinking
EDGE Most Used --references [EXTRACTED]--> Core Design Thinking
EDGE APT --references [EXTRACTED]--> Dream to Reality
EDGE Dream to Reality --references [EXTRACTED]--> ARCHITECTURE.md
EDGE Dream to Reality --references [EXTRACTED]--> Quick Start
EDGE Dream to Reality --references [EXTRACTED]--> Technology Stack
EDGE Dream to Reality --references [EXTRACTED]--> Data Access
EDGE Dream to Reality --references [EXTRACTED]--> Deployment
EDGE Dream to Reality --references [EXTRACTED]--> Documentation
EDGE Dream to Reality --references [EXTRACTED]--> Governance Checks
EDGE Dream to Reality --references [EXTRACTED]--> Contributing
EDGE Dream to Reality --references [EXTRACTED]--> License
EDGE Dream to Reality --references [EXTRACTED]--> APT Copilot Instructions
EDGE Dream to Reality --references [EXTRACTED]--> Pull Request Template
EDGE Dream to Reality --references [EXTRACTED]--> Security Policy
EDGE Dream to Reality --references [EXTRACTED]--> Deploy Workflow
EDGE Dream to Reality --references [EXTRACTED]--> Start Prompt Example
EDGE Dream to Reality --references [EXTRACTED]--> Index HTML
EDGE Dream to Reality --references [EXTRACTED]--> Robots.txt
EDGE Dream to Reality --references [EXTRACTED]--> Placeholder SVG
EDGE Dream to Reality --references [EXTRACTED]--> Features
EDGE Dream to Reality --references [EXTRACTED]--> Getting Started
EDGE Dream to Reality --references [EXTRACTED]--> Overview
EDGE Dream to Reality --references [EXTRACTED]--> Roadmap
EDGE Dream to Reality --references [EXTRACTED]--> Workflow
EDGE Dream to Reality --references [EXTRACTED]--> Generate Specification Prompt
EDGE Dream to Reality --references [EXTRACTED]--> Refine Requirements Prompt
EDGE Dream to Reality --references [EXTRACTED]--> Suggest Improvements Prompt
EDGE Dream to Reality --references [EXTRACTED]--> D1 Database Schema
EDGE Dream to Reality --references [EXTRACTED]--> AI Integration
EDGE Dream to Reality --references [EXTRACTED]--> Launch Status
EDGE Dream to Reality --references [EXTRACTED]--> API
EDGE Dream to Reality --references [EXTRACTED]--> Architecture
EDGE Dream to Reality --references [EXTRACTED]--> Cloudflare Migration Checklist
EDGE Dream to Reality --references [EXTRACTED]--> Cloudflare Worker Backend Integration
EDGE Dream to Reality --references [EXTRACTED]--> Decision Log
EDGE Dream to Reality --references [EXTRACTED]--> Deployment Guide
EDGE Dream to Reality --references [EXTRACTED]--> Design System Lint Checklist

## Known Validation Drift Candidates

Source: `project-profile-validation-sweep-2026-04-27.md`

- applied-practical-thinking: Keep docs/apt/adoption.md and docs/apt/project-profile.md updated whenever architecture, validation flow, or maturity posture changes.
- applied-practical-thinking: Maintain schema-compatible docs/apt/references/project-profile.json and enforce validation in CI.
- applied-practical-thinking: Add a short AI adoption note covering prompt ownership, worker route boundaries, and human-review expectations.
- apt-coach: Keep docs/apt/adoption.md and docs/apt/project-profile.md updated as constraints, maturity, and security posture evolve.
- apt-coach: Split dev/prod D1 databases when a production-safe replacement binding is available; until then, follow the temporary risk acceptance in docs/DECISION_LOG.md.
- apt-coach: Resolve duplicate migration prefix 0013 in a migration-safe pass that first confirms which migrations are already applied remotely.
- apt-dream-to-reality: Create docs/apt/adoption.md with adoption mode apply + showcase, canonical source, validation commands, and local exceptions.
- apt-dream-to-reality: Create docs/apt/project-profile.md describing Dream to Reality as an APT planning/spec workflow example.
- apt-dream-to-reality: Resolve prompt canonicality: either generate index.ts content from Markdown or mark Markdown files as reference-only and align versions.
- apt-novel-reviewer: Add a short desktop release/operations note for packaging, native dependency support, and Ollama runtime prerequisites.

## Recommended Next Pass

- Convert high-confidence Graphify findings into project-profile remediation items.
- Update canonical doctrine only when the graph finding is supported by source evidence.
- Re-run `npm run validate`, `npm run sweep:project-profiles`, and this report after remediation.

