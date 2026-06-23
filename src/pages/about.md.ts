import type { APIRoute } from "astro";

// Markdown twin of the About page (`/about.md`) — served for `/about` under
// `Accept: text/markdown` by Phase 4. Hand-authored to mirror about/index.astro.
const md = `# Hi, I'm Minh.

> A few words about who I am and what I'm thinking about.

Engineer at TomTom in Amsterdam. Writing about distributed systems, what I'm
learning along the way, and the life around the work.

This site is my public workbench: long-form essays when an idea has settled,
short notes while I am still figuring it out, reading logs for the technical
backbone, and occasional life texture from Amsterdam.

The thread through it all is technical growth: how backend systems scale, how
engineering judgment forms, and what remains human around the work.
`;

export const GET: APIRoute = () => {
  return new Response(md, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
};
