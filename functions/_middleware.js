/**
 * Markdown-for-Agents content negotiation (Cloudflare Pages Function).
 *
 * Runs in front of every static asset. When a request sends
 * `Accept: text/markdown`, serve the pre-built `.md` twin (Phase 2) at the same
 * URL; otherwise fall through to the normal HTML asset.
 *
 * Fail-open by design: any miss or error calls `context.next()` so a bug here
 * can never take the site down.
 *
 * Path mapping: `/` -> `/index.md`; `/p` and `/p/` -> `/p.md`.
 */
export async function onRequest(context) {
  try {
    const { request, env } = context;

    if (request.method !== "GET" && request.method !== "HEAD") {
      return context.next();
    }

    const accept = request.headers.get("Accept") || "";
    if (!accept.includes("text/markdown")) {
      return context.next();
    }

    const url = new URL(request.url);
    let pathname = url.pathname;

    // Already a markdown twin (or another explicit file) — don't double-map.
    if (pathname.endsWith(".md")) {
      return context.next();
    }

    let mdPath;
    if (pathname === "/") {
      mdPath = "/index.md";
    } else {
      pathname = pathname.replace(/\/+$/, ""); // strip trailing slash(es)
      mdPath = `${pathname}.md`;
    }

    const twin = await env.ASSETS.fetch(new Request(new URL(mdPath, url.origin), request));
    if (!twin.ok) {
      return context.next();
    }

    // Preserve the asset's caching headers (ETag, Cache-Control, Last-Modified)
    // and status, but serve as markdown and mark the response as varying by
    // Accept. Drop Content-Encoding/Length so a re-framed body can't mismatch.
    const headers = new Headers(twin.headers);
    headers.set("Content-Type", "text/markdown; charset=utf-8");
    headers.set("Vary", "Accept");
    headers.delete("Content-Encoding");
    headers.delete("Content-Length");

    return new Response(twin.body, {
      status: twin.status,
      statusText: twin.statusText,
      headers,
    });
  } catch {
    return context.next();
  }
}
