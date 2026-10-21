/** Blocking full-screen loading overlay (app startup / offline cache warm-up). */
export interface FullScreenLoaderProps {
  /**
   * `true` draws the branded startup wallpaper; `false` draws a large accent
   * spinner on white. Defaults to `true`.
   */
  wallpaperSource?: boolean;
  /** Renders nothing when `false`. Defaults to `true`. */
  visible?: boolean;
  /**
   * Accepted for call-site compatibility; the kit ignores it. Record telemetry
   * in the app wrapper.
   */
  traceName?: string;
  /** Screen-reader text, e.g. "Loading". */
  accessibilityLabel?: string;
  /** Test identifier of the overlay. */
  testID?: string;
}
