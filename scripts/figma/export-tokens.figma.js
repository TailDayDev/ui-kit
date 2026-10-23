// Token export run by an agent inside the Figma file (Figma MCP `use_figma`,
// Plugin API), without starting the plugin by hand. Read-only.
// Same logic and output as figma-plugin/code.js (keep the two in sync); the
// result is the canonical tokens/figma-export.json shape.
// Top-level `await`/`return`: the MCP wraps the code in an async function.

const toHex = color => {
  const channel = value =>
    Math.round(value * 255)
      .toString(16)
      .padStart(2, '0');
  const alpha = color.a !== undefined && color.a < 1 ? channel(color.a) : '';
  return `#${channel(color.r)}${channel(color.g)}${channel(color.b)}${alpha}`.toUpperCase();
};

const variables = {};
for (const collection of await figma.variables.getLocalVariableCollectionsAsync()) {
  const items = {};
  for (const id of collection.variableIds) {
    const variable = await figma.variables.getVariableByIdAsync(id);
    if (!variable) continue;
    const values = {};
    for (const mode of collection.modes) {
      const raw = variable.valuesByMode[mode.modeId];
      if (raw && typeof raw === 'object' && raw.type === 'VARIABLE_ALIAS') {
        const target = await figma.variables.getVariableByIdAsync(raw.id);
        values[mode.name] = { alias: target ? target.name : raw.id };
      } else if (raw && typeof raw === 'object' && 'r' in raw) {
        values[mode.name] = toHex(raw);
      } else {
        values[mode.name] = raw;
      }
    }
    items[variable.name] = { type: variable.resolvedType, values };
  }
  variables[collection.name] = {
    modes: collection.modes.map(mode => mode.name),
    variables: items,
  };
}

const textStyles = {};
for (const style of await figma.getLocalTextStylesAsync()) {
  textStyles[style.name] = {
    fontFamily: style.fontName.family,
    fontStyle: style.fontName.style,
    fontSize: style.fontSize,
    lineHeight: style.lineHeight,
    letterSpacing: style.letterSpacing,
    textDecoration: style.textDecoration,
    textCase: style.textCase,
  };
}

const effectStyles = {};
for (const style of await figma.getLocalEffectStylesAsync()) {
  effectStyles[style.name] = style.effects
    .filter(effect => effect.visible !== false)
    .map(effect => ({
      type: effect.type,
      color: effect.color ? toHex(effect.color) : undefined,
      offset: effect.offset,
      radius: effect.radius,
      spread: effect.spread,
    }));
}

return {
  meta: {
    source: 'figma',
    fileKey: figma.fileKey || null,
    exportedAt: new Date().toISOString().slice(0, 10),
    exporter: 'figma-mcp (scripts/figma/export-tokens.figma.js)',
  },
  variables,
  textStyles,
  effectStyles,
};
