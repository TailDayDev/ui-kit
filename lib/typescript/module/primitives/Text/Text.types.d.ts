import type { TextProps as RNTextProps } from 'react-native';
import type { TextColorRole, TypographyVariant } from '../../tokens/index.js';
/** Text rendered with a Figma text style and a semantic color. */
export interface TextProps extends RNTextProps {
    /** Figma text style, e.g. `'headline/medium'`. Defaults to `'body/regular'`. */
    variant?: TypographyVariant;
    /** Text color role from `theme.colors.text`. Defaults to `'primary'`. */
    color?: TextColorRole;
    /** Horizontal alignment. */
    align?: 'auto' | 'left' | 'right' | 'center' | 'justify';
}
//# sourceMappingURL=Text.types.d.ts.map