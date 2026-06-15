---
description: "Standard APT repository audit prompt. Use for framework or repo reviews that require evidence-based findings ordered by severity (`critical`, `high`, `medium`, `low`) with remediation and residual risk."
---

# Standard Repo Audit (APT)

## Purpose
Produce an evidence-based APT audit with prioritized findings and concrete remediation.

## Input Expectations
Provide:
- Audit target and scope (files, folders, or full repo)
- Canonical docs to apply (for example `apt-principles.md`, domain docs, checklists, references)
- Review constraints (read-only or allowed edits)
- Any release timeline or risk tolerance

If inputs are missing, state assumptions explicitly.

## Prompt
```text
You are performing an Applied Practical Thinking (APT) repository audit.

Audit target:
- [INSERT TARGET]

Scope:
- [INSERT PATHS OR DOMAINS]

Canonical sources:
- [INSERT DOCTRINE / CHECKLIST / REFERENCE LINKS]

Constraints:
- [READ-ONLY OR EDIT ALLOWED]
- [TIMELINE / RELEASE CONTEXT]

Return findings with strict evidence and no speculation.

Required output format:
1. Findings ordered by severity: critical, high, medium, low.
2. For each finding include:
   - Severity
   - Title
   - Evidence (file paths and concrete mismatch)
   - Principle or standard violated
   - Recommended correction
   - Residual risk if not fixed
3. Coverage summary:
   - Which principle areas were reviewed
   - Which areas were not reviewed
4. Validation note:
   - Commands run and outcomes, or why validation was not run
5. Assumptions and open questions.

Guardrails:
- Do not invent doctrine not present in canonical APT sources.
- Flag ambiguity explicitly instead of guessing.
- Do not approve release-readiness without evidence.
```

## Expected Output
- Clear severity-first findings list.
- Concrete, file-grounded evidence for each finding.
- Actionable remediation and follow-up queue.

## Related Documents
- [apt-principles.md](../../apt-principles.md)
- [ai-agent-framework.md](../../ai-agent-framework.md)
- [references/ai-review-bundle.json](../../references/ai-review-bundle.json)
- [checklists/](../../checklists/)
