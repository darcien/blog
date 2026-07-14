// @ts-check

import { satteri } from "@astrojs/markdown-satteri";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";
import GithubSlugger from "github-slugger";

/**
 * Wrap heading content in a self-link, replacing
 * rehype-slug + rehype-autolink-headings ({ behavior: "wrap" }).
 * Sets the id here so Astro's built-in heading-ids plugin (which runs after
 * user plugins and respects existing ids) reports the same slug in getHeadings().
 */
const autolinkHeadings = {
  name: "autolink-headings",
  element: {
    filter: ["h1", "h2", "h3", "h4", "h5", "h6"],
    /**
     * @param {import("hast").Element} node
     * @param {any} ctx
     */
    visit(node, ctx) {
      // ctx.data is a fresh per-document bag; slugger must not leak across pages
      const slugger = (ctx.data.slugger ??= new GithubSlugger());
      // keep existing ids (e.g. footnote label h2), like rehype-slug
      const existingId = node.properties?.id;
      const slug =
        typeof existingId === "string"
          ? existingId
          : slugger.slug(ctx.textContent(node));
      return {
        ...node,
        properties: { ...node.properties, id: slug },
        children: [
          {
            type: "element",
            tagName: "a",
            properties: { href: `#${slug}` },
            children: [...node.children],
          },
        ],
      };
    },
  },
};

/** Add rel to external links, replacing rehype-external-links. */
const externalLinks = {
  name: "external-links",
  element: {
    filter: ["a"],
    /**
     * @param {import("hast").Element} node
     * @param {any} ctx
     */
    visit(node, ctx) {
      const href = node.properties?.href;
      if (typeof href === "string" && /^https?:\/\//.test(href)) {
        ctx.setProperty(node, "rel", "noreferrer external");
      }
    },
  },
};

// https://astro.build/config
export default defineConfig({
  site: "https://darcien.me/",
  trailingSlash: "never",
  redirects: { "/coffee": "/garden/coffee" },
  integrations: [mdx(), sitemap()],
  markdown: {
    processor: satteri({
      hastPlugins: [autolinkHeadings, externalLinks],
    }),
  },
});
