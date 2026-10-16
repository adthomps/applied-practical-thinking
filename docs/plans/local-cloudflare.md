# Local Cloudflare

## Status

Blocked. `pnpm dev` serves the Vite app, and `/api` is proxied to a Worker that is not running. `pnpm dev:worker` fails while Wrangler creates a remote preview session because the Vectorize binding sets `remote = true`.

`docs/project-context.md` (Local Cloudflare) records the same gap: add a local Wrangler env without that remote binding, run the web app and Worker together, and have local Worker requests read the local Vite origin instead of `PUBLIC_SITE_ORIGIN` (`https://appliedpracticalthinking.com`).

## Current commands and files

| Piece | What it does today |
| --- | --- |
| Root `package.json` `dev` | `pnpm --dir apps/web dev` |
| Root `package.json` `dev:worker` | `pnpm --dir apps/worker dev` |
| `apps/worker/package.json` `dev` | `wrangler dev` (no `--env`) |
| `apps/worker/package.json` `deploy` | `wrangler deploy` |
| `apps/web/vite.config.ts` | Vite on port `8080`; proxies `/api` to `http://127.0.0.1:8787` (`changeOrigin: true`, `secure: false`) |
| `apps/worker/wrangler.toml` | Worker `applied-practical-thinking`. Top-level `[[vectorize]]` binding `VECTORIZE`, index `applied-practical-knowledge`, `remote = true`. `[vars] PUBLIC_SITE_ORIGIN = "https://appliedpracticalthinking.com"`. No `[env.dev]`. |
| `apps/worker/src/routes/publicContent.ts` | `getStaticOrigin` / `fetchStaticJson` load `/data/${type}-index.json` using the request URL, `PUBLIC_SITE_ORIGIN`, and the `Origin` header. |

`getStaticOrigin` already branches on the request URL:

- If the Worker URL host is `127.0.0.1` or `localhost` and the port is `8787`, use the request `Origin` when that origin is localhost or `127.0.0.1` and its port is not `8787`. Otherwise use `http://127.0.0.1:8080`.
- For any other request URL, use `PUBLIC_SITE_ORIGIN`.

Reference pattern in APT Commerce (do not edit that repo): `apps/worker/wrangler.toml` `[env.dev]` uses Miniflare D1/KV through `preview_database_id` and `preview_id`. The Worker dev script is `wrangler dev --config wrangler.toml --env dev`. The web app calls `http://127.0.0.1:8787`. Secrets stay in `.dev.vars`.

This repo has no D1 or KV bindings. The local-env shape to copy is “a non-production Wrangler env started with `wrangler dev --env dev`,” not Commerce’s database bindings.

## Target behavior

- `pnpm dev` still starts Vite on port `8080` and proxies `/api` to `http://127.0.0.1:8787`.
- A local Worker command starts Wrangler on `127.0.0.1:8787` without opening a remote Vectorize preview session.
- Production Vectorize stays `remote = true` on the default (non-dev) config used by `wrangler deploy`.
- With both processes running, `/api` content routes load `/data/*-index.json` from the local Vite origin (`http://127.0.0.1:8080`, or the localhost `Origin` when it is present and is not port `8787`). They do not fetch `https://appliedpracticalthinking.com` for those localhost Worker requests.
- No new product features, bindings, or indexes.

## Blueprint

1. Add a local Wrangler environment, or a dev-only script that selects one, in `apps/worker`. Prefer `[env.dev]` plus `wrangler dev --env dev`, matching the APT Commerce command shape. That local env must not set Vectorize `remote = true`. Omit the Vectorize binding from `[env.dev]` unless a later check shows Wrangler still requires the binding name locally; if it does, bind `VECTORIZE` to `applied-practical-knowledge` without `remote = true`. Do not add D1, KV, or new indexes.
2. Leave the top-level `[[vectorize]]` block unchanged: `binding = "VECTORIZE"`, `index_name = "applied-practical-knowledge"`, `remote = true`. Production deploy continues to use that default config (`wrangler deploy` with no `--env dev`).
3. Point only the local Worker script at that env. Root `dev:worker` should still go through `apps/worker`. Keep `pnpm dev` as the Vite app on port `8080`. Start web and Worker together (two processes): Vite on `8080`, Worker on `8787`, with the existing `/api` proxy to `http://127.0.0.1:8787`.
4. Keep secrets out of `wrangler.toml` and out of this plan. If the Worker needs local secrets, put them in `apps/worker/.dev.vars` and leave that file uncommitted. Do not change `PUBLIC_SITE_ORIGIN` for production; it stays `https://appliedpracticalthinking.com` on the default config.
5. Do not rewrite `getStaticOrigin` unless the local check shows the proxied request is not seen as host `127.0.0.1` or `localhost` on port `8787`. That function already selects the local Vite origin for those requests, then `fetchStaticJson` reads `/data/${type}-index.json` from it. Confirm that path; do not add content types or API routes.
6. After both processes are up, request a content index through the Vite proxy (for example `/api/content/blog` on port `8080`) and confirm the Worker fetched `/data/blog-index.json` from `http://127.0.0.1:8080` (or from the browser localhost `Origin`), not from `https://appliedpracticalthinking.com`.

## Leave unchanged

- `apps/worker/wrangler.toml` production Vectorize `remote = true`, compatibility date, Worker name, and `PUBLIC_SITE_ORIGIN`.
- `apps/web/vite.config.ts` port `8080` and the `/api` proxy target `http://127.0.0.1:8787`.
- Root `dev` as the web app only. Do not fold the Worker into that script unless a separate combined script is added without replacing `dev`.
- `getStaticOrigin` localhost behavior, unless step 5 shows the request URL is not port `8787`.
- APT Commerce, `PROJECTS.md`, generated catalogs, and any secret values.

## Local check

1. From `applied-practical-thinking`, start `pnpm dev` and the local Worker command (`pnpm dev:worker` after it uses the env from step 3).
2. Worker logs must not stop on a remote Vectorize preview session. Wrangler should listen on `127.0.0.1:8787`.
3. Open `http://127.0.0.1:8080` and call a proxied content route such as `http://127.0.0.1:8080/api/content/blog`.
4. The JSON response should be the local `/data/blog-index.json` (or a clear fetch error from `http://127.0.0.1:8080/data/blog-index.json`). It must not be a fetch against `https://appliedpracticalthinking.com`.
5. `pnpm --dir apps/worker deploy` config remains the default Worker with Vectorize `remote = true`. Do not deploy as part of this check.
