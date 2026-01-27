import { Hono } from 'hono';

const app = new Hono();

app.get('/', (c) => c.text('APT Worker API is running'));

app.get('/api/info', (c) =>
  c.json({
    message: '<span class=\'apt-accent\'>Applied Practical Thinking</span> is coming soon',
    buttons: ['Design System', 'Design Thinking', 'Design Architecture']
  })
);

// Simple chat handler for POST /api/chat
app.post('/api/chat', async (c) => {
  try {
    const body = await c.req.json();
    // Example: echo the payload back
    return c.json({
      ok: true,
      received: body,
      message: 'Chat endpoint received your request.'
    });
  } catch (err) {
    return c.json({ ok: false, error: 'Invalid JSON or request.' }, 400);
  }
});

export default app;
