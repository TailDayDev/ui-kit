"use strict";

import { Animated, TouchableOpacity } from 'react-native';
import { ChevronLeftIcon } from "../../icons/ChevronLeftIcon.js";
import { CloseIcon } from "../../icons/CloseIcon.js";
import { useTheme } from "../../theme/index.js";
import { IconRoundButton } from "../IconButton/index.js";
import { HEADER_BUTTON_SIZE, HEADER_GLYPH_SIZE } from "./CustomModal.constants.js";
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
/** Back tap area beyond the button (app value). */
const BACK_HIT_SLOP = 4;
/** The default header: back (pages), title, close. */
export const ModalHeader = ({
  styles,
  title,
  titleOpacity,
  onBack,
  onClose,
  isDisabled,
  closeTestID,
  closeAccessibilityLabel
}) => {
  const theme = useTheme();
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [onBack ? /*#__PURE__*/_jsx(TouchableOpacity, {
      accessibilityRole: "button",
      disabled: isDisabled,
      hitSlop: BACK_HIT_SLOP,
      onPress: onBack,
      style: styles.backButton,
      testID: "custom-modal-back",
      children: /*#__PURE__*/_jsx(ChevronLeftIcon, {
        color: theme.colors.icon.default,
        size: HEADER_GLYPH_SIZE
      })
    }) : null, title ? /*#__PURE__*/_jsx(Animated.Text, {
      ellipsizeMode: "tail",
      numberOfLines: 1,
      style: [styles.title, {
        opacity: titleOpacity
      }],
      children: title
    }) : null, /*#__PURE__*/_jsx(IconRoundButton, {
      accessibilityLabel: closeAccessibilityLabel,
      disabled: isDisabled,
      icon: /*#__PURE__*/_jsx(CloseIcon, {
        color: theme.colors.icon.default,
        size: HEADER_GLYPH_SIZE
      }),
      onPress: onClose,
      size: HEADER_BUTTON_SIZE,
      style: styles.closeButton,
      testID: closeTestID
    })]
  });
};
//# sourceMappingURL=ModalHeader.js.map