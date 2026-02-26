import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
	const posts = (await getCollection('posts', ({ data }) => {
		return data.draft !== true;
	})).sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

	return rss({
		title: 'A blog by Yosua Ian Sebastian',
		description: 'Personal blog by Yosua Ian Sebastian.',
		site: context.site!,
		items: posts.map((post) => ({
			title: post.data.title,
			pubDate: post.data.date,
			description: post.data.summary ?? post.data.description ?? '',
			link: `/p/${post.id}/`,
		})),
	});
}
