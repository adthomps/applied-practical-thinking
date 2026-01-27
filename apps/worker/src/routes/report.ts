// POST /api/report - Report missing doc info and create GitHub issue
import { Hono } from 'hono';
import { z } from 'zod';

// Zod schema for input validation
const reportSchema = z.object({
  question: z.string().min(5).max(500),
  scope: z.string().min(2).max(64),
  conversationId: z.string().optional(),
  lastAnswer: z.string().min(5).max(500),
  topMatches: z.array(z.object({
    path: z.string(),
    headingPath: z.string(),
    score: z.number()
  })).optional(),
  userNote: z.string().max(500).optional()
});

export const reportRoute = new Hono().post('/api/report', async (c) => {
  // Validate input
  const body = await c.req.json();
  const parsed = reportSchema.safeParse(body);
  if (!parsed.success) return c.json({ error: 'Invalid request' }, 400);
  const { question, scope, conversationId, lastAnswer, topMatches = [], userNote } = parsed.data;

  // TODO: Insert into D1, generate reportId (APT-ISSUE-000123)
  // TODO: Attempt to create GitHub issue, update D1 with result
  // For now, return a static response for UI wiring
  return c.json({
    reportId: 'APT-ISSUE-000123',
    status: 'created',
    github: {
      issueNumber: 57,
      issueUrl: 'https://github.com/owner/repo/issues/57'
    }
  });
});
