---
title: Knowledge Engine Implementation
version: v2
status: candidate
audience: developer
visibility: public
source: manual
---

# Knowledge Engine — Implementation Guide

This guide provides runnable examples and patterns for worker endpoints that implement the conceptual `APT Knowledge Engine` doctrine: ingest, index, query, and feedback handlers.

## Ingest handler (outline)

```ts
import { Hono } from 'hono';
import { splitMarkdown } from '../../../shared/splitMarkdown';
import { generateEmbeddings } from '@apt/knowledge';
import { indexChunks } from '../vector/indexDocs';

const app = new Hono();

app.post('/ingest', async (c) => {
  const payload = await c.req.json();
  // validate frontmatter and required fields
  const ingestId = `ingest_${Date.now()}`;
  // chunk content
  const chunks = splitMarkdown(payload.content, { overlap: 50, maxTokens: 500 });
  // generate embeddings
  const embeddings = await generateEmbeddings(chunks.map((c) => c.text));
  // build chunk records and call index
  const records = chunks.map((chunk, i) => ({ id: `${ingestId}_${i}`, text: chunk.text, metadata: chunk.meta, embedding: embeddings[i] }));
  await indexChunks(records);
  return c.json({ ingestId, acceptedCount: records.length });
});
```

## Query handler (outline)

```ts
app.post('/query', async (c) => {
  const { query, topK = 5 } = await c.req.json();
  // embed query
  const qEmb = await generateEmbeddings([query]);
  // call vector search client
  const candidates = await vectorClient.search({ vector: qEmb[0], topK });
  // compose response with provenance
  const composed = composeFromCandidates(candidates);
  return c.json({ queryId: `q_${Date.now()}`, candidates, composedResponse: composed });
});
```

## Feedback handler (outline)

```ts
app.post('/feedback', async (c) => {
  const payload = await c.req.json();
  // persist label for re-ranking and training
  await persistFeedback(payload);
  return c.json({ ok: true });
});
```

## Operational notes

- Use correlation IDs to trace across ingest → index → query flows.
- Persist embeddings and map to chunkIds to allow safe embedding regeneration.
- Respect privacy and retention rules: redact PII at ingest, and expose retention metadata in chunk records.

## Files to add in PR

- `apps/worker/src/routes/ingest.ts` — handler with schema validation and background indexing
- `apps/worker/src/routes/query.ts` — handler that calls vector search and composes response
- `apps/worker/src/routes/feedback.ts` — endpoint for labels
- `apps/worker/src/ai/docs/` — this file and small runbook examples

