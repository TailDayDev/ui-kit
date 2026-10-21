/**
 * Height of the keyboard covering the modal area, while `isEnabled` (the
 * modal is on top and reacts to the keyboard); 0 otherwise. While
 * `isFrozen` (the sheet is leaving) it keeps its last value, so the layout
 * does not change under the leave animation.
 */
export declare const useModalKeyboardHeight: (isEnabled: boolean, screenHeight: number, isFrozen?: boolean, accessoryHeight?: number) => number;
//# sourceMappingURL=useModalKeyboardHeight.d.ts.map