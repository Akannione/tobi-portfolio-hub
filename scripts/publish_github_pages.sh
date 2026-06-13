#!/usr/bin/env bash
set -euo pipefail

REPO_NAME="${1:-tobi-portfolio-hub}"
OWNER="${GITHUB_OWNER:-Akannione}"

if ! command -v gh >/dev/null 2>&1; then
  echo "GitHub CLI is required. Install gh first."
  exit 1
fi

if ! gh auth status >/dev/null 2>&1; then
  echo "GitHub CLI is not authenticated. Run: gh auth login -h github.com"
  exit 1
fi

python3 scripts/check_deploy_ready.py

if [ ! -d .git ]; then
  git init
  git branch -M main
fi

git add .

if git diff --cached --quiet; then
  echo "No portfolio changes to commit."
else
  git commit -m "Publish portfolio hub"
fi

if git remote get-url origin >/dev/null 2>&1; then
  git remote set-url origin "https://github.com/${OWNER}/${REPO_NAME}.git"
else
  git remote add origin "https://github.com/${OWNER}/${REPO_NAME}.git"
fi

if ! gh repo view "${OWNER}/${REPO_NAME}" >/dev/null 2>&1; then
  gh repo create "${OWNER}/${REPO_NAME}" --public --source=. --remote=origin --push
else
  git push -u origin main
fi

gh api \
  --method POST \
  -H "Accept: application/vnd.github+json" \
  "/repos/${OWNER}/${REPO_NAME}/pages" \
  -f 'source[branch]=main' \
  -f 'source[path]=/' >/dev/null 2>&1 || true

echo "Published repository: https://github.com/${OWNER}/${REPO_NAME}"
echo "GitHub Pages URL may take a few minutes to activate."
echo "Expected URL: https://${OWNER}.github.io/${REPO_NAME}/"
