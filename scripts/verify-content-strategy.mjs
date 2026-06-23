import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const read = (path) => readFileSync(join(root, path), "utf8");
const exists = (path) => existsSync(join(root, path));
const normalize = (text) => text.replace(/\s+/g, " ").trim();
const removedProjectSlug = ["le", "cole"].join("");
const removedProjectName = removedProjectSlug.toUpperCase();

const checks = [
  {
    name: "removed work entry is omitted",
    pass: () => !exists(`src/content/work/${removedProjectSlug}.md`),
  },
  {
    name: "removed project entry is omitted",
    pass: () => !exists(`src/content/projects/${removedProjectSlug}/index.md`),
  },
  {
    name: "new content collections are registered",
    pass: () => {
      const config = read("src/content.config.ts");
      return ["notes", "reading", "now"].every((collection) =>
        config.includes(collection),
      );
    },
  },
  {
    name: "new IA routes exist",
    pass: () =>
      [
        "src/pages/notes/index.astro",
        "src/pages/reading/index.astro",
        "src/pages/now/index.astro",
      ].every(exists),
  },
  {
    name: "agent-facing markdown twins exist for new routes",
    pass: () =>
      [
        "src/pages/notes.md.ts",
        "src/pages/notes/[...slug].md.ts",
        "src/pages/reading.md.ts",
        "src/pages/reading/[...slug].md.ts",
        "src/pages/now.md.ts",
      ].every(exists),
  },
  {
    name: "public bio reflects the locked positioning",
    pass: () => {
      const expected =
        "Engineer at TomTom in Amsterdam. Writing about distributed systems, what I'm learning along the way, and the life around the work.";
      return ["src/pages/index.astro", "src/pages/about/index.astro", "src/pages/about.md.ts"].every((path) =>
        normalize(read(path)).includes(expected),
      );
    },
  },
  {
    name: "removed project is not mentioned in public source surfaces",
    pass: () =>
      [
        "src/pages/index.astro",
        "src/pages/index.md.ts",
        "src/pages/about/index.astro",
        "src/pages/about.md.ts",
        "src/pages/llms.txt.ts",
      ].every((path) => !read(path).includes(removedProjectName)),
  },
];

const failures = checks.filter((check) => !check.pass());

if (failures.length) {
  console.error("Content strategy verification failed:");
  for (const failure of failures) {
    console.error(`- ${failure.name}`);
  }
  process.exit(1);
}

console.log(`Content strategy verification passed (${checks.length} checks).`);
