"use strict";

import { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { jsx as _jsx } from "react/jsx-runtime";
const styles = StyleSheet.create({
  // DinamicImage frame: square, clips its content.
  frame: {
    overflow: 'hidden',
    position: 'relative'
  }
});
const NoImagePlaceholderComponent = ({
  color,
  size = '100%',
  renderImage,
  accessibilityLabel,
  testID
}) => {
  const isDecorative = !accessibilityLabel;
  return /*#__PURE__*/_jsx(View, {
    style: [styles.frame, {
      width: size,
      height: size
    }],
    testID: testID,
    accessible: !isDecorative,
    accessibilityRole: isDecorative ? undefined : 'image',
    accessibilityLabel: accessibilityLabel,
    accessibilityElementsHidden: isDecorative,
    importantForAccessibility: isDecorative ? 'no-hide-descendants' : 'auto',
    children: renderImage?.({
      size,
      color
    })
  });
};

/** Square "no image" frame; the artwork comes from `renderImage`. */
export const NoImagePlaceholder = /*#__PURE__*/memo(NoImagePlaceholderComponent);
//# sourceMappingURL=NoImagePlaceholder.js.map