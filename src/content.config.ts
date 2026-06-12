import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const posts = defineCollection({
  loader: glob({ base: "./src/content/posts", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).optional(),
    draft: z.boolean().optional(),
    summary: z.string().optional(),
    description: z.string().optional(),
    show_toc: z.boolean().optional(),
    search_hidden: z.boolean().optional(),
    hide_footer: z.boolean().optional(),
    canonical_url: z.string().optional(),
    cover: z
      .object({
        image: z.string().optional(),
        alt: z.string().optional(),
      })
      .optional(),
  }),
});

const garden = defineCollection({
  loader: glob({ base: "./src/content/garden", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string(),
    created: z.coerce.date(),
    updated: z.coerce.date().optional(),
    show_toc: z.boolean().optional(),
    description: z.string().optional(),
  }),
});

export const collections = { posts, garden };
