#!/usr/bin/env node
/**
 * Shows which Figma components need work in the kit.
 *
 * Reads the committed export (figma/components/nodes.json, made by
 * `npm run figma:export-components`) and the sync manifest
 * (figma/components/sync.json) and prints, per component:
 *   NEW      final in Figma, never synced into the kit
 *   CHANGED  final in Figma, changed since the last sync
 *   SYNCED   final in Figma, kit matches the synced version
 *   DEPRECATED  marked for removal or renaming in Figma (`Статус: deprecated`):
 *            the kit keeps the old name per README «Устаревание API»
 *            (@deprecated + warnDeprecated in a minor, removal in the next major)
 *   MISSING  built into the kit, but no longer in Figma under that name
 *            (renamed or deleted without `deprecated` first)
 *   DRAFT    not final yet (left alone; "draft*" = changed since sync)
 * Two Figma masters with the same name are reported: the kit matches by name.
 * Icons (components without a description) are handled by build-icons and skipped.
 *
 * Usage:
 *   npm run figma:status                       table
 *   npm run figma:status -- --json             machine-readable
 *   npm run figma:status -- --mark-synced Chip TodayTaskCard
 *                                              record the current Figma version as built
 *   npm run figma:status -- --mark-synced --all-final
 *
 * "Final" is defined in figma/status-config.json (description `Статус:` or Dev Mode status).
 */
import { createHash } from 'node:crypto';
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const NODES = join(ROOT, 'figma', 'components', 'nodes.json');
const MANIFEST = join(ROOT, 'figma', 'components', 'sync.json');
const CONFIG = join(ROOT, 'figma', 'status-config.json');
const COMPONENTS_DIR = join(ROOT, 'src', 'components');

const args = process.argv.slice(2);
const isJson = args.includes('--json');
const markIndex = args.indexOf('--mark-synced');
const markNames =
  markIndex === -1
    ? []
    : args.slice(markIndex + 1).filter(a => !a.startsWith('--'));
const isMarkAllFinal = args.includes('--all-final');

const config = JSON.parse(readFileSync(CONFIG, 'utf8'));
const lower = list => list.map(value => value.toLowerCase());
const finalStatuses = lower(config.finalStatuses);
const draftStatuses = lower(config.draftStatuses);
const deprecatedStatuses = lower(config.deprecatedStatuses ?? []);

const exportJson = JSON.parse(readFileSync(NODES, 'utf8'));
const entry = Object.values(exportJson.nodes)[0];
const manifest = existsSync(MANIFEST)
  ? JSON.parse(readFileSync(MANIFEST, 'utf8'))
  : { components: {} };

// Layout-irrelevant data: where the component sits on the canvas.
const VOLATILE_KEYS = new Set([
  'absoluteRenderBounds',
  'relativeTransform',
  'interactions',
]);
const normalise = node => {
  if (Array.isArray(node)) return node.map(normalise);
  if (!node || typeof node !== 'object') return node;
  const out = {};
  for (const key of Object.keys(node).sort()) {
    if (VOLATILE_KEYS.has(key)) continue;
    if (key === 'absoluteBoundingBox' && node[key]) {
      out.size = [
        Math.round(node[key].width * 100) / 100,
        Math.round(node[key].height * 100) / 100,
      ];
      continue;
    }
    out[key] = normalise(node[key]);
  }
  return out;
};
const hashOf = (node, description) =>
  createHash('sha256')
    .update(JSON.stringify({ node: normalise(node), description }))
    .digest('hex')
    .slice(0, 16);

const field = (description, name) => {
  const match = description.match(new RegExp(`${name}:\\s*([^|\\n]+)`));
  return match ? match[1].trim() : null;
};

const kitFolders = new Set(readdirSync(COMPONENTS_DIR));
const kitExports = readdirSync(COMPONENTS_DIR)
  .filter(name => existsSync(join(COMPONENTS_DIR, name, 'index.ts')))
  .map(name => ({
    folder: name,
    source: readFileSync(join(COMPONENTS_DIR, name, 'index.ts'), 'utf8'),
  }));
const findKitComponent = name => {
  if (kitFolders.has(name)) return name;
  const owner = kitExports.find(({ source }) =>
    new RegExp(`\\b${name}\\b`).test(source),
  );
  return owner ? `${name} (folder ${owner.folder})` : null;
};

// Top-level components: component sets and standalone components (not variants).
const rows = [];
const walk = (node, isInsideSet) => {
  const isTopLevel =
    (node.type === 'COMPONENT_SET' || node.type === 'COMPONENT') &&
    !isInsideSet;
  if (isTopLevel) {
    const meta =
      entry.componentSets?.[node.id] ?? entry.components?.[node.id] ?? {};
    const description = meta.description ?? '';
    if (description && !config.ignore.includes(node.name)) {
      const status = field(description, 'Статус');
      const devStatus = node.devStatus?.type ?? null;
      const isFinal =
        (status && finalStatuses.includes(status.toLowerCase())) ||
        (devStatus && config.finalDevStatuses.includes(devStatus));
      const isDeprecated =
        status && deprecatedStatuses.includes(status.toLowerCase());
      const isKnownDraft =
        status && draftStatuses.includes(status.toLowerCase());
      const hash = hashOf(node, description);
      const synced = manifest.components[node.name];
      const kit = findKitComponent(node.name);
      let state;
      if (isDeprecated) state = 'DEPRECATED';
      else if (!isFinal)
        state = synced && synced.hash !== hash ? 'DRAFT*' : 'DRAFT';
      else if (!synced || !kit) state = 'NEW';
      else state = synced.hash === hash ? 'SYNCED' : 'CHANGED';
      rows.push({
        name: node.name,
        nodeId: node.id,
        state,
        status: status ?? (devStatus ? `dev:${devStatus}` : '—'),
        isUnknownStatus:
          Boolean(status) && !isFinal && !isKnownDraft && !isDeprecated,
        kit: kit ?? '—',
        appCode: field(description, 'Код'),
        hash,
        syncedAt: synced?.syncedAt ?? null,
      });
    }
  }
  for (const child of node.children ?? [])
    walk(child, isInsideSet || node.type === 'COMPONENT_SET');
};
walk(entry.document, false);

