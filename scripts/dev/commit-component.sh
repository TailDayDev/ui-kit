#!/usr/bin/env bash
# Commits one migrated component: its folder, extra files, a minor changeset and
# the export in src/components/index.ts.
#   scripts/dev/commit-component.sh <Name> "<changeset summary>" [extra paths...]
set -euo pipefail
name="$1"; summary="$2"; shift 2
dir="src/components/$name"
[ -d "$dir" ] || { echo "No $dir" >&2; exit 1; }

slug=$(echo "$name" | sed -E 's/([a-z0-9])([A-Z])/\1-\2/g' | tr '[:upper:]' '[:lower:]')
changeset=".changeset/$slug.md"
printf -- "---\n'@tessera/ui-kit': minor\n---\n\n%s\n" "$summary" > "$changeset"

line="export * from './$name';"
grep -qxF "$line" src/components/index.ts || echo "$line" >> src/components/index.ts
sort -o src/components/index.ts src/components/index.ts

git add "$dir" "$changeset" src/components/index.ts "$@"
git commit -q -m "feat($slug): add $name

$summary

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
echo "committed $name"
