"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConfirmationModal = void 0;
var _react = require("react");
var _reactNative = require("react-native");
var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
var _index = require("../../theme/index.js");
var _index2 = require("../Button/index.js");
var _index3 = require("../CustomModal/index.js");
var _jsxRuntime = require("react/jsx-runtime");
/**
 * Confirmation sheet: optional icon, title, description and a confirm +
 * cancel column. Figma: `ConfirmationModalContent`.
 */
const ConfirmationModal = ({
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
  const theme = (0, _index.useTheme)();
  const styles = (0, _index.useThemedStyles)(createStyles);
  const insets = (0, _reactNativeSafeAreaContext.useSafeAreaInsets)();
  const modalRef = (0, _react.useRef)(null);
  const [isConfirmLoading, setIsConfirmLoading] = (0, _react.useState)(false);
  const [isCancelLoading, setIsCancelLoading] = (0, _react.useState)(false);
  const [isActionFailed, setIsActionFailed] = (0, _react.useState)(false);
  // The handler may already have closed it (e.g. it moved a wizard on):
  // then no follow-up close request, which would reach a later state.
  const isVisibleRef = (0, _react.useRef)(isVisible);
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
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_index3.CustomModal, {
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
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      testID: testID,
      style: styles.modalContent,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
        style: styles.content,
        children: [prevChildren, icon ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
          style: styles.iconFrame,
          children: icon
        }) : null, /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
          style: styles.textWrapper,
          children: [title ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
            style: styles.title,
            children: title
          }) : null, children, description ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
            style: styles.description,
            children: description
          }) : null]
        })]
      }), isActionFailed ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
        style: styles.error,
        testID: "confirmation-modal-error",
        children: errorText
      }) : null, /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
        style: [styles.btns, {
          marginBottom: theme.space[4] + insets.bottom
        }],
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_index2.Button, {
          testID: confirmTestID,
          title: confirmText,
          onPress: handleConfirm,
          loading: isConfirmLoading,
          textStyle: confirmTextStyles,
          style: confirmStyles ? 'default' : 'danger',
          restStyle: [styles.btn, confirmStyles]
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index2.Button, {
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
exports.ConfirmationModal = ConfirmationModal;
const createStyles = theme => _reactNative.StyleSheet.create({
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