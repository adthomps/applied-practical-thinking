import { Hono } from "hono";
import type { MiddlewareHandler } from "hono";
import { chatRoute } from "./chat";
import { feedbackRoute } from "./feedback";
import { ingestRoute } from "./ingest";
import { queryRoute } from "./query";
import { reportRoute } from "./report";
import type { WorkerBindings } from "../workerTypes";

// The public assistant endpoints call paid embedding APIs and have no rate
// limiting yet, so they stay off unless APT_ASSISTANT_ENABLED is "true".
// Add rate limiting (or Turnstile) before enabling them in production.
export const requireAssistantEnabled: MiddlewareHandler<{ Bindings: WorkerBindings }> = async (c, next) => {
  if (c.env.APT_ASSISTANT_ENABLED !== "true") {
    return c.json({ error: "Assistant is not available yet." }, 503);
  }
  await next();
};

export const assistantRuntimeRoute = new Hono<{ Bindings: WorkerBindings }>()
  .use("/api/chat", requireAssistantEnabled)
  .use("/api/query", requireAssistantEnabled)
  .use("/api/feedback", requireAssistantEnabled)
  .use("/api/report", requireAssistantEnabled)
  .route("/", chatRoute)
  .route("/", queryRoute)
  .route("/", feedbackRoute)
  .route("/", reportRoute)
  .route("/", ingestRoute);
