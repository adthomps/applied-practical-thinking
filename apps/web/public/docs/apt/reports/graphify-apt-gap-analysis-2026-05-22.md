---
title: Graphify APT Gap Analysis 2026-05-22
version: v1
last_updated: 2026-05-22
owner: APT
status: draft
---

# Graphify APT Gap Analysis 2026-05-22

## Summary

This report uses the local Graphify workspace graph to collect raw traversal evidence for APT-wide knowledge, doctrine, implementation, and evidence gaps. It complements the deterministic APT validator and project-profile sweep; it does not replace either gate.

Graphify `query` returns nearby nodes and edges, not a polished narrative answer. Treat the sections below as evidence to inspect, then promote only source-supported findings into project-profile remediation or doctrine updates.

Graph source: `graphify-out/graph.json`

## Highest-connected APT concepts

Traversal: BFS depth=2 | Start: ['APT', 'THEMES', 'THEMES'] | 61 nodes found

NODE index.ts [src=apt-dream-to-reality/packages/ui/src/index.ts loc=L1 community=11]
NODE Design System [src=applied-practical-thinking/apps/worker/src/ai/docs/design-system.md loc=None community=4]
NODE utils.ts [src=apt-dream-to-reality/apps/web/src/lib/utils.ts loc=L1 community=76]
NODE Design Architecture [src=applied-practical-thinking/output/playwright/audit/desktop-home-00-initial.md loc=None community=4]
NODE utils.ts [src=apt-dream-to-reality/packages/ui/src/utils.ts loc=L1 community=11]
NODE Applied Practical Thinking [src=applied-practical-thinking/playwright-cli/page-2026-04-18T21-30-27-332Z.yml loc=None community=95]
NODE Design [src=applied-practical-thinking/playwright-cli/page-2026-04-18T21-39-08-117Z.yml loc=None community=95]
NODE AI Review Bundle [src=applied-practical-thinking/playwright-cli/page-2026-04-18T22-08-01-807Z.yml loc=e168 community=215]
NODE chart.tsx [src=apt-dream-to-reality/packages/ui/src/chart.tsx loc=L1 community=11]
NODE APT Principles Framework [src=applied-practical-thinking/apps/web/public/docs/apt/apt-principles.md loc=None community=388]
NODE chart.tsx [src=apt-dream-to-reality/apps/web/src/components/ui/chart.tsx loc=L1 community=406]
NODE Systems [src=applied-practical-thinking/playwright-cli/page-2026-04-18T21-30-27-332Z.yml loc=None community=95]
NODE Principles [src=applied-practical-thinking/playwright-cli/page-2026-04-18T21-39-08-117Z.yml loc=None community=95]
NODE Design Principles [src=applied-practical-thinking/playwright-cli/page-2026-04-18T21-30-27-332Z.yml loc=None community=95]
NODE Design Thinking [src=applied-practical-thinking/playwright-cli/page-2026-04-18T21-30-27-332Z.yml loc=None community=95]
NODE Docs Browser [src=applied-practical-thinking/playwright-cli/page-2026-04-18T21-30-27-332Z.yml loc=None community=95]
NODE Open AI Review Bundle [src=applied-practical-thinking/playwright-cli/page-2026-04-18T21-39-08-117Z.yml loc=None community=95]
NODE Open AI Review Bundle [src=applied-practical-thinking/playwright-cli/page-2026-04-18T21-40-06-793Z.yml loc=link community=95]
NODE APT [src=applied-practical-thinking/playwright-cli/page-2026-04-18T21-39-08-117Z.yml loc=None community=95]
NODE Open Principles [src=applied-practical-thinking/playwright-cli/page-2026-04-18T21-40-06-793Z.yml loc=link community=95]
NODE Knowledge Engine [src=applied-practical-thinking/playwright-cli/page-2026-04-18T21-39-08-117Z.yml loc=None community=95]
NODE Reference Systems [src=applied-practical-thinking/playwright-cli/page-2026-04-18T21-42-53-148Z.yml loc=link community=95]
NODE Content Strategy [src=applied-practical-thinking/playwright-cli/page-2026-04-18T21-39-08-117Z.yml loc=None community=95]
NODE getPayloadConfigFromPayload() [src=apt-dream-to-reality/apps/web/src/components/ui/chart.tsx loc=L319 community=406]
NODE THEMES [src=apt-dream-to-reality/apps/web/src/components/ui/chart.tsx loc=L7 community=406]
NODE Docs Browser [src=applied-practical-thinking/playwright-cli/page-2026-04-18T21-53-03-841Z.yml loc=None community=95]
NODE ChartConfig [src=apt-dream-to-reality/apps/web/src/components/ui/chart.tsx loc=L9 community=406]
NODE Core Design Thinking [src=applied-practical-thinking/playwright-cli/page-2026-04-18T21-42-53-148Z.yml loc=link community=95]
NODE ChartContextProps [src=apt-dream-to-reality/packages/ui/src/chart.tsx loc=L19 community=11]
NODE useChart() [src=apt-dream-to-reality/packages/ui/src/chart.tsx loc=L25 community=11]
NODE ChartContainer [src=apt-dream-to-reality/apps/web/src/components/ui/chart.tsx loc=L35 community=406]
NODE ChartContext [src=apt-dream-to-reality/apps/web/src/components/ui/chart.tsx loc=L23 community=406]
NODE ChartContextProps [src=apt-dream-to-reality/apps/web/src/components/ui/chart.tsx loc=L19 community=406]
NODE THEMES [src=apt-dream-to-reality/packages/ui/src/chart.tsx loc=L7 community=11]
NODE getPayloadConfigFromPayload() [src=apt-dream-to-reality/packages/ui/src/chart.tsx loc=L318 community=11]
NODE Reference AI Review Bundle [src=applied-practical-thinking/playwright-cli/page-2026-04-18T21-42-53-148Z.yml loc=link community=95]
NODE ChartLegendContent [src=apt-dream-to-reality/packages/ui/src/chart.tsx loc=L259 community=11]
NODE Support Design [src=applied-practical-thinking/playwright-cli/page-2026-04-18T21-53-03-841Z.yml loc=None community=95]
NODE Design Architecture [src=applied-practical-thinking/playwright-cli/page-2026-04-18T22-08-01-807Z.yml loc=e115 community=95]
NODE Design System [src=applied-practical-thinking/playwright-cli/page-2026-04-18T22-08-01-807Z.yml loc=e95 community=95]
NODE Core Principles [src=applied-practical-thinking/playwright-cli/page-2026-04-18T21-42-53-148Z.yml loc=link community=95]
NODE Core Design Architecture [src=applied-practical-thinking/playwright-cli/page-2026-04-18T21-42-53-148Z.yml loc=link community=95]
NODE ChartLegendContent [src=apt-dream-to-reality/apps/web/src/components/ui/chart.tsx loc=L260 community=406]
NODE Principles [src=applied-practical-thinking/playwright-cli/page-2026-04-18T22-08-01-807Z.yml loc=e77 community=95]
NODE Systems [src=applied-practical-thinking/playwright-cli/page-2026-04-18T22-08-01-807Z.yml loc=e150 community=95]
NODE Design Thinking [src=applied-practical-thinking/playwright-cli/page-2026-04-18T21-39-08-117Z.yml loc=None community=95]
NODE Design Thinking [src=applied-practical-thinking/playwright-cli/page-2026-04-18T22-08-01-807Z.yml loc=e53 community=95]
NODE Support Design [src=applied-practical-thinking/playwright-cli/page-2026-04-18T21-39-08-117Z.yml loc=None community=95]
NODE ChartStyle() [src=apt-dream-to-reality/apps/web/src/components/ui/chart.tsx loc=L68 community=406]
NODE ChartStyle() [src=apt-dream-to-reality/packages/ui/src/chart.tsx loc=L68 community=11]
NODE ChartTooltipContent [src=apt-dream-to-reality/apps/web/src/components/ui/chart.tsx loc=L103 community=406]
NODE useChart() [src=apt-dream-to-reality/apps/web/src/components/ui/chart.tsx loc=L25 community=406]
NODE ChartConfig [src=apt-dream-to-reality/packages/ui/src/chart.tsx loc=L9 community=11]
NODE ChartTooltipContent [src=apt-dream-to-reality/packages/ui/src/chart.tsx loc=L103 community=11]
NODE Runtime Docs Browser [src=applied-practical-thinking/playwright-cli/page-2026-04-18T21-42-53-148Z.yml loc=link community=95]
NODE Docs Browser [src=applied-practical-thinking/playwright-cli/page-2026-04-18T22-08-01-807Z.yml loc=e134 community=95]
NODE Open Principles [src=applied-practical-thinking/playwright-cli/page-2026-04-18T22-08-01-807Z.yml loc=e47 community=95]
NODE Open AI Review Bundle [src=applied-practical-thinking/playwright-cli/page-2026-04-18T22-08-01-807Z.yml loc=e37 community=95]
NODE ChartContext [src=apt-dream-to-reality/packages/ui/src/chart.tsx loc=L23 community=11]
NODE Core Design System [src=applied-practical-thinking/playwright-cli/page-2026-04-18T21-42-53-148Z.yml loc=link community=95]
NODE ChartContainer [src=apt-dream-to-reality/packages/ui/src/chart.tsx loc=L35 community=11]
EDGE THEMES --contains [EXTRACTED]--> chart.tsx
EDGE APT --references [EXTRACTED]--> Applied Practical Thinking
EDGE APT --references [EXTRACTED]--> Design
EDGE THEMES --contains [EXTRACTED]--> chart.tsx
EDGE Design --references [EXTRACTED]--> Open AI Review Bundle
EDGE Design --references [EXTRACTED]--> Open Principles
EDGE Design --references [EXTRACTED]--> Core Design Thinking
EDGE Design --references [EXTRACTED]--> Core Principles
EDGE Design --references [EXTRACTED]--> Core Design System
... (truncated � 0 more nodes cut by ~2500-token budget. Narrow with context_filter=['call'] or use get_node for a specific symbol)

