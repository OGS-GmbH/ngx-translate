mkdir ./dist/typedoc/reference
mv ./dist/typedoc/* ./dist/typedoc/reference
mv ./dist/typedoc/index.md ./dist/typedoc/reference/index.md

cp -r ./.vitepress/docs/* ./dist/typedoc
cp CODE_OF_CONDUCT.md ./dist/typedoc/other/code-of-conduct.md
