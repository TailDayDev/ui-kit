"use strict";

import { KEYBOARD_FOOTER_GAP } from "../CustomModal.constants.js";
export const resolveModalFooterBottomPadding = ({
  grab,
  isKeyboardLifted,
  keyboardOverlap,
  safeAreaBottom
}) => {
  if (isKeyboardLifted && keyboardOverlap > 0) {
    return keyboardOverlap + KEYBOARD_FOOTER_GAP;
  }
  return grab + safeAreaBottom;
};
//# sourceMappingURL=resolveModalFooterBottomPadding.js.map