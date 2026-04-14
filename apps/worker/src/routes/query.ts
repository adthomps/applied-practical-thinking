import { Hono } from 'hono';
import { z } from 'zod';
import { embed, queryVectorDb } from '../ai/vectorClient';
import type { WorkerBindings } from '../workerTypes';

const querySchema = z.object({
  query: z.string(),
  topK: z.number().int().positive().optional(),
  filters: z.record(z.string(), z.unknown()).optional(),
  context: z.record(z.string(), z.unknown()).optional()
});

export const queryRoute = new Hono<{ Bindings: WorkerBindings }>().post('/api/query', async (c) => {
  try {
    const body = await c.req.json();
    const parsed = querySchema.safeParse(body);
    if (!parsed.success) return c.json({ error: 'Invalid request', details: parsed.error.format() }, 400);

    const { query, topK = 5 } = parsed.data;

    const qEmb = await embed(query, c.env);
    const matches = await queryVectorDb(qEmb, topK, c.env); // returns [{id, score, metadata, text}]
    const candidates = matches.map((match) => ({
      chunkId: match.id,
      score: match.score,
      snippet: match.text || '',
      citation:
        typeof match.metadata?.path === "string"
          ? match.metadata.path
          : typeof match.metadata?.source === "string"
            ? match.metadata.source
            : "",
    }));

    const composedResponse = {
      text: matches.length > 0 ? `Found ${matches.length} candidate(s). See citations.` : 'No relevant documents found.',
      citations: matches.map((match) => match.id),
      confidence: matches.length > 0 ? matches[0].score : 0
    };

    return c.json({ queryId: `q_${Date.now()}`, candidates, composedResponse });
  } catch (err) {
    console.error('[Worker] /api/query error:', err);
    return c.json({ error: 'Internal server error', details: String(err) }, 500);
  }
});
