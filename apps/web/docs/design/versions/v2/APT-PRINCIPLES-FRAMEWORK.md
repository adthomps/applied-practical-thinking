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

## 1) Thinking (Why)

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

---

## 2) Design (What)

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

---

## 3) Architecture (How)

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

---

## 4) System (Consistency)

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

---

## 5) Execution (Build)

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

---

## 6) Quality and Testing (Validate)

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

---

## 7) Release and Change Management (Promote)

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

---

## 8) Operations (Run and Support)

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

---

## 9) Knowledge (Learn and Scale)

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

---

## 10) AI / Agent (Augmentation Layer)

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

---

## How It All Fits Together

- Thinking -> Why
- Design -> What
- Architecture -> How
- System -> Consistency
- Execution -> Build
- Quality and Testing -> Validate
- Release and Change Management -> Promote
- Operations -> Run
- Knowledge -> Learn
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
