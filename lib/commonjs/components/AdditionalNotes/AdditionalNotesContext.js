"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useAdditionalNotes = exports.AdditionalNotesProvider = void 0;
var _react = require("react");
var _jsxRuntime = require("react/jsx-runtime");
const AdditionalNotesContext = /*#__PURE__*/(0, _react.createContext)(null);
const noop = () => {};

/** Holds the notes value, texts and callbacks for `AdditionalNotesField`. */
const AdditionalNotesProvider = ({
  children,
  ...props
}) => {
  const {
    onValueChange,
    setValue
  } = props;
  const changeHandler = onValueChange ?? setValue ?? noop;
  const resolveValueChange = (0, _react.useCallback)(nextValue => {
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
  const contextValue = (0, _react.useMemo)(() => ({
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
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(AdditionalNotesContext.Provider, {
    value: contextValue,
    children: children
  });
};

/** Notes context; throws outside `AdditionalNotesProvider`. */
exports.AdditionalNotesProvider = AdditionalNotesProvider;
const useAdditionalNotes = () => {
  const context = (0, _react.useContext)(AdditionalNotesContext);
  if (!context) {
    throw new Error('useAdditionalNotes must be used within AdditionalNotesProvider');
  }
  return context;
};
exports.useAdditionalNotes = useAdditionalNotes;
//# sourceMappingURL=AdditionalNotesContext.js.map