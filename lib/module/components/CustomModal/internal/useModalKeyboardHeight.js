"use strict";

import { useEffect, useState } from 'react';
import { Keyboard, Platform } from 'react-native';
import { readOpenKeyboardMetrics } from "./keyboardTracking.js";
const SHOW_EVENT = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
const HIDE_EVENT = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

/** iOS moves the sheet together with the keyboard. */
const syncKeyboardAnimation = event => {
  if (Platform.OS !== 'ios') {
    return;
  }
  try {
    Keyboard.scheduleLayoutAnimation(event);
  } catch (error) {
    console.warn('[CustomModal] keyboard animation sync skipped', error);
  }
};
const resolveKeyboardHeight = (metrics, screenHeight, accessoryHeight) => {
  const reportedHeight = metrics?.height || 0;
  const visibleHeight = Math.max(screenHeight - (metrics?.screenY ?? screenHeight), 0);
  const keyboardHeight = Platform.OS === 'ios' && visibleHeight > 0 ? Math.min(reportedHeight, visibleHeight) : reportedHeight;

  // A bar riding on the keyboard (app «Done» bar) covers the sheet too.
  return keyboardHeight > 0 ? keyboardHeight + accessoryHeight : 0;
};

/**
 * Height of the keyboard covering the modal area, while `isEnabled` (the
 * modal is on top and reacts to the keyboard); 0 otherwise. While
 * `isFrozen` (the sheet is leaving) it keeps its last value, so the layout
 * does not change under the leave animation.
 */
export const useModalKeyboardHeight = (isEnabled, screenHeight, isFrozen = false, accessoryHeight = 0) => {
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  useEffect(() => {
    if (isFrozen) {
      return undefined;
    }
    if (!isEnabled) {
      setKeyboardHeight(0);
      return undefined;
    }

    // The keyboard may already be up when this modal becomes the top one
    // (but not one that is leaving: a closed sheet above it took it down).
    setKeyboardHeight(resolveKeyboardHeight(readOpenKeyboardMetrics(), screenHeight, accessoryHeight));
    const showSubscription = Keyboard.addListener(SHOW_EVENT, event => {
      syncKeyboardAnimation(event);
      setKeyboardHeight(resolveKeyboardHeight(event.endCoordinates, screenHeight, accessoryHeight));
    });
    const hideSubscription = Keyboard.addListener(HIDE_EVENT, event => {
      syncKeyboardAnimation(event);
      setKeyboardHeight(0);
    });
    // `Keyboard.metrics()` only follows the did-events: a modal that became
    // top between a will- and a did-event read a stale value and missed the
    // will-event, so the did-event settles the height.
    const settleSubscriptions = Platform.OS === 'ios' ? [Keyboard.addListener('keyboardDidShow', event => {
      setKeyboardHeight(resolveKeyboardHeight(event.endCoordinates, screenHeight, accessoryHeight));
    }), Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardHeight(0);
    })] : [];
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
      settleSubscriptions.forEach(subscription => subscription.remove());
    };
  }, [accessoryHeight, isEnabled, isFrozen, screenHeight]);
  return keyboardHeight;
};
//# sourceMappingURL=useModalKeyboardHeight.js.map