// @ts-check

import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeExternalLinks from "rehype-external-links";
import rehypeSlug from "rehype-slug";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://darcien.dev/",
  integrations: [mdx(), sitemap()],
  markdown: {
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: "wrap" }],
      [rehypeExternalLinks, { target: "_blank", rel: ["noreferrer"] }],
    ],
  },
});
