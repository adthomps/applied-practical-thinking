
import { Hono } from 'hono';
import { chatRoute } from './routes/chat';
import { publicContentRoute } from './routes/publicContent';
import { reportRoute } from './routes/report';
import { ingestRoute } from './routes/ingest';
import { queryRoute } from './routes/query';
import { feedbackRoute } from './routes/feedback';

const app = new Hono();


// Log every request method and path
app.use('*', async (c, next) => {
  // eslint-disable-next-line no-console
  console.log(`[Worker] ${c.req.method} ${c.req.path}`);
  await next();
  c.res.headers.set('Access-Control-Allow-Origin', '*');
  c.res.headers.set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  c.res.headers.set('Access-Control-Allow-Headers', 'Content-Type');
});

// Handle preflight OPTIONS requests
app.options('*', (c) => {
  c.res.headers.set('Access-Control-Allow-Origin', '*');
  c.res.headers.set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  c.res.headers.set('Access-Control-Allow-Headers', 'Content-Type');
  return c.text('');
});


// Debug route to check OPENAI_API_KEY in Worker environment
app.get('/api/debug/env', (c) => {
  // eslint-disable-next-line no-console
  console.log('DEBUG: c.env.OPENAI_API_KEY =', c.env?.OPENAI_API_KEY);
  return c.json({ OPENAI_API_KEY: c.env?.OPENAI_API_KEY ?? null });
});

app.route('/', chatRoute); // Mount chatRoute at root so /api/chat works
app.route('/', publicContentRoute);
app.route('/', reportRoute); // Mount reportRoute at root so /api/report works
app.route('/', ingestRoute);
app.route('/', queryRoute);
app.route('/', feedbackRoute);

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
