
import { Hono } from 'hono';
import { chatRoute } from './routes/chat';
import { reportRoute } from './routes/report';

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
app.route('/', reportRoute); // Mount reportRoute at root so /api/report works

app.get('/', (c) => c.text('APT Worker API is running'));

app.get('/api/info', (c) =>
  c.json({
    message: '<span class=\'apt-accent\'>Applied Practical Thinking</span> is coming soon',
    buttons: ['Design System', 'Design Thinking', 'Design Architecture']
  })
);

export default app;
