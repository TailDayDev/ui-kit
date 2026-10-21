import type { ReactNode } from 'react';
import type {
  LayoutChangeEvent,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleProp,
  ViewStyle,
} from 'react-native';

/** Props shared by the static and the pull-to-refresh wrapper. */
export interface BaseLoadingWrapperProps {
  /** Shows `skeleton` instead of `children`. Turning it off cross-fades to the content (iOS). */
  loading: boolean;
  /** Placeholder rendered while `loading`. */
  skeleton: ReactNode;
  /** Content rendered once loading is done. */
  children?: ReactNode;
  /** Sizes the wrapper to its content instead of filling the parent (`flex: 0`). */
  fitContent?: boolean;
  /** Container style (the `ScrollView` style in pull-to-refresh mode). */
  style?: StyleProp<ViewStyle>;
  /** Pull-to-refresh mode only: forwarded to the `ScrollView`. */
  nestedScrollEnabled?: boolean;
  /** Pull-to-refresh mode only: `ScrollView` content container style. */
  contentContainerStyle?: StyleProp<ViewStyle>;
  /** Pull-to-refresh mode only: forwarded to the `ScrollView`. */
  keyboardShouldPersistTaps?: 'always' | 'never' | 'handled';
  /** Pull-to-refresh mode only: forwarded to the `ScrollView`. */
  showsVerticalScrollIndicator?: boolean;
  /** Pull-to-refresh mode only: forwarded to the `ScrollView`. */
  onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  /** Pull-to-refresh mode only: forwarded to the `ScrollView`. */
  scrollEventThrottle?: number;
  /** Pull-to-refresh mode only: layout callback of the `ScrollView`. */
  onLayout?: (event: LayoutChangeEvent) => void;
  /** Pull-to-refresh mode only: offset of the refresh spinner. */
  progressViewOffset?: number;
  /** Shows the content at once when loading ends, without the cross-fade. */
  skipExitAnimation?: boolean;
}

/** Wraps the content in a `ScrollView` with a `RefreshControl`. */
export interface PullToRefreshLoadingWrapperProps extends BaseLoadingWrapperProps {
  /** Enables the pull-to-refresh `ScrollView`. */
  enablePullToRefresh: true;
  /** Called when the user pulls to refresh. */
  onRetry: () => void;
  /** Shows the refresh spinner. */
  refreshing: boolean;
}

/** Plain `View` wrapper without pull-to-refresh. */
export interface StaticLoadingWrapperProps extends BaseLoadingWrapperProps {
  /** Must be `false` or omitted. */
  enablePullToRefresh?: false;
  onRetry?: never;
  refreshing?: never;
}

/** Shows a skeleton while loading and fades to the content when done. */
export type LoadingWrapperProps =
  PullToRefreshLoadingWrapperProps | StaticLoadingWrapperProps;
