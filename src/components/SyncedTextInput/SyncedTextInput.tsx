import { TextInput } from 'react-native';

import type { SyncedTextInputProps } from './SyncedTextInput.types';
import { useNativeEchoValue } from './useNativeEchoValue';

type TextInputChangeEvent = Parameters<
  NonNullable<SyncedTextInputProps['onChange']>
>[0];

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
}: SyncedTextInputProps) => {
  const [shownValue, echoText] = useNativeEchoValue(value);

  const handleChange = (event: TextInputChangeEvent) => {
    if (value !== undefined) {
      echoText(event.nativeEvent.text);
    }
    onChange?.(event);
  };

  return <TextInput {...props} value={shownValue} onChange={handleChange} />;
};
