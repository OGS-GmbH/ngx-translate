import {
  ESLINT_JSON_RULES,
  ESLINT_MARKDOWN_RULES,
  JS_RULES_PRESET,
  TS_RULES_PRESET
} from "@ogs-gmbh/linter";
import eslintJson from "@eslint/json";
import eslintMarkdown from "@eslint/markdown";
import globals from "globals";
import stylisticJs from "@stylistic/eslint-plugin-js";
import stylisticPlus from "@stylistic/eslint-plugin-plus";
import stylisticTs from "@stylistic/eslint-plugin-ts";
import tseslint from "typescript-eslint";
import unicorn from "eslint-plugin-unicorn";

export default tseslint.config(
  {
    plugins: {
      "@tseslint": tseslint.plugin,
      "@unicorn": unicorn,
      "@stylistic/js": stylisticJs,
      "@stylistic/ts": stylisticTs,
      "@stylistic/plus": stylisticPlus,
      "@markdown": eslintMarkdown,
      "@json": eslintJson
    }
  },
  {
    ignores: [
      ".angular",
      ".git",
      ".husky",
      ".idea",
      "node_modules",
      "dist"
    ]
  },
  {
    files: [ "**/*.ts" ],
    languageOptions: {
      parser: tseslint.parser,
      globals: globals.browser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname
      }
    },
    rules: TS_RULES_PRESET
  },
  {
    files: [ "**/*.js", "**/*.mjs", "**/*.cjs" ],
    rules: JS_RULES_PRESET
  },
  {
    files: [ "**/*.md" ],
    rules: ESLINT_MARKDOWN_RULES
  },
  {
    files: [ "**/*.json" ],
    language: "@json/json",
    rules: ESLINT_JSON_RULES
  },
  {
    files: [ "**/*.json5" ],
    language: "@json/json5",
    rules: ESLINT_JSON_RULES
  },
  {
    files: [ "**/*.jsonc" ],
    language: "@json/jsonc",
    rules: ESLINT_JSON_RULES
  }
);

