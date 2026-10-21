import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  InteractionManager,
  Keyboard,
  Platform,
  StyleSheet,
  Text,
  type TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { useTheme, useThemedStyles, type Theme } from '../../theme';
import { Button } from '../Button';
import { CustomModal } from '../CustomModal';
import { SyncedTextInput } from '../SyncedTextInput';
import type {
  EditPriceModalProps,
  RequestPriceDiscardConfirmation,
} from './EditPriceModal.types';
import {
  parseStringToNumber,
  PRICE_MAX_TOLERANCE,
  verifyPriceInput,
} from './priceInput';

const PRICE_INPUT_FOCUS_RETRY_DELAYS_MS = [80, 240, 480];
const PRICE_CARET_PIN_DELAY_MS = 0;
const PRICE_SELECT_ALL_RELEASE_DELAY_MS = 50;
const EMPTY_PRICE_DEFAULTS = new Set(['', '0', '0,00', '0.00']);

/** App amount text (system font; Figma `numbers/bold` is Inter 44/46). */
const PRICE_FONT_SIZE = 44;
const PRICE_LINE_HEIGHT = 53;
const PRICE_FONT_WEIGHT = '700';
/** Input min width = one digit at 44 pt. */
const PRICE_INPUT_MIN_WIDTH = 44;

interface IPriceCaretSelection {
  start: number;
  end: number;
}

const resolvePriceDraft = (value: string | undefined): string => {
  const nextValue = value ?? '';

  return EMPTY_PRICE_DEFAULTS.has(nextValue) ? '' : nextValue;
};

const resolvePriceCaretSelection = (value: string): IPriceCaretSelection => ({
  start: value.length,
  end: value.length,
});

const closeWithoutConfirmation: RequestPriceDiscardConfirmation = (
  _hasChanges,
  onConfirm,
) => onConfirm();

