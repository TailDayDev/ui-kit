"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useModalLayerFrame = void 0;
var _react = require("react");
var _reactNative = require("react-native");
var _modalLayerStore = require("./modalLayerStore.js");
/**
 * Size of the area modal layers are drawn in. A native modal window covered
 * the whole screen; the host covers the app's root view, which on Android
 * can exclude the status and navigation bars. Falls back to the window
 * before the root has been measured (and in tests).
 */
const useModalLayerFrame = () => {
  const window = (0, _reactNative.useWindowDimensions)();
  const frame = (0, _react.useSyncExternalStore)(_modalLayerStore.subscribeModalLayerFrame, _modalLayerStore.getModalLayerFrame, _modalLayerStore.getModalLayerFrame);
  return frame ?? {
    width: window.width,
    height: window.height
  };
};
exports.useModalLayerFrame = useModalLayerFrame;
//# sourceMappingURL=useModalLayerFrame.js.map