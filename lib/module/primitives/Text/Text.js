"use strict";

import { Text as RNText } from 'react-native';
import { useTheme } from "../../theme/index.js";
import { jsx as _jsx } from "react/jsx-runtime";
const getTypography = (theme, variant) => {
  const [group, weight] = variant.split('/');
  const styles = theme.typography[group];
  return styles[weight];
};

/** Themed text. Every visible string in the kit goes through this component. */
export const Text = ({
  variant = 'body/regular',
  color = 'primary',
  align,
  style,
  ...textProps
}) => {
  const theme = useTheme();
  return /*#__PURE__*/_jsx(RNText, {
    style: [getTypography(theme, variant), {
      color: theme.colors.text[color],
      textAlign: align
    }, style],
    ...textProps
  });
};
//# sourceMappingURL=Text.js.map