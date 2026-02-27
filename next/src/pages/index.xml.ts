import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import type { APIContext } from "astro";
import { SITE_NAME, SITE_DESCRIPTION } from "../consts";

export async function GET(context: APIContext) {
  const posts = (
    await getCollection("posts", ({ data }) => {
      return data.draft !== true;
    })
  ).sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  return rss({
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    site: context.site!,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.summary ?? post.data.description ?? "",
      link: `/p/${post.id}/`,
    })),
  });
}
