import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

const abs = (path: string) => new URL(path, import.meta.env["SITE"]).href;

export const GET: APIRoute = async () => {
  const reading = (await getCollection("reading"))
    .filter((entry) => !entry.data.draft)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  const md = [
    "# Reading",
    "> Books, papers, and references I'm working through.",
    reading
      .map((entry) => `- [${entry.data.title}](${abs(`/reading/${entry.id}.md`)}): ${entry.data.description}`)
      .join("\n"),
  ].join("\n\n") + "\n";

  return new Response(md, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
};
