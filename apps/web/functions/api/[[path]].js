// apps/web/functions/api/[...catchall].js
export async function onRequest(context) {
  // Build the URL to your Worker (replace with your actual Worker subdomain if needed)
  const workerBase =
    "https://applied-practical-thinking.apt-account.workers.dev/"; // TODO: Replace <your-account>
  const url = new URL(context.request.url);
  const apiPath = url.pathname;
  const workerUrl = `${workerBase}${apiPath}`;

  // Forward the request to the Worker
  const response = await fetch(workerUrl, {
    method: context.request.method,
    headers: context.request.headers,
    body: context.request.body,
  });
  return response;
}
