import type { ReactNode } from 'react';

/** What `renderSlider` receives: wire these into the slider control. */
export interface PercentageValueFieldSliderProps {
  /** Lower bound (0). */
  min: number;
  /** Upper bound (100). */
  max: number;
  /** Step (1). */
  step: number;
  /** Current value. */
  value: number;
  /** Called with the dragged value. */
  onValueChange: (value: number) => void;
}

export interface PercentageValueFieldProps {
  /** Current percentage, 0–100. */
  value: number;
  /** Called with the new whole percentage (typed or dragged), clamped to 0–100. */
  onChange: (value: number) => void;
  /**
   * Renders the slider between the value and the 0 % / 100 % labels. The kit
   * has no slider dependency: the app passes its `SliderControl`
   * (`@react-native-community/slider`, including its 32 pt vertical margins,
   * which the −16 pt offset of the min/max row relies on).
   */
  renderSlider: (props: PercentageValueFieldSliderProps) => ReactNode;
  /** Test identifier of the value input. */
  testID?: string;
  /** Screen reader label of the value input. */
  accessibilityLabel?: string;
}
