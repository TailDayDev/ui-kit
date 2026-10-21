"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StickyTabsSpacer = void 0;
var _reactNative = require("react-native");
var _StickyTabsContext = require("./StickyTabsContext.js");
var _jsxRuntime = require("react/jsx-runtime");
/**
 * Reserve vertical space inside a ScrollView for the sticky overlay bar.
 */
const StickyTabsSpacer = () => {
  const {
    barHeight
  } = (0, _StickyTabsContext.useStickyTabsContext)();
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
    style: {
      height: barHeight
    }
  });
};
exports.StickyTabsSpacer = StickyTabsSpacer;
//# sourceMappingURL=StickyTabsSpacer.js.map