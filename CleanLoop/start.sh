#!/usr/bin/env bash
# CleanLoop launcher for macOS / Linux.  Run:  ./start.sh   (or: bash start.sh)
cd "$(dirname "$0")"
echo ""
echo "  Starting CleanLoop..."
if ! command -v node >/dev/null 2>&1; then
  echo "  Node.js is not installed. Download the LTS version from https://nodejs.org and run this again."
  exit 1
fi
if [ ! -d node_modules/express ]; then
  echo "  Installing the server package - one time only..."
  npm install --omit=dev --no-audit --no-fund
fi
if [ ! -f client/dist/index.html ]; then
  echo "  Building the web app - one time only, needs internet..."
  npm run build
fi
node server/index.js --open
