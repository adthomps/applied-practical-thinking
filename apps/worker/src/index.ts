import { Hono } from 'hono';

const app = new Hono();

app.get('/', (c) => c.text('APT Worker API is running'));

app.get('/api/info', (c) =>
  c.json({
    message: '<span class=\'apt-accent\'>Applied Practical Thinking</span> is coming soon',
    buttons: ['Design System', 'Design Thinking', 'Design Architecture']
  })
);

export default app;
