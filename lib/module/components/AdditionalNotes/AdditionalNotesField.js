"use strict";

import { useCallback, useState } from 'react';
import { ActivityIndicator, Keyboard, Pressable, StyleSheet, View } from 'react-native';
import { Text } from "../../primitives/index.js";
import { useTheme, useThemedStyles } from "../../theme/index.js";
import { Card } from "../Card/index.js";
import { CustomModal } from "../CustomModal/index.js";
import { Textarea } from "../Textarea/index.js";
import { DEFAULT_ADDITIONAL_NOTES_CARD_NUMBER_OF_LINES, DEFAULT_ADDITIONAL_NOTES_MAX_LENGTH, DEFAULT_ADDITIONAL_NOTES_MIN_HEIGHT, DEFAULT_ADDITIONAL_NOTES_MODAL_INPUT_MIN_HEIGHT } from "./AdditionalNotes.constants.js";
import { useAdditionalNotes } from "./AdditionalNotesContext.js";

/** App edit-sheet action button: Figma Button height (51pt, off-scale). */
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
const ACTION_BUTTON_HEIGHT = 51;
/** App gap between the sheet's Cancel and Save (off-scale). */
const ACTION_ROW_GAP = 19;
/** App pressed opacity of the sheet's buttons (differs from `opacity.pressed`). */
const ACTION_PRESSED_OPACITY = 0.8;
const DEFAULT_TEXTAREA_CONTAINER_STYLE = {
  width: '100%'
};
const createStyles = theme => StyleSheet.create({
  actionButton: {
    alignItems: 'center',
    borderRadius: theme.radius.sm,
    flex: 1,
    height: ACTION_BUTTON_HEIGHT,
    justifyContent: 'center',
    paddingHorizontal: theme.space[8]
  },
  actionRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: ACTION_ROW_GAP,
    justifyContent: 'space-between',
    width: '100%'
  },
  cancelButton: {
    backgroundColor: theme.colors.bg.surface,
    borderColor: theme.palette.lightGray,
    borderWidth: theme.stroke[1]
  },
  disabledSaveButton: {
    backgroundColor: theme.palette.paleGray
  },
  inlineCard: {
    gap: theme.space[4]
  },
  inlineInput: {
    maxWidth: '100%',
    minWidth: '100%'
  },
  modalBody: {
    paddingBottom: theme.space[6],
    paddingHorizontal: theme.space[6],
    paddingTop: theme.space[5]
  },
  modalTextareaContainer: {
    // App `theme.colors.primary` as a border: the accent fill color.
    borderColor: theme.colors.bg.accent,
    paddingHorizontal: theme.space[4],
    paddingVertical: theme.space[3],
    width: '100%'
  },
  modalTextareaInput: {
    ...theme.typography.body.regular,
    color: theme.colors.text.primary,
    width: '100%'
  },
  pressed: {
    opacity: ACTION_PRESSED_OPACITY
  },
  previewCard: {
    gap: theme.space[3]
  },
  previewPlaceholder: {
    color: theme.palette.lightGray
  },
  saveButton: {
    backgroundColor: theme.colors.bg.accent
  }
});