## Surprising cross-repo connections

Traversal: BFS depth=2 | Start: ['project', 'Project', 'Project'] | 37 nodes found

NODE index.ts [src=apt-novel-reviewer/packages/types/src/index.ts loc=L1 community=48]
NODE type [src=applied-practical-thinking/apps/web/public/docs/apt/references/project-profile.schema.json loc=L7 community=179]
NODE index.ts [src=apt-novel-reviewer/packages/db/src/index.ts loc=L1 community=81]
NODE properties [src=applied-practical-thinking/apps/web/public/docs/apt/references/project-profile.schema.json loc=L17 community=179]
NODE projects.ts [src=apt-novel-reviewer/packages/db/src/repositories/projects.ts loc=L1 community=160]
NODE project-profile.schema.json [src=applied-practical-thinking/apps/web/public/docs/apt/references/project-profile.schema.json loc=L1 community=498]
NODE getDb() [src=apt-novel-reviewer/packages/db/src/index.ts loc=L19 community=160]
NODE Adoption Mode [src=apt-coach/docs/apt/adoption.md loc=None community=179]
NODE index.d.ts [src=apt-novel-reviewer/packages/db/src/index.d.ts loc=L1 community=160]
NODE ArchitecturePattern [src=applied-practical-thinking/apps/web/data/architecturePatterns.tsx loc=L11 community=4]
NODE index.d.ts [src=apt-novel-reviewer/packages/types/src/index.d.ts loc=L1 community=48]
NODE project.ts [src=apt-novel-reviewer/packages/types/src/project.ts loc=L1 community=48]
NODE CreateProjectInput [src=apt-novel-reviewer/packages/types/src/project.ts loc=L11 community=48]
NODE items [src=applied-practical-thinking/apps/web/public/docs/apt/references/project-profile.schema.json loc=L26 community=179]
NODE project.ts [src=apt-dream-to-reality/apps/web/src/types/project.ts loc=L1 community=125]
NODE principles_demonstrated [src=applied-practical-thinking/apps/web/public/docs/apt/references/project-profile.schema.json loc=L34 community=179]
NODE showcase [src=applied-practical-thinking/apps/web/public/docs/apt/references/project-profile.schema.json loc=L62 community=179]
NODE ProjectPhase [src=apt-dream-to-reality/apps/web/src/types/project.ts loc=L1 community=125]
NODE reusable_artifacts [src=applied-practical-thinking/apps/web/public/docs/apt/references/project-profile.schema.json loc=L52 community=179]
NODE projects.d.ts [src=apt-novel-reviewer/packages/db/src/repositories/projects.d.ts loc=L1 community=48]
NODE Project [src=apt-novel-reviewer/packages/types/src/project.ts loc=L1 community=48]
NODE maturity [src=applied-practical-thinking/apps/web/public/docs/apt/references/project-profile.schema.json loc=L58 community=179]
NODE audience [src=applied-practical-thinking/apps/web/public/docs/apt/references/project-profile.schema.json loc=L24 community=179]
NODE include [src=applied-practical-thinking/apps/web/public/docs/apt/references/project-profile.schema.json loc=L66 community=179]
NODE purpose [src=applied-practical-thinking/apps/web/public/docs/apt/references/project-profile.schema.json loc=L21 community=179]
NODE learning_value [src=applied-practical-thinking/apps/web/public/docs/apt/references/project-profile.schema.json loc=L49 community=179]
NODE summary [src=applied-practical-thinking/apps/web/public/docs/apt/references/project-profile.schema.json loc=L69 community=179]
NODE project [src=applied-practical-thinking/apps/web/public/docs/apt/references/project-profile.schema.json loc=L18 community=179]
NODE security_model [src=applied-practical-thinking/apps/web/public/docs/apt/references/project-profile.schema.json loc=L46 community=179]
NODE ai_agent_usage [src=applied-practical-thinking/apps/web/public/docs/apt/references/project-profile.schema.json loc=L43 community=179]
NODE listProjects() [src=apt-novel-reviewer/packages/db/src/repositories/projects.ts loc=L5 community=160]
NODE touchProject() [src=apt-novel-reviewer/packages/db/src/repositories/projects.ts loc=L32 community=160]
NODE createProject() [src=apt-novel-reviewer/packages/db/src/repositories/projects.ts loc=L10 community=160]
NODE Project [src=apt-dream-to-reality/apps/web/src/types/project.ts loc=L4 community=125]
NODE ProjectStatus [src=apt-dream-to-reality/apps/web/src/types/project.ts loc=L2 community=125]
NODE deleteProject() [src=apt-novel-reviewer/packages/db/src/repositories/projects.ts loc=L39 community=160]
NODE Comment [src=apt-dream-to-reality/apps/web/src/types/project.ts loc=L15 community=125]
EDGE project --contains [EXTRACTED]--> type
EDGE project --contains [EXTRACTED]--> properties
EDGE Project --imports [EXTRACTED context=import]--> projects.d.ts
EDGE Project --imports [EXTRACTED context=import]--> projects.ts
EDGE Project --contains [EXTRACTED]--> project.ts
EDGE Project --contains [EXTRACTED]--> project.ts
EDGE projects.ts --imports_from [EXTRACTED context=re-export]--> index.d.ts
EDGE projects.ts --imports_from [EXTRACTED context=import]--> index.ts
EDGE projects.ts --imports [EXTRACTED context=import]--> getDb()
EDGE projects.ts --imports_from [EXTRACTED context=import]--> index.ts
EDGE projects.ts --contains [EXTRACTED]--> listProjects()
EDGE projects.ts --contains [EXTRACTED]--> createProject()
EDGE projects.ts --contains [EXTRACTED]--> touchProject()
EDGE projects.ts --contains [EXTRACTED]--> deleteProject()
EDGE projects.ts --imports [EXTRACTED context=import]--> CreateProjectInput
EDGE type --contains [EXTRACTED]--> ArchitecturePattern
EDGE type --contains [EXTRACTED]--> project-profile.schema.json
EDGE type --contains [EXTRACTED]--> purpose
EDGE type --contains [EXTRACTED]--> audience
EDGE type --contains [EXTRACTED]--> items
EDGE type --contains [EXTRACTED]--> Adoption Mode
EDGE type --contains [EXTRACTED]--> principles_demonstrated
EDGE type --contains [EXTRACTED]--> ai_agent_usage
EDGE type --contains [EXTRACTED]--> security_model
EDGE type --contains [EXTRACTED]--> learning_value
EDGE type --contains [EXTRACTED]--> reusable_artifacts
EDGE type --contains [EXTRACTED]--> maturity
EDGE type --contains [EXTRACTED]--> showcase
EDGE type --contains [EXTRACTED]--> include
EDGE type --contains [EXTRACTED]--> summary
EDGE project.ts --contains [EXTRACTED]--> ProjectPhase
EDGE project.ts --contains [EXTRACTED]--> ProjectStatus
EDGE project.ts --contains [EXTRACTED]--> Comment
EDGE projects.d.ts --imports_from [EXTRACTED context=import]--> index.ts
EDGE projects.d.ts --imports [EXTRACTED context=import]--> CreateProjectInput
EDGE properties --contains [EXTRACTED]--> ArchitecturePattern
EDGE properties --contains [EXTRACTED]--> project-profile.schema.json
EDGE properties --contains [EXTRACTED]--> purpose
EDGE properties --contains [EXTRACTED]--> audience
EDGE properties --contains [EXTRACTED]--> Adoption Mode
EDGE properties --contains [EXTRACTED]--> principles_demonstrated
EDGE properties --contains [EXTRACTED]--> ai_agent_usage
EDGE properties --contains [EXTRACTED]--> security_model
EDGE properties --contains [EXTRACTED]--> learning_value
EDGE properties --contains [EXTRACTED]--> reusable_artifacts
EDGE properties --contains [EXTRACTED]--> maturity
EDGE properties --contains [EXTRACTED]--> showcase
EDGE properties --contains [EXTRACTED]--> include
EDGE properties --contains [EXTRACTED]--> summary
EDGE project.ts --re_exports [EXTRACTED context=export]--> index.d.ts
EDGE project.ts --re_exports [EXTRACTED context=export]--> index.ts
EDGE project.ts --contains [EXTRACTED]--> CreateProjectInput

