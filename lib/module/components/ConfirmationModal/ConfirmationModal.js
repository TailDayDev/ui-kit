"use strict";

import { useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme, useThemedStyles } from "../../theme/index.js";
import { Button } from "../Button/index.js";
import { CustomModal } from "../CustomModal/index.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * Confirmation sheet: optional icon, title, description and a confirm +
 * cancel column. Figma: `ConfirmationModalContent`.
 */
export const ConfirmationModal = ({
  icon,
  isVisible = false,
  title,
  description,
  confirmStyles,
  confirmTextStyles,
  closeStyles,
  children,
  prevChildren,
  onClose,
  onDismissed,
  onCancel,
  onConfirm,
  closeText,
  confirmText,
  errorText,
  modalKey,
  testID,
  confirmTestID,
  cancelTestID,
  closeOnSwipeDown = false
}) => {
  const theme = useTheme();
  const styles = useThemedStyles(createStyles);
  const insets = useSafeAreaInsets();
  const modalRef = useRef(null);
  const [isConfirmLoading, setIsConfirmLoading] = useState(false);
  const [isCancelLoading, setIsCancelLoading] = useState(false);
  const [isActionFailed, setIsActionFailed] = useState(false);
  // The handler may already have closed it (e.g. it moved a wizard on):
  // then no follow-up close request, which would reach a later state.
  const isVisibleRef = useRef(isVisible);
  isVisibleRef.current = isVisible;
  const handleConfirm = async () => {
    try {
      setIsActionFailed(false);
      setIsConfirmLoading(true);
      const response = await onConfirm();
      if (response !== false && isVisibleRef.current) {
        modalRef.current?.close();
      }
    } catch {
      console.warn('confirm changes error');
      // Stays open: the owner may retry.
      setIsActionFailed(true);
    } finally {
      setIsConfirmLoading(false);
    }
  };
  const handleCancel = async () => {
    try {
      setIsActionFailed(false);
      setIsCancelLoading(true);
      const response = onCancel ? await onCancel() : undefined;
      if (response !== false && isVisibleRef.current) {
        modalRef.current?.close();
      }
    } catch {
      console.warn('cancel changes error');
      setIsActionFailed(true);
    } finally {
      setIsCancelLoading(false);
    }
  };
  return /*#__PURE__*/_jsx(CustomModal, {
    visible: isVisible,
    ref: modalRef,
    modalKey: `ConfirmationModal${modalKey}`,
    title: "",
    onClose: onClose,
    isLocked: isConfirmLoading || isCancelLoading,
    onDismissed: onDismissed,
    divider: false,
    autoHeight: true,
    avoidKeyboard: true,
    closeOnSwipeDown: closeOnSwipeDown,
    children: /*#__PURE__*/_jsxs(View, {
      testID: testID,
      style: styles.modalContent,
      children: [/*#__PURE__*/_jsxs(View, {
        style: styles.content,
        children: [prevChildren, icon ? /*#__PURE__*/_jsx(View, {
          style: styles.iconFrame,
          children: icon
        }) : null, /*#__PURE__*/_jsxs(View, {
          style: styles.textWrapper,
          children: [title ? /*#__PURE__*/_jsx(Text, {
            style: styles.title,
            children: title
          }) : null, children, description ? /*#__PURE__*/_jsx(Text, {
            style: styles.description,
            children: description
          }) : null]
        })]
      }), isActionFailed ? /*#__PURE__*/_jsx(Text, {
        style: styles.error,
        testID: "confirmation-modal-error",
        children: errorText
      }) : null, /*#__PURE__*/_jsxs(View, {
        style: [styles.btns, {
          marginBottom: theme.space[4] + insets.bottom
        }],
        children: [/*#__PURE__*/_jsx(Button, {
          testID: confirmTestID,
          title: confirmText,
          onPress: handleConfirm,
          loading: isConfirmLoading,
          textStyle: confirmTextStyles,
          style: confirmStyles ? 'default' : 'danger',
          restStyle: [styles.btn, confirmStyles]
        }), /*#__PURE__*/_jsx(Button, {
          testID: cancelTestID,
          style: "light",
          restStyle: [styles.btn, closeStyles],
          textStyle: closeStyles,
          title: closeText,
          onPress: handleCancel,
          loading: isCancelLoading
        })]
      })]
    })
  });
};
const createStyles = theme => StyleSheet.create({
  btn: {
    width: '100%'
  },
  // marginBottom (space[4] + bottom inset) is added at render.
  btns: {
    gap: theme.space[4],
    width: '100%'
  },
  content: {
    alignItems: 'center',
    flex: 1,
    gap: theme.space[8]
  },
  description: {
    ...theme.typography.caption.regular,
    color: theme.colors.text.secondary,
    textAlign: 'center'
  },
  error: {
    ...theme.typography.caption.regular,
    color: theme.colors.text.error,
    textAlign: 'center'
  },
  iconFrame: {
    borderRadius: theme.radius.sm,
    overflow: 'hidden'
  },
  modalContent: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: theme.space[6],
    width: '100%',
    gap: theme.space[14]
  },
  textWrapper: {
    alignItems: 'center',
    gap: theme.space[2],
    justifyContent: 'center'
  },
  title: {
    ...theme.typography.title.bold,
    color: theme.colors.text.primary,
    textAlign: 'center'
  }
});
//# sourceMappingURL=ConfirmationModal.js.map