import type { APIRoute, GetStaticPaths } from "astro";
import { type CollectionEntry, getCollection } from "astro:content";
import { renderEntryMarkdown } from "@lib/render-entry-markdown";

export const getStaticPaths: GetStaticPaths = async () => {
  const notes = (await getCollection("notes")).filter((note) => !note.data.draft);
  return notes.map((note) => ({ params: { slug: note.id }, props: { note } }));
};

export const GET: APIRoute = ({ props }) => {
  const note = props.note as CollectionEntry<"notes">;
  const md = renderEntryMarkdown({
    title: note.data.title,
    description: note.data.description,
    date: note.data.date,
    meta: note.data.tags?.map((tag) => `Tag: ${tag}`),
    body: note.body,
  });
  return new Response(md, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
};
