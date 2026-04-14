import { Hono } from "hono";
import { publicContentRoute } from "./publicContent";
import type { WorkerBindings } from "../workerTypes";

export const contentGatewayRoute = new Hono<{ Bindings: WorkerBindings }>()
  .route("/", publicContentRoute);

