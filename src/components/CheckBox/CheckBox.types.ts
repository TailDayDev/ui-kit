/** 16×16 checkbox: grey outline when off, accent fill with a white check when on. */
export interface CheckBoxProps {
  /** Checked state: accent fill and check mark. */
  isActive: boolean;
  /** Called on tap. The parent flips `isActive`. Not called while `disabled`. */
  handlePress: () => void;
  /** Blocks taps and dims the box (`theme.opacity.disabled`). Defaults to `false`. */
  disabled?: boolean;
  /** Screen-reader label, usually the text of the row next to the box. */
  accessibilityLabel?: string;
  /** Test identifier of the tappable box. */
  testID?: string;
}
