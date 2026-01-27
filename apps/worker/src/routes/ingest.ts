// POST /api/ingest - Protected endpoint for ingesting docs/code/tokens
import { Hono } from 'hono';
import { z } from 'zod';
// TODO: Replace with local types if needed

const ingestSchema = z.object({
  paths: z.array(z.string()),
  rebuild: z.boolean()
});

export const ingestRoute = new Hono().post('/api/ingest', async (c) => {
  const auth = c.req.header('Authorization');
  if (!auth || !auth.startsWith('Bearer ')) return c.json({ error: 'Unauthorized' }, 401);
  const token = auth.split(' ')[1];
  if (token !== process.env.APT_INGEST_TOKEN) return c.json({ error: 'Forbidden' }, 403);
  const body = await c.req.json();
  const parsed = ingestSchema.safeParse(body);
  if (!parsed.success) return c.json({ error: 'Invalid request' }, 400);
  // TODO: Implement ingestion logic
  return c.json({ status: 'Ingest started', paths: parsed.data.paths });
});
