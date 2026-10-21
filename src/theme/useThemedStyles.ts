import { useMemo } from 'react';

import type { Theme } from './theme';
import { useTheme } from './ThemeProvider';

/**
 * Builds a stylesheet from the theme once per theme change.
 *
 * Define the factory at module level so its identity is stable:
 *
 *   const createStyles = (theme: Theme) => StyleSheet.create({ ... });
 *   const styles = useThemedStyles(createStyles);
 */
export const useThemedStyles = <Styles>(
  createStyles: (theme: Theme) => Styles,
): Styles => {
  const theme = useTheme();
  return useMemo(() => createStyles(theme), [createStyles, theme]);
};
