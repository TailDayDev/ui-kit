"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditPercentageModal = void 0;
var _react = require("react");
var _reactNative = require("react-native");
var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
var _index = require("../../theme/index.js");
var _index2 = require("../Button/index.js");
var _index3 = require("../CustomModal/index.js");
var _index4 = require("../PercentageValueField/index.js");
var _jsxRuntime = require("react/jsx-runtime");
/** App content bottom padding (off-scale: not in Figma Spacing). */
const CONTENT_BOTTOM_PADDING = 80;
/** App description width. */
const DESCRIPTION_MAX_WIDTH = 204;
const closeWithoutConfirmation = (_hasChanges, onConfirm) => onConfirm();

/** Sheet with a percentage field and a Cancel / Save footer. */
const EditPercentageModal = ({
  onConfirm,
  onClose,
  isVisible,
  onDismissed,
  title,
  defaultValue = 0,
  description,
  isSaving = false,
  cancelTitle,
  saveTitle,
  renderSlider,
  requestConfirmation = closeWithoutConfirmation,
  nestedOverlays
}) => {
  const theme = (0, _index.useTheme)();
  const styles = (0, _index.useThemedStyles)(createStyles);
  const insets = (0, _reactNativeSafeAreaContext.useSafeAreaInsets)();
  const [value, setValue] = (0, _react.useState)(defaultValue ?? 0);
  (0, _react.useEffect)(() => {
    // Seed on open only; the leaving sheet keeps its value.
    if (isVisible) {
      setValue(defaultValue ?? 0);
    }
  }, [title, defaultValue, isVisible]);
  const hasChanges = (0, _react.useMemo)(() => defaultValue !== value, [defaultValue, value]);

  // Close request (X, backdrop, Cancel): refused while a save is in flight;
  // with changes the discard confirmation closes it once confirmed.
  const handleCloseRequest = () => {
    if (isSaving) {
      return;
    }
    requestConfirmation(hasChanges, onClose);
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_index3.CustomModal, {
    modalKey: "EditPercentageModal",
    isLocked: isSaving,
    nestedOverlays: nestedOverlays,
    autoHeight: true,
    avoidKeyboard: true,
    divider: false,
    withoutContainerFooter: true,
    title: title ?? '',
    visible: isVisible,
    onDismissed: onDismissed,
    onClose: handleCloseRequest,
    footer: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      style: [styles.controlWrapper, {
        paddingBottom: insets.bottom + theme.space[4]
      }],
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_index2.Button, {
        style: "light",
        onPress: handleCloseRequest,
        title: cancelTitle
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index2.Button, {
        onPress: () => {
          // The owner shows the error; a rejection must not go unhandled.
          void Promise.resolve(onConfirm(value)).catch(() => undefined);
        },
        disabled: !hasChanges || isSaving,
        loading: isSaving,
        title: saveTitle
      })]
    }),
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      style: styles.modalContent,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_index4.PercentageValueField, {
        value: value,
        onChange: setValue,
        renderSlider: renderSlider
      }), description ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
        style: styles.modalDescription,
        children: description
      }) : null]
    })
  });
};
exports.EditPercentageModal = EditPercentageModal;
const createStyles = theme => _reactNative.StyleSheet.create({
  // paddingBottom (bottom inset + space[4]) is added at render.
  controlWrapper: {
    borderColor: theme.colors.border.default,
    borderTopWidth: theme.stroke[1],
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: theme.space[6],
    paddingTop: theme.space[4],
    width: '100%'
  },
  modalContent: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: theme.space[10],
    paddingBottom: CONTENT_BOTTOM_PADDING
  },
  modalDescription: {
    ...theme.typography.caption.regular,
    color: theme.colors.text.secondary,
    marginBottom: theme.space[12],
    maxWidth: DESCRIPTION_MAX_WIDTH,
    textAlign: 'center'
  }
});
//# sourceMappingURL=EditPercentageModal.js.map