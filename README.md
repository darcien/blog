# Blog

A personal blog built with [Astro](https://astro.build/).

## Setup

You (don't) need [just](https://just.systems/man/en/).
Every commands is documented in `justfile`.

## Deployment

Push to `master` to deploy via GitHub Actions.

### Secrets

Set these in the repo's GitHub Actions secrets:

- `SSH_PRIVATE_KEY` — ed25519 private key for `deploy-blog` user
- `VPS_HOST` — server IP or hostname
- `VPS_HOST_KEY` — paste the ed25519 line from `ssh-keyscan <host>`:
  ```
  <host> ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAI...
  ```

## Search

Search is implemented using [Pagefind](https://pagefind.app/).
It indexes the built HTML, so it only works after `bun run build`.
Use `bun run preview` to test search locally.
