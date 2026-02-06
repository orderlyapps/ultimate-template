#!/bin/bash

# Copy environment files from the original workspace
if [ -f "$ROOT_WORKSPACE_PATH/.env" ]; then
    cp "$ROOT_WORKSPACE_PATH/.env" .env
    echo "Copied .env file"
fi

if [ -f "$ROOT_WORKSPACE_PATH/.env.local" ]; then
    cp "$ROOT_WORKSPACE_PATH/.env.local" .env.local
    echo "Copied .env.local file"
fi

if [ -f "$ROOT_WORKSPACE_PATH/.env.production" ]; then
    cp "$ROOT_WORKSPACE_PATH/.env.production" .env.production
    echo "Copied .env.production file"
fi

# Install dependencies
if [ -f "package.json" ]; then
    pnpm install
    echo "Installed pnpm dependencies"
fi

exit 0