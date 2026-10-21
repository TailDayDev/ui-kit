import {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react';
import { StyleSheet, View } from 'react-native';

import { useThemedStyles, type Theme } from '../../theme';
import { DateFieldRow } from './DateFieldRow';
import type {
  DateRangeFieldEditorController,
  DateRangeFieldName,
  DateRangeFieldProps,
  DateRangeValue,
} from './DateRangeField.types';
import { useControllableState } from './useControllableState';

interface ActiveFieldLifecycleOptions {
  controlledActiveField: DateRangeFieldName | null | undefined;
  defaultActiveField: DateRangeFieldName | null;
  hasActiveFieldChangeHandler: boolean;
  hasEditor: boolean;
}

const EMPTY_VALUE: DateRangeValue = {
  startDate: null,
  endDate: null,
};

const shouldTrackActiveFieldLifecycle = ({
  controlledActiveField,
  defaultActiveField,
  hasActiveFieldChangeHandler,
  hasEditor,
}: ActiveFieldLifecycleOptions) =>
  controlledActiveField !== undefined ||
  defaultActiveField !== null ||
  hasActiveFieldChangeHandler ||
  hasEditor;

/**
 * Start/end date rows with a controlled/uncontrolled value and an editor
 * controller (app `shared/ui/date-range-field`). Formatting, validation and
 * the picker sheet stay with the caller (`formatValue`/`displayValue`,
 * `renderEditor`).
 */
export const DateRangeField = memo(function DateRangeField({
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
  value: controlledValue,
}: DateRangeFieldProps) {
  const styles = useThemedStyles(createStyles);
  const [value, setValue] = useControllableState({
    componentName: 'DateRangeField',
    controlledValue,
    defaultValue,
    onChange: onValueChange,
    stateName: 'value',
  });
  const [activeField, setActiveField] = useControllableState({
    componentName: 'DateRangeField',
    controlledValue: controlledActiveField,
    defaultValue: defaultActiveField,
    onChange: onActiveFieldChange,
    stateName: 'activeField',
  });
  const [draftValue, setDraftValueState] = useState(value);
  const valueRef = useRef(value);
  const draftValueRef = useRef(draftValue);
  const previousActiveFieldRef = useRef(activeField);
  const isActiveFieldLifecycleEnabled = shouldTrackActiveFieldLifecycle({
    controlledActiveField,
    defaultActiveField,
    hasActiveFieldChangeHandler: onActiveFieldChange !== undefined,
    hasEditor: renderEditor !== undefined,
  });
  const isOpeningActiveField =
    activeField !== null && previousActiveFieldRef.current !== activeField;
  const resolvedDraftValue = isOpeningActiveField ? value : draftValue;
  valueRef.current = value;
  draftValueRef.current = resolvedDraftValue;

  const setDraftValue = useCallback<Dispatch<SetStateAction<DateRangeValue>>>(
    nextValue => {
      const resolvedValue =
        typeof nextValue === 'function'
          ? nextValue(draftValueRef.current)
          : nextValue;

      draftValueRef.current = resolvedValue;
      setDraftValueState(resolvedValue);
    },
    [],
  );

  useEffect(() => {
    if (
      activeField !== null &&
      previousActiveFieldRef.current !== activeField
    ) {
      setDraftValue(valueRef.current);
    }

    previousActiveFieldRef.current = activeField;
  }, [activeField, setDraftValue]);

  const openField = useCallback(
    (field: DateRangeFieldName) => {
      if (isActiveFieldLifecycleEnabled) {
        setDraftValue(valueRef.current);
        setActiveField(field);
      }

      onFieldPress?.(field);
    },
    [
      isActiveFieldLifecycleEnabled,
      onFieldPress,
      setActiveField,
      setDraftValue,
    ],
  );
  const handleStartPress = useCallback(() => {
    openField('start');
  }, [openField]);
  const handleEndPress = useCallback(() => {
    openField('end');
  }, [openField]);
  const setFieldValue = useCallback(
    (field: DateRangeFieldName, nextValue: string | null) => {
      setDraftValue(currentValue =>
        field === 'start'
          ? { ...currentValue, startDate: nextValue }
          : { ...currentValue, endDate: nextValue },
      );
    },
    [setDraftValue],
  );
  const commit = useCallback(
    (nextValue?: DateRangeValue) => {
      const committedValue = nextValue ?? draftValueRef.current;
      setValue(committedValue);
      setDraftValue(committedValue);
      setActiveField(null);
    },
    [setActiveField, setDraftValue, setValue],
  );
  const cancel = useCallback(() => {
    setDraftValue(valueRef.current);
    setActiveField(null);
  }, [setActiveField, setDraftValue]);
  const editorController = useMemo<DateRangeFieldEditorController>(
    () => ({
      activeField,
      cancel,
      commit,
      draftValue: resolvedDraftValue,
      setDraftValue,
      setFieldValue,
      value,
    }),
    [
      activeField,
      cancel,
      commit,
      resolvedDraftValue,
      setDraftValue,
      setFieldValue,
      value,
    ],
  );

  return (
    <View style={[styles.container, style]} testID={testID}>
      <DateFieldRow
        {...start}
        boundary="start"
        dateValue={value.startDate}
        isDisabled={isDisabled || Boolean(start.isDisabled)}
        isReadOnly={isReadOnly}
        onPress={handleStartPress}
      />
      <DateFieldRow
        {...end}
        boundary="end"
        dateValue={value.endDate}
        isDisabled={isDisabled || Boolean(end.isDisabled)}
        isReadOnly={isReadOnly}
        onPress={handleEndPress}
      />
      {renderEditor?.(editorController)}
    </View>
  );
});

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      gap: theme.space[4],
      width: '100%',
    },
  });
