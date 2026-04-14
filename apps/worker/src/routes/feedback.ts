import { Hono } from 'hono';
import { z } from 'zod';
import type { WorkerBindings } from '../workerTypes';

const feedbackSchema = z.object({
  queryId: z.string(),
  userId: z.string().optional(),
  labels: z.array(z.object({ candidateId: z.string(), useful: z.boolean(), note: z.string().optional() }))
});

export const feedbackRoute = new Hono<{ Bindings: WorkerBindings }>().post('/api/feedback', async (c) => {
  try {
    const body = await c.req.json();
    const parsed = feedbackSchema.safeParse(body);
    if (!parsed.success) return c.json({ error: 'Invalid request', details: parsed.error.format() }, 400);

    const payload = parsed.data;

    // Persist feedback through logs for downstream operator ingestion.
    try {
      console.log('[Worker] feedback received', JSON.stringify(payload));
    } catch (err) {
      console.warn('Unable to log feedback payload:', String(err));
    }

    return c.json({ ok: true });
  } catch (err) {
    console.error('[Worker] /api/feedback error:', err);
    return c.json({ error: 'Internal server error', details: String(err) }, 500);
  }
});
