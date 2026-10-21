"use strict";

import { StyleSheet, View } from 'react-native';
import { IconX } from "../../icons/figma/index.js";
import { Icon } from "../../primitives/Icon/index.js";
import { Text } from "../../primitives/Text/index.js";
import { useThemedStyles } from "../../theme/index.js";
import { IconRoundButton } from "../IconButton/index.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Figma ModalHeader › CloseButton: IconRoundButton size=36.
const CLOSE_BUTTON_SIZE = 36;
// Figma ModalHeader › CloseButton › x: 20×20.
const CLOSE_GLYPH_SIZE = 20;
const createStyles = theme => StyleSheet.create({
  header: {
    alignItems: 'center',
    backgroundColor: theme.colors.bg.surface,
    borderTopLeftRadius: theme.radius.xl,
    borderTopRightRadius: theme.radius.xl,
    flexDirection: 'row',
    gap: theme.space[2],
    justifyContent: 'flex-end',
    // Left 56 = close button (36) + gap (8) + right padding (12): keeps the title centered.
    paddingBottom: theme.space[3],
    paddingLeft: theme.space[14],
    paddingRight: theme.space[3],
    paddingTop: theme.space[3]
  },
  title: {
    flex: 1
  }
});

/** Bottom-sheet header (Figma `ModalHeader`): centered title, round × on the right. */
export const ModalHeader = ({
  title,
  hasTitle = true,
  onClose,
  closeAccessibilityLabel,
  isDisabled = false,
  closeTestID,
  style,
  testID
}) => {
  const styles = useThemedStyles(createStyles);
  const isTitleVisible = hasTitle && Boolean(title);
  return /*#__PURE__*/_jsxs(View, {
    style: [styles.header, style],
    testID: testID,
    children: [isTitleVisible ? /*#__PURE__*/_jsx(Text, {
      accessibilityRole: "header",
      align: "center",
      ellipsizeMode: "tail",
      numberOfLines: 1,
      style: styles.title,
      variant: "headline/bold",
      children: title
    }) : null, /*#__PURE__*/_jsx(IconRoundButton, {
      accessibilityLabel: closeAccessibilityLabel,
      disabled: isDisabled,
      icon: /*#__PURE__*/_jsx(Icon, {
        icon: IconX,
        size: CLOSE_GLYPH_SIZE
      }),
      onPress: onClose,
      size: CLOSE_BUTTON_SIZE,
      testID: closeTestID
    })]
  });
};
//# sourceMappingURL=ModalHeader.js.map