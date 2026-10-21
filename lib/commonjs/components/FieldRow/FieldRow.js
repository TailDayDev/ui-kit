"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FieldRow = void 0;
var _react = require("react");
var _reactNative = require("react-native");
var _ChevronDownIcon = require("../../icons/ChevronDownIcon.js");
var _CloseIcon = require("../../icons/CloseIcon.js");
var _index = require("../../primitives/Icon/index.js");
var _index2 = require("../../primitives/Text/index.js");
var _index3 = require("../../theme/index.js");
var _jsxRuntime = require("react/jsx-runtime");
// off-scale: the app row presses to 0.7, not the kit `opacity.pressed` (0.85).
const ROW_PRESSED_OPACITY = 0.7;
/** A static row does not react to touches. */
const STATIC_OPACITY = 1;
/** Round action button (app `rowAction`, 28pt circle). */
const ACTION_SIZE = 28;
/** Chevron / clear glyph size. */
const ACTION_ICON_SIZE = 20;
/** Icon slot width (Figma icon frame). */
const ICON_SLOT_WIDTH = 24;
/** Extra touch area around the round action. */
const ACTION_HIT_SLOP = 8;
const createStyles = theme => _reactNative.StyleSheet.create({
  row: {
    alignItems: 'center',
    borderColor: theme.colors.border.default,
    borderRadius: theme.radius.sm,
    borderWidth: theme.stroke[1],
    flexDirection: 'row',
    gap: theme.space[2],
    justifyContent: 'space-between',
    padding: theme.space[3]
  },
  rowAction: {
    alignItems: 'center',
    backgroundColor: theme.colors.bg.subtle,
    borderRadius: ACTION_SIZE / 2,
    height: ACTION_SIZE,
    justifyContent: 'center',
    width: ACTION_SIZE
  },
  rowContent: {
    alignItems: 'center',
    flexDirection: 'row',
    flexShrink: 1,
    gap: theme.space[2]
  },
  rowError: {
    borderColor: theme.colors.text.error
  },
  rowIcon: {
    alignItems: 'center',
    width: ICON_SLOT_WIDTH
  },
  rowValue: {
    flexShrink: 1
  }
});

/**
 * Picker-style form row (Figma `FieldRow`): icon and label on the left, value
 * and a round chevron (or clear ×) on the right.
 */
const FieldRow = ({
  icon = null,
  label,
  value,
  isEmpty = false,
  isError = false,
  onPress,
  onClear,
  showAction = true,
  restValueStyle,
  style,
  testID,
  accessibilityLabel,
  actionAccessibilityLabel,
  actionTestID
}) => {
  const styles = (0, _index3.useThemedStyles)(createStyles);
  const isInteractive = Boolean(onPress);
  const canPressAction = isInteractive || Boolean(onClear);
  const handleRowPress = (0, _react.useCallback)(() => {
    onPress?.();
  }, [onPress]);
  const handleActionPress = (0, _react.useCallback)(event => {
    event.stopPropagation();
    const action = onClear ?? onPress;
    action?.();
  }, [onClear, onPress]);
  const valueColor = isError ? 'error' : isEmpty ? 'secondary' : 'accent';
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.TouchableOpacity, {
    testID: testID,
    style: [styles.row, isError ? styles.rowError : null, style],
    onPress: handleRowPress,
    disabled: !isInteractive,
    activeOpacity: isInteractive ? ROW_PRESSED_OPACITY : STATIC_OPACITY,
    accessibilityRole: isInteractive ? 'button' : undefined,
    accessibilityLabel: accessibilityLabel,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      style: styles.rowContent,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
        style: styles.rowIcon,
        children: icon
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index2.Text, {
        variant: "body/regular",
        children: label
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      style: styles.rowContent,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_index2.Text, {
        variant: "body/medium",
        color: valueColor,
        align: "right",
        style: [styles.rowValue, restValueStyle],
        children: value
      }), showAction ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
        style: styles.rowAction,
        onPress: handleActionPress,
        hitSlop: ACTION_HIT_SLOP,
        disabled: !canPressAction,
        accessibilityRole: canPressAction ? 'button' : undefined,
        accessibilityLabel: actionAccessibilityLabel,
        testID: actionTestID,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Icon, {
          icon: onClear ? _CloseIcon.CloseIcon : _ChevronDownIcon.ChevronDownIcon,
          size: ACTION_ICON_SIZE
        })
      }) : null]
    })]
  });
};
exports.FieldRow = FieldRow;
//# sourceMappingURL=FieldRow.js.map