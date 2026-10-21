"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TaskSheet = void 0;
var _reactNative = require("react-native");
var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
var _index = require("../CustomModal/index.js");
var _index2 = require("../ModalHeader/index.js");
var _index3 = require("../TaskSheetContent/index.js");
var _jsxRuntime = require("react/jsx-runtime");
const styles = _reactNative.StyleSheet.create({
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
const TaskSheet = ({
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
  const insets = (0, _reactNativeSafeAreaContext.useSafeAreaInsets)();
  const isBlocked = isLocked || isReplaced;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.CustomModal, {
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
    header: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index2.ModalHeader, {
      title: title,
      hasTitle: Boolean(title),
      onClose: onClose,
      closeAccessibilityLabel: closeAccessibilityLabel,
      isDisabled: isBlocked,
      closeTestID: closeTestID,
      style: styles.header
    }),
    nestedOverlays: nestedOverlays,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
      style: {
        paddingBottom: insets.bottom
      },
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index3.TaskSheetContent, {
        rows: rows,
        style: style,
        testID: testID
      })
    })
  });
};
exports.TaskSheet = TaskSheet;
//# sourceMappingURL=TaskSheet.js.map