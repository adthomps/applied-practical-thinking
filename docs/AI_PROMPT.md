# AI Prompt Conventions

## Prompt Storage
- All prompts must be stored as files in `apps/worker/src/ai/prompts`.
- Prompts must be versioned and reviewed before use in production.

## Usage
- Do not hardcode prompt strings in code.
- Reference prompt files from agent logic.

## Review
- All prompt changes require review and version bump.# AI_PROMPT.md

## AI Prompt Authoring

- All prompts live in `apps/web/ai/prompts/`
- Use markdown for all prompts
- Each prompt must start with a summary and owner
- Prompts must be reviewed before use
- Document all prompt changes in `apps/web/docs/design/decision-log.md`
