/** Tappable radio row with a title and a description (Figma `ScheduleRadioRow`). */
export interface ScheduleRadioRowProps {
  /** Test identifier of the row. */
  testID?: string;
  /** Row title (`headline/medium`). Also used as the accessibility label. */
  title: string;
  /** Secondary text under the title (`caption/regular`). */
  description: string;
  /**
   * Overrides the description color (defaults to `colors.text.secondary`).
   * A resolved color value, e.g. `theme.palette.darkGray`.
   */
  descriptionColor?: string;
  /** Whether this option is the selected one. */
  selected: boolean;
  /** Blocks taps and dims the row. Defaults to `false`. */
  disabled?: boolean;
  /** Called on tap. Not called while `disabled`. */
  onPress: () => void;
}