/** Notes card (inline field, read-only text or modal preview) reading `AdditionalNotesProvider`. */
export const AdditionalNotesField = () => {
  const theme = useTheme();
  const styles = useThemedStyles(createStyles);
  const {
    value,
    resolveValueChange,
    onSave,
    title,
    placeholder,
    previewPlaceholder,
    footerText,
    footerTextStyle,
    maxLength,
    disabled,
    readOnly,
    isSaving,
    editMode,
    cancelLabel,
    saveLabel,
    minHeight,
    modalInputMinHeight,
    cardNumberOfLines,
    withShadow,
    cardStyle,
    titleStyles,
    textareaContainerStyle,
    textareaInputStyle,
    textareaCounterStyle,
    fieldRef,
    onFocus,
    onBlur,
    onInputFocus
  } = useAdditionalNotes();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [draftValue, setDraftValue] = useState(value);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const resolvedPreviewPlaceholder = previewPlaceholder ?? placeholder;
  const resolvedMaxLength = maxLength ?? DEFAULT_ADDITIONAL_NOTES_MAX_LENGTH;
  const resolvedMinHeight = minHeight ?? DEFAULT_ADDITIONAL_NOTES_MIN_HEIGHT;
  const resolvedModalInputMinHeight = modalInputMinHeight ?? DEFAULT_ADDITIONAL_NOTES_MODAL_INPUT_MIN_HEIGHT;
  const resolvedCardNumberOfLines = cardNumberOfLines ?? DEFAULT_ADDITIONAL_NOTES_CARD_NUMBER_OF_LINES;
  const isModalMode = editMode === 'modal';
  const isEditable = !readOnly && !disabled;
  const isSaveInProgress = Boolean(isSaving || isSubmitting);
  const safeValue = typeof value === 'string' ? value : '';
  const trimmedValue = safeValue.trim();
  const previewText = trimmedValue ? safeValue : resolvedPreviewPlaceholder;
  const handleOpenModal = useCallback(() => {
    if (!isEditable) {
      return;
    }
    setDraftValue(safeValue);
    setIsModalVisible(true);
  }, [isEditable, safeValue]);
  const handleCloseModal = useCallback(() => {
    if (isSaveInProgress) {
      return;
    }
    Keyboard.dismiss();
    // Draft is re-seeded on open, so the leaving sheet keeps its text.
    setIsModalVisible(false);
  }, [isSaveInProgress]);
  const handleSaveModal = useCallback(async () => {
    if (!isEditable || isSaveInProgress) {
      return;
    }
    Keyboard.dismiss();
    setIsSubmitting(true);
    try {
      await onSave?.(draftValue);
      resolveValueChange(draftValue);
      setIsModalVisible(false);
    } catch {
      return;
    } finally {
      setIsSubmitting(false);
    }
  }, [draftValue, isEditable, isSaveInProgress, onSave, resolveValueChange]);
  if (isModalMode) {
    return /*#__PURE__*/_jsxs(_Fragment, {
      children: [/*#__PURE__*/_jsx(Card, {
        title: title,
        titleStyles: titleStyles ?? theme.typography.headline.bold,
        onPress: handleOpenModal,
        disabled: !isEditable,
        withShadow: withShadow ?? true,
        style: [styles.previewCard, cardStyle],
        children: /*#__PURE__*/_jsx(Text, {
          variant: "body/regular",
          color: "primary",
          style: !trimmedValue ? styles.previewPlaceholder : undefined,
          numberOfLines: resolvedCardNumberOfLines,
          ellipsizeMode: "tail",
          children: previewText
        })
      }), /*#__PURE__*/_jsx(CustomModal, {
        title: title,
        visible: isModalVisible,
        onClose: handleCloseModal,
        isLocked: isSaveInProgress,
        scrollEnabled: false,
        avoidKeyboard: true,
        liftFooterOnKeyboard: true,
        footer: /*#__PURE__*/_jsxs(View, {
          style: styles.actionRow,
          children: [/*#__PURE__*/_jsx(Pressable, {
            accessibilityRole: "button",
            accessibilityLabel: cancelLabel,
            accessibilityState: {
              disabled: isSaveInProgress
            },
            disabled: isSaveInProgress,
            onPressIn: handleCloseModal,
            style: ({
              pressed
            }) => [styles.actionButton, styles.cancelButton, pressed && !isSaveInProgress ? styles.pressed : undefined],
            children: /*#__PURE__*/_jsx(Text, {
              variant: "headline/medium",
              color: "primary",
              children: cancelLabel
            })
          }), /*#__PURE__*/_jsx(Pressable, {
            accessibilityRole: "button",
            accessibilityLabel: saveLabel,
            accessibilityState: {
              busy: isSaveInProgress,
              disabled: !isEditable || isSaveInProgress
            },
            disabled: !isEditable || isSaveInProgress,
            onPressIn: handleSaveModal,
            style: ({
              pressed
            }) => [styles.actionButton, styles.saveButton, pressed && isEditable && !isSaveInProgress ? styles.pressed : undefined, !isEditable ? styles.disabledSaveButton : undefined],
            children: isSaveInProgress ? /*#__PURE__*/_jsx(ActivityIndicator, {
              size: "small",
              color: theme.colors.text.inverse
            }) : /*#__PURE__*/_jsx(Text, {
              variant: "headline/medium",
              color: "inverse",
              children: saveLabel
            })
          })]
        }),
        children: /*#__PURE__*/_jsx(View, {
          style: styles.modalBody,
          children: /*#__PURE__*/_jsx(Textarea, {
            autoFocus: true,
            containerStyle: [styles.modalTextareaContainer, textareaContainerStyle],
            inputStyle: [styles.modalTextareaInput, {
              minHeight: resolvedModalInputMinHeight
            }, textareaInputStyle],
            label: title,
            maxLength: resolvedMaxLength,
            value: draftValue,
            setValue: setDraftValue,
            placeholder: placeholder,
            disabled: !isEditable || isSaveInProgress
          })
        })
      })]
    });
  }
  return /*#__PURE__*/_jsxs(Card, {
    title: title,
    titleStyles: titleStyles ?? theme.typography.title.bold,
    style: [styles.inlineCard, cardStyle],
    children: [readOnly ? /*#__PURE__*/_jsx(Text, {
      variant: "body/regular",
      color: trimmedValue ? 'primary' : 'secondary',
      style: {
        minHeight: resolvedMinHeight
      },
      children: trimmedValue ? safeValue : placeholder
    }) :
    /*#__PURE__*/
    // Keyboard anchor is the input with its counter, not the whole card:
    // only the field has to stay above the keyboard.
    _jsx(View, {
      ref: fieldRef,
      collapsable: false,
      children: /*#__PURE__*/_jsx(Textarea, {
        containerStyle: textareaContainerStyle ?? DEFAULT_TEXTAREA_CONTAINER_STYLE,
        inputStyle: [{
          minHeight: resolvedMinHeight
        }, styles.inlineInput, textareaInputStyle],
        onFocus: onFocus,
        onBlur: onBlur,
        onInputFocus: onInputFocus,
        maxLength: resolvedMaxLength,
        counterStyle: textareaCounterStyle,
        value: safeValue,
        setValue: resolveValueChange,
        placeholder: placeholder,
        disabled: disabled || !isEditable
      })
    }), footerText ? /*#__PURE__*/_jsx(Text, {
      variant: "caption/regular",
      color: "secondary",
      style: footerTextStyle,
      children: footerText
    }) : null]
  });
};
//# sourceMappingURL=AdditionalNotesField.js.map