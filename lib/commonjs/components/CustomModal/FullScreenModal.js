"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FullScreenModal = void 0;
var _react = require("react");
var _CustomModal = require("./CustomModal.js");
var _jsxRuntime = require("react/jsx-runtime");
/** A full-height CustomModal: no footer divider, the page does not scroll. */
const FullScreenModal = exports.FullScreenModal = /*#__PURE__*/(0, _react.forwardRef)(({
  visible,
  onClose,
  onDismissed,
  isLocked,
  title,
  header,
  footer,
  nestedOverlays,
  children,
  modalKey,
  handleBackBtn,
  headerStyles,
  closeAccessibilityLabel
}, ref) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_CustomModal.CustomModal, {
  ref: ref,
  closeAccessibilityLabel: closeAccessibilityLabel,
  modalKey: modalKey,
  title: title,
  onClose: onClose,
  onDismissed: onDismissed,
  isLocked: isLocked,
  divider: false,
  withoutContainerFooter: true,
  scrollEnabled: false,
  visible: visible,
  footer: footer,
  nestedOverlays: nestedOverlays,
  header: header,
  handleBackBtn: handleBackBtn,
  headerStyles: headerStyles,
  children: children
}));
FullScreenModal.displayName = 'FullScreenModal';
//# sourceMappingURL=FullScreenModal.js.map