import type { APIRoute } from "astro";

// Content usage preferences for AI — https://contentsignals.org/
// Policy: allow search indexing + AI citation (ai-input), block AI training.
// The Content-Signal directive applies to the preceding User-agent group.
const robotsTxt = `
User-agent: *
Allow: /
Content-Signal: search=yes, ai-input=yes, ai-train=no

Sitemap: ${new URL("sitemap-index.xml", import.meta.env.SITE).href}
`.trim();

export const GET: APIRoute = () => {
  return new Response(robotsTxt, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};