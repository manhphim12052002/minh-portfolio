import type { APIRoute, GetStaticPaths } from "astro";
import { type CollectionEntry, getCollection } from "astro:content";
import { renderEntryMarkdown } from "@lib/render-entry-markdown";

export const getStaticPaths: GetStaticPaths = async () => {
  const reading = (await getCollection("reading")).filter((entry) => !entry.data.draft);
  return reading.map((entry) => ({ params: { slug: entry.id }, props: { entry } }));
};

export const GET: APIRoute = ({ props }) => {
  const entry = props.entry as CollectionEntry<"reading">;
  const meta = [
    entry.data.author ? `Author: ${entry.data.author}` : undefined,
    entry.data.sourceURL ? `Source: ${entry.data.sourceURL}` : undefined,
  ].filter(Boolean) as string[];
  const md = renderEntryMarkdown({
    title: entry.data.title,
    description: entry.data.description,
    date: entry.data.date,
    meta,
    body: entry.body,
  });
  return new Response(md, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
};
