# Deployment

This project uses GitHub Actions as the current build authority for the web frontend and Cloudflare for hosting/deployment. The frontend build and the worker runtime do not read configuration from the same place, so the deployment contract must stay explicit.

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
    - `pages.yml` for Cloudflare Pages
    - `worker.yml` or `deploy-worker.yml` for Cloudflare Worker

- **Current Source of Truth:**
  - `pages.yml` is the active builder for `apps/web`
  - `worker.yml`/Wrangler is the active deployer for `apps/worker`
  - Cloudflare Pages hosts the built assets, but the GitHub Actions workflow is what provides `VITE_API_BASE` during `vite build`

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

8. If GitHub Actions is the active Pages builder for this project:
   - treat the Cloudflare Pages dashboard as the hosting target, not the authoritative frontend build environment
   - do not rely on Pages dashboard build vars alone for `VITE_API_BASE`
   - set `VITE_API_BASE` in `.github/workflows/pages.yml` or GitHub Actions environment variables

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

## Configuration Contract

- The frontend (`apps/web`) uses the build-time variable `VITE_API_BASE` to determine the Worker API origin for all public content/doc requests.
- The worker (`apps/worker`) uses the runtime variable `PUBLIC_SITE_ORIGIN` to fetch the Pages-hosted public content and design-doc assets it normalizes into API responses.
- **Local development:**
  - Set `VITE_API_BASE=http://localhost:8787` in `apps/web/.env`.
  - Set `PUBLIC_SITE_ORIGIN=http://127.0.0.1:5173` in `apps/worker/.dev.vars`.
- **GitHub Actions Pages build (current production path):**
  - Set `VITE_API_BASE` in `.github/workflows/pages.yml` or GitHub Actions environment variables.
  - Production value for this project: `https://applied-practical-thinking.apt-account.workers.dev`
  - `VITE_API_BASE` must exist in the environment that runs `vite build`.
- **Cloudflare Pages dashboard vars:**
  - Useful only if Cloudflare Pages itself is running the build.
  - They are not sufficient when GitHub Actions builds and publishes the frontend bundle.
- **Cloudflare Worker (preview/production):**
  - In Wrangler or the Cloudflare Worker dashboard, set `PUBLIC_SITE_ORIGIN` to the corresponding Pages site origin for that environment.
  - Production value for this project: `https://applied-practical-thinking.pages.dev`
  - Preview worker deployments should point at the matching Pages preview URL.
  - Production worker deployments should point at the production Pages site URL.

## Production Checklist

- **Pages project:** `applied-practical-thinking`
- **Worker project:** `applied-practical-thinking-worker`
- **Frontend build variable:** `VITE_API_BASE=https://applied-practical-thinking.apt-account.workers.dev`
- **Build owner:** GitHub Actions `pages.yml`
- **Worker variable:** `PUBLIC_SITE_ORIGIN=https://applied-practical-thinking.pages.dev`
- **Redeploy order:** deploy Worker first, then redeploy Pages

## Verification Checklist

- Open `https://applied-practical-thinking.pages.dev/learn` and confirm content loads.
- Open `https://applied-practical-thinking.pages.dev/experiments` and confirm content loads.
- Open any Design page and confirm the “View Full …” action opens the worker-backed doc.
- Confirm the token download still works from `https://applied-practical-thinking.pages.dev/docs/design/APT-FIGMA-TOKENS.json`.
- Confirm the live site reflects the latest GitHub Actions Pages workflow run for the current commit.

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

- Worker API: `{VITE_API_BASE}/api/*` (UI-facing endpoints served by the standalone Worker)
- Public API: `/v1/*` (versioned, public endpoints)

## Deployment Flow Summary

1. **Push to Feature/Preview Branch:**
   - GitHub Actions runs build, test, and deploys preview to Cloudflare (Pages and Worker).
   - Preview URLs are available for review and testing.
2. **Merge to Main:**
   - GitHub Actions runs build, test, and deploys to production (Pages and Worker).
   - Production URLs are updated.

For more details, see the workflow files in `.github/workflows/` and Cloudflare documentation.
