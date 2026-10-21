/**
 * Logs a deprecation warning once per key, in development only.
 * Pair it with a `@deprecated` JSDoc tag on the prop or component.
 *
 *   if (style === 'edit') warnDeprecated('Button.style.edit', 'Use variant="soft" size="xs".');
 */
export declare const warnDeprecated: (key: string, message: string) => void;
/** Test helper: lets a test observe the warning again. */
export declare const resetDeprecationWarnings: () => void;
//# sourceMappingURL=deprecate.d.ts.map