/** Sheet with one large amount input and a Save footer. */
export const EditPriceModal = ({
  onConfirm,
  onClose,
  isVisible,
  onDismissed,
  title,
  defaultValue = '0',
  description,
  error,
  max,
  formatMaxError,
  placeholder,
  saveTitle,
  isSaving = false,
  autoFocusInput = false,
  isZeroAllowed = false,
  inputTestID,
  saveButtonTestID,
  closeButtonTestID,
  keyboardType,
  requestConfirmation = closeWithoutConfirmation,
  nestedOverlays,
}: EditPriceModalProps) => {
  const theme = useTheme();
  const styles = useThemedStyles(createStyles);
  const [price, setPrice] = useState<string>(() =>
    resolvePriceDraft(defaultValue),
  );
  const [selection, setSelection] = useState<IPriceCaretSelection | undefined>(
    undefined,
  );
  const inputRef = useRef<TextInput>(null);
  const priceRef = useRef(price);
  const caretPinTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  priceRef.current = price;
  const openedDefaultValueRef = useRef<string | null>(null);

  const pinPriceCaretToEnd = useCallback((value: string) => {
    const nextSelection = resolvePriceCaretSelection(value);
    inputRef.current?.setNativeProps({ selection: nextSelection });
    setSelection(nextSelection);
  }, []);

  // Selects the whole draft on focus so the next keystroke replaces it; the
  // controlled selection is released right after so taps still move the caret.
  const selectAllPriceDraft = useCallback((value: string) => {
    if (caretPinTimeoutRef.current !== null) {
      clearTimeout(caretPinTimeoutRef.current);
    }

    if (!value.length) {
      return;
    }

    const allSelection = { start: 0, end: value.length };
    inputRef.current?.setNativeProps({ selection: allSelection });
    setSelection(allSelection);
    caretPinTimeoutRef.current = setTimeout(() => {
      caretPinTimeoutRef.current = null;
      setSelection(undefined);
    }, PRICE_SELECT_ALL_RELEASE_DELAY_MS);
  }, []);

  const schedulePinPriceCaretToEnd = useCallback(
    (value: string) => {
      if (caretPinTimeoutRef.current !== null) {
        clearTimeout(caretPinTimeoutRef.current);
      }

      setSelection(undefined);
      caretPinTimeoutRef.current = setTimeout(() => {
        caretPinTimeoutRef.current = null;
        pinPriceCaretToEnd(value);
      }, PRICE_CARET_PIN_DELAY_MS);
    },
    [pinPriceCaretToEnd],
  );

  useLayoutEffect(() => {
    // The draft stays while the sheet slides out; the next open replaces it.
    if (!isVisible) {
      openedDefaultValueRef.current = null;
      return;
    }

    if (openedDefaultValueRef.current !== null) {
      return;
    }

    const nextValue = resolvePriceDraft(defaultValue);
    openedDefaultValueRef.current = defaultValue;
    setPrice(nextValue);
    setSelection(undefined);
    schedulePinPriceCaretToEnd(nextValue);
  }, [defaultValue, isVisible, schedulePinPriceCaretToEnd]);

  useEffect(() => {
    if (!isVisible || !autoFocusInput) {
      return;
    }

    const interactionHandle = InteractionManager.runAfterInteractions(() => {
      inputRef.current?.focus();
    });
    const timeoutIds = PRICE_INPUT_FOCUS_RETRY_DELAYS_MS.map(delay =>
      setTimeout(() => {
        inputRef.current?.focus();
      }, delay),
    );

    return () => {
      interactionHandle.cancel();
      timeoutIds.forEach(clearTimeout);
    };
  }, [autoFocusInput, isVisible]);

  const isOverMax = useMemo(
    () =>
      typeof max === 'number' &&
      parseStringToNumber(price) > max + PRICE_MAX_TOLERANCE,
    [max, price],
  );

  const isSaveDisabled = useMemo(() => {
    const numericPrice = parseStringToNumber(price);
    const isBelowMinimum = isZeroAllowed ? numericPrice < 0 : numericPrice <= 0;
    // Blocked when empty, below the minimum or above the maximum.
    return !price.length || isOverMax || isBelowMinimum;
  }, [isOverMax, isZeroAllowed, price]);

  const hasChanges = useMemo(
    () => parseStringToNumber(defaultValue) !== parseStringToNumber(price),
    [defaultValue, price],
  );

  const maxError =
    isOverMax && typeof max === 'number' ? formatMaxError(max) : '';

  useEffect(
    () => () => {
      if (caretPinTimeoutRef.current !== null) {
        clearTimeout(caretPinTimeoutRef.current);
      }
    },
    [],
  );

  // Close request: refused while a save is in flight (closing would drop
  // its result); with changes the discard confirmation closes it.
  const handleCloseRequest = () => {
    if (isSaving) {
      return;
    }
    requestConfirmation(hasChanges, onClose);
  };

  const updatePriceDraft = (nextValue: string) => {
    setPrice(nextValue);
    schedulePinPriceCaretToEnd(nextValue);
  };

  const handlePriceChange = (text: string) => {
    const cleanedText = text.replace(/[^0-9.,]/g, '');

    const isLeadingZeroDropped =
      cleanedText.startsWith('0') &&
      cleanedText.length > 1 &&
      cleanedText !== '0' &&
      !['.', ','].includes(cleanedText.charAt(1));

    const valueToVerify = isLeadingZeroDropped
      ? cleanedText.slice(1)
      : cleanedText;

    verifyPriceInput(valueToVerify, price, updatePriceDraft, max);
  };

  return (
    <CustomModal
      visible={isVisible}
      onDismissed={onDismissed}
      modalKey="EditPriceModal"
      isLocked={isSaving}
      nestedOverlays={nestedOverlays}
      title={title}
      closeButtonTestID={closeButtonTestID}
      onClose={handleCloseRequest}
      footer={
        <Button
          title={saveTitle}
          restStyle={styles.saveButton}
          testID={saveButtonTestID}
          onPress={() => {
            inputRef.current?.blur();
            Keyboard.dismiss();
            // The owner shows the error; a rejection must not go unhandled.
            void Promise.resolve(onConfirm(price)).catch(() => undefined);
          }}
          disabled={isSaveDisabled || isSaving}
          loading={isSaving}
        />
      }
      divider={false}
      autoHeight
      avoidKeyboard
    >
      <View style={styles.contentModal}>
        <View style={styles.pricesContainer}>
          <View style={styles.pricesModalWrapper}>
            <TouchableOpacity
              activeOpacity={1}
              style={styles.pricesInputRow}
              onPress={() => {
                inputRef.current?.focus();
              }}
            >
              <SyncedTextInput
                ref={inputRef}
                style={[
                  styles.pricesModalInput,
                  !price.length && styles.pricesModalValuePlaceholder,
                ]}
                value={price}
                placeholder={placeholder}
                placeholderTextColor={theme.colors.text.secondary}
                onChangeText={handlePriceChange}
                keyboardType={
                  keyboardType ??
                  (Platform.OS === 'ios'
                    ? 'numbers-and-punctuation'
                    : 'numeric')
                }
                inputMode="decimal"
                textContentType="none"
                testID={inputTestID}
                autoFocus={autoFocusInput}
                {...(selection === undefined ? {} : { selection })}
                onFocus={() => {
                  selectAllPriceDraft(priceRef.current);
                }}
              />
            </TouchableOpacity>
          </View>
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          {maxError ? <Text style={styles.errorText}>{maxError}</Text> : null}
          {description ? (
            <Text style={styles.moreText}>{description}</Text>
          ) : null}
        </View>
      </View>
    </CustomModal>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    contentModal: {
      alignItems: 'center',
      flex: 1,
      gap: theme.space[8],
      justifyContent: 'center',
      marginBottom: theme.space[2],
      paddingHorizontal: theme.space[6],
      paddingVertical: theme.space[4],
      width: '100%',
    },
    moreText: {
      ...theme.typography.caption.regular,
      color: theme.colors.text.secondary,
    },
    errorText: {
      ...theme.typography.caption.regular,
      color: theme.colors.text.error,
      textAlign: 'center',
      marginTop: theme.space[1],
    },
    pricesContainer: {
      alignItems: 'center',
      gap: theme.space[1],
      justifyContent: 'center',
      width: '100%',
    },
    pricesModalInput: {
      color: theme.colors.text.primary,
      fontSize: PRICE_FONT_SIZE,
      fontWeight: PRICE_FONT_WEIGHT,
      lineHeight: PRICE_LINE_HEIGHT,
      minWidth: PRICE_INPUT_MIN_WIDTH,
      maxWidth: '80%',
      textAlign: 'left',
      paddingVertical: 0,
      paddingHorizontal: 0,
    },
    pricesModalValuePlaceholder: {
      color: theme.colors.text.secondary,
    },
    pricesModalWrapper: {
      minHeight: PRICE_LINE_HEIGHT,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    pricesInputRow: {
      maxWidth: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    saveButton: {
      width: '100%',
    },
  });
