import { createContext, useContext, type ReactNode } from 'react';

import { lightTheme, type Theme } from './theme';

const ThemeContext = createContext<Theme>(lightTheme);

export interface ThemeProviderProps {
  /** Theme to provide. Defaults to the light theme from Figma. */
  theme?: Theme;
  children: ReactNode;
}

/** Makes the theme available to every kit component below it. Mount once near the app root. */
export const ThemeProvider = ({
  theme = lightTheme,
  children,
}: ThemeProviderProps) => (
  <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
);

/**
 * Returns the current theme. Works without a provider (falls back to the light
 * theme) so components render in tests and isolated previews.
 */
export const useTheme = (): Theme => useContext(ThemeContext);