const nameCounts = rows.reduce(
  (counts, row) => counts.set(row.name, (counts.get(row.name) ?? 0) + 1),
  new Map(),
);
const duplicateNames = [...nameCounts]
  .filter(([, count]) => count > 1)
  .map(([name]) => name);

// Synced into the kit earlier, but gone from Figma under that name.
for (const [name, synced] of Object.entries(manifest.components)) {
  if (nameCounts.has(name)) continue;
  rows.push({
    name,
    nodeId: synced.nodeId,
    state: 'MISSING',
    status: '—',
    isUnknownStatus: false,
    kit: findKitComponent(name) ?? '—',
    appCode: null,
    hash: null,
    syncedAt: synced.syncedAt ?? null,
  });
}

if (markIndex !== -1) {
  const targets = isMarkAllFinal
    ? rows
        .filter(row => ['NEW', 'CHANGED', 'SYNCED'].includes(row.state))
        .map(row => row.name)
    : markNames;
  if (!targets.length) {
    console.error('Nothing to mark. Pass component names or --all-final.');
    process.exit(1);
  }
  const today = new Date().toISOString().slice(0, 10);
  for (const name of targets) {
    const row = rows.find(r => r.name === name);
    if (!row) {
      console.error(`Unknown Figma component "${name}".`);
      process.exit(1);
    }
    if (!['NEW', 'CHANGED', 'SYNCED'].includes(row.state)) {
      console.error(
        `"${name}" is ${row.state}; only final components are marked synced.`,
      );
      process.exit(1);
    }
    if (row.kit === '—') {
      console.error(
        `"${name}" has no kit component yet; build it before marking it synced.`,
      );
      process.exit(1);
    }
    manifest.components[name] = {
      nodeId: row.nodeId,
      hash: row.hash,
      status: row.status,
      syncedAt: today,
    };
  }
  manifest.figmaVersion = exportJson.version;
  manifest.figmaLastModified = exportJson.lastModified;
  const sorted = Object.fromEntries(
    Object.entries(manifest.components).sort(([a], [b]) => a.localeCompare(b)),
  );
  writeFileSync(
    MANIFEST,
    `${JSON.stringify({ ...manifest, components: sorted }, null, 2)}\n`,
  );
  console.warn(`Marked synced: ${targets.join(', ')}`);
  process.exit(0);
}

const ORDER = {
  NEW: 0,
  CHANGED: 1,
  MISSING: 2,
  DEPRECATED: 3,
  'DRAFT*': 4,
  SYNCED: 5,
  DRAFT: 6,
};
rows.sort(
  (a, b) => ORDER[a.state] - ORDER[b.state] || a.name.localeCompare(b.name),
);

if (isJson) {
  process.stdout.write(
    `${JSON.stringify({ figmaLastModified: exportJson.lastModified, rows, duplicateNames }, null, 2)}\n`,
  );
  process.exit(0);
}

const pad = (value, width) => String(value).padEnd(width);
console.log(
  `Figma export: ${exportJson.lastModified} (version ${exportJson.version})`,
);
console.log(
  `${pad('STATE', 8)} ${pad('FIGMA', 32)} ${pad('NODE', 10)} ${pad('STATUS', 10)} KIT`,
);
for (const row of rows) {
  console.log(
    `${pad(row.state, 8)} ${pad(row.name, 32)} ${pad(row.nodeId, 10)} ${pad(row.status, 10)} ${row.kit}`,
  );
}
const count = state => rows.filter(row => row.state === state).length;
console.log(
  `\nNEW ${count('NEW')} · CHANGED ${count('CHANGED')} · MISSING ${count('MISSING')} · DEPRECATED ${count('DEPRECATED')} · SYNCED ${count('SYNCED')} · DRAFT ${count('DRAFT') + count('DRAFT*')} (changed since sync: ${count('DRAFT*')})`,
);
if (duplicateNames.length) {
  console.log(
    `\nSame name on several Figma masters (the kit matches by name; rename all but one): ${duplicateNames.join(', ')}`,
  );
}
if (count('MISSING')) {
  console.log(
    '\nMISSING: renamed or deleted in Figma without `Статус: deprecated` first. Ask design; keep the kit name until the deprecation is agreed.',
  );
}
const unknown = rows.filter(row => row.isUnknownStatus);
if (unknown.length) {
  console.log(
    `\nUnknown status values (add them to figma/status-config.json): ${[...new Set(unknown.map(r => r.status))].join(', ')}`,
  );
}
