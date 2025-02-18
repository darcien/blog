## What is this?

A personal blog created using [Hugo](https://gohugo.io/)

## Setup

You need Hugo and [just](https://just.systems/man/en/). Every commands is documented in `justfile`.

Last known working `hugo version`:

```
hugo v0.142.0+extended+withdeploy darwin/arm64 BuildDate=2025-01-22T12:20:52Z VendorInfo=brew
```

## Deployment

To deploy, build, commit and push the changes to remote master branch.
This will trigger a webhook event.
A http server that listens to the webhook will pull the latest changes.
~~Build result will be served by nginx running in the same machine.~~
Currently migrating machines, will be hosted by Vercel for now.

## Known Issues

- On local dev, search result might show duplicates.
  A known [unfixable bug](https://github.com/adityatelange/hugo-PaperMod/issues/414).
  Restarting the server by clearing the cache will fix the problem temporarily (e.g. run `hugo server --disableFastRender`)
