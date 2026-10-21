"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toModalPages = exports.ModalPages = void 0;
var _react = require("react");
var _reactNative = require("react-native");
var _CustomModalStyles = require("./CustomModal.styles.js");
var _jsxRuntime = require("react/jsx-runtime");
const resolvePageKey = (page, index) => /*#__PURE__*/(0, _react.isValidElement)(page) && page.key != null ? page.key : index;

/** The pages of a modal: every direct child of `children` is one. */
const toModalPages = children => _react.Children.toArray(children);

/** The modal's pages side by side; the active one is slid into view. */
exports.toModalPages = toModalPages;
const ModalPages = ({
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
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Animated.View, {
    style: [_CustomModalStyles.layoutStyles.pagesRow, {
      width: pageWidth * pages.length,
      transform: [{
        translateX: slideAnim
      }]
    }, isAutoHeight ? {
      maxHeight: contentMaxHeight
    } : _CustomModalStyles.layoutStyles.fill],
    children: pages.map((page, index) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
      style: {
        width: pageWidth
      },
      children: pageHost === 'view' ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
        style: [styles.scrollContainer, isAutoHeight ? _CustomModalStyles.layoutStyles.noGrow : _CustomModalStyles.layoutStyles.fill],
        children: page
      }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.ScrollView, {
        contentContainerStyle: [styles.scrollContainer, isAutoHeight && _CustomModalStyles.layoutStyles.noGrow, !isScrollEnabled && !isAutoHeight && _CustomModalStyles.layoutStyles.fill, isScrollEnabled && scrollContentPaddingBottom > 0 && {
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
exports.ModalPages = ModalPages;
//# sourceMappingURL=ModalPages.js.map