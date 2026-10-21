import { Keyboard, type KeyboardMetrics } from 'react-native';

/**
 * `Keyboard.metrics()` changes only on the did-events, so between
 * `keyboardWillHide` and `keyboardDidHide` it still reports a keyboard that
 * is already leaving. This tracks that window app-wide.
 */
let isKeyboardHiding = false;
let isTracking = false;

const startKeyboardTracking = () => {
  if (isTracking) {
    return;
  }
  isTracking = true;
  Keyboard.addListener('keyboardWillHide', () => {
    isKeyboardHiding = true;
  });
  const settle = () => {
    isKeyboardHiding = false;
  };
  Keyboard.addListener('keyboardWillShow', settle);
  Keyboard.addListener('keyboardDidShow', settle);
  Keyboard.addListener('keyboardDidHide', settle);
};

/** The keyboard that is up now, or undefined when none or it is leaving. */
export const readOpenKeyboardMetrics = (): KeyboardMetrics | undefined => {
  startKeyboardTracking();
  // react-native-web has no Keyboard.metrics.
  if (isKeyboardHiding || typeof Keyboard.metrics !== 'function') {
    return undefined;
  }
  return Keyboard.metrics();
};

/** Tests only: forget the tracked state and subscriptions. */
export const resetKeyboardTrackingForTests = () => {
  isKeyboardHiding = false;
  isTracking = false;
};
