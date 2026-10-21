"use strict";

import { FiberProvider } from 'its-fine';
import { useEffect, useMemo, useState } from 'react';
import { AccessibilityInfo, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ModalLayerBackground } from "./ModalLayerBackground.js";
import { ModalLayerHost } from "./ModalLayerHost.js";
import { ModalLayerMotionContext } from "./ModalLayerMotionContext.js";
import { setModalLayerFrame } from "./modalLayerStore.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const handleRootLayout = event => {
  const {
    width,
    height
  } = event.nativeEvent.layout;
  setModalLayerFrame({
    width,
    height
  });
};

/** The OS «Reduce motion» setting: modals then open and close at once. */
const useIsReduceMotionEnabled = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  useEffect(() => {
    let isCurrent = true;
    AccessibilityInfo.isReduceMotionEnabled().then(nextIsEnabled => {
      if (isCurrent) {
        setIsEnabled(nextIsEnabled);
      }
    }).catch(() => undefined);
    const subscription = AccessibilityInfo.addEventListener('reduceMotionChanged', setIsEnabled);
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
export const ModalLayerRoot = ({
  children,
  overlay
}) => {
  const isReducedMotion = useIsReduceMotionEnabled();
  const motion = useMemo(() => ({
    isReducedMotion
  }), [isReducedMotion]);
  return /*#__PURE__*/_jsx(GestureHandlerRootView, {
    onLayout: handleRootLayout,
    style: styles.root,
    children: /*#__PURE__*/_jsx(ModalLayerMotionContext.Provider, {
      value: motion,
      children: /*#__PURE__*/_jsxs(FiberProvider, {
        children: [/*#__PURE__*/_jsx(ModalLayerBackground, {
          children: children
        }), /*#__PURE__*/_jsx(ModalLayerHost, {}), overlay]
      })
    })
  });
};
const styles = StyleSheet.create({
  root: {
    flex: 1
  }
});
//# sourceMappingURL=ModalLayerRoot.js.map