## Doctrine-to-code coverage gaps

Traversal: BFS depth=2 | Start: ['describe()', 'code', 'Project'] | 23 nodes found

NODE index.js [src=applied-practical-thinking/apps/worker/.wrangler/tmp/dev-WdeSmh/index.js loc=L1 community=1]
NODE withings.ts [src=apt-coach/apps/api/src/routes/integrations/withings.ts loc=L1 community=16]
NODE keys [src=applied-practical-thinking/apps/worker/.wrangler/tmp/dev-WdeSmh/index.js loc=L114 community=33]
NODE convertBaseSchema() [src=applied-practical-thinking/apps/worker/.wrangler/tmp/dev-WdeSmh/index.js loc=L15887 community=33]
NODE add() [src=applied-practical-thinking/apps/worker/.wrangler/tmp/dev-WdeSmh/index.js loc=L1729 community=33]
NODE get() [src=applied-practical-thinking/apps/worker/.wrangler/tmp/dev-WdeSmh/index.js loc=L12113 community=33]
NODE has() [src=applied-practical-thinking/apps/worker/.wrangler/tmp/dev-WdeSmh/index.js loc=L12123 community=33]
NODE convertSchema() [src=applied-practical-thinking/apps/worker/.wrangler/tmp/dev-WdeSmh/index.js loc=L16180 community=33]
NODE project.ts [src=apt-dream-to-reality/apps/web/src/types/project.ts loc=L1 community=125]
NODE time() [src=applied-practical-thinking/apps/worker/.wrangler/tmp/dev-WdeSmh/index.js loc=L3763 community=33]
NODE object() [src=applied-practical-thinking/apps/worker/.wrangler/tmp/dev-WdeSmh/index.js loc=L15154 community=33]
NODE datetime() [src=applied-practical-thinking/apps/worker/.wrangler/tmp/dev-WdeSmh/index.js loc=L3767 community=33]
NODE looseRecord() [src=applied-practical-thinking/apps/worker/.wrangler/tmp/dev-WdeSmh/index.js loc=L15284 community=33]
NODE ProjectPhase [src=apt-dream-to-reality/apps/web/src/types/project.ts loc=L1 community=125]
NODE url() [src=applied-practical-thinking/apps/worker/.wrangler/tmp/dev-WdeSmh/index.js loc=L528 community=33]
NODE resolveRef() [src=applied-practical-thinking/apps/worker/.wrangler/tmp/dev-WdeSmh/index.js loc=L15868 community=33]
NODE describe() [src=applied-practical-thinking/apps/worker/.wrangler/tmp/dev-WdeSmh/index.js loc=L13189 community=33]
NODE emoji() [src=applied-practical-thinking/apps/worker/.wrangler/tmp/dev-WdeSmh/index.js loc=L3738 community=33]
NODE rest [src=applied-practical-thinking/apps/worker/.wrangler/tmp/dev-WdeSmh/index.js loc=L5623 community=33]
NODE code [src=apt-coach/apps/api/src/routes/integrations/withings.ts loc=L327 community=16]
NODE ProjectStatus [src=apt-dream-to-reality/apps/web/src/types/project.ts loc=L2 community=125]
NODE Comment [src=apt-dream-to-reality/apps/web/src/types/project.ts loc=L15 community=125]
NODE Project [src=apt-dream-to-reality/apps/web/src/types/project.ts loc=L4 community=125]
EDGE describe() --contains [EXTRACTED]--> index.js
EDGE describe() --calls [EXTRACTED context=call]--> convertBaseSchema()
EDGE Project --contains [EXTRACTED]--> project.ts
EDGE code --contains [EXTRACTED]--> withings.ts
EDGE project.ts --contains [EXTRACTED]--> ProjectPhase
EDGE project.ts --contains [EXTRACTED]--> ProjectStatus
EDGE project.ts --contains [EXTRACTED]--> Comment
EDGE convertBaseSchema() --calls [EXTRACTED context=call]--> keys
EDGE convertBaseSchema() --calls [EXTRACTED context=call]--> url()
EDGE convertBaseSchema() --calls [EXTRACTED context=call]--> add()
EDGE convertBaseSchema() --calls [EXTRACTED context=call]--> emoji()
EDGE convertBaseSchema() --calls [EXTRACTED context=call]--> time()
EDGE convertBaseSchema() --calls [EXTRACTED context=call]--> datetime()
EDGE convertBaseSchema() --calls [EXTRACTED context=call]--> rest
EDGE convertBaseSchema() --calls [EXTRACTED context=call]--> get()
EDGE convertBaseSchema() --calls [EXTRACTED context=call]--> has()
EDGE convertBaseSchema() --calls [EXTRACTED context=call]--> object()
EDGE convertBaseSchema() --calls [EXTRACTED context=call]--> looseRecord()
EDGE convertBaseSchema() --calls [EXTRACTED context=call]--> resolveRef()
EDGE convertBaseSchema() --calls [EXTRACTED context=call]--> convertSchema()

