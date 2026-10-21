"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useThemedStyles = void 0;
var _react = require("react");
var _ThemeProvider = require("./ThemeProvider.js");
/**
 * Builds a stylesheet from the theme once per theme change.
 *
 * Define the factory at module level so its identity is stable:
 *
 *   const createStyles = (theme: Theme) => StyleSheet.create({ ... });
 *   const styles = useThemedStyles(createStyles);
 */
const useThemedStyles = createStyles => {
  const theme = (0, _ThemeProvider.useTheme)();
  return (0, _react.useMemo)(() => createStyles(theme), [createStyles, theme]);
};
exports.useThemedStyles = useThemedStyles;
//# sourceMappingURL=useThemedStyles.js.map