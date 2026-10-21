/** "Nothing selected" row of the manual-task pet and staff pickers. */
export interface PickerNoneRowProps {
  /** Option text, e.g. "Без питомца". Also the screen-reader label. */
  label: string;
  /** Selected state: accent fill and border, active radio. */
  isSelected: boolean;
  /** Called on tap. */
  onPress: () => void;
  /** Test identifier; the radio gets `<testID>.radio`. */
  testID?: string;
}
