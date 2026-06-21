import type { APIRoute, GetStaticPaths } from "astro";
import { type CollectionEntry, getCollection } from "astro:content";
import { renderEntryMarkdown } from "@lib/render-entry-markdown";
import { dateRange } from "@lib/utils";

// Emit a raw-markdown twin (`/work/<slug>.md`) for every work entry.
// Work has no detail HTML page, but the twin is still useful for agents.
export const getStaticPaths: GetStaticPaths = async () => {
  const work = await getCollection("work");
  return work.map((entry) => ({ params: { slug: entry.id }, props: { entry } }));
};

export const GET: APIRoute = ({ props }) => {
  const entry = props.entry as CollectionEntry<"work">;
  const md = renderEntryMarkdown({
    title: `${entry.data.company} — ${entry.data.role}`,
    meta: [`Period: ${dateRange(entry.data.dateStart, entry.data.dateEnd)}`],
    body: entry.body,
  });
  return new Response(md, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
};
