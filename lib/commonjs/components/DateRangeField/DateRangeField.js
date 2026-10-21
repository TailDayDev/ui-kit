"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DateRangeField = void 0;
var _react = require("react");
var _reactNative = require("react-native");
var _index = require("../../theme/index.js");
var _DateFieldRow = require("./DateFieldRow.js");
var _useControllableState = require("./useControllableState.js");
var _jsxRuntime = require("react/jsx-runtime");
const EMPTY_VALUE = {
  startDate: null,
  endDate: null
};
const shouldTrackActiveFieldLifecycle = ({
  controlledActiveField,
  defaultActiveField,
  hasActiveFieldChangeHandler,
  hasEditor
}) => controlledActiveField !== undefined || defaultActiveField !== null || hasActiveFieldChangeHandler || hasEditor;

/**
 * Start/end date rows with a controlled/uncontrolled value and an editor
 * controller (app `shared/ui/date-range-field`). Formatting, validation and
 * the picker sheet stay with the caller (`formatValue`/`displayValue`,
 * `renderEditor`).
 */
const DateRangeField = exports.DateRangeField = /*#__PURE__*/(0, _react.memo)(function DateRangeField({
  activeField: controlledActiveField,
  defaultActiveField = null,
  defaultValue = EMPTY_VALUE,
  end,
  isDisabled = false,
  isReadOnly = false,
  onActiveFieldChange,
  onFieldPress,
  onValueChange,
  renderEditor,
  start,
  style,
  testID,
  value: controlledValue
}) {
  const styles = (0, _index.useThemedStyles)(createStyles);
  const [value, setValue] = (0, _useControllableState.useControllableState)({
    componentName: 'DateRangeField',
    controlledValue,
    defaultValue,
    onChange: onValueChange,
    stateName: 'value'
  });
  const [activeField, setActiveField] = (0, _useControllableState.useControllableState)({
    componentName: 'DateRangeField',
    controlledValue: controlledActiveField,
    defaultValue: defaultActiveField,
    onChange: onActiveFieldChange,
    stateName: 'activeField'
  });
  const [draftValue, setDraftValueState] = (0, _react.useState)(value);
  const valueRef = (0, _react.useRef)(value);
  const draftValueRef = (0, _react.useRef)(draftValue);
  const previousActiveFieldRef = (0, _react.useRef)(activeField);
  const isActiveFieldLifecycleEnabled = shouldTrackActiveFieldLifecycle({
    controlledActiveField,
    defaultActiveField,
    hasActiveFieldChangeHandler: onActiveFieldChange !== undefined,
    hasEditor: renderEditor !== undefined
  });
  const isOpeningActiveField = activeField !== null && previousActiveFieldRef.current !== activeField;
  const resolvedDraftValue = isOpeningActiveField ? value : draftValue;
  valueRef.current = value;
  draftValueRef.current = resolvedDraftValue;
  const setDraftValue = (0, _react.useCallback)(nextValue => {
    const resolvedValue = typeof nextValue === 'function' ? nextValue(draftValueRef.current) : nextValue;
    draftValueRef.current = resolvedValue;
    setDraftValueState(resolvedValue);
  }, []);
  (0, _react.useEffect)(() => {
    if (activeField !== null && previousActiveFieldRef.current !== activeField) {
      setDraftValue(valueRef.current);
    }
    previousActiveFieldRef.current = activeField;
  }, [activeField, setDraftValue]);
  const openField = (0, _react.useCallback)(field => {
    if (isActiveFieldLifecycleEnabled) {
      setDraftValue(valueRef.current);
      setActiveField(field);
    }
    onFieldPress?.(field);
  }, [isActiveFieldLifecycleEnabled, onFieldPress, setActiveField, setDraftValue]);
  const handleStartPress = (0, _react.useCallback)(() => {
    openField('start');
  }, [openField]);
  const handleEndPress = (0, _react.useCallback)(() => {
    openField('end');
  }, [openField]);
  const setFieldValue = (0, _react.useCallback)((field, nextValue) => {
    setDraftValue(currentValue => field === 'start' ? {
      ...currentValue,
      startDate: nextValue
    } : {
      ...currentValue,
      endDate: nextValue
    });
  }, [setDraftValue]);
  const commit = (0, _react.useCallback)(nextValue => {
    const committedValue = nextValue ?? draftValueRef.current;
    setValue(committedValue);
    setDraftValue(committedValue);
    setActiveField(null);
  }, [setActiveField, setDraftValue, setValue]);
  const cancel = (0, _react.useCallback)(() => {
    setDraftValue(valueRef.current);
    setActiveField(null);
  }, [setActiveField, setDraftValue]);
  const editorController = (0, _react.useMemo)(() => ({
    activeField,
    cancel,
    commit,
    draftValue: resolvedDraftValue,
    setDraftValue,
    setFieldValue,
    value
  }), [activeField, cancel, commit, resolvedDraftValue, setDraftValue, setFieldValue, value]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
    style: [styles.container, style],
    testID: testID,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_DateFieldRow.DateFieldRow, {
      ...start,
      boundary: "start",
      dateValue: value.startDate,
      isDisabled: isDisabled || Boolean(start.isDisabled),
      isReadOnly: isReadOnly,
      onPress: handleStartPress
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DateFieldRow.DateFieldRow, {
      ...end,
      boundary: "end",
      dateValue: value.endDate,
      isDisabled: isDisabled || Boolean(end.isDisabled),
      isReadOnly: isReadOnly,
      onPress: handleEndPress
    }), renderEditor?.(editorController)]
  });
});
const createStyles = theme => _reactNative.StyleSheet.create({
  container: {
    gap: theme.space[4],
    width: '100%'
  }
});
//# sourceMappingURL=DateRangeField.js.map