import type { APIRoute, GetStaticPaths } from "astro";
import { type CollectionEntry, getCollection } from "astro:content";
import { renderEntryMarkdown } from "@lib/render-entry-markdown";

// Emit a raw-markdown twin (`/projects/<slug>.md`) for every non-draft project.
export const getStaticPaths: GetStaticPaths = async () => {
  const projects = (await getCollection("projects")).filter((p) => !p.data.draft);
  return projects.map((project) => ({ params: { slug: project.id }, props: { project } }));
};

export const GET: APIRoute = ({ props }) => {
  const project = props.project as CollectionEntry<"projects">;
  const meta: string[] = [];
  if (project.data.demoURL) meta.push(`Demo: ${project.data.demoURL}`);
  if (project.data.repoURL) meta.push(`Repo: ${project.data.repoURL}`);

  const md = renderEntryMarkdown({
    title: project.data.title,
    description: project.data.description,
    date: project.data.date,
    meta,
    body: project.body,
  });
  return new Response(md, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
};
