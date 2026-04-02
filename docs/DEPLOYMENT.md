# Deployment

This project uses a modern CI/CD workflow with GitHub Actions and Cloudflare for both the web frontend (Pages) and backend (Worker). All deployments are automated and follow a preview/production flow for safe, reliable releases.

## Repository Structure & Paths

- **GitHub Repository:**
  - All code and configuration live in the main GitHub repository.
  - The repository root contains configuration, documentation, and workspace settings.
  - Key folders:
    - `apps/web` — Vite + React SPA frontend (Cloudflare Pages target)
    - `apps/worker` — Cloudflare Worker API backend
    - `packages/` — Shared code (do not deploy directly)
    - `apps/web/ai/prompts/` — AI prompt definitions
    - `docs/` — Documentation
    - `.github/workflows/` — GitHub Actions workflow files

- **Deployment Paths:**
  - **Web:**
    - Set Cloudflare Pages project root to `apps/web`.
    - Build output is typically in `apps/web/dist`.
    - Ensure `package.json`, `vite.config.ts`, and `tsconfig.json` are present in `apps/web`.
  - **Worker:**
    - Set Wrangler project root to `apps/worker`.
    - Entry point is `apps/worker/src/index.ts`.
    - Ensure `wrangler.toml` and `package.json` are present in `apps/worker`.

## GitHub Actions Setup

- **Workflow Files:**
  - Located in `.github/workflows/` at the repo root.
  - Typical workflows:
    - `pages.yml` or `deploy-pages.yml` for Cloudflare Pages
    - `worker.yml` or `deploy-worker.yml` for Cloudflare Worker

- **Key Settings:**
  - Use `working-directory` in workflow steps to target `apps/web` or `apps/worker` as needed.
  - Example:
    ```yaml
    - name: Install dependencies (web)
      run: pnpm install
      working-directory: apps/web
    - name: Build (worker)
      run: pnpm build
      working-directory: apps/worker
    ```
  - Set environment variables and secrets in GitHub repository settings and reference them in workflows.

## Cloudflare UI/Dashboard Setup

### For Pages (Web Frontend)

1. Go to https://dash.cloudflare.com/
2. Navigate to **Workers & Pages** in the sidebar.
3. Click **Create Application**.
4. Under "Looking to deploy pages?", click **Get Started**.
5. Click **Get Started** on "Import an existing git repo".
6. Select your GitHub repository and click **Begin Setup**.
7. Set project details:
   - **Project Name:** (e.g., `apt-web`)
   - **Branch:** (e.g., `main` for production, or your preview branch)
   - **Build Settings:**
     - **Framework Preset:** (select Vite or None if custom)
     - **Build Command:** `pnpm build` (or as defined in `apps/web/package.json`)
     - **Build Output Directory:** `dist`
     - **Root Directory:** `apps/web`
   - Review and confirm settings, then deploy.

### For Worker (API Backend)

1. Go to https://dash.cloudflare.com/
2. Navigate to **Workers & Pages** in the sidebar.
3. Click **Create Application**.
4. Choose **Create Worker** (or "Deploy from Git" if using CI/CD).
5. Set application values:
   - **Project Name:** (e.g., `apt-worker`)
   - **Build Command:** `pnpm build` (if needed)
   - **Deploy Command:** `pnpm run deploy` or Wrangler deploy command (see `apps/worker/package.json`)
   - **Build for non-production branches:** Yes/No (enable for preview deploys)
   - **Non-production branches deploy command:** (same as above, or custom)
   - **Path/Root Directory:** `apps/worker`
   - Configure environment variables and bindings as needed (see `wrangler.toml`).
   - Review and confirm settings, then deploy.

## Environment Variables & API Base URL

- The frontend (`apps/web`) uses the environment variable `VITE_API_BASE` to determine the API endpoint for health checks and all API calls.
- **Local development:**
  - Set `VITE_API_BASE=http://localhost:8787` in `apps/web/.env`.
- **Cloudflare Pages (preview/production):**
  - In the Cloudflare Pages dashboard, set `VITE_API_BASE` to your deployed Worker URL (e.g., `https://apt-starter-project.apt-account.workers.dev`).
  - **Important:** Do not include a trailing slash in the value. Use `https://apt-starter-project.apt-account.workers.dev` (not `...workers.dev/`).
  - This prevents double slashes in requests (e.g., `//api/v1/health` → 404).

## Best Practices

- Never commit secrets; use GitHub/Cloudflare secrets management.
- Keep workflow files up to date with folder structure.
- Reference only the correct subfolders for build and deploy steps.
- Always check your environment variable values for trailing slashes to avoid 404 errors.

For more details, see the workflow files in `.github/workflows/` and Cloudflare documentation.

## Web (Cloudflare Pages)

- **Preview Deployments:**
  - Every push to a non-main branch triggers a GitHub Actions workflow.
  - The workflow builds `apps/web` and deploys to a Cloudflare Pages preview environment.
  - Preview URLs are posted to the relevant GitHub pull request for review.

- **Production Deployments:**
  - Merging to the `main` branch triggers a production deployment via GitHub Actions.
  - The workflow builds and deploys `apps/web` to the production Cloudflare Pages site.

- **CI/CD:**
  - All builds and deploys are managed by GitHub Actions workflows (see `.github/workflows/`).
  - Linting, tests, and build checks run before deployment.

## Worker (Cloudflare Worker)

- **Preview Deployments:**
  - Every push to a non-main branch triggers a GitHub Actions workflow.
  - The workflow builds `apps/worker` and deploys to a Cloudflare Worker preview environment using Wrangler.
  - Preview endpoints are posted to the relevant GitHub pull request.

- **Production Deployments:**
  - Merging to the `main` branch triggers a production deployment via GitHub Actions.
  - The workflow builds and deploys `apps/worker` to the production Cloudflare Worker using Wrangler.

- **Secrets & Environment Variables:**
  - All secrets and environment variables are managed via Wrangler and Cloudflare dashboard.
  - Never commit secrets to the repository.

## API Routing

- Internal API: `/api/*` (UI-facing endpoints)
- Public API: `/v1/*` (versioned, public endpoints)

## Deployment Flow Summary

1. **Push to Feature/Preview Branch:**
   - GitHub Actions runs build, test, and deploys preview to Cloudflare (Pages and Worker).
   - Preview URLs are available for review and testing.
2. **Merge to Main:**
   - GitHub Actions runs build, test, and deploys to production (Pages and Worker).
   - Production URLs are updated.

For more details, see the workflow files in `.github/workflows/` and Cloudflare documentation.
