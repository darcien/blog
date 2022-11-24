# List all available targets if just is executed with no arguments
default:
  @just --list

# Build the site
build:
  hugo

# Stage all changes
add:
  git add -A

# Commit staged changes
commit MESSAGE *FLAGS:
  git commit {{FLAGS}} -m "{{MESSAGE}}"

# Pull and rebase from remote
pull:
  git pull origin master --rebase

# Run local server including drafts
dev:
  hugo server --buildDrafts

# Run optimized server
run:
  hugo server

# This project runs on at least 3 different OSes,
# and every single one of them have different setup.
# - macOS -> brew install hugo && brew install just
# - Linux -> prebuilt binaries, https://gohugo.io/installation/linux/#prebuilt-binaries and https://github.com/casey/just#pre-built-binaries
# - Windows -> choco install hugo && choco install just

# TODO: Implement install command
# install:
# @echo no bootstrap command yet
