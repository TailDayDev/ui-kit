"use strict";

import { View } from 'react-native';
import { useTheme } from "../../theme/index.js";
import { jsx as _jsx } from "react/jsx-runtime";
/** Figma icon frames are 24×24. */
export const DEFAULT_ICON_SIZE = 24;
const resolveIconColor = (theme, color) => color.startsWith('text.') ? theme.colors.text[color.slice('text.'.length)] : theme.colors.icon[color];

/** Renders an SVG icon component at a token color. */
export const Icon = ({
  icon: IconSvg,
  size = DEFAULT_ICON_SIZE,
  color = 'default',
  accessibilityLabel,
  style,
  testID
}) => {
  const theme = useTheme();
  const isDecorative = !accessibilityLabel;
  return /*#__PURE__*/_jsx(View, {
    style: style,
    testID: testID,
    accessible: !isDecorative,
    accessibilityRole: isDecorative ? undefined : 'image',
    accessibilityLabel: accessibilityLabel,
    importantForAccessibility: isDecorative ? 'no-hide-descendants' : 'auto',
    accessibilityElementsHidden: isDecorative,
    children: /*#__PURE__*/_jsx(IconSvg, {
      color: resolveIconColor(theme, color),
      size: size,
      width: size,
      height: size
    })
  });
};
//# sourceMappingURL=Icon.js.map