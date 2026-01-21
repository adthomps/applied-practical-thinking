# Deployment

## Cloudflare Pages (apps/web)

- **Preview Deploy:**
  - Push any branch (e.g. `feature/xyz` or `preview/*`) to GitHub.
  - Cloudflare Pages automatically builds and deploys a preview environment for that branch.
  - Preview URL is shown in the Cloudflare Pages dashboard and GitHub PR checks.

- **Production Deploy:**
  - Merge the PR/branch into `main` (or `production` if configured).
  - Cloudflare Pages deploys the latest `main` to the production URL.

## Cloudflare Worker (apps/worker)

- **Preview Deploy:**
  - Push to a preview branch (e.g. `preview/*`) on GitHub.
  - GitHub Actions (or Wrangler preview) deploys the worker to a preview environment (e.g. `*.workers.dev` with a preview subdomain).
  - Preview URL is available in the Cloudflare dashboard and PR checks.

- **Production Deploy:**
  - Merge to `main` (or `production`).
  - GitHub Actions (or Wrangler publish) deploys the worker to the production route/domain.

## Workflow Example (using GitHub Desktop)

1. Create a feature or preview branch in GitHub Desktop.
2. Push changes to GitHub. Cloudflare deploys a preview for both Pages and Worker.
3. Review the preview URLs (auto-linked in PR or Cloudflare dashboard).
4. Once approved, merge the branch into `main` using GitHub Desktop or GitHub.com.
5. Cloudflare deploys the latest `main` to production for both Pages and Worker.

**Note:**

- All deploys are automated via GitHub Actions and Cloudflare integrations.
- No manual deploys to production; always use PR/merge flow for traceability.

---

## First-Time Setup Steps

If this is your first time deploying, follow these steps:

1. **Cloudflare Account:**

- Create a Cloudflare account at https://dash.cloudflare.com/
- Add your GitHub repository to Cloudflare Pages and/or Workers.

2. **Cloudflare Pages Setup (apps/web):**

- Go to Cloudflare Pages > Create Project > Connect your GitHub repo.
- Set build command: `npm run build`
- Set output directory: `dist`
- Set root directory: `apps/web`
- Configure environment variables if needed.

3. **Cloudflare Worker Setup (apps/worker):**

- Install Wrangler CLI: `npm install -g wrangler`
- Authenticate: `wrangler login`
- Configure `wrangler.toml` in `apps/worker` (set name, account_id, routes, etc.)
- Optionally, set up GitHub Actions for CI/CD (see Cloudflare docs for sample workflows).

4. **GitHub Integration:**

- Ensure your repo is connected to Cloudflare for automatic deploys.
- Set up required secrets (API tokens, account IDs) in GitHub repo settings if using Actions.

5. **First Deploy:**

- Push to a branch to trigger a preview deploy.
- Merge to `main` to trigger production deploy.

**References:**

- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/)
- [Wrangler CLI Docs](https://developers.cloudflare.com/workers/wrangler/)
