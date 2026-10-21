#!/usr/bin/env node
/**
 * Publishes the current version as a git tag that consumers install directly:
 *
 *   "@tessera/ui-kit": "github:TailDayDev/ui-kit#semver:^1.2.0"
 *
 * `lib/` is git-ignored on main, so the tag points to a release commit whose
 * tree is main + the built `lib/`. The release commit is a child of HEAD, so
 * history stays linked, but it is never pushed to a branch.
 *
 * Idempotent: exits quietly when the tag already exists.
 */
import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const run = (cmd, args, options = {}) =>
  // execFileSync returns null when stdout is inherited, so normalise to a string.
  (
    execFileSync(cmd, args, {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'inherit'],
      ...options,
    }) ?? ''
  ).trim();

const { name, version } = JSON.parse(readFileSync('package.json', 'utf8'));
const tag = `v${version}`;

if (version === '0.0.0') {
  console.warn('Version is 0.0.0: nothing to release yet.');
  process.exit(0);
}

run('git', ['fetch', '--tags', '--quiet']);
const isTagged = run('git', ['tag', '--list', tag]) === tag;
if (isTagged) {
  console.warn(`${tag} already exists, skipping.`);
  process.exit(0);
}

run('npm', ['run', 'build'], { stdio: 'inherit' });

// Build the release tree in a throwaway index so the working tree stays untouched.
const tempDir = mkdtempSync(join(tmpdir(), 'ui-kit-release-'));
const env = { ...process.env, GIT_INDEX_FILE: join(tempDir, 'index') };
try {
  run('git', ['read-tree', 'HEAD'], { env });
  run('git', ['add', '--force', 'lib'], { env });
  const tree = run('git', ['write-tree'], { env });
  const commit = run(
    'git',
    ['commit-tree', tree, '-p', 'HEAD', '-m', `release: ${name}@${version}`],
    { env },
  );
  run('git', ['tag', '-a', tag, commit, '-m', `${name}@${version}`]);
  run('git', ['push', 'origin', tag], { stdio: 'inherit' });
} finally {
  rmSync(tempDir, { recursive: true, force: true });
}

const notes = extractChangelogSection(version);
try {
  run('gh', [
    'release',
    'create',
    tag,
    '--title',
    `${name}@${version}`,
    '--notes',
    notes || `Release ${version}`,
  ]);
} catch {
  console.warn(`Tag ${tag} pushed, but creating the GitHub release failed.`);
}
process.stdout.write(`New tag: ${name}@${version}\n`);

function extractChangelogSection(targetVersion) {
  try {
    const changelog = readFileSync('CHANGELOG.md', 'utf8');
    const start = changelog.indexOf(`## ${targetVersion}`);
    if (start === -1) return '';
    const rest = changelog.slice(start + 1);
    const next = rest.indexOf('\n## ');
    return (next === -1 ? rest : rest.slice(0, next))
      .replace(/^#[^\n]*\n/, '')
      .trim();
  } catch {
    return '';
  }
}
