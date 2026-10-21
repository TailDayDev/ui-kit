"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InputClearButton = void 0;
var _react = require("react");
var _reactNative = require("react-native");
var _ClearInputIcon = require("../../icons/ClearInputIcon.js");
var _index = require("../../primitives/index.js");
var _jsxRuntime = require("react/jsx-runtime");
/** A touch that moves farther than this is a scroll, not a tap on the control. */
const TAP_MOVE_TOLERANCE = 10;

/**
 * The «×» control of a text field. It listens to raw touches, not the
 * responder system: with the keyboard up, a parent ScrollView
 * (keyboardShouldPersistTaps «never») captures every tap that is not on a
 * text input, so a Pressable here would only dismiss the keyboard. Raw touch
 * events still reach the control; a drag (scroll) does not clear.
 */
const InputClearButton = ({
  onClear,
  inputRef,
  style,
  testID,
  accessibilityLabel
}) => {
  const touchStartRef = (0, _react.useRef)(null);
  const clear = () => {
    onClear();
    inputRef?.current?.focus();
  };
  const handleTouchStart = event => {
    const {
      pageX,
      pageY
    } = event.nativeEvent;
    touchStartRef.current = {
      x: pageX,
      y: pageY
    };
  };
  const handleTouchEnd = event => {
    const start = touchStartRef.current;
    touchStartRef.current = null;
    if (!start) {
      return;
    }
    const {
      pageX,
      pageY
    } = event.nativeEvent;
    const isTap = Math.abs(pageX - start.x) <= TAP_MOVE_TOLERANCE && Math.abs(pageY - start.y) <= TAP_MOVE_TOLERANCE;
    if (isTap) {
      clear();
    }
  };
  const handleTouchCancel = () => {
    touchStartRef.current = null;
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View
  // A view with only touch handlers may be flattened into its parent, and
  // the touch would then target the parent instead of this control.
  , {
    collapsable: false,
    accessible: true,
    accessibilityRole: "button",
    accessibilityLabel: accessibilityLabel,
    onAccessibilityTap: clear,
    onTouchStart: handleTouchStart,
    onTouchEnd: handleTouchEnd,
    onTouchCancel: handleTouchCancel,
    style: style,
    testID: testID,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Icon, {
      icon: _ClearInputIcon.ClearInputIcon
    })
  });
};
exports.InputClearButton = InputClearButton;
//# sourceMappingURL=InputClearButton.js.map