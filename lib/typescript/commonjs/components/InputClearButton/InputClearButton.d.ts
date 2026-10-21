import type { InputClearButtonProps } from './InputClearButton.types';
/**
 * The «×» control of a text field. It listens to raw touches, not the
 * responder system: with the keyboard up, a parent ScrollView
 * (keyboardShouldPersistTaps «never») captures every tap that is not on a
 * text input, so a Pressable here would only dismiss the keyboard. Raw touch
 * events still reach the control; a drag (scroll) does not clear.
 */
export declare const InputClearButton: ({ onClear, inputRef, style, testID, accessibilityLabel, }: InputClearButtonProps) => import("react").JSX.Element;
//# sourceMappingURL=InputClearButton.d.ts.map