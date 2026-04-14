import { Hono } from "hono";
import { chatRoute } from "./chat";
import { feedbackRoute } from "./feedback";
import { ingestRoute } from "./ingest";
import { queryRoute } from "./query";
import { reportRoute } from "./report";
import type { WorkerBindings } from "../workerTypes";

export const assistantRuntimeRoute = new Hono<{ Bindings: WorkerBindings }>()
  .route("/", chatRoute)
  .route("/", queryRoute)
  .route("/", feedbackRoute)
  .route("/", reportRoute)
  .route("/", ingestRoute);

