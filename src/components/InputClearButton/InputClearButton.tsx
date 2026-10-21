import { useRef } from 'react';
import { View, type GestureResponderEvent } from 'react-native';

import { ClearInputIcon } from '../../icons/ClearInputIcon';
import { Icon } from '../../primitives';
import type { InputClearButtonProps } from './InputClearButton.types';

/** A touch that moves farther than this is a scroll, not a tap on the control. */
const TAP_MOVE_TOLERANCE = 10;

/**
 * The «×» control of a text field. It listens to raw touches, not the
 * responder system: with the keyboard up, a parent ScrollView
 * (keyboardShouldPersistTaps «never») captures every tap that is not on a
 * text input, so a Pressable here would only dismiss the keyboard. Raw touch
 * events still reach the control; a drag (scroll) does not clear.
 */
export const InputClearButton = ({
  onClear,
  inputRef,
  style,
  testID,
  accessibilityLabel,
}: InputClearButtonProps) => {
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const clear = () => {
    onClear();
    inputRef?.current?.focus();
  };

  const handleTouchStart = (event: GestureResponderEvent) => {
    const { pageX, pageY } = event.nativeEvent;
    touchStartRef.current = { x: pageX, y: pageY };
  };

  const handleTouchEnd = (event: GestureResponderEvent) => {
    const start = touchStartRef.current;
    touchStartRef.current = null;
    if (!start) {
      return;
    }
    const { pageX, pageY } = event.nativeEvent;
    const isTap =
      Math.abs(pageX - start.x) <= TAP_MOVE_TOLERANCE &&
      Math.abs(pageY - start.y) <= TAP_MOVE_TOLERANCE;
    if (isTap) {
      clear();
    }
  };

  const handleTouchCancel = () => {
    touchStartRef.current = null;
  };

  return (
    <View
      // A view with only touch handlers may be flattened into its parent, and
      // the touch would then target the parent instead of this control.
      collapsable={false}
      accessible
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      onAccessibilityTap={clear}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchCancel}
      style={style}
      testID={testID}
    >
      <Icon icon={ClearInputIcon} />
    </View>
  );
};
