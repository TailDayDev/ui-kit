/** Default measured height before the sticky bar lays out. */
export const DEFAULT_STICKY_TABS_BAR_HEIGHT = 60;

/**
 * Matches SegmentedControl pill animation and BookingEventPetDetails header
 * collapse timing so bar, padding, and content stay in sync.
 */
export const STICKY_TABS_CONTENT_TRANSITION_MS = 250;

export const STICKY_TABS_PANEL_DISPLAY_NAME = 'StickyTabs.Panel';

/** Suffix appended to tab button testID for panel content wrappers. */
export const STICKY_TABS_PANEL_TEST_ID_SUFFIX = '.panel';

export const getStickyTabsPanelTestID = (tabTestID: string): string =>
  `${tabTestID}${STICKY_TABS_PANEL_TEST_ID_SUFFIX}`;

export const clampStickyTabIndex = (
  index: number,
  tabCount: number,
): number => {
  if (tabCount <= 0) {
    return 0;
  }

  return Math.max(0, Math.min(index, tabCount - 1));
};
