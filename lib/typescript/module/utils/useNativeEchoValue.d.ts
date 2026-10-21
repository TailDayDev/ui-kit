/**
 * For a controlled native component (TextInput, Picker): shows what the user
 * just typed or picked until the end of the frame, then the `value` prop
 * again. Copied from the app `shared/lib/hooks/useNativeEchoValue`; shared by SyncedTextInput and NativePicker.
 *
 * These components push `value` back to native in every commit where it
 * differs from what native shows. Modal content gets its owner's new value
 * one commit later per modal level, so meanwhile `value` is stale and native
 * would be reset to it (typed text flickers and the caret moves). Those
 * commits run synchronously in the same task as the change, so by the next
 * frame `value` has caught up at any depth; a change the owner rejected is
 * then rolled back on native.
 */
export declare const useNativeEchoValue: <T>(value: T) => readonly [T, (nativeValue: T) => void];
//# sourceMappingURL=useNativeEchoValue.d.ts.map