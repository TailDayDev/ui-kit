import { Suspense, useEffect, useRef, useSyncExternalStore } from 'react';
import { AccessibilityInfo, StyleSheet, View } from 'react-native';

import { addModalLayerBackListener } from './modalLayerBack';
import { ModalLayerErrorBoundary } from './ModalLayerErrorBoundary';
import { isModalLayerPhaseActive } from './modalLayerPhase';
import {
  getModalLayers,
  isAnyModalLayerActive,
  resolveTopModalLayerId,
  subscribeModalLayers,
} from './modalLayerStore';

/**
 * The single place where modal layers are drawn, above the app content.
 * Layers are plain views (no native windows), so a layer that is leaving or
 * gone can never hold touches: an empty stack renders nothing.
 */
export const ModalLayerHost = () => {
  const layers = useSyncExternalStore(
    subscribeModalLayers,
    getModalLayers,
    getModalLayers,
  );

  const isAnyLayerActive = isAnyModalLayerActive(layers);

  // Subscribed when a modal opens, so it sits above every listener that was
  // there before (navigation, screens).
  useEffect(() => {
    if (!isAnyLayerActive) {
      return undefined;
    }
    const subscription = addModalLayerBackListener();
    return () => subscription.remove();
  }, [isAnyLayerActive]);

  const topLayerId = resolveTopModalLayerId(layers);
  const layerViewsRef = useRef(new Map<string, View>());

  // A native modal window took screen-reader focus; a layer has to move it
  // itself, or focus stays on the content hidden below.
  useEffect(() => {
    if (topLayerId === null) {
      return;
    }
    const layerView = layerViewsRef.current.get(topLayerId);
    // react-native-web has no sendAccessibilityEvent.
    if (
      layerView &&
      typeof AccessibilityInfo.sendAccessibilityEvent === 'function'
    ) {
      AccessibilityInfo.sendAccessibilityEvent(layerView, 'focus');
    }
  }, [topLayerId]);

  if (layers.length === 0) {
    return null;
  }

  return (
    <View pointerEvents="box-none" style={StyleSheet.absoluteFill}>
      {layers.map(layer => {
        const isTop = layer.id === topLayerId;

        return (
          <View
            key={layer.id}
            ref={view => {
              if (view) {
                layerViewsRef.current.set(layer.id, view);
                return;
              }
              layerViewsRef.current.delete(layer.id);
            }}
            // Screen readers see only the top layer, like a native modal.
            accessibilityElementsHidden={!isTop}
            accessibilityViewIsModal={isTop}
            importantForAccessibility={isTop ? 'auto' : 'no-hide-descendants'}
            // A leaving layer releases the screen at once, before it animates out.
            pointerEvents={
              isModalLayerPhaseActive(layer.phase) ? 'box-none' : 'none'
            }
            style={StyleSheet.absoluteFill}
            testID="modal-layer"
          >
            <ModalLayerErrorBoundary
              onError={layer.onContentError}
              phase={layer.phase}
            >
              {/* Content that suspends waits in its own layer instead of
                  hiding the app tree above the host. */}
              <Suspense fallback={null}>{layer.element}</Suspense>
            </ModalLayerErrorBoundary>
          </View>
        );
      })}
    </View>
  );
};
