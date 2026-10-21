"use strict";

import { createContext, useCallback, useContext, useMemo } from 'react';
import { jsx as _jsx } from "react/jsx-runtime";
const AdditionalNotesContext = /*#__PURE__*/createContext(null);
const noop = () => {};

/** Holds the notes value, texts and callbacks for `AdditionalNotesField`. */
export const AdditionalNotesProvider = ({
  children,
  ...props
}) => {
  const {
    onValueChange,
    setValue
  } = props;
  const changeHandler = onValueChange ?? setValue ?? noop;
  const resolveValueChange = useCallback(nextValue => {
    changeHandler(nextValue);
  }, [changeHandler]);
  const {
    value,
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
  } = props;
  const contextValue = useMemo(() => ({
    value,
    onValueChange,
    setValue,
    onSave,
    resolveValueChange,
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
  }), [value, onValueChange, setValue, onSave, resolveValueChange, title, placeholder, previewPlaceholder, footerText, footerTextStyle, maxLength, disabled, readOnly, isSaving, editMode, cancelLabel, saveLabel, minHeight, modalInputMinHeight, cardNumberOfLines, withShadow, cardStyle, titleStyles, textareaContainerStyle, textareaInputStyle, textareaCounterStyle, fieldRef, onFocus, onBlur, onInputFocus]);
  return /*#__PURE__*/_jsx(AdditionalNotesContext.Provider, {
    value: contextValue,
    children: children
  });
};

/** Notes context; throws outside `AdditionalNotesProvider`. */
export const useAdditionalNotes = () => {
  const context = useContext(AdditionalNotesContext);
  if (!context) {
    throw new Error('useAdditionalNotes must be used within AdditionalNotesProvider');
  }
  return context;
};
//# sourceMappingURL=AdditionalNotesContext.js.map