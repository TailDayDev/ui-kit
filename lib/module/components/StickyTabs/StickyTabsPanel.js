"use strict";

import { isValidElement } from 'react';
import { STICKY_TABS_PANEL_DISPLAY_NAME } from "./constants.js";
/**
 * Declarative tab definition. Parsed by {@link StickyTabs} and rendered through
 * {@link StickyTabsContent}; this component does not mount on its own.
 */
export const StickyTabsPanel = () => null;
StickyTabsPanel.displayName = STICKY_TABS_PANEL_DISPLAY_NAME;
export const isStickyTabsPanelElement = child => /*#__PURE__*/isValidElement(child) && child.type.displayName === STICKY_TABS_PANEL_DISPLAY_NAME;
//# sourceMappingURL=StickyTabsPanel.js.map