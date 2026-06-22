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

# Create a new post: just new my-post-slug
new SLUG:
    #!/usr/bin/env bash
    set -euo pipefail
    file="src/content/posts/{{ SLUG }}.md"
    if [ -e "$file" ]; then
        echo "Error: $file already exists" >&2
        exit 1
    fi
    cat > "$file" <<EOF
    ---
    title: ""
    date: $(date -u +%Y-%m-%dT%H:%M:%SZ)
    tags: [""]
    draft: true
    ---
    EOF
    echo "Created $file"

# Format code with Prettier
fmt:
    bun run fmt

# Commit staged changes
commit MESSAGE: fmt
    git add --all
    git commit -m "{{ MESSAGE }}"

# Push to remote repo, this essentially triggers the deployment
deploy:
    git push -u origin master

# Commit all changes and deploy it
doit:
    just commit "just do it 🫶"
    just deploy

# Pull and rebase from remote
pull:
    git pull origin master --rebase
