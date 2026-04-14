// POST /api/ingest - Protected endpoint for ingesting docs/code/tokens
import { Hono } from 'hono';
import { z } from 'zod';
import { splitMarkdown } from '../ai/splitMarkdown';
import { embed, upsertToVectorDb } from '../ai/vectorClient';
import type { WorkerBindings } from '../workerTypes';

// Accept either a list of repository paths or an explicit documents payload
const ingestSchema = z.object({
  paths: z.array(z.string()).optional(),
  documents: z
    .array(
      z.object({
        path: z.string().optional(),
        frontmatter: z.record(z.string(), z.unknown()).optional(),
        content: z.string(),
        metadata: z.record(z.string(), z.unknown()).optional()
      })
    )
    .optional(),
  rebuild: z.boolean().optional()
});

export const ingestRoute = new Hono<{ Bindings: WorkerBindings }>().post('/api/ingest', async (c) => {
  const auth = c.req.header('Authorization');
  if (!auth || !auth.startsWith('Bearer ')) return c.json({ error: 'Unauthorized' }, 401);
  const token = auth.split(' ')[1];

  const configuredToken = c.env.APT_INGEST_TOKEN;
  if (!configuredToken) {
    return c.json({ error: 'Worker is missing required APT_INGEST_TOKEN binding' }, 500);
  }
  if (token !== configuredToken) return c.json({ error: 'Forbidden' }, 403);

  const body = await c.req.json();
  const parsed = ingestSchema.safeParse(body);
  if (!parsed.success) return c.json({ error: 'Invalid request', details: parsed.error.format() }, 400);

  const data = parsed.data;
  const ingestId = `ingest_${Date.now()}`;
  let accepted = 0;
  let rejected = 0;
  const validationErrors: string[] = [];

  const docs = data.documents || [];

  // Simple ingestion: for each provided document, split into chunks, embed, and upsert
  for (const doc of docs) {
    try {
      const chunks = splitMarkdown(doc.content || '');
      for (const chunk of chunks) {
        const embedding = await embed(chunk.text, c.env);
        const id = `${ingestId}_${chunk.id}`;
        await upsertToVectorDb({ id, embedding, metadata: { path: doc.path || 'inline', heading: chunk.heading, ...doc.metadata } }, c.env);
        accepted++;
      }
    } catch (err) {
      rejected++;
      validationErrors.push(`Failed to ingest ${doc.path || 'inline'}: ${String(err)}`);
    }
  }

  const report = {
    ingestId,
    acceptedCount: accepted,
    rejectedCount: rejected,
    validationErrors
  };

  return c.json(report);
});
