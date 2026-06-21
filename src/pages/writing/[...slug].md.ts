import type { APIRoute, GetStaticPaths } from "astro";
import { type CollectionEntry, getCollection } from "astro:content";
import { renderEntryMarkdown } from "@lib/render-entry-markdown";

// Emit a raw-markdown twin (`/writing/<slug>.md`) for every non-draft post.
export const getStaticPaths: GetStaticPaths = async () => {
  const posts = (await getCollection("writing")).filter((post) => !post.data.draft);
  return posts.map((post) => ({ params: { slug: post.id }, props: { post } }));
};

export const GET: APIRoute = ({ props }) => {
  const post = props.post as CollectionEntry<"writing">;
  const md = renderEntryMarkdown({
    title: post.data.title,
    description: post.data.description,
    date: post.data.date,
    body: post.body,
  });
  return new Response(md, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
};
