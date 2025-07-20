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

```shell
brew install hugo just
```

Last known working `hugo version`:

```
hugo v0.148.1+extended+withdeploy darwin/arm64 BuildDate=2025-07-11T12:56:21Z VendorInfo=brew
```

## Deployment

Push the master branch to deploy.

Build result is included in the repository.
(Not going to deal with hugo binary version out of sync for now)

## Known Issues

- On local dev, search result might show duplicates.
  A known [unfixable bug](https://github.com/adityatelange/hugo-PaperMod/issues/414).
  Restarting the server by clearing the cache will fix the problem temporarily (e.g. run `hugo server --disableFastRender`)
