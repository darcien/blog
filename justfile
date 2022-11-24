THEME_TERMINAL_DIR := join(justfile_directory(), "themes", "terminal")
DEFAULT_THEME_COMMIT_MESSAGE := 'update theme'
# TODO: date is not cross platform, maybe use npx date-now-cli ir non date default
DEFAULT_COMMIT_MESSAGE := `date "+%Y-%m-%dT%H:%M:%S"`

# List all available targets if just is executed with no arguments
default:
  @just --list

# Create a new post with the given filename
post FILENAME:
  hugo new "p/{{FILENAME}}.md"

# Build the site
build:
  hugo

# Stage all changes
add:
  git add --all

# Commit staged changes
commit MESSAGE:
  git commit -m "{{MESSAGE}}"

# Push to remote repo, this essentially triggers the deployment 
deploy:
  git push -u origin master

# Commit all changes and deploy it
doit: add
  # windows dont like heart hands https://emojipedia.org/heart-hands/
  git commit -m "just do it 🫶"
  just deploy

# Pull and rebase from remote
pull:
  git pull origin master --rebase

# Run local server including drafts
dev:
  hugo server --buildDrafts

# Run optimized server
run:
  hugo server

# Commit changes in terminal sub module and push theme changes to remote
pushtheme MESSAGE=DEFAULT_THEME_COMMIT_MESSAGE:
  @echo "Committing changes in {{THEME_TERMINAL_DIR}} and pushing to GitHub..."
  @cd "{{THEME_TERMINAL_DIR}}" && git add --all
  @cd "{{THEME_TERMINAL_DIR}}" && git commit -m "{{MESSAGE}}"
  @cd "{{THEME_TERMINAL_DIR}}" && git push -u origin master

# This project runs on at least 3 different OSes,
# and every single one of them have different setup.
# - macOS -> brew install hugo && brew install just
# - Linux -> prebuilt binaries, https://gohugo.io/installation/linux/#prebuilt-binaries and https://github.com/casey/just#pre-built-binaries
# - Windows -> choco install hugo && choco install just

# TODO: Implement install command
# install:
# @echo no bootstrap command yet
