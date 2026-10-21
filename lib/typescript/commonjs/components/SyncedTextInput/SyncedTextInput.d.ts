import type { SyncedTextInputProps } from './SyncedTextInput.types';
/**
 * React Native `TextInput` that stays in sync inside a modal. A controlled
 * TextInput pushes `value` back to native in the same commit as a keystroke;
 * modal content gets the owner's new `value` a commit later, so the stale
 * one would reset the text and move the caret. The typed text is echoed for
 * that commit (see `useNativeEchoValue`). Copied from the app
 * `shared/ui/synced-text-input`; used by every kit text field.
 */
export declare const SyncedTextInput: ({ value, onChange, ...props }: SyncedTextInputProps) => import("react").JSX.Element;
//# sourceMappingURL=SyncedTextInput.d.ts.map