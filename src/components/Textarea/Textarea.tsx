import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Keyboard,
  Platform,
  Pressable,
  StyleSheet,
  View,
  type TextInput,
} from 'react-native';

import { Text } from '../../primitives';
import { useTheme, useThemedStyles, type Theme } from '../../theme';
import { SyncedTextInput } from '../SyncedTextInput';
import type { TextareaProps } from './Textarea.types';

/** Field side padding from the app `Textarea` (off-scale: not in Figma Spacing). */
const FIELD_PADDING_X = 14;
/** Counter sits this far below the field's bottom edge (app `Textarea`). */
const COUNTER_OFFSET = -18;
/** Minimum text area height from the app `Textarea`. */
const INPUT_MIN_HEIGHT = 40;
/**
 * Focused-field shadow from the app `Input`/`Textarea` (accent, offset 0/4,
 * 15 %, radius 8, Android elevation 8). Figma `shadow/focus` (0 0 8 #7962FF33)
 * differs in offset and opacity, so the app look is kept here.
 */
const FOCUS_SHADOW_OFFSET = { width: 0, height: 4 };
const FOCUS_SHADOW_OPACITY = 0.15;
const FOCUS_SHADOW_RADIUS = 8;
const FOCUS_ELEVATION = 8;

/**
 * Multiline text field (app `shared/ui/Textarea`). The label sits inside the
 * field; the counter is drawn under it.
 */
export const Textarea = ({
  value,
  fieldRef,
  setValue,
  placeholder,
  label,
  accessibilityLabel,
  containerStyle,
  inputStyle,
  labelStyle,
  counterStyle,
  disabled = false,
  autoFocus = false,
  maxLength,
  testID,
  onFocus,
  onInputFocus,
  onBlur,
}: TextareaProps) => {
  const theme = useTheme();
  const styles = useThemedStyles(createStyles);
  const inputRef = useRef<TextInput>(null);
  const [isFocused, setIsFocused] = useState(false);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
    onBlur?.();
  }, [onBlur]);

  const handleFocus = () => {
    setIsFocused(true);
    onFocus?.();
    onInputFocus?.(inputRef.current);
  };

  const handlePress = () => {
    if (disabled) {
      return;
    }
    inputRef.current?.focus();
  };

  useEffect(() => {
    const keyboardHideListener = Keyboard.addListener('keyboardDidHide', () => {
      if (isFocused) {
        handleBlur();
      }
    });
    return () => {
      keyboardHideListener.remove();
    };
  }, [isFocused, handleBlur]);

  return (
    <View style={fieldRef && maxLength ? styles.counterSpace : undefined}>
      <View ref={fieldRef} collapsable={false}>
        <Pressable
          // The field itself is not a screen-reader stop; the text input inside is.
          accessible={false}
          style={[
            styles.container,
            isFocused ? styles.focusedContainer : undefined,
            maxLength && !fieldRef ? styles.counterInput : undefined,
            containerStyle,
          ]}
          onPress={handlePress}
        >
          {label ? (
            <Text
              variant="caption/regular"
              // Announced through the text input's accessibilityLabel.
              accessibilityElementsHidden
              importantForAccessibility="no"
              style={[styles.label, labelStyle]}
            >
              {label}
            </Text>
          ) : null}
          <SyncedTextInput
            ref={inputRef}
            testID={testID}
            style={[styles.input, inputStyle]}
            placeholder={placeholder}
            placeholderTextColor={theme.palette.lightGray}
            value={value}
            editable={!disabled}
            onChangeText={setValue}
            multiline
            onBlur={handleBlur}
            onFocus={handleFocus}
            autoFocus={autoFocus}
            focusable={isFocused}
            maxLength={maxLength}
            returnKeyType={Platform.OS === 'android' ? 'done' : 'default'}
            submitBehavior="blurAndSubmit"
            onSubmitEditing={() => Keyboard.dismiss()}
            accessibilityLabel={accessibilityLabel ?? label}
            accessibilityState={{ disabled }}
          />
          {maxLength ? (
            <Text
              variant="caption/regular"
              color="secondary"
              style={[styles.counter, counterStyle]}
            >
              {value?.length ?? 0}/{maxLength}
            </Text>
          ) : null}
        </Pressable>
      </View>
    </View>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.bg.surface,
      borderColor: theme.palette.lightGray,
      borderRadius: theme.radius.sm,
      borderWidth: theme.stroke[1],
      justifyContent: 'center',
      paddingHorizontal: FIELD_PADDING_X,
      paddingVertical: theme.space[2.5],
    },
    counter: {
      bottom: COUNTER_OFFSET,
      left: 0,
      paddingTop: theme.space[1],
      position: 'absolute',
    },
    counterInput: {
      marginBottom: theme.space[4],
    },
    counterSpace: {
      paddingBottom: theme.space[4],
    },
    focusedContainer: {
      borderColor: theme.colors.bg.accent,
      elevation: FOCUS_ELEVATION,
      shadowColor: theme.colors.bg.accent,
      shadowOffset: FOCUS_SHADOW_OFFSET,
      shadowOpacity: FOCUS_SHADOW_OPACITY,
      shadowRadius: FOCUS_SHADOW_RADIUS,
    },
    input: {
      ...theme.typography.headline.regular,
      borderWidth: 0,
      color: theme.colors.text.primary,
      minHeight: INPUT_MIN_HEIGHT,
      paddingHorizontal: 0,
      paddingVertical: 0,
      textAlignVertical: 'top',
      width: '100%',
    },
    label: {
      marginBottom: theme.space[1],
    },
  });
