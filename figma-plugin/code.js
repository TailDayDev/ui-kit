// Exports local variables, text styles and effect styles in the shape that
// scripts/tokens/build-tokens.mjs reads (tokens/figma-export.json).
// Read-only: it never changes the Figma file.

const toHex = color => {
  const channel = value =>
    Math.round(value * 255)
      .toString(16)
      .padStart(2, '0');
  const alpha = color.a !== undefined && color.a < 1 ? channel(color.a) : '';
  return `#${channel(color.r)}${channel(color.g)}${channel(color.b)}${alpha}`.toUpperCase();
};

async function exportVariables() {
  const result = {};
  const collections = await figma.variables.getLocalVariableCollectionsAsync();
  for (const collection of collections) {
    const variables = {};
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
      variables[variable.name] = { type: variable.resolvedType, values };
    }
    result[collection.name] = {
      modes: collection.modes.map(mode => mode.name),
      variables,
    };
  }
  return result;
}

async function exportTextStyles() {
  const result = {};
  for (const style of await figma.getLocalTextStylesAsync()) {
    result[style.name] = {
      fontFamily: style.fontName.family,
      fontStyle: style.fontName.style,
      fontSize: style.fontSize,
      lineHeight: style.lineHeight,
      letterSpacing: style.letterSpacing,
      textDecoration: style.textDecoration,
      textCase: style.textCase,
    };
  }
  return result;
}

async function exportEffectStyles() {
  const result = {};
  for (const style of await figma.getLocalEffectStylesAsync()) {
    result[style.name] = style.effects
      .filter(effect => effect.visible !== false)
      .map(effect => ({
        type: effect.type,
        color: effect.color ? toHex(effect.color) : undefined,
        offset: effect.offset,
        radius: effect.radius,
        spread: effect.spread,
      }));
  }
  return result;
}

(async () => {
  const payload = {
    meta: {
      source: 'figma',
      fileKey: figma.fileKey || null,
      exportedAt: new Date().toISOString().slice(0, 10),
      exporter: 'figma-plugin',
    },
    variables: await exportVariables(),
    textStyles: await exportTextStyles(),
    effectStyles: await exportEffectStyles(),
  };
  figma.showUI(__html__, { width: 360, height: 160 });
  figma.ui.postMessage(JSON.stringify(payload, null, 2));
  figma.ui.onmessage = message => {
    if (message === 'close') figma.closePlugin();
  };
})();
