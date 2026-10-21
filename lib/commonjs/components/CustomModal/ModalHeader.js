"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ModalHeader = void 0;
var _reactNative = require("react-native");
var _ChevronLeftIcon = require("../../icons/ChevronLeftIcon.js");
var _CloseIcon = require("../../icons/CloseIcon.js");
var _index = require("../../theme/index.js");
var _index2 = require("../IconButton/index.js");
var _CustomModalConstants = require("./CustomModal.constants.js");
var _jsxRuntime = require("react/jsx-runtime");
/** Back tap area beyond the button (app value). */
const BACK_HIT_SLOP = 4;
/** The default header: back (pages), title, close. */
const ModalHeader = ({
  styles,
  title,
  titleOpacity,
  onBack,
  onClose,
  isDisabled,
  closeTestID,
  closeAccessibilityLabel
}) => {
  const theme = (0, _index.useTheme)();
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [onBack ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
      accessibilityRole: "button",
      disabled: isDisabled,
      hitSlop: BACK_HIT_SLOP,
      onPress: onBack,
      style: styles.backButton,
      testID: "custom-modal-back",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ChevronLeftIcon.ChevronLeftIcon, {
        color: theme.colors.icon.default,
        size: _CustomModalConstants.HEADER_GLYPH_SIZE
      })
    }) : null, title ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Animated.Text, {
      ellipsizeMode: "tail",
      numberOfLines: 1,
      style: [styles.title, {
        opacity: titleOpacity
      }],
      children: title
    }) : null, /*#__PURE__*/(0, _jsxRuntime.jsx)(_index2.IconRoundButton, {
      accessibilityLabel: closeAccessibilityLabel,
      disabled: isDisabled,
      icon: /*#__PURE__*/(0, _jsxRuntime.jsx)(_CloseIcon.CloseIcon, {
        color: theme.colors.icon.default,
        size: _CustomModalConstants.HEADER_GLYPH_SIZE
      }),
      onPress: onClose,
      size: _CustomModalConstants.HEADER_BUTTON_SIZE,
      style: styles.closeButton,
      testID: closeTestID
    })]
  });
};
exports.ModalHeader = ModalHeader;
//# sourceMappingURL=ModalHeader.js.map