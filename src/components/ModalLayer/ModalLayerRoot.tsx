import { FiberProvider } from 'its-fine';
import { useEffect, useMemo, useState } from 'react';
import {
  AccessibilityInfo,
  StyleSheet,
  type LayoutChangeEvent,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import type { ModalLayerRootProps } from './ModalLayer.types';
import { ModalLayerBackground } from './ModalLayerBackground';
import { ModalLayerHost } from './ModalLayerHost';
import { ModalLayerMotionContext } from './ModalLayerMotionContext';
import { setModalLayerFrame } from './modalLayerStore';

const handleRootLayout = (event: LayoutChangeEvent) => {
  const { width, height } = event.nativeEvent.layout;
  setModalLayerFrame({ width, height });
};

/** The OS «Reduce motion» setting: modals then open and close at once. */
const useIsReduceMotionEnabled = () => {
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    let isCurrent = true;
    AccessibilityInfo.isReduceMotionEnabled()
      .then(nextIsEnabled => {
        if (isCurrent) {
          setIsEnabled(nextIsEnabled);
        }
      })
      .catch(() => undefined);
    const subscription = AccessibilityInfo.addEventListener(
      'reduceMotionChanged',
      setIsEnabled,
    );

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
export const ModalLayerRoot = ({ children, overlay }: ModalLayerRootProps) => {
  const isReducedMotion = useIsReduceMotionEnabled();
  const motion = useMemo(() => ({ isReducedMotion }), [isReducedMotion]);

  return (
    <GestureHandlerRootView onLayout={handleRootLayout} style={styles.root}>
      <ModalLayerMotionContext.Provider value={motion}>
        <FiberProvider>
          <ModalLayerBackground>{children}</ModalLayerBackground>
          <ModalLayerHost />
          {overlay}
        </FiberProvider>
      </ModalLayerMotionContext.Provider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1 },
});
