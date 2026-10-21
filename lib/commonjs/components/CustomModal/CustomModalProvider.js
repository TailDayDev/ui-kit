"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CustomModalProvider = exports.CustomModalEnvironmentContext = void 0;
var _react = require("react");
var _jsxRuntime = require("react/jsx-runtime");
const CustomModalEnvironmentContext = exports.CustomModalEnvironmentContext = /*#__PURE__*/(0, _react.createContext)({});

/**
 * App wiring for every CustomModal below it: the modal registry (logout
 * teardown, close by key), presentation telemetry, the keyboard accessory
 * height and the default close label. Optional: without it modals still
 * work, they just report nothing.
 */
const CustomModalProvider = ({
  children,
  closeAccessibilityLabel,
  keyboardAccessoryHeight,
  onModalRendered,
  onPresentationStateChange
}) => {
  const environment = (0, _react.useMemo)(() => ({
    closeAccessibilityLabel,
    keyboardAccessoryHeight,
    onModalRendered,
    onPresentationStateChange
  }), [closeAccessibilityLabel, keyboardAccessoryHeight, onModalRendered, onPresentationStateChange]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(CustomModalEnvironmentContext.Provider, {
    value: environment,
    children: children
  });
};
exports.CustomModalProvider = CustomModalProvider;
//# sourceMappingURL=CustomModalProvider.js.map