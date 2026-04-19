import { Hono, type Context } from 'hono';
import { assistantRuntimeRoute } from './routes/assistantRuntime';
import { contentGatewayRoute } from './routes/contentGateway';
import type { WorkerBindings } from './workerTypes';

const app = new Hono<{ Bindings: WorkerBindings }>();

const LOCAL_DEV_ORIGINS = new Set([
  'http://127.0.0.1:5173',
  'http://localhost:5173',
  'http://127.0.0.1:8080',
  'http://localhost:8080',
]);

const KNOWN_PUBLIC_ORIGINS = new Set([
  'https://applied-practical-thinking.pages.dev',
  'https://appliedpracticalthinking.com',
  'https://www.appliedpracticalthinking.com',
]);

function normalizeOrigin(value?: string) {
  if (!value?.trim()) return null;

  try {
    return new URL(value).origin;
  } catch {
    return null;
  }
}

function resolveAllowedCorsOrigin(requestOrigin?: string, configuredSiteOrigin?: string) {
  const normalizedRequestOrigin = normalizeOrigin(requestOrigin);
  if (!normalizedRequestOrigin) return null;

  const normalizedConfiguredOrigin = normalizeOrigin(configuredSiteOrigin);

  if (LOCAL_DEV_ORIGINS.has(normalizedRequestOrigin)) return normalizedRequestOrigin;
  if (KNOWN_PUBLIC_ORIGINS.has(normalizedRequestOrigin)) return normalizedRequestOrigin;
  if (normalizedConfiguredOrigin && normalizedRequestOrigin === normalizedConfiguredOrigin) {
    return normalizedRequestOrigin;
  }

  return null;
}

function applyCorsHeaders(c: Context<{ Bindings: WorkerBindings }>, allowedOrigin: string | null) {
  c.res.headers.set('Vary', 'Origin');
  c.res.headers.set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  c.res.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (allowedOrigin) {
    c.res.headers.set('Access-Control-Allow-Origin', allowedOrigin);
  }
}

// Host normalization and redirects: redirect known legacy or www hosts to canonical origin.
app.use('*', async (c, next) => {
  try {
    const reqUrl = new URL(c.req.url);
    const host = reqUrl.hostname;
    const configuredOrigin = normalizeOrigin(c.env.PUBLIC_SITE_ORIGIN) || 'https://appliedpracticalthinking.com';

    // Redirect `www` and Pages preview host to the canonical configured origin.
    if (host === 'www.appliedpracticalthinking.com' || host === 'applied-practical-thinking.pages.dev') {
      const dest = configuredOrigin + reqUrl.pathname + reqUrl.search;
      return c.redirect(dest, 301);
    }
  } catch (e) {
    // If URL parsing fails, fall through to normal handling.
  }

  // eslint-disable-next-line no-console
  console.log(`[Worker] ${c.req.method} ${c.req.path}`);

  const allowedOrigin = resolveAllowedCorsOrigin(c.req.header('origin'), c.env.PUBLIC_SITE_ORIGIN);

  if (c.req.method === 'OPTIONS') {
    if (c.req.header('origin') && !allowedOrigin) {
      return c.json({ error: 'CORS origin not allowed' }, 403);
    }
    c.status(204);
    applyCorsHeaders(c, allowedOrigin);
    return c.body(null);
  }

  await next();
  applyCorsHeaders(c, allowedOrigin);
});

app.route('/', contentGatewayRoute);
app.route('/', assistantRuntimeRoute);

app.get('/', (c) => c.text('APT Worker API is running'));

app.get('/api/info', (c) =>
  c.json({
    message: '<span class=\'apt-accent\'>Applied Practical Thinking</span> is coming soon',
    buttons: ['Design System', 'Design Thinking', 'Design Architecture']
  })
);

export default app;
