#!/usr/bin/env node
/**
 * Exports the Figma "01 Components" page through the Figma REST API:
 *   figma/components/nodes.json      full node tree (layout, fills, variables, text styles, props)
 *   figma/components/png/<id>.png    2x render of every component set / component
 *   figma/components/index.json      id → name list of what was rendered
 *
 * Works with a View seat (REST API has per-minute limits, unlike the MCP server).
 *
 * Usage (the token is read from the environment, never pass it as an argument):
 *   read -s FIGMA_TOKEN && export FIGMA_TOKEN && npm run figma:export-components
 *
 * Token: Figma → Settings → Security → Personal access tokens, scope "File content: read".
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const FILE_KEY = 'JGXl0xHQB1XmQVG9qQgZbq';
const PAGE_ID = '10:3';
const OUT = join(
  dirname(fileURLToPath(import.meta.url)),
  '..',
  '..',
  'figma',
  'components',
);
const TOKEN = process.env.FIGMA_TOKEN;

if (!TOKEN) {
  console.error(
    'FIGMA_TOKEN is not set. Run: read -s FIGMA_TOKEN && export FIGMA_TOKEN',
  );
  process.exit(1);
}

const api = async path => {
  for (let attempt = 0; attempt < 5; attempt += 1) {
    const response = await fetch(`https://api.figma.com/v1${path}`, {
      headers: { 'X-Figma-Token': TOKEN },
    });
    if (response.status === 429) {
      const wait = Number(response.headers.get('retry-after') ?? 10);
      console.warn(`Rate limited, waiting ${wait}s…`);
      await new Promise(resolve => setTimeout(resolve, wait * 1000));
      continue;
    }
    if (!response.ok) {
      throw new Error(
        `${response.status} ${response.statusText} for ${path}: ${await response.text()}`,
      );
    }
    return response.json();
  }
  throw new Error(`Gave up after rate limiting: ${path}`);
};

mkdirSync(OUT, { recursive: true });

console.warn('Downloading node tree…');
const nodes = await api(
  `/files/${FILE_KEY}/nodes?ids=${encodeURIComponent(PAGE_ID)}`,
);
writeFileSync(join(OUT, 'nodes.json'), JSON.stringify(nodes, null, 1));

// Variables (names for bound variable ids). Not available on every plan; optional.
try {
  const variables = await api(`/files/${FILE_KEY}/variables/local`);
  writeFileSync(
    join(OUT, 'variables.json'),
    JSON.stringify(variables, null, 1),
  );
} catch (error) {
  console.warn(
    `Variables endpoint unavailable (${String(error).slice(0, 60)}…); tokens/figma-export.json is used instead.`,
  );
}

const targets = [];
const walk = (node, parentType) => {
  if (
    node.type === 'COMPONENT_SET' ||
    (node.type === 'COMPONENT' && parentType !== 'COMPONENT_SET')
  ) {
    targets.push({ id: node.id, name: node.name, type: node.type });
  }
  for (const child of node.children ?? []) walk(child, node.type);
};
walk(nodes.nodes[PAGE_ID].document, null);
writeFileSync(join(OUT, 'index.json'), JSON.stringify(targets, null, 1));
console.warn(`Rendering ${targets.length} components…`);

const BATCH = 40;
const exportImages = async (list, format, dir, extra = '') => {
  mkdirSync(join(OUT, dir), { recursive: true });
  for (let i = 0; i < list.length; i += BATCH) {
    const ids = list
      .slice(i, i + BATCH)
      .map(t => t.id)
      .join(',');
    const { images } = await api(
      `/images/${FILE_KEY}?ids=${encodeURIComponent(ids)}&format=${format}${extra}`,
    );
    for (const [id, url] of Object.entries(images)) {
      if (!url) continue;
      const body = Buffer.from(await (await fetch(url)).arrayBuffer());
      const target = list.find(t => t.id === id);
      const fileName =
        format === 'svg'
          ? `${target.name}.svg`
          : `${id.replace(/[:;]/g, '-')}.png`;
      writeFileSync(join(OUT, dir, fileName), body);
    }
  }
};

await exportImages(targets, 'png', 'png', '&scale=2');

// Icons (components named in lower-case kebab, e.g. "chevron-down") also as SVG,
// the source for src/icons (scripts/figma/build-icons.mjs).
const icons = targets.filter(t => /^[a-z0-9-]+$/.test(t.name));
console.warn(`Exporting ${icons.length} icons as SVG…`);
await exportImages(
  icons,
  'svg',
  'svg',
  '&svg_include_id=false&svg_simplify_stroke=true&svg_outline_text=true',
);
console.warn(`Done: ${OUT}`);
