import js from "@eslint/js";
import tseslint from "typescript-eslint";
import astro from "eslint-plugin-astro";
import globals from "globals";

export default [
  {
    ignores: [
      ".vscode/",
      "dist/",
      "node_modules/",
      "public/",
      ".astro/",
      ".wrangler/",
      ".claude/",
      "personal-design-system/",
      "plans/",
      "**/*.config.mjs",
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...astro.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      semi: ["error", "always"],
      quotes: ["error", "double", { allowTemplateLiterals: true }],
      "@typescript-eslint/triple-slash-reference": "off",
    },
  },
];
