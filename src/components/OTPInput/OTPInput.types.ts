export interface OTPInputProps {
  /** Number of digit cells. Defaults to 6. */
  length?: number;
  /** Called with the current code after every change (also partial and empty). */
  onCodeFilled: (code: string) => void;
  /** Error message under the cells; also paints the cells red while the input is not focused. */
  errorText?: string | null;
  /** Gap between cells in points. Defaults to 16. */
  cellGap?: number;
  /** Fixed cell width. Omit to let cells share the row equally. */
  cellWidth?: number;
  /** Text shown in empty cells. Defaults to `''`. */
  emptyPlaceholder?: string;
  /** Focus the hidden input on mount. Defaults to `true`. */
  autoFocus?: boolean;
  /**
   * Try to prefill the code from the clipboard on mount. Defaults to `true`;
   * needs `onRequestClipboardText`.
   */
  readClipboard?: boolean;
  /**
   * Returns the clipboard text (the app passes `Clipboard.getString`). The kit
   * has no clipboard dependency, so without it nothing is read. The latest
   * function is used; it does not need to be stable.
   */
  onRequestClipboardText?: () => Promise<string>;
  /** Change it to clear the entered code. */
  resetVersion?: number;
  /** Screen reader label of the hidden code input. */
  accessibilityLabel?: string;
}
