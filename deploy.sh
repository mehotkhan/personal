#!/usr/bin/env sh

# abort on errors
set -e

# pnpm clean
pnpm generate
poxychains wrangler pages publish .output/public
