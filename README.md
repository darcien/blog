# Blog

A personal blog built with [Astro](https://astro.build/).

## Setup

You (don't) need [just](https://just.systems/man/en/).
Every commands is documented in `justfile`.

## Deployment

Push the master branch to deploy.

## Search

Search is implemented using [Pagefind](https://pagefind.app/).
It indexes the built HTML, so it only works after `bun run build`.
Use `bun run preview` to test search locally.
