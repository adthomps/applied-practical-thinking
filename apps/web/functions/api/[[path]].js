// apps/web/functions/api/[[path]].js
export async function onRequest(context) {
  // Build the URL to your Worker (replace with your actual Worker subdomain if needed)
  const workerBase =
    "https://applied-practical-thinking.apt-account.workers.dev";
  const url = new URL(context.request.url);
  // Remove the '/api' prefix so the Worker receives the correct path
  const apiPath = url.pathname.replace(/^\/api/, "");
  const workerUrl = `${workerBase}${apiPath}`;

  // Forward the request to the Worker
  const response = await fetch(workerUrl, {
    method: context.request.method,
    headers: context.request.headers,
    body: context.request.body,
  });
  return response;
}
