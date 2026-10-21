import type { Theme } from './theme';
/**
 * Builds a stylesheet from the theme once per theme change.
 *
 * Define the factory at module level so its identity is stable:
 *
 *   const createStyles = (theme: Theme) => StyleSheet.create({ ... });
 *   const styles = useThemedStyles(createStyles);
 */
export declare const useThemedStyles: <Styles>(createStyles: (theme: Theme) => Styles) => Styles;
//# sourceMappingURL=useThemedStyles.d.ts.map