# List all available targets if just is executed with no arguments
default:
    @just --list

# Install dependencies
install:
    bun install

# Run local dev server
dev:
    bun run dev

# Build the site
build:
    bun run build

# Preview built site locally
preview: build
    bun run preview

# Format code with Prettier
fmt:
    bun run fmt

# Commit staged changes
commit MESSAGE:
    git add --all
    git commit -m "{{ MESSAGE }}"

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
    git pull origin master --rebase
