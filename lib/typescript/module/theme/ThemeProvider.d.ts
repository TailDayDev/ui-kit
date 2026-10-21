import { type ReactNode } from 'react';
import { type Theme } from './theme.js';
export interface ThemeProviderProps {
    /** Theme to provide. Defaults to the light theme from Figma. */
    theme?: Theme;
    children: ReactNode;
}
/** Makes the theme available to every kit component below it. Mount once near the app root. */
export declare const ThemeProvider: ({ theme, children, }: ThemeProviderProps) => import("react").JSX.Element;
/**
 * Returns the current theme. Works without a provider (falls back to the light
 * theme) so components render in tests and isolated previews.
 */
export declare const useTheme: () => Theme;
//# sourceMappingURL=ThemeProvider.d.ts.map