import { createContext, useCallback, useContext, useMemo } from 'react';

import type {
  AdditionalNotesContextValue,
  AdditionalNotesProviderProps,
} from './AdditionalNotes.types';

const AdditionalNotesContext =
  createContext<AdditionalNotesContextValue | null>(null);

const noop = () => {};

/** Holds the notes value, texts and callbacks for `AdditionalNotesField`. */
export const AdditionalNotesProvider = ({
  children,
  ...props
}: AdditionalNotesProviderProps) => {
  const { onValueChange, setValue } = props;
  const changeHandler = onValueChange ?? setValue ?? noop;

  const resolveValueChange = useCallback(
    (nextValue: string) => {
      changeHandler(nextValue);
    },
    [changeHandler],
  );

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
    onInputFocus,
  } = props;

  const contextValue = useMemo<AdditionalNotesContextValue>(
    () => ({
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
      onInputFocus,
    }),
    [
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
      onInputFocus,
    ],
  );

  return (
    <AdditionalNotesContext.Provider value={contextValue}>
      {children}
    </AdditionalNotesContext.Provider>
  );
};

/** Notes context; throws outside `AdditionalNotesProvider`. */
export const useAdditionalNotes = (): AdditionalNotesContextValue => {
  const context = useContext(AdditionalNotesContext);

  if (!context) {
    throw new Error(
      'useAdditionalNotes must be used within AdditionalNotesProvider',
    );
  }

  return context;
};
