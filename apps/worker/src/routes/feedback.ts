import { Hono } from 'hono';
import { z } from 'zod';

const feedbackSchema = z.object({
  queryId: z.string(),
  userId: z.string().optional(),
  labels: z.array(z.object({ candidateId: z.string(), useful: z.boolean(), note: z.string().optional() }))
});

export const feedbackRoute = new Hono().post('/api/feedback', async (c) => {
  try {
    const body = await c.req.json();
    const parsed = feedbackSchema.safeParse(body);
    if (!parsed.success) return c.json({ error: 'Invalid request', details: parsed.error.format() }, 400);

    const payload = parsed.data;

    // Persist feedback where possible; for Workers, emit to logs for operator ingestion
    try {
      if (typeof process !== 'undefined' && process?.env?.NODE_ENV !== 'production') {
        // local Node: append to reports/feedback.json (ensure folder exists)
        const fs = require('fs');
        const path = require('path');
        const reportsDir = path.join(__dirname, '..', '..', '..', 'reports', 'feedback');
        fs.mkdirSync(reportsDir, { recursive: true });
        const outPath = path.join(reportsDir, `feedback_${Date.now()}.json`);
        fs.writeFileSync(outPath, JSON.stringify(payload, null, 2));
      } else {
        // Cloud environment: log for operator scraping
        console.log('[Worker] feedback received', JSON.stringify(payload));
      }
    } catch (err) {
      console.warn('Unable to persist feedback locally:', String(err));
    }

    return c.json({ ok: true });
  } catch (err) {
    console.error('[Worker] /api/feedback error:', err);
    return c.json({ error: 'Internal server error', details: String(err) }, 500);
  }
});
