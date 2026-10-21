import type { ReactNode } from 'react';
import type { StyleProp, TextStyle, ViewStyle } from 'react-native';

/**
 * Centered empty / error state: illustration, title, explanation and an
 * optional action. Figma pattern: `TodayScreenState`.
 */
export interface EmptyStateProps {
  /** Title (`title/bold`). The app wrapper passes the translated text. */
  title: string;
  /** Explanation under the title (`body/regular`). Hidden when empty. */
  description?: string;
  /** Action label (`headline/medium`). Set it together with `onAction`; also used as the screen-reader label. */
  actionTitle?: string;
  /**
   * Picture above the texts, rendered as is. The app wrapper passes its default
   * warning image (100pt) when the screen does not provide one.
   */
  illustration?: ReactNode;
  /** When set, the illustration and the texts are wrapped in a `View` with this style. */
  messageStyle?: StyleProp<ViewStyle>;
  /** Action handler. The action button is rendered only when this is set. */
  onAction?: () => void;
  /** Container style. */
  style?: StyleProp<ViewStyle>;
  /** Style of the title + description column. */
  textContainerStyle?: StyleProp<ViewStyle>;
  /** Extra title style. */
  titleStyle?: StyleProp<TextStyle>;
  /** Extra description style. */
  descriptionStyle?: StyleProp<TextStyle>;
  /** Extra action button style. */
  actionButtonStyle?: StyleProp<ViewStyle>;
  /** Extra action label style. */
  actionTextStyle?: StyleProp<TextStyle>;
  /** Test identifier of the container. */
  testID?: string;
  /** Test identifier of the action button. */
  actionTestID?: string;
  /** Hides the action even when `onAction` is set. Defaults to `true`. */
  isActionVisible?: boolean;
}
