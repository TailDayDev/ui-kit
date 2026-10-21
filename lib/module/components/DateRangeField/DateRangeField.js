"use strict";

import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useThemedStyles } from "../../theme/index.js";
import { DateFieldRow } from "./DateFieldRow.js";
import { useControllableState } from "./useControllableState.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
export const DateRangeField = /*#__PURE__*/memo(function DateRangeField({
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
  const styles = useThemedStyles(createStyles);
  const [value, setValue] = useControllableState({
    componentName: 'DateRangeField',
    controlledValue,
    defaultValue,
    onChange: onValueChange,
    stateName: 'value'
  });
  const [activeField, setActiveField] = useControllableState({
    componentName: 'DateRangeField',
    controlledValue: controlledActiveField,
    defaultValue: defaultActiveField,
    onChange: onActiveFieldChange,
    stateName: 'activeField'
  });
  const [draftValue, setDraftValueState] = useState(value);
  const valueRef = useRef(value);
  const draftValueRef = useRef(draftValue);
  const previousActiveFieldRef = useRef(activeField);
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
  const setDraftValue = useCallback(nextValue => {
    const resolvedValue = typeof nextValue === 'function' ? nextValue(draftValueRef.current) : nextValue;
    draftValueRef.current = resolvedValue;
    setDraftValueState(resolvedValue);
  }, []);
  useEffect(() => {
    if (activeField !== null && previousActiveFieldRef.current !== activeField) {
      setDraftValue(valueRef.current);
    }
    previousActiveFieldRef.current = activeField;
  }, [activeField, setDraftValue]);
  const openField = useCallback(field => {
    if (isActiveFieldLifecycleEnabled) {
      setDraftValue(valueRef.current);
      setActiveField(field);
    }
    onFieldPress?.(field);
  }, [isActiveFieldLifecycleEnabled, onFieldPress, setActiveField, setDraftValue]);
  const handleStartPress = useCallback(() => {
    openField('start');
  }, [openField]);
  const handleEndPress = useCallback(() => {
    openField('end');
  }, [openField]);
  const setFieldValue = useCallback((field, nextValue) => {
    setDraftValue(currentValue => field === 'start' ? {
      ...currentValue,
      startDate: nextValue
    } : {
      ...currentValue,
      endDate: nextValue
    });
  }, [setDraftValue]);
  const commit = useCallback(nextValue => {
    const committedValue = nextValue ?? draftValueRef.current;
    setValue(committedValue);
    setDraftValue(committedValue);
    setActiveField(null);
  }, [setActiveField, setDraftValue, setValue]);
  const cancel = useCallback(() => {
    setDraftValue(valueRef.current);
    setActiveField(null);
  }, [setActiveField, setDraftValue]);
  const editorController = useMemo(() => ({
    activeField,
    cancel,
    commit,
    draftValue: resolvedDraftValue,
    setDraftValue,
    setFieldValue,
    value
  }), [activeField, cancel, commit, resolvedDraftValue, setDraftValue, setFieldValue, value]);
  return /*#__PURE__*/_jsxs(View, {
    style: [styles.container, style],
    testID: testID,
    children: [/*#__PURE__*/_jsx(DateFieldRow, {
      ...start,
      boundary: "start",
      dateValue: value.startDate,
      isDisabled: isDisabled || Boolean(start.isDisabled),
      isReadOnly: isReadOnly,
      onPress: handleStartPress
    }), /*#__PURE__*/_jsx(DateFieldRow, {
      ...end,
      boundary: "end",
      dateValue: value.endDate,
      isDisabled: isDisabled || Boolean(end.isDisabled),
      isReadOnly: isReadOnly,
      onPress: handleEndPress
    }), renderEditor?.(editorController)]
  });
});
const createStyles = theme => StyleSheet.create({
  container: {
    gap: theme.space[4],
    width: '100%'
  }
});
//# sourceMappingURL=DateRangeField.js.map