"use strict";

import { useMemo } from 'react';
import { useTheme } from "./ThemeProvider.js";

/**
 * Builds a stylesheet from the theme once per theme change.
 *
 * Define the factory at module level so its identity is stable:
 *
 *   const createStyles = (theme: Theme) => StyleSheet.create({ ... });
 *   const styles = useThemedStyles(createStyles);
 */
export const useThemedStyles = createStyles => {
  const theme = useTheme();
  return useMemo(() => createStyles(theme), [createStyles, theme]);
};
//# sourceMappingURL=useThemedStyles.js.map