## Drift candidates

Traversal: BFS depth=2 | Start: ['Knowledge', 'Knowledge', 'Knowledge'] | 78 nodes found

NODE findings_by_layer [src=apt-payment-rpc-api/docs/apt/reports/static/project-profile-validation-sweep-2026-04-27.json loc=L50 community=37]
NODE findings_by_layer [src=crt-world/docs/apt/reports/static/project-profile-validation-sweep-2026-04-27.json loc=L105 community=38]
NODE findings_by_layer [src=apt-principles/reports/project-profile-validation-sweep-2026-04-27.json loc=L25 community=639]
NODE other [src=apt-payment-rpc-api/docs/apt/reports/static/project-profile-validation-sweep-2026-04-27.json loc=L71 community=37]
NODE other [src=crt-world/docs/apt/reports/static/project-profile-validation-sweep-2026-04-27.json loc=L126 community=38]
NODE rubric_summary_by_layer [src=apt-payment-rpc-api/docs/apt/reports/static/project-profile-validation-sweep-2026-04-27.json loc=L65 community=37]
NODE rubric_summary_by_layer [src=crt-world/docs/apt/reports/static/project-profile-validation-sweep-2026-04-27.json loc=L120 community=38]
NODE other [src=apt-principles/reports/project-profile-validation-sweep-2026-04-27.json loc=L46 community=207]
NODE rubric_summary_by_layer [src=apt-principles/reports/project-profile-validation-sweep-2026-04-27.json loc=L40 community=207]
NODE partial [src=apt-payment-rpc-api/docs/apt/reports/static/project-profile-validation-sweep-2026-04-27.json loc=L68 community=37]
NODE gap [src=apt-principles/reports/project-profile-validation-sweep-2026-04-27.json loc=L44 community=207]
NODE workspace_summary [src=apt-principles/reports/project-profile-validation-sweep-2026-04-27.json loc=L6 community=397]
NODE pass [src=apt-principles/reports/project-profile-validation-sweep-2026-04-27.json loc=L42 community=207]
NODE not_applicable [src=apt-payment-rpc-api/docs/apt/reports/static/project-profile-validation-sweep-2026-04-27.json loc=L70 community=37]
NODE partial [src=apt-principles/reports/project-profile-validation-sweep-2026-04-27.json loc=L43 community=207]
NODE pass [src=apt-payment-rpc-api/docs/apt/reports/static/project-profile-validation-sweep-2026-04-27.json loc=L67 community=37]
NODE not_applicable [src=apt-principles/reports/project-profile-validation-sweep-2026-04-27.json loc=L45 community=207]
NODE not_applicable [src=crt-world/docs/apt/reports/static/project-profile-validation-sweep-2026-04-27.json loc=L125 community=38]
NODE gap [src=apt-payment-rpc-api/docs/apt/reports/static/project-profile-validation-sweep-2026-04-27.json loc=L69 community=37]
NODE workspace_summary [src=crt-world/docs/apt/reports/static/project-profile-validation-sweep-2026-04-27.json loc=L86 community=38]
NODE partial [src=crt-world/docs/apt/reports/static/project-profile-validation-sweep-2026-04-27.json loc=L123 community=38]
NODE workspace_summary [src=apt-payment-rpc-api/docs/apt/reports/static/project-profile-validation-sweep-2026-04-27.json loc=L31 community=37]
NODE pass [src=crt-world/docs/apt/reports/static/project-profile-validation-sweep-2026-04-27.json loc=L122 community=38]
NODE gap [src=crt-world/docs/apt/reports/static/project-profile-validation-sweep-2026-04-27.json loc=L124 community=38]
NODE AI [src=apt-payment-rpc-api/docs/apt/reports/static/project-profile-validation-sweep-2026-04-27.json loc=L56 community=37]
NODE Architecture [src=crt-world/docs/apt/reports/static/project-profile-validation-sweep-2026-04-27.json loc=L113 community=38]
NODE Architecture [src=apt-principles/reports/project-profile-validation-sweep-2026-04-27.json loc=L33 community=207]
NODE Architecture [src=apt-payment-rpc-api/docs/apt/reports/static/project-profile-validation-sweep-2026-04-27.json loc=L58 community=37]
NODE System Standards [src=apt-principles/reports/project-profile-validation-sweep-2026-04-27.json loc=L37 community=207]
NODE Design [src=apt-payment-rpc-api/docs/apt/reports/static/project-profile-validation-sweep-2026-04-27.json loc=L51 community=37]
NODE Quality [src=apt-principles/reports/project-profile-validation-sweep-2026-04-27.json loc=L29 community=207]
NODE AI [src=apt-principles/reports/project-profile-validation-sweep-2026-04-27.json loc=L31 community=207]
NODE Knowledge [src=apt-principles/reports/project-profile-validation-sweep-2026-04-27.json loc=L27 community=207]
NODE Knowledge [src=apt-payment-rpc-api/docs/apt/reports/static/project-profile-validation-sweep-2026-04-27.json loc=L52 community=37]
NODE AI [src=crt-world/docs/apt/reports/static/project-profile-validation-sweep-2026-04-27.json loc=L111 community=38]
NODE System Standards [src=apt-payment-rpc-api/docs/apt/reports/static/project-profile-validation-sweep-2026-04-27.json loc=L62 community=37]
NODE Quality [src=apt-payment-rpc-api/docs/apt/reports/static/project-profile-validation-sweep-2026-04-27.json loc=L54 community=37]
NODE Knowledge [src=crt-world/docs/apt/reports/static/project-profile-validation-sweep-2026-04-27.json loc=L107 community=38]
NODE Operations [src=apt-payment-rpc-api/docs/apt/reports/static/project-profile-validation-sweep-2026-04-27.json loc=L60 community=37]
NODE Quality [src=crt-world/docs/apt/reports/static/project-profile-validation-sweep-2026-04-27.json loc=L109 community=38]
NODE Operations [src=crt-world/docs/apt/reports/static/project-profile-validation-sweep-2026-04-27.json loc=L115 community=38]
NODE Design [src=crt-world/docs/apt/reports/static/project-profile-validation-sweep-2026-04-27.json loc=L106 community=38]
NODE System Standards [src=crt-world/docs/apt/reports/static/project-profile-validation-sweep-2026-04-27.json loc=L117 community=38]
NODE Operations [src=apt-principles/reports/project-profile-validation-sweep-2026-04-27.json loc=L35 community=207]
NODE Design [src=apt-principles/reports/project-profile-validation-sweep-2026-04-27.json loc=L26 community=207]
NODE Execution [src=apt-principles/reports/project-profile-validation-sweep-2026-04-27.json loc=L62 community=207]
NODE Execution [src=apt-payment-rpc-api/docs/apt/reports/static/project-profile-validation-sweep-2026-04-27.json loc=L87 community=37]
NODE Release [src=apt-payment-rpc-api/docs/apt/reports/static/project-profile-validation-sweep-2026-04-27.json loc=L115 community=37]
NODE Execution [src=crt-world/docs/apt/reports/static/project-profile-validation-sweep-2026-04-27.json loc=L142 community=38]
NODE Thinking [src=crt-world/docs/apt/reports/static/project-profile-validation-sweep-2026-04-27.json loc=L191 community=38]
NODE Security [src=crt-world/docs/apt/reports/static/project-profile-validation-sweep-2026-04-27.json loc=L177 community=38]
NODE Release [src=crt-world/docs/apt/reports/static/project-profile-validation-sweep-2026-04-27.json loc=L170 community=38]
NODE Thinking [src=apt-payment-rpc-api/docs/apt/reports/static/project-profile-validation-sweep-2026-04-27.json loc=L136 community=37]
NODE Release [src=apt-principles/reports/project-profile-validation-sweep-2026-04-27.json loc=L90 community=207]
NODE Security [src=apt-payment-rpc-api/docs/apt/reports/static/project-profile-validation-sweep-2026-04-27.json loc=L122 community=37]
NODE Security [src=apt-principles/reports/project-profile-validation-sweep-2026-04-27.json loc=L97 community=207]
NODE Thinking [src=apt-principles/reports/project-profile-validation-sweep-2026-04-27.json loc=L111 community=207]
NODE findings_by_severity [src=apt-payment-rpc-api/docs/apt/reports/static/project-profile-validation-sweep-2026-04-27.json loc=L44 community=37]
NODE findings_by_severity [src=apt-principles/reports/project-profile-validation-sweep-2026-04-27.json loc=L19 community=397]
... (truncated � 19 more nodes cut by ~2500-token budget. Narrow with context_filter=['call'] or use get_node for a specific symbol)

