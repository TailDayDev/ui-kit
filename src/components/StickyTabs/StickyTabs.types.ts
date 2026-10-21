import type { ReactNode } from 'react';
import type { Animated, StyleProp, ViewStyle } from 'react-native';
import type { AnimatedStyle } from 'react-native-reanimated';

/**
 * How tab panels are mounted and shown:
 *
 * - `active-only` — only the active panel is mounted; optional delayed swap via
 *   `contentTransitionMs` (BookingEventPetDetails).
 * - `keep-mounted-hidden` — all visited or `keepMounted` panels stay mounted and
 *   inactive ones use `display: 'none'` (BookingEventDetails / state preservation).
 * - `keep-mounted-stacked` — retained panels share a fixed viewport; inactive
 *   panels stay laid out and switch through opacity/pointer ownership only.
 * - `immediate` — active panel only, no transition delay.
 */
export type StickyTabsContentMode =
  'active-only' | 'keep-mounted-hidden' | 'keep-mounted-stacked' | 'immediate';

/**
 * - `sticky-overlay` — absolute positioned bar above scroll content
 *   (BookingEventDetails, ClientProfile).
 * - `inline` — bar rendered in normal layout flow (Daycare edit, modals).
 */
export type StickyTabsBarMode = 'sticky-overlay' | 'inline';

/** One parsed `StickyTabs.Panel`. */
export interface StickyTabsPanelConfig {
  /** Panel body. */
  children: ReactNode;
  /** Keep mounted from the start in `keep-mounted-*` modes. */
  keepMounted?: boolean;
  /** Tab label. */
  label: string;
  /** In `keep-mounted-*` modes, do not mount before the first visit. */
  lazy?: boolean;
  /** Tab button testID; the panel wrapper uses `${testID}.panel`. */
  testID: string;
  /** Light content shown while the `active-only` delayed swap waits. */
  transitionShell?: ReactNode;
}

/** Sticky overlay bar placement shared by `StickyTabs.Bar`. */
export interface StickyTabsStickyBarConfig {
  /** Reanimated style (e.g. header collapse translate). */
  animatedStyle?: AnimatedStyle<ViewStyle>;
  /** Bar wrapper style. */
  style?: StyleProp<ViewStyle>;
  /** Drive the pill from `scrollX`. Defaults to `true`. */
  syncWithScroll?: boolean;
  /** Bar `top` offset. */
  top: number;
}

/** Full state shared with `StickyTabs` subcomponents (`useStickyTabsContext`). */
export interface StickyTabsContextValue {
  barHeight: number;
  barMode: StickyTabsBarMode;
  barStyle?: StyleProp<ViewStyle>;
  contentIndex: number;
  contentMode: StickyTabsContentMode;
  contentTransitionMs: number;
  contentWidth: number;
  handleBarLayout: (height: number) => void;
  handleContentWidthChange: (width: number) => void;
  handleSelectedIndexChange: (nextIndex: number) => void;
  isContentSynced: boolean;
  labels: string[];
  lastSyncedContentHeight: number;
  panelTestIDs: string[];
  panels: StickyTabsPanelConfig[];
  preserveContentHeightDuringTransition: boolean;
  scrollX: Animated.Value;
  selectedIndex: number;
  setLastSyncedContentHeight: (height: number) => void;
  stickyBar?: StickyTabsStickyBarConfig;
  tabTestIDs: string[];
  testID?: string;
  visitedTabIndexes: ReadonlySet<number>;
}

/** Narrow slice for the bar, so content-only changes do not re-render it. */
export type StickyTabsBarContextValue = Pick<
  StickyTabsContextValue,
  | 'barMode'
  | 'barStyle'
  | 'contentWidth'
  | 'handleBarLayout'
  | 'handleSelectedIndexChange'
  | 'labels'
  | 'scrollX'
  | 'selectedIndex'
  | 'stickyBar'
  | 'tabTestIDs'
  | 'testID'
>;

export interface StickyTabsProps {
  /** Bar placement. Defaults to `'sticky-overlay'`. */
  barMode?: StickyTabsBarMode;
  /** Base bar style. */
  barStyle?: StyleProp<ViewStyle>;
  /** `StickyTabs.Panel` definitions plus the layout (Bar, Content, Spacer, scroll views). */
  children: ReactNode;
  /** Panel mounting strategy. Defaults to `'immediate'`. */
  contentMode?: StickyTabsContentMode;
  /** `active-only` content swap delay in ms. Defaults to 250. */
  contentTransitionMs?: number;
  /** Controlled content width (otherwise measured by `StickyTabs.Content`). */
  contentWidth?: number;
  /** Initial tab when uncontrolled. Defaults to 0. */
  defaultSelectedIndex?: number;
  /** Called with the measured bar height. */
  onBarLayout?: (height: number) => void;
  /** Called before a user tab change. */
  onBeforeTabChange?: (previousIndex: number, nextIndex: number) => void;
  /** Called with the measured content width. */
  onContentWidthChange?: (width: number) => void;
  /** Called with the new tab index (user change or clamp after panels change). */
  onSelectedIndexChange?: (index: number) => void;
  /** Keep the last content height while the delayed swap runs. Defaults to `true`. */
  preserveContentHeightDuringTransition?: boolean;
  /** Controlled horizontal offset (RN Animated) the pill follows. */
  scrollX?: Animated.Value;
  /** Controlled tab index. */
  selectedIndex?: number;
  /** Sticky overlay bar placement. */
  stickyBar?: StickyTabsStickyBarConfig;
  /** Bar test identifier. */
  testID?: string;
}

export interface StickyTabsPanelProps {
  /** Panel body. */
  children: ReactNode;
  /** Keep mounted from the start in `keep-mounted-*` modes. */
  keepMounted?: boolean;
  /** Tab label. */
  label: string;
  /** In `keep-mounted-*` modes, do not mount before the first visit. */
  lazy?: boolean;
  /**
   * Lightweight content shown for this target tab while `active-only`
   * delayed content swap is waiting to mount the real panel body.
   */
  transitionShell?: ReactNode;
  /** Tab button testID. Panel content wrapper uses `${testID}.panel`. */
  testID: string;
}

export interface StickyTabsBarProps {
  /** Reanimated style; overrides `stickyBar.animatedStyle`. */
  animatedStyle?: AnimatedStyle<ViewStyle>;
  /** Extra bar style, applied after `barStyle` and `stickyBar.style`. */
  style?: StyleProp<ViewStyle>;
  /** Drive the pill from `scrollX`; overrides `stickyBar.syncWithScroll`. Defaults to `true`. */
  syncWithScroll?: boolean;
  /** Bar `top`; overrides `stickyBar.top`. Defaults to 0. */
  top?: number;
}

export interface StickyTabsContentProps {
  /** Outer container style. */
  containerStyle?: StyleProp<ViewStyle>;
  /** Style applied to every panel wrapper. */
  panelStyle?: StyleProp<ViewStyle>;
}
