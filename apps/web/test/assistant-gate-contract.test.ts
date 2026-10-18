import { describe, expect, it } from "vitest";
import { assistantRuntimeRoute } from "../../worker/src/routes/assistantRuntime";

const gatedEndpoints = ["/api/chat", "/api/query", "/api/feedback", "/api/report"];

function post(path: string, env: Record<string, string>) {
  return assistantRuntimeRoute.request(
    path,
    { method: "POST", headers: { "content-type": "application/json" }, body: "{}" },
    env,
  );
}

describe("worker assistant endpoint gate", () => {
  it.each(gatedEndpoints)("returns 503 for %s when the assistant is disabled", async (path) => {
    const res = await post(path, {});
    expect(res.status).toBe(503);
  });

  it.each(gatedEndpoints)("lets %s reach validation when APT_ASSISTANT_ENABLED is true", async (path) => {
    const res = await post(path, { APT_ASSISTANT_ENABLED: "true" });
    expect(res.status).toBe(400);
  });
});
