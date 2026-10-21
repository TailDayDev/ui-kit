"use strict";

import { TextInput } from 'react-native';
import { useNativeEchoValue } from "../../utils/useNativeEchoValue.js";
import { jsx as _jsx } from "react/jsx-runtime";
/**
 * React Native `TextInput` that stays in sync inside a modal. A controlled
 * TextInput pushes `value` back to native in the same commit as a keystroke;
 * modal content gets the owner's new `value` a commit later, so the stale
 * one would reset the text and move the caret. The typed text is echoed for
 * that commit (see `useNativeEchoValue`). Copied from the app
 * `shared/ui/synced-text-input`; used by every kit text field.
 */
export const SyncedTextInput = ({
  value,
  onChange,
  ...props
}) => {
  const [shownValue, echoText] = useNativeEchoValue(value);
  const handleChange = event => {
    if (value !== undefined) {
      echoText(event.nativeEvent.text);
    }
    onChange?.(event);
  };
  return /*#__PURE__*/_jsx(TextInput, {
    ...props,
    value: shownValue,
    onChange: handleChange
  });
};
//# sourceMappingURL=SyncedTextInput.js.map