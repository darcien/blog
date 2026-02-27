// @ts-check

import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import rehypeExternalLinks from "rehype-external-links";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://darcien.dev/",
  integrations: [mdx(), sitemap()],
  markdown: {
    rehypePlugins: [
      [rehypeExternalLinks, { target: "_blank", rel: ["noreferrer"] }],
    ],
  },
});
