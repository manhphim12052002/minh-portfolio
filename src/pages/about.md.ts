import type { APIRoute } from "astro";

// Markdown twin of the About page (`/about.md`) — served for `/about` under
// `Accept: text/markdown` by Phase 4. Hand-authored to mirror about/index.astro.
const md = `# Hi, I'm Minh.

> A few words about who I am and what I'm thinking about.

I spend my days building software at TomTom, my evenings co-founding
[LECOLE](https://lecole.com), and the spaces in between trying to design tools
that respect the people who use them.

This site is where I think out loud — about software, learning, and the strange
business of making digital things feel calmer.
`;

export const GET: APIRoute = () => {
  return new Response(md, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
};
