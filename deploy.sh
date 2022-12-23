#!/usr/bin/env sh

# abort on errors
set -e

pnpm clean
pnpm generate
# cd .output/public
# rsync -r .output/public/* root@154.91.170.15:/var/www/ngn-new --progress
wrangler pages publish .output/public

# NITRO_PRESET=cloudflare yarn build
# wrangler publish

cd -