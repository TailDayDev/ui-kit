"use strict";

import { forwardRef } from 'react';
import { CustomModal } from "./CustomModal.js";
import { jsx as _jsx } from "react/jsx-runtime";
/** A full-height CustomModal: no footer divider, the page does not scroll. */
export const FullScreenModal = /*#__PURE__*/forwardRef(({
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
}, ref) => /*#__PURE__*/_jsx(CustomModal, {
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