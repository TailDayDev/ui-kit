import { useCallback, useEffect, useRef, useState } from 'react';

interface UseControllableStateParams<Value> {
  componentName: string;
  controlledValue: Value | undefined;
  defaultValue: Value;
  onChange?: (value: Value) => void;
  stateName: string;
}

export const useControllableState = <Value>({
  componentName,
  controlledValue,
  defaultValue,
  onChange,
  stateName,
}: UseControllableStateParams<Value>) => {
  const isControlled = controlledValue !== undefined;
  const initialIsControlledRef = useRef(isControlled);
  const hasWarnedRef = useRef(false);
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const value = isControlled ? controlledValue : uncontrolledValue;

  useEffect(() => {
    if (
      __DEV__ &&
      !hasWarnedRef.current &&
      initialIsControlledRef.current !== isControlled
    ) {
      hasWarnedRef.current = true;
      console.warn(
        `${componentName} changed ${stateName} from ${
          initialIsControlledRef.current ? 'controlled' : 'uncontrolled'
        } to ${isControlled ? 'controlled' : 'uncontrolled'}. ` +
          'Keep the mode stable for the lifetime of the component.',
      );
    }
  }, [componentName, isControlled, stateName]);

  const setValue = useCallback(
    (nextValue: Value) => {
      if (!isControlled) {
        setUncontrolledValue(nextValue);
      }

      onChange?.(nextValue);
    },
    [isControlled, onChange],
  );

  return [value, setValue] as const;
};
