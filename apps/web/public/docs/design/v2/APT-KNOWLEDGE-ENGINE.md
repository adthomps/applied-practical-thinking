---
docId: knowledge-engine
slug: knowledge-engine
major: 2
semanticVersion: "2.0.0"
status: candidate
publishedAt: "2026-04-12"
title: APT Knowledge Engine
---
---

# APT Knowledge Engine (Runtime Systems)

This doctrine explains how APT's runtime knowledge systems operate: ingestion, indexing, retrieval, response generation, and continuous feedback. It focuses on architecture-level contracts, data contracts, and observable runtime behavior while delegating code-level details to worker-local implementation docs.

Purpose
- Provide a canonical runtime model for AI-enabled features and knowledge services.
- Specify API-level contracts, ingestion rules, indexing expectations, and feedback loop responsibilities.

Conceptual model
- Ingest: canonical sources (markdown/YAML, external feeds, user submissions) are validated, chunked, and annotated with stable metadata (source, path, author, version).
- Index: deterministic chunking + embedding generation produces vector records and accompanying citation metadata stored in a retrievable index.
- Retrieve: similarity-based retrieval returns candidate chunks with provenance, score, and pre-filtered policy metadata.
- Respond: composition layer builds responses from retrieved chunks, tool outputs, and guardrails; responses include citations and confidence signals.

API surface (recommended)
- `POST /ingest` — accept content batch, return ingestId and validation report.
- `POST /index/flush` — operational endpoint to flush/persist pending index operations.
- `POST /query` — ask the knowledge engine with query params (context, topK, filters), returns ranked candidates and composed response.
- `POST /feedback` — attach feedback or label to a response/record for future training or re-ranking.

Data contracts & schemas
- `KnowledgeChunk`: id, source, path, text, tokens, embeddingId, metadata (tags, semantic scope), publishedAt
- `IngestReport`: ingestId, fileSummaries, validationErrors, acceptedCount, rejectedCount
- `QueryResponse`: candidates [{chunkId, score, snippet, citation}], composedResponse {text, citations, confidence}

Vectorization & embedding guidance
- Use deterministic chunking tuned for downstream retrieval quality. Include overlap and sliding windows as needed for context continuity.
- Store embeddings alongside chunk metadata; do not rely on ephemeral provider IDs without local persistable mapping.

Retrieval-augmentation (RAG) guidance
- Prefer short, provenance-first responses: always include citations for any content-derived claim.
- Limit chain-of-thought content in user-visible responses; surface reasoning as optional operator-only artifacts.

Feedback loop design
- Capture explicit user feedback and passive signals (click-through, ignore, correction). Map feedback to re-ranking signals and training deltas.
- Define retention and refresh cadence for index updates and embedding regeneration.

Privacy, security, and retention
- Mask or redact PII at ingest time where required. Record redaction decisions in chunk metadata.
- Define retention policy per source type and make it declarative in `packages/knowledge` contracts.

Observability & SLOs
- Instrument ingest latency, indexing backlog, query latency, and retrieval hit-rate. Define SLOs and alert thresholds.
- Capture end-to-end traces with correlation IDs between web requests, worker processing, and index operations.

Implementation references
- Canonical doctrine (conceptual): `apps/web/docs/design/versions/v2/APT-KNOWLEDGE-ENGINE.md`
- Worker runtime details and code examples: `apps/worker/src/ai/` (vectorClient.ts, indexDocs.ts, splitMarkdown.ts)
- Shared schema/contracts: `packages/knowledge/src/` (assistant.ts, content.ts, system.ts)

Quick checklist (minimum)
- [ ] Ingest API accepts validated frontmatter and returns `ingestId`
- [ ] Chunk schema includes source provenance and publishedAt
- [ ] Embeddings persisted with mapping table to chunkId
- [ ] Query API returns candidates with citations and scores
- [ ] Feedback endpoint persists labels and surfaces to re-ranking pipeline
- [ ] Telemetry for ingest/index/query paths instrumented and documented

Notes
- Keep conceptual guidance here; link to worker-local implementation docs for actionable code-level patterns and operational runbooks.

## PR-ready examples, templates, and playbooks

Below are ready-to-copy examples and small schemas to use as starting artifacts for implementation PRs and worker docs.

### Example: `POST /ingest` request payload

```json
{
	"source": "apps/web/content/guides/03-designing-ai-ready-interfaces-guide.md",
	"sourceType": "markdown",
	"documents": [
		{
			"path": "03-designing-ai-ready-interfaces-guide.md",
			"frontmatter": {
				"title": "Designing AI-ready Interfaces",
				"author": "Team APT",
				"publishedAt": "2026-03-01"
			},
			"content": "# Heading\nText content...",
			"metadata": {
				"tags": ["ai","ux"],
				"visibility": "public"
			}
		}
	]
}
```

