import { useSyncExternalStore } from 'react';
import { StyleSheet, View } from 'react-native';

import type { ModalLayerBackgroundProps } from './ModalLayer.types';
import {
  getModalLayers,
  isAnyModalLayerActive,
  subscribeModalLayers,
} from './modalLayerStore';

const getIsCovered = () => isAnyModalLayerActive(getModalLayers());

/**
 * Wraps the app content under the modal layers. While a modal is entering or
 * open, screen readers skip this content, as they did under a native modal
 * window; touches are already blocked by the layer itself.
 */
export const ModalLayerBackground = ({
  children,
}: ModalLayerBackgroundProps) => {
  const isCovered = useSyncExternalStore(
    subscribeModalLayers,
    getIsCovered,
    getIsCovered,
  );

  return (
    <View
      accessibilityElementsHidden={isCovered}
      importantForAccessibility={isCovered ? 'no-hide-descendants' : 'auto'}
      style={styles.fill}
      testID="modal-layer-background"
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  fill: { flex: 1 },
});
