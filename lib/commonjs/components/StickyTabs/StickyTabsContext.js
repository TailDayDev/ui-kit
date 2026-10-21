"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useStickyTabsContext = exports.useStickyTabsBarContext = exports.StickyTabsProvider = exports.StickyTabsBarProvider = void 0;
var _react = require("react");
const StickyTabsContext = /*#__PURE__*/(0, _react.createContext)(null);
const StickyTabsBarContext = /*#__PURE__*/(0, _react.createContext)(null);
const StickyTabsProvider = exports.StickyTabsProvider = StickyTabsContext.Provider;
const StickyTabsBarProvider = exports.StickyTabsBarProvider = StickyTabsBarContext.Provider;
const useStickyTabsContext = () => {
  const context = (0, _react.useContext)(StickyTabsContext);
  if (!context) {
    throw new Error('StickyTabs subcomponents must be rendered inside <StickyTabs>.');
  }
  return context;
};
exports.useStickyTabsContext = useStickyTabsContext;
const useStickyTabsBarContext = () => {
  const context = (0, _react.useContext)(StickyTabsBarContext);
  if (!context) {
    throw new Error('StickyTabs subcomponents must be rendered inside <StickyTabs>.');
  }
  return context;
};
exports.useStickyTabsBarContext = useStickyTabsBarContext;
//# sourceMappingURL=StickyTabsContext.js.map