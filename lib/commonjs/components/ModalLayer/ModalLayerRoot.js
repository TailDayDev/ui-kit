"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ModalLayerRoot = void 0;
var _itsFine = require("its-fine");
var _react = require("react");
var _reactNative = require("react-native");
var _reactNativeGestureHandler = require("react-native-gesture-handler");
var _ModalLayerBackground = require("./ModalLayerBackground.js");
var _ModalLayerHost = require("./ModalLayerHost.js");
var _ModalLayerMotionContext = require("./ModalLayerMotionContext.js");
var _modalLayerStore = require("./modalLayerStore.js");
var _jsxRuntime = require("react/jsx-runtime");
const handleRootLayout = event => {
  const {
    width,
    height
  } = event.nativeEvent.layout;
  (0, _modalLayerStore.setModalLayerFrame)({
    width,
    height
  });
};

/** The OS «Reduce motion» setting: modals then open and close at once. */
const useIsReduceMotionEnabled = () => {
  const [isEnabled, setIsEnabled] = (0, _react.useState)(false);
  (0, _react.useEffect)(() => {
    let isCurrent = true;
    _reactNative.AccessibilityInfo.isReduceMotionEnabled().then(nextIsEnabled => {
      if (isCurrent) {
        setIsEnabled(nextIsEnabled);
      }
    }).catch(() => undefined);
    const subscription = _reactNative.AccessibilityInfo.addEventListener('reduceMotionChanged', setIsEnabled);
    return () => {
      isCurrent = false;
      subscription.remove();
    };
  }, []);
  return isEnabled;
};

/**
 * Everything modal layers need, in one place for the app and Storybook:
 * the fiber root the context bridge reads, the content under the layers and
 * the host above it. Mount it once, outside any loading gate, so a modal
 * shown at any moment has a host.
 *
 * The gesture root covers the layers too: they sit outside the navigator,
 * whose stack brings its own root, so gesture-handler gestures and scroll
 * views inside modal content would otherwise get no native root.
 */
const ModalLayerRoot = ({
  children,
  overlay
}) => {
  const isReducedMotion = useIsReduceMotionEnabled();
  const motion = (0, _react.useMemo)(() => ({
    isReducedMotion
  }), [isReducedMotion]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeGestureHandler.GestureHandlerRootView, {
    onLayout: handleRootLayout,
    style: styles.root,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ModalLayerMotionContext.ModalLayerMotionContext.Provider, {
      value: motion,
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_itsFine.FiberProvider, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_ModalLayerBackground.ModalLayerBackground, {
          children: children
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ModalLayerHost.ModalLayerHost, {}), overlay]
      })
    })
  });
};
exports.ModalLayerRoot = ModalLayerRoot;
const styles = _reactNative.StyleSheet.create({
  root: {
    flex: 1
  }
});
//# sourceMappingURL=ModalLayerRoot.js.map