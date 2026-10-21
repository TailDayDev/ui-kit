"use strict";

import { View } from 'react-native';
import { useStickyTabsContext } from "./StickyTabsContext.js";

/**
 * Reserve vertical space inside a ScrollView for the sticky overlay bar.
 */
import { jsx as _jsx } from "react/jsx-runtime";
export const StickyTabsSpacer = () => {
  const {
    barHeight
  } = useStickyTabsContext();
  return /*#__PURE__*/_jsx(View, {
    style: {
      height: barHeight
    }
  });
};
//# sourceMappingURL=StickyTabsSpacer.js.map