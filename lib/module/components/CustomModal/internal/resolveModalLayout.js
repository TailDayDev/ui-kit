"use strict";

import { CUSTOM_FOOTER_BOTTOM_PADDING, FOOTER_BOTTOM_PADDING, FOOTER_HEIGHT, MODAL_LAYER_HEIGHT_STEP } from "../CustomModal.constants.js";
import { resolveModalFooterBottomPadding } from "./resolveModalFooterBottomPadding.js";
/** Sizes and keyboard offsets of a CustomModal sheet. Pure: no hooks. */
export const resolveModalLayout = ({
  screenHeight,
  topInset,
  bottomInset,
  layerIndex,
  modalTopOffset,
  modalHeight,
  isAutoHeight,
  hasFooter,
  isWithoutContainerFooter,
  footerBottomPadding,
  keyboardHeight,
  keyboardInsetBottomOffset,
  isAvoidingKeyboard,
  isFooterLiftedOnKeyboard,
  isAdjustingScrollContent,
  platform
}) => {
  const isKeyboardShown = keyboardHeight > 0;
  const topOffset = modalTopOffset ?? topInset + layerIndex * MODAL_LAYER_HEIGHT_STEP;
  const availableHeight = Math.max(screenHeight - topOffset, 0);
  const sheetHeight = Math.min(modalHeight ?? availableHeight, availableHeight);
  const isFullHeight = !isAutoHeight && sheetHeight === availableHeight;
  const isFooterLiftedForKeyboard = hasFooter && !isFullHeight && (isFooterLiftedOnKeyboard || isAvoidingKeyboard) && isKeyboardShown;

  // Without a footer, an avoiding sheet pads its content above the keyboard.
  const keyboardInsetHeight = isKeyboardShown ? Math.max(keyboardHeight - bottomInset, 0) : 0;
  const contentPaddingBottom = isAvoidingKeyboard && !hasFooter && keyboardInsetHeight > 0 ? keyboardInsetHeight + keyboardInsetBottomOffset : 0;
  const scrollContentKeyboardOffset = isKeyboardShown ? isFooterLiftedForKeyboard ? keyboardInsetBottomOffset : keyboardHeight + keyboardInsetBottomOffset : 0;
  const footerPaddingBottom = hasFooter ? resolveModalFooterBottomPadding({
    grab: footerBottomPadding ?? (isWithoutContainerFooter ? CUSTOM_FOOTER_BOTTOM_PADDING : FOOTER_BOTTOM_PADDING),
    isKeyboardLifted: isFooterLiftedForKeyboard,
    keyboardOverlap: keyboardHeight,
    safeAreaBottom: bottomInset
  }) : 0;
  const footerReservedHeight = hasFooter ? FOOTER_HEIGHT + footerPaddingBottom : 0;
  return {
    topOffset,
    availableHeight,
    sheetHeight,
    contentMaxHeight: Math.max(sheetHeight - footerReservedHeight, 0),
    contentPaddingBottom,
    footerPaddingBottom,
    isFooterLiftedForKeyboard,
    // Android pads the scroll content; iOS uses the content inset.
    scrollContentPaddingBottom: isAdjustingScrollContent && platform === 'android' ? scrollContentKeyboardOffset : 0,
    scrollContentInsetBottom: isAdjustingScrollContent && platform === 'ios' ? scrollContentKeyboardOffset : 0
  };
};
//# sourceMappingURL=resolveModalLayout.js.map