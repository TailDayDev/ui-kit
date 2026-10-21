import type { colors, palette, radius, shadows, space, stroke, typography } from './generated/index.js';
/** Raw palette color name, e.g. `'baseGray'`. Prefer semantic roles. */
export type PaletteColor = keyof typeof palette;
type Roles<Group extends keyof typeof colors> = keyof (typeof colors)[Group];
/** Text color role: `colors.text.*`. */
export type TextColorRole = Roles<'text'>;
/** Background role: `colors.bg.*`. */
export type BackgroundRole = Roles<'bg'>;
/** Icon color role: `colors.icon.*`. */
export type IconColorRole = Roles<'icon'>;
/** Any semantic color as `"group.role"`, e.g. `'text.primary'`, `'bg.surface'`. */
export type ColorRole = {
    [Group in keyof typeof colors]: `${Group & string}.${Roles<Group> & string}`;
}[keyof typeof colors];
export type SpaceKey = keyof typeof space;
export type RadiusKey = keyof typeof radius;
export type StrokeKey = keyof typeof stroke;
export type ShadowKey = keyof typeof shadows;
/** Figma text style name, e.g. `'headline/medium'`. */
export type TypographyVariant = {
    [Group in keyof typeof typography]: `${Group & string}/${keyof (typeof typography)[Group] & string}`;
}[keyof typeof typography];
export {};
//# sourceMappingURL=types.d.ts.map