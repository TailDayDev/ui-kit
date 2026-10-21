"use strict";

import { StyleSheet, View } from 'react-native';
import { Text } from "../../primitives/Text/index.js";
import { useThemedStyles } from "../../theme/index.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Figma ConfirmationModalContent › Картинка: 100×100 (off-scale).
const ILLUSTRATION_SIZE = 100;
const createStyles = theme => StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: theme.space[8],
    paddingBottom: theme.space[6],
    paddingHorizontal: theme.space[6]
  },
  illustration: {
    alignItems: 'center',
    borderRadius: theme.radius.sm,
    height: ILLUSTRATION_SIZE,
    justifyContent: 'center',
    overflow: 'hidden',
    width: ILLUSTRATION_SIZE
  },
  texts: {
    alignItems: 'center',
    alignSelf: 'stretch',
    gap: theme.space[2]
  },
  text: {
    alignSelf: 'stretch'
  }
});

/**
 * Body of a confirmation sheet (Figma `ConfirmationModalContent`): a 100pt
 * picture, the question and an optional explanation, all centered.
 */
export const ConfirmationModalContent = ({
  title,
  description,
  hasDescription = true,
  illustration,
  style,
  testID
}) => {
  const styles = useThemedStyles(createStyles);
  const isDescriptionVisible = hasDescription && Boolean(description);
  return /*#__PURE__*/_jsxs(View, {
    style: [styles.container, style],
    testID: testID,
    children: [illustration ? /*#__PURE__*/_jsx(View, {
      style: styles.illustration,
      children: illustration
    }) : null, /*#__PURE__*/_jsxs(View, {
      style: styles.texts,
      children: [/*#__PURE__*/_jsx(Text, {
        accessibilityRole: "header",
        align: "center",
        style: styles.text,
        variant: "title/bold",
        children: title
      }), isDescriptionVisible ? /*#__PURE__*/_jsx(Text, {
        align: "center",
        color: "secondary",
        style: styles.text,
        variant: "caption/regular",
        children: description
      }) : null]
    })]
  });
};
//# sourceMappingURL=ConfirmationModalContent.js.map