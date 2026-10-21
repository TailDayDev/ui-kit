"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ModalLayerBackground = void 0;
var _react = require("react");
var _reactNative = require("react-native");
var _modalLayerStore = require("./modalLayerStore.js");
var _jsxRuntime = require("react/jsx-runtime");
const getIsCovered = () => (0, _modalLayerStore.isAnyModalLayerActive)((0, _modalLayerStore.getModalLayers)());

/**
 * Wraps the app content under the modal layers. While a modal is entering or
 * open, screen readers skip this content, as they did under a native modal
 * window; touches are already blocked by the layer itself.
 */
const ModalLayerBackground = ({
  children
}) => {
  const isCovered = (0, _react.useSyncExternalStore)(_modalLayerStore.subscribeModalLayers, getIsCovered, getIsCovered);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
    accessibilityElementsHidden: isCovered,
    importantForAccessibility: isCovered ? 'no-hide-descendants' : 'auto',
    style: styles.fill,
    testID: "modal-layer-background",
    children: children
  });
};
exports.ModalLayerBackground = ModalLayerBackground;
const styles = _reactNative.StyleSheet.create({
  fill: {
    flex: 1
  }
});
//# sourceMappingURL=ModalLayerBackground.js.map