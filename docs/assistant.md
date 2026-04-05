# APT Design Assistant

## Purpose
Document-grounded AI assistant for APT Design System, Design Thinking, and Design Architecture. Answers only from retrieved sources, with citations and strict guardrails.

## Behavior Contract
- Answers only from retrieved context (no hallucinations)
- Every answer must cite exact source chunks
- If confidence < threshold or no sources found:
  - Respond: "Not found in APT docs yet."
  - Suggest which doc section should be added
- No secret ingestion (exclude .env*, .git, node_modules, build output, credentials)
- Minimal abstraction (no LangChain/agent frameworks)

## Source Priority
1. `apps/web/docs/design/APT-DESIGN-ARCHITECTURE.md` → Design Architecture
2. `apps/web/docs/design/APT-DESIGN-SYSTEM.md` and adjacent design reference docs → Design System
3. `apps/web/docs/design/APT-DESIGN-THINKING.md` → Design Thinking
4. `packages/config/*` → Shared tokens/config contracts
5. `packages/ui/*` → Shared UI primitives
6. `apps/web/content/*` → Public learn/experiment content when the question is content-specific

## API Contracts
### POST /api/chat
- Request: { conversationId?, scope, messages }
- Response (streamed): answer_markdown, citations[], confidence, followups[]

### POST /api/ingest
- Protected by Authorization: Bearer <APT_INGEST_TOKEN>
- Request: { paths, rebuild }

## Guardrails
- Validate all inputs before external API calls
- Fail-fast: clear errors, no silent fallbacks
- No cross-app imports; shared logic only via packages/*

## Setup
- Requires OpenAI API key (env: OPENAI_API_KEY)
- Configure wrangler for new endpoints
- See docs/EVALS.md for evaluation prompts

## UI/UX
- Chat interface with streaming responses
- Scope filter
- Sources panel with expandable citations
- In-app modal for reporting missing docs/issues
- Follow-up suggestions from backend
- "Not found in APT docs yet" state
- Confidence indicator ("Grounded" vs "Low confidence")
