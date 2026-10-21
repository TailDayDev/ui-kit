"use strict";

import { StyleSheet, View } from 'react-native';
import { useThemedStyles } from "../../theme/index.js";
import { jsx as _jsx } from "react/jsx-runtime";
/** App `Radio` default outer diameter (Figma `Radio` size=24). */
export const DEFAULT_RADIO_SIZE = 24;
/** App `Radio` default inner dot diameter. */
export const DEFAULT_RADIO_DOT_SIZE = 12;
const createStyles = theme => StyleSheet.create({
  dot: {
    backgroundColor: theme.colors.bg.accent,
    borderRadius: theme.radius.full
  },
  ring: {
    borderColor: theme.colors.icon.default,
    borderRadius: theme.radius.full,
    borderWidth: theme.stroke[1]
  },
  ringActive: {
    alignItems: 'center',
    borderColor: theme.colors.icon.accent,
    justifyContent: 'center'
  }
});

/**
 * Radio indicator. Purely visual: put it inside a tappable row that sets
 * `accessibilityRole="radio"` and `accessibilityState={{ checked }}`.
 */
export const Radio = ({
  isActive,
  dotSize = DEFAULT_RADIO_DOT_SIZE,
  size = DEFAULT_RADIO_SIZE,
  style,
  testID
}) => {
  const styles = useThemedStyles(createStyles);
  return /*#__PURE__*/_jsx(View, {
    testID: testID,
    style: [styles.ring, {
      height: size,
      width: size
    }, isActive && styles.ringActive, style],
    children: isActive ? /*#__PURE__*/_jsx(View, {
      testID: testID ? `${testID}.dot` : undefined,
      style: [styles.dot, {
        height: dotSize,
        width: dotSize
      }]
    }) : null
  });
};
//# sourceMappingURL=Radio.js.map