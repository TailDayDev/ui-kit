/**
 * Screen Y of the top edge of the area the keyboard covers.
 *
 * Keyboard events report only the keyboard itself. A view the app draws on top
 * of it (e.g. a "Done" bar) covers `accessoryHeight` more, so the covered top
 * edge moves up by that much. Pure helper from the app
 * `shared/lib/keyboard-toolbar/resolveCoveredKeyboardTop`, with the bar height
 * passed in instead of the app constant.
 */
export const resolveCoveredKeyboardTop = (
  keyboardScreenY: number,
  accessoryHeight: number,
): number => keyboardScreenY - accessoryHeight;
