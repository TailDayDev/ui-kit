"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SyncedTextInput = void 0;
var _reactNative = require("react-native");
var _useNativeEchoValue = require("../../utils/useNativeEchoValue.js");
var _jsxRuntime = require("react/jsx-runtime");
/**
 * React Native `TextInput` that stays in sync inside a modal. A controlled
 * TextInput pushes `value` back to native in the same commit as a keystroke;
 * modal content gets the owner's new `value` a commit later, so the stale
 * one would reset the text and move the caret. The typed text is echoed for
 * that commit (see `useNativeEchoValue`). Copied from the app
 * `shared/ui/synced-text-input`; used by every kit text field.
 */
const SyncedTextInput = ({
  value,
  onChange,
  ...props
}) => {
  const [shownValue, echoText] = (0, _useNativeEchoValue.useNativeEchoValue)(value);
  const handleChange = event => {
    if (value !== undefined) {
      echoText(event.nativeEvent.text);
    }
    onChange?.(event);
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TextInput, {
    ...props,
    value: shownValue,
    onChange: handleChange
  });
};
exports.SyncedTextInput = SyncedTextInput;
//# sourceMappingURL=SyncedTextInput.js.map