"use strict";

import { useCallback, useEffect, useRef, useState } from 'react';
export const useControllableState = ({
  componentName,
  controlledValue,
  defaultValue,
  onChange,
  stateName
}) => {
  const isControlled = controlledValue !== undefined;
  const initialIsControlledRef = useRef(isControlled);
  const hasWarnedRef = useRef(false);
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const value = isControlled ? controlledValue : uncontrolledValue;
  useEffect(() => {
    if (__DEV__ && !hasWarnedRef.current && initialIsControlledRef.current !== isControlled) {
      hasWarnedRef.current = true;
      console.warn(`${componentName} changed ${stateName} from ${initialIsControlledRef.current ? 'controlled' : 'uncontrolled'} to ${isControlled ? 'controlled' : 'uncontrolled'}. ` + 'Keep the mode stable for the lifetime of the component.');
    }
  }, [componentName, isControlled, stateName]);
  const setValue = useCallback(nextValue => {
    if (!isControlled) {
      setUncontrolledValue(nextValue);
    }
    onChange?.(nextValue);
  }, [isControlled, onChange]);
  return [value, setValue];
};
//# sourceMappingURL=useControllableState.js.map