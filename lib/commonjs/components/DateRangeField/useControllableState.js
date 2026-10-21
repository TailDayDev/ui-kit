"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useControllableState = void 0;
var _react = require("react");
const useControllableState = ({
  componentName,
  controlledValue,
  defaultValue,
  onChange,
  stateName
}) => {
  const isControlled = controlledValue !== undefined;
  const initialIsControlledRef = (0, _react.useRef)(isControlled);
  const hasWarnedRef = (0, _react.useRef)(false);
  const [uncontrolledValue, setUncontrolledValue] = (0, _react.useState)(defaultValue);
  const value = isControlled ? controlledValue : uncontrolledValue;
  (0, _react.useEffect)(() => {
    if (__DEV__ && !hasWarnedRef.current && initialIsControlledRef.current !== isControlled) {
      hasWarnedRef.current = true;
      console.warn(`${componentName} changed ${stateName} from ${initialIsControlledRef.current ? 'controlled' : 'uncontrolled'} to ${isControlled ? 'controlled' : 'uncontrolled'}. ` + 'Keep the mode stable for the lifetime of the component.');
    }
  }, [componentName, isControlled, stateName]);
  const setValue = (0, _react.useCallback)(nextValue => {
    if (!isControlled) {
      setUncontrolledValue(nextValue);
    }
    onChange?.(nextValue);
  }, [isControlled, onChange]);
  return [value, setValue];
};
exports.useControllableState = useControllableState;
//# sourceMappingURL=useControllableState.js.map