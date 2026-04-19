---
docId: principles-framework
slug: principles
major: 2
semanticVersion: 2.0.0
status: candidate
publishedAt: 2026-04-18
---
# APT Principles Framework

Canonical reference for APT's 10 core principle groups and lifecycle map.

---

## Framework Index

1. APT Principles Framework
2. APT Thinking Principles (Why)
3. APT Design Principles (What)
4. APT Architecture Standards (How)
5. APT System Standards (Consistency)
6. APT Execution Model (Build)
7. APT Quality & Testing (Validate)
8. APT Release & Change Management (Promote)
9. APT Operations & Support Thinking (Run & Support)
10. APT Knowledge System (Learn & Scale)
11. APT AI & Agent Framework (Augmentation Layer)

---

## 1) APT Thinking Principles (Why)

### Focus

- Define the problem, the user, and the outcome
- What problem is worth solving
- Who it is for
- What success looks like

### Principles

- Problem-first, not solution-first
- Clear user and context definition
- Define measurable outcomes
- Explicit tradeoffs over vague intent
- Avoid unnecessary scope

### Outputs

- Problem statements
- Success criteria
- User journeys
- Decision logs

### Practical Example

Before building a new review dashboard, write a problem statement and measurable outcome (for example, reduce review handoff time by 30%).

---

## 2) APT Design Principles (What)

### Focus

- Define what the solution is and how it behaves
- User experience
- Functional behavior
- System interactions (conceptual)

### Principles

- Simplicity over flexibility
- Design complete states (loading, error, empty)
- Consistent interaction patterns
- UX clarity over feature density
- Reusable patterns first

### Outputs

- UX flows
- Feature definitions
- Conceptual data models
- Interaction and state maps

### Practical Example

When defining a new route, specify empty, loading, success, and error states before implementation so behavior is complete from day one.

---

## 3) APT Architecture Standards (How)

### Focus

- Define how the system is structured
- Technical structure
- Boundaries and responsibilities
- Data and API design

### Principles

- API-first backend
- Static-first frontend
- Strict separation of concerns
- Clear service boundaries
- Design for change and scale

### Outputs

- System diagrams
- API contracts (OpenAPI/GraphQL)
- Data flow definitions
- Service and module boundaries

### Practical Example

For a new feature, define worker API contracts first, then implement frontend consumers against that contract instead of ad-hoc endpoint discovery.

---

## 4) APT System Standards (Consistency)

### Focus

- Enforce standards across everything
- Reusability
- Consistency
- Standardization

### Principles

- Standardize early
- Tokens and configs as source of truth
- Reuse over reinvention
- Enforce via structure, not memory
- Version critical systems

### Outputs

- Design system (tokens + components)
- API standards
- Repo structure
- Naming conventions
- Shared packages

### Practical Example

If a new component style is needed, add a shared token/variant contract instead of introducing route-specific color utilities.

---

## 5) APT Execution Model (Build)

### Focus

- Turn specs into working systems
- How work gets implemented
- Development workflow

### Principles

- Spec-driven development (docs = source of truth)
- Small, testable increments
- Preview-first workflow
- Fail fast on bad assumptions
- Automate repeatable steps

### Outputs

- Specs (Markdown)
- Tasks and tickets
- CI workflows
- Build scripts

### Practical Example

Ship principles changes in small PRs: update data model, then UI surfaces, then docs mirror sync with validation gates between each step.

---

## 6) APT Quality & Testing (Validate)

### Focus

- Ensure correctness before anything reaches users
- Prevent defects early
- Validate behavior at multiple levels

### Principles

- Fast checks first (lint -> type -> test -> build -> E2E)
- Test logic close to where it lives
- E2E tests validate journeys, not everything
- Preview environment must be tested
- Failures must produce usable diagnostics

### Outputs

- Test suites
- CI validation pipelines
- Test artifacts (logs, traces, reports)

### Practical Example

After nav updates, run lint/test/build plus keyboard-flow checks to confirm active states, anchors, and dropdown accessibility still behave correctly.

---

## 7) APT Release & Change Management (Promote)

### Focus

- Control how changes move to production and are understood
- Safe promotion of changes
- Clear visibility of what changed

### Principles

- Every change must be traceable
- Preview is required before production
- Production releases are intentional
- Changelog is a required artifact
- Group changes into meaningful releases
- Support must understand every release

### Outputs

- CHANGELOG.md
- Release notes
- Version tags
- Deployment records

### Practical Example

Bundle nav IA updates and principles content updates into one documented release note so stakeholders can trace what changed and why.

---

## 8) APT Operations & Support Thinking (Run & Support)

### Focus

- Keep the system running and support users effectively
- Stability
- Observability
- Support workflows

### Principles

- Design for support from day one
- Everything must be observable
- Actions must be traceable
- Support feedback drives improvements
- Systems should explain themselves

### Outputs

- Logging and monitoring
- Alerts and dashboards
- Support playbooks
- Incident workflows

### Practical Example

Add clear failure messaging and traceable logs for docs downloads so support can diagnose whether issues are config, routing, or artifact-related.

---

## 9) APT Knowledge System (Learn & Scale)

### Focus

- Capture and reuse what is learned
- Documentation
- Knowledge reuse
- Long-term efficiency

### Principles

- Document once, reuse everywhere
- Separate internal vs external knowledge
- Structure knowledge for both humans and AI
- Keep knowledge versioned
- Avoid duplication

### Outputs

- Documentation systems
- Knowledge base
- Training content
- AI-ingestible markdown

### Practical Example

Keep principles content in one canonical source file and consume it in both route UIs and docs to prevent doctrine drift.

---

## 10) APT AI & Agent Framework (Augmentation Layer)

### Focus

- Use AI to accelerate, not replace, structured thinking
- AI-assisted development
- Agent workflows
- Prompt standardization

### Principles

- AI follows system structure
- Prompts map to APT layers
- Deterministic inputs -> reliable outputs
- Guardrails over creativity in production
- AI enhances execution, not direction

### Outputs

- One-shot prompts
- Copilot instructions
- Agent workflows
- Evaluation frameworks

### Practical Example

Use a structured review prompt tied to principle groups so AI feedback maps directly to APT standards instead of generic style advice.

---

## How It All Fits Together

- Thinking -> Why
- Design -> What
- Architecture -> How
- System -> Consistency
- Execution -> Build
- Quality & Testing -> Validate
- Release & Change Management -> Promote
- Operations & Support -> Run & Support
- Knowledge -> Learn & Scale
- AI / Agent -> Enhances all

---

## Related Documents

- [APT Design Overview](./APT-DESIGN-OVERVIEW.md)
- [APT Design Thinking](./APT-DESIGN-THINKING.md)
- [APT Design System](./APT-DESIGN-SYSTEM.md)
- [APT Design Architecture](./APT-DESIGN-ARCHITECTURE.md)
- [APT Content Strategy](./APT-CONTENT-STRATEGY.md)
- [APT AI Review Bundle](../static/APT-AI-REVIEW-BUNDLE.md)
- [APT Execution Model](./APT-EXECUTION-MODEL.md)
- [APT Quality & Testing](./APT-QUALITY-TESTING.md)
- [APT Release & Change Management](./APT-RELEASE-CHANGE-MANAGEMENT.md)
- [APT Operations & Support](./APT-OPERATIONS-SUPPORT.md)
- [APT System Standards](./APT-SYSTEM-STANDARDS.md)
- [APT AI & Agent Framework](./APT-AI-AGENT-FRAMEWORK.md)
