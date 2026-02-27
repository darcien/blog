# Blog (Astro)

<important-instructions>
- Never modify ./src/styles/reset.css. Override or extend it.
- Read ./CSS_GUIDE.md before doing styling with CSS
</important-instructions>

## Commands
- `bun run build` - static build to `dist/`
- `bun run preview` - preview built site

## Structure
- `src/content/posts/` - blog posts (md/mdx), flat files or `<slug>/index.mdx` with co-located images
- `src/pages/p/[slug].astro` - post route, slug = filename or folder name
- `src/pages/` - root pages (about, uses, now, etc.)
- `src/pages/tags/` - tag index and per-tag pages
- `src/components/` - Figure.astro, CodePen.astro
- `src/assets/img/` - shared images (Astro-optimized)
- `public/` - favicons, manifest, static assets (served as-is, no optimization)

## Content conventions
- Frontmatter uses snake_case: `show_toc`, `search_hidden`, `hide_footer`, `canonical_url`
- Posts with images: use `<slug>/index.mdx` + co-located images, import images in MDX
- Posts without images: flat `.md` or `.mdx` file
- Posts with Figure/CodePen: use `.mdx`, import components at top of file
- Images should live in `src/` (not `public/`) for Astro optimization