## Remediation queue by APT layer

Traversal: BFS depth=2 | Start: ['APT', 'mostUsedDesignSectionPaths'] | 61 nodes found

NODE index.ts [src=applied-practical-thinking/apps/web/components/apt/index.ts loc=L1 community=18]
NODE App.tsx [src=applied-practical-thinking/apps/web/App.tsx loc=L1 community=91]
NODE getWorkerApiConfigError() [src=applied-practical-thinking/apps/web/src/services/api.ts loc=L112 community=18]
NODE api.ts [src=applied-practical-thinking/apps/web/src/services/api.ts loc=L1 community=18]
NODE AptButton [src=applied-practical-thinking/packages/ui/src/AptButton.tsx loc=L44 community=4]
NODE AptTag() [src=applied-practical-thinking/packages/ui/src/AptTag.tsx loc=L11 community=4]
NODE AptCard [src=applied-practical-thinking/packages/ui/src/AptCard.tsx loc=L37 community=4]
NODE Design System [src=applied-practical-thinking/apps/worker/src/ai/docs/design-system.md loc=None community=4]
NODE Design Architecture [src=applied-practical-thinking/output/playwright/audit/desktop-home-00-initial.md loc=None community=4]
NODE Applied Practical Thinking [src=applied-practical-thinking/playwright-cli/page-2026-04-18T21-30-27-332Z.yml loc=None community=95]
NODE aptPrinciples.ts [src=applied-practical-thinking/apps/web/data/aptPrinciples.ts loc=L1 community=4]
NODE Portfolio [src=applied-practical-thinking/apps/web/App.tsx loc=L29 community=424]
NODE useDesignDocVersion() [src=applied-practical-thinking/apps/web/hooks/useDesignDocVersion.ts loc=L41 community=10]
NODE SectionIntro() [src=applied-practical-thinking/apps/web/components/apt/SectionIntro.tsx loc=L14 community=4]
NODE download.ts [src=applied-practical-thinking/apps/web/src/services/download.ts loc=L1 community=41]
NODE Design [src=applied-practical-thinking/playwright-cli/page-2026-04-18T21-39-08-117Z.yml loc=None community=95]
NODE tryGetWorkerApiUrl() [src=applied-practical-thinking/apps/web/src/services/api.ts loc=L104 community=4]
NODE AI Review Bundle [src=applied-practical-thinking/playwright-cli/page-2026-04-18T22-08-01-807Z.yml loc=e168 community=215]
NODE downloadWorkerMarkdown() [src=applied-practical-thinking/apps/web/src/services/download.ts loc=L42 community=41]
NODE DesignDocVersionSwitcher() [src=applied-practical-thinking/apps/web/components/apt/DesignDocVersionSwitcher.tsx loc=L9 community=4]
NODE APT Principles Framework [src=applied-practical-thinking/apps/web/public/docs/apt/apt-principles.md loc=None community=388]
NODE DesignSection [src=applied-practical-thinking/apps/web/data/designSections.ts loc=L3 community=424]
NODE Systems [src=applied-practical-thinking/playwright-cli/page-2026-04-18T21-30-27-332Z.yml loc=None community=95]
NODE Portfolio() [src=applied-practical-thinking/apps/web/routes/Portfolio.tsx loc=L54 community=424]
NODE Design Thinking [src=applied-practical-thinking/playwright-cli/page-2026-04-18T21-30-27-332Z.yml loc=None community=95]
NODE Docs Browser [src=applied-practical-thinking/playwright-cli/page-2026-04-18T21-30-27-332Z.yml loc=None community=95]
NODE Design Principles [src=applied-practical-thinking/playwright-cli/page-2026-04-18T21-30-27-332Z.yml loc=None community=95]
NODE Principles [src=applied-practical-thinking/playwright-cli/page-2026-04-18T21-39-08-117Z.yml loc=None community=95]
NODE Open AI Review Bundle [src=applied-practical-thinking/playwright-cli/page-2026-04-18T21-40-06-793Z.yml loc=link community=95]
NODE designSectionCatalog [src=applied-practical-thinking/apps/web/data/designSections.ts loc=L13 community=424]
NODE Content Strategy [src=applied-practical-thinking/playwright-cli/page-2026-04-18T21-39-08-117Z.yml loc=None community=95]
NODE Open Principles [src=applied-practical-thinking/playwright-cli/page-2026-04-18T21-40-06-793Z.yml loc=link community=95]
NODE Reference Systems [src=applied-practical-thinking/playwright-cli/page-2026-04-18T21-42-53-148Z.yml loc=link community=95]
NODE mostUsedDesignSectionPaths [src=applied-practical-thinking/apps/web/data/designSections.ts loc=L93 community=424]
NODE Open AI Review Bundle [src=applied-practical-thinking/playwright-cli/page-2026-04-18T21-39-08-117Z.yml loc=None community=95]
NODE Knowledge Engine [src=applied-practical-thinking/playwright-cli/page-2026-04-18T21-39-08-117Z.yml loc=None community=95]
NODE DesignSectionCategory [src=applied-practical-thinking/apps/web/data/designSections.ts loc=L1 community=424]
NODE APT [src=applied-practical-thinking/playwright-cli/page-2026-04-18T21-39-08-117Z.yml loc=None community=95]
NODE Core Design Architecture [src=applied-practical-thinking/playwright-cli/page-2026-04-18T21-42-53-148Z.yml loc=link community=95]
NODE Support Design [src=applied-practical-thinking/playwright-cli/page-2026-04-18T21-53-03-841Z.yml loc=None community=95]
NODE DesignFilter [src=applied-practical-thinking/apps/web/routes/Portfolio.tsx loc=L46 community=424]
NODE DESIGN_NAV_PATHS [src=applied-practical-thinking/apps/web/data/designSections.ts loc=L103 community=424]
NODE DesignNavSection [src=applied-practical-thinking/apps/web/data/designSections.ts loc=L11 community=424]
NODE Design Thinking [src=applied-practical-thinking/playwright-cli/page-2026-04-18T21-39-08-117Z.yml loc=None community=95]
NODE Design Architecture [src=applied-practical-thinking/playwright-cli/page-2026-04-18T22-08-01-807Z.yml loc=e115 community=95]
NODE Docs Browser [src=applied-practical-thinking/playwright-cli/page-2026-04-18T22-08-01-807Z.yml loc=e134 community=95]
NODE Core Design Thinking [src=applied-practical-thinking/playwright-cli/page-2026-04-18T21-42-53-148Z.yml loc=link community=95]
NODE getDesignSectionCategoryLabel() [src=applied-practical-thinking/apps/web/routes/Portfolio.tsx loc=L48 community=424]
NODE Principles [src=applied-practical-thinking/playwright-cli/page-2026-04-18T22-08-01-807Z.yml loc=e77 community=95]
NODE Design Thinking [src=applied-practical-thinking/playwright-cli/page-2026-04-18T22-08-01-807Z.yml loc=e53 community=95]
NODE Core Principles [src=applied-practical-thinking/playwright-cli/page-2026-04-18T21-42-53-148Z.yml loc=link community=95]
NODE Support Design [src=applied-practical-thinking/playwright-cli/page-2026-04-18T21-39-08-117Z.yml loc=None community=95]
NODE Runtime Docs Browser [src=applied-practical-thinking/playwright-cli/page-2026-04-18T21-42-53-148Z.yml loc=link community=95]
NODE Open Principles [src=applied-practical-thinking/playwright-cli/page-2026-04-18T22-08-01-807Z.yml loc=e47 community=95]
NODE Open AI Review Bundle [src=applied-practical-thinking/playwright-cli/page-2026-04-18T22-08-01-807Z.yml loc=e37 community=95]
NODE Reference AI Review Bundle [src=applied-practical-thinking/playwright-cli/page-2026-04-18T21-42-53-148Z.yml loc=link community=95]
NODE Docs Browser [src=applied-practical-thinking/playwright-cli/page-2026-04-18T21-53-03-841Z.yml loc=None community=95]
NODE Design System [src=applied-practical-thinking/playwright-cli/page-2026-04-18T22-08-01-807Z.yml loc=e95 community=95]
NODE sectionIcons [src=applied-practical-thinking/apps/web/routes/Portfolio.tsx loc=L32 community=424]
NODE Core Design System [src=applied-practical-thinking/playwright-cli/page-2026-04-18T21-42-53-148Z.yml loc=link community=95]
NODE Systems [src=applied-practical-thinking/playwright-cli/page-2026-04-18T22-08-01-807Z.yml loc=e150 community=95]
EDGE APT --references [EXTRACTED]--> Applied Practical Thinking
EDGE APT --references [EXTRACTED]--> Design
EDGE mostUsedDesignSectionPaths --imports [EXTRACTED context=import]--> Portfolio
EDGE mostUsedDesignSectionPaths --contains [EXTRACTED]--> DesignSection
... (truncated � 0 more nodes cut by ~2500-token budget. Narrow with context_filter=['call'] or use get_node for a specific symbol)

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

