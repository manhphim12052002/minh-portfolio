import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { SITE, HOME } from "@consts";
import { dateRange } from "@lib/utils";

// `/llms.txt` — the de-facto agent entrypoint (https://llmstxt.org/).
// Markdown index linking to the per-entry `.md` twins (Phase 2). Served as
// text/plain per the spec convention, though the content is markdown.
// Links derive from the same collection data as the twins so they stay in sync.
const abs = (path: string) => new URL(path, import.meta.env.SITE).href;

export const GET: APIRoute = async () => {
  const writing = (await getCollection("writing"))
    .filter((p) => !p.data.draft)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  const notes = (await getCollection("notes"))
    .filter((p) => !p.data.draft)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  const reading = (await getCollection("reading"))
    .filter((p) => !p.data.draft)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  const now = (await getCollection("now"))
    .filter((p) => !p.data.draft)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  const projects = (await getCollection("projects"))
    .filter((p) => !p.data.draft)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  const work = (await getCollection("work")).sort(
    (a, b) => b.data.dateStart.valueOf() - a.data.dateStart.valueOf(),
  );

  const blocks: string[] = [
    `# ${SITE.NAME}`,
    `> ${HOME.DESCRIPTION}`,
    `## Writing\n` +
      writing
        .map((p) => `- [${p.data.title}](${abs(`/writing/${p.id}.md`)}): ${p.data.description}`)
        .join("\n"),
    `## Notes\n- [Notes index](${abs("/notes.md")}): Short notes from what I'm learning in public.\n` +
      notes
        .map((p) => `- [${p.data.title}](${abs(`/notes/${p.id}.md`)}): ${p.data.description}`)
        .join("\n"),
    `## Reading\n- [Reading index](${abs("/reading.md")}): Books, papers, and references I'm working through.\n` +
      reading
        .map((p) => `- [${p.data.title}](${abs(`/reading/${p.id}.md`)}): ${p.data.description}`)
        .join("\n"),
    `## Now\n` +
      (now[0]
        ? `- [${now[0].data.title}](${abs("/now.md")}): ${now[0].data.description}`
        : `- [Now](${abs("/now.md")}): Current focus.`),
    `## Work\n` +
      work
        .map(
          (w) =>
            `- [${w.data.company} — ${w.data.role}](${abs(`/work/${w.id}.md`)}): ` +
            dateRange(w.data.dateStart, w.data.dateEnd),
        )
        .join("\n"),
    `## About\n- [About](${abs("/about.md")}): A few words about who I am.`,
  ];

  if (projects.length) {
    blocks.splice(
      -2,
      0,
      `## Projects\n` +
        projects
          .map((p) => `- [${p.data.title}](${abs(`/projects/${p.id}.md`)}): ${p.data.description}`)
          .join("\n"),
    );
  }

  return new Response(blocks.join("\n\n") + "\n", {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
