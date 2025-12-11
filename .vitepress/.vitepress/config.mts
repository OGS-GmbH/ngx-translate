import { groupIconMdPlugin, groupIconVitePlugin } from "vitepress-plugin-group-icons"
import { withMermaid } from "vitepress-plugin-mermaid";

// https://vitepress.dev/reference/site-config
export default withMermaid({
  title: "Translation lib",
  description: "A lightweight, REST-based Angular i18n library designed for seamless internationalization with minimal setup. It supports dynamic language switching & flexible translation management via RESTful APIs.",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: "https://raw.githubusercontent.com/OGS-GmbH/.github/refs/heads/main/docs/logo-white.svg",
    nav: [
      { text: "Guide", link: "/guide" },
      { text: "Reference", link: "/reference" },
      { text: "GitHub", link: "https://github.com/OGS-GmbH/ngx-translate" }
    ],
    socialLinks: [
      { icon: "github", link: "https://github.com/OGS-GmbH" },
      { icon: "facebook", link: "https://www.facebook.com/OGS.GmbH" },
      { icon: { svg: '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 382 382" xml:space="preserve"><path d="M347.445,0H34.555C15.471,0,0,15.471,0,34.555v312.889C0,366.529,15.471,382,34.555,382h312.889  C366.529,382,382,366.529,382,347.444V34.555C382,15.471,366.529,0,347.445,0z M118.207,329.844c0,5.554-4.502,10.056-10.056,10.056  H65.345c-5.554,0-10.056-4.502-10.056-10.056V150.403c0-5.554,4.502-10.056,10.056-10.056h42.806  c5.554,0,10.056,4.502,10.056,10.056V329.844z M86.748,123.432c-22.459,0-40.666-18.207-40.666-40.666S64.289,42.1,86.748,42.1  s40.666,18.207,40.666,40.666S109.208,123.432,86.748,123.432z M341.91,330.654c0,5.106-4.14,9.246-9.246,9.246H286.73  c-5.106,0-9.246-4.14-9.246-9.246v-84.168c0-12.556,3.683-55.021-32.813-55.021c-28.309,0-34.051,29.066-35.204,42.11v97.079  c0,5.106-4.139,9.246-9.246,9.246h-44.426c-5.106,0-9.246-4.14-9.246-9.246V149.593c0-5.106,4.14-9.246,9.246-9.246h44.426  c5.106,0,9.246,4.14,9.246,9.246v15.655c10.497-15.753,26.097-27.912,59.312-27.912c73.552,0,73.131,68.716,73.131,106.472  L341.91,330.654L341.91,330.654z"/></svg>' }, link: "https://www.linkedin.com/company/41198063/" },
      { icon: "xing", link: "https://www.xing.com/pages/ogsgmbh" },
      { icon: { svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M480.27-80q-82.74 0-155.5-31.5Q252-143 197.5-197.5t-86-127.34Q80-397.68 80-480.5t31.5-155.66Q143-709 197.5-763t127.34-85.5Q397.68-880 480.5-880t155.66 31.5Q709-817 763-763t85.5 127Q880-563 880-480.27q0 82.74-31.5 155.5Q817-252 763-197.68q-54 54.31-127 86Q563-80 480.27-80Zm-.27-60q142.38 0 241.19-99.5T820-480v-13q-6 26-27.41 43.5Q771.19-432 742-432h-80q-33 0-56.5-23.5T582-512v-40H422v-80q0-33 23.5-56.5T502-712h40v-22q0-16 13.5-40t30.5-29q-25-8-51.36-12.5Q508.29-820 480-820q-141 0-240.5 98.81T140-480h150q66 0 113 47t47 113v40H330v105q34 17 71.7 26t78.3 9Z"/></svg>' }, link: "https://www.ogs.de/en/" },
      { icon: { svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M140-160q-24 0-42-18t-18-42v-520q0-24 18-42t42-18h680q24 0 42 18t18 42v520q0 24-18 42t-42 18H140Zm340-302L140-685v465h680v-465L480-462Zm0-60 336-218H145l335 218ZM140-685v-55 520-465Z"/></svg>' }, link: "mailto:info@ogs.de" }
    ],
    sidebar: [
      {
        text: "Guide",
        items: [
          { text: "Getting started", link: "/guide/" },
          { text: "Define a token", link: "/guide/define-a-token" },
          { text: "Define a scope", link: "/guide/define-a-scope" },
          { text: "Preloading scopes", link: "/guide/preloading-scopes" },
          { text: "Translate by service", link: "/guide/translate-by-service" }
        ]
      },
      {
        text: "Reference",
        items: [
          { text: "Overview", link: "/reference/" }
        ]
      },
      {
        text: "Other",
        items: [
          { text: "Contributing", link: "/other/contributing" },
          { text: "Code of Conduct", link: "/other/code-of-conduct" }
        ]
      },
      {
        text: "Legal",
        items: [
          { text: "MIT License", link: "/legal/license" },
          { text: "Copyright © 2025 — present OGS GmbH", link: "https://www.ogs.de/en/" }
        ]
      }
    ]
  },
  head: [
    [ "link", { rel: "icon", href: "https://www.ogs.de/favicon.ico" } ]
  ],
  base: "/ngx-translate/",
  srcDir: "../dist/typedoc",
  outDir: "../dist/docs",
  titleTemplate: ":title - OGS ngx-translate",
  cleanUrls: true,
  appearance: "dark",
  markdown: {
    config(md) {
      md.use(groupIconMdPlugin, )
    }
  },
  vite: {
    plugins: [
      groupIconVitePlugin()
    ]
  }
})
