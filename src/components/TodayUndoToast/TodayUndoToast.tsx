import { useCallback, useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Animated, {
  Easing,
  cancelAnimation,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { IconUndo2 } from '../../icons/figma';
import { Icon } from '../../primitives/Icon';
import { Text } from '../../primitives/Text';
import { useTheme, useThemedStyles, type Theme } from '../../theme';
import type { TodayUndoToastProps } from './TodayUndoToast.types';

// Figma TodayUndoToast: height 36 (FIXED, off the spacing scale).
const TOAST_HEIGHT = 36;
// Figma TodayUndoToast › undo-2: 20×20.
const TOAST_ICON_SIZE = 20;
// App TodayUndoToast: extra vertical touch area.
const TOAST_HIT_SLOP = { bottom: 4, top: 4 } as const;
// App TodayUndoToast: starts/ends one toast height + 16pt below its place.
const TOAST_OFFSCREEN_GAP = 16;
const TOAST_OFFSCREEN_TRANSLATE_Y = TOAST_HEIGHT + TOAST_OFFSCREEN_GAP;
// App TodayUndoToast: 1s cubic enter and exit.
const TOAST_ANIMATION_DURATION_MS = 1000;
const IDLE_OPACITY = 1;
const HIDDEN_OPACITY = 0;

type Phase = 'hidden' | 'entering' | 'visible' | 'exiting';

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    pill: {
      alignItems: 'center',
      backgroundColor: theme.colors.overlay.scrim,
      borderRadius: theme.radius.full,
      flexDirection: 'row',
      gap: theme.space[2],
      height: TOAST_HEIGHT,
      overflow: 'hidden',
      paddingBottom: theme.space[2],
      paddingLeft: theme.space[6],
      paddingRight: theme.space[3],
      paddingTop: theme.space[2],
    },
  });

/**
 * «Отменить» pill at the bottom of the Today screen after a task is marked
 * done (Figma `TodayUndoToast`): translucent dark fill, white label and
 * undo-2 icon. Slides in/out with the app timing; positioning is up to the
 * caller (`style`).
 */
export const TodayUndoToast = ({
  label,
  onPress,
  isVisible = true,
  isDisabled = false,
  accessibilityLabel,
  style,
  testID,
}: TodayUndoToastProps) => {
  const theme = useTheme();
  const styles = useThemedStyles(createStyles);
  const [phase, setPhase] = useState<Phase>(isVisible ? 'entering' : 'hidden');
  const isMountedRef = useRef(true);
  const transitionIdRef = useRef(0);
  const translateY = useSharedValue(TOAST_OFFSCREEN_TRANSLATE_Y);
  const opacity = useSharedValue(HIDDEN_OPACITY);

  const handleTransitionEnd = useCallback(
    (transitionId: number, nextPhase: Phase): void => {
      if (isMountedRef.current && transitionIdRef.current === transitionId) {
        setPhase(nextPhase);
      }
    },
    [],
  );

  const animateTo = useCallback(
    (isShown: boolean): void => {
      const transitionId = ++transitionIdRef.current;
      const config = {
        duration: TOAST_ANIMATION_DURATION_MS,
        easing: isShown ? Easing.out(Easing.cubic) : Easing.in(Easing.cubic),
      };
      const nextPhase: Phase = isShown ? 'visible' : 'hidden';
      cancelAnimation(translateY);
      cancelAnimation(opacity);
      translateY.value = withTiming(
        isShown ? 0 : TOAST_OFFSCREEN_TRANSLATE_Y,
        config,
      );
      opacity.value = withTiming(
        isShown ? IDLE_OPACITY : HIDDEN_OPACITY,
        config,
        isFinished => {
          'worklet';
          if (isFinished) {
            runOnJS(handleTransitionEnd)(transitionId, nextPhase);
          }
        },
      );
    },
    [handleTransitionEnd, opacity, translateY],
  );

  // Declared before the animation effect so a remount (StrictMode) marks the
  // component mounted before a new transition starts.
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      transitionIdRef.current += 1;
      cancelAnimation(translateY);
      cancelAnimation(opacity);
    };
  }, [opacity, translateY]);

  useEffect(() => {
    if (isVisible) {
      setPhase('entering');
      animateTo(true);
    } else {
      setPhase(current => (current === 'hidden' ? current : 'exiting'));
      animateTo(false);
    }
  }, [animateTo, isVisible]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  if (phase === 'hidden') {
    return null;
  }

  const isBlocked = isDisabled || phase !== 'visible';

  return (
    <Animated.View pointerEvents="box-none" style={[animatedStyle, style]}>
      <Pressable
        testID={testID}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel ?? label}
        accessibilityState={{ disabled: isBlocked }}
        disabled={isBlocked}
        hitSlop={TOAST_HIT_SLOP}
        onPress={onPress}
        style={({ pressed }) => [
          styles.pill,
          { opacity: pressed ? theme.opacity.pressed : IDLE_OPACITY },
        ]}
      >
        <Text variant="headline/medium" color="inverse" numberOfLines={1}>
          {label}
        </Text>
        <Icon icon={IconUndo2} size={TOAST_ICON_SIZE} color="text.inverse" />
      </Pressable>
    </Animated.View>
  );
};
