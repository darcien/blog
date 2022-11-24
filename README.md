## What is this?

A personal blog created using [Hugo](https://gohugo.io/)

## Setup

You need Hugo and [just](https://just.systems/man/en/). Every commands is documented in `justfile`.

## Deployment

Deployed automatically by pushing to master branch, which will trigger a webhook.
A http server that listens to the webhook will pull the latest changes and build project.
Build result will be served by nginx running in the same machine.
