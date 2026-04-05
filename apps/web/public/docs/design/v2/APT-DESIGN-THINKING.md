---
docId: design-thinking
slug: thinking
major: 2
semanticVersion: 2.0.0
status: candidate
publishedAt: 2026-04-05
---
# APT Design Thinking Framework

A practical framework for problem framing, assumption testing, and decision-making. This is how problems get solved before code gets written.

---

## Table of Contents

1. [Philosophy](#philosophy)
2. [Core Principles](#core-principles)
3. [Thinking Frameworks](#thinking-frameworks)
4. [Decision Documentation](#decision-documentation)
5. [Applied Examples](#applied-examples)
6. [Anti-Patterns](#anti-patterns)

---

## Philosophy

### The APT Approach

Design thinking at APT is not about Post-it notes and brainstorming workshops. It's about rigorous, documented reasoning that precedes implementation.

**Key beliefs:**

1. **Problems before solutions** — The quality of your solution is bounded by your understanding of the problem
2. **Constraints are features** — Limitations shape better solutions than unlimited freedom
3. **Decisions decay** — Document reasoning so future you can revisit, not repeat
4. **Learning beats knowing** — Optimize for being less wrong faster, not right first time

### When to Apply

Use formal design thinking when:

- Starting something new (project, feature, system)
- Facing a decision with significant consequences
- Current solutions aren't working
- Multiple valid paths exist with unclear tradeoffs
- Stakeholders disagree on direction

Skip formal process when:

- The problem is well-understood with proven solutions
- Cost of experimentation is low
- Time constraints make analysis impractical
- You're iterating on existing validated work

---

## Core Principles

### 1. Start with Why

Every decision traces back to purpose. If you can't articulate why, you're not ready to decide how.

**Practice:**
- Before proposing solutions, state the problem in one sentence
- Ask "what would success look like?" before "how do we do it?"
- Use "5 Whys" to find root causes, not symptoms

### 2. Make Thinking Visible

Document reasoning, not just conclusions. Future you (and your team) will thank you.

**Practice:**
- Write decision records for significant choices
- Capture alternatives considered, not just the winner
- Note assumptions that could invalidate the decision

### 3. Embrace Constraints

Limitations aren't obstacles—they're the shape of the solution. Work with them, not against.

**Practice:**
- List constraints before brainstorming solutions
- Distinguish hard constraints (non-negotiable) from soft (preferences)
- Use constraints as creative forcing functions

### 4. Iterate Intentionally

Every iteration should have a hypothesis. Wandering without learning is just busy work.

**Practice:**
- State what you expect to learn from each iteration
- Define success criteria before building
- Time-box exploration to prevent scope creep

### 5. Decide and Document

Decisions deferred are decisions made (usually poorly). Capture the reasoning so you can revisit, not repeat.

**Practice:**
- Set deadlines for decisions, not just deliverables
- Use "disagree and commit" when consensus fails
- Log decisions in a searchable format

### 6. Optimize for Learning

The goal isn't to be right the first time. It's to be less wrong faster.

**Practice:**
- Design experiments to validate assumptions
- Celebrate learning from failure, not just success
- Share learnings widely, not just outcomes

---

## Thinking Frameworks

### Problem Framing

**Purpose:** Define the problem clearly before jumping to solutions.

**Process:**

1. **State the symptom** — What is the observable issue?
2. **Identify who** — Who experiences this problem? How many?
3. **Quantify impact** — What is the cost of this problem persisting?
4. **Ask "Why" 5 times** — Dig to root cause, not surface symptoms
5. **Reframe as opportunity** — "How might we...?" opens solution space

**Template:**

```markdown
## Problem Statement

**Symptom:** [Observable issue]
**Who:** [Affected parties and scale]
**Impact:** [Cost of problem persisting]

### Root Cause Analysis
1. Why? [First answer]
2. Why? [Dig deeper]
3. Why? [Keep going]
4. Why? [Almost there]
5. Why? [Root cause]

**Opportunity:** How might we [reframed problem]?
```

**When to use:** Starting any new project, when solutions aren't working, when there's disagreement about what to build.

---

### Assumption Mapping

**Purpose:** Surface and test the beliefs driving decisions.

**Process:**

1. **List assumptions** — What do you believe to be true?
2. **Rate by risk** — If wrong, how bad is it? (High/Medium/Low)
3. **Rate by certainty** — How confident are you? (Known/Believed/Guessed)
4. **Identify killers** — High risk + Low certainty = test first
5. **Design tests** — How can you validate cheaply?

**Template:**

```markdown
## Assumption Map

| Assumption | Risk | Certainty | Test Method | Result |
|------------|------|-----------|-------------|--------|
| Users want X | High | Guessed | User interviews | TBD |
| Tech Y is feasible | Medium | Believed | Spike prototype | TBD |
| Budget allows Z | High | Known | Finance review | Confirmed |

### Killer Assumptions (High Risk + Guessed)
1. [Assumption to test first]
2. [Next priority]
```

**When to use:** Before major investments, when facing high uncertainty, after significant failures.

---

### Constraint Analysis

**Purpose:** Use limitations as creative forcing functions.

**Process:**

1. **List hard constraints** — Non-negotiable boundaries
2. **List soft constraints** — Preferences, could flex if needed
3. **Find hidden constraints** — What's implied but not stated?
4. **Rank by impact** — Which most limit the solution space?
5. **Design within** — Use constraints to shape, not just limit

**Template:**

```markdown
## Constraint Analysis

### Hard Constraints (Non-negotiable)
- [ ] [Constraint 1 — source/reason]
- [ ] [Constraint 2 — source/reason]

### Soft Constraints (Preferences)
- [ ] [Constraint 1 — flexibility level]
- [ ] [Constraint 2 — flexibility level]

### Hidden Constraints
- [ ] [Discovered constraint — implication]

### Solution Space
Given these constraints, solutions must:
1. [Required characteristic]
2. [Required characteristic]
```

**When to use:** When solution space feels too large, when requirements are unclear, when stakeholders have unstated expectations.

---

### Decision Trees

**Purpose:** Map decision points and their consequences.

**Process:**

1. **Identify core decision** — What's the fork in the road?
2. **Branch options** — What are the viable paths?
3. **Map consequences** — What happens next for each option?
4. **Assign probabilities** — How likely is each outcome?
5. **Calculate value** — Expected value = probability × impact

**Template:**

```markdown
## Decision Tree

### Decision: [Core decision]

#### Option A: [Description]
- Probability of success: X%
- If success: [Outcome, value]
- If failure: [Outcome, cost]
- Expected value: [Calculation]

#### Option B: [Description]
- Probability of success: Y%
- If success: [Outcome, value]
- If failure: [Outcome, cost]
- Expected value: [Calculation]

### Recommendation
[Option] because [reasoning based on expected value and risk tolerance]
```

**When to use:** Facing irreversible decisions, multiple viable paths with unclear tradeoffs, need to communicate reasoning to stakeholders.

---

### Iteration Cycles

**Purpose:** Build learning into the development process.

**Process:**

1. **Define hypothesis** — What do you expect to learn?
2. **Build MVP** — Minimum viable test of the hypothesis
3. **Measure** — Collect data against defined criteria
4. **Learn** — What does the data tell you?
5. **Decide** — Pivot, persevere, or pause

**Template:**

```markdown
## Iteration Cycle

### Hypothesis
We believe [assumption] because [evidence/reasoning].

### Experiment
We will [action] and measure [metric].

### Success Criteria
- [Threshold 1]: [Interpretation]
- [Threshold 2]: [Interpretation]

### Results
- [Metric]: [Value]
- [Observation]: [Learning]

### Decision
☐ Pivot — [New direction based on learning]
☐ Persevere — [Continue with adjustments]
☐ Pause — [Stop and reassess]
```

**When to use:** Building anything new, improving existing systems, when outcomes are uncertain.

---

### Systems Mapping

**Purpose:** Understand relationships between components.

**Process:**

1. **Define boundaries** — What's inside/outside the system?
2. **Map inputs/outputs** — What flows in and out?
3. **Trace feedback loops** — What reinforces or balances?
4. **Find leverage points** — Where does small change = big effect?
5. **Model interventions** — What happens if we change X?

**Template:**

```markdown
## Systems Map

### System Boundary
**In scope:** [Components]
**Out of scope:** [Components]

### Flows
| Input | Process | Output |
|-------|---------|--------|
| [In]  | [Transform] | [Out] |

### Feedback Loops
- **Reinforcing:** [Loop description — accelerates]
- **Balancing:** [Loop description — stabilizes]

### Leverage Points
1. [High leverage — small input, big output]
2. [Medium leverage]
3. [Low leverage — change here is expensive]

### Intervention Analysis
If we [change], then [expected effect on system].
```

**When to use:** Complex interconnected problems, when obvious solutions create unintended consequences, organizational change.

---

## Decision Documentation

### Decision Record Format

Every significant decision should be documented for future reference.

```markdown
# Decision: [Title]

**Date:** YYYY-MM-DD
**Status:** Proposed | Accepted | Deprecated | Superseded
**Deciders:** [Names/roles]

## Context
[What prompted this decision? What's the situation?]

## Decision
[What was decided?]

## Rationale
[Why this option over alternatives?]

## Alternatives Considered
1. **[Option A]** — [Pros/Cons, why rejected]
2. **[Option B]** — [Pros/Cons, why rejected]

## Consequences
- **Positive:** [Expected benefits]
- **Negative:** [Known tradeoffs]
- **Risks:** [What could go wrong]

## Assumptions
[What must remain true for this decision to be valid?]
```

### When to Document

Document decisions that are:

- **Irreversible** or expensive to reverse
- **Contested** among stakeholders
- **Precedent-setting** for future decisions
- **Non-obvious** in their reasoning
- **Risky** with significant consequences

---

## Applied Examples

### Example 1: APT Design System Architecture

**Problem:** Multiple projects with inconsistent UI patterns and duplicate component code.

**Constraint Analysis:**
- Hard: Must work with existing Tailwind + shadcn setup
- Hard: No additional dependencies
- Soft: Prefer minimal breaking changes
- Hidden: Team must adopt without extensive training

**Decision:** Create APT component library with semantic tokens mapped to CSS variables.

**Outcome:** Unified token system with 6 component variants, 50% reduction in CSS, portable to other projects.

---

### Example 2: Navigation Restructure

**Problem:** Flat navigation couldn't communicate content hierarchy or relationships.

**Assumption Mapping:**
- Users need to understand content types (High risk, Guessed) → Validated with session analysis
- Hover dropdowns work on mobile (Medium risk, Believed) → False, needed accordion alternative

**Decision:** Hover dropdowns with descriptions for desktop, accordion menus for mobile.

**Outcome:** Reduced time-to-content by 2 clicks, clear mental model of site structure.

---

### Example 3: Content Taxonomy

**Problem:** Insights and Portfolio content overlapped, confusing visitors.

**Systems Mapping:**
- Learn = explanation and practice (articles, podcasts, guides, design reviews)
- Portfolio = artifacts (labs, demos, design system)
- Cross-linking creates relationships without duplication

**Decision:** Hard separation with bidirectional linking. Labs can link to Demos, never reverse.

**Outcome:** Clear mental model, improved navigation patterns, reduced content confusion.

---

## Anti-Patterns

### 1. Analysis Paralysis

**Symptom:** Endless research and planning, never building.

**Cure:** Time-box analysis. Set a decision deadline, then commit. Imperfect action beats perfect inaction.

### 2. Solution-First Thinking

**Symptom:** Jumping to "how" before understanding "what" and "why."

**Cure:** Require problem statements before solution proposals. Ask "what problem does this solve?" for every feature.

### 3. Assumption Blindness

**Symptom:** Treating beliefs as facts.

**Cure:** Regularly list assumptions and rate certainty. Test high-risk, low-certainty assumptions first.

### 4. Constraint Avoidance

**Symptom:** Fighting constraints instead of designing within them.

**Cure:** Reframe constraints as requirements. "We can't do X" becomes "Solutions must work without X."

### 5. Documentation Debt

**Symptom:** Decisions exist only in people's heads.

**Cure:** Make documentation part of done. No decision is complete until it's recorded.

### 6. Iteration Theater

**Symptom:** Calling every version an "iteration" without learning.

**Cure:** Require hypotheses and success criteria before building. No hypothesis, no iteration—just wandering.

---

## Quick Reference

### Problem Definition Checklist

- [ ] Symptom stated observably
- [ ] Affected users/scale identified
- [ ] Impact quantified
- [ ] Root cause explored (5 Whys)
- [ ] Reframed as opportunity

### Decision Readiness Checklist

- [ ] Problem clearly defined
- [ ] Constraints listed and ranked
- [ ] Assumptions mapped and tested
- [ ] Alternatives considered
- [ ] Consequences understood
- [ ] Decision documented

### Iteration Checklist

- [ ] Hypothesis stated
- [ ] Success criteria defined
- [ ] Minimum viable test built
- [ ] Data collected
- [ ] Learning documented
- [ ] Next action decided (pivot/persevere/pause)

---

## Four Enforcement Layers

Use this framework with the full enforcement stack:

1. **Design doctrine + structure**: this document plus Design System and Design Architecture doctrine.
2. **Internal AI behavior control**: `.github/copilot-instructions.md` (authoritative for repo execution).
3. **External AI reference for collaborators**: `APT-AI-INSTRUCTIONS-REFERENCE.md` (strict public-safe sibling).
4. **Machine-readable visual enforcement**: `apps/web/docs/design/tokens.json`.
5. **Layout baseline scaffold**: `apps/web/components/apt/AptLayout.tsx`.
6. **Starter prompt template**: `apps/web/ai/prompts/start-prompt-example.md`.

When AI output conflicts with this thinking model, the output must be revised, not rationalized.

---

## Version

**v1.0.0** — January 2026

---

*APT Design Thinking Framework — Applied Practical Thinking*

