"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LabeledDetailRow = void 0;
var _react = require("react");
var _reactNative = require("react-native");
var _index = require("../../primitives/Text/index.js");
var _index2 = require("../../theme/index.js");
var _jsxRuntime = require("react/jsx-runtime");
/** Width of the value column in narrow mode (app value). */
const NARROW_VALUE_WIDTH = '77%';
/** Extra touch area around a tappable value. */
const VALUE_HIT_SLOP = 4;
/** Maximum value lines. */
const VALUE_NUMBER_OF_LINES = 2;
const createStyles = theme => _reactNative.StyleSheet.create({
  description: {
    width: '100%'
  },
  divider: {
    backgroundColor: theme.colors.border.default,
    height: theme.stroke[1],
    marginVertical: theme.space[3]
  },
  label: {
    flexShrink: 0
  },
  row: {
    gap: theme.space[1],
    width: '100%'
  },
  topRow: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: theme.space[2],
    width: '100%'
  },
  valueContainer: {
    flex: 1,
    minWidth: 0
  },
  valueContainerNarrow: {
    flex: 0,
    marginLeft: 'auto',
    width: NARROW_VALUE_WIDTH
  },
  valuePressable: {
    alignSelf: 'flex-end',
    flexGrow: 0,
    flexShrink: 1,
    maxWidth: '100%'
  }
});

/** Label / value detail row with a divider after it (unless `isLast`). */
const LabeledDetailRow = ({
  label,
  value,
  description,
  isLast,
  isValueNarrow = false,
  onPress,
  onValuePress,
  testID,
  valueTestID
}) => {
  const styles = (0, _index2.useThemedStyles)(createStyles);
  const handlePress = event => {
    event.stopPropagation();
    onPress?.();
  };
  const handleValuePress = event => {
    event.stopPropagation();
    onValuePress?.();
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_react.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.Pressable, {
      style: styles.row,
      testID: testID,
      disabled: !onPress,
      onPress: handlePress,
      accessibilityRole: onPress ? 'button' : undefined,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
        style: styles.topRow,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Text, {
          variant: "body/regular",
          style: styles.label,
          numberOfLines: 1,
          ellipsizeMode: "tail",
          children: label
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
          style: [styles.valueContainer, isValueNarrow ? styles.valueContainerNarrow : null],
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Pressable, {
            disabled: !onValuePress,
            hitSlop: VALUE_HIT_SLOP,
            onPress: handleValuePress,
            style: styles.valuePressable,
            testID: valueTestID,
            accessibilityRole: onValuePress ? 'button' : undefined,
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Text, {
              variant: "body/regular",
              color: "accent",
              align: "right",
              numberOfLines: VALUE_NUMBER_OF_LINES,
              children: value
            })
          })
        })]
      }), description ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Text, {
        variant: "caption/regular",
        color: "secondary",
        style: styles.description,
        children: description
      }) : null]
    }), !isLast ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
      style: styles.divider
    }) : null]
  });
};
exports.LabeledDetailRow = LabeledDetailRow;
//# sourceMappingURL=LabeledDetailRow.js.map