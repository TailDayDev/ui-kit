"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.warnDeprecated = exports.resetDeprecationWarnings = void 0;
const warned = new Set();

/**
 * Logs a deprecation warning once per key, in development only.
 * Pair it with a `@deprecated` JSDoc tag on the prop or component.
 *
 *   if (style === 'edit') warnDeprecated('Button.style.edit', 'Use variant="soft" size="xs".');
 */
const warnDeprecated = (key, message) => {
  if (!__DEV__ || warned.has(key)) return;
  warned.add(key);
  console.warn(`[ui-kit] ${key} is deprecated and will be removed in the next major. ${message}`);
};

/** Test helper: lets a test observe the warning again. */
exports.warnDeprecated = warnDeprecated;
const resetDeprecationWarnings = () => warned.clear();
exports.resetDeprecationWarnings = resetDeprecationWarnings;
//# sourceMappingURL=deprecate.js.map