export default {
  "*.{ts,js,mjs,cjs}": "eslint",
  "package.json": "npmPkgJsonLint -c ./node_modules/@ogs/linter/package-json.rules.json"
};

