"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdditionalNotesField = void 0;
var _react = require("react");
var _reactNative = require("react-native");
var _index = require("../../primitives/index.js");
var _index2 = require("../../theme/index.js");
var _index3 = require("../Card/index.js");
var _index4 = require("../CustomModal/index.js");
var _index5 = require("../Textarea/index.js");
var _AdditionalNotesConstants = require("./AdditionalNotes.constants.js");
var _AdditionalNotesContext = require("./AdditionalNotesContext.js");
var _jsxRuntime = require("react/jsx-runtime");
/** App edit-sheet action button: Figma Button height (51pt, off-scale). */const ACTION_BUTTON_HEIGHT = 51;
/** App gap between the sheet's Cancel and Save (off-scale). */
const ACTION_ROW_GAP = 19;
/** App pressed opacity of the sheet's buttons (differs from `opacity.pressed`). */
const ACTION_PRESSED_OPACITY = 0.8;
const DEFAULT_TEXTAREA_CONTAINER_STYLE = {
  width: '100%'
};
const createStyles = theme => _reactNative.StyleSheet.create({
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
const AdditionalNotesField = () => {
  const theme = (0, _index2.useTheme)();
  const styles = (0, _index2.useThemedStyles)(createStyles);
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
  } = (0, _AdditionalNotesContext.useAdditionalNotes)();
  const [isModalVisible, setIsModalVisible] = (0, _react.useState)(false);
  const [draftValue, setDraftValue] = (0, _react.useState)(value);
  const [isSubmitting, setIsSubmitting] = (0, _react.useState)(false);
  const resolvedPreviewPlaceholder = previewPlaceholder ?? placeholder;
  const resolvedMaxLength = maxLength ?? _AdditionalNotesConstants.DEFAULT_ADDITIONAL_NOTES_MAX_LENGTH;
  const resolvedMinHeight = minHeight ?? _AdditionalNotesConstants.DEFAULT_ADDITIONAL_NOTES_MIN_HEIGHT;
  const resolvedModalInputMinHeight = modalInputMinHeight ?? _AdditionalNotesConstants.DEFAULT_ADDITIONAL_NOTES_MODAL_INPUT_MIN_HEIGHT;
  const resolvedCardNumberOfLines = cardNumberOfLines ?? _AdditionalNotesConstants.DEFAULT_ADDITIONAL_NOTES_CARD_NUMBER_OF_LINES;
  const isModalMode = editMode === 'modal';
  const isEditable = !readOnly && !disabled;
  const isSaveInProgress = Boolean(isSaving || isSubmitting);
  const safeValue = typeof value === 'string' ? value : '';
  const trimmedValue = safeValue.trim();
  const previewText = trimmedValue ? safeValue : resolvedPreviewPlaceholder;
  const handleOpenModal = (0, _react.useCallback)(() => {
    if (!isEditable) {
      return;
    }
    setDraftValue(safeValue);
    setIsModalVisible(true);
  }, [isEditable, safeValue]);
  const handleCloseModal = (0, _react.useCallback)(() => {
    if (isSaveInProgress) {
      return;
    }
    _reactNative.Keyboard.dismiss();
    // Draft is re-seeded on open, so the leaving sheet keeps its text.
    setIsModalVisible(false);
  }, [isSaveInProgress]);
  const handleSaveModal = (0, _react.useCallback)(async () => {
    if (!isEditable || isSaveInProgress) {
      return;
    }
    _reactNative.Keyboard.dismiss();
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
    return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_index3.Card, {
        title: title,
        titleStyles: titleStyles ?? theme.typography.headline.bold,
        onPress: handleOpenModal,
        disabled: !isEditable,
        withShadow: withShadow ?? true,
        style: [styles.previewCard, cardStyle],
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Text, {
          variant: "body/regular",
          color: "primary",
          style: !trimmedValue ? styles.previewPlaceholder : undefined,
          numberOfLines: resolvedCardNumberOfLines,
          ellipsizeMode: "tail",
          children: previewText
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index4.CustomModal, {
        title: title,
        visible: isModalVisible,
        onClose: handleCloseModal,
        isLocked: isSaveInProgress,
        scrollEnabled: false,
        avoidKeyboard: true,
        liftFooterOnKeyboard: true,
        footer: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
          style: styles.actionRow,
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Pressable, {
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
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Text, {
              variant: "headline/medium",
              color: "primary",
              children: cancelLabel
            })
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Pressable, {
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
            children: isSaveInProgress ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.ActivityIndicator, {
              size: "small",
              color: theme.colors.text.inverse
            }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Text, {
              variant: "headline/medium",
              color: "inverse",
              children: saveLabel
            })
          })]
        }),
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
          style: styles.modalBody,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index5.Textarea, {
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
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_index3.Card, {
    title: title,
    titleStyles: titleStyles ?? theme.typography.title.bold,
    style: [styles.inlineCard, cardStyle],
    children: [readOnly ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Text, {
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
    (0, _jsxRuntime.jsx)(_reactNative.View, {
      ref: fieldRef,
      collapsable: false,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index5.Textarea, {
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
    }), footerText ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Text, {
      variant: "caption/regular",
      color: "secondary",
      style: footerTextStyle,
      children: footerText
    }) : null]
  });
};
exports.AdditionalNotesField = AdditionalNotesField;
//# sourceMappingURL=AdditionalNotesField.js.map