"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resetKeyboardTrackingForTests = exports.readOpenKeyboardMetrics = void 0;
var _reactNative = require("react-native");
/**
 * `Keyboard.metrics()` changes only on the did-events, so between
 * `keyboardWillHide` and `keyboardDidHide` it still reports a keyboard that
 * is already leaving. This tracks that window app-wide.
 */
let isKeyboardHiding = false;
let isTracking = false;
const startKeyboardTracking = () => {
  if (isTracking) {
    return;
  }
  isTracking = true;
  _reactNative.Keyboard.addListener('keyboardWillHide', () => {
    isKeyboardHiding = true;
  });
  const settle = () => {
    isKeyboardHiding = false;
  };
  _reactNative.Keyboard.addListener('keyboardWillShow', settle);
  _reactNative.Keyboard.addListener('keyboardDidShow', settle);
  _reactNative.Keyboard.addListener('keyboardDidHide', settle);
};

/** The keyboard that is up now, or undefined when none or it is leaving. */
const readOpenKeyboardMetrics = () => {
  startKeyboardTracking();
  // react-native-web has no Keyboard.metrics.
  if (isKeyboardHiding || typeof _reactNative.Keyboard.metrics !== 'function') {
    return undefined;
  }
  return _reactNative.Keyboard.metrics();
};

/** Tests only: forget the tracked state and subscriptions. */
exports.readOpenKeyboardMetrics = readOpenKeyboardMetrics;
const resetKeyboardTrackingForTests = () => {
  isKeyboardHiding = false;
  isTracking = false;
};
exports.resetKeyboardTrackingForTests = resetKeyboardTrackingForTests;
//# sourceMappingURL=keyboardTracking.js.map