import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { renderEntryMarkdown } from "@lib/render-entry-markdown";

export const GET: APIRoute = async () => {
  const entries = (await getCollection("now"))
    .filter((entry) => !entry.data.draft)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
  const latest = entries[0];
  const md = latest
    ? renderEntryMarkdown({
        title: latest.data.title,
        description: latest.data.description,
        date: latest.data.date,
        body: latest.body,
      })
    : "# Now\n\nNo current update yet.\n";

  return new Response(md, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
};
