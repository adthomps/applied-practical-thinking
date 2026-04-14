import "dotenv/config";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { embed, upsertToVectorDb } from "./vectorClient";
import { splitMarkdown } from "./splitMarkdown";
import type { WorkerBindings } from "../workerTypes";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DOCS_DIR = path.join(__dirname, "docs");

export async function indexDocs(env?: Partial<WorkerBindings>) {
  const files = fs.readdirSync(DOCS_DIR).filter((filename) => filename.endsWith(".md"));

  for (const file of files) {
    const filePath = path.join(DOCS_DIR, file);
    const content = fs.readFileSync(filePath, "utf8");
    const chunks = splitMarkdown(content);

    for (const chunk of chunks) {
      const embedding = await embed(chunk.text, env);
      await upsertToVectorDb(
        {
          id: chunk.id,
          embedding,
          metadata: { path: file, heading: chunk.heading },
        },
        env
      );
    }
  }
}

if (import.meta.url === new URL(process.argv[1], "file:").href) {
  if (!process.env.OPENAI_API_KEY) {
    console.error("Set OPENAI_API_KEY in your environment.");
    process.exit(1);
  }

  void indexDocs()
    .then(() => {
      console.log("Docs indexed.");
    })
    .catch((error: unknown) => {
      console.error("Failed to index docs:", error);
      process.exit(1);
    });
}

