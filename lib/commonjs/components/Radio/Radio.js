"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Radio = exports.DEFAULT_RADIO_SIZE = exports.DEFAULT_RADIO_DOT_SIZE = void 0;
var _reactNative = require("react-native");
var _index = require("../../theme/index.js");
var _jsxRuntime = require("react/jsx-runtime");
/** App `Radio` default outer diameter (Figma `Radio` size=24). */
const DEFAULT_RADIO_SIZE = exports.DEFAULT_RADIO_SIZE = 24;
/** App `Radio` default inner dot diameter. */
const DEFAULT_RADIO_DOT_SIZE = exports.DEFAULT_RADIO_DOT_SIZE = 12;
const createStyles = theme => _reactNative.StyleSheet.create({
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
const Radio = ({
  isActive,
  dotSize = DEFAULT_RADIO_DOT_SIZE,
  size = DEFAULT_RADIO_SIZE,
  style,
  testID
}) => {
  const styles = (0, _index.useThemedStyles)(createStyles);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
    testID: testID,
    style: [styles.ring, {
      height: size,
      width: size
    }, isActive && styles.ringActive, style],
    children: isActive ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
      testID: testID ? `${testID}.dot` : undefined,
      style: [styles.dot, {
        height: dotSize,
        width: dotSize
      }]
    }) : null
  });
};
exports.Radio = Radio;
//# sourceMappingURL=Radio.js.map