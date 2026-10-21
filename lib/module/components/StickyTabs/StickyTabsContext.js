"use strict";

import { createContext, useContext } from 'react';
const StickyTabsContext = /*#__PURE__*/createContext(null);
const StickyTabsBarContext = /*#__PURE__*/createContext(null);
export const StickyTabsProvider = StickyTabsContext.Provider;
export const StickyTabsBarProvider = StickyTabsBarContext.Provider;
export const useStickyTabsContext = () => {
  const context = useContext(StickyTabsContext);
  if (!context) {
    throw new Error('StickyTabs subcomponents must be rendered inside <StickyTabs>.');
  }
  return context;
};
export const useStickyTabsBarContext = () => {
  const context = useContext(StickyTabsBarContext);
  if (!context) {
    throw new Error('StickyTabs subcomponents must be rendered inside <StickyTabs>.');
  }
  return context;
};
//# sourceMappingURL=StickyTabsContext.js.map