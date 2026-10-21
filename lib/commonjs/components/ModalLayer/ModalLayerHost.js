"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ModalLayerHost = void 0;
var _react = require("react");
var _reactNative = require("react-native");
var _modalLayerBack = require("./modalLayerBack.js");
var _ModalLayerErrorBoundary = require("./ModalLayerErrorBoundary.js");
var _modalLayerPhase = require("./modalLayerPhase.js");
var _modalLayerStore = require("./modalLayerStore.js");
var _jsxRuntime = require("react/jsx-runtime");
/**
 * The single place where modal layers are drawn, above the app content.
 * Layers are plain views (no native windows), so a layer that is leaving or
 * gone can never hold touches: an empty stack renders nothing.
 */
const ModalLayerHost = () => {
  const layers = (0, _react.useSyncExternalStore)(_modalLayerStore.subscribeModalLayers, _modalLayerStore.getModalLayers, _modalLayerStore.getModalLayers);
  const isAnyLayerActive = (0, _modalLayerStore.isAnyModalLayerActive)(layers);

  // Subscribed when a modal opens, so it sits above every listener that was
  // there before (navigation, screens).
  (0, _react.useEffect)(() => {
    if (!isAnyLayerActive) {
      return undefined;
    }
    const subscription = (0, _modalLayerBack.addModalLayerBackListener)();
    return () => subscription.remove();
  }, [isAnyLayerActive]);
  const topLayerId = (0, _modalLayerStore.resolveTopModalLayerId)(layers);
  const layerViewsRef = (0, _react.useRef)(new Map());

  // A native modal window took screen-reader focus; a layer has to move it
  // itself, or focus stays on the content hidden below.
  (0, _react.useEffect)(() => {
    if (topLayerId === null) {
      return;
    }
    const layerView = layerViewsRef.current.get(topLayerId);
    // react-native-web has no sendAccessibilityEvent.
    if (layerView && typeof _reactNative.AccessibilityInfo.sendAccessibilityEvent === 'function') {
      _reactNative.AccessibilityInfo.sendAccessibilityEvent(layerView, 'focus');
    }
  }, [topLayerId]);
  if (layers.length === 0) {
    return null;
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
    pointerEvents: "box-none",
    style: _reactNative.StyleSheet.absoluteFill,
    children: layers.map(layer => {
      const isTop = layer.id === topLayerId;
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
        ref: view => {
          if (view) {
            layerViewsRef.current.set(layer.id, view);
            return;
          }
          layerViewsRef.current.delete(layer.id);
        }
        // Screen readers see only the top layer, like a native modal.
        ,
        accessibilityElementsHidden: !isTop,
        accessibilityViewIsModal: isTop,
        importantForAccessibility: isTop ? 'auto' : 'no-hide-descendants'
        // A leaving layer releases the screen at once, before it animates out.
        ,
        pointerEvents: (0, _modalLayerPhase.isModalLayerPhaseActive)(layer.phase) ? 'box-none' : 'none',
        style: _reactNative.StyleSheet.absoluteFill,
        testID: "modal-layer",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ModalLayerErrorBoundary.ModalLayerErrorBoundary, {
          onError: layer.onContentError,
          phase: layer.phase,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_react.Suspense, {
            fallback: null,
            children: layer.element
          })
        })
      }, layer.id);
    })
  });
};
exports.ModalLayerHost = ModalLayerHost;
//# sourceMappingURL=ModalLayerHost.js.map