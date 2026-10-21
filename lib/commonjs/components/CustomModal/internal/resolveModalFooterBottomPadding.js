"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolveModalFooterBottomPadding = void 0;
var _CustomModalConstants = require("../CustomModal.constants.js");
const resolveModalFooterBottomPadding = ({
  grab,
  isKeyboardLifted,
  keyboardOverlap,
  safeAreaBottom
}) => {
  if (isKeyboardLifted && keyboardOverlap > 0) {
    return keyboardOverlap + _CustomModalConstants.KEYBOARD_FOOTER_GAP;
  }
  return grab + safeAreaBottom;
};
exports.resolveModalFooterBottomPadding = resolveModalFooterBottomPadding;
//# sourceMappingURL=resolveModalFooterBottomPadding.js.map