THEME_DIR := join(justfile_directory(), "themes", "PaperMod")
DEFAULT_THEME_COMMIT_MESSAGE := 'update theme'

# List all available targets if just is executed with no arguments
default:
  @just --list

# Create a new post with the given filename
post FILENAME:
  hugo new "p/{{FILENAME}}.md"

# Build the site
build:
  hugo --quiet --minify --gc --cleanDestinationDir

# Commit staged changes
commit MESSAGE:
  git add --all
  git commit -m "{{MESSAGE}}"

# Push to remote repo, this essentially triggers the deployment 
deploy:
  git push -u origin master

# Commit all changes and deploy it
doit: build
  git add --all
  git commit -m "just do it 🫶"
  just deploy

# Pull and rebase from remote
pull:
  git pull origin master --rebase --recurse-submodules

# Run local server including drafts
dev:
  hugo server --buildDrafts

# Run optimized server
run:
  hugo server

# Commit changes in terminal sub module and push theme changes to remote
pushtheme MESSAGE=DEFAULT_THEME_COMMIT_MESSAGE:
  @echo "Committing changes in {{THEME_DIR}} and pushing to GitHub..."
  @cd "{{THEME_DIR}}" && git add --all
  @cd "{{THEME_DIR}}" && git commit -m "{{MESSAGE}}"
  @cd "{{THEME_DIR}}" && git push -u origin master
