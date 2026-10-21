import type { NetworkFallbackProps } from './NetworkFallback.types.js';
/**
 * Shows `children` when online or when content is available; otherwise shows
 * `view` in a pull-to-refresh `ScrollView` that re-checks the network and calls
 * `resetCallback` once it is back.
 */
export declare const NetworkFallback: ({ children, isContentAvailable, isOffline, refreshNetwork, resetCallback, view, }: NetworkFallbackProps) => import("react").JSX.Element;
//# sourceMappingURL=NetworkFallback.d.ts.map