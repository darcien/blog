## What is this?

A personal blog created using [Hugo](https://gohugo.io/)

## Setup

You need Hugo and [just](https://just.systems/man/en/). Every commands is documented in `justfile`.

## Deployment

To deploy, build, commit and push the changes to remote master branch.
This will trigger a webhook event.
A http server that listens to the webhook will pull the latest changes.
Build result will be served by nginx running in the same machine.

## Known Issues

- On local dev, search result might show duplicates.
  A known [unfixable bug](https://github.com/adityatelange/hugo-PaperMod/issues/414).
  Restarting the server by clearing the cache will fix the problem temporarily (e.g. run `hugo server --disableFastRender`)
