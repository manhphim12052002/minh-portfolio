import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

const abs = (path: string) => new URL(path, import.meta.env["SITE"]).href;

export const GET: APIRoute = async () => {
  const notes = (await getCollection("notes"))
    .filter((note) => !note.data.draft)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  const md = [
    "# Notes",
    "> Short notes from what I'm learning in public.",
    notes
      .map((note) => `- [${note.data.title}](${abs(`/notes/${note.id}.md`)}): ${note.data.description}`)
      .join("\n"),
  ].join("\n\n") + "\n";

  return new Response(md, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
};
