# Blog

## Commands

| Command           | Action                                     |
| :---------------- | :----------------------------------------- |
| `bun install`     | Install dependencies                       |
| `bun run dev`     | Start dev server at `localhost:4321`       |
| `bun run build`   | Build site to `./dist/` + index for search |
| `bun run preview` | Preview built site locally                 |
| `bun run fmt`     | Format code with Prettier                  |

## Search

Search is powered by [Pagefind](https://pagefind.app/). It indexes the built HTML, so it only works after `bun run build`. Use `bun run preview` to test search locally.

To exclude a page from search results, add `data-pagefind-ignore` to its content wrapper.
