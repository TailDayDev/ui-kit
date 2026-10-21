import type { ReactNode } from 'react';

/** Values `NoImagePlaceholder` hands to `renderImage`. */
export interface NoImagePlaceholderRenderParams {
  /** Square side the artwork must fill: points or `'100%'`. */
  size: number | '100%';
  /** Tint requested by the caller; `undefined` keeps the artwork's own colors. */
  color?: string;
}

/**
 * Neutral "no image" artwork in a square frame.
 *
 * The artwork itself is not bundled: in the app it is an admin-managed image
 * (`NoImageIcon`) resolved and cached by app code, so the caller draws it via
 * `renderImage`.
 */
export interface NoImagePlaceholderProps {
  /** Tint passed to `renderImage` (app: recolors the SVG fills). */
  color?: string;
  /** Square side in points, or `'100%'` to fill the parent. Defaults to `'100%'`. */
  size?: number | '100%';
  /**
   * Draws the artwork at `size` (app: `DinamicImage` with the `NoImageIcon`
   * catalog image, `resizeMode="contain"`). Without it the frame stays empty.
   */
  renderImage?: (params: NoImagePlaceholderRenderParams) => ReactNode;
  /** Screen-reader text. Omit when the placeholder is decorative (the default). */
  accessibilityLabel?: string;
  /** Test identifier of the frame. */
  testID?: string;
}
