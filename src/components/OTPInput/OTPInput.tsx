import { useEffect, useMemo, useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  type NativeSyntheticEvent,
  type TextInput,
  type TextInputKeyPressEventData,
  type TextInputSelectionChangeEventData,
} from 'react-native';
import Animated, {
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

import { Text } from '../../primitives';
import { useThemedStyles, type Theme } from '../../theme';
import { SyncedTextInput } from '../SyncedTextInput';
import type { OTPInputProps } from './OTPInput.types';

/** Active-cell glow pulse from the app `OTPInput`. */
const PULSE_MAX_OPACITY = 0.3;
const PULSE_HALF_PERIOD_MS = 500;
const PULSE_MAX_ELEVATION = 2;
/** Active-cell glow radius (app value; no Figma effect). */
const ACTIVE_SHADOW_RADIUS = 4;
/** Cell height from the app `OTPInput` (off-scale: not in Figma Spacing). */
const CELL_HEIGHT = 69;
/** Default gap between cells (app default, space[4]). */
const DEFAULT_CELL_GAP = 16;
/** Focus is deferred so the screen transition settles first (app value). */
const AUTO_FOCUS_DELAY_MS = 50;
/** The hidden input sits above the cells to receive taps. */
const HIDDEN_INPUT_Z_INDEX = 2;

/**
 * One-time-code field (app `shared/ui/OTPInput`): a transparent input over a
 * row of digit cells. The active cell's glow pulses on the UI thread.
 */
export const OTPInput = ({
  length = 6,
  onCodeFilled,
  errorText = null,
  cellGap = DEFAULT_CELL_GAP,
  cellWidth,
  emptyPlaceholder = '',
  autoFocus = true,
  readClipboard = true,
  onRequestClipboardText,
  resetVersion,
  accessibilityLabel,
}: OTPInputProps) => {
  const styles = useThemedStyles(createStyles);
  const cellSizeStyle = useMemo(
    () => (cellWidth ? { flex: 0, width: cellWidth } : { flex: 1 }),
    [cellWidth],
  );
  const cellMarginStyle = useMemo(() => ({ marginRight: cellGap }), [cellGap]);

  const [code, setCode] = useState('');
  const [selection, setSelection] = useState({ start: 0, end: 0 });
  const [isFocused, setIsFocused] = useState(false);
  const [showError, setShowError] = useState(!!errorText);
  const hiddenInputRef = useRef<TextInput>(null);
  // Read through a ref so an inline function from the app does not re-run the
  // mount effect (focus + clipboard) on every render.
  const requestClipboardTextRef = useRef(onRequestClipboardText);
  requestClipboardTextRef.current = onRequestClipboardText;

  // The active-cell glow pulses on the UI thread; a typed digit restarts the
  // pulse from zero so the glow moves with the caret.
  const pulse = useSharedValue(0);

  useEffect(() => {
    cancelAnimation(pulse);
    pulse.value = 0;
    if (isFocused) {
      pulse.value = withRepeat(
        withSequence(
          withTiming(PULSE_MAX_OPACITY, { duration: PULSE_HALF_PERIOD_MS }),
          withTiming(0, { duration: PULSE_HALF_PERIOD_MS }),
        ),
        -1,
      );
    }
    return () => {
      cancelAnimation(pulse);
    };
  }, [isFocused, code, pulse]);

  const pulseStyle = useAnimatedStyle(() => ({
    elevation: pulse.value * PULSE_MAX_ELEVATION,
    shadowOpacity: pulse.value,
  }));

  useEffect(() => {
    setShowError(!!errorText);
  }, [errorText]);

  useEffect(() => {
    if (resetVersion !== undefined) {
      setCode('');
    }
  }, [resetVersion]);

  useEffect(() => {
    if (autoFocus) {
      setTimeout(() => hiddenInputRef.current?.focus(), AUTO_FOCUS_DELAY_MS);
    }
    const requestClipboardText = requestClipboardTextRef.current;
    if (!readClipboard || !requestClipboardText) {
      return;
    }

    (async () => {
      const clip = await requestClipboardText();
      if (new RegExp(`^\\d{${length}}$`).test(clip)) {
        setCode(clip);
        onCodeFilled(clip);
      }
    })();
  }, [autoFocus, length, onCodeFilled, readClipboard]);

  useEffect(() => {
    setSelection({ start: code.length, end: code.length });
    onCodeFilled(code);
  }, [code, onCodeFilled]);

  const handleChange = (text: string) => {
    setCode(text.replace(/\D/g, '').slice(0, length));
  };

  const handleKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
  ) => {
    if (e.nativeEvent.key === 'Backspace' && code.length > 0) {
      setCode(prev => prev.slice(0, -1));
    }
  };

  const handleSelectionChange = (
    e: NativeSyntheticEvent<TextInputSelectionChangeEventData>,
  ) => {
    const sel = e.nativeEvent.selection;
    if (sel.start !== code.length || sel.end !== code.length) {
      setSelection({ start: code.length, end: code.length });
    }
  };

  const activeIndex = code.length < length ? code.length : length - 1;
  const cells = Array.from({ length }, (_, i) => code[i] || '');

  return (
    <View style={styles.containerWrapper}>
      <View style={styles.wrapper}>
        {cells.map((digit, idx) => {
          const isActive = isFocused && idx === activeIndex;
          const shadowStyle = isActive ? [styles.activeCell, pulseStyle] : null;
          const cellError = showError ? styles.cellError : null;
          return (
            <Animated.View
              key={idx}
              style={[
                styles.cell,
                cellSizeStyle,
                shadowStyle,
                cellError,
                idx < length - 1 && cellMarginStyle,
              ]}
            >
              <Text
                variant="headline/bold"
                style={
                  !digit && emptyPlaceholder
                    ? styles.placeholderCellText
                    : undefined
                }
              >
                {digit || emptyPlaceholder}
              </Text>
            </Animated.View>
          );
        })}
        <SyncedTextInput
          ref={hiddenInputRef}
          value={code}
          onChangeText={handleChange}
          onKeyPress={handleKeyPress}
          keyboardType="number-pad"
          maxLength={length}
          style={styles.hiddenInput}
          selection={selection}
          onSelectionChange={handleSelectionChange}
          onFocus={() => {
            setIsFocused(true);
            setShowError(false);
          }}
          onBlur={() => {
            setIsFocused(false);
            if (errorText) {
              setShowError(true);
            }
          }}
          accessibilityLabel={accessibilityLabel}
          contextMenuHidden={false}
          editable
          caretHidden
        />
      </View>
      {showError && (
        <Text variant="caption/regular" color="error" style={styles.errorText}>
          {errorText}
        </Text>
      )}
    </View>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    cell: {
      alignItems: 'center',
      backgroundColor: theme.colors.bg.surface,
      borderColor: theme.palette.lightGray,
      borderRadius: theme.radius.sm,
      borderWidth: theme.stroke[1],
      height: CELL_HEIGHT,
      justifyContent: 'center',
    },
    activeCell: {
      borderColor: theme.colors.bg.accent,
      shadowColor: theme.colors.bg.accent,
      shadowOffset: { width: 0, height: 0 },
      shadowRadius: ACTIVE_SHADOW_RADIUS,
    },
    cellError: {
      borderColor: theme.colors.text.error,
      shadowColor: 'transparent',
      shadowOpacity: 0,
    },
    placeholderCellText: {
      color: theme.palette.lightGray,
    },
    containerWrapper: {
      width: '100%',
    },
    errorText: {
      alignSelf: 'flex-start',
      marginTop: theme.space[2],
    },
    hiddenInput: {
      backgroundColor: 'transparent',
      bottom: 0,
      color: 'transparent',
      left: 0,
      position: 'absolute',
      right: 0,
      top: 0,
      zIndex: HIDDEN_INPUT_Z_INDEX,
    },
    wrapper: {
      flexDirection: 'row',
      width: '100%',
    },
  });
