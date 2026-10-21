"use strict";

import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CustomModal } from "../CustomModal/index.js";
import { ModalHeader } from "../ModalHeader/index.js";
import { TaskSheetContent } from "../TaskSheetContent/index.js";
import { jsx as _jsx } from "react/jsx-runtime";
const styles = StyleSheet.create({
  // CustomModal's header row keeps its 60pt height; the kit ModalHeader
  // brings its own Figma padding (12/12/12/56), so the row adds none.
  headerRow: {
    paddingHorizontal: 0,
    paddingVertical: 0
  },
  header: {
    flex: 1
  },
  replaced: {
    opacity: 0
  }
});

/**
 * Task actions sheet (Figma `TaskSheet`): bottom sheet with a close-only
 * `ModalHeader` and `TaskSheetContent` rows. Figma `hasFooter=false`, so there
 * is no footer; the "Полоска дома" frame is the device safe area.
 */
export const TaskSheet = ({
  isVisible,
  onClose,
  onDismissed,
  rows,
  closeAccessibilityLabel,
  title,
  isLocked = false,
  isReplaced = false,
  nestedOverlays,
  modalKey,
  closeTestID,
  style,
  testID
}) => {
  const insets = useSafeAreaInsets();
  const isBlocked = isLocked || isReplaced;
  return /*#__PURE__*/_jsx(CustomModal, {
    visible: isVisible,
    onClose: onClose,
    onDismissed: onDismissed,
    isLocked: isBlocked,
    autoHeight: true,
    closeOnBackdropPress: true,
    withBackdrop: !isReplaced,
    containerStyles: isReplaced ? styles.replaced : undefined,
    contentTopPadding: 0,
    divider: false,
    modalKey: modalKey,
    closeAccessibilityLabel: closeAccessibilityLabel,
    headerStyles: styles.headerRow,
    header: /*#__PURE__*/_jsx(ModalHeader, {
      title: title,
      hasTitle: Boolean(title),
      onClose: onClose,
      closeAccessibilityLabel: closeAccessibilityLabel,
      isDisabled: isBlocked,
      closeTestID: closeTestID,
      style: styles.header
    }),
    nestedOverlays: nestedOverlays,
    children: /*#__PURE__*/_jsx(View, {
      style: {
        paddingBottom: insets.bottom
      },
      children: /*#__PURE__*/_jsx(TaskSheetContent, {
        rows: rows,
        style: style,
        testID: testID
      })
    })
  });
};
//# sourceMappingURL=TaskSheet.js.map