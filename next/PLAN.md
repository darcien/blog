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

- [ ] Dark/light theme toggle (defaultTheme: auto)

## Next: Features

- [ ] Search page (Fuse.js + JSON index)
- [ ] Table of contents for posts with `show_toc: true`

## Cleanup

- [ ] Remove Hugo source files once migration is confirmed
- [ ] Move `next/` contents to repo root
