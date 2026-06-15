---
title: AGENTS.md
version: v1
last_updated: {{DATE}}
owner: {{OWNER}}
status: draft
---

# AGENTS.md

## Purpose

This repository follows the principles of APT (Applied Practical Thinking).

The objective is to create solutions that are:

* Practical
* Understandable
* Supportable
* Secure
* Measurable
* Maintainable

Every contribution—human or AI generated—must support those goals.

---

# APT Operating Hierarchy

When making decisions, evaluate in this order:

1. Principles
2. Outcomes
3. User Experience
4. Architecture
5. Implementation
6. Operations
7. Optimization

Higher levels always take precedence over lower levels.

---

# Outcome First

Before implementing anything, identify:

* Problem being solved
* Intended outcome
* Success criteria
* Operational impact
* Support impact

Avoid building features without a measurable purpose.

---

# Practicality Test

Choose the simplest solution that:

* Meets requirements
* Is maintainable
* Is testable
* Is supportable
* Is secure

Avoid unnecessary complexity.

---

# AI Agent Workflow

Before making changes:

1. Read existing code.
2. Understand existing patterns.
3. Follow repository conventions.
4. Minimize scope of changes.
5. Update tests.
6. Update documentation.
7. Explain risks.

AI-generated code must always be reviewed.

---

# Service Readiness

No feature is complete until:

* Support impact reviewed
* Documentation updated
* Logging added
* Monitoring identified
* Failure modes understood
* Recovery path documented

---

# Security Standards

Default to:

* Least privilege
* Input validation
* Output sanitization
* Secure defaults
* Auditability

Never expose:

* Secrets
* Tokens
* Credentials
* Personal information

---

# Observability

Systems should answer:

* What happened?
* When?
* Why?
* Who initiated it?
* How do we troubleshoot it?

Use:

* Structured logs
* Audit trails
* Correlation IDs
* Error tracking

---

# Testing Requirements

Changes should include:

* Unit tests
* API tests
* Integration tests when applicable
* Regression tests for bug fixes

Testing is part of implementation.

---

# Documentation Requirements

Update documentation when:

* Behavior changes
* APIs change
* Workflows change
* Architecture changes

Documentation is part of the product.

---

# Architecture Decision Records

Significant decisions must be documented.

Store records in:

docs/decisions/

Each ADR should include:

* Context
* Decision
* Alternatives
* Consequences

---

# Definition of Done

Work is complete when:

✓ Outcome achieved

✓ User experience validated

✓ Errors handled

✓ Security reviewed

✓ Logging added

✓ Tests updated

✓ Documentation updated

✓ Operational impact reviewed

✓ Support readiness confirmed

✓ Future maintainers can understand the solution
