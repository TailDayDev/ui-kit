"use strict";

import { useSyncExternalStore } from 'react';
import { StyleSheet, View } from 'react-native';
import { getModalLayers, isAnyModalLayerActive, subscribeModalLayers } from "./modalLayerStore.js";
import { jsx as _jsx } from "react/jsx-runtime";
const getIsCovered = () => isAnyModalLayerActive(getModalLayers());

/**
 * Wraps the app content under the modal layers. While a modal is entering or
 * open, screen readers skip this content, as they did under a native modal
 * window; touches are already blocked by the layer itself.
 */
export const ModalLayerBackground = ({
  children
}) => {
  const isCovered = useSyncExternalStore(subscribeModalLayers, getIsCovered, getIsCovered);
  return /*#__PURE__*/_jsx(View, {
    accessibilityElementsHidden: isCovered,
    importantForAccessibility: isCovered ? 'no-hide-descendants' : 'auto',
    style: styles.fill,
    testID: "modal-layer-background",
    children: children
  });
};
const styles = StyleSheet.create({
  fill: {
    flex: 1
  }
});
//# sourceMappingURL=ModalLayerBackground.js.map