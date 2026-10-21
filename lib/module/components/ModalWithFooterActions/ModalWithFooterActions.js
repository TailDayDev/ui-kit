"use strict";

import { StyleSheet, View } from 'react-native';
import { useThemedStyles } from "../../theme/index.js";
import { Button } from "../Button/index.js";
import { CustomModal } from "../CustomModal/index.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/** App footer bottom padding (off-scale: not in Figma Spacing). */
const FOOTER_ACTIONS_BOTTOM_PADDING = 14;

/**
 * CustomModal with a Cancel (`light`) + main action footer.
 * Figma: `CustomModalFooterActions` (row).
 */
export const ModalWithFooterActions = ({
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
  const styles = useThemedStyles(createStyles);
  return /*#__PURE__*/_jsx(CustomModal, {
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
    footer: /*#__PURE__*/_jsx(View, {
      style: [styles.footer, footerStyle],
      children: /*#__PURE__*/_jsxs(View, {
        style: [styles.footerActions, footerActionsStyle],
        children: [/*#__PURE__*/_jsx(Button, {
          title: secondaryTitle,
          onPress: onPressSecondary,
          style: "light",
          testID: secondaryButtonTestID
        }), /*#__PURE__*/_jsx(Button, {
          title: primaryTitle,
          onPress: onPressPrimary,
          disabled: isPrimaryDisabled,
          loading: isPrimaryLoading,
          style: primaryButtonStyle,
          testID: primaryButtonTestID
        })]
      })
    }),
    children: /*#__PURE__*/_jsx(View, {
      style: [styles.content, contentStyle],
      children: children
    })
  });
};
const createStyles = theme => StyleSheet.create({
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