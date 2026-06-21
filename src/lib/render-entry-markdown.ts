/**
 * Assemble a clean, token-cheap markdown document for an agent-facing ".md twin".
 *
 * Shared by the per-collection twin routes (writing/projects/work) so the
 * title-block + body layout stays consistent (DRY). Output is plain markdown:
 * an H1 title, an optional blockquote description, an optional date line,
 * optional metadata lines (e.g. demo/repo links), then the raw entry body.
 */
export interface MarkdownTwinOptions {
  title: string;
  description?: string;
  date?: Date;
  /** Extra metadata lines rendered above the body, e.g. "Demo: https://…". */
  meta?: string[];
  /** Raw markdown/MDX source (Astro collection entry `body`). */
  body?: string;
}

function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function renderEntryMarkdown(opts: MarkdownTwinOptions): string {
  const blocks: string[] = [`# ${opts.title}`];

  if (opts.description) {
    blocks.push(`> ${opts.description}`);
  }

  const metaLines: string[] = [];
  if (opts.date) {
    metaLines.push(`Date: ${isoDate(opts.date)}`);
  }
  if (opts.meta?.length) {
    metaLines.push(...opts.meta);
  }
  if (metaLines.length) {
    blocks.push(metaLines.join("\n"));
  }

  const body = (opts.body ?? "").trim();
  if (body) {
    blocks.push(body);
  }

  // Blank line between blocks; trailing newline for clean file output.
  return blocks.join("\n\n") + "\n";
}
