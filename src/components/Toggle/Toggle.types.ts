/** 56×32 on/off switch: grey track when off, accent track with a checked thumb when on. */
export interface ToggleProps {
  /** On state: accent track, thumb on the right with a check mark. */
  isActive: boolean;
  /** Called on tap (the press event does not propagate to a tappable parent). Not called while `disabled`. */
  handlePress: () => void;
  /** Blocks taps and dims the switch. Defaults to `false`. */
  disabled?: boolean;
  /** Test identifier of the switch. Ignored when `controlTestID` is set. */
  testID?: string;
  /** Test identifier of the switch; takes precedence over `testID`. Kept for app compatibility. */
  controlTestID?: string;
  /** Screen-reader label, usually the text of the row next to the switch. */
  accessibilityLabel?: string;
}
