import type { StyleProp, ViewStyle } from 'react-native';

/** Bottom-sheet header (Figma `ModalHeader`): centered title and a round close button on the right. */
export interface ModalHeaderProps {
  /** Header text (`headline/bold`, one line, centered). Figma TEXT `title`. */
  title?: string;
  /** Shows the title. Figma BOOLEAN `hasTitle`. Defaults to `true`. */
  hasTitle?: boolean;
  /** Called when the close button is tapped. */
  onClose: () => void;
  /** Screen-reader label of the close button. Required: the button has no visible text. */
  closeAccessibilityLabel: string;
  /** Blocks and dims the close button (e.g. while a request is pending). Defaults to `false`. */
  isDisabled?: boolean;
  /** Test identifier of the close button. */
  closeTestID?: string;
  /** Outer style, applied last. */
  style?: StyleProp<ViewStyle>;
  /** Test identifier of the header container. */
  testID?: string;
}
