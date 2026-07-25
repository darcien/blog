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

const ALERT_MARKER = /^\[!([a-zA-Z]+)\][ \t]*\r?\n?/;

// Accented for these kinds supported by GH,
// plain for everything else.
// https://github.com/orgs/community/discussions/16925
const ACCENTED_ALERTS = new Set(["important", "warning", "caution"]);

/**
 * Rewrite a `> [!WARNING]` blockquote to `<div class="alert accent">` with the
 * marker as a title line.
 */
const alerts = {
  name: "alerts",
  element: {
    filter: ["blockquote"],
    /** @param {import("hast").Element} node */
    visit(node) {
      const lead = node.children.find((child) => child.type === "element");
      if (lead?.tagName !== "p") return;
      const text = lead.children[0];
      if (text?.type !== "text") return;
      const match = text.value.match(ALERT_MARKER);
      if (!match) return;

      const kind = match[1].toLowerCase();
      const rest = text.value.slice(match[0].length);
      // Strip the marker, omit the paragraph when nothing follows it
      /** @type {import("hast").ElementContent[]} */
      const body =
        rest || lead.children.length > 1
          ? [
              {
                ...lead,
                children: [
                  { type: "text", value: rest },
                  ...lead.children.slice(1),
                ],
              },
            ]
          : [];

      return {
        type: "element",
        tagName: "div",
        properties: {
          class: ACCENTED_ALERTS.has(kind) ? "alert accent" : "alert",
        },
        children: [
          {
            type: "element",
            tagName: "p",
            properties: {},
            // Format the marker so it reads nicer in DOM
            children: [
              { type: "text", value: kind[0].toUpperCase() + kind.slice(1) },
            ],
          },
          ...node.children.flatMap((child) =>
            child === lead ? body : [child],
          ),
        ],
      };
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
      hastPlugins: [autolinkHeadings, externalLinks, alerts],
    }),
  },
});
