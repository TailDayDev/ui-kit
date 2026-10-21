"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlatformWheel = void 0;
var _reactNative = require("react-native");
var _AndroidWheelCore = require("./AndroidWheelCore.js");
var _IosWheelCore = require("./IosWheelCore.js");
var _jsxRuntime = require("react/jsx-runtime");
/**
 * The JS wheel on Android (and on iOS with a selection band); the native
 * wheel on iOS otherwise.
 */
const PlatformWheel = props => {
  if (_reactNative.Platform.OS === 'android' || props.selectionIndicatorStyle) {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_AndroidWheelCore.AndroidWheelCore, {
      ...props
    });
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_IosWheelCore.IosWheelCore, {
    ...props
  });
};
exports.PlatformWheel = PlatformWheel;
//# sourceMappingURL=PlatformWheel.js.map