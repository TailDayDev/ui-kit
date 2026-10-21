"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolveModalLayout = void 0;
var _CustomModalConstants = require("../CustomModal.constants.js");
var _resolveModalFooterBottomPadding = require("./resolveModalFooterBottomPadding.js");
/** Sizes and keyboard offsets of a CustomModal sheet. Pure: no hooks. */
const resolveModalLayout = ({
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
  const topOffset = modalTopOffset ?? topInset + layerIndex * _CustomModalConstants.MODAL_LAYER_HEIGHT_STEP;
  const availableHeight = Math.max(screenHeight - topOffset, 0);
  const sheetHeight = Math.min(modalHeight ?? availableHeight, availableHeight);
  const isFullHeight = !isAutoHeight && sheetHeight === availableHeight;
  const isFooterLiftedForKeyboard = hasFooter && !isFullHeight && (isFooterLiftedOnKeyboard || isAvoidingKeyboard) && isKeyboardShown;

  // Without a footer, an avoiding sheet pads its content above the keyboard.
  const keyboardInsetHeight = isKeyboardShown ? Math.max(keyboardHeight - bottomInset, 0) : 0;
  const contentPaddingBottom = isAvoidingKeyboard && !hasFooter && keyboardInsetHeight > 0 ? keyboardInsetHeight + keyboardInsetBottomOffset : 0;
  const scrollContentKeyboardOffset = isKeyboardShown ? isFooterLiftedForKeyboard ? keyboardInsetBottomOffset : keyboardHeight + keyboardInsetBottomOffset : 0;
  const footerPaddingBottom = hasFooter ? (0, _resolveModalFooterBottomPadding.resolveModalFooterBottomPadding)({
    grab: footerBottomPadding ?? (isWithoutContainerFooter ? _CustomModalConstants.CUSTOM_FOOTER_BOTTOM_PADDING : _CustomModalConstants.FOOTER_BOTTOM_PADDING),
    isKeyboardLifted: isFooterLiftedForKeyboard,
    keyboardOverlap: keyboardHeight,
    safeAreaBottom: bottomInset
  }) : 0;
  const footerReservedHeight = hasFooter ? _CustomModalConstants.FOOTER_HEIGHT + footerPaddingBottom : 0;
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
exports.resolveModalLayout = resolveModalLayout;
//# sourceMappingURL=resolveModalLayout.js.map