#!/usr/bin/env bash

echo "Preparing VitePress source..."

# Filesystem
mkdir -p ./dist/vitepress-src

cp -r ./.vitepress/public ./dist/vitepress-src/public

mkdir -p ./dist/vitepress-src/reference

cp -r ./dist/typedoc/* ./dist/vitepress-src/reference

cp -r ./.vitepress/docs/* ./dist/vitepress-src
