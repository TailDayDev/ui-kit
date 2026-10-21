"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isStickyTabsPanelElement = exports.StickyTabsPanel = void 0;
var _react = require("react");
var _constants = require("./constants.js");
/**
 * Declarative tab definition. Parsed by {@link StickyTabs} and rendered through
 * {@link StickyTabsContent}; this component does not mount on its own.
 */
const StickyTabsPanel = () => null;
exports.StickyTabsPanel = StickyTabsPanel;
StickyTabsPanel.displayName = _constants.STICKY_TABS_PANEL_DISPLAY_NAME;
const isStickyTabsPanelElement = child => /*#__PURE__*/(0, _react.isValidElement)(child) && child.type.displayName === _constants.STICKY_TABS_PANEL_DISPLAY_NAME;
exports.isStickyTabsPanelElement = isStickyTabsPanelElement;
//# sourceMappingURL=StickyTabsPanel.js.map