/**
 * Shared geometry of the screen header bar (below the top safe-area inset).
 * Every screen header keeps the back button at the same place so pushes and
 * pops between screens never move the arrow.
 */
export const SCREEN_HEADER_BAR_HEIGHT = 52;
export const SCREEN_HEADER_BACK_BUTTON_SIZE = 36;
export const SCREEN_HEADER_HORIZONTAL_PADDING = 16;
export const SCREEN_HEADER_DIVIDER_WIDTH = 1;
/** Space above and below the back button inside the bar. */
export const SCREEN_HEADER_VERTICAL_PADDING =
  (SCREEN_HEADER_BAR_HEIGHT - SCREEN_HEADER_BACK_BUTTON_SIZE) / 2;
