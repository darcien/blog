# Astro Migration - Remaining Work

## Done
- All 30 posts migrated (md + mdx with Figure/CodePen components)
- All root pages (about, uses, now, debian-setup, mac-setup, archive, search placeholder, coffee)
- Tags (index + per-tag pages)
- RSS at /index.xml
- Static assets (favicons, manifest, etc.)
- All images optimized via Astro (co-located + src/assets/img/)
- URL compatibility verified against sitemap

## Next: Styling
- [ ] Base layout: site header with nav links, footer, max-width container
- [ ] Dark/light theme toggle (defaultTheme: auto)
- [ ] Typography: prose styling for post content
- [ ] Post metadata: date, tags, reading time, word count
- [ ] Code blocks: syntax highlighting + copy button
- [ ] Lightense.js integration in Figure component (image zoom on click)

## Next: Features
- [ ] Search page (Fuse.js + JSON index)
- [ ] Post navigation (prev/next links)
- [ ] Table of contents for posts with `show_toc: true`
- [ ] Home page: match PaperMod layout (intro + recent posts)
- [ ] Pagination on home/archive

## Cleanup
- [ ] Remove Hugo source files once migration is confirmed
- [ ] Move `next/` contents to repo root
