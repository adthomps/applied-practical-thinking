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

2. **Cloudflare Pages Setup (apps/web) in a Monorepo:**

**Step-by-step Cloudflare Pages setup for a monorepo:**

1. In the Cloudflare dashboard, go to **Pages** > **Create Project**.
2. Select your GitHub repository (the monorepo containing both frontend and worker).
3. On the project configuration screen (see screenshot):
   - **Project name:**
     - Accept the default or enter a custom name (e.g., `applied-practical-thinking`).
   - **Production branch:**
     - Set to `main` (or your production branch).
   - **Framework preset:**
     - Select `None` (since Vite is not listed; custom build).
   - **Build command:**
     - Enter `npm run build`
   - **Build output directory:**
     - Enter `dist`
   - **Root directory (advanced) > Path:**
     - Enter `apps/web` (this tells Cloudflare to run the build from the frontend subfolder, not the repo root)
   - **Environment variables (advanced):**
     - Add any required variables (e.g., `VITE_API_URL`, etc.)
4. Click **Save and Deploy** (or equivalent) to start the first build.
5. Cloudflare will automatically build and deploy the static site from `apps/web` on every push/merge to the production branch, and create preview deploys for other branches.

**Tips:**

- If you use a different build command or output directory, adjust those fields accordingly.
- For custom domains, branch/preview deploys, or environment-specific variables, configure them in the Pages project settings after creation.

**Best Practice:**

- Keep all UI-only code in `apps/web` and use only `/api/*` for backend calls.
- Do not include business logic or API code in the frontend project.

3. **Cloudflare Worker Setup (apps/worker) in a Monorepo:**

**Step-by-step Cloudflare Worker setup for a monorepo:**

1. Install Wrangler CLI globally if you haven't: `npm install -g wrangler`
2. In your terminal, `cd apps/worker`
3. Run `wrangler login` to authenticate with your Cloudflare account.
4. Edit `wrangler.toml` in `apps/worker`:
   - Set the `name` (unique worker name)
   - Set your `account_id` (from Cloudflare dashboard)
   - Configure `routes` or `triggers` as needed (e.g., to serve `/api/*`)
   - (Optional) Set environment variables for the worker
5. In the Cloudflare dashboard, go to **Workers** > **Create Application** (or similar).
6. On the application setup screen (see screenshot):
   - **GitHub Repository:**
     - Select your monorepo (e.g., `adthomps/applied-practical-thinking`).
   - **Project name:**
     - Accept the default or enter a custom name (e.g., `applied-practical-thinking`).
   - **Build command:**
     - Leave blank unless you have a custom build step (most Workers do not need this).
   - **Deploy command:**
     - Enter `npx wrangler deploy`
   - **Builds for non-production branches:**
     - Enable if you want preview/branch deploys (recommended).
   - **Advanced settings:**
     - **Non-production branch deploy command:**
       - Enter `npx wrangler versions upload` (optional, for preview deploys)
     - **Path:**
       - Enter `/` (or leave as default; this is the root for the Worker project)
     - **API token:**
       - Select "Create new token" or use an existing one. If left blank, Cloudflare will create a new token automatically.
     - **API token name:**
       - (Optional) Name your API token for future reference.
     - **Variable name / value:**
       - (Optional) Add any environment variables needed by your Worker (e.g., secrets, API keys).
7. Click **Deploy** to start the first deployment.
8. Cloudflare will automatically build and deploy the Worker from `apps/worker` on every push/merge to the production branch, and create preview deploys for other branches if enabled.

**Tips:**

- If you use a custom build process, specify the build command as needed.
- For most TypeScript/JavaScript Workers, only the deploy command is required.
- Use environment variables for secrets and configuration, not hardcoded values.
- For advanced routing or triggers, configure these in `wrangler.toml`.

**Best Practice:**

- Keep all API and backend logic in `apps/worker`.
- Do not serve static frontend assets from the Worker; let Pages handle all static content.

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
