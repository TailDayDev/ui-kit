"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ModalWithFooterActions = void 0;
var _reactNative = require("react-native");
var _index = require("../../theme/index.js");
var _index2 = require("../Button/index.js");
var _index3 = require("../CustomModal/index.js");
var _jsxRuntime = require("react/jsx-runtime");
/** App footer bottom padding (off-scale: not in Figma Spacing). */
const FOOTER_ACTIONS_BOTTOM_PADDING = 14;

/**
 * CustomModal with a Cancel (`light`) + main action footer.
 * Figma: `CustomModalFooterActions` (row).
 */
const ModalWithFooterActions = ({
  children,
  modalKey,
  onClose,
  onPressPrimary,
  onPressSecondary,
  primaryTitle,
  secondaryTitle,
  title,
  visible,
  autoHeight = false,
  contentStyle,
  footerActionsStyle,
  footerStyle,
  handleBackBtn,
  isPrimaryDisabled = false,
  isPrimaryLoading = false,
  isLocked = false,
  modalRef,
  onDismissed,
  primaryButtonStyle,
  primaryButtonTestID,
  secondaryButtonTestID,
  scrollEnabled = false,
  pageHost,
  nestedOverlays
}) => {
  const styles = (0, _index.useThemedStyles)(createStyles);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_index3.CustomModal, {
    ref: modalRef,
    modalKey: modalKey,
    visible: visible,
    onClose: onClose,
    isLocked: isLocked,
    onDismissed: onDismissed,
    divider: false,
    autoHeight: autoHeight,
    withoutContainerFooter: true,
    scrollEnabled: scrollEnabled,
    pageHost: pageHost,
    nestedOverlays: nestedOverlays,
    title: title,
    handleBackBtn: handleBackBtn,
    footer: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
      style: [styles.footer, footerStyle],
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
        style: [styles.footerActions, footerActionsStyle],
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_index2.Button, {
          title: secondaryTitle,
          onPress: onPressSecondary,
          style: "light",
          testID: secondaryButtonTestID
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index2.Button, {
          title: primaryTitle,
          onPress: onPressPrimary,
          disabled: isPrimaryDisabled,
          loading: isPrimaryLoading,
          style: primaryButtonStyle,
          testID: primaryButtonTestID
        })]
      })
    }),
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
      style: [styles.content, contentStyle],
      children: children
    })
  });
};
exports.ModalWithFooterActions = ModalWithFooterActions;
const createStyles = theme => _reactNative.StyleSheet.create({
  content: {
    flex: 1
  },
  footer: {
    backgroundColor: theme.colors.bg.surface,
    borderTopColor: theme.colors.border.default,
    borderTopWidth: theme.stroke[1],
    paddingTop: theme.space[4]
  },
  footerActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: theme.space[6],
    paddingBottom: FOOTER_ACTIONS_BOTTOM_PADDING
  }
});
//# sourceMappingURL=ModalWithFooterActions.js.map