Example server response (201 Accepted):

```json
{
	"ingestId": "ingest_20260412_0001",
	"acceptedCount": 1,
	"rejectedCount": 0,
	"validationReportUrl": "/docs/design/ingest-reports/ingest_20260412_0001.json"
}
```

### Example: `POST /query` request payload

```json
{
	"query": "How should we design fallback for failed AI completions?",
	"topK": 5,
	"filters": { "tags": ["support-design"] },
	"context": { "userId": "user_1234", "sessionId": "sess_9876" }
}
```

Example server response (200 OK):

```json
{
	"queryId": "q_20260412_0001",
	"candidates": [
		{ "chunkId": "c_0001", "score": 0.92, "snippet": "When AI degrades, prefer conservative fallback...", "citation": "/content/guides/03-designing-ai-ready-interfaces-guide.md#section" }
	],
	"composedResponse": { "text": "Use conservative fallback: show safe defaults and ask for confirmation.", "citations": ["c_0001"], "confidence": 0.74 }
}
```

### Example: `POST /feedback` request payload

```json
{
	"queryId": "q_20260412_0001",
	"userId": "user_1234",
	"labels": [{ "candidateId": "c_0001", "useful": false, "note": "irrelevant example" }]
}
```

### JSON Schema: `KnowledgeChunk` (simplified)

```json
{
	"$schema": "http://json-schema.org/draft-07/schema#",
	"title": "KnowledgeChunk",
	"type": "object",
	"required": ["id","source","text","publishedAt"],
	"properties": {
		"id": { "type": "string" },
		"source": { "type": "string" },
		"path": { "type": "string" },
		"text": { "type": "string" },
		"tokens": { "type": "integer" },
		"embeddingId": { "type": "string" },
		"metadata": {
			"type": "object",
			"properties": {
				"tags": { "type": "array", "items": { "type": "string" } },
				"visibility": { "type": "string", "enum": ["public","private","internal"] }
			}
		},
		"publishedAt": { "type": "string", "format": "date" }
	}
}
```

### JSON Schema: `IngestReport` (simplified)

```json
{
	"$schema": "http://json-schema.org/draft-07/schema#",
	"title": "IngestReport",
	"type": "object",
	"required": ["ingestId","acceptedCount","rejectedCount"],
	"properties": {
		"ingestId": { "type": "string" },
		"acceptedCount": { "type": "integer" },
		"rejectedCount": { "type": "integer" },
		"fileSummaries": { "type": "array", "items": { "type": "object" } },
		"validationErrors": { "type": "array", "items": { "type": "string" } }
	}
}
```

### JSON Schema: `QueryResponse` (simplified)

```json
{
	"$schema": "http://json-schema.org/draft-07/schema#",
	"title": "QueryResponse",
	"type": "object",
	"required": ["queryId","candidates","composedResponse"],
	"properties": {
		"queryId": { "type": "string" },
		"candidates": {
			"type": "array",
			"items": {
				"type": "object",
				"required": ["chunkId","score","snippet"],
				"properties": { "chunkId": { "type": "string" }, "score": { "type": "number" }, "snippet": { "type": "string" }, "citation": { "type": "string" } }
			}
		},
		"composedResponse": { "type": "object" }
	}
}
```

### Playbook: Ingest Failure (example)

1. Detect
	 - Alert: `ingest_failure_rate > 5%` over 5 minutes
	 - Initial signal: `ingestId` error rate and validationFailureCount

2. Triage & Diagnose
	 - Correlate `ingestId` to recent commits, file paths, and ingestion worker logs
	 - Check provider limits (file size, timeouts) and schema validation errors

3. Respond (fast path)
	 - If transient (provider timeout), schedule auto-retry with exponential backoff up to 3 attempts
	 - If schema validation error: mark for human review, return `rejectedCount` with validation error details
	 - If quota or auth issue: trigger operator page with remediation actions

4. Mitigate
	 - Pause ingest pipeline if systemic (large backlog), enable degraded mode (accept metadata only)
	 - Surface a public-safe message if user-triggered ingestion failed

5. Learn
	 - Create incident with attached `ingestId`, validation report, and affected paths
	 - Add corrective task (schema fix, improved frontmatter guidance) to backlog

---

These artifacts are intended to be copy/paste-ready into implementation PRs. For code-level samples, create worker-local docs in `apps/worker/src/ai/docs/` that reference these schemas and include sample server-side handlers (ingest/index/query/feedback) using existing helpers like `splitMarkdown` and `vectorClient`.

