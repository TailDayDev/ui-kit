import type { ReactNode } from 'react';

/**
 * Replaces content that cannot load without a network by a pull-to-refresh
 * fallback view. Network state comes from the app (`useNetwork`) via props.
 */
export interface NetworkFallbackProps {
  /** Content shown while online, or while offline when it is already available (cached). */
  children?: ReactNode;
  /** `true` when the content is available (e.g. cached), so it is shown even offline. */
  isContentAvailable: boolean;
  /**
   * `true` while the device is not online. The app passes
   * `connectionStatus !== 'online'` (offline or reconnecting) from `useNetwork`.
   */
  isOffline: boolean;
  /**
   * Re-checks connectivity on pull-to-refresh; resolves `true` when the network
   * is back. The app passes `refreshNetwork` from `useNetwork`.
   */
  refreshNetwork: () => Promise<boolean>;
  /** Called after the network is restored, e.g. to refetch the owning query. */
  resetCallback: () => Promise<void> | void;
  /** Fallback view rendered inside the pull-to-refresh `ScrollView`. */
  view: ReactNode;
}
