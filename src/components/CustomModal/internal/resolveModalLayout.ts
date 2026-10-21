import {
  CUSTOM_FOOTER_BOTTOM_PADDING,
  FOOTER_BOTTOM_PADDING,
  FOOTER_HEIGHT,
  MODAL_LAYER_HEIGHT_STEP,
} from '../CustomModal.constants';
import { resolveModalFooterBottomPadding } from './resolveModalFooterBottomPadding';

export interface IModalLayoutParams {
  /** Height of the area the layers are drawn in. */
  screenHeight: number;
  topInset: number;
  bottomInset: number;
  /** Open layers below this one: each pushes the sheet down a step. */
  layerIndex: number;
  modalTopOffset?: number;
  modalHeight?: number;
  isAutoHeight: boolean;
  hasFooter: boolean;
  isWithoutContainerFooter: boolean;
  footerBottomPadding?: number;
  /** The keyboard height covering the sheet (0 when hidden). */
  keyboardHeight: number;
  keyboardInsetBottomOffset: number;
  isAvoidingKeyboard: boolean;
  isFooterLiftedOnKeyboard: boolean;
  isAdjustingScrollContent: boolean;
  platform: string;
}

export interface IModalLayout {
  topOffset: number;
  /** Space from the top offset to the bottom of the area. */
  availableHeight: number;
  sheetHeight: number;
  /** Height left for the pages under the footer. */
  contentMaxHeight: number;
  contentPaddingBottom: number;
  footerPaddingBottom: number;
  isFooterLiftedForKeyboard: boolean;
  scrollContentPaddingBottom: number;
  scrollContentInsetBottom: number;
}

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
  platform,
}: IModalLayoutParams): IModalLayout => {
  const isKeyboardShown = keyboardHeight > 0;
  const topOffset =
    modalTopOffset ?? topInset + layerIndex * MODAL_LAYER_HEIGHT_STEP;
  const availableHeight = Math.max(screenHeight - topOffset, 0);
  const sheetHeight = Math.min(modalHeight ?? availableHeight, availableHeight);
  const isFullHeight = !isAutoHeight && sheetHeight === availableHeight;

  const isFooterLiftedForKeyboard =
    hasFooter &&
    !isFullHeight &&
    (isFooterLiftedOnKeyboard || isAvoidingKeyboard) &&
    isKeyboardShown;

  // Without a footer, an avoiding sheet pads its content above the keyboard.
  const keyboardInsetHeight = isKeyboardShown
    ? Math.max(keyboardHeight - bottomInset, 0)
    : 0;
  const contentPaddingBottom =
    isAvoidingKeyboard && !hasFooter && keyboardInsetHeight > 0
      ? keyboardInsetHeight + keyboardInsetBottomOffset
      : 0;

  const scrollContentKeyboardOffset = isKeyboardShown
    ? isFooterLiftedForKeyboard
      ? keyboardInsetBottomOffset
      : keyboardHeight + keyboardInsetBottomOffset
    : 0;

  const footerPaddingBottom = hasFooter
    ? resolveModalFooterBottomPadding({
        grab:
          footerBottomPadding ??
          (isWithoutContainerFooter
            ? CUSTOM_FOOTER_BOTTOM_PADDING
            : FOOTER_BOTTOM_PADDING),
        isKeyboardLifted: isFooterLiftedForKeyboard,
        keyboardOverlap: keyboardHeight,
        safeAreaBottom: bottomInset,
      })
    : 0;
  const footerReservedHeight = hasFooter
    ? FOOTER_HEIGHT + footerPaddingBottom
    : 0;

  return {
    topOffset,
    availableHeight,
    sheetHeight,
    contentMaxHeight: Math.max(sheetHeight - footerReservedHeight, 0),
    contentPaddingBottom,
    footerPaddingBottom,
    isFooterLiftedForKeyboard,
    // Android pads the scroll content; iOS uses the content inset.
    scrollContentPaddingBottom:
      isAdjustingScrollContent && platform === 'android'
        ? scrollContentKeyboardOffset
        : 0,
    scrollContentInsetBottom:
      isAdjustingScrollContent && platform === 'ios'
        ? scrollContentKeyboardOffset
        : 0,
  };
};
