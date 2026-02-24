## What is this?

A personal blog created using [Hugo](https://gohugo.io/)

## Cloning

Use `--recurse-submodules` because the theme is in submodules

```
git clone --recurse-submodules ...
```

Already cloned? Clone the submodules only

```
git submodule update --init --recursive
```

## Setup

You need Hugo and [just](https://just.systems/man/en/). Every commands is documented in `justfile`.

```bash
curl -L https://github.com/gohugoio/hugo/releases/download/v0.155.3/hugo_extended_0.155.3_darwin-universal.pkg -o hugo.pkg
sudo installer -pkg hugo.pkg -target /
rm hugo.pkg
```

```bash
brew install just
```

Last known working `hugo version`:

```
hugo v0.155.3-8a858213b73907e823e2be2b5640a0ce4c04d295+extended darwin/arm64 BuildDate=2026-02-08T16:40:42Z VendorInfo=gohugoio
```

## Hugo???

I can't take it anymore, it's like every minor release fail the build and breaks stuff.

## Deployment

Push the master branch to deploy.

Build result is included in the repository.
(Not going to deal with hugo binary version out of sync for now)

## Known Issues

- On local dev, search result might show duplicates.
  A known [unfixable bug](https://github.com/adityatelange/hugo-PaperMod/issues/414).
  Restarting the server by clearing the cache will fix the problem temporarily (e.g. run `hugo server --disableFastRender`)
