"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getStickyTabsPanelTestID = exports.clampStickyTabIndex = exports.STICKY_TABS_PANEL_TEST_ID_SUFFIX = exports.STICKY_TABS_PANEL_DISPLAY_NAME = exports.STICKY_TABS_CONTENT_TRANSITION_MS = exports.DEFAULT_STICKY_TABS_BAR_HEIGHT = void 0;
/** Default measured height before the sticky bar lays out. */
const DEFAULT_STICKY_TABS_BAR_HEIGHT = exports.DEFAULT_STICKY_TABS_BAR_HEIGHT = 60;

/**
 * Matches SegmentedControl pill animation and BookingEventPetDetails header
 * collapse timing so bar, padding, and content stay in sync.
 */
const STICKY_TABS_CONTENT_TRANSITION_MS = exports.STICKY_TABS_CONTENT_TRANSITION_MS = 250;
const STICKY_TABS_PANEL_DISPLAY_NAME = exports.STICKY_TABS_PANEL_DISPLAY_NAME = 'StickyTabs.Panel';

/** Suffix appended to tab button testID for panel content wrappers. */
const STICKY_TABS_PANEL_TEST_ID_SUFFIX = exports.STICKY_TABS_PANEL_TEST_ID_SUFFIX = '.panel';
const getStickyTabsPanelTestID = tabTestID => `${tabTestID}${STICKY_TABS_PANEL_TEST_ID_SUFFIX}`;
exports.getStickyTabsPanelTestID = getStickyTabsPanelTestID;
const clampStickyTabIndex = (index, tabCount) => {
  if (tabCount <= 0) {
    return 0;
  }
  return Math.max(0, Math.min(index, tabCount - 1));
};
exports.clampStickyTabIndex = clampStickyTabIndex;
//# sourceMappingURL=constants.js.map