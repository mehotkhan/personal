#!/usr/bin/env sh

# abort on errors
set -e

# pnpm clean
pnpm generate
proxychains wrangler pages publish .output/public
