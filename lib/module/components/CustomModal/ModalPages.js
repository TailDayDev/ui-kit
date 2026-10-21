"use strict";

import { Children, isValidElement } from 'react';
import { Animated, ScrollView, View } from 'react-native';
import { layoutStyles } from "./CustomModal.styles.js";
import { jsx as _jsx } from "react/jsx-runtime";
const resolvePageKey = (page, index) => /*#__PURE__*/isValidElement(page) && page.key != null ? page.key : index;

/** The pages of a modal: every direct child of `children` is one. */
export const toModalPages = children => Children.toArray(children);

/** The modal's pages side by side; the active one is slid into view. */
export const ModalPages = ({
  pages,
  pageWidth,
  slideAnim,
  activeIndex,
  styles,
  pageHost,
  isAutoHeight,
  contentMaxHeight,
  isScrollEnabled,
  scrollRef,
  isKeyboardDismissInteractive,
  scrollContentPaddingBottom,
  scrollContentInsetBottom
}) => {
  const scrollInset = {
    bottom: isScrollEnabled ? scrollContentInsetBottom : 0,
    left: 0,
    right: 0,
    top: 0
  };
  return /*#__PURE__*/_jsx(Animated.View, {
    style: [layoutStyles.pagesRow, {
      width: pageWidth * pages.length,
      transform: [{
        translateX: slideAnim
      }]
    }, isAutoHeight ? {
      maxHeight: contentMaxHeight
    } : layoutStyles.fill],
    children: pages.map((page, index) => /*#__PURE__*/_jsx(View, {
      style: {
        width: pageWidth
      },
      children: pageHost === 'view' ? /*#__PURE__*/_jsx(View, {
        style: [styles.scrollContainer, isAutoHeight ? layoutStyles.noGrow : layoutStyles.fill],
        children: page
      }) : /*#__PURE__*/_jsx(ScrollView, {
        contentContainerStyle: [styles.scrollContainer, isAutoHeight && layoutStyles.noGrow, !isScrollEnabled && !isAutoHeight && layoutStyles.fill, isScrollEnabled && scrollContentPaddingBottom > 0 && {
          minHeight: contentMaxHeight + scrollContentPaddingBottom,
          paddingBottom: scrollContentPaddingBottom
        }],
        contentInset: scrollInset,
        keyboardDismissMode: isScrollEnabled && isKeyboardDismissInteractive ? 'interactive' : 'none',
        keyboardShouldPersistTaps: "handled",
        ref: isScrollEnabled && index === activeIndex ? scrollRef : undefined,
        scrollEnabled: isScrollEnabled,
        scrollIndicatorInsets: scrollInset,
        testID: "custom-modal-page-scroll",
        children: page
      })
    }, resolvePageKey(page, index)))
  });
};
//# sourceMappingURL=ModalPages.js.map