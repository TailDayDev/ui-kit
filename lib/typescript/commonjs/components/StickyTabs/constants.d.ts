/** Default measured height before the sticky bar lays out. */
export declare const DEFAULT_STICKY_TABS_BAR_HEIGHT = 60;
/**
 * Matches SegmentedControl pill animation and BookingEventPetDetails header
 * collapse timing so bar, padding, and content stay in sync.
 */
export declare const STICKY_TABS_CONTENT_TRANSITION_MS = 250;
export declare const STICKY_TABS_PANEL_DISPLAY_NAME = "StickyTabs.Panel";
/** Suffix appended to tab button testID for panel content wrappers. */
export declare const STICKY_TABS_PANEL_TEST_ID_SUFFIX = ".panel";
export declare const getStickyTabsPanelTestID: (tabTestID: string) => string;
export declare const clampStickyTabIndex: (index: number, tabCount: number) => number;
//# sourceMappingURL=constants.d.ts.map