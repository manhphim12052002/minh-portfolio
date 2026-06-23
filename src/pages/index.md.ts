import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { SITE, HOME } from "@consts";
import { dateRange } from "@lib/utils";

// Markdown twin of the homepage (`/index.md`) — what Phase 4 serves for `/`
// under `Accept: text/markdown`. Mirrors the homepage's recent-items slices and
// links to the per-entry `.md` twins (agents prefer markdown targets).
const abs = (path: string) => new URL(path, import.meta.env.SITE).href;

export const GET: APIRoute = async () => {
  const writing = (await getCollection("writing"))
    .filter((p) => !p.data.draft)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
    .slice(0, SITE.NUM_POSTS_ON_HOMEPAGE);

  const notes = (await getCollection("notes"))
    .filter((p) => !p.data.draft)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
    .slice(0, SITE.NUM_NOTES_ON_HOMEPAGE);

  const reading = (await getCollection("reading"))
    .filter((p) => !p.data.draft)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
    .slice(0, 1);

  const now = (await getCollection("now"))
    .filter((p) => !p.data.draft)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
    .slice(0, 1);

  const projects = (await getCollection("projects"))
    .filter((p) => !p.data.draft)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
    .slice(0, SITE.NUM_PROJECTS_ON_HOMEPAGE);

  const work = (await getCollection("work"))
    .sort((a, b) => b.data.dateStart.valueOf() - a.data.dateStart.valueOf())
    .slice(0, SITE.NUM_WORKS_ON_HOMEPAGE);

  const sections: string[] = [
    `# ${SITE.NAME}`,
    `> ${HOME.DESCRIPTION}`,
    "Engineer at TomTom in Amsterdam. Writing about distributed systems, " +
      "what I'm learning along the way, and the life around the work.",
  ];

  sections.push(
    "## Recent writing\n" +
      writing
        .map((p) => `- [${p.data.title}](${abs(`/writing/${p.id}.md`)}): ${p.data.description}`)
        .join("\n"),
  );

  sections.push(
    "## Recent notes\n" +
      notes
        .map((p) => `- [${p.data.title}](${abs(`/notes/${p.id}.md`)}): ${p.data.description}`)
        .join("\n"),
  );

  sections.push(
    "## Now\n" +
      (now[0]
        ? `- [${now[0].data.title}](${abs("/now.md")}): ${now[0].data.description}`
        : "- No current update yet."),
  );

  sections.push(
    "## Reading\n" +
      reading
        .map((p) => `- [${p.data.title}](${abs(`/reading/${p.id}.md`)}): ${p.data.description}`)
        .join("\n"),
  );

  sections.push(
    "## Work\n" +
      work
        .map(
          (w) =>
            `- [${w.data.company} — ${w.data.role}](${abs(`/work/${w.id}.md`)}): ` +
            dateRange(w.data.dateStart, w.data.dateEnd),
        )
        .join("\n"),
  );

  sections.push(
    projects.length
      ? "## Projects\n" +
          projects
            .map((p) => `- [${p.data.title}](${abs(`/projects/${p.id}.md`)}): ${p.data.description}`)
            .join("\n")
      : "## Projects\nPublic side projects will show up here when they have something real to say.",
  );

  sections.push(`See also: [llms.txt](${abs("/llms.txt")}) · [About](${abs("/about.md")})`);

  return new Response(sections.join("\n\n") + "\n", {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
};
