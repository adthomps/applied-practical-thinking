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

## Deployment Notes: Cloudflare Pages + Worker Integration

### How the Project is Set Up and Works

- **Monorepo Structure:**
  - `apps/web`: Vite + React SPA (frontend, static assets)
  - `apps/worker`: Cloudflare Worker (API backend)
  - `apps/web/functions/api/[[path]].js`: Cloudflare Pages Function that proxies `/api/*` requests to the Worker

- **Frontend (Pages):**
  - Deployed to Cloudflare Pages (e.g., https://applied-practical-thinking.pages.dev)
  - All API calls in the frontend use relative URLs (e.g., `/api/info`)

- **Backend (Worker):**
  - Deployed to Cloudflare Workers (e.g., https://applied-practical-thinking.apt-account.workers.dev)
  - Handles API routes like `/api/info`

- **Proxy (Pages Function):**
  - Any request to `/api/*` on the Pages site is intercepted by `apps/web/functions/api/[[path]].js`
  - This function forwards the request to the Worker, preserving the path and method
  - The Worker processes the request and returns the response, which is sent back to the frontend

### Deployment & Debugging Notes

- **Deploying:**
  - Push to the main branch triggers deploys for both Pages and Worker (if both are connected to GitHub)
  - Pages Functions must be committed to the repo; they cannot be edited in the Cloudflare UI
  - The Worker must be deployed and public at its workers.dev subdomain

- **Common Issues & Fixes:**
  - **404 on /api/\*:**
    - Ensure the Pages Function exists at `apps/web/functions/api/[[path]].js`
    - Ensure the Worker is deployed and accessible at its workers.dev URL
    - The proxy function should forward the full path (do not strip `/api`)
  - **Unexpected token '<', ... is not valid JSON:**
    - This means the frontend is receiving HTML (likely a 404 or error page) instead of JSON
    - Check that the proxy is forwarding requests correctly and the Worker is returning JSON
  - **Invalid Pages function route parameter:**
    - Use `[[path]].js` for catch-all routes, not `[...catchall].js`

- **Testing:**
  - You can test the Worker directly at its workers.dev URL (e.g., https://applied-practical-thinking.apt-account.workers.dev/api/info)
  - You can test the full integration by visiting the Pages site and making API calls from the frontend

### Summary

- The frontend and backend are cleanly separated, with a Pages Function bridging API calls.
- All deploys are automated via GitHub integration.
- The setup allows for local development, preview deploys, and production deploys with unified routing.

---

## Using a Custom Domain (appliedpracticalthinking.com)

To use your own domain (e.g., appliedpracticalthinking.com and www.appliedpracticalthinking.com) for your Cloudflare Pages + Worker deployment:

### 1. Add Your Domain to Cloudflare

- Go to the Cloudflare dashboard and add your domain (appliedpracticalthinking.com) if you haven’t already.
- Follow the prompts to change your domain’s nameservers to Cloudflare’s (if not already using Cloudflare DNS).

### 2. Assign the Domain to Your Pages Project

- In the Cloudflare dashboard, go to your Pages project.
- Go to the **Custom Domains** section.
- Add both `appliedpracticalthinking.com` and `www.appliedpracticalthinking.com` as custom domains.
- Cloudflare will show you the required DNS records (usually CNAME or A records) to add for each domain.

### 3. Update DNS Records

- In the Cloudflare DNS settings for your domain:
  - For the root domain (`appliedpracticalthinking.com`):
    - Add an **A record** pointing to `192.0.2.1` (Cloudflare’s dummy IP for root domain flattening), or use the CNAME flattening option if available.
    - Or, if Cloudflare instructs, add a **CNAME** for `@` pointing to your Pages project’s `.pages.dev` domain.
  - For the www subdomain (`www.appliedpracticalthinking.com`):
    - Add a **CNAME** for `www` pointing to your Pages project’s `.pages.dev` domain (e.g., `applied-practical-thinking.pages.dev`).

### 4. Wait for DNS Propagation

- It may take a few minutes to a few hours for DNS changes to propagate.
- Cloudflare will automatically provision SSL certificates for your custom domain.

### 5. Test Your Site

- Visit https://appliedpracticalthinking.com and https://www.appliedpracticalthinking.com to verify they both load your Pages site.
- API routes (e.g., `/api/info`) will continue to work as before, routed through your Pages Function to your Worker.

### 6. (Optional) Redirect www to root or vice versa

- In Cloudflare Pages settings, you can set up a redirect so that all traffic to `www.appliedpracticalthinking.com` redirects to `appliedpracticalthinking.com`, or the other way around, for a unified canonical domain.

---

**Summary:**

- Add your domain to Cloudflare and point DNS to Cloudflare.
- Assign the domain(s) to your Pages project.
- Add the DNS records Cloudflare provides.
- Wait for propagation and test.
- All API proxying and Worker integration will continue to work with your custom